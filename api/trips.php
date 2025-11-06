<?php
// filepath: d:\Data Aplikasi\xampp\htdocs\PBL-KELANA-OUTDOOR\api\trips.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
$host = "localhost";
$db_name = "kuala_outdoor";
$username = "root";
$password = "";

try {
    $conn = new mysqli($host, $username, $password, $db_name);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    $conn->set_charset("utf8mb4");
    
    $method = $_SERVER['REQUEST_METHOD'];
    $action = $_GET['action'] ?? '';
    $trip_id = $_GET['id'] ?? null;
    
    switch ($method) {
        case 'GET':
            if ($action === 'list' || !$action) {
                getAllTrips($conn);
            } elseif ($action === 'detail' && $trip_id) {
                getTripById($conn, $trip_id);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid action']);
            }
            break;
            
        case 'POST':
            if ($action === 'create') {
                createTrip($conn);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid action']);
            }
            break;
            
        case 'PUT':
            if ($action === 'update' && $trip_id) {
                updateTrip($conn, $trip_id);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid action or missing ID']);
            }
            break;
            
        case 'DELETE':
            if ($action === 'delete' && $trip_id) {
                deleteTrip($conn, $trip_id);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid action or missing ID']);
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Method not allowed']);
            break;
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error',
        'message' => $e->getMessage()
    ]);
}

// ==================== FUNCTIONS ====================

function getAllTrips($conn) {
    $sql = "SELECT * FROM open_trips ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    if ($result) {
        $trips = [];
        while ($row = $result->fetch_assoc()) {
            // Parse JSON fields
            $row['images'] = json_decode($row['images'] ?? '[]', true);
            $row['search_tags'] = json_decode($row['search_tags'] ?? '[]', true);
            $row['itinerary'] = json_decode($row['itinerary'] ?? '[]', true);
            $row['required_gear'] = json_decode($row['required_gear'] ?? '[]', true);
            $row['rules'] = json_decode($row['rules'] ?? '[]', true);
            $trips[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'records' => $trips,
            'total' => count($trips)
        ]);
    } else {
        throw new Exception("Failed to fetch trips: " . $conn->error);
    }
}

function getTripById($conn, $trip_id) {
    $stmt = $conn->prepare("SELECT * FROM open_trips WHERE trip_id = ?");
    $stmt->bind_param("i", $trip_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $trip = $result->fetch_assoc();
        
        // Parse JSON fields
        $trip['images'] = json_decode($trip['images'] ?? '[]', true);
        $trip['search_tags'] = json_decode($trip['search_tags'] ?? '[]', true);
        $trip['itinerary'] = json_decode($trip['itinerary'] ?? '[]', true);
        $trip['required_gear'] = json_decode($trip['required_gear'] ?? '[]', true);
        $trip['rules'] = json_decode($trip['rules'] ?? '[]', true);
        
        echo json_encode(['success' => true, 'data' => $trip]);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Trip not found']);
    }
    
    $stmt->close();
}

function createTrip($conn) {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        return;
    }
    
    // Validate required fields
    $required = ['title', 'location', 'category', 'difficulty', 'start_date', 
                 'duration_days', 'total_quota', 'remaining_quota', 'status',
                 'contact_name', 'contact_whatsapp'];
    
    foreach ($required as $field) {
        if (!isset($data[$field]) || $data[$field] === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => "Field '$field' is required"]);
            return;
        }
    }
    
    // Prepare data
    $title = $data['title'];
    $location = $data['location'];
    $category = $data['category'];
    $difficulty = $data['difficulty'];
    $start_date = $data['start_date'];
    $start_time = $data['start_time'] ?? null;
    $duration_days = $data['duration_days'];
    $total_quota = $data['total_quota'];
    $remaining_quota = $data['remaining_quota'];
    $status = $data['status'];
    $short_description = $data['short_description'] ?? null;
    $cover_image = $data['cover_image'] ?? null;
    $map_url = $data['map_url'] ?? null;
    $meeting_point_name = $data['meeting_point_name'] ?? null;
    $meeting_point_address = $data['meeting_point_address'] ?? null;
    $meeting_point_map_url = $data['meeting_point_map_url'] ?? null;
    $contact_name = $data['contact_name'];
    $contact_whatsapp = $data['contact_whatsapp'];
    $contact_role = $data['contact_role'] ?? 'PIC Trip';
    
    // JSON fields
    $images = json_encode($data['images'] ?? []);
    $search_tags = json_encode($data['search_tags'] ?? []);
    $itinerary = json_encode($data['itinerary'] ?? []);
    $required_gear = json_encode($data['required_gear'] ?? []);
    $rules = json_encode($data['rules'] ?? []);
    
    $stmt = $conn->prepare("
        INSERT INTO open_trips (
            title, location, category, difficulty, start_date, start_time,
            duration_days, total_quota, remaining_quota, status, short_description,
            cover_image, images, map_url, meeting_point_name, meeting_point_address,
            meeting_point_map_url, contact_name, contact_whatsapp, contact_role,
            search_tags, itinerary, required_gear, rules, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");
    
    $stmt->bind_param(
        "ssssssiiisssssssssssssss",
        $title, $location, $category, $difficulty, $start_date, $start_time,
        $duration_days, $total_quota, $remaining_quota, $status, $short_description,
        $cover_image, $images, $map_url, $meeting_point_name, $meeting_point_address,
        $meeting_point_map_url, $contact_name, $contact_whatsapp, $contact_role,
        $search_tags, $itinerary, $required_gear, $rules
    );
    
    if ($stmt->execute()) {
        $new_id = $conn->insert_id;
        echo json_encode([
            'success' => true,
            'message' => 'Trip created successfully',
            'trip_id' => $new_id
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to create trip',
            'message' => $stmt->error
        ]);
    }
    
    $stmt->close();
}

function updateTrip($conn, $trip_id) {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        return;
    }
    
    // Check if trip exists
    $check = $conn->prepare("SELECT trip_id FROM open_trips WHERE trip_id = ?");
    $check->bind_param("i", $trip_id);
    $check->execute();
    if ($check->get_result()->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Trip not found']);
        $check->close();
        return;
    }
    $check->close();
    
    // Prepare data (same as create)
    $title = $data['title'];
    $location = $data['location'];
    $category = $data['category'];
    $difficulty = $data['difficulty'];
    $start_date = $data['start_date'];
    $start_time = $data['start_time'] ?? null;
    $duration_days = $data['duration_days'];
    $total_quota = $data['total_quota'];
    $remaining_quota = $data['remaining_quota'];
    $status = $data['status'];
    $short_description = $data['short_description'] ?? null;
    $cover_image = $data['cover_image'] ?? null;
    $map_url = $data['map_url'] ?? null;
    $meeting_point_name = $data['meeting_point_name'] ?? null;
    $meeting_point_address = $data['meeting_point_address'] ?? null;
    $meeting_point_map_url = $data['meeting_point_map_url'] ?? null;
    $contact_name = $data['contact_name'];
    $contact_whatsapp = $data['contact_whatsapp'];
    $contact_role = $data['contact_role'] ?? 'PIC Trip';
    
    $images = json_encode($data['images'] ?? []);
    $search_tags = json_encode($data['search_tags'] ?? []);
    $itinerary = json_encode($data['itinerary'] ?? []);
    $required_gear = json_encode($data['required_gear'] ?? []);
    $rules = json_encode($data['rules'] ?? []);
    
    $stmt = $conn->prepare("
        UPDATE open_trips SET
            title = ?, location = ?, category = ?, difficulty = ?, start_date = ?, start_time = ?,
            duration_days = ?, total_quota = ?, remaining_quota = ?, status = ?, short_description = ?,
            cover_image = ?, images = ?, map_url = ?, meeting_point_name = ?, meeting_point_address = ?,
            meeting_point_map_url = ?, contact_name = ?, contact_whatsapp = ?, contact_role = ?,
            search_tags = ?, itinerary = ?, required_gear = ?, rules = ?
        WHERE trip_id = ?
    ");
    
    $stmt->bind_param(
        "ssssssiiissssssssssssssi",
        $title, $location, $category, $difficulty, $start_date, $start_time,
        $duration_days, $total_quota, $remaining_quota, $status, $short_description,
        $cover_image, $images, $map_url, $meeting_point_name, $meeting_point_address,
        $meeting_point_map_url, $contact_name, $contact_whatsapp, $contact_role,
        $search_tags, $itinerary, $required_gear, $rules, $trip_id
    );
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Trip updated successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to update trip',
            'message' => $stmt->error
        ]);
    }
    
    $stmt->close();
}

function deleteTrip($conn, $trip_id) {
    // Check if trip exists
    $check = $conn->prepare("SELECT trip_id FROM open_trips WHERE trip_id = ?");
    $check->bind_param("i", $trip_id);
    $check->execute();
    if ($check->get_result()->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Trip not found']);
        $check->close();
        return;
    }
    $check->close();
    
    $stmt = $conn->prepare("DELETE FROM open_trips WHERE trip_id = ?");
    $stmt->bind_param("i", $trip_id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Trip deleted successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to delete trip',
            'message' => $stmt->error
        ]);
    }
    
    $stmt->close();
}

$conn->close();
?>