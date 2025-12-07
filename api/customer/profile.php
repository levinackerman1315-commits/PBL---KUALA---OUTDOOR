<?php
// filepath: api/customer/profile-pdo.php
// ✅ PDO Version for Railway Deployment

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✅ Use PDO for Railway
require_once __DIR__ . '/../config/database.php';

try {
    $database = new Database();
    $pdo = $database->connect();
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    // ✅ GET - AMBIL PROFILE
    if ($method === 'GET') {
        $customer_id = $_GET['id'] ?? 0;
        
        if (!$customer_id) {
            echo json_encode(['success' => false, 'message' => 'Customer ID tidak ditemukan']);
            exit;
        }
        
        $stmt = $pdo->prepare("
            SELECT 
                c.customer_id,
                c.name as customer_name,
                c.email as customer_email,
                c.phone as customer_phone,
                c.identity_card_number as customer_identity_number,
                up.full_name,
                up.email,
                up.phone,
                up.identity_type,
                up.identity_number,
                up.birth_date,
                up.gender,
                up.address,
                up.profile_picture,
                up.is_complete
            FROM customers c
            LEFT JOIN user_profiles up ON c.customer_id = up.user_id
            WHERE c.customer_id = ?
        ");
        
        $stmt->execute([$customer_id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($data) {
            $profile = [
                'customer_id' => $data['customer_id'],
                'name' => $data['customer_name'],
                'email' => $data['email'] ?? $data['customer_email'],
                'full_name' => $data['full_name'] ?? $data['customer_name'] ?? '',
                'phone' => $data['phone'] ?? $data['customer_phone'] ?? '',
                'identity_type' => $data['identity_type'] ?? 'KTP',
                'identity_number' => $data['identity_number'] ?? $data['customer_identity_number'] ?? '',
                'birth_date' => $data['birth_date'] ?? '',
                'gender' => $data['gender'] ?? null,
                'address' => $data['address'] ?? '',
                'profile_picture' => $data['profile_picture'] ?? null,
                'is_complete' => $data['is_complete'] ?? 0
            ];
            
            echo json_encode(['success' => true, 'data' => $profile]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Customer tidak ditemukan']);
        }
    }
    
    // ✅ POST - UPDATE/INSERT PROFILE
    elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['customer_id'])) {
            echo json_encode(['success' => false, 'message' => 'Customer ID tidak ditemukan']);
            exit;
        }
        
        $customer_id = $input['customer_id'];
        
        // Check if profile exists
        $checkStmt = $pdo->prepare("SELECT id FROM user_profiles WHERE user_id = ?");
        $checkStmt->execute([$customer_id]);
        $exists = $checkStmt->fetch();
        
        if ($exists) {
            // UPDATE
            $stmt = $pdo->prepare("
                UPDATE user_profiles SET
                    full_name = ?,
                    email = ?,
                    phone = ?,
                    identity_type = ?,
                    identity_number = ?,
                    birth_date = ?,
                    gender = ?,
                    address = ?,
                    is_complete = 1,
                    updated_at = NOW()
                WHERE user_id = ?
            ");
            
            $stmt->execute([
                $input['full_name'] ?? '',
                $input['email'] ?? '',
                $input['phone'] ?? '',
                $input['identity_type'] ?? 'KTP',
                $input['identity_number'] ?? '',
                $input['birth_date'] ?? null,
                $input['gender'] ?? null,
                $input['address'] ?? '',
                $customer_id
            ]);
            
            echo json_encode(['success' => true, 'message' => 'Profile updated successfully']);
        } else {
            // INSERT
            $stmt = $pdo->prepare("
                INSERT INTO user_profiles 
                (user_id, full_name, email, phone, identity_type, identity_number, birth_date, gender, address, is_complete)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
            ");
            
            $stmt->execute([
                $customer_id,
                $input['full_name'] ?? '',
                $input['email'] ?? '',
                $input['phone'] ?? '',
                $input['identity_type'] ?? 'KTP',
                $input['identity_number'] ?? '',
                $input['birth_date'] ?? null,
                $input['gender'] ?? null,
                $input['address'] ?? ''
            ]);
            
            echo json_encode(['success' => true, 'message' => 'Profile created successfully']);
        }
    }
    
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database error occurred']);
}
?>
