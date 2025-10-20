
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
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    // Log request for debugging
    error_log("Equipment API called with method: " . $method);
    
    switch($method) {
        case 'GET':
            // ✅ CHECK CODE AVAILABILITY
            if (isset($_GET['check_code'])) {
                $code = $_GET['check_code'];
                $excludeId = isset($_GET['exclude_id']) ? (int)$_GET['exclude_id'] : 0;
                
                if ($excludeId > 0) {
                    // Exclude specific ID (for edit mode)
                    $stmt = $pdo->prepare("SELECT COUNT(*) FROM equipment WHERE code = ? AND equipment_id != ?");
                    $stmt->execute([$code, $excludeId]);
                } else {
                    // Check all records (for add mode)
                    $stmt = $pdo->prepare("SELECT COUNT(*) FROM equipment WHERE code = ?");
                    $stmt->execute([$code]);
                }
                
                $count = $stmt->fetchColumn();
                
                echo json_encode([
                    "exists" => $count > 0,
                    "message" => $count > 0 ? "Kode sudah digunakan" : "Kode tersedia"
                ]);
                break;
            }
            
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            
            if ($id) {
                // Get single equipment
                $stmt = $pdo->prepare("SELECT * FROM equipment WHERE equipment_id = ?");
                $stmt->execute([$id]);
                $equipment = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($equipment) {
                    echo json_encode([
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
                        "condition" => $equipment['condition_item'] ?? 'baik',
                        "equipment_type" => $equipment['equipment_type'] ?? 'single',
                        "image_url" => $equipment['image_url'] ?? null,
                        "created_at" => $equipment['created_at']
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => true, "message" => "Equipment not found"]);
                }
            } else {
                // Get all equipment
                $stmt = $pdo->query("SELECT * FROM equipment ORDER BY created_at DESC");
                $equipments = [];
                
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $equipments[] = [
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
                        "condition" => $row['condition_item'] ?? 'baik',
                        "equipment_type" => $row['equipment_type'] ?? 'single',
                        "image_url" => $row['image_url'] ?? null,
                        "created_at" => $row['created_at']
                    ];
                }
                
                echo json_encode($equipments);
            }
            break;
            
        case 'POST':
            $input = file_get_contents("php://input");
            $data = json_decode($input, true);
            
            if (!$data) {
                throw new Exception("Invalid JSON data received");
            }
            
            // Validate required fields
            if (empty($data['name']) || empty($data['code']) || empty($data['category'])) {
                throw new Exception("Name, code, and category are required");
            }
            
            // ✅ CHECK CODE UNIQUENESS BEFORE INSERT
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM equipment WHERE code = ?");
            $stmt->execute([$data['code']]);
            if ($stmt->fetchColumn() > 0) {
                throw new Exception("Kode equipment '{$data['code']}' sudah digunakan");
            }
            
            $sql = "INSERT INTO equipment (
                name, code, description, category, size_capacity, 
                dimensions, weight, material, stock_quantity, 
                price_per_day, condition_item, equipment_type, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'single', NOW())";
            
            $stmt = $pdo->prepare($sql);
            $result = $stmt->execute([
                $data['name'],
                $data['code'],
                $data['description'] ?? '',
                $data['category'],
                $data['size_capacity'] ?? '',
                $data['dimensions'] ?? '',
                isset($data['weight']) && $data['weight'] !== '' ? (float)$data['weight'] : null,
                $data['material'] ?? '',
                (int)($data['stock_quantity'] ?? 0),
                (float)($data['price_per_day'] ?? 0),
                $data['condition'] ?? 'baik'
            ]);
            
            if ($result) {
                echo json_encode([
                    "success" => true,
                    "message" => "Equipment berhasil ditambahkan",
                    "equipment_id" => (int)$pdo->lastInsertId()
                ]);
            } else {
                throw new Exception("Failed to insert equipment");
            }
            break;
            
        case 'PUT':
            $input = file_get_contents("php://input");
            $data = json_decode($input, true);
            
            if (!$data || !isset($data['equipment_id'])) {
                throw new Exception("Equipment ID is required for update");
            }
            
            // ✅ CHECK CODE UNIQUENESS BEFORE UPDATE (exclude current record)
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM equipment WHERE code = ? AND equipment_id != ?");
            $stmt->execute([$data['code'], $data['equipment_id']]);
            if ($stmt->fetchColumn() > 0) {
                throw new Exception("Kode equipment '{$data['code']}' sudah digunakan");
            }
            
            $sql = "UPDATE equipment SET 
                name=?, code=?, description=?, category=?, size_capacity=?, 
                dimensions=?, weight=?, material=?, stock_quantity=?, 
                price_per_day=?, condition_item=? 
                WHERE equipment_id=?";
            
            $stmt = $pdo->prepare($sql);
            $result = $stmt->execute([
                $data['name'],
                $data['code'],
                $data['description'] ?? '',
                $data['category'],
                $data['size_capacity'] ?? '',
                $data['dimensions'] ?? '',
                isset($data['weight']) && $data['weight'] !== '' ? (float)$data['weight'] : null,
                $data['material'] ?? '',
                (int)($data['stock_quantity'] ?? 0),
                (float)($data['price_per_day'] ?? 0),
                $data['condition'] ?? 'baik',
                (int)$data['equipment_id']
            ]);
            
            if ($result) {
                echo json_encode([
                    "success" => true,
                    "message" => "Equipment berhasil diupdate"
                ]);
            } else {
                throw new Exception("Failed to update equipment");
            }
            break;
            
        case 'DELETE':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            
            if (!$id) {
                throw new Exception("Equipment ID is required for deletion");
            }
            
            // ✅ CHECK IF EQUIPMENT IS BEING USED (Optional safety check)
            // You can add checks for active bookings here if needed
            
            $stmt = $pdo->prepare("DELETE FROM equipment WHERE equipment_id = ?");
            $result = $stmt->execute([$id]);
            
            if ($result) {
                echo json_encode([
                    "success" => true,
                    "message" => "Equipment berhasil dihapus"
                ]);
            } else {
                throw new Exception("Failed to delete equipment");
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode([
                "error" => true,
                "message" => "Method $method not allowed"
            ]);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Database error: " . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}
?>