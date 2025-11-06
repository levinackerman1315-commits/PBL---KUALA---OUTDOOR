<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// ✅ VALIDASI FILE
if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No file uploaded"]);
    exit;
}

$file = $_FILES['image'];
$allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
$max_size = 5 * 1024 * 1024; // 5MB

// Validasi tipe file
if (!in_array($file['type'], $allowed_types)) {
    http_response_code(400);
    echo json_encode([
        "success" => false, 
        "message" => "Invalid file type. Only JPG, PNG, WEBP allowed"
    ]);
    exit;
}

// Validasi ukuran
if ($file['size'] > $max_size) {
    http_response_code(400);
    echo json_encode([
        "success" => false, 
        "message" => "File too large. Max 5MB"
    ]);
    exit;
}

// ✅ GENERATE NAMA FILE UNIK
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = 'trip_' . uniqid() . '_' . time() . '.' . $extension;
$upload_dir = '../../uploads/trips/';
$upload_path = $upload_dir . $filename;

// Buat folder jika belum ada
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

// ✅ UPLOAD FILE
if (move_uploaded_file($file['tmp_name'], $upload_path)) {
    $file_url = 'http://localhost/PBL-KELANA-OUTDOOR/uploads/trips/' . $filename;
    
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Image uploaded successfully",
        "data" => [
            "filename" => $filename,
            "url" => $file_url
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to upload image"
    ]);
}
?>