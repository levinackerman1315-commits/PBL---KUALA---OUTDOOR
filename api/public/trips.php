<?php
// Endpoint untuk user (frontend) mengambil data trip
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/database.php';
require_once '../models/Trip.php';

$database = new Database();
$db = $database->getConnection();
$trip = new Trip($db);

$method = $_SERVER['REQUEST_METHOD'];

if($method == 'GET') {
    if(isset($_GET['id'])) {
        // Ambil 1 trip berdasarkan ID
        $trip->trip_id = $_GET['id'];
        if($trip->readOne() && $trip->status === 'active') {
            $trip_arr = array(
                "trip_id" => $trip->trip_id,
                "title" => $trip->title,
                "location" => $trip->location,
                "start_date" => $trip->start_date,
                "start_time" => $trip->start_time,
                "duration_days" => (int)$trip->duration_days,
                "remaining_quota" => (int)$trip->remaining_quota,
                "total_quota" => (int)$trip->total_quota,
                "difficulty" => $trip->difficulty,
                "category" => $trip->category,
                "short_description" => $trip->short_description,
                "cover_image" => $trip->cover_image,
                "images" => json_decode($trip->images),
                "itinerary" => json_decode($trip->itinerary),
                "required_gear" => json_decode($trip->required_gear),
                "rules" => json_decode($trip->rules),
                "contact_name" => $trip->contact_name,
                "contact_whatsapp" => $trip->contact_whatsapp,
                "contact_role" => $trip->contact_role,
                "map_url" => $trip->map_url,
                "meeting_point_name" => $trip->meeting_point_name,
                "meeting_point_address" => $trip->meeting_point_address,
                "meeting_point_map_url" => $trip->meeting_point_map_url
            );
            echo json_encode($trip_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Trip tidak ditemukan"));
        }
    } else {
        // Ambil semua trip yang aktif
        $stmt = $trip->read();
        $trips_arr = array("records" => array());

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
                "short_description" => $short_description,
                "cover_image" => $cover_image,
                "images" => json_decode($images),
                "search_tags" => json_decode($search_tags)
            );
            array_push($trips_arr["records"], $trip_item);
        }

        echo json_encode($trips_arr);
    }
}
?>