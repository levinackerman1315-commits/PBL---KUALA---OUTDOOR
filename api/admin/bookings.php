<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 1);

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

    // GET: Ambil semua booking
    if ($method === 'GET') {
        $query = "
            SELECT 
                b.booking_id,
                b.booking_code,
                b.customer_id,
                b.customer_name,
                b.customer_phone,
                b.customer_email,
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
                b.return_date,
                c.name AS customer_full_name,
                c.phone AS customer_phone_db,
                c.email AS customer_email_db,
                GROUP_CONCAT(
                    CONCAT(e.name, ' (', bi.quantity, 'x)') 
                    SEPARATOR ', '
                ) AS equipment_list
            FROM bookings b
            LEFT JOIN customers c ON b.customer_id = c.customer_id
            LEFT JOIN booking_items bi ON b.booking_id = bi.booking_id
            LEFT JOIN equipment e ON bi.equipment_id = e.equipment_id
            GROUP BY b.booking_id
            ORDER BY b.created_at DESC
        ";

        $stmt = $db->prepare($query);
        $stmt->execute();
        $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Format angka
        foreach ($bookings as &$booking) {
            $booking['estimated_duration'] = (int)$booking['estimated_duration'];
            $booking['total_estimated_cost'] = (int)$booking['total_estimated_cost'];
            $booking['actual_duration'] = $booking['actual_duration'] ? (int)$booking['actual_duration'] : null;
            $booking['total_actual_cost'] = $booking['total_actual_cost'] ? (int)$booking['total_actual_cost'] : null;
            $booking['compensation_fee'] = $booking['compensation_fee'] ? (int)$booking['compensation_fee'] : 0;

            // Gunakan data customer dari bookings jika tidak ada di customers
            $booking['customer_name'] = $booking['customer_name'] ?: $booking['customer_full_name'];
            $booking['customer_phone'] = $booking['customer_phone'] ?: $booking['customer_phone_db'];
            $booking['customer_email'] = $booking['customer_email'] ?: $booking['customer_email_db'];

            // Hapus field duplikat
            unset(
                $booking['customer_full_name'],
                $booking['customer_phone_db'],
                $booking['customer_email_db']
            );

            // Default equipment list
            if (empty($booking['equipment_list'])) {
                $booking['equipment_list'] = "Tidak ada equipment";
            }
        }

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $bookings,
            'total' => count($bookings)
        ]);
    }

    // PUT: Update status atau payment_status
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

        // Tambahkan timestamp otomatis
        if (isset($data['payment_status']) && $data['payment_status'] === 'paid') {
            $updates[] = "payment_date = NOW()";
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
    }

    // Method tidak diizinkan
    else {
        http_response_code(405);
        echo json_encode([
            "success" => false,
            "message" => "Method tidak diizinkan"
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