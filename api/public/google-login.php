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

// Koneksi database - ✅ Use PDO for Railway compatibility
require_once __DIR__ . '/../config/database.php';

try {
    $database = new Database();
    $pdo = $database->connect();
} catch (Exception $e) {
    error_log('Database connection error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Cek apakah user sudah ada (berdasarkan email atau google_id)
try {
    $stmt = $pdo->prepare("SELECT customer_id, name, email, phone, google_id FROM customers WHERE email = ? OR google_id = ?");
    $stmt->execute([$email, $google_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // User sudah ada, update google_id jika belum ada
        if (empty($user['google_id'])) {
            $updateStmt = $pdo->prepare("UPDATE customers SET google_id = ? WHERE customer_id = ?");
            $updateStmt->execute([$google_id, $user['customer_id']]);
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
        $stmt = $pdo->prepare("INSERT INTO customers (name, email, google_id) VALUES (?, ?, ?)");
        
        if ($stmt->execute([$name, $email, $google_id])) {
            echo json_encode([
                'success' => true,
                'customer_id' => $pdo->lastInsertId(),
                'name' => $name,
                'email' => $email,
                'phone' => '',
                'google_id' => $google_id
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to create user']);
        }
    }
} catch (PDOException $e) {
    error_log('Database query error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database error']);
}
?>