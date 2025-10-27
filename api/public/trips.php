<?php
// filepath: api/public/trips.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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

if($method === 'GET') {
    if(isset($_GET['id'])) {
        // Get single trip
        $trip->trip_id = $_GET['id'];
        if($trip->readOne()) {
            $trip_arr = array(
                "id" => $trip->trip_id,
                "title" => $trip->title,
                "location" => $trip->location,
                "mapUrl" => $trip->map_url,
                "meetingPoint" => array(
                    "name" => $trip->meeting_point_name,
                    "address" => $trip->meeting_point_address,
                    "mapUrl" => $trip->meeting_point_map_url
                ),
                "startDate" => $trip->start_date,
                "startTime" => $trip->start_time,
                "durationDays" => (int)$trip->duration_days,
                "remainingQuota" => (int)$trip->remaining_quota,
                "totalQuota" => (int)$trip->total_quota,
                "difficulty" => $trip->difficulty,
                "category" => $trip->category,
                "shortDescription" => $trip->short_description,
                "itinerary" => json_decode($trip->itinerary),
                "coverImage" => $trip->cover_image,
                "images" => json_decode($trip->images),
                "requiredGear" => json_decode($trip->required_gear),
                "rules" => json_decode($trip->rules),
                "searchTags" => json_decode($trip->search_tags),
                "contact" => array(
                    "name" => $trip->contact_name,
                    "whatsapp" => $trip->contact_whatsapp,
                    "role" => $trip->contact_role
                )
            );
            http_response_code(200);
            echo json_encode($trip_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Trip not found"));
        }
    } else if(isset($_GET['search'])) {
        // Search trips
        $keyword = $_GET['search'];
        $stmt = $trip->search($keyword);
        $num = $stmt->rowCount();

        if($num > 0) {
            $trips_arr = array();
            $trips_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $trip_item = array(
                    "id" => $trip_id,
                    "title" => $title,
                    "location" => $location,
                    "startDate" => $start_date,
                    "startTime" => $start_time,
                    "durationDays" => (int)$duration_days,
                    "remainingQuota" => (int)$remaining_quota,
                    "totalQuota" => (int)$total_quota,
                    "difficulty" => $difficulty,
                    "category" => $category,
                    "shortDescription" => $short_description,
                    "coverImage" => $cover_image
                );
                array_push($trips_arr["records"], $trip_item);
            }

            http_response_code(200);
            echo json_encode($trips_arr);
        } else {
            http_response_code(200);
            echo json_encode(array("records" => array()));
        }
    } else if(isset($_GET['category'])) {
        // Get trips by category
        $category = $_GET['category'];
        $stmt = $trip->readByCategory($category);
        $num = $stmt->rowCount();

        if($num > 0) {
            $trips_arr = array();
            $trips_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $trip_item = array(
                    "id" => $trip_id,
                    "title" => $title,
                    "location" => $location,
                    "startDate" => $start_date,
                    "startTime" => $start_time,
                    "durationDays" => (int)$duration_days,
                    "remainingQuota" => (int)$remaining_quota,
                    "totalQuota" => (int)$total_quota,
                    "difficulty" => $difficulty,
                    "category" => $category,
                    "shortDescription" => $short_description,
                    "coverImage" => $cover_image,
                    "searchTags" => json_decode($search_tags)
                );
                array_push($trips_arr["records"], $trip_item);
            }

            http_response_code(200);
            echo json_encode($trips_arr);
        } else {
            http_response_code(200);
            echo json_encode(array("records" => array()));
        }
    } else {
        // Get all active trips
        $stmt = $trip->read();
        $num = $stmt->rowCount();

        if($num > 0) {
            $trips_arr = array();
            $trips_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $trip_item = array(
                    "id" => $trip_id,
                    "title" => $title,
                    "location" => $location,
                    "mapUrl" => $map_url,
                    "meetingPoint" => array(
                        "name" => $meeting_point_name,
                        "address" => $meeting_point_address,
                        "mapUrl" => $meeting_point_map_url
                    ),
                    "startDate" => $start_date,
                    "startTime" => $start_time,
                    "durationDays" => (int)$duration_days,
                    "remainingQuota" => (int)$remaining_quota,
                    "totalQuota" => (int)$total_quota,
                    "difficulty" => $difficulty,
                    "category" => $category,
                    "shortDescription" => $short_description,
                    "itinerary" => json_decode($itinerary),
                    "coverImage" => $cover_image,
                    "images" => json_decode($images),
                    "requiredGear" => json_decode($required_gear),
                    "rules" => json_decode($rules),
                    "searchTags" => json_decode($search_tags),
                    "contact" => array(
                        "name" => $contact_name,
                        "whatsapp" => $contact_whatsapp,
                        "role" => $contact_role
                    )
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
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
