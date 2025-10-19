<?php
// filepath: c:\xampp\htdocs\PBL - KELANA OUTDOOR\api\models\Customer.php

class Customer {
    private $conn;
    private $table_name = "customers";

    public $customer_id;
    public $name;
    public $phone;
    public $email;
    public $identity_card_number;
    public $emergency_contact;
    public $password_hash;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Register new customer
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                SET name=:name, phone=:phone, email=:email, 
                    identity_card_number=:identity_card_number, 
                    emergency_contact=:emergency_contact, 
                    password_hash=:password_hash";

        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->identity_card_number = htmlspecialchars(strip_tags($this->identity_card_number));
        $this->emergency_contact = htmlspecialchars(strip_tags($this->emergency_contact));

        // Hash password
        $this->password_hash = password_hash($this->password_hash, PASSWORD_DEFAULT);

        // Bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":identity_card_number", $this->identity_card_number);
        $stmt->bindParam(":emergency_contact", $this->emergency_contact);
        $stmt->bindParam(":password_hash", $this->password_hash);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Login customer
    public function login() {
        $query = "SELECT customer_id, name, phone, email, password_hash 
                 FROM " . $this->table_name . " 
                 WHERE email = ? OR phone = ? 
                 LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->email);
        $stmt->bindParam(2, $this->phone);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row && password_verify($this->password_hash, $row['password_hash'])) {
            $this->customer_id = $row['customer_id'];
            $this->name = $row['name'];
            $this->phone = $row['phone'];
            $this->email = $row['email'];
            return true;
        }
        return false;
    }

    // Get customer profile
    public function readOne() {
        $query = "SELECT customer_id, name, phone, email, identity_card_number, emergency_contact, created_at
                 FROM " . $this->table_name . " 
                 WHERE customer_id = ? 
                 LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->customer_id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->name = $row['name'];
            $this->phone = $row['phone'];
            $this->email = $row['email'];
            $this->identity_card_number = $row['identity_card_number'];
            $this->emergency_contact = $row['emergency_contact'];
            $this->created_at = $row['created_at'];
            return true;
        }
        return false;
    }

    // Check if email exists
    public function emailExists() {
        $query = "SELECT customer_id FROM " . $this->table_name . " WHERE email = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->email);
        $stmt->execute();
        
        if($stmt->rowCount() > 0) {
            return true;
        }
        return false;
    }
}
?>