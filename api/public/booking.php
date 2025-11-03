<?php
// filepath: c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\public\booking.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/booking_public_errors.log');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

try {
    $database = new Database();
    $pdo = $database->getConnection();

    if (!$pdo) {
        throw new Exception("Database connection failed");
    }

    $method = $_SERVER['REQUEST_METHOD'];

    // ✅ POST: Create new booking
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        // ✅ LOG INPUT
        error_log("📥 Booking Input: " . json_encode($input, JSON_PRETTY_PRINT));

        // Validasi input
        if (
            empty($input['customer_name']) ||
            empty($input['equipment_items']) ||
            empty($input['start_date']) ||
            empty($input['end_date'])
        ) {
            throw new Exception("Data booking tidak lengkap. Pastikan nama, equipment, dan tanggal terisi.");
        }

        $customer_name = $input['customer_name'];
        $customer_phone = $input['customer_phone'] ?? null;
        $customer_email = $input['customer_email'] ?? null;
        $customer_identity_number = $input['customer_identity_number'] ?? null;
        $customer_id = $input['customer_id'] ?? null;
        $equipment_items = $input['equipment_items'];
        $start_date = $input['start_date'];
        $end_date = $input['end_date'];
        $notes = $input['notes'] ?? '';

        // Validasi tanggal minimal besok
        $tomorrow = new DateTime('tomorrow');
        $bookingStart = new DateTime($start_date);
        if ($bookingStart < $tomorrow) {
            throw new Exception("Tanggal pengambilan minimal besok, tidak bisa hari ini!");
        }

        // Hitung durasi
        $start = new DateTime($start_date);
        $end = new DateTime($end_date);
        $duration = $start->diff($end)->days;
        if ($duration <= 0) $duration = 1;

        error_log("📅 Duration: " . $duration . " days");

        // Mulai transaksi
        $pdo->beginTransaction();

        try {
            // ✅ Hitung total harga dari equipment
            $total_price = 0;
            foreach ($equipment_items as $item) {
                $stmt = $pdo->prepare("SELECT price_per_day, name FROM equipment WHERE equipment_id = ?");
                $stmt->execute([$item['equipment_id']]);
                $equipment = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$equipment) {
                    throw new Exception("Equipment ID {$item['equipment_id']} tidak ditemukan");
                }

                if (!$equipment['price_per_day'] || $equipment['price_per_day'] == 0) {
                    throw new Exception("Harga equipment '{$equipment['name']}' tidak valid");
                }

                $item_total = $equipment['price_per_day'] * $item['quantity'] * $duration;
                $total_price += $item_total;
                
                error_log("💰 Equipment: {$equipment['name']} | Price: {$equipment['price_per_day']} | Qty: {$item['quantity']} | Total: {$item_total}");
            }

            error_log("💵 Total Price: Rp " . number_format($total_price, 0, ',', '.'));

            // Generate booking code
            $booking_code = "KO-" . date('Ymd') . "-" . str_pad(rand(100, 999), 3, '0', STR_PAD_LEFT);

            // ✅ INSERT BOOKING
            $query = "INSERT INTO bookings (
                customer_name, 
                customer_phone, 
                customer_email, 
                customer_identity_number,
                customer_id, 
                booking_code, 
                start_date, 
                end_date,
                estimated_duration, 
                total_estimated_cost, 
                status, 
                payment_status, 
                notes, 
                created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'unpaid', ?, NOW())";

            $stmt = $pdo->prepare($query);
            
            $success = $stmt->execute([
                $customer_name,
                $customer_phone,
                $customer_email,
                $customer_identity_number,
                $customer_id,
                $booking_code,
                $start_date,
                $end_date,
                $duration,
                $total_price,
                $notes
            ]);

            if (!$success) {
                throw new Exception("Gagal menyimpan booking: " . implode(", ", $stmt->errorInfo()));
            }

            $booking_id = $pdo->lastInsertId();
            error_log("✅ Booking ID: " . $booking_id);

            // ✅ INSERT BOOKING ITEMS
            foreach ($equipment_items as $item) {
                $insertQuery = "
                    INSERT INTO booking_items (booking_id, equipment_id, quantity)
                    VALUES (?, ?, ?)
                ";
                $stmt = $pdo->prepare($insertQuery);
                $success = $stmt->execute([
                    $booking_id,
                    $item['equipment_id'],
                    $item['quantity']
                ]);

                if (!$success) {
                    throw new Exception("Gagal menyimpan booking item: " . implode(", ", $stmt->errorInfo()));
                }
                
                error_log("✅ Booking Item: Equipment ID {$item['equipment_id']}, Qty {$item['quantity']}");
            }

            // ✅ COMMIT TRANSACTION
            $pdo->commit();
            
            error_log("🎉 Booking Success: Code {$booking_code}, Total Rp " . number_format($total_price, 0, ',', '.'));

            http_response_code(200);
            echo json_encode([
                "success" => true,
                "message" => "Booking berhasil dibuat",
                "booking_id" => $booking_id,
                "booking_code" => $booking_code,
                "total_price" => $total_price,
                "duration" => $duration
            ]);
            
        } catch (Exception $e) {
            $pdo->rollBack();
            error_log("❌ Transaction Rollback: " . $e->getMessage());
            throw $e;
        }
        exit;
    }

    // ✅ GET: Retrieve booking(s)
    if ($method === 'GET') {
        $booking_id = $_GET['id'] ?? 0;
        $customer_id = $_GET['customer_id'] ?? 0;

        if ($booking_id) {
            $stmt = $pdo->prepare("
                SELECT 
                    b.*
                FROM bookings b
                WHERE b.booking_id = ?
            ");
            $stmt->execute([$booking_id]);
            $booking = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$booking) {
                throw new Exception("Booking tidak ditemukan");
            }

            $stmt = $pdo->prepare("
                SELECT 
                    bi.*,
                    e.name as equipment_name,
                    e.code,
                    e.category,
                    e.price_per_day
                FROM booking_items bi
                JOIN equipment e ON bi.equipment_id = e.equipment_id
                WHERE bi.booking_id = ?
            ");
            $stmt->execute([$booking_id]);
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $booking['items'] = $items;

            echo json_encode(["success" => true, "booking" => $booking]);
        } elseif ($customer_id) {
            $stmt = $pdo->prepare("
                SELECT 
                    b.*,
                    COUNT(bi.booking_item_id) as item_count
                FROM bookings b
                LEFT JOIN booking_items bi ON b.booking_id = bi.booking_id
                WHERE b.customer_id = ?
                GROUP BY b.booking_id
                ORDER BY b.created_at DESC
            ");
            $stmt->execute([$customer_id]);
            $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(["success" => true, "bookings" => $bookings]);
        } else {
            throw new Exception("Parameter tidak valid");
        }
        exit;
    }

    throw new Exception("Method not allowed");

} catch (Exception $e) {
    error_log("❌ Booking Error: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>