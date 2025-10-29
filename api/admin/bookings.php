<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    if (!$db) {
        throw new Exception("Database connection failed");
    }

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case 'GET':
            // HAPUS BARIS INI: <?php
            $query = "SELECT 
                b.booking_id,
                b.booking_code,
                b.start_date,
                b.end_date,
                b.estimated_duration,
                b.total_estimated_cost,
                b.status,
                b.payment_status,
                b.created_at,
                c.name as customer_name,
                c.phone as customer_phone, 
                c.email as customer_email,
                GROUP_CONCAT(e.name SEPARATOR ', ') AS equipment_name
            FROM bookings b 
            LEFT JOIN customers c ON b.customer_id = c.customer_id 
            LEFT JOIN booking_items bi ON b.booking_id = bi.booking_id
            LEFT JOIN equipment e ON bi.equipment_id = e.equipment_id
            GROUP BY b.booking_id
            ORDER BY b.created_at DESC";

            $stmt = $db->prepare($query);
            $stmt->execute();

            $bookings = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if (!isset($row['equipment_name']) || empty($row['equipment_name'])) {
                    $row['equipment_name'] = "Equipment belum dipilih";
                }
                $row['total_estimated_cost'] = (int)$row['total_estimated_cost'];
                $row['estimated_duration'] = (int)$row['estimated_duration'];
                $bookings[] = $row;
            }

            http_response_code(200);
            echo json_encode($bookings);
            break;

        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));

            if (empty($data->booking_id)) {
                http_response_code(400);
                echo json_encode(array("message" => "Booking ID is required"));
                exit();
            }

            $updates = array();
            $params = array();

            if (isset($data->status)) {
                $updates[] = "status = ?";
                $params[] = $data->status;
            }

            if (isset($data->payment_status)) {
                $updates[] = "payment_status = ?";
                $params[] = $data->payment_status;
            }

            if (empty($updates)) {
                http_response_code(400);
                echo json_encode(array("message" => "No updates provided"));
                exit();
            }

            $query = "UPDATE bookings SET " . implode(", ", $updates) . " WHERE booking_id = ?";
            $params[] = $data->booking_id;

            $stmt = $db->prepare($query);

            if ($stmt->execute($params)) {
                http_response_code(200);
                echo json_encode(array("message" => "Booking updated successfully"));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Unable to update booking"));
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(array("message" => "Method not allowed"));
            break;
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}
?>