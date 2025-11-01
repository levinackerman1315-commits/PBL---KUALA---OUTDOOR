<?php
// filepath: c:\xampp\htdocs\PBL - KELANA OUTDOOR\api\upload\image.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST method allowed');
    }

    if (!isset($_FILES['image']) || !isset($_POST['equipment_code'])) {
        throw new Exception('Image file and equipment code are required');
    }

    $equipmentCode = $_POST['equipment_code'];
    $image = $_FILES['image'];

    // Validate file
    if ($image['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Upload error: ' . $image['error']);
    }

    // Create upload directory if not exists
    $uploadDir = '../../uploads/equipment/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Get file extension
    $fileInfo = pathinfo($image['name']);
    $extension = strtolower($fileInfo['extension']);

    // Generate filename based on equipment code
    $filename = strtolower($equipmentCode) . '.' . $extension;
    $filepath = $uploadDir . $filename;

    // Move uploaded file
    if (move_uploaded_file($image['tmp_name'], $filepath)) {
        $imageUrl = '/uploads/equipment/' . $filename;
        
        echo json_encode([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'image_url' => $imageUrl
        ]);
    } else {
        throw new Exception('Failed to move uploaded file');
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>