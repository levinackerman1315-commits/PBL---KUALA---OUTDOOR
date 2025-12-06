<?php
/**
 * Shared CORS Configuration for Railway + Vercel
 * filepath: api/config/cors.php
 * 
 * Usage: Include this at the top of every PHP endpoint file:
 * require_once __DIR__ . '/../config/cors.php';
 */

// ✅ ALLOWED ORIGINS (Vercel + localhost)
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost',
    'https://pbl-kuala-outdoor.vercel.app',
    'https://pbl-kuala-outdoor-production.up.railway.app'
];

// Get the origin from request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Check if origin is allowed
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Fallback: allow all for development
    header("Access-Control-Allow-Origin: *");
}

// ✅ CORS HEADERS
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 86400"); // 24 hours

// ✅ CONTENT TYPE
header("Content-Type: application/json; charset=UTF-8");

// ✅ HANDLE OPTIONS (preflight) REQUEST
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✅ ERROR REPORTING (Production mode)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Off for production
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../../logs/php_errors.log');

/**
 * Helper function: Get base URL for Railway
 */
function getBaseUrl() {
    // Check if running on Railway
    if (getenv('RAILWAY_PUBLIC_DOMAIN')) {
        return 'https://' . getenv('RAILWAY_PUBLIC_DOMAIN');
    }
    
    // Check if running on InfinityFree (fallback)
    if (isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'free.nf') !== false) {
        return 'https://' . $_SERVER['HTTP_HOST'];
    }
    
    // Default to Railway production URL
    return 'https://pbl-kuala-outdoor-production.up.railway.app';
}

/**
 * Helper function: Build full image URL
 */
function buildImageUrl($imagePath) {
    if (!$imagePath) return null;
    if (strpos($imagePath, 'http') === 0) return $imagePath; // Already full URL
    
    $baseUrl = getBaseUrl();
    $imagePath = ltrim($imagePath, '/');
    
    return $baseUrl . '/' . $imagePath;
}

/**
 * Helper function: JSON response
 */
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

/**
 * Helper function: JSON error response
 */
function jsonError($message, $statusCode = 400) {
    http_response_code($statusCode);
    echo json_encode([
        'error' => true,
        'message' => $message
    ]);
    exit();
}
?>
