<?php
// filepath: c:\xampp\htdocs\PBL - KELANA OUTDOOR\api\models\Equipment.php

class Equipment {
    private $conn;
    private $table_name = "equipment";

    public $equipment_id;
    public $name;
    public $code;
    public $description;
    public $category;
    public $size_capacity;
    public $dimensions;
    public $weight;
    public $material;
    public $stock_quantity;
    public $price_per_day;
    public $condition_item; // Updated field name
    public $equipment_type;
    public $image_url;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all equipment
    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE stock_quantity > 0 ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get equipment by category
    public function readByCategory($category) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE category = ? AND stock_quantity > 0 ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $category);
        $stmt->execute();
        return $stmt;
    }

    // Get single equipment
    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE equipment_id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->equipment_id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->name = $row['name'];
            $this->code = $row['code'];
            $this->description = $row['description'];
            $this->category = $row['category'];
            $this->size_capacity = $row['size_capacity'];
            $this->dimensions = $row['dimensions'];
            $this->weight = $row['weight'];
            $this->material = $row['material'];
            $this->stock_quantity = $row['stock_quantity'];
            $this->price_per_day = $row['price_per_day'];
            $this->condition_item = $row['condition_item']; // Updated
            $this->equipment_type = $row['equipment_type'];
            $this->image_url = $row['image_url'];
            $this->created_at = $row['created_at'];
            return true;
        }
        return false;
    }

    // Search equipment
    public function search($keyword) {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE (name LIKE ? OR description LIKE ? OR category LIKE ?) 
                 AND stock_quantity > 0 
                 ORDER BY created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $keyword = "%{$keyword}%";
        $stmt->bindParam(1, $keyword);
        $stmt->bindParam(2, $keyword);
        $stmt->bindParam(3, $keyword);
        $stmt->execute();
        return $stmt;
    }

    // Get categories
    public function getCategories() {
        $query = "SELECT DISTINCT category FROM " . $this->table_name . " WHERE stock_quantity > 0 ORDER BY category";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>