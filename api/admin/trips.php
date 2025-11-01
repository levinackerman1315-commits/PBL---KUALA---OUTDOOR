<?php
// filepath: api/admin/trips.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once '../config/database.php';
require_once '../models/Trip.php';

$database = new Database();
$db = $database->getConnection();
$trip = new Trip($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all trips (including inactive for admin)
        if(isset($_GET['id'])) {
            // Get single trip
            $trip->trip_id = $_GET['id'];
            if($trip->readOne()) {
                $trip_arr = array(
                    "trip_id" => $trip->trip_id,
                    "title" => $trip->title,
                    "location" => $trip->location,
                    "map_url" => $trip->map_url,
                    "meeting_point_name" => $trip->meeting_point_name,
                    "meeting_point_address" => $trip->meeting_point_address,
                    "meeting_point_map_url" => $trip->meeting_point_map_url,
                    "start_date" => $trip->start_date,
                    "start_time" => $trip->start_time,
                    "duration_days" => (int)$trip->duration_days,
                    "remaining_quota" => (int)$trip->remaining_quota,
                    "total_quota" => (int)$trip->total_quota,
                    "difficulty" => $trip->difficulty,
                    "category" => $trip->category,
                    "short_description" => $trip->short_description,
                    "itinerary" => json_decode($trip->itinerary),
                    "cover_image" => $trip->cover_image,
                    "images" => json_decode($trip->images),
                    "required_gear" => json_decode($trip->required_gear),
                    "rules" => json_decode($trip->rules),
                    "search_tags" => json_decode($trip->search_tags),
                    "contact_name" => $trip->contact_name,
                    "contact_whatsapp" => $trip->contact_whatsapp,
                    "contact_role" => $trip->contact_role,
                    "status" => $trip->status,
                    "created_at" => $trip->created_at,
                    "updated_at" => $trip->updated_at
                );
                http_response_code(200);
                echo json_encode($trip_arr);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Trip not found"));
            }
        } else {
            // Get all trips
            $stmt = $trip->readAll();
            $num = $stmt->rowCount();

            if($num > 0) {
                $trips_arr = array();
                $trips_arr["records"] = array();

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $trip_item = array(
                        "trip_id" => $trip_id,
                        "title" => $title,
                        "location" => $location,
                        "start_date" => $start_date,
                        "start_time" => $start_time,
                        "duration_days" => (int)$duration_days,
                        "remaining_quota" => (int)$remaining_quota,
                        "total_quota" => (int)$total_quota,
                        "difficulty" => $difficulty,
                        "category" => $category,
                        "cover_image" => $cover_image,
                        "status" => $status,
                        "created_at" => $created_at
                    );
                    array_push($trips_arr["records"], $trip_item);
                }

                http_response_code(200);
                echo json_encode($trips_arr);
            } else {
                http_response_code(200);
                echo json_encode(array("records" => array()));
            }
        }
        break;

    case 'POST':
        // Create new trip
        $data = json_decode(file_get_contents("php://input"));

        if(
            !empty($data->title) &&
            !empty($data->location) &&
            !empty($data->start_date) &&
            !empty($data->category)
        ) {
            $trip->title = $data->title;
            $trip->location = $data->location;
            $trip->map_url = $data->map_url ?? null;
            $trip->meeting_point_name = $data->meeting_point_name ?? '';
            $trip->meeting_point_address = $data->meeting_point_address ?? '';
            $trip->meeting_point_map_url = $data->meeting_point_map_url ?? null;
            $trip->start_date = $data->start_date;
            $trip->start_time = $data->start_time ?? null;
            $trip->duration_days = $data->duration_days ?? 1;
            $trip->remaining_quota = $data->remaining_quota ?? 0;
            $trip->total_quota = $data->total_quota ?? 0;
            $trip->difficulty = $data->difficulty ?? 'Mudah';
            $trip->category = $data->category;
            $trip->short_description = $data->short_description ?? '';
            $trip->itinerary = json_encode($data->itinerary ?? []);
            $trip->cover_image = $data->cover_image ?? '';
            $trip->images = json_encode($data->images ?? []);
            $trip->required_gear = json_encode($data->required_gear ?? []);
            $trip->rules = json_encode($data->rules ?? []);
            $trip->search_tags = json_encode($data->search_tags ?? []);
            $trip->contact_name = $data->contact_name ?? '';
            $trip->contact_whatsapp = $data->contact_whatsapp ?? '';
            $trip->contact_role = $data->contact_role ?? '';
            $trip->status = $data->status ?? 'active';

            if($trip->create()) {
                http_response_code(201);
                echo json_encode(array("message" => "Trip was created successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create trip."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create trip. Data is incomplete."));
        }
        break;

    case 'PUT':
        // Update trip
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->trip_id)) {
            $trip->trip_id = $data->trip_id;
            $trip->title = $data->title;
            $trip->location = $data->location;
            $trip->map_url = $data->map_url ?? null;
            $trip->meeting_point_name = $data->meeting_point_name ?? '';
            $trip->meeting_point_address = $data->meeting_point_address ?? '';
            $trip->meeting_point_map_url = $data->meeting_point_map_url ?? null;
            $trip->start_date = $data->start_date;
            $trip->start_time = $data->start_time ?? null;
            $trip->duration_days = $data->duration_days ?? 1;
            $trip->remaining_quota = $data->remaining_quota ?? 0;
            $trip->total_quota = $data->total_quota ?? 0;
            $trip->difficulty = $data->difficulty ?? 'Mudah';
            $trip->category = $data->category;
            $trip->short_description = $data->short_description ?? '';
            $trip->itinerary = json_encode($data->itinerary ?? []);
            $trip->cover_image = $data->cover_image ?? '';
            $trip->images = json_encode($data->images ?? []);
            $trip->required_gear = json_encode($data->required_gear ?? []);
            $trip->rules = json_encode($data->rules ?? []);
            $trip->search_tags = json_encode($data->search_tags ?? []);
            $trip->contact_name = $data->contact_name ?? '';
            $trip->contact_whatsapp = $data->contact_whatsapp ?? '';
            $trip->contact_role = $data->contact_role ?? '';
            $trip->status = $data->status ?? 'active';

            if($trip->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "Trip was updated successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update trip."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update trip. Data is incomplete."));
        }
        break;

    case 'DELETE':
        // Delete trip
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->trip_id)) {
            $trip->trip_id = $data->trip_id;

            if($trip->delete()) {
                http_response_code(200);
                echo json_encode(array("message" => "Trip was deleted successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete trip."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete trip. Data is incomplete."));
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>