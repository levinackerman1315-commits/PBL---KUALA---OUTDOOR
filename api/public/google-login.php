<?php
// ✅ CORS Headers
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$credential = $data['credential'] ?? '';

if (!$credential) {
    echo json_encode(['success' => false, 'message' => 'Invalid credential']);
    exit;
}

// Decode JWT token dari Google
$parts = explode('.', $credential);
if (count($parts) !== 3) {
    echo json_encode(['success' => false, 'message' => 'Invalid token format']);
    exit;
}

$payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);

if (!$payload || !isset($payload['email'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid token payload']);
    exit;
}

$google_id = $payload['sub'] ?? '';
$email = $payload['email'] ?? '';
$name = $payload['name'] ?? '';
$picture = $payload['picture'] ?? '';

// Koneksi database
$conn = new mysqli('localhost', 'root', '', 'kuala_outdoor');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
    exit;
}

// Cek apakah user sudah ada (berdasarkan email atau google_id)
$stmt = $conn->prepare("SELECT customer_id, name, email, phone, google_id FROM customers WHERE email = ? OR google_id = ?");
$stmt->bind_param("ss", $email, $google_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    // User sudah ada, update google_id jika belum ada
    if (empty($user['google_id'])) {
        $updateStmt = $conn->prepare("UPDATE customers SET google_id = ? WHERE customer_id = ?");
        $updateStmt->bind_param("si", $google_id, $user['customer_id']);
        $updateStmt->execute();
        $updateStmt->close();
    }
    
    echo json_encode([
        'success' => true,
        'customer_id' => $user['customer_id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'phone' => $user['phone'] ?? '',
        'google_id' => $google_id
    ]);
} else {
    // User baru, insert ke database
    $stmt = $conn->prepare("INSERT INTO customers (name, email, google_id) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $google_id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'customer_id' => $stmt->insert_id,
            'name' => $name,
            'email' => $email,
            'phone' => '',
            'google_id' => $google_id
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to create user']);
    }
}

$stmt->close();
$conn->close();
?>