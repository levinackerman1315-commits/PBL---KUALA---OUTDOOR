-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql207.infinityfree.com
-- Generation Time: Dec 06, 2025 at 04:36 AM
-- Server version: 11.4.7-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `if0_40557727_kuala_outdoor`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `customer_phone` varchar(20) DEFAULT NULL,
  `customer_email` varchar(100) DEFAULT NULL,
  `customer_identity_number` varchar(50) DEFAULT NULL,
  `booking_code` varchar(20) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `estimated_duration` int(11) NOT NULL,
  `total_estimated_cost` decimal(12,2) NOT NULL,
  `actual_duration` int(11) DEFAULT NULL,
  `total_actual_cost` decimal(12,2) DEFAULT NULL,
  `compensation_fee` decimal(10,2) DEFAULT 0.00,
  `late_fee` decimal(10,2) DEFAULT 0.00 COMMENT 'Denda keterlambatan',
  `late_return_time` int(11) DEFAULT NULL COMMENT 'Waktu terlambat dalam menit',
  `status` enum('pending','confirmed','active','completed','cancelled') DEFAULT 'pending',
  `payment_status` enum('unpaid','paid','partial') DEFAULT 'unpaid',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `customer_id`, `customer_name`, `customer_phone`, `customer_email`, `customer_identity_number`, `booking_code`, `start_date`, `end_date`, `estimated_duration`, `total_estimated_cost`, `actual_duration`, `total_actual_cost`, `compensation_fee`, `late_fee`, `late_return_time`, `status`, `payment_status`, `created_at`, `updated_at`, `notes`) VALUES
(39, 11, 'Naufal Zakwans', '4242424242142', 'jakwan@gmail.com', '4242424242242422', 'KO-20251103-845', '2025-11-04 00:00:00', '2025-11-06 00:00:00', 2, '140000.00', NULL, NULL, '0.00', '0.00', NULL, 'pending', 'unpaid', '2025-11-03 16:14:18', '2025-11-05 17:34:07', ''),
(40, 11, 'Naufal Zakwans', '4242424242142', 'jakwan@gmail.com', '4242424242242422', 'KO-20251103-944', '2025-11-19 00:00:00', '2025-11-28 00:00:00', 9, '630000.00', NULL, NULL, '0.00', '0.00', NULL, 'pending', 'unpaid', '2025-11-03 16:16:59', '2025-11-05 17:34:07', 'kfdjgdlk'),
(50, 6, 'Mika Mikas', '0891391999999', 'mikamika10kaka@gmail.com', '1111111111111111', 'KO-20251103-442', '2025-11-05 00:00:00', '2025-11-06 00:00:00', 1, '400000.00', NULL, NULL, '0.00', '0.00', NULL, 'pending', 'unpaid', '2025-11-04 03:18:10', '2025-11-05 17:34:07', ''),
(51, 6, 'Mika Mikas', '0891391999999', 'mikamika10kaka@gmail.com', '1111111111111111', 'KO-20251103-811', '2025-11-05 00:00:00', '2025-11-06 00:00:00', 1, '400000.00', NULL, NULL, '0.00', '0.00', NULL, 'pending', 'unpaid', '2025-11-04 03:19:02', '2025-11-05 17:34:07', ''),
(52, 6, 'Mika Mikas', '0891391999999', 'mikamika10kaka@gmail.com', '1111111111111111', 'KO-20251105-870', '2025-11-06 00:00:00', '2025-11-07 00:00:00', 1, '317888.00', NULL, NULL, '0.00', '0.00', NULL, 'completed', 'paid', '2025-11-05 23:36:58', '2025-11-06 03:30:17', ''),
(53, 6, 'Mika Mikas', '0891391999999', 'mikamika10kaka@gmail.com', '1111111111111111', 'KO-20251105-281', '2025-11-06 00:00:00', '2025-11-07 00:00:00', 1, '50000.00', NULL, NULL, '0.00', '0.00', NULL, 'pending', 'unpaid', '2025-11-05 23:42:47', '2025-11-05 17:34:07', 'aaa'),
(54, 6, 'Mika Mikas', '0891391999999', 'mikamika10kaka@gmail.com', '1111111111111111', 'KO-20251105-968', '2025-11-06 00:00:00', '2025-11-07 00:00:00', 1, '50000.00', NULL, NULL, '0.00', '0.00', NULL, 'pending', 'unpaid', '2025-11-05 23:43:03', '2025-11-05 17:34:07', ''),
(55, 6, 'Mika Mikas', '0891391999999', 'mikamika10kaka@gmail.com', '1111111111111111', 'KO-20251105-217', '2025-11-06 00:00:00', '2025-11-07 00:00:00', 1, '50000.00', NULL, NULL, '0.00', '0.00', NULL, 'completed', 'paid', '2025-11-05 23:46:02', '2025-11-05 17:57:50', ''),
(59, 12, 'Naufal zakwan', '0994284724724', 'naufal1103@gmail.com', '1131313131313131', 'KO-20251106-980', '2025-11-06 00:00:00', '2025-11-07 00:00:00', 1, '85000.00', NULL, NULL, '0.00', '0.00', NULL, 'pending', 'unpaid', '2025-11-06 14:22:05', '2025-11-06 07:22:05', ''),
(60, 12, 'Naufal zakwan', '0994284724724', 'naufal1103@gmail.com', '1131313131313131', 'KO-20251106-433', '2025-11-07 00:00:00', '2025-11-08 00:00:00', 1, '85000.00', NULL, NULL, '0.00', '0.00', NULL, 'active', 'paid', '2025-11-06 14:25:32', '2025-11-06 07:35:46', ''),
(61, 12, 'Naufal zakwan', '0994284724724', 'naufal1103@gmail.com', '1131313131313131', 'KO-20251106-584', '2025-11-07 00:00:00', '2025-11-08 00:00:00', 1, '30000.00', NULL, NULL, '0.00', '0.00', NULL, 'completed', 'paid', '2025-11-06 14:40:44', '2025-11-06 07:42:32', ''),
(62, 12, 'Naufal zakwan', '0994284724724', 'naufal1103@gmail.com', '1131313131313131', 'KO-20251116-234', '2025-11-17 00:00:00', '2025-11-19 00:00:00', 2, '100000.00', NULL, NULL, '0.00', '0.00', NULL, 'pending', 'unpaid', '2025-11-16 13:05:10', '2025-11-16 06:05:10', 'vhvvhhv'),
(63, 12, 'Naufal zakwan', '0994284724724', 'naufal1103@gmail.com', '1131313131313131', 'KO-20251116-593', '2025-11-17 00:00:00', '2025-11-19 00:00:00', 2, '100000.00', NULL, NULL, '0.00', '0.00', NULL, 'pending', 'unpaid', '2025-11-16 13:05:41', '2025-11-16 06:05:41', 'vhvvhhv'),
(64, 12, 'Naufal zakwan', '0994284724724', 'naufal1103@gmail.com', '1131313131313131', 'KO-20251116-661', '2025-11-17 00:00:00', '2025-11-19 00:00:00', 2, '100000.00', NULL, NULL, '0.00', '0.00', NULL, 'pending', 'unpaid', '2025-11-16 13:05:55', '2025-11-16 06:05:55', 'vhvvhhv'),
(65, 12, 'Naufal zakwan', '0994284724724', 'naufal1103@gmail.com', '1131313131313131', 'KO-20251116-493', '2025-11-17 00:00:00', '2025-11-19 00:00:00', 2, '100000.00', NULL, '105009.00', '0.00', '5009.00', 15295, 'completed', 'paid', '2025-11-16 13:07:26', '2025-11-29 07:55:59', 'vhvvhhv'),
(66, 12, 'Naufal zakwan', '0994284724724', 'naufal1103@gmail.com', '1131313131313131', 'KO-20251116-779', '2025-11-17 00:00:00', '2025-11-18 00:00:00', 1, '50000.00', NULL, NULL, '0.00', '0.00', NULL, 'completed', 'paid', '2025-11-16 13:08:23', '2025-11-16 06:11:14', 'hggh'),
(67, 12, 'Naufal zakwan', '0994284724724', 'naufal1103@gmail.com', '1131313131313131', 'KO-20251116-390', '2025-11-17 00:00:00', '2025-11-19 00:00:00', 2, '400000.00', NULL, NULL, '0.00', '0.00', NULL, 'completed', 'paid', '2025-11-16 13:14:59', '2025-11-16 06:16:46', 'gygy'),
(68, 12, 'Naufal zakwan', '0994284724724', 'naufal1103@gmail.com', '1131313131313131', 'KO-20251129-695', '2025-11-29 00:00:00', '2025-11-30 00:00:00', 1, '200000.00', NULL, NULL, '0.00', '0.00', NULL, 'pending', 'unpaid', '2025-11-29 14:56:17', '2025-11-29 07:56:17', 'casca');

-- --------------------------------------------------------

--
-- Table structure for table `booking_history`
--

CREATE TABLE `booking_history` (
  `history_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `old_status` varchar(50) DEFAULT NULL,
  `new_status` varchar(50) DEFAULT NULL,
  `changed_by` varchar(100) DEFAULT NULL,
  `changed_at` datetime DEFAULT current_timestamp(),
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `booking_items`
--

CREATE TABLE `booking_items` (
  `booking_item_id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `equipment_id` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `item_type` enum('single','package') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_items`
--

INSERT INTO `booking_items` (`booking_item_id`, `booking_id`, `equipment_id`, `package_id`, `quantity`, `unit_price`, `item_type`) VALUES
(47, 39, 22, NULL, 1, '0.00', 'single'),
(48, 40, 22, NULL, 1, '0.00', 'single'),
(53, 50, NULL, 1, 2, '0.00', 'single'),
(54, 51, NULL, 1, 2, '0.00', 'single'),
(55, 52, 1, NULL, 1, '0.00', 'single'),
(56, 52, 21, NULL, 1, '0.00', 'single'),
(57, 52, 22, NULL, 2, '0.00', 'single'),
(58, 52, 23, NULL, 1, '0.00', 'single'),
(59, 53, 23, NULL, 1, '0.00', 'single'),
(60, 54, 23, NULL, 1, '0.00', 'single'),
(61, 55, 23, NULL, 1, '0.00', 'single'),
(65, 59, 21, NULL, 1, '0.00', 'single'),
(66, 59, 22, NULL, 1, '0.00', 'single'),
(67, 60, 21, NULL, 1, '0.00', 'single'),
(68, 60, 22, NULL, 1, '0.00', 'single'),
(69, 61, 6, NULL, 2, '0.00', 'single'),
(70, 62, 21, NULL, 2, '0.00', 'single'),
(71, 63, 21, NULL, 2, '0.00', 'single'),
(72, 64, 21, NULL, 2, '0.00', 'single'),
(73, 65, 21, NULL, 2, '0.00', 'single'),
(74, 66, 21, NULL, 2, '0.00', 'single'),
(75, 67, NULL, 1, 1, '0.00', 'single'),
(76, 68, NULL, 1, 1, '0.00', 'single');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `equipment_id` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL,
  `package_name` varchar(255) DEFAULT NULL,
  `capacity` varchar(50) DEFAULT NULL,
  `cart_type` enum('equipment','package') NOT NULL DEFAULT 'equipment',
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price_per_day` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `rental_start_date` date DEFAULT NULL,
  `rental_end_date` date DEFAULT NULL,
  `rental_days` int(11) NOT NULL DEFAULT 1,
  `is_checked` tinyint(1) NOT NULL DEFAULT 1,
  `added_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `customer_id`, `equipment_id`, `package_id`, `package_name`, `capacity`, `cart_type`, `quantity`, `price_per_day`, `total_price`, `rental_start_date`, `rental_end_date`, `rental_days`, `is_checked`, `added_at`, `updated_at`) VALUES
(35, 10, 22, NULL, NULL, NULL, 'equipment', 1, '0.00', '0.00', NULL, NULL, 1, 1, '2025-11-03 13:53:29', '2025-11-03 13:53:29'),
(36, 11, 22, NULL, NULL, NULL, 'equipment', 1, '0.00', '0.00', NULL, NULL, 1, 1, '2025-11-03 15:34:23', '2025-11-03 15:34:23'),
(46, 6, 5, NULL, NULL, NULL, 'equipment', 1, '0.00', '0.00', NULL, NULL, 1, 1, '2025-11-06 00:40:20', '2025-11-06 00:40:20'),
(52, 12, NULL, 1, 'PAKET KOMPLIT 6 ORANGs', '6-8 Orang', 'package', 1, '200000.00', '200000.00', NULL, NULL, 0, 1, '2025-11-16 13:14:33', '2025-11-16 13:14:33');

-- --------------------------------------------------------

--
-- Table structure for table `compensations`
--

CREATE TABLE `compensations` (
  `compensation_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `compensation_type` enum('cancellation_fee','late_fee','damage_fee','cleaning_fee') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `reason` text DEFAULT NULL,
  `status` enum('pending','paid','waived') DEFAULT 'pending',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `identity_card_number` varchar(50) NOT NULL,
  `emergency_contact` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `google_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `phone`, `email`, `identity_card_number`, `emergency_contact`, `password_hash`, `created_at`, `google_id`) VALUES
(1, 'Ahmad Fauzi', '081234567890', 'ahmad.fauzi@email.com', '3201234567890123', '081987654321', NULL, '2025-10-19 12:37:40', NULL),
(2, 'Siti Nurhaliza', '082345678901', 'siti.nur@email.com', '3202345678901234', '082876543210', NULL, '2025-10-19 12:37:40', NULL),
(3, 'Budi Santoso', '083456789012', 'budi.santoso@email.com', '3203456789012345', '083765432109', NULL, '2025-10-19 12:37:40', NULL),
(4, 'Tes User', '0812345678', 'tes@email.com', '', NULL, '$2y$10$tdwEgFAtgsig/C7uMjxuAOF5tF.b38hAzlcVRhsavJvW8uH0rlWju', '2025-10-26 13:54:29', NULL),
(5, 'caca', 'er242424242424', 'clvn@gmail.com', '', NULL, '$2y$10$cDNJaW91hf7AK2EiGblAw.vpcFbSd5wtYkkWlU.XNZY6KAG3GdICe', '2025-10-26 14:27:11', NULL),
(6, 'Mika Mika', '', 'mikamika10kaka@gmail.com', '', NULL, NULL, '2025-10-26 14:51:38', '117044714766439847508'),
(7, 'Calvin Stven', '', 'levinackerman1315@gmail.com', '', NULL, NULL, '2025-10-29 07:00:36', '107389994898673358866'),
(8, 'Ichsan', '', 'muhammadichsan2017@gmail.com', '', NULL, NULL, '2025-10-29 08:26:18', '100872028233247279713'),
(9, 'firdausichsan2023 ichsan', '', 'framezyy2023@gmail.com', '', NULL, NULL, '2025-10-29 08:44:35', '107377435426494852165'),
(10, 'Naufal Zakwan', '', 'nzakwan422@gmail.com', '', NULL, NULL, '2025-10-29 21:21:49', '117964270012116395815'),
(11, 'Naufal Zakwan', '', 'nflzkwn@gmail.com', '', NULL, NULL, '2025-11-03 15:26:36', '102028825789076583788'),
(12, 'Naufal zakwan', '', 'naufal1103@gmail.com', '', NULL, NULL, '2025-11-06 10:14:01', '100468665844555463757');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `equipment_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(20) NOT NULL,
  `description` text DEFAULT NULL,
  `category` enum('tenda','tas','sleeping_bag','kompor','matras','lainnya') NOT NULL,
  `size_capacity` varchar(50) DEFAULT NULL,
  `dimensions` varchar(100) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `material` varchar(100) DEFAULT NULL,
  `stock_quantity` int(11) NOT NULL,
  `price_per_day` decimal(10,2) NOT NULL,
  `condition_item` enum('baik','rusak_ringan','perbaikan') DEFAULT 'baik',
  `equipment_type` enum('single') DEFAULT 'single',
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`equipment_id`, `name`, `code`, `description`, `category`, `size_capacity`, `dimensions`, `weight`, `material`, `stock_quantity`, `price_per_day`, `condition_item`, `equipment_type`, `image_url`, `created_at`) VALUES
(1, 'KOMPOR PORTIBLE', 'KOMPOR-0001', 'Tenda berkualitas tinggi untuk grup besar', 'kompor', '', '300x250x180 cm', '8.50', 'Alumunium', 5, '15000.00', 'baik', 'single', NULL, '2025-10-18 22:00:25'),
(2, 'Tenda Kapasitas 4-5 Orang', 'TENDA-002', 'Kompor Kecil', 'kompor', '', '250x220x160 cm', '6.20', 'Alumunium', 8, '8000.00', 'baik', 'single', NULL, '2025-10-18 22:00:25'),
(3, 'Tas Gunung 60 Liter', 'TAS-001', 'Tas carrier untuk pendakian multi-hari', 'tas', '60 Liter', '70x35x35 cm', '1.80', 'Ripstop Nylon', 10, '25000.00', 'baik', 'single', NULL, '2025-10-18 22:00:25'),
(4, 'Tas Gunung 45 Liter', 'TAS-002', 'Tas carrier ringan untuk day hiking', 'tas', '45 Liter', '65x30x30 cm', '1.50', 'Polyester 600D', 12, '20000.00', 'baik', 'single', NULL, '2025-10-18 22:00:25'),
(5, 'Kompor Portable Kecil', 'KOMPOR-001', 'Kompor gas portable yang efisien', 'kompor', '220g gas', '12x8x8 cm', '0.40', 'Aluminium + Baja', 15, '8000.00', 'baik', 'single', NULL, '2025-10-18 22:00:25'),
(6, 'Kompor Portable Besar', 'KOMPOR-002', 'Kompor gas untuk masak grup', 'kompor', '450g gas', '15x10x10 cm', '0.70', 'Stainless Steel', 8, '15000.00', 'baik', 'single', NULL, '2025-10-18 22:00:25'),
(7, 'Matras Camping Standard', 'MATRAS-001', 'Matras camping standar yang tahan lama', 'matras', 'Single', '183x51x2.5 cm', '0.90', 'PVC Tahan Air', 20, '10000.00', 'baik', 'single', NULL, '2025-10-18 22:00:25'),
(8, 'Sleeping Bag Standard', 'SLEEP-001', 'Sleeping bag untuk cuaca normal', 'sleeping_bag', 'Single', '220x80 cm', '1.20', 'Polyester 240T', 15, '12000.00', 'baik', 'single', NULL, '2025-10-18 22:00:25'),
(9, 'Sleeping Bag Four Season', 'SLEEP-002', 'Sleeping bag untuk cuaca ekstrem', 'sleeping_bag', 'Single -5°C', '220x80 cm', '2.10', 'Duck Down + Nylon', 8, '20000.00', 'baik', 'single', NULL, '2025-10-18 22:00:25'),
(21, 'TAS GUNUNG', 'TAS-003', 'dadadadadad', 'tas', '60 Liter', '300x200x100 cm', '8.00', 'Nilon', 3, '25000.00', 'baik', 'single', NULL, '2025-10-19 15:45:28'),
(22, 'TENDA', 'TENDA 003', 'Tenda Besar', 'tenda', '6-8', '400cm', '7.50', 'nylon', 5, '60000.00', 'baik', 'single', NULL, '2025-10-20 07:27:54'),
(23, 'Tenda Kema', 'TENDA-003', 'kakakak', 'tenda', '6', '300x200x100', '9.00', 'nmmm', 6, '50000.00', 'baik', 'single', NULL, '2025-10-23 14:10:07'),
(24, 'tas 45', 'TAS-01', '', 'tas', '25 liter', '', NULL, '', 5, '25000.00', 'baik', 'single', NULL, '2025-11-16 13:19:29');

-- --------------------------------------------------------

--
-- Table structure for table `equipment_images`
--

CREATE TABLE `equipment_images` (
  `image_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment_images`
--

INSERT INTO `equipment_images` (`image_id`, `equipment_id`, `image_url`, `is_primary`, `display_order`, `created_at`) VALUES
(51, 3, '/uploads/equipment/tas-001_1761689440_1_69013f6006e65.jpg', 1, 1, '2025-10-28 22:10:40'),
(52, 3, '/uploads/equipment/tas-001_1761689440_2_69013f60089d9.jpg', 0, 2, '2025-10-28 22:10:40'),
(53, 3, '/uploads/equipment/tas-001_1761689440_3_69013f6009fc6.jpg', 0, 3, '2025-10-28 22:10:40'),
(54, 3, '/uploads/equipment/tas-001_1761689440_4_69013f600b349.jpg', 0, 4, '2025-10-28 22:10:40'),
(55, 3, '/uploads/equipment/tas-001_1761689440_5_69013f600c673.jpg', 0, 5, '2025-10-28 22:10:40'),
(56, 3, '/uploads/equipment/tas-001_1761689440_6_69013f600dea0.jpg', 0, 6, '2025-10-28 22:10:40'),
(57, 3, '/uploads/equipment/tas-001_1761689440_7_69013f600f211.jpg', 0, 7, '2025-10-28 22:10:40'),
(58, 3, '/uploads/equipment/tas-001_1761689440_8_69013f6010549.jpg', 0, 8, '2025-10-28 22:10:40'),
(67, 5, '/uploads/equipment/kompor-001_1761689470_1_69013f7ee892b.jpg', 1, 1, '2025-10-28 22:11:10'),
(68, 5, '/uploads/equipment/kompor-001_1761689470_2_69013f7eea2d8.jpg', 0, 2, '2025-10-28 22:11:10'),
(69, 5, '/uploads/equipment/kompor-001_1761689470_3_69013f7eebaad.jpg', 0, 3, '2025-10-28 22:11:10'),
(70, 5, '/uploads/equipment/kompor-001_1761689470_4_69013f7eed1b7.jpg', 0, 4, '2025-10-28 22:11:10'),
(71, 5, '/uploads/equipment/kompor-001_1761689470_5_69013f7eeeb6e.jpg', 0, 5, '2025-10-28 22:11:10'),
(72, 5, '/uploads/equipment/kompor-001_1761689470_6_69013f7eeff1e.jpg', 0, 6, '2025-10-28 22:11:10'),
(73, 5, '/uploads/equipment/kompor-001_1761689470_7_69013f7ef1398.jpg', 0, 7, '2025-10-28 22:11:10'),
(74, 5, '/uploads/equipment/kompor-001_1761689470_8_69013f7ef265f.jpg', 0, 8, '2025-10-28 22:11:10'),
(75, 6, '/uploads/equipment/kompor-002_1761689481_1_69013f899e535.jpg', 1, 1, '2025-10-28 22:11:21'),
(76, 6, '/uploads/equipment/kompor-002_1761689481_2_69013f899fd00.jpg', 0, 2, '2025-10-28 22:11:21'),
(77, 6, '/uploads/equipment/kompor-002_1761689481_3_69013f89a12ce.jpg', 0, 3, '2025-10-28 22:11:21'),
(78, 6, '/uploads/equipment/kompor-002_1761689481_4_69013f89a262a.jpg', 0, 4, '2025-10-28 22:11:21'),
(79, 6, '/uploads/equipment/kompor-002_1761689481_5_69013f89a3e78.jpg', 0, 5, '2025-10-28 22:11:21'),
(80, 6, '/uploads/equipment/kompor-002_1761689481_6_69013f89a5158.jpg', 0, 6, '2025-10-28 22:11:21'),
(81, 6, '/uploads/equipment/kompor-002_1761689481_7_69013f89a64ba.jpg', 0, 7, '2025-10-28 22:11:21'),
(82, 6, '/uploads/equipment/kompor-002_1761689481_8_69013f89a78cb.jpg', 0, 8, '2025-10-28 22:11:21'),
(83, 7, '/uploads/equipment/matras-001_1761689495_1_69013f974b18f.jpg', 1, 1, '2025-10-28 22:11:35'),
(84, 7, '/uploads/equipment/matras-001_1761689495_2_69013f974dbf4.jpg', 0, 2, '2025-10-28 22:11:35'),
(85, 7, '/uploads/equipment/matras-001_1761689495_3_69013f97503d4.jpg', 0, 3, '2025-10-28 22:11:35'),
(86, 7, '/uploads/equipment/matras-001_1761689495_4_69013f9751e19.jpg', 0, 4, '2025-10-28 22:11:35'),
(87, 7, '/uploads/equipment/matras-001_1761689495_5_69013f975356b.jpg', 0, 5, '2025-10-28 22:11:35'),
(88, 7, '/uploads/equipment/matras-001_1761689495_6_69013f9754ce9.jpg', 0, 6, '2025-10-28 22:11:35'),
(89, 7, '/uploads/equipment/matras-001_1761689495_7_69013f97560d8.jpg', 0, 7, '2025-10-28 22:11:35'),
(90, 7, '/uploads/equipment/matras-001_1761689495_8_69013f975772c.jpg', 0, 8, '2025-10-28 22:11:35'),
(91, 8, '/uploads/equipment/sleep-001_1761689504_1_69013fa0f01b8.jpg', 1, 1, '2025-10-28 22:11:44'),
(92, 8, '/uploads/equipment/sleep-001_1761689504_2_69013fa0f1fc8.jpg', 0, 2, '2025-10-28 22:11:44'),
(93, 8, '/uploads/equipment/sleep-001_1761689504_3_69013fa0f370f.jpg', 0, 3, '2025-10-28 22:11:44'),
(94, 8, '/uploads/equipment/sleep-001_1761689505_4_69013fa1007a7.jpg', 0, 4, '2025-10-28 22:11:45'),
(95, 8, '/uploads/equipment/sleep-001_1761689505_5_69013fa101e64.jpg', 0, 5, '2025-10-28 22:11:45'),
(96, 8, '/uploads/equipment/sleep-001_1761689505_6_69013fa1031e3.jpg', 0, 6, '2025-10-28 22:11:45'),
(97, 8, '/uploads/equipment/sleep-001_1761689505_7_69013fa104588.jpg', 0, 7, '2025-10-28 22:11:45'),
(98, 8, '/uploads/equipment/sleep-001_1761689505_8_69013fa10588f.jpg', 0, 8, '2025-10-28 22:11:45'),
(99, 9, '/uploads/equipment/sleep-002_1761689514_1_69013faa627c7.jpg', 1, 1, '2025-10-28 22:11:54'),
(100, 9, '/uploads/equipment/sleep-002_1761689514_2_69013faa654e2.jpg', 0, 2, '2025-10-28 22:11:54'),
(101, 9, '/uploads/equipment/sleep-002_1761689514_3_69013faa66833.jpg', 0, 3, '2025-10-28 22:11:54'),
(102, 9, '/uploads/equipment/sleep-002_1761689514_4_69013faa67bec.jpg', 0, 4, '2025-10-28 22:11:54'),
(103, 9, '/uploads/equipment/sleep-002_1761689514_5_69013faa68f86.jpg', 0, 5, '2025-10-28 22:11:54'),
(104, 9, '/uploads/equipment/sleep-002_1761689514_6_69013faa6a82f.jpg', 0, 6, '2025-10-28 22:11:54'),
(105, 9, '/uploads/equipment/sleep-002_1761689514_7_69013faa6be76.jpg', 0, 7, '2025-10-28 22:11:54'),
(106, 9, '/uploads/equipment/sleep-002_1761689514_8_69013faa6d1c7.jpg', 0, 8, '2025-10-28 22:11:54'),
(108, 23, '/uploads/equipment/tenda-003_1762409503_1_690c3c1f651cb.jpg', 1, 1, '2025-11-06 06:11:43'),
(109, 23, '/uploads/equipment/tenda-003_1762409524_1_690c3c34c4872.jpg', 0, 2, '2025-11-06 06:12:04'),
(110, 23, '/uploads/equipment/tenda-003_1762409535_1_690c3c3f9a8f0.jpg', 0, 3, '2025-11-06 06:12:15'),
(111, 23, '/uploads/equipment/tenda-003_1762409548_1_690c3c4c03627.jpg', 0, 4, '2025-11-06 06:12:28'),
(112, 23, '/uploads/equipment/tenda-003_1762409558_1_690c3c5617cd0.jpg', 0, 5, '2025-11-06 06:12:38'),
(113, 23, '/uploads/equipment/tenda-003_1762409576_1_690c3c688dcc3.jpg', 0, 6, '2025-11-06 06:12:56'),
(114, 23, '/uploads/equipment/tenda-003_1762409587_1_690c3c7351944.jpg', 0, 7, '2025-11-06 06:13:07'),
(115, 23, '/uploads/equipment/tenda-003_1762409605_1_690c3c85512da.jpg', 0, 8, '2025-11-06 06:13:25'),
(116, 4, '/uploads/equipment/tas-002_1762409673_1_690c3cc9b08ba.jpg', 1, 1, '2025-11-06 06:14:33'),
(118, 4, '/uploads/equipment/tas-002_1762409709_1_690c3ced7c8af.jpg', 0, 2, '2025-11-06 06:15:09'),
(119, 4, '/uploads/equipment/tas-002_1762409723_1_690c3cfbd3c56.jpg', 0, 3, '2025-11-06 06:15:23'),
(120, 4, '/uploads/equipment/tas-002_1762409735_1_690c3d0730817.jpg', 0, 4, '2025-11-06 06:15:35'),
(121, 4, '/uploads/equipment/tas-002_1762409747_1_690c3d137eaff.jpg', 0, 5, '2025-11-06 06:15:47'),
(122, 4, '/uploads/equipment/tas-002_1762409766_1_690c3d264f43e.jpg', 0, 6, '2025-11-06 06:16:06'),
(123, 4, '/uploads/equipment/tas-002_1762409778_1_690c3d321f181.jpg', 0, 7, '2025-11-06 06:16:18'),
(124, 4, '/uploads/equipment/tas-002_1762409787_1_690c3d3b0fe68.jpg', 0, 8, '2025-11-06 06:16:27'),
(125, 22, '/uploads/equipment/tenda003_1762412768_1_690c48e043112.jpg', 1, 9, '2025-11-06 07:06:08'),
(126, 22, '/uploads/equipment/tenda003_1762412812_1_690c490cddeaa.jpg', 0, 10, '2025-11-06 07:06:52'),
(127, 21, '/uploads/equipment/tas-003_1762412900_1_690c4964b4fe7.jpg', 1, 1, '2025-11-06 07:08:20'),
(128, 21, '/uploads/equipment/tas-003_1762412912_1_690c497077564.jpg', 0, 2, '2025-11-06 07:08:32'),
(129, 21, '/uploads/equipment/tas-003_1762412923_1_690c497b8fd04.jpg', 0, 3, '2025-11-06 07:08:43'),
(130, 1, '/uploads/equipment/kompor-0001_1762413034_1_690c49ea4cc18.jpg', 1, 1, '2025-11-06 07:10:34'),
(131, 2, '/uploads/equipment/tenda-002_1762413109_1_690c4a359cbae.jpg', 1, 1, '2025-11-06 07:11:49'),
(132, 22, '/uploads/equipment/tenda003_1762413121_1_690c4a4170d33.jpg', 0, 11, '2025-11-06 07:12:01'),
(133, 22, '/uploads/equipment/tenda003_1762413130_1_690c4a4a055bb.jpg', 0, 12, '2025-11-06 07:12:10'),
(134, 22, '/uploads/equipment/tenda003_1762413139_1_690c4a53aedee.jpg', 0, 13, '2025-11-06 07:12:19'),
(135, 24, '/uploads/equipment/tas-01_1763273969_1_69196cf1a1e21.jpg', 1, 1, '2025-11-16 06:19:29');

-- --------------------------------------------------------

--
-- Table structure for table `equipment_packages`
--

CREATE TABLE `equipment_packages` (
  `package_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `capacity` varchar(100) DEFAULT NULL,
  `capacity_text` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `cancellation_policy` text DEFAULT NULL,
  `package_price` decimal(10,2) NOT NULL,
  `duration_days` int(11) DEFAULT 1,
  `badge_text` varchar(50) DEFAULT NULL,
  `badge_color` varchar(50) DEFAULT NULL,
  `is_popular` tinyint(1) DEFAULT 0,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `total_items` int(11) NOT NULL,
  `included_items_count` int(11) DEFAULT 0,
  `package_stock` int(11) NOT NULL DEFAULT 0,
  `package_stock_reserved` int(11) NOT NULL DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment_packages`
--

INSERT INTO `equipment_packages` (`package_id`, `name`, `capacity`, `capacity_text`, `description`, `terms_conditions`, `cancellation_policy`, `package_price`, `duration_days`, `badge_text`, `badge_color`, `is_popular`, `display_order`, `is_active`, `total_items`, `included_items_count`, `package_stock`, `package_stock_reserved`, `image_url`, `thumbnail_url`, `created_at`, `updated_at`) VALUES
(1, 'PAKET KOMPLIT 6 ORANGs', '6-8 Orang', '', 'Paket lengkap untuk grup camping 6-8 orang dengan semua equipment yang dibutuhkan', NULL, NULL, '200000.00', 1, 'REKOMENDASI GRUP', 'bg-orange-500', 1, 1, 1, 0, 0, 25, 0, NULL, NULL, '2025-10-30 08:16:51', '2025-11-04 01:09:52'),
(2, 'PAKET KOMPLIT 4 ORANG', '4-5 Orang', NULL, 'Paket lengkap untuk grup camping 4-5 orang, pilihan paling populer', NULL, NULL, '140000.00', 1, 'PALING POPULER', 'bg-green-500', 1, 2, 1, 9, 0, 30, 0, NULL, NULL, '2025-10-30 08:16:51', '2025-10-30 09:15:07'),
(3, 'PAKET KOMPLIT 2 ORANG', '2-3 Orang', NULL, 'Paket hemat untuk couple atau grup kecil 2-3 orang', NULL, NULL, '100000.00', 1, 'HEMAT', 'bg-blue-500', 0, 3, 1, 9, 0, 40, 0, NULL, NULL, '2025-10-30 08:16:51', '2025-10-30 09:15:07'),
(4, 'PAKET HEMAT 6 ORANG', '6-8 Orang', NULL, 'Paket value terbaik untuk grup 6-8 orang dengan harga ekonomis', NULL, NULL, '140000.00', 1, 'BEST VALUE', 'bg-red-500', 0, 4, 1, 8, 0, 20, 0, NULL, NULL, '2025-10-30 08:16:51', '2025-10-30 09:15:07');

-- --------------------------------------------------------

--
-- Table structure for table `equipment_rental_terms`
--

CREATE TABLE `equipment_rental_terms` (
  `term_id` int(10) UNSIGNED NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL COMMENT 'Kategori: Peminjaman, Pengembalian, Biaya, dll',
  `term_text` text NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `equipment_rental_terms`
--

INSERT INTO `equipment_rental_terms` (`term_id`, `equipment_id`, `category`, `term_text`, `display_order`, `created_at`, `updated_at`) VALUES
(10, 23, 'Umum', 'harus menggunakan tameng', 0, '2025-11-06 06:13:25', '2025-11-06 06:13:25'),
(11, 4, 'Peminjam', 'Tidak boleh rusak dan ketika pengembalian harus keadaan normal', 0, '2025-11-06 06:18:22', '2025-11-06 06:18:22');

-- --------------------------------------------------------

--
-- Table structure for table `equipment_reviews`
--

CREATE TABLE `equipment_reviews` (
  `review_id` int(10) UNSIGNED NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` tinyint(4) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `equipment_usage_guides`
--

CREATE TABLE `equipment_usage_guides` (
  `guide_id` int(10) UNSIGNED NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `equipment_usage_guides`
--

INSERT INTO `equipment_usage_guides` (`guide_id`, `equipment_id`, `step_number`, `title`, `description`, `image_url`, `created_at`, `updated_at`) VALUES
(12, 23, 1, 'memakai baju rodidad', 'dadaadadadadad', NULL, '2025-11-06 06:13:25', '2025-11-06 06:13:25');

-- --------------------------------------------------------

--
-- Table structure for table `merchandise`
--

CREATE TABLE `merchandise` (
  `merchandise_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `color` varchar(50) NOT NULL,
  `color_hex` char(7) DEFAULT NULL,
  `price` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `stock` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `sizes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `material` varchar(120) DEFAULT NULL,
  `weight` int(10) UNSIGNED DEFAULT NULL,
  `description` text DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `open_trips`
--

CREATE TABLE `open_trips` (
  `trip_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `trip_date` datetime NOT NULL,
  `location` varchar(100) NOT NULL,
  `max_participants` int(11) NOT NULL,
  `current_participants` int(11) DEFAULT 0,
  `price` decimal(10,2) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `status` enum('upcoming','ongoing','completed','cancelled') DEFAULT 'upcoming',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `open_trips`
--

INSERT INTO `open_trips` (`trip_id`, `title`, `description`, `trip_date`, `location`, `max_participants`, `current_participants`, `price`, `image_url`, `status`, `created_at`) VALUES
(1, 'Pendakian Gunung Semeru', 'Pendakian 3D2N ke puncak tertinggi Jawa', '2024-12-15 06:00:00', 'Gunung Semeru, Jawa Timur', 15, 0, '850000.00', NULL, 'upcoming', '2025-10-18 22:00:58'),
(2, 'Camping di Ranca Upas', 'Camping santai di padang savana', '2024-12-22 14:00:00', 'Ranca Upas, Bandung', 25, 0, '350000.00', NULL, 'upcoming', '2025-10-18 22:00:58'),
(3, 'Hiking Kawah Putih', 'Day hiking ke kawah putih Ciwidey', '2024-12-08 07:00:00', 'Kawah Putih, Bandung', 30, 0, '180000.00', NULL, 'upcoming', '2025-10-18 22:00:58');

-- --------------------------------------------------------

--
-- Table structure for table `package_availability`
--

CREATE TABLE `package_availability` (
  `availability_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `available_stock` int(11) DEFAULT 0,
  `reserved_stock` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `package_bookings`
--

CREATE TABLE `package_bookings` (
  `booking_id` int(11) NOT NULL,
  `customer_id` varchar(100) NOT NULL,
  `package_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_days` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `payment_status` enum('pending','paid','cancelled','refunded') DEFAULT 'pending',
  `booking_status` enum('pending','confirmed','in_progress','completed','cancelled') DEFAULT 'pending',
  `pickup_location` varchar(255) DEFAULT NULL,
  `delivery_location` varchar(255) DEFAULT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `customer_phone` varchar(20) DEFAULT NULL,
  `customer_email` varchar(100) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `admin_notes` text DEFAULT NULL,
  `payment_proof` varchar(255) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `confirmed_by` int(11) DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `package_cart`
--

CREATE TABLE `package_cart` (
  `cart_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `total_days` int(11) DEFAULT 1,
  `quantity` int(11) DEFAULT 1,
  `rental_start_date` date NOT NULL,
  `rental_end_date` date NOT NULL,
  `rental_days` int(11) NOT NULL,
  `price_per_day` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `notes` text DEFAULT NULL,
  `is_checked` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `package_items`
--

CREATE TABLE `package_items` (
  `package_item_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `item_name` varchar(200) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `display_order` int(11) DEFAULT 0,
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `package_items`
--

INSERT INTO `package_items` (`package_item_id`, `package_id`, `item_name`, `quantity`, `display_order`, `notes`, `created_at`) VALUES
(10, 2, 'TENDA KAPASITAS 4-5 ORANG', 1, 1, NULL, '2025-10-30 08:17:20'),
(11, 2, 'TAS GUNUNG 45 LITER', 2, 2, NULL, '2025-10-30 08:17:20'),
(12, 2, 'LAMPU TENDA', 1, 3, NULL, '2025-10-30 08:17:20'),
(13, 2, 'FLYSHEET UKURAN 3X4', 1, 4, NULL, '2025-10-30 08:17:20'),
(14, 2, 'KOMPOR PORTABLE', 1, 5, NULL, '2025-10-30 08:17:20'),
(15, 2, 'COOKING SET', 1, 6, NULL, '2025-10-30 08:17:20'),
(16, 2, 'GAS', 2, 7, NULL, '2025-10-30 08:17:20'),
(17, 2, 'MATRAS', 4, 8, NULL, '2025-10-30 08:17:20'),
(18, 2, 'HEADLAMP', 4, 9, NULL, '2025-10-30 08:17:20'),
(19, 3, 'TENDA KAPASITAS 2-3 ORANG', 1, 1, NULL, '2025-10-30 08:17:20'),
(20, 3, 'TAS GUNUNG 45 LITER', 2, 2, NULL, '2025-10-30 08:17:20'),
(21, 3, 'LAMPU TENDA', 1, 3, NULL, '2025-10-30 08:17:20'),
(22, 3, 'FLYSHEET UKURAN 3X4', 1, 4, NULL, '2025-10-30 08:17:20'),
(23, 3, 'KOMPOR PORTABLE', 1, 5, NULL, '2025-10-30 08:17:20'),
(24, 3, 'COOKING SET', 1, 6, NULL, '2025-10-30 08:17:20'),
(25, 3, 'GAS', 4, 7, NULL, '2025-10-30 08:17:20'),
(26, 3, 'MATRAS', 2, 8, NULL, '2025-10-30 08:17:20'),
(27, 3, 'HEADLAMP', 2, 9, NULL, '2025-10-30 08:17:20'),
(28, 4, 'TENDA KAPASITAS 6-8 ORANG', 1, 1, NULL, '2025-10-30 08:17:20'),
(29, 4, 'LAMPU TENDA', 1, 2, NULL, '2025-10-30 08:17:20'),
(30, 4, 'FLYSHEET UKURAN 3X3', 1, 3, NULL, '2025-10-30 08:17:20'),
(31, 4, 'KOMPOR PORTABLE', 1, 4, NULL, '2025-10-30 08:17:20'),
(32, 4, 'COOKING SET', 1, 5, NULL, '2025-10-30 08:17:20'),
(33, 4, 'GAS', 2, 6, NULL, '2025-10-30 08:17:20'),
(34, 4, 'MATRAS', 4, 7, NULL, '2025-10-30 08:17:20'),
(35, 4, 'HEADLAMP', 6, 8, NULL, '2025-10-30 08:17:20'),
(40, 1, 'tenda', 1, 1, NULL, '2025-11-04 01:12:37'),
(41, 1, 'sepatu', 1, 2, NULL, '2025-11-04 01:12:37');

-- --------------------------------------------------------

--
-- Table structure for table `stock_movements`
--

CREATE TABLE `stock_movements` (
  `movement_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `movement_type` enum('in','out') NOT NULL,
  `quantity` int(11) NOT NULL,
  `reference_type` enum('booking','return','adjustment','damage') NOT NULL,
  `reference_id` int(11) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `trip_id` int(11) NOT NULL,
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
  `cover_image` varchar(500) DEFAULT NULL COMMENT 'JSON array',
  `images` text DEFAULT NULL COMMENT 'JSON array',
  `required_gear` text DEFAULT NULL COMMENT 'JSON array',
  `rules` text DEFAULT NULL COMMENT 'JSON array',
  `search_tags` text DEFAULT NULL COMMENT 'JSON array',
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_whatsapp` varchar(20) DEFAULT NULL,
  `contact_role` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive','completed') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`trip_id`, `title`, `location`, `map_url`, `meeting_point_name`, `meeting_point_address`, `meeting_point_map_url`, `start_date`, `start_time`, `duration_days`, `remaining_quota`, `total_quota`, `difficulty`, `category`, `short_description`, `itinerary`, `cover_image`, `images`, `required_gear`, `rules`, `search_tags`, `contact_name`, `contact_whatsapp`, `contact_role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Gunung Himalaya', 'USA', NULL, 'Polnep', 'Paris 1', '', '2025-11-07', '11:11:00', 5, 34, 34, 'Berat', 'Mendaki', 'Saya ada dua', '[]', 'http://localhost/PBL-KELANA-OUTDOOR/uploads/trips/trip_690c11ac4683f_1762398636.jpg', '[]', '[]', '[]', '[]', 'Calvin', '6281344492934', 'Admin', 'active', '2025-11-06 03:11:17', '2025-11-06 03:11:17');

-- --------------------------------------------------------

--
-- Table structure for table `trip_participations`
--

CREATE TABLE `trip_participations` (
  `participation_id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `status` enum('registered','confirmed','cancelled') DEFAULT 'registered',
  `registered_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `identity_type` enum('NIK','KTP','SIM') DEFAULT 'NIK',
  `identity_number` varchar(16) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` enum('Laki-laki','Perempuan') DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `is_complete` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`id`, `user_id`, `email`, `full_name`, `identity_type`, `identity_number`, `birth_date`, `gender`, `phone`, `address`, `profile_picture`, `is_complete`, `created_at`, `updated_at`) VALUES
(1, 9, 'ihsanalhusna4@gmail.com', 'IHSAN AL HUSNA', 'KTP', '6102183108988998', '2004-06-03', 'Laki-laki', '085750777394', 'saya ada dua', 'http://localhost/PBL-KELANA-OUTDOOR/upload/profiles/9_1762146938.jpeg', 1, '2025-11-03 04:53:34', '2025-11-03 05:15:38'),
(2, 10, 'nzakwan422@gmail.com', 'Muhammad Naufal Zakwan', 'KTP', '6171348294284545', '2005-03-11', 'Laki-laki', '0831231312313', 'fwfwfwfewhgjfhdjghfdgfd', 'http://localhost/PBL-KELANA-OUTDOOR/upload/profiles/10_1762152999.jpg', 1, '2025-11-03 06:56:02', '2025-11-03 06:56:39'),
(3, 11, 'jakwan@gmail.com', 'Naufal Zakwans', 'KTP', '4242424242242422', '1993-06-03', 'Laki-laki', '4242424242142', 'dadadadadadadadadadada', NULL, 1, '2025-11-03 08:34:09', '2025-11-03 08:40:38'),
(4, 6, 'mikamika10kaka@gmail.com', 'Mika Mikas', 'KTP', '1111111111111111', '2025-11-03', 'Laki-laki', '0891391999999', 'adaddddddddddddddddddddddddddddddddddddddddddddddddda', 'http://localhost/PBL-KELANA-OUTDOOR/upload/profiles/6_1762185378.png', 1, '2025-11-03 14:38:18', '2025-11-05 16:36:16'),
(5, 12, 'naufal1103@gmail.com', 'Naufal zakwan', 'KTP', '1131313131313131', '2025-11-06', 'Laki-laki', '0994284724724', 'rwrwrwrwrwwrwrwrwrwrwrwrwrwrwrrw', 'http://localhost/PBL-KELANA-OUTDOOR/upload/profiles/12_1763274053.jpg', 1, '2025-11-06 07:21:00', '2025-11-16 06:20:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD UNIQUE KEY `booking_code` (`booking_code`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `booking_history`
--
ALTER TABLE `booking_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `idx_booking` (`booking_id`);

--
-- Indexes for table `booking_items`
--
ALTER TABLE `booking_items`
  ADD PRIMARY KEY (`booking_item_id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `equipment_id` (`equipment_id`),
  ADD KEY `package_id` (`package_id`),
  ADD KEY `idx_package_id` (`package_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `unique_cart_item` (`customer_id`,`equipment_id`),
  ADD KEY `equipment_id` (`equipment_id`),
  ADD KEY `fk_cart_package` (`package_id`);

--
-- Indexes for table `compensations`
--
ALTER TABLE `compensations`
  ADD PRIMARY KEY (`compensation_id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`equipment_id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `equipment_images`
--
ALTER TABLE `equipment_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `idx_equipment` (`equipment_id`),
  ADD KEY `idx_primary` (`equipment_id`,`is_primary`);

--
-- Indexes for table `equipment_packages`
--
ALTER TABLE `equipment_packages`
  ADD PRIMARY KEY (`package_id`),
  ADD KEY `idx_active` (`is_active`,`display_order`),
  ADD KEY `idx_popular` (`is_popular`);

--
-- Indexes for table `equipment_rental_terms`
--
ALTER TABLE `equipment_rental_terms`
  ADD PRIMARY KEY (`term_id`),
  ADD KEY `idx_equipment_terms` (`equipment_id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_display` (`display_order`);

--
-- Indexes for table `equipment_usage_guides`
--
ALTER TABLE `equipment_usage_guides`
  ADD PRIMARY KEY (`guide_id`),
  ADD KEY `idx_equipment_guide` (`equipment_id`),
  ADD KEY `idx_step` (`step_number`);

--
-- Indexes for table `merchandise`
--
ALTER TABLE `merchandise`
  ADD PRIMARY KEY (`merchandise_id`);

--
-- Indexes for table `open_trips`
--
ALTER TABLE `open_trips`
  ADD PRIMARY KEY (`trip_id`);

--
-- Indexes for table `package_availability`
--
ALTER TABLE `package_availability`
  ADD PRIMARY KEY (`availability_id`),
  ADD UNIQUE KEY `unique_package_date` (`package_id`,`date`);

--
-- Indexes for table `package_bookings`
--
ALTER TABLE `package_bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `idx_customer` (`customer_id`),
  ADD KEY `idx_package` (`package_id`),
  ADD KEY `idx_dates` (`start_date`,`end_date`),
  ADD KEY `idx_status` (`booking_status`,`payment_status`);

--
-- Indexes for table `package_cart`
--
ALTER TABLE `package_cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `package_id` (`package_id`),
  ADD KEY `idx_customer_cart` (`customer_id`,`created_at`);

--
-- Indexes for table `package_items`
--
ALTER TABLE `package_items`
  ADD PRIMARY KEY (`package_item_id`),
  ADD KEY `idx_package` (`package_id`,`display_order`);

--
-- Indexes for table `stock_movements`
--
ALTER TABLE `stock_movements`
  ADD PRIMARY KEY (`movement_id`),
  ADD KEY `equipment_id` (`equipment_id`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`trip_id`);

--
-- Indexes for table `trip_participations`
--
ALTER TABLE `trip_participations`
  ADD PRIMARY KEY (`participation_id`),
  ADD KEY `trip_id` (`trip_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user` (`user_id`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD KEY `idx_user_profiles_phone` (`phone`),
  ADD KEY `idx_user_profiles_identity_number` (`identity_number`),
  ADD KEY `idx_user_profiles_is_complete` (`is_complete`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `booking_history`
--
ALTER TABLE `booking_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `booking_items`
--
ALTER TABLE `booking_items`
  MODIFY `booking_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `compensations`
--
ALTER TABLE `compensations`
  MODIFY `compensation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equipment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `equipment_images`
--
ALTER TABLE `equipment_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `equipment_packages`
--
ALTER TABLE `equipment_packages`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `equipment_rental_terms`
--
ALTER TABLE `equipment_rental_terms`
  MODIFY `term_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `equipment_reviews`
--
ALTER TABLE `equipment_reviews`
  MODIFY `review_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `equipment_usage_guides`
--
ALTER TABLE `equipment_usage_guides`
  MODIFY `guide_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `merchandise`
--
ALTER TABLE `merchandise`
  MODIFY `merchandise_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `open_trips`
--
ALTER TABLE `open_trips`
  MODIFY `trip_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `package_availability`
--
ALTER TABLE `package_availability`
  MODIFY `availability_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `package_bookings`
--
ALTER TABLE `package_bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `package_cart`
--
ALTER TABLE `package_cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `package_items`
--
ALTER TABLE `package_items`
  MODIFY `package_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `stock_movements`
--
ALTER TABLE `stock_movements`
  MODIFY `movement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `trip_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `trip_participations`
--
ALTER TABLE `trip_participations`
  MODIFY `participation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `booking_history`
--
ALTER TABLE `booking_history`
  ADD CONSTRAINT `booking_history_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `package_bookings` (`booking_id`) ON DELETE CASCADE;

--
-- Constraints for table `booking_items`
--
ALTER TABLE `booking_items`
  ADD CONSTRAINT `booking_items_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`),
  ADD CONSTRAINT `booking_items_ibfk_2` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`equipment_id`),
  ADD CONSTRAINT `booking_items_ibfk_3` FOREIGN KEY (`package_id`) REFERENCES `equipment_packages` (`package_id`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`equipment_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cart_package` FOREIGN KEY (`package_id`) REFERENCES `equipment_packages` (`package_id`) ON DELETE CASCADE;

--
-- Constraints for table `compensations`
--
ALTER TABLE `compensations`
  ADD CONSTRAINT `compensations_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`);

--
-- Constraints for table `equipment_images`
--
ALTER TABLE `equipment_images`
  ADD CONSTRAINT `equipment_images_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`equipment_id`) ON DELETE CASCADE;

--
-- Constraints for table `package_availability`
--
ALTER TABLE `package_availability`
  ADD CONSTRAINT `package_availability_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `equipment_packages` (`package_id`) ON DELETE CASCADE;

--
-- Constraints for table `package_bookings`
--
ALTER TABLE `package_bookings`
  ADD CONSTRAINT `package_bookings_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `equipment_packages` (`package_id`);

--
-- Constraints for table `package_cart`
--
ALTER TABLE `package_cart`
  ADD CONSTRAINT `package_cart_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `equipment_packages` (`package_id`) ON DELETE CASCADE;

--
-- Constraints for table `package_items`
--
ALTER TABLE `package_items`
  ADD CONSTRAINT `package_items_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `equipment_packages` (`package_id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_movements`
--
ALTER TABLE `stock_movements`
  ADD CONSTRAINT `stock_movements_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`equipment_id`);

--
-- Constraints for table `trip_participations`
--
ALTER TABLE `trip_participations`
  ADD CONSTRAINT `trip_participations_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `open_trips` (`trip_id`),
  ADD CONSTRAINT `trip_participations_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `trip_participations_ibfk_3` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`);

--
-- Constraints for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `fk_user_profiles_customer` FOREIGN KEY (`user_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
