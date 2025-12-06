<?php
// filepath: api/config/database.php
// ✅ InfinityFree Production Database Configuration

class Database {
    // 🔴 INFINITYFREE CREDENTIALS - Jangan hardcode di production!
    private $host = "sql207.infinityfree.com";
    private $db_name = "if0_40557727_kuala_outdoor";
    private $username = "if0_40557727";
    private $password = "kuala1234567890";
    public $conn;

    // ✅ METHOD connect() YANG BENAR
    public function connect() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
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