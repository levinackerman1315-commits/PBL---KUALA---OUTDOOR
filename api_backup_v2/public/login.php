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

// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'kuala_outdoor');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->connect_error]);
    exit;
}

// Cari user
$stmt = $conn->prepare("SELECT customer_id, name, email, password_hash, phone FROM customers WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

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
$stmt->close();
$conn->close();
?>