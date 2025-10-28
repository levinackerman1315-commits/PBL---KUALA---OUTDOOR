<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/database.php';

// Ambil customer_id dari query parameter
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
    
    // ✅ QUERY YANG SESUAI DENGAN STRUKTUR TABEL SEBENARNYA
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
            e.condition_item,  -- ✅ condition_item, bukan condition
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
    
    $cartItems = [];
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $cartItems[] = [
            'cart_id' => (int)$row['cart_id'],
            'quantity' => (int)$row['quantity'],
            'added_at' => $row['added_at'],
            'equipment' => [
                'equipment_id' => (int)$row['equipment_id'],
                'name' => $row['name'],
                'code' => $row['code'],
                'description' => $row['description'],
                'category' => $row['category'],
                'size_capacity' => $row['size_capacity'],
                'dimensions' => $row['dimensions'],
                'weight' => $row['weight'] ? (float)$row['weight'] : null,
                'material' => $row['material'],
                'stock_quantity' => (int)$row['stock_quantity'],
                'price_per_day' => (float)$row['price_per_day'],
                'condition' => $row['condition_item'], // ✅ condition_item di-map ke condition
                'equipment_type' => $row['equipment_type'],
                'image_url' => $row['image_url'],
                'created_at' => $row['created_at'],
                // ✅ FIELD YANG DIBUTUHKAN FRONTEND - BERI NILAI DEFAULT
                'available_stock' => (int)$row['stock_quantity'], // Gunakan stock_quantity
                'reserved_stock' => 0,  // Default value
                'rented_stock' => 0,    // Default value
                'images' => []          // Default empty array
            ]
        ];
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