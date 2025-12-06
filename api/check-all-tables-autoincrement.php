<?php
// Check ALL tables for missing AUTO_INCREMENT on primary keys
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $pdo = $database->connect();
    
    $results = [];
    
    // 1. Get all tables in database
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    $results['total_tables'] = count($tables);
    $results['tables_checked'] = [];
    $results['missing_autoincrement'] = [];
    $results['has_autoincrement'] = [];
    
    // 2. Check each table for primary keys without AUTO_INCREMENT
    foreach ($tables as $table) {
        // Get table structure
        $stmt = $pdo->query("DESCRIBE `$table`");
        $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Find primary key columns
        foreach ($columns as $col) {
            if ($col['Key'] === 'PRI') {
                $tableInfo = [
                    'table' => $table,
                    'column' => $col['Field'],
                    'type' => $col['Type'],
                    'extra' => $col['Extra']
                ];
                
                $results['tables_checked'][] = $table;
                
                // Check if it has AUTO_INCREMENT
                if (stripos($col['Extra'], 'auto_increment') === false) {
                    // Missing AUTO_INCREMENT!
                    $tableInfo['issue'] = 'MISSING AUTO_INCREMENT';
                    $results['missing_autoincrement'][] = $tableInfo;
                } else {
                    // Has AUTO_INCREMENT
                    $results['has_autoincrement'][] = $tableInfo;
                }
            }
        }
    }
    
    $results['summary'] = [
        'total_tables' => count($tables),
        'tables_with_primary_keys' => count($results['tables_checked']),
        'missing_autoincrement_count' => count($results['missing_autoincrement']),
        'has_autoincrement_count' => count($results['has_autoincrement'])
    ];
    
    echo json_encode([
        'success' => true,
        'message' => 'Scan completed',
        'results' => $results
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
