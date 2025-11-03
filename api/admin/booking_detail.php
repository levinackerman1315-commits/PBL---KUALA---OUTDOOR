<?php
// filepath: api/admin/booking_detail.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';

try {
    if (!isset($_GET['booking_id'])) {
        throw new Exception('Booking ID required');
    }

    $booking_id = $_GET['booking_id'];
    
    $database = new Database();
    $conn = $database->getConnection();
    
    // ✅ GET BOOKING INFO
    $query = "SELECT * FROM bookings WHERE booking_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$booking_id]);
    $booking = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$booking) {
        throw new Exception('Booking not found');
    }
    
    error_log("📦 Booking ID: " . $booking_id);
    
    // ✅ GET EQUIPMENT ITEMS
    $equipmentQuery = "
        SELECT 
            e.equipment_id,
            e.name as equipment_name,
            e.price_per_day,
            bi.quantity
        FROM booking_items bi
        JOIN equipment e ON bi.equipment_id = e.equipment_id
        WHERE bi.booking_id = ? AND bi.equipment_id IS NOT NULL
    ";
    $equipmentStmt = $conn->prepare($equipmentQuery);
    $equipmentStmt->execute([$booking_id]);
    $equipmentItems = $equipmentStmt->fetchAll(PDO::FETCH_ASSOC);
    
    error_log("🔧 Equipment Items: " . count($equipmentItems));
    
    // ✅ GET PACKAGE ITEMS
    $packageQuery = "
        SELECT 
            ep.package_id,
            ep.name as package_name,
            ep.package_price as price_per_day,
            bi.quantity
        FROM booking_items bi
        JOIN equipment_packages ep ON bi.package_id = ep.package_id
        WHERE bi.booking_id = ? AND bi.package_id IS NOT NULL
    ";
    $packageStmt = $conn->prepare($packageQuery);
    $packageStmt->execute([$booking_id]);
    $packages = $packageStmt->fetchAll(PDO::FETCH_ASSOC);
    
    error_log("📦 Package Items: " . count($packages));
    
    // ✅ GET ITEMS DALAM PAKET
    foreach ($packages as &$package) {
        $itemsQuery = "
            SELECT item_name, quantity
            FROM package_items
            WHERE package_id = ?
            ORDER BY display_order
        ";
        $itemsStmt = $conn->prepare($itemsQuery);
        $itemsStmt->execute([$package['package_id']]);
        $package['items'] = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);
        
        error_log("  └─ Package '{$package['package_name']}' has " . count($package['items']) . " items");
    }
    
    // ✅ ASSIGN TO BOOKING
    $booking['equipment_items'] = $equipmentItems;
    $booking['package_items'] = $packages;
    
    echo json_encode([
        'success' => true,
        'data' => $booking,
        'debug' => [
            'equipment_count' => count($equipmentItems),
            'package_count' => count($packages)
        ]
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    error_log("❌ Error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>