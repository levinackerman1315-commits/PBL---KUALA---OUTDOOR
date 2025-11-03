<?php
// filepath: c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\public\packages.php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

try {
    // Query untuk get all packages dengan items
    $query = "
        SELECT 
            ep.package_id,
            ep.name as package_name,
            ep.capacity,
            ep.description,
            ep.package_price,
            ep.total_items,
            ep.package_stock,
            ep.package_stock_reserved,
            (ep.package_stock - ep.package_stock_reserved) as available_stock,
            ep.badge_text,
            ep.badge_color,
            ep.is_popular,
            ep.display_order,
            ep.image_url,
            ep.is_active,
            COUNT(DISTINCT pi.package_item_id) as actual_item_count
        FROM equipment_packages ep
        LEFT JOIN package_items pi ON ep.package_id = pi.package_id
        WHERE ep.is_active = TRUE
        GROUP BY ep.package_id
        ORDER BY ep.display_order ASC, ep.is_popular DESC
    ";

    $stmt = $db->prepare($query);
    $stmt->execute();

    $packages = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $package_id = $row['package_id'];

        // Get items untuk package ini
        $items_query = "
            SELECT 
                item_name,
                quantity,
                display_order
            FROM package_items
            WHERE package_id = ?
            ORDER BY display_order ASC
        ";
        
        $items_stmt = $db->prepare($items_query);
        $items_stmt->execute([$package_id]);
        $items = $items_stmt->fetchAll(PDO::FETCH_ASSOC);

        // Format sesuai interface TypeScript di frontend
        $packages[] = [
            'id' => (int)$row['package_id'],
            'name' => $row['package_name'],
            'capacity' => $row['capacity'],
            'price' => (float)$row['package_price'],
            'pricePerDay' => 'Rp ' . number_format($row['package_price'], 0, ',', '.') . ' / HARI',
            'badge' => $row['badge_text'],
            'badgeColor' => $row['badge_color'],
            'popular' => (bool)$row['is_popular'],
            'description' => $row['description'],
            'image_url' => $row['image_url'],
            'total_items' => (int)$row['actual_item_count'],
            'package_stock' => (int)$row['package_stock'],
            'package_stock_reserved' => (int)$row['package_stock_reserved'],
            'available_stock' => (int)$row['available_stock'],
            'in_stock' => (int)$row['available_stock'] > 0,
            'items' => array_map(function($item) {
                return [
                    'name' => $item['item_name'],
                    'quantity' => (int)$item['quantity']
                ];
            }, $items)
        ];
    }

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $packages,
        'count' => count($packages),
        'message' => 'Packages retrieved successfully'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage(),
        'data' => []
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage(),
        'data' => []
    ]);
}
?>