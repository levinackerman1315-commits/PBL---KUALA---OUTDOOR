<?php
// filepath: api/public/equipment.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✅ Production error handling
error_reporting(E_ALL);
ini_set('display_errors', 0); // Off for production
ini_set('log_errors', 1);

// ✅ Use database.php for InfinityFree compatibility
require_once __DIR__ . '/../config/database.php';

try {
    $database = new Database();
    $pdo = $database->connect();
    
    // ✅ HELPER FUNCTION: Get equipment images
    function getEquipmentImages($pdo, $equipment_id) {
        $stmt = $pdo->prepare("
            SELECT image_id, image_url, is_primary, display_order
            FROM equipment_images
            WHERE equipment_id = ?
            ORDER BY is_primary DESC, display_order ASC
        ");
        $stmt->execute([$equipment_id]);
        
        $images = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // ✅ Dynamic base URL: Railway in production, fallback to InfinityFree
            $baseUrl = getenv('RAILWAY_PUBLIC_DOMAIN') 
                ? 'https://' . getenv('RAILWAY_PUBLIC_DOMAIN')
                : 'https://pbl-kuala-outdoor-production.up.railway.app';
            
            $images[] = [
                'image_id' => (int)$row['image_id'],
                'image_url' => $baseUrl . $row['image_url'],
                'is_primary' => (bool)$row['is_primary'],
                'display_order' => (int)$row['display_order']
            ];
        }
        
        return $images;
    }
    
    // ✅ HELPER FUNCTION: Get usage guide steps
    function getUsageGuide($pdo, $equipment_id) {
        $stmt = $pdo->prepare("
            SELECT guide_id, step_number, title, description
            FROM equipment_usage_guides
            WHERE equipment_id = ?
            ORDER BY step_number ASC
        ");
        $stmt->execute([$equipment_id]);
        
        $steps = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $steps[] = [
                'guide_id' => (int)$row['guide_id'],
                'step_number' => (int)$row['step_number'],
                'title' => $row['title'],
                'description' => $row['description']
            ];
        }
        
        return $steps;
    }
    
    // ✅ HELPER FUNCTION: Get rental terms
    function getRentalTerms($pdo, $equipment_id) {
        $stmt = $pdo->prepare("
            SELECT term_id, category, term_text, display_order
            FROM equipment_rental_terms
            WHERE equipment_id = ?
            ORDER BY display_order ASC
        ");
        $stmt->execute([$equipment_id]);
        
        $terms = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $terms[] = [
                'term_id' => (int)$row['term_id'],
                'category' => $row['category'],
                'term_text' => $row['term_text'],
                'display_order' => (int)$row['display_order']
            ];
        }
        
        return $terms;
    }
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch($method) {
        case 'GET':
            $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
            
            if ($id) {
                // ✅ GET SINGLE EQUIPMENT WITH IMAGES
                $stmt = $pdo->prepare("SELECT * FROM equipment WHERE equipment_id = ?");
                $stmt->execute([$id]);
                $equipment = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($equipment) {
                    // ✅ Dynamic base URL for Railway
                    $baseUrl = getenv('RAILWAY_PUBLIC_DOMAIN') 
                        ? 'https://' . getenv('RAILWAY_PUBLIC_DOMAIN')
                        : 'https://pbl-kuala-outdoor-production.up.railway.app';
                    
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
                        "condition" => $equipment['condition_item'] ?? 'baik',
                        "equipment_type" => $equipment['equipment_type'] ?? 'single',
                        "image_url" => $equipment['image_url'] ? $baseUrl . $equipment['image_url'] : null,
                        "images" => getEquipmentImages($pdo, $equipment['equipment_id']),
                        "usage_guide" => getUsageGuide($pdo, $equipment['equipment_id']), // ✅ TAMBAH INI
                        "rental_terms" => getRentalTerms($pdo, $equipment['equipment_id']), // ✅ TAMBAH INI
                        "created_at" => $equipment['created_at']
                    ];
                    
                    echo json_encode($response);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => true, "message" => "Equipment not found"]);
                }
            } else {
                // ✅ GET ALL EQUIPMENT WITH IMAGES
                $stmt = $pdo->prepare("SELECT * FROM equipment WHERE stock_quantity > 0 ORDER BY created_at DESC");
                $stmt->execute();
                $equipments = [];
                
                // ✅ Dynamic base URL for Railway
                $baseUrl = getenv('RAILWAY_PUBLIC_DOMAIN') 
                    ? 'https://' . getenv('RAILWAY_PUBLIC_DOMAIN')
                    : 'https://pbl-kuala-outdoor-production.up.railway.app';
                
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
                        "condition" => $row['condition_item'] ?? 'baik',
                        "equipment_type" => $row['equipment_type'] ?? 'single',
                        "image_url" => $row['image_url'] ? $baseUrl . $row['image_url'] : null,
                        "images" => getEquipmentImages($pdo, $row['equipment_id']),
                        "created_at" => $row['created_at']
                    ];
                    
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