// Use environment variable for API URL (supports local and production)
// VITE_API_URL should be: https://kualaoutdoor.free.nf/api (without /public)
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost/PBL-KELANA-OUTDOOR/api';

async function handleResponse(response: Response) {
  const contentType = response.headers.get("content-type");
  
  // ✅ CEK APAKAH RESPONSE BENAR-BENAR JSON
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    console.error("Response bukan JSON:", text);
    throw new Error("Server tidak mengembalikan JSON. Cek error di console.");
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Network response was not ok');
  }
  
  return response.json();
}

// ============= ADMIN API (untuk admin) =============
export const tripAdminApi = {
  // Get all trips (including inactive)
  getAll: async () => {
    const token = localStorage.getItem('admin_token');
    const response = await fetch(`${API_BASE}/admin/trips.php`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // ✅ TAMBAHKAN INI
      }
    });
    return handleResponse(response);
  },

  // Get single trip
  getById: async (id: number) => {
    const token = localStorage.getItem('admin_token');
    const response = await fetch(`${API_BASE}/admin/trips.php?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  // Create new trip
  create: async (data: any) => {
    const token = localStorage.getItem('admin_token');
    const response = await fetch(`${API_BASE}/admin/trips.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  // Update trip
  update: async (id: number, data: any) => {
    const token = localStorage.getItem('admin_token');
    const response = await fetch(`${API_BASE}/admin/trips.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...data, trip_id: id })
    });
    return handleResponse(response);
  },

  // Delete trip
  delete: async (id: number) => {
    const token = localStorage.getItem('admin_token');
    const response = await fetch(`${API_BASE}/admin/trips.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ trip_id: id })
    });
    return handleResponse(response);
  }
};