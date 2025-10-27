<?php
// filepath: api/models/Merchandise.php

class Merchandise {
    private $conn;
    private $table_name = "merchandise";

    public $merchandise_id;
    public $name;
    public $color;
    public $color_hex;
    public $price;
    public $stock;
    public $images;
    public $sizes;
    public $material;
    public $weight;
    public $description;
    public $features;
    public $status;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all active merchandise
    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE status = 'active' 
                 ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get all merchandise (for admin)
    public function readAll() {
        $query = "SELECT * FROM " . $this->table_name . " 
                 ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get single merchandise
    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE merchandise_id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->merchandise_id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->name = $row['name'];
            $this->color = $row['color'];
            $this->color_hex = $row['color_hex'];
            $this->price = $row['price'];
            $this->stock = $row['stock'];
            $this->images = $row['images'];
            $this->sizes = $row['sizes'];
            $this->material = $row['material'];
            $this->weight = $row['weight'];
            $this->description = $row['description'];
            $this->features = $row['features'];
            $this->status = $row['status'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }
        return false;
    }

    // Create merchandise
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    name = :name,
                    color = :color,
                    color_hex = :color_hex,
                    price = :price,
                    stock = :stock,
                    images = :images,
                    sizes = :sizes,
                    material = :material,
                    weight = :weight,
                    description = :description,
                    features = :features,
                    status = :status";

        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":color", $this->color);
        $stmt->bindParam(":color_hex", $this->color_hex);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":stock", $this->stock);
        $stmt->bindParam(":images", $this->images);
        $stmt->bindParam(":sizes", $this->sizes);
        $stmt->bindParam(":material", $this->material);
        $stmt->bindParam(":weight", $this->weight);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":features", $this->features);
        $stmt->bindParam(":status", $this->status);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Update merchandise
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                SET
                    name = :name,
                    color = :color,
                    color_hex = :color_hex,
                    price = :price,
                    stock = :stock,
                    images = :images,
                    sizes = :sizes,
                    material = :material,
                    weight = :weight,
                    description = :description,
                    features = :features,
                    status = :status,
                    updated_at = CURRENT_TIMESTAMP
                WHERE merchandise_id = :merchandise_id";

        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":color", $this->color);
        $stmt->bindParam(":color_hex", $this->color_hex);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":stock", $this->stock);
        $stmt->bindParam(":images", $this->images);
        $stmt->bindParam(":sizes", $this->sizes);
        $stmt->bindParam(":material", $this->material);
        $stmt->bindParam(":weight", $this->weight);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":features", $this->features);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":merchandise_id", $this->merchandise_id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Delete merchandise
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE merchandise_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->merchandise_id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Update stock
    public function updateStock($quantity) {
        $query = "UPDATE " . $this->table_name . " 
                 SET stock = stock - ? 
                 WHERE merchandise_id = ? AND stock >= ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $quantity);
        $stmt->bindParam(2, $this->merchandise_id);
        $stmt->bindParam(3, $quantity);

        if($stmt->execute() && $stmt->rowCount() > 0) {
            return true;
        }
        return false;
    }

    // Search merchandise
    public function search($keyword) {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE (name LIKE ? OR color LIKE ? OR description LIKE ?) 
                 AND status = 'active' 
                 ORDER BY created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $keyword = "%{$keyword}%";
        $stmt->bindParam(1, $keyword);
        $stmt->bindParam(2, $keyword);
        $stmt->bindParam(3, $keyword);
        $stmt->execute();
        return $stmt;
    }
}
?>