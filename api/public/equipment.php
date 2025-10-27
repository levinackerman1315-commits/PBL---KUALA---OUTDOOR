<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database configuration
$host = "localhost";
$db_name = "kuala_outdoor";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_TIMEOUT, 30);
    $pdo->setAttribute(PDO::ATTR_PERSISTENT, false);
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch($method) {
        case 'GET':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            
            if ($id) {
                // Get single equipment
                $stmt = $pdo->prepare("SELECT * FROM equipment WHERE equipment_id = ?");
                $stmt->execute([$id]);
                $equipment = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($equipment) {
                    $response = [
                        "equipment_id" => (int)$equipment['equipment_id'],
                        "name" => $equipment['name'],
                        "code" => $equipment['code'],
                        "description" => $equipment['description'] ?? '',
                        "category" => $equipment['category'],
                        "size_capacity" => $equipment['size_capacity'] ?? '',
                        "dimensions" => $equipment['dimensions'] ?? '',
                        "weight" => $equipment['weight'] ? (float)$equipment['weight'] : 0,
                        "material" => $equipment['material'] ?? '',
                        "stock_quantity" => (int)$equipment['stock_quantity'],
                        "available_stock" => (int)$equipment['stock_quantity'],
                        "reserved_stock" => 0,
                        "rented_stock" => 0,
                        "price_per_day" => (float)$equipment['price_per_day'],
                        "condition" => $equipment['condition'] ?? 'baik', // ✅ FIXED: Hapus '_item'
                        "equipment_type" => $equipment['equipment_type'] ?? 'single',
                        "image_url" => $equipment['image_url'] ?? null,
                        "created_at" => $equipment['created_at']
                    ];
                    
                    // ✅ FIXED: Format image URL properly
                    if ($response['image_url']) {
                        if (!str_starts_with($response['image_url'], 'http')) {
                            $clean_path = ltrim($response['image_url'], '/');
                            $response['image_url'] = 'http://localhost/PBL-KELANA-OUTDOOR/uploads/equipment/' . basename($clean_path);
                        }
                    }
                    
                    echo json_encode($response); // ✅ FIX 2: Pindah ke line baru
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => true, "message" => "Equipment not found"]);
                }
            } else {
                // Get all equipment
                $stmt = $pdo->prepare("SELECT * FROM equipment WHERE stock_quantity > 0 ORDER BY created_at DESC");
                $stmt->execute();
                $equipments = [];
                
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $item = [
                        "equipment_id" => (int)$row['equipment_id'],
                        "name" => $row['name'],
                        "code" => $row['code'],
                        "description" => $row['description'] ?? '',
                        "category" => $row['category'],
                        "size_capacity" => $row['size_capacity'] ?? '',
                        "dimensions" => $row['dimensions'] ?? '',
                        "weight" => $row['weight'] ? (float)$row['weight'] : 0,
                        "material" => $row['material'] ?? '',
                        "stock_quantity" => (int)$row['stock_quantity'],
                        "available_stock" => (int)$row['stock_quantity'],
                        "reserved_stock" => 0,
                        "rented_stock" => 0,
                        "price_per_day" => (float)$row['price_per_day'],
                        "condition" => $row['condition'] ?? 'baik', // ✅ FIXED: Hapus '_item'
                        "equipment_type" => $row['equipment_type'] ?? 'single',
                        "image_url" => $row['image_url'] ?? null,
                        "created_at" => $row['created_at']
                    ];
                    
                    // ✅ FIXED: Format image URL properly
                    if ($item['image_url']) {
                        if (!str_starts_with($item['image_url'], 'http')) {
                            $clean_path = ltrim($item['image_url'], '/');
                            $item['image_url'] = 'http://localhost/PBL-KELANA-OUTDOOR/uploads/equipment/' . basename($clean_path);
                        }
                    }
                    
                    $equipments[] = $item;
                }
                
                echo json_encode($equipments);
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode([
                "error" => true,
                "message" => "Method $method not allowed for public API - Read only"
            ]);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Database connection error: " . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}
?>