<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Query dengan JOIN untuk ambil nama equipment
        $query = "SELECT 
                    b.booking_id,
                    b.booking_code,
                    b.customer_name,
                    b.customer_id,
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
                    GROUP_CONCAT(CONCAT(e.name, ' (', bi.quantity, 'x)') SEPARATOR ', ') as equipment_names
                  FROM bookings b
                  LEFT JOIN booking_items bi ON b.booking_id = bi.booking_id
                  LEFT JOIN equipment e ON bi.equipment_id = e.equipment_id
                  GROUP BY b.booking_id
                  ORDER BY b.created_at DESC";
        
        $stmt = $db->prepare($query);
        $stmt->execute();
        $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'data' => $bookings
        ]);

    } else {
        http_response_code(405);
        echo json_encode([
            "success" => false,
            "message" => "Method not allowed"
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}
?>