<?php
// filepath: c:\xampp\htdocs\PBL - KELANA OUTDOOR\api\index.php

// Set headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Get request method and URI
$request_method = $_SERVER["REQUEST_METHOD"];
$request_uri = $_SERVER["REQUEST_URI"];

// Debug: Show what we're getting
// Uncomment line below for debugging
// echo json_encode(["debug" => "URI: " . $request_uri, "method" => $request_method]);

function parseUri($uri) {
    $path = parse_url($uri, PHP_URL_PATH);
    $path = trim($path, '/');
    $segments = explode('/', $path);
    
    // Debug: show segments
    // echo json_encode(["debug_segments" => $segments]);
    
    // Find 'api' in segments and return everything after it
    $api_index = array_search('api', $segments);
    if ($api_index !== false) {
        return array_slice($segments, $api_index + 1);
    }
    
    // Fallback: assume last part is what we want
    return array_slice($segments, -1);
}

$uri_segments = parseUri($request_uri);

// Route handling
try {
    switch ($request_method) {
        case 'GET':
            handleGetRequest($uri_segments);
            break;
        case 'POST':
            handlePostRequest($uri_segments);
            break;
        case 'PUT':
            handlePutRequest($uri_segments);
            break;
        case 'DELETE':
            handleDeleteRequest($uri_segments);
            break;
        default:
            http_response_code(405);
            echo json_encode(array("message" => "Method not allowed"));
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Internal server error: " . $e->getMessage()));
}

function handleGetRequest($segments) {
    // Debug: show what segments we got
    if (empty($segments) || empty($segments[0])) {
        echo json_encode(array(
            "message" => "Kelana Outdoor API v1.0", 
            "status" => "running",
            "available_endpoints" => [
                "GET /api/equipment",
                "GET /api/equipment/categories", 
                "GET /api/equipment/category/{category}",
                "GET /api/equipment/{id}"
            ]
        ));
        return;
    }

    switch ($segments[0]) {
        case 'equipment':
            // Use __DIR__ to get absolute path
            $controller_path = __DIR__ . '/controllers/EquipmentController.php';
            
            if (!file_exists($controller_path)) {
                echo json_encode(array("error" => "Controller file not found: " . $controller_path));
                return;
            }
            
            include_once $controller_path;
            
            if (!class_exists('EquipmentController')) {
                echo json_encode(array("error" => "EquipmentController class not found"));
                return;
            }
            
            try {
                $controller = new EquipmentController();
                
                if (isset($segments[1])) {
                    if ($segments[1] === 'categories') {
                        $controller->categories();
                    } elseif ($segments[1] === 'category' && isset($segments[2])) {
                        $controller->byCategory($segments[2]);
                    } elseif (is_numeric($segments[1])) {
                        $controller->show($segments[1]);
                    } else {
                        http_response_code(404);
                        echo json_encode(array("message" => "Endpoint not found: " . implode('/', $segments)));
                    }
                } else {
                    $controller->index();
                }
            } catch (Exception $e) {
                echo json_encode(array("error" => "Controller error: " . $e->getMessage()));
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(array("message" => "Endpoint not found: " . $segments[0]));
            break;
    }
}

function handlePostRequest($segments) {
    http_response_code(501);
    echo json_encode(array("message" => "POST endpoints not implemented yet"));
}

function handlePutRequest($segments) {
    http_response_code(501);
    echo json_encode(array("message" => "PUT endpoints not implemented yet"));
}

function handleDeleteRequest($segments) {
    http_response_code(501);
    echo json_encode(array("message" => "DELETE endpoints not implemented yet"));
}
?>