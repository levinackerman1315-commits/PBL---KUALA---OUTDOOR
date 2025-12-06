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
        // Railway environment variables (production)
        // Falls back to InfinityFree or local if not set
        $this->host = getenv('MYSQLHOST') ?: getenv('DB_HOST') ?: 'sql207.infinityfree.com';
        $this->port = getenv('MYSQLPORT') ?: getenv('DB_PORT') ?: '3306';
        $this->db_name = getenv('MYSQLDATABASE') ?: getenv('DB_NAME') ?: 'if0_40557727_kuala_outdoor';
        $this->username = getenv('MYSQLUSER') ?: getenv('DB_USER') ?: 'if0_40557727';
        $this->password = getenv('MYSQLPASSWORD') ?: getenv('DB_PASSWORD') ?: 'kuala1234567890';
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