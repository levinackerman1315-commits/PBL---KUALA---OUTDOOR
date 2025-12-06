<?php
// FIX ALL TABLES MISSING AUTO_INCREMENT
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $pdo = $database->connect();
    
    $results = [];
    
    // List of tables that need AUTO_INCREMENT fix
    $tablesToFix = [
        ['table' => 'merchandise', 'column' => 'merchandise_id', 'type' => 'INT UNSIGNED'],
        ['table' => 'open_trips', 'column' => 'trip_id', 'type' => 'INT'],
        ['table' => 'package_availability', 'column' => 'availability_id', 'type' => 'INT'],
        ['table' => 'package_bookings', 'column' => 'booking_id', 'type' => 'INT'],
        ['table' => 'package_cart', 'column' => 'cart_id', 'type' => 'INT'],
        ['table' => 'package_items', 'column' => 'package_item_id', 'type' => 'INT'],
        ['table' => 'stock_movements', 'column' => 'movement_id', 'type' => 'INT'],
        ['table' => 'trip_participations', 'column' => 'participation_id', 'type' => 'INT'],
        ['table' => 'trips', 'column' => 'trip_id', 'type' => 'INT'],
        ['table' => 'user_profiles', 'column' => 'id', 'type' => 'INT']
    ];
    
    $results['total_fixes'] = count($tablesToFix);
    $results['success'] = [];
    $results['failed'] = [];
    
    // Apply AUTO_INCREMENT to each table
    foreach ($tablesToFix as $table) {
        try {
            $sql = "ALTER TABLE `{$table['table']}` MODIFY COLUMN `{$table['column']}` {$table['type']} NOT NULL AUTO_INCREMENT";
            
            $pdo->exec($sql);
            
            $results['success'][] = [
                'table' => $table['table'],
                'column' => $table['column'],
                'status' => 'SUCCESS'
            ];
            
        } catch (Exception $e) {
            $results['failed'][] = [
                'table' => $table['table'],
                'column' => $table['column'],
                'error' => $e->getMessage()
            ];
        }
    }
    
    // Verify fixes
    $results['verification'] = [];
    foreach ($tablesToFix as $table) {
        $stmt = $pdo->query("DESCRIBE `{$table['table']}`");
        $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($columns as $col) {
            if ($col['Field'] === $table['column']) {
                $results['verification'][] = [
                    'table' => $table['table'],
                    'column' => $table['column'],
                    'type' => $col['Type'],
                    'extra' => $col['Extra'],
                    'has_autoincrement' => stripos($col['Extra'], 'auto_increment') !== false
                ];
                break;
            }
        }
    }
    
    // Test INSERT on package_items (the one causing your error)
    try {
        // Get a test package_id
        $stmt = $pdo->query("SELECT package_id FROM equipment_packages LIMIT 1");
        $testPackageId = $stmt->fetchColumn();
        
        if ($testPackageId) {
            // Get a test equipment_id
            $stmt = $pdo->query("SELECT equipment_id FROM equipment LIMIT 1");
            $testEquipmentId = $stmt->fetchColumn();
            
            if ($testEquipmentId) {
                $stmt = $pdo->prepare("
                    INSERT INTO package_items (package_id, equipment_id, quantity)
                    VALUES (?, ?, ?)
                ");
                $stmt->execute([$testPackageId, $testEquipmentId, 1]);
                
                $testItemId = $pdo->lastInsertId();
                
                $results['test_insert'] = [
                    'status' => 'SUCCESS',
                    'table' => 'package_items',
                    'package_item_id' => $testItemId,
                    'message' => 'AUTO_INCREMENT working!'
                ];
                
                // Cleanup
                $pdo->exec("DELETE FROM package_items WHERE package_item_id = $testItemId");
            }
        }
    } catch (Exception $e) {
        $results['test_insert'] = [
            'status' => 'FAILED',
            'error' => $e->getMessage()
        ];
    }
    
    $results['summary'] = [
        'total_tables' => count($tablesToFix),
        'successful_fixes' => count($results['success']),
        'failed_fixes' => count($results['failed'])
    ];
    
    echo json_encode([
        'success' => true,
        'message' => 'AUTO_INCREMENT fix completed for all tables',
        'results' => $results
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
