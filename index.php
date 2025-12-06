<?php
// Railway entry point - route all API requests to /api/ folder
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get request URI
$request_uri = $_SERVER['REQUEST_URI'];

// Health check endpoint
if ($request_uri === '/' || $request_uri === '') {
    echo json_encode([
        'success' => true,
        'message' => 'Kuala Outdoor API Server',
        'version' => '1.0.0',
        'php_version' => phpversion(),
        'endpoints' => [
            '/api/public/equipment.php' => 'Equipment catalog',
            '/api/public/trips.php' => 'Open trips',
            '/api/public/packages.php' => 'Package deals',
            '/api/public/login.php' => 'Customer login',
            '/api/public/register.php' => 'Customer registration'
        ]
    ]);
    exit();
}

// Route to API folder
if (strpos($request_uri, '/api/') === 0) {
    // Remove /api/ prefix and route to actual file
    $file_path = __DIR__ . $request_uri;
    
    if (file_exists($file_path) && is_file($file_path)) {
        require $file_path;
        exit();
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error' => 'Endpoint not found',
            'requested' => $request_uri
        ]);
        exit();
    }
}

// 404 for other routes
http_response_code(404);
echo json_encode([
    'success' => false,
    'error' => 'Not found'
]);
?>
