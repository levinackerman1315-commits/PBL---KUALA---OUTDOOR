<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/database.php';

try {
    if (isset($_GET['id'])) {
        // Detail trip
        $id = $_GET['id'];
        $stmt = $pdo->prepare("
            SELECT t.*, 
                   (t.total_quota - t.remaining_quota) as current_participants
            FROM trips t
            WHERE t.trip_id = ? AND t.status = 'active'
        ");
        $stmt->execute([$id]);
        $trip = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($trip) {
            // Decode JSON fields
            $trip['images'] = json_decode($trip['images'] ?? '[]');
            $trip['required_gear'] = json_decode($trip['required_gear'] ?? '[]');
            $trip['rules'] = json_decode($trip['rules'] ?? '[]');
            $trip['search_tags'] = json_decode($trip['search_tags'] ?? '[]');
            
            echo json_encode([
                "success" => true,
                "data" => $trip
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "success" => false,
                "message" => "Trip tidak ditemukan"
            ]);
        }
    } else {
        // List trips dengan filter
        $where = ["t.status = 'active'"];
        $params = [];
        
        // Filter kategori
        if (isset($_GET['category'])) {
            $categories = explode(',', $_GET['category']);
            $placeholders = str_repeat('?,', count($categories) - 1) . '?';
            $where[] = "t.category IN ($placeholders)";
            $params = array_merge($params, $categories);
        }
        
        // Filter difficulty
        if (isset($_GET['difficulty'])) {
            $where[] = "t.difficulty = ?";
            $params[] = $_GET['difficulty'];
        }
        
        // Search
        if (isset($_GET['search'])) {
            $search = '%' . $_GET['search'] . '%';
            $where[] = "(t.title LIKE ? OR t.location LIKE ? OR t.search_tags LIKE ?)";
            $params[] = $search;
            $params[] = $search;
            $params[] = $search;
        }
        
        $whereClause = implode(' AND ', $where);
        
        $stmt = $pdo->prepare("
            SELECT t.*,
                   (t.total_quota - t.remaining_quota) as current_participants
            FROM trips t
            WHERE $whereClause
            ORDER BY t.start_date ASC, t.created_at DESC
        ");
        $stmt->execute($params);
        $trips = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON untuk setiap trip
        foreach ($trips as &$trip) {
            $trip['images'] = json_decode($trip['images'] ?? '[]');
            $trip['search_tags'] = json_decode($trip['search_tags'] ?? '[]');
        }
        
        echo json_encode([
            "success" => true,
            "data" => $trips
        ]);
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>