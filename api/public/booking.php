<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle preflight
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

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents("php://input");
        $data = json_decode($json);

        // Log untuk debugging
        error_log("Received data: " . $json);

        // Validasi
        if (!$data || !isset($data->customer_id) || !isset($data->equipment_items) || !isset($data->start_date) || !isset($data->end_date)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
            exit();
        }

        // Hitung durasi
        $start = new DateTime($data->start_date);
        $end = new DateTime($data->end_date);
        $duration = $start->diff($end)->days;
        if ($duration == 0) $duration = 1;

        // Hitung total harga
        $total_price = 0;
        foreach ($data->equipment_items as $item) {
            $stmt = $db->prepare("SELECT price_per_day FROM equipment WHERE equipment_id = ?");
            $stmt->execute([$item->equipment_id]);
            $equipment = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($equipment) {
                $total_price += $equipment['price_per_day'] * $item->quantity * $duration;
            }
        }

        // Generate booking code
        $booking_code = "KO-" . date('Ymd') . "-" . str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT);

        // Insert booking
        $query = "INSERT INTO bookings (customer_id, booking_code, start_date, end_date, estimated_duration, total_estimated_cost, status, payment_status, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, 'pending', 'unpaid', ?, NOW())";
        $stmt = $db->prepare($query);
        $stmt->execute([
            $data->customer_id,
            $booking_code,
            $data->start_date,
            $data->end_date,
            $duration,
            $total_price,
            $data->notes ?? ''
        ]);

        $booking_id = $db->lastInsertId();

        // Insert booking items
        foreach ($data->equipment_items as $item) {
            $query = "INSERT INTO booking_items (booking_id, equipment_id, quantity) VALUES (?, ?, ?)";
            $stmt = $db->prepare($query);
            $stmt->execute([$booking_id, $item->equipment_id, $item->quantity]);
        }

        http_response_code(200);
        echo json_encode([
            "success" => true,
            "booking_id" => $booking_id,
            "booking_code" => $booking_code,
            "total_price" => $total_price
        ]);

    } else {
        http_response_code(405);
        echo json_encode(["success" => false, "message" => "Method not allowed"]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}
?>