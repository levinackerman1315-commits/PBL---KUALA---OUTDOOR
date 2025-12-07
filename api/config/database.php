<?php
// filepath: api/config/database.php
// ✅ Multi-environment Database Configuration (Railway + Local)

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $port;
    public $conn;

    public function __construct() {
        // ✅ Railway environment variables (check $_ENV and $_SERVER too)
        // Priority: $_ENV > $_SERVER > getenv() > fallback
        $this->host = $_ENV['MYSQLHOST'] ?? $_SERVER['MYSQLHOST'] ?? getenv('MYSQLHOST') ?: 'localhost';
        $this->port = $_ENV['MYSQLPORT'] ?? $_SERVER['MYSQLPORT'] ?? getenv('MYSQLPORT') ?: '3306';
        $this->db_name = $_ENV['MYSQLDATABASE'] ?? $_SERVER['MYSQLDATABASE'] ?? getenv('MYSQLDATABASE') ?: 'railway';
        $this->username = $_ENV['MYSQLUSER'] ?? $_SERVER['MYSQLUSER'] ?? getenv('MYSQLUSER') ?: 'root';
        $this->password = $_ENV['MYSQLPASSWORD'] ?? $_SERVER['MYSQLPASSWORD'] ?? getenv('MYSQLPASSWORD') ?: '';
        
        // Debug logging untuk Railway
        error_log("Database config - Host: {$this->host}, DB: {$this->db_name}, User: {$this->username}");
    }

    // ✅ METHOD connect() with environment support
    public function connect() {
        $this->conn = null;
        
        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->db_name};charset=utf8mb4";
            $this->conn = new PDO(
                $dsn,
                $this->username,
                $this->password,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
                )
            );
            
        } catch(PDOException $e) {
            error_log("Database Connection Error: " . $e->getMessage());
            // ⚠️ Don't expose error in production
            http_response_code(500);
            die(json_encode([
                'success' => false,
                'error' => 'Database connection failed'
            ]));
        }
        
        return $this->conn;
    }

    // ✅ METHOD ALTERNATIVE JIKA PERLU
    public function getConnection() {
        return $this->connect();
    }
}
?>