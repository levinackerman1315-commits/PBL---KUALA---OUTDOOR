<?php
// filepath: c:\xampp\htdocs\PBL - KELANA OUTDOOR\api\equipment.php

// Set headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Include dependencies
include_once __DIR__ . '/config/database.php';
include_once __DIR__ . '/models/Equipment.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if (!$db) {
        throw new Exception("Database connection failed");
    }
    
    $equipment = new Equipment($db);

    // Get query parameters
    $action = isset($_GET['action']) ? $_GET['action'] : 'list';
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $category = isset($_GET['category']) ? $_GET['category'] : null;

    switch ($action) {
        case 'list':
            // Get all equipment
            $stmt = $equipment->read();
            $num = $stmt->rowCount();

            if($num > 0) {
                $equipment_arr = array();
                $equipment_arr["data"] = array();

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $equipment_item = array(
                        "equipment_id" => (int)$equipment_id,
                        "name" => $name,
                        "code" => $code,
                        "description" => $description,
                        "category" => $category,
                        "size_capacity" => $size_capacity,
                        "dimensions" => $dimensions,
                        "weight" => $weight ? (float)$weight : null,
                        "material" => $material,
                        "stock_quantity" => (int)$stock_quantity,
                        "price_per_day" => (float)$price_per_day,
                        "condition" => $condition,
                        "equipment_type" => $equipment_type,
                        "image_url" => $image_url,
                        "created_at" => $created_at
                    );
                    array_push($equipment_arr["data"], $equipment_item);
                }

                $equipment_arr["count"] = $num;
                $equipment_arr["status"] = "success";
                echo json_encode($equipment_arr);
            } else {
                echo json_encode(array(
                    "message" => "No equipment found.",
                    "data" => [],
                    "count" => 0,
                    "status" => "success"
                ));
            }
            break;

        case 'detail':
            // Get single equipment
            if (!$id) {
                http_response_code(400);
                echo json_encode(array("message" => "Equipment ID required", "status" => "error"));
                break;
            }

            $equipment->equipment_id = $id;
            if($equipment->readOne()) {
                $equipment_arr = array(
                    "equipment_id" => (int)$id,
                    "name" => $equipment->name,
                    "code" => $equipment->code,
                    "description" => $equipment->description,
                    "category" => $equipment->category,
                    "size_capacity" => $equipment->size_capacity,
                    "dimensions" => $equipment->dimensions,
                    "weight" => $equipment->weight ? (float)$equipment->weight : null,
                    "material" => $equipment->material,
                    "stock_quantity" => (int)$equipment->stock_quantity,
                    "price_per_day" => (float)$equipment->price_per_day,
                    "condition" => $equipment->condition,
                    "equipment_type" => $equipment->equipment_type,
                    "image_url" => $equipment->image_url,
                    "created_at" => $equipment->created_at,
                    "status" => "success"
                );
                echo json_encode($equipment_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Equipment not found", "status" => "error"));
            }
            break;

        case 'categories':
            // Get categories
            $stmt = $equipment->getCategories();
            $num = $stmt->rowCount();

            if($num > 0) {
                $categories_arr = array();
                $categories_arr["data"] = array();

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    array_push($categories_arr["data"], $row['category']);
                }

                $categories_arr["count"] = $num;
                $categories_arr["status"] = "success";
                echo json_encode($categories_arr);
            } else {
                echo json_encode(array(
                    "message" => "No categories found.",
                    "data" => [],
                    "count" => 0,
                    "status" => "success"
                ));
            }
            break;

        case 'by_category':
            // Get equipment by category
            if (!$category) {
                http_response_code(400);
                echo json_encode(array("message" => "Category required", "status" => "error"));
                break;
            }

            $stmt = $equipment->readByCategory($category);
            $num = $stmt->rowCount();

            if($num > 0) {
                $equipment_arr = array();
                $equipment_arr["data"] = array();

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $equipment_item = array(
                        "equipment_id" => (int)$equipment_id,
                        "name" => $name,
                        "code" => $code,
                        "description" => $description,
                        "category" => $category,
                        "size_capacity" => $size_capacity,
                        "price_per_day" => (float)$price_per_day,
                        "stock_quantity" => (int)$stock_quantity,
                        "image_url" => $image_url
                    );
                    array_push($equipment_arr["data"], $equipment_item);
                }

                $equipment_arr["category"] = $category;
                $equipment_arr["count"] = $num;
                $equipment_arr["status"] = "success";
                echo json_encode($equipment_arr);
            } else {
                echo json_encode(array(
                    "message" => "No equipment found in category: " . $category,
                    "category" => $category,
                    "data" => [],
                    "count" => 0,
                    "status" => "success"
                ));
            }
            break;

        default:
            http_response_code(400);
            echo json_encode(array("message" => "Invalid action. Available: list, detail, categories, by_category", "status" => "error"));
            break;
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Server error: " . $e->getMessage(), "status" => "error"));
}
?>