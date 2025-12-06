<?php
// Test file untuk cek koneksi database InfinityFree
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "sql207.infinityfree.com";
$db = "if0_40557727_kuala_outdoor";
$user = "if0_40557727";
$pass = "kuala1234567890";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo json_encode([
        'success' => true,
        'message' => '✅ Database connected successfully!',
        'host' => $host,
        'database' => $db,
        'php_version' => phpversion()
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed',
        'message' => $e->getMessage(),
        'php_version' => phpversion()
    ]);
}
?>
