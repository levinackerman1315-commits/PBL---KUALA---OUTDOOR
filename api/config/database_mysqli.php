<?php
// filepath: api/config/database_mysqli.php
// ✅ InfinityFree Database Configuration for MySQLi

class DatabaseMySQLi {
    private $host = "sql207.infinityfree.com";
    private $db_name = "if0_40557727_kuala_outdoor";
    private $username = "if0_40557727";
    private $password = "kuala1234567890";
    public $conn;

    public function connect() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
        
        if ($this->conn->connect_error) {
            error_log("Database Connection Error: " . $this->conn->connect_error);
            http_response_code(500);
            die(json_encode([
                'success' => false,
                'error' => 'Database connection failed'
            ]));
        }
        
        $this->conn->set_charset("utf8mb4");
        return $this->conn;
    }
    
    public function getConnection() {
        return $this->connect();
    }
}
?>
