<?php
// filepath: api/controllers/TripController.php

require_once '../config/database.php';
require_once '../models/Trip.php';

class TripController {
    private $db;
    private $trip;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->trip = new Trip($this->db);
    }

    // Get all active trips
    public function getTrips() {
        $stmt = $this->trip->read();
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
                    "map_url" => $map_url,
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
                    ),
                    "status" => $status
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

    // Get single trip
    public function getTrip($id) {
        $this->trip->trip_id = $id;

        if($this->trip->readOne()) {
            $trip_arr = array(
                "trip_id" => $this->trip->trip_id,
                "title" => $this->trip->title,
                "location" => $this->trip->location,
                "map_url" => $this->trip->map_url,
                "meetingPoint" => array(
                    "name" => $this->trip->meeting_point_name,
                    "address" => $this->trip->meeting_point_address,
                    "mapUrl" => $this->trip->meeting_point_map_url
                ),
                "startDate" => $this->trip->start_date,
                "startTime" => $this->trip->start_time,
                "durationDays" => (int)$this->trip->duration_days,
                "remainingQuota" => (int)$this->trip->remaining_quota,
                "totalQuota" => (int)$this->trip->total_quota,
                "difficulty" => $this->trip->difficulty,
                "category" => $this->trip->category,
                "shortDescription" => $this->trip->short_description,
                "itinerary" => json_decode($this->trip->itinerary),
                "coverImage" => $this->trip->cover_image,
                "images" => json_decode($this->trip->images),
                "requiredGear" => json_decode($this->trip->required_gear),
                "rules" => json_decode($this->trip->rules),
                "searchTags" => json_decode($this->trip->search_tags),
                "contact" => array(
                    "name" => $this->trip->contact_name,
                    "whatsapp" => $this->trip->contact_whatsapp,
                    "role" => $this->trip->contact_role
                ),
                "status" => $this->trip->status
            );

            http_response_code(200);
            echo json_encode($trip_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Trip not found."));
        }
    }

    // Search trips
    public function searchTrips($keyword) {
        $stmt = $this->trip->search($keyword);
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
                    "startDate" => $start_date,
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
    }
}
?>
