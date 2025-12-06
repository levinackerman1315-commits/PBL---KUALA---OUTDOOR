<?php
// Debug environment variables
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$env_vars = [
    'MYSQLHOST' => getenv('MYSQLHOST') ?: 'NOT SET',
    'MYSQLPORT' => getenv('MYSQLPORT') ?: 'NOT SET',
    'MYSQLDATABASE' => getenv('MYSQLDATABASE') ?: 'NOT SET',
    'MYSQLUSER' => getenv('MYSQLUSER') ?: 'NOT SET',
    'MYSQLPASSWORD' => getenv('MYSQLPASSWORD') ? '***HIDDEN***' : 'NOT SET',
    'PHP_VERSION' => phpversion(),
    'SERVER_SOFTWARE' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
];

echo json_encode([
    'success' => true,
    'environment_variables' => $env_vars,
    'message' => 'If MYSQL* variables show NOT SET, Railway env vars are not injected'
], JSON_PRETTY_PRINT);
