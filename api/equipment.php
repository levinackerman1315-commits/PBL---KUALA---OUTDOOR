<?php
// filepath: c:\xampp\htdocs\PBL - KELANA OUTDOOR\api\equipment.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try {
    // Direct database connection
    $pdo = new PDO("mysql:host=localhost;dbname=kelana_outdoor", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get parameters
    $action = isset($_GET['action']) ? $_GET['action'] : 'list';
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    
    switch($action) {
        case 'list':
            // Get all equipment
            $stmt = $pdo->query("SELECT * FROM equipment WHERE stock_quantity > 0 ORDER BY created_at DESC");
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Format response
            $response = [
                "status" => "success",
                "count" => count($data),
                "data" => array_map(function($item) {
                    return [
                        "equipment_id" => (int)$item['equipment_id'],
                        "name" => $item['name'],
                        "code" => $item['code'],
                        "description" => $item['description'],
                        "category" => $item['category'],
                        "size_capacity" => $item['size_capacity'],
                        "dimensions" => $item['dimensions'],
                        "weight" => $item['weight'] ? (float)$item['weight'] : null,
                        "material" => $item['material'],
                        "stock_quantity" => (int)$item['stock_quantity'],
                        "price_per_day" => (float)$item['price_per_day'],
                        "condition" => $item['condition_item'] ?? $item['condition'],
                        "image_url" => $item['image_url'],
                        "created_at" => $item['created_at']
                    ];
                }, $data)
            ];
            echo json_encode($response);
            break;
            
        case 'categories':
            // Get unique categories
            $stmt = $pdo->query("SELECT DISTINCT category FROM equipment WHERE stock_quantity > 0 ORDER BY category");
            $categories = $stmt->fetchAll(PDO::FETCH_COLUMN);
            
            echo json_encode([
                "status" => "success",
                "count" => count($categories),
                "data" => $categories
            ]);
            break;
            
        case 'by_category':
            // Get equipment by category
            if (!$category) {
                throw new Exception("Category parameter required");
            }
            
            $stmt = $pdo->prepare("SELECT * FROM equipment WHERE category = ? AND stock_quantity > 0 ORDER BY created_at DESC");
            $stmt->execute([$category]);
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $response = [
                "status" => "success",
                "category" => $category,
                "count" => count($data),
                "data" => array_map(function($item) {
                    return [
                        "equipment_id" => (int)$item['equipment_id'],
                        "name" => $item['name'],
                        "code" => $item['code'],
                        "description" => $item['description'],
                        "category" => $item['category'],
                        "size_capacity" => $item['size_capacity'],
                        "price_per_day" => (float)$item['price_per_day'],
                        "stock_quantity" => (int)$item['stock_quantity'],
                        "image_url" => $item['image_url']
                    ];
                }, $data)
            ];
            echo json_encode($response);
            break;
            
        case 'detail':
            // Get single equipment
            if (!$id) {
                throw new Exception("ID parameter required");
            }
            
            $stmt = $pdo->prepare("SELECT * FROM equipment WHERE equipment_id = ?");
            $stmt->execute([$id]);
            $item = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$item) {
                throw new Exception("Equipment not found");
            }
            
            $response = [
                "status" => "success",
                "data" => [
                    "equipment_id" => (int)$item['equipment_id'],
                    "name" => $item['name'],
                    "code" => $item['code'],
                    "description" => $item['description'],
                    "category" => $item['category'],
                    "size_capacity" => $item['size_capacity'],
                    "dimensions" => $item['dimensions'],
                    "weight" => $item['weight'] ? (float)$item['weight'] : null,
                    "material" => $item['material'],
                    "stock_quantity" => (int)$item['stock_quantity'],
                    "price_per_day" => (float)$item['price_per_day'],
                    "condition" => $item['condition_item'] ?? $item['condition'],
                    "image_url" => $item['image_url'],
                    "created_at" => $item['created_at']
                ]
            ];
            echo json_encode($response);
            break;
            
        default:
            throw new Exception("Invalid action. Available: list, categories, by_category, detail");
    }
    
} catch(Exception $e) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>