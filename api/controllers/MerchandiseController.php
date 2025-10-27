<?php
// filepath: api/controllers/MerchandiseController.php

require_once '../config/database.php';
require_once '../models/Merchandise.php';

class MerchandiseController {
    private $db;
    private $merchandise;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->merchandise = new Merchandise($this->db);
    }

    // Get all active merchandise
    public function getMerchandise() {
        $stmt = $this->merchandise->read();
        $num = $stmt->rowCount();

        if($num > 0) {
            $merchandise_arr = array();
            $merchandise_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $merch_item = array(
                    "merchandise_id" => $merchandise_id,
                    "name" => $name,
                    "color" => $color,
                    "colorHex" => $color_hex,
                    "price" => (int)$price,
                    "stock" => (int)$stock,
                    "images" => json_decode($images),
                    "sizes" => json_decode($sizes),
                    "material" => $material,
                    "weight" => $weight,
                    "description" => $description,
                    "features" => json_decode($features),
                    "status" => $status
                );
                array_push($merchandise_arr["records"], $merch_item);
            }

            http_response_code(200);
            echo json_encode($merchandise_arr);
        } else {
            http_response_code(200);
            echo json_encode(array("records" => array()));
        }
    }

    // Get single merchandise
    public function getMerchandiseItem($id) {
        $this->merchandise->merchandise_id = $id;

        if($this->merchandise->readOne()) {
            $merch_arr = array(
                "merchandise_id" => $this->merchandise->merchandise_id,
                "name" => $this->merchandise->name,
                "color" => $this->merchandise->color,
                "colorHex" => $this->merchandise->color_hex,
                "price" => (int)$this->merchandise->price,
                "stock" => (int)$this->merchandise->stock,
                "images" => json_decode($this->merchandise->images),
                "sizes" => json_decode($this->merchandise->sizes),
                "material" => $this->merchandise->material,
                "weight" => $this->merchandise->weight,
                "description" => $this->merchandise->description,
                "features" => json_decode($this->merchandise->features),
                "status" => $this->merchandise->status
            );

            http_response_code(200);
            echo json_encode($merch_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Merchandise not found."));
        }
    }

    // Search merchandise
    public function searchMerchandise($keyword) {
        $stmt = $this->merchandise->search($keyword);
        $num = $stmt->rowCount();

        if($num > 0) {
            $merchandise_arr = array();
            $merchandise_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $merch_item = array(
                    "merchandise_id" => $merchandise_id,
                    "name" => $name,
                    "color" => $color,
                    "colorHex" => $color_hex,
                    "price" => (int)$price,
                    "stock" => (int)$stock,
                    "images" => json_decode($images),
                    "description" => $description
                );
                array_push($merchandise_arr["records"], $merch_item);
            }

            http_response_code(200);
            echo json_encode($merchandise_arr);
        } else {
            http_response_code(200);
            echo json_encode(array("records" => array()));
        }
    }
}
?>
