<?php
// CORS Headers - Sesuaikan dengan port React Anda
header('Access-Control-Allow-Origin: *'); // Atau ganti dengan http://localhost:8080
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection langsung (tanpa class)
$host = "localhost";
$db_name = "kuala_outdoor";
$username = "root";
$password = "";

try {
    $conn = new mysqli($host, $username, $password, $db_name);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    $conn->set_charset("utf8mb4");
    
    $method = $_SERVER['REQUEST_METHOD'];
    $action = $_GET['action'] ?? '';
    
    if ($method === 'GET' && $action === 'fetch') {
        fetchProfile($conn);
    } elseif ($method === 'POST' && $action === 'save') {
        saveProfile($conn);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error',
        'message' => $e->getMessage()
    ]);
}

function fetchProfile($conn) {
    $user_id = $_GET['user_id'] ?? 0;
    
    if (!$user_id) {
        echo json_encode(['success' => false, 'error' => 'User ID required']);
        return;
    }
    
    $stmt = $conn->prepare("
        SELECT 
            id, user_id, email, full_name, identity_type,
            identity_number, birth_date, gender, phone,
            address, profile_picture, is_complete
        FROM user_profiles 
        WHERE user_id = ?
    ");
    
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $profile = $result->fetch_assoc();
        echo json_encode(['success' => true, 'data' => $profile]);
    } else {
        echo json_encode(['success' => true, 'data' => null]);
    }
    
    $stmt->close();
}

function saveProfile($conn) {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        return;
    }
    
    $user_id = $data['user_id'] ?? 0;
    $email = $data['email'] ?? '';
    $full_name = $data['full_name'] ?? '';
    $identity_type = $data['identity_type'] ?? '';
    $identity_number = $data['identity_number'] ?? '';
    $birth_date = $data['birth_date'] ?? null;
    $gender = $data['gender'] ?? '';
    $phone = $data['phone'] ?? '';
    $address = $data['address'] ?? '';
    $profile_picture = $data['profile_picture'] ?? null;
    
    if (!$user_id || !$full_name) {
        echo json_encode(['success' => false, 'error' => 'Required fields missing']);
        return;
    }
    
    // Check if exists
    $stmt = $conn->prepare("SELECT id FROM user_profiles WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $exists = $stmt->get_result()->num_rows > 0;
    $stmt->close();
    
    $is_complete = !empty($full_name) && !empty($identity_type) && 
                   !empty($identity_number) && !empty($birth_date) && 
                   !empty($gender) && !empty($phone) && !empty($address);
    
    if ($exists) {
        // UPDATE
        $stmt = $conn->prepare("
            UPDATE user_profiles SET
                email = ?, full_name = ?, identity_type = ?,
                identity_number = ?, birth_date = ?, gender = ?,
                phone = ?, address = ?, profile_picture = ?,
                is_complete = ?, updated_at = NOW()
            WHERE user_id = ?
        ");
        
        $stmt->bind_param(
            "sssssssssii",
            $email, $full_name, $identity_type,
            $identity_number, $birth_date, $gender,
            $phone, $address, $profile_picture,
            $is_complete, $user_id
        );
    } else {
        // INSERT
        $stmt = $conn->prepare("
            INSERT INTO user_profiles (
                user_id, email, full_name, identity_type,
                identity_number, birth_date, gender, phone,
                address, profile_picture, is_complete,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        ");
        
        $stmt->bind_param(
            "issssssssii",
            $user_id, $email, $full_name, $identity_type,
            $identity_number, $birth_date, $gender, $phone,
            $address, $profile_picture, $is_complete
        );
    }
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Profile saved successfully',
            'is_complete' => $is_complete
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to save',
            'message' => $stmt->error
        ]);
    }
    
    $stmt->close();
}

$conn->close();
?>