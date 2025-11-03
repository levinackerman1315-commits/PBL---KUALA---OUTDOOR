<?php
// filepath: c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\admin\bookings.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ AKTIFKAN ERROR REPORTING
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/booking_errors.log');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    if (!$db) {
        throw new Exception("Database connection failed");
    }

    $method = $_SERVER['REQUEST_METHOD'];

    // ✅ GET: Ambil semua booking
    if ($method === 'GET') {
        // ✅ QUERY SIMPLIFIED - TANPA GROUP_CONCAT (kemungkinan error di sini)
        $query = "
            SELECT 
                b.booking_id,
                b.booking_code,
                b.customer_id,
                b.customer_name,
                b.customer_phone,
                b.customer_email,
                b.customer_identity_number,
                b.start_date,
                b.end_date,
                b.estimated_duration,
                b.total_estimated_cost,
                b.actual_duration,
                b.total_actual_cost,
                b.compensation_fee,
                b.status,
                b.payment_status,
                b.notes,
                b.created_at,
                b.payment_date,
                b.handover_date,
                b.return_date
            FROM bookings b
            ORDER BY b.created_at DESC
        ";

        $stmt = $db->prepare($query);
        
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $db->errorInfo()[2]);
        }
        
        $stmt->execute();
        $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // ✅ TAMBAHKAN EQUIPMENT LIST MANUAL (PER BOOKING)
        foreach ($bookings as &$booking) {
            // Get equipment items untuk booking ini
            $itemQuery = "
                SELECT 
                    e.name,
                    bi.quantity
                FROM booking_items bi
                JOIN equipment e ON bi.equipment_id = e.equipment_id
                WHERE bi.booking_id = ?
            ";
            
            $itemStmt = $db->prepare($itemQuery);
            $itemStmt->execute([$booking['booking_id']]);
            $items = $itemStmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Format equipment names
            $equipmentNames = [];
            foreach ($items as $item) {
                $equipmentNames[] = $item['name'] . ' (' . $item['quantity'] . 'x)';
            }
            
            $booking['equipment_names'] = !empty($equipmentNames) 
                ? implode(', ', $equipmentNames) 
                : 'Tidak ada equipment';
            
            // ✅ Format numbers
            $booking['estimated_duration'] = (int)$booking['estimated_duration'];
            $booking['total_estimated_cost'] = (float)$booking['total_estimated_cost'];
            $booking['actual_duration'] = $booking['actual_duration'] ? (int)$booking['actual_duration'] : null;
            $booking['total_actual_cost'] = $booking['total_actual_cost'] ? (float)$booking['total_actual_cost'] : null;
            $booking['compensation_fee'] = $booking['compensation_fee'] ? (float)$booking['compensation_fee'] : 0;
        }

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $bookings,
            'total' => count($bookings)
        ], JSON_PRETTY_PRINT);
        
        exit;
    }

    // ✅ PUT: Update status atau payment_status
    elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['booking_id'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Booking ID diperlukan"]);
            exit();
        }

        $booking_id = $data['booking_id'];
        $updates = [];
        $params = [];

        if (isset($data['status'])) {
            $updates[] = "status = ?";
            $params[] = $data['status'];
        }

        if (isset($data['payment_status'])) {
            $updates[] = "payment_status = ?";
            $params[] = $data['payment_status'];
        }

        if (empty($updates)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Tidak ada data yang diperbarui"]);
            exit();
        }

        // Timestamp otomatis
        if (isset($data['payment_status']) && $data['payment_status'] === 'paid') {
            $updates[] = "payment_date = NOW()";
        }

        if (isset($data['status']) && $data['status'] === 'active') {
            $updates[] = "handover_date = NOW()";
        }

        if (isset($data['status']) && $data['status'] === 'completed') {
            $updates[] = "return_date = NOW()";
        }

        $query = "UPDATE bookings SET " . implode(", ", $updates) . " WHERE booking_id = ?";
        $params[] = $booking_id;

        $stmt = $db->prepare($query);
        $success = $stmt->execute($params);

        if ($success) {
            http_response_code(200);
            echo json_encode([
                "success" => true,
                "message" => "Booking berhasil diperbarui"
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Gagal memperbarui booking"
            ]);
        }
        exit;
    }

    // Method tidak diizinkan
    else {
        http_response_code(405);
        echo json_encode([
            "success" => false,
            "message" => "Method tidak diizinkan"
        ]);
        exit;
    }

} catch (Exception $e) {
    error_log("❌ Booking API Error: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage(),
        "trace" => $e->getTraceAsString() // ✅ HANYA UNTUK DEBUGGING
    ], JSON_PRETTY_PRINT);
}
?>