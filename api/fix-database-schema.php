<?php
// Fix Database Schema via Railway
// Execute: Upload this to Railway and run it once

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $pdo = $database->connect();
    
    $results = [];
    
    // 1. Check current column definition
    $stmt = $pdo->query("DESCRIBE equipment");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $codeColumn = null;
    foreach ($columns as $col) {
        if ($col['Field'] === 'code') {
            $codeColumn = $col;
            break;
        }
    }
    
    $results['current_schema'] = $codeColumn;
    
    // 2. Check current code lengths
    $stmt = $pdo->query("
        SELECT code, LENGTH(code) as code_length, name 
        FROM equipment 
        ORDER BY LENGTH(code) DESC 
        LIMIT 5
    ");
    $results['current_codes'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // 3. ALTER TABLE to expand code column
    try {
        $pdo->exec("ALTER TABLE equipment MODIFY COLUMN code VARCHAR(50) NOT NULL");
        $results['alter_table'] = 'SUCCESS';
    } catch (Exception $e) {
        $results['alter_table'] = 'FAILED: ' . $e->getMessage();
    }
    
    // 4. Verify new schema
    $stmt = $pdo->query("DESCRIBE equipment");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($columns as $col) {
        if ($col['Field'] === 'code') {
            $results['new_schema'] = $col;
            break;
        }
    }
    
    // 5. Test with long code
    try {
        $testCode = 'TEST-API-LONG-CODE-' . time();
        $stmt = $pdo->prepare("
            INSERT INTO equipment (
                name, code, category, stock_quantity, 
                available_stock, price_per_day, `condition`, equipment_type
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            'Test Long Code Equipment',
            $testCode,
            'Test',
            1,
            1,
            1000,
            'baik',
            'rental'
        ]);
        
        $testId = $pdo->lastInsertId();
        $results['test_insert'] = [
            'status' => 'SUCCESS',
            'code' => $testCode,
            'code_length' => strlen($testCode),
            'equipment_id' => $testId
        ];
        
        // Clean up test data
        $pdo->exec("DELETE FROM equipment WHERE equipment_id = $testId");
        $results['test_cleanup'] = 'SUCCESS';
        
    } catch (Exception $e) {
        $results['test_insert'] = 'FAILED: ' . $e->getMessage();
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Database schema fix completed',
        'results' => $results
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
