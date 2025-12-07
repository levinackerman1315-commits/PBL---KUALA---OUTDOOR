<?php
// ✅ CORS Headers - HARUS di paling atas!
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

$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Email dan password wajib diisi']);
    exit;
}

// Koneksi ke database - ✅ PDO for Railway
require_once __DIR__ . '/../config/database.php';

try {
    $database = new Database();
    $pdo = $database->connect();
} catch (Exception $e) {
    error_log('Database connection error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Cari user
try {
    $stmt = $pdo->prepare("SELECT customer_id, name, email, password_hash, phone FROM customers WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password_hash'])) {
        echo json_encode([
            'success' => true,
            'customer_id' => $user['customer_id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'phone' => $user['phone']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Email atau password salah']);
    }
} catch (PDOException $e) {
    error_log('Database query error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Login failed']);
}
?>