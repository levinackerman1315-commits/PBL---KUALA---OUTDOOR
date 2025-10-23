<?php
// Simple equipment test - manual create

header("Content-Type: application/json; charset=UTF-8");

// Direct database connection
try {
    $pdo = new PDO("mysql:host=localhost;dbname=kelana_outdoor", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Simple query
    $stmt = $pdo->query("SELECT * FROM equipment LIMIT 5");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "status" => "success",
        "count" => count($results),
        "data" => $results
    ]);
    
} catch(Exception $e) {
    echo json_encode([
        "status" => "error", 
        "message" => $e->getMessage()
    ]);
}
?>