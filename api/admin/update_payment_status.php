<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->booking_id) || !isset($data->payment_status)) {
            throw new Exception("Data tidak lengkap");
        }

        $query = "UPDATE bookings SET payment_status = :payment_status WHERE booking_id = :booking_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':payment_status', $data->payment_status);
        $stmt->bindParam(':booking_id', $data->booking_id);

        if ($stmt->execute()) {
            // TODO: Jika payment_status = 'partial' atau 'paid', kurangi stok equipment
            
            echo json_encode([
                'success' => true,
                'message' => 'Status payment berhasil diupdate'
            ]);
        } else {
            throw new Exception("Gagal update payment status");
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>