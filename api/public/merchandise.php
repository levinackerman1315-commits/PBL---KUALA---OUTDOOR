<?php
// filepath: api/public/merchandise.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';
require_once '../models/Merchandise.php';

$database = new Database();
$db = $database->getConnection();
$merchandise = new Merchandise($db);

$method = $_SERVER['REQUEST_METHOD'];

if($method === 'GET') {
    if(isset($_GET['id'])) {
        // Get single merchandise
        $merchandise->merchandise_id = $_GET['id'];
        if($merchandise->readOne()) {
            $merch_arr = array(
                "id" => $merchandise->merchandise_id,
                "name" => $merchandise->name,
                "color" => $merchandise->color,
                "colorHex" => $merchandise->color_hex,
                "price" => (int)$merchandise->price,
                "stock" => (int)$merchandise->stock,
                "images" => json_decode($merchandise->images),
                "sizes" => json_decode($merchandise->sizes),
                "material" => $merchandise->material,
                "weight" => $merchandise->weight,
                "description" => $merchandise->description,
                "features" => json_decode($merchandise->features)
            );
            http_response_code(200);
            echo json_encode($merch_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Merchandise not found"));
        }
    } else if(isset($_GET['search'])) {
        // Search merchandise
        $keyword = $_GET['search'];
        $stmt = $merchandise->search($keyword);
        $num = $stmt->rowCount();

        if($num > 0) {
            $merch_arr = array();
            $merch_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $merch_item = array(
                    "id" => $merchandise_id,
                    "name" => $name,
                    "color" => $color,
                    "colorHex" => $color_hex,
                    "price" => (int)$price,
                    "stock" => (int)$stock,
                    "images" => json_decode($images),
                    "description" => $description
                );
                array_push($merch_arr["records"], $merch_item);
            }

            http_response_code(200);
            echo json_encode($merch_arr);
        } else {
            http_response_code(200);
            echo json_encode(array("records" => array()));
        }
    } else {
        // Get all active merchandise
        $stmt = $merchandise->read();
        $num = $stmt->rowCount();

        if($num > 0) {
            $merch_arr = array();
            $merch_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $merch_item = array(
                    "id" => $merchandise_id,
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
                    "features" => json_decode($features)
                );
                array_push($merch_arr["records"], $merch_item);
            }

            http_response_code(200);
            echo json_encode($merch_arr);
        } else {
            http_response_code(200);
            echo json_encode(array("records" => array()));
        }
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
