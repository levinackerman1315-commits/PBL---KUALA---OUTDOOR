<?php
// filepath: api/public/cart/get.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/database.php';

$customer_id = isset($_GET['customer_id']) ? intval($_GET['customer_id']) : 0;

if ($customer_id <= 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Customer ID tidak valid'
    ]);
    exit;
}

try {
    $database = new Database();
    $db = $database->connect();
    
    // ✅ QUERY UTAMA - AMBIL DATA CART
    $query = "
        SELECT 
            c.cart_id,
            c.customer_id,
            c.quantity,
            c.added_at,
            c.updated_at,
            e.equipment_id,
            e.name,
            e.code,
            e.description,
            e.category,
            e.size_capacity,
            e.dimensions,
            e.weight,
            e.material,
            e.stock_quantity,
            e.price_per_day,
            e.condition_item,
            e.equipment_type,
            e.image_url,
            e.created_at
        FROM cart c
        INNER JOIN equipment e ON c.equipment_id = e.equipment_id
        WHERE c.customer_id = :customer_id
        ORDER BY c.added_at DESC
    ";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':customer_id', $customer_id, PDO::PARAM_INT);
    $stmt->execute();
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // ✅ LOOP SETIAP ITEM & AMBIL IMAGES-NYA
    foreach ($cartItems as &$item) {
        $equipment_id = $item['equipment_id'];
        
        // ✅ QUERY UNTUK AMBIL SEMUA GAMBAR EQUIPMENT INI
        $imageQuery = "
            SELECT 
                image_id,
                image_url,
                is_primary,
                display_order
            FROM equipment_images
            WHERE equipment_id = :equipment_id
            ORDER BY display_order ASC, is_primary DESC
        ";
        
        $imageStmt = $db->prepare($imageQuery);
        $imageStmt->bindParam(':equipment_id', $equipment_id, PDO::PARAM_INT);
        $imageStmt->execute();
        $images = $imageStmt->fetchAll(PDO::FETCH_ASSOC);
        
        // ✅ FORMAT EQUIPMENT OBJECT
        $item['equipment'] = [
            'equipment_id' => (int)$item['equipment_id'],
            'name' => $item['name'],
            'code' => $item['code'],
            'description' => $item['description'],
            'category' => $item['category'],
            'size_capacity' => $item['size_capacity'],
            'dimensions' => $item['dimensions'],
            'weight' => $item['weight'] ? (float)$item['weight'] : null,
            'material' => $item['material'],
            'stock_quantity' => (int)$item['stock_quantity'],
            'price_per_day' => (float)$item['price_per_day'],
            'condition' => $item['condition_item'],
            'equipment_type' => $item['equipment_type'],
            'image_url' => $item['image_url'],
            'created_at' => $item['created_at'],
            'available_stock' => (int)$item['stock_quantity'],
            'reserved_stock' => 0,
            'rented_stock' => 0,
            // ✅ TAMBAHKAN IMAGES ARRAY
            'images' => array_map(function($img) {
                return [
                    'image_id' => (int)$img['image_id'],
                    'image_url' => $img['image_url'],
                    'is_primary' => (bool)$img['is_primary'],
                    'display_order' => (int)$img['display_order']
                ];
            }, $images)
        ];
        
        // ✅ HAPUS FIELD DUPLIKAT DI ROOT LEVEL
        unset($item['equipment_id'], $item['name'], $item['code'], $item['description'], 
              $item['category'], $item['size_capacity'], $item['dimensions'], $item['weight'],
              $item['material'], $item['stock_quantity'], $item['price_per_day'], 
              $item['condition_item'], $item['equipment_type'], $item['image_url'], $item['created_at']);
    }
    
    echo json_encode([
        'success' => true,
        'cart_items' => $cartItems,
        'total_items' => count($cartItems)
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>