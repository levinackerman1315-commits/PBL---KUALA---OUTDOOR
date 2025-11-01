export interface Trip {
  trip_id?: number;
  id?: string; // untuk compatibility dengan frontend existing
  title: string;
  location: string;
  map_url?: string;
  meeting_point_name: string;
  meeting_point_address: string;
  meeting_point_map_url?: string;
  start_date: string;
  start_time?: string;
  duration_days: number;
  remaining_quota: number;
  total_quota: number;
  difficulty: 'Mudah' | 'Sedang' | 'Berat';
  category: 'Mendaki' | 'Pantai' | 'Wisata' | 'Petualangan';
  short_description: string;
  itinerary?: string | any[]; // JSON string or array
  cover_image: string;
  images?: string | string[]; // JSON string or array
  required_gear?: string | string[];
  rules?: string | string[];
  search_tags?: string | string[];
  contact_name: string;
  contact_whatsapp: string;
  contact_role: string;
  status: 'active' | 'inactive' | 'completed';
  created_at?: string;
  updated_at?: string;
}

export interface TripFormData {
  title: string;
  location: string;
  category: 'Mendaki' | 'Pantai' | 'Wisata' | 'Petualangan';
  difficulty: 'Mudah' | 'Sedang' | 'Berat';
  start_date: string;
  start_time: string;
  duration_days: number;
  remaining_quota: number;
  total_quota: number;
  short_description: string;
  meeting_point_name: string;
  meeting_point_address: string;
  meeting_point_map_url: string;
  contact_name: string;
  contact_whatsapp: string;
  contact_role: string;
  status: 'active' | 'inactive' | 'completed';
  cover_image: string;
  images: string; // comma separated
  search_tags: string; // comma separated
  map_url: string;
  itinerary: string;
  required_gear: string;
  rules: string;
}