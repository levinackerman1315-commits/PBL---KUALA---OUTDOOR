<?php
// filepath: api/admin/merchandise.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
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

switch($method) {
    case 'GET':
        // Get all merchandise (including inactive for admin)
        if(isset($_GET['id'])) {
            // Get single merchandise
            $merchandise->merchandise_id = $_GET['id'];
            if($merchandise->readOne()) {
                $merch_arr = array(
                    "merchandise_id" => $merchandise->merchandise_id,
                    "name" => $merchandise->name,
                    "color" => $merchandise->color,
                    "color_hex" => $merchandise->color_hex,
                    "price" => (int)$merchandise->price,
                    "stock" => (int)$merchandise->stock,
                    "images" => json_decode($merchandise->images),
                    "sizes" => json_decode($merchandise->sizes),
                    "material" => $merchandise->material,
                    "weight" => $merchandise->weight,
                    "description" => $merchandise->description,
                    "features" => json_decode($merchandise->features),
                    "status" => $merchandise->status,
                    "created_at" => $merchandise->created_at,
                    "updated_at" => $merchandise->updated_at
                );
                http_response_code(200);
                echo json_encode($merch_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Merchandise not found"));
            }
        } else {
            // Get all merchandise
            $stmt = $merchandise->readAll();
            $num = $stmt->rowCount();

            if($num > 0) {
                $merch_arr = array();
                $merch_arr["records"] = array();

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $merch_item = array(
                        "merchandise_id" => $merchandise_id,
                        "name" => $name,
                        "color" => $color,
                        "color_hex" => $color_hex,
                        "price" => (int)$price,
                        "stock" => (int)$stock,
                        "images" => json_decode($images),
                        "sizes" => json_decode($sizes),
                        "material" => $material,
                        "status" => $status,
                        "created_at" => $created_at
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
        break;

    case 'POST':
        // Create new merchandise
        $data = json_decode(file_get_contents("php://input"));

        if(
            !empty($data->name) &&
            !empty($data->color) &&
            !empty($data->price)
        ) {
            $merchandise->name = $data->name;
            $merchandise->color = $data->color;
            $merchandise->color_hex = $data->color_hex ?? '#000000';
            $merchandise->price = $data->price;
            $merchandise->stock = $data->stock ?? 0;
            $merchandise->images = json_encode($data->images ?? []);
            $merchandise->sizes = json_encode($data->sizes ?? []);
            $merchandise->material = $data->material ?? '';
            $merchandise->weight = $data->weight ?? '';
            $merchandise->description = $data->description ?? '';
            $merchandise->features = json_encode($data->features ?? []);
            $merchandise->status = $data->status ?? 'active';

            if($merchandise->create()) {
                http_response_code(201);
                echo json_encode(array("message" => "Merchandise was created successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create merchandise."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create merchandise. Data is incomplete."));
        }
        break;

    case 'PUT':
        // Update merchandise
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->merchandise_id)) {
            $merchandise->merchandise_id = $data->merchandise_id;
            $merchandise->name = $data->name;
            $merchandise->color = $data->color;
            $merchandise->color_hex = $data->color_hex ?? '#000000';
            $merchandise->price = $data->price;
            $merchandise->stock = $data->stock ?? 0;
            $merchandise->images = json_encode($data->images ?? []);
            $merchandise->sizes = json_encode($data->sizes ?? []);
            $merchandise->material = $data->material ?? '';
            $merchandise->weight = $data->weight ?? '';
            $merchandise->description = $data->description ?? '';
            $merchandise->features = json_encode($data->features ?? []);
            $merchandise->status = $data->status ?? 'active';

            if($merchandise->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "Merchandise was updated successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update merchandise."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update merchandise. Data is incomplete."));
        }
        break;

    case 'DELETE':
        // Delete merchandise
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->merchandise_id)) {
            $merchandise->merchandise_id = $data->merchandise_id;

            if($merchandise->delete()) {
                http_response_code(200);
                echo json_encode(array("message" => "Merchandise was deleted successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete merchandise."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete merchandise. Data is incomplete."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
