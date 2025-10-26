
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

// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'kuala_outdoor');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
    exit;
}

// Cek email sudah terdaftar
$stmt = $conn->prepare("SELECT customer_id FROM customers WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email sudah terdaftar']);
    exit;
}
$stmt->close();

// Simpan user baru
$hashed = password_hash($password, PASSWORD_DEFAULT); // ✅ Hash password
$stmt = $conn->prepare("INSERT INTO customers (name, email, password_hash, phone) VALUES (?, ?, ?, ?)"); // ✅ Simpan ke kolom password_hash
$stmt->bind_param("ssss", $name, $email, $hashed, $phone);
if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'customer_id' => $stmt->insert_id,
        'name' => $name,
        'email' => $email,
        'phone' => $phone
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Registrasi gagal']);
}
$stmt->close();
$conn->close();