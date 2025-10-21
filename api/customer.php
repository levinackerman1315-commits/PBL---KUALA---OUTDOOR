<?php
// filepath: c:\xampp\htdocs\PBL - KELANA OUTDOOR\api\customers.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

try {
    $pdo = new PDO("mysql:host=localhost;dbname=kelana_outdoor", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    
    switch($action) {
        case 'register':
            // Register new customer
            $input = json_decode(file_get_contents('php://input'), true);
            
            $name = $input['name'] ?? '';
            $phone = $input['phone'] ?? '';
            $email = $input['email'] ?? '';
            $password = $input['password'] ?? '';
            $identity_card_number = $input['identity_card_number'] ?? '';
            $emergency_contact = $input['emergency_contact'] ?? '';
            
            if (!$name || !$phone || !$email || !$password) {
                throw new Exception("Nama, telepon, email, dan password wajib diisi");
            }
            
            // Check if email already exists
            $stmt = $pdo->prepare("SELECT customer_id FROM customers WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                throw new Exception("Email sudah terdaftar");
            }
            
            // Hash password
            $password_hash = password_hash($password, PASSWORD_DEFAULT);
            
            // Insert customer
            $stmt = $pdo->prepare("
                INSERT INTO customers (name, phone, email, password_hash, identity_card_number, emergency_contact) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([$name, $phone, $email, $password_hash, $identity_card_number, $emergency_contact]);
            
            $customer_id = $pdo->lastInsertId();
            
            // Get created customer
            $stmt = $pdo->prepare("SELECT customer_id, name, phone, email, created_at FROM customers WHERE customer_id = ?");
            $stmt->execute([$customer_id]);
            $customer = $stmt->fetch(PDO::FETCH_ASSOC);
            
            echo json_encode([
                "status" => "success",
                "message" => "Customer berhasil didaftarkan",
                "data" => $customer
            ]);
            break;
            
        case 'login':
            // Login customer
            $input = json_decode(file_get_contents('php://input'), true);
            
            $email = $input['email'] ?? '';
            $password = $input['password'] ?? '';
            
            if (!$email || !$password) {
                throw new Exception("Email dan password wajib diisi");
            }
            
            // Get customer by email
            $stmt = $pdo->prepare("SELECT customer_id, name, phone, email, password_hash FROM customers WHERE email = ?");
            $stmt->execute([$email]);
            $customer = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$customer || !password_verify($password, $customer['password_hash'])) {
                throw new Exception("Email atau password salah");
            }
            
            // Remove password hash from response
            unset($customer['password_hash']);
            
            echo json_encode([
                "status" => "success",
                "message" => "Login berhasil",
                "data" => $customer
            ]);
            break;
            
        case 'profile':
            // Get customer profile
            $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
            
            if (!$id) {
                throw new Exception("Customer ID required");
            }
            
            $stmt = $pdo->prepare("SELECT customer_id, name, phone, email, identity_card_number, emergency_contact, created_at FROM customers WHERE customer_id = ?");
            $stmt->execute([$id]);
            $customer = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$customer) {
                throw new Exception("Customer not found");
            }
            
            echo json_encode([
                "status" => "success",
                "data" => $customer
            ]);
            break;
            
        default:
            throw new Exception("Invalid action");
    }
    
} catch(Exception $e) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>