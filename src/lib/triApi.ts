const API_BASE_URL = "http://localhost/PBL-KELANA-OUTDOOR/api";

export interface TripData {
  trip_id: number;
  title: string;
  location: string;
  category: string;
  difficulty: string;
  start_date: string;
  start_time?: string;
  duration_days: number;
  total_quota: number;
  remaining_quota: number;
  status: string;
  short_description?: string;
  cover_image?: string;
  images?: string[];
  map_url?: string;
  meeting_point_name?: string;
  meeting_point_address?: string;
  meeting_point_map_url?: string;
  contact_name: string;
  contact_whatsapp: string;
  contact_role?: string;
  search_tags?: string[];
  itinerary?: string[];
  required_gear?: string[];
  rules?: string[];
  created_at?: string;
}

export const tripPublicApi = {
  /**
   * Get all trips
   */
  async getAll(): Promise<TripData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/trips.php?action=list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch trips');
      }
      
      const result = await response.json();
      
      if (result.success) {
        return result.records || [];
      } else {
        throw new Error(result.error || 'Failed to fetch trips');
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      return [];
    }
  },

  /**
   * Get trip by ID
   */
  async getById(id: string | number): Promise<TripData | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/trips.php?action=detail&id=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch trip detail');
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      } else {
        throw new Error(result.error || 'Trip not found');
      }
    } catch (error) {
      console.error('Error fetching trip detail:', error);
      return null;
    }
  }
};

// Admin API (untuk CRUD)
export const tripAdminApi = {
  /**
   * Create new trip
   */
  async create(data: Partial<TripData>): Promise<{ success: boolean; trip_id?: number; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/trips.php?action=create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      return result;
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to create trip'
      };
    }
  },

  /**
   * Update trip
   */
  async update(id: number, data: Partial<TripData>): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/trips.php?action=update&id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      return result;
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to update trip'
      };
    }
  },

  /**
   * Delete trip
   */
  async delete(id: number): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/trips.php?action=delete&id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      return result;
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to delete trip'
      };
    }
  },

  /**
   * Get all trips (admin view)
   */
  async getAll(): Promise<{ success: boolean; records: TripData[]; total: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/trips.php?action=list`);
      const result = await response.json();
      
      if (result.success) {
        return {
          success: true,
          records: result.records || [],
          total: result.total || 0
        };
      }
      
      return { success: false, records: [], total: 0 };
    } catch (error) {
      return { success: false, records: [], total: 0 };
    }
  }
};

// Upload API
export const tripUploadApi = {
  /**
   * Upload trip images (cover or gallery)
   */
  async uploadImages(files: File[]): Promise<{ success: boolean; urls?: string[]; error?: string }> {
    try {
      const formData = new FormData();
      
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      
      const response = await fetch(
        `${API_BASE_URL.replace('/api', '')}/upload/upload-trip-images.php`,
        {
          method: 'POST',
          body: formData
        }
      );
      
      const result = await response.json();
      return result;
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to upload images'
      };
    }
  }
};