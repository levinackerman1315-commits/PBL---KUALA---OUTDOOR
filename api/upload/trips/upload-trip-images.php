<?php
// filepath: d:\Data Aplikasi\xampp\htdocs\PBL-KELANA-OUTDOOR\upload\upload-trip-images.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

try {
    $uploaded_urls = [];
    
    // Handle multiple files
    if (isset($_FILES['files'])) {
        $files = $_FILES['files'];
        $file_count = is_array($files['name']) ? count($files['name']) : 1;
        
        for ($i = 0; $i < $file_count; $i++) {
            $file_name = is_array($files['name']) ? $files['name'][$i] : $files['name'];
            $file_tmp = is_array($files['tmp_name']) ? $files['tmp_name'][$i] : $files['tmp_name'];
            $file_size = is_array($files['size']) ? $files['size'][$i] : $files['size'];
            $file_error = is_array($files['error']) ? $files['error'][$i] : $files['error'];
            
            if ($file_error !== UPLOAD_ERR_OK) {
                throw new Exception("File upload error: $file_error");
            }
            
            // Validate
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_file($finfo, $file_tmp);
            finfo_close($finfo);
            
            $allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!in_array($mime, $allowed)) {
                throw new Exception('Invalid file type');
            }
            
            if ($file_size > 5 * 1024 * 1024) {
                throw new Exception('File too large (max 5MB)');
            }
            
            // Create folder
            $upload_dir = __DIR__ . '/trips/';
            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, 0755, true);
            }
            
            // Save
            $ext = pathinfo($file_name, PATHINFO_EXTENSION);
            $filename = 'trip_' . time() . '_' . $i . '.' . $ext;
            $filepath = $upload_dir . $filename;
            
            if (move_uploaded_file($file_tmp, $filepath)) {
                $url = 'http://localhost/PBL-KELANA-OUTDOOR/upload/trips/' . $filename;
                $uploaded_urls[] = $url;
            } else {
                throw new Exception('Failed to save file');
            }
        }
    }
    
    echo json_encode([
        'success' => true,
        'urls' => $uploaded_urls,
        'count' => count($uploaded_urls)
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>