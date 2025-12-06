<?php
// FIX: Add AUTO_INCREMENT to guide_id
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $pdo = $database->connect();
    
    $results = [];
    
    // 1. Check current schema
    $stmt = $pdo->query("DESCRIBE equipment_usage_guides");
    $results['before'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // 2. ALTER TABLE to add AUTO_INCREMENT
    try {
        $pdo->exec("ALTER TABLE equipment_usage_guides MODIFY COLUMN guide_id INT UNSIGNED NOT NULL AUTO_INCREMENT");
        $results['alter_table'] = 'SUCCESS';
    } catch (Exception $e) {
        $results['alter_table'] = 'FAILED: ' . $e->getMessage();
    }
    
    // 3. Verify new schema
    $stmt = $pdo->query("DESCRIBE equipment_usage_guides");
    $results['after'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // 4. Test INSERT
    try {
        // Use a test equipment_id that exists
        $stmt = $pdo->query("SELECT equipment_id FROM equipment LIMIT 1");
        $testEquipmentId = $stmt->fetchColumn();
        
        if ($testEquipmentId) {
            $stmt = $pdo->prepare("
                INSERT INTO equipment_usage_guides (equipment_id, step_number, title, description)
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([
                $testEquipmentId,
                999,
                'Test Step',
                'Test description for AUTO_INCREMENT verification'
            ]);
            
            $testGuideId = $pdo->lastInsertId();
            $results['test_insert'] = [
                'status' => 'SUCCESS',
                'guide_id' => $testGuideId,
                'equipment_id' => $testEquipmentId
            ];
            
            // Cleanup test data
            $pdo->exec("DELETE FROM equipment_usage_guides WHERE guide_id = $testGuideId");
            $results['test_cleanup'] = 'SUCCESS';
        } else {
            $results['test_insert'] = 'SKIPPED - No equipment found';
        }
    } catch (Exception $e) {
        $results['test_insert'] = 'FAILED: ' . $e->getMessage();
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'guide_id AUTO_INCREMENT fix completed',
        'results' => $results
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
