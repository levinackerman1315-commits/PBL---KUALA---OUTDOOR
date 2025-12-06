<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (empty($data->username) || empty($data->password)) {
    http_response_code(400);
    echo json_encode(array("message" => "Username and password are required"));
    exit();
}

// UNTUK TEST - allow admin/kuala2024
if ($data->username === "admin" && $data->password === "kuala2024") {
    $token = base64_encode(random_bytes(32));
    
    http_response_code(200);
    echo json_encode(array(
        "message" => "Login successful",
        "token" => $token,
        "user" => array(
            "id" => 1,
            "username" => "admin",
            "name" => "Admin Kuala Outdoor",
            "role" => "super_admin"
        )
    ));
} else {
    http_response_code(401);
    echo json_encode(array("message" => "Invalid credentials"));
}
?>