-- filepath: api/database/schema.sql
-- Database Schema for Open Trip and Merchandise

-- Create Trips Table
CREATE TABLE IF NOT EXISTS `trips` (
  `trip_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `map_url` varchar(500) DEFAULT NULL,
  `meeting_point_name` varchar(255) DEFAULT NULL,
  `meeting_point_address` text DEFAULT NULL,
  `meeting_point_map_url` varchar(500) DEFAULT NULL,
  `start_date` date NOT NULL,
  `start_time` time DEFAULT NULL,
  `duration_days` int(11) DEFAULT 1,
  `remaining_quota` int(11) DEFAULT 0,
  `total_quota` int(11) DEFAULT 0,
  `difficulty` enum('Mudah','Sedang','Berat') DEFAULT 'Mudah',
  `category` enum('Mendaki','Pantai','Wisata','Petualangan') NOT NULL,
  `short_description` text DEFAULT NULL,
  `itinerary` text DEFAULT NULL COMMENT 'JSON array',
  `cover_image` varchar(500) DEFAULT NULL,
  `images` text DEFAULT NULL COMMENT 'JSON array',
  `required_gear` text DEFAULT NULL COMMENT 'JSON array',
  `rules` text DEFAULT NULL COMMENT 'JSON array',
  `search_tags` text DEFAULT NULL COMMENT 'JSON array',
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_whatsapp` varchar(20) DEFAULT NULL,
  `contact_role` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive','completed') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`trip_id`),
  KEY `idx_category` (`category`),
  KEY `idx_difficulty` (`difficulty`),
  KEY `idx_status` (`status`),
  KEY `idx_start_date` (`start_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Merchandise Table
CREATE TABLE IF NOT EXISTS `merchandise` (
  `merchandise_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `color` varchar(100) NOT NULL,
  `color_hex` varchar(7) DEFAULT '#000000',
  `price` int(11) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `images` text DEFAULT NULL COMMENT 'JSON array',
  `sizes` text DEFAULT NULL COMMENT 'JSON array',
  `material` varchar(255) DEFAULT NULL,
  `weight` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `features` text DEFAULT NULL COMMENT 'JSON array',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`merchandise_id`),
  KEY `idx_status` (`status`),
  KEY `idx_color` (`color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Sample Data for Trips
INSERT INTO `trips` (`title`, `location`, `map_url`, `meeting_point_name`, `meeting_point_address`, `meeting_point_map_url`, `start_date`, `start_time`, `duration_days`, `remaining_quota`, `total_quota`, `difficulty`, `category`, `short_description`, `itinerary`, `cover_image`, `images`, `required_gear`, `rules`, `search_tags`, `contact_name`, `contact_whatsapp`, `contact_role`, `status`) VALUES
('Pendakian Gunung Bawang', 'Bengkayang, Kalimantan Barat', 'https://maps.google.com/?q=Gunung+Bawang+Bengkayang', 'Terminal Bengkayang', 'Jl. Raya Bengkayang, Kab. Bengkayang', 'https://maps.google.com/?q=Terminal+Bengkayang', '2025-11-08', '06:00:00', 2, 10, 15, 'Sedang', 'Mendaki', 'Pendakian gunung tertinggi di Bengkayang dengan pemandangan spektakuler Kalimantan Barat', '["Hari 1: Berkumpul di basecamp, briefing, start pendakian, camping","Hari 2: Summit attack subuh, turun gunung, penutupan"]', 'https://picsum.photos/id/1018/800/600', '["https://picsum.photos/id/1043/800/600","https://picsum.photos/id/1044/800/600","https://picsum.photos/id/1045/800/600","https://picsum.photos/id/1047/800/600"]', '["Carrier 40-60L","Sleeping bag","Matras","Tenda (1 tenda untuk 2-3 orang)","Headlamp/Senter","Raincoat/Jas hujan","Pakaian hangat/Jaket","Sepatu gunung","Bekal makanan dan minuman","Obat-obatan pribadi"]', '["Wajib mengikuti briefing sebelum pendakian","Dilarang membawa minuman beralkohol","Dilarang membuang sampah sembarangan","Wajib mengikuti arahan guide","Wajib membawa perlengkapan wajib yang ditentukan"]', '["gunung","mendaki","hiking","camping","summit","puncak","petualangan","alam","bengkayang","bawang","trekking","outdoor","mountain","pendakian","2 hari"]', 'Pak Rahman', '085234567890', 'Guide Lokal Gunung Bawang', 'active'),

('Eksplorasi Danau Riam', 'Singkawang, Kalimantan Barat', 'https://maps.google.com/?q=Danau+Riam+Singkawang', 'Alun-alun Singkawang', 'Jl. Alianyang, Singkawang Utara', 'https://maps.google.com/?q=Alun+Alun+Singkawang', '2025-12-05', '08:00:00', 1, 15, 20, 'Mudah', 'Wisata', 'Wisata alam danau dengan aktivitas camping dan memancing di tengah hutan', '["Pagi: Berkumpul, perjalanan ke lokasi","Siang: Aktivitas memancing dan eksplorasi danau","Sore: BBQ dan api unggun","Malam: Kembali ke kota"]', 'https://picsum.photos/id/1019/800/600', '["https://picsum.photos/id/1039/800/600","https://picsum.photos/id/1040/800/600","https://picsum.photos/id/1041/800/600","https://picsum.photos/id/1042/800/600"]', '["Tenda camping","Alat pancing (disediakan)","Pakaian ganti","Alat mandi","Obat-obatan pribadi","Senter/Headlamp","Matras","Peralatan BBQ (disediakan)"]', '["Wajib mengikuti briefing keselamatan","Dilarang membuang sampah sembarangan","Menjaga ketertiban dan ketenangan","Mengikuti arahan guide","Tidak membuat api unggun sembarangan"]', '["danau","lake","wisata","memancing","fishing","camping","bbq","api unggun","singkawang","riam","keluarga","santai","alam","hutan","1 hari","pemula"]', 'Pak Hendra', '081345678901', 'Pemandu Wisata Danau Riam', 'active');

-- Insert Sample Data for Merchandise
INSERT INTO `merchandise` (`name`, `color`, `color_hex`, `price`, `stock`, `images`, `sizes`, `material`, `weight`, `description`, `features`, `status`) VALUES
('Baju Kuala Outdoor - Hijau', 'Hijau', '#16a34a', 55000, 25, '["https://i.imgur.com/1Q9Z1ZB.png","https://i.imgur.com/1Q9Z1ZB.png"]', '["S","M","L","XL","XXL"]', '100% Cotton Combed 30s', '180 gram', 'Kaos resmi Kuala Outdoor dengan desain eksklusif warna hijau yang merepresentasikan semangat petualangan alam.', '["Bahan katun combed premium","Sablon rubber berkualitas tinggi","Nyaman dan tidak panas","Jahitan rapi dan kuat","Logo Kuala Outdoor eksklusif"]', 'active'),

('Baju Kuala Outdoor - Abu-abu', 'Abu-abu', '#6b7280', 55000, 30, '["https://i.imgur.com/2Q9Z1ZB.png","https://i.imgur.com/2Q9Z1ZB.png"]', '["S","M","L","XL","XXL"]', '100% Cotton Combed 30s', '180 gram', 'Kaos resmi Kuala Outdoor dengan desain eksklusif warna abu-abu yang elegan dan cocok untuk segala aktivitas outdoor.', '["Bahan katun combed premium","Sablon rubber berkualitas tinggi","Nyaman dan tidak panas","Jahitan rapi dan kuat","Logo Kuala Outdoor eksklusif"]', 'active'),

('Baju Kuala Outdoor - Biru Tua', 'Biru Tua', '#1e40af', 55000, 20, '["https://i.imgur.com/3Q9Z1ZB.png","https://i.imgur.com/3Q9Z1ZB.png"]', '["S","M","L","XL","XXL"]', '100% Cotton Combed 30s', '180 gram', 'Kaos resmi Kuala Outdoor dengan desain eksklusif warna biru tua yang stylish dan cocok untuk petualangan Anda.', '["Bahan katun combed premium","Sablon rubber berkualitas tinggi","Nyaman dan tidak panas","Jahitan rapi dan kuat","Logo Kuala Outdoor eksklusif"]', 'active');
