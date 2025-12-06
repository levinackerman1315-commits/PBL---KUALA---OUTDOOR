<?php
// Check equipment_usage_guides table schema
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $pdo = $database->connect();
    
    $results = [];
    
    // 1. Get table structure
    $stmt = $pdo->query("DESCRIBE equipment_usage_guides");
    $results['table_structure'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // 2. Check if guide_id is auto_increment
    $stmt = $pdo->query("SHOW CREATE TABLE equipment_usage_guides");
    $createTable = $stmt->fetch(PDO::FETCH_ASSOC);
    $results['create_table'] = $createTable['Create Table'];
    
    // 3. Get sample data
    $stmt = $pdo->query("SELECT * FROM equipment_usage_guides LIMIT 5");
    $results['sample_data'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // 4. Check constraints
    $stmt = $pdo->query("
        SELECT 
            COLUMN_NAME, 
            IS_NULLABLE, 
            COLUMN_DEFAULT,
            COLUMN_KEY,
            EXTRA
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'equipment_usage_guides'
        ORDER BY ORDINAL_POSITION
    ");
    $results['column_details'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'results' => $results
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
