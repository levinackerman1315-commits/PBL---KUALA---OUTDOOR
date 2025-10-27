# Backend API - Open Trip & Merchandise

Backend sistem untuk mengelola Open Trip dan Merchandise Kuala Outdoor.

## 📁 Struktur File

```
api/
├── config/
│   └── database.php          # Konfigurasi database
├── models/
│   ├── Trip.php              # Model Trip
│   ├── Merchandise.php       # Model Merchandise
│   ├── Equipment.php         # Model Equipment (existing)
│   └── ...
├── controllers/
│   ├── TripController.php    # Controller Trip
│   └── MerchandiseController.php  # Controller Merchandise
├── admin/
│   ├── trips.php             # CRUD Admin untuk Trip
│   ├── merchandise.php       # CRUD Admin untuk Merchandise
│   ├── bookings.php          # Admin Bookings (existing)
│   └── equipment.php         # Admin Equipment (existing)
├── public/
│   ├── trips.php             # Public API untuk Trip
│   └── merchandise.php       # Public API untuk Merchandise
└── database/
    └── schema.sql            # SQL Schema & Sample Data
```

## 🗄️ Setup Database

1. Buka phpMyAdmin atau MySQL client
2. Jalankan file `api/database/schema.sql`
3. Database akan otomatis membuat tabel dan insert sample data

```sql
-- Tabel yang dibuat:
- trips (8 kolom dengan sample data)
- merchandise (3 kolom dengan sample data)
```

## 🔗 API Endpoints

### Public Endpoints (Untuk User)

#### **Trips**

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/api/public/trips.php` | Get all active trips | - |
| GET | `/api/public/trips.php?id={id}` | Get single trip | `id` |
| GET | `/api/public/trips.php?category={category}` | Get trips by category | `category`: Mendaki, Pantai, Wisata, Petualangan |
| GET | `/api/public/trips.php?search={keyword}` | Search trips | `keyword` |

**Response Example:**
```json
{
  "records": [
    {
      "id": 1,
      "title": "Pendakian Gunung Bawang",
      "location": "Bengkayang, Kalimantan Barat",
      "mapUrl": "https://maps.google.com/?q=...",
      "meetingPoint": {
        "name": "Terminal Bengkayang",
        "address": "Jl. Raya Bengkayang",
        "mapUrl": "https://maps.google.com/?q=..."
      },
      "startDate": "2025-11-08",
      "startTime": "06:00:00",
      "durationDays": 2,
      "remainingQuota": 10,
      "totalQuota": 15,
      "difficulty": "Sedang",
      "category": "Mendaki",
      "shortDescription": "...",
      "itinerary": [...],
      "coverImage": "...",
      "images": [...],
      "requiredGear": [...],
      "rules": [...],
      "searchTags": [...],
      "contact": {
        "name": "Pak Rahman",
        "whatsapp": "085234567890",
        "role": "Guide Lokal"
      }
    }
  ]
}
```

#### **Merchandise**

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/api/public/merchandise.php` | Get all active merchandise | - |
| GET | `/api/public/merchandise.php?id={id}` | Get single merchandise | `id` |
| GET | `/api/public/merchandise.php?search={keyword}` | Search merchandise | `keyword` |

**Response Example:**
```json
{
  "records": [
    {
      "id": 1,
      "name": "Baju Kuala Outdoor - Hijau",
      "color": "Hijau",
      "colorHex": "#16a34a",
      "price": 55000,
      "stock": 25,
      "images": ["..."],
      "sizes": ["S", "M", "L", "XL", "XXL"],
      "material": "100% Cotton Combed 30s",
      "weight": "180 gram",
      "description": "...",
      "features": [...]
    }
  ]
}
```

### Admin Endpoints (Untuk Admin Panel)

#### **Trips Management**

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/admin/trips.php` | Get all trips (including inactive) | - |
| GET | `/api/admin/trips.php?id={id}` | Get single trip | - |
| POST | `/api/admin/trips.php` | Create new trip | JSON Trip Object |
| PUT | `/api/admin/trips.php` | Update trip | JSON Trip Object with `trip_id` |
| DELETE | `/api/admin/trips.php` | Delete trip | `{"trip_id": 1}` |

**Request Body Example (POST/PUT):**
```json
{
  "title": "Pendakian Gunung Baru",
  "location": "Bengkayang, Kalimantan Barat",
  "map_url": "https://maps.google.com/?q=...",
  "meeting_point_name": "Terminal Bengkayang",
  "meeting_point_address": "Jl. Raya Bengkayang",
  "meeting_point_map_url": "https://maps.google.com/?q=...",
  "start_date": "2025-11-08",
  "start_time": "06:00",
  "duration_days": 2,
  "remaining_quota": 10,
  "total_quota": 15,
  "difficulty": "Sedang",
  "category": "Mendaki",
  "short_description": "Deskripsi trip...",
  "itinerary": ["Day 1: ...", "Day 2: ..."],
  "cover_image": "https://...",
  "images": ["https://...", "https://..."],
  "required_gear": ["Carrier", "Sleeping bag"],
  "rules": ["Rule 1", "Rule 2"],
  "search_tags": ["gunung", "hiking"],
  "contact_name": "Pak Rahman",
  "contact_whatsapp": "085234567890",
  "contact_role": "Guide Lokal",
  "status": "active"
}
```

#### **Merchandise Management**

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/admin/merchandise.php` | Get all merchandise (including inactive) | - |
| GET | `/api/admin/merchandise.php?id={id}` | Get single merchandise | - |
| POST | `/api/admin/merchandise.php` | Create new merchandise | JSON Merchandise Object |
| PUT | `/api/admin/merchandise.php` | Update merchandise | JSON Merchandise Object with `merchandise_id` |
| DELETE | `/api/admin/merchandise.php` | Delete merchandise | `{"merchandise_id": 1}` |

**Request Body Example (POST/PUT):**
```json
{
  "name": "Baju Kuala Outdoor - Merah",
  "color": "Merah",
  "color_hex": "#dc2626",
  "price": 55000,
  "stock": 20,
  "images": ["https://...", "https://..."],
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "material": "100% Cotton Combed 30s",
  "weight": "180 gram",
  "description": "Deskripsi merchandise...",
  "features": ["Feature 1", "Feature 2"],
  "status": "active"
}
```

## 🔧 Konfigurasi

Edit `api/config/database.php`:

```php
private $host = "localhost";
private $db_name = "kuala_outdoor";  // Nama database Anda
private $username = "root";
private $password = "";
```

## 📊 Database Schema

### Tabel: `trips`

| Field | Type | Description |
|-------|------|-------------|
| trip_id | INT | Primary Key |
| title | VARCHAR(255) | Judul trip |
| location | VARCHAR(255) | Lokasi trip |
| category | ENUM | Mendaki, Pantai, Wisata, Petualangan |
| difficulty | ENUM | Mudah, Sedang, Berat |
| start_date | DATE | Tanggal mulai |
| remaining_quota | INT | Sisa kuota |
| status | ENUM | active, inactive, completed |
| ... | ... | ... |

### Tabel: `merchandise`

| Field | Type | Description |
|-------|------|-------------|
| merchandise_id | INT | Primary Key |
| name | VARCHAR(255) | Nama produk |
| color | VARCHAR(100) | Warna |
| price | INT | Harga |
| stock | INT | Stok tersedia |
| status | ENUM | active, inactive |
| ... | ... | ... |

## 🚀 Cara Menggunakan di Frontend

### Contoh: Fetch Trips

```typescript
// src/lib/api.ts
export const getTrips = async () => {
  const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/public/trips.php');
  const data = await response.json();
  return data.records;
};

export const getTripById = async (id: string) => {
  const response = await fetch(`http://localhost/PBL-KELANA-OUTDOOR/api/public/trips.php?id=${id}`);
  const data = await response.json();
  return data;
};
```

### Contoh: Fetch Merchandise

```typescript
export const getMerchandise = async () => {
  const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/public/merchandise.php');
  const data = await response.json();
  return data.records;
};
```

## ✅ Testing

### Test Public API
```bash
# Get all trips
curl http://localhost/PBL-KELANA-OUTDOOR/api/public/trips.php

# Get single trip
curl http://localhost/PBL-KELANA-OUTDOOR/api/public/trips.php?id=1

# Search trips
curl http://localhost/PBL-KELANA-OUTDOOR/api/public/trips.php?search=gunung

# Get merchandise
curl http://localhost/PBL-KELANA-OUTDOOR/api/public/merchandise.php
```

### Test Admin API
```bash
# Get all trips (admin)
curl http://localhost/PBL-KELANA-OUTDOOR/api/admin/trips.php

# Create new trip (admin)
curl -X POST http://localhost/PBL-KELANA-OUTDOOR/api/admin/trips.php \
  -H "Content-Type: application/json" \
  -d '{"title":"New Trip","location":"Pontianak",...}'
```

## 📝 Notes

- Semua array (itinerary, images, features, dll) disimpan dalam format JSON di database
- Status trip: `active` (aktif), `inactive` (non-aktif), `completed` (selesai)
- Status merchandise: `active` (aktif), `inactive` (non-aktif)
- CORS sudah enabled untuk semua endpoint

## 🔐 Security TODO

- [ ] Implementasi JWT authentication untuk admin endpoints
- [ ] Validasi input yang lebih ketat
- [ ] Rate limiting untuk API
- [ ] SQL injection protection (sudah ada prepared statements)
- [ ] XSS protection
