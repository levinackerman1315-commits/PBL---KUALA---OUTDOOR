
<?php
// ✅ CORS Headers lengkap - letakkan di PALING ATAS
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

// ... sisa kode Anda
$data = json_decode(file_get_contents('php://input'), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');
$phone = trim($data['phone'] ?? '');

if (!$name || !$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Semua field wajib diisi']);
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

// Cek email sudah terdaftar
try {
    $stmt = $pdo->prepare("SELECT customer_id FROM customers WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Email sudah terdaftar']);
        exit;
    }

    // Simpan user baru
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO customers (name, email, password_hash, phone) VALUES (?, ?, ?, ?)");
    
    if ($stmt->execute([$name, $email, $hashed, $phone])) {
        echo json_encode([
            'success' => true,
            'customer_id' => $pdo->lastInsertId(),
            'name' => $name,
            'email' => $email,
            'phone' => $phone
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registrasi gagal']);
    }
} catch (PDOException $e) {
    error_log('Database error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Registration failed']);
}