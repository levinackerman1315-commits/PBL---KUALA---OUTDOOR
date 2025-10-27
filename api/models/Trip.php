<?php
// filepath: api/models/Trip.php

class Trip {
    private $conn;
    private $table_name = "trips";

    public $trip_id;
    public $title;
    public $location;
    public $map_url;
    public $meeting_point_name;
    public $meeting_point_address;
    public $meeting_point_map_url;
    public $start_date;
    public $start_time;
    public $duration_days;
    public $remaining_quota;
    public $total_quota;
    public $difficulty;
    public $category;
    public $short_description;
    public $itinerary;
    public $cover_image;
    public $images;
    public $required_gear;
    public $rules;
    public $search_tags;
    public $contact_name;
    public $contact_whatsapp;
    public $contact_role;
    public $status;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all active trips
    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE status = 'active' 
                 ORDER BY start_date ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get all trips (for admin)
    public function readAll() {
        $query = "SELECT * FROM " . $this->table_name . " 
                 ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get trips by category
    public function readByCategory($category) {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE category = ? AND status = 'active' 
                 ORDER BY start_date ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $category);
        $stmt->execute();
        return $stmt;
    }

    // Get trips by difficulty
    public function readByDifficulty($difficulty) {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE difficulty = ? AND status = 'active' 
                 ORDER BY start_date ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $difficulty);
        $stmt->execute();
        return $stmt;
    }

    // Get single trip
    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE trip_id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->trip_id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->title = $row['title'];
            $this->location = $row['location'];
            $this->map_url = $row['map_url'];
            $this->meeting_point_name = $row['meeting_point_name'];
            $this->meeting_point_address = $row['meeting_point_address'];
            $this->meeting_point_map_url = $row['meeting_point_map_url'];
            $this->start_date = $row['start_date'];
            $this->start_time = $row['start_time'];
            $this->duration_days = $row['duration_days'];
            $this->remaining_quota = $row['remaining_quota'];
            $this->total_quota = $row['total_quota'];
            $this->difficulty = $row['difficulty'];
            $this->category = $row['category'];
            $this->short_description = $row['short_description'];
            $this->itinerary = $row['itinerary'];
            $this->cover_image = $row['cover_image'];
            $this->images = $row['images'];
            $this->required_gear = $row['required_gear'];
            $this->rules = $row['rules'];
            $this->search_tags = $row['search_tags'];
            $this->contact_name = $row['contact_name'];
            $this->contact_whatsapp = $row['contact_whatsapp'];
            $this->contact_role = $row['contact_role'];
            $this->status = $row['status'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }
        return false;
    }

    // Create trip
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    title = :title,
                    location = :location,
                    map_url = :map_url,
                    meeting_point_name = :meeting_point_name,
                    meeting_point_address = :meeting_point_address,
                    meeting_point_map_url = :meeting_point_map_url,
                    start_date = :start_date,
                    start_time = :start_time,
                    duration_days = :duration_days,
                    remaining_quota = :remaining_quota,
                    total_quota = :total_quota,
                    difficulty = :difficulty,
                    category = :category,
                    short_description = :short_description,
                    itinerary = :itinerary,
                    cover_image = :cover_image,
                    images = :images,
                    required_gear = :required_gear,
                    rules = :rules,
                    search_tags = :search_tags,
                    contact_name = :contact_name,
                    contact_whatsapp = :contact_whatsapp,
                    contact_role = :contact_role,
                    status = :status";

        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":map_url", $this->map_url);
        $stmt->bindParam(":meeting_point_name", $this->meeting_point_name);
        $stmt->bindParam(":meeting_point_address", $this->meeting_point_address);
        $stmt->bindParam(":meeting_point_map_url", $this->meeting_point_map_url);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":start_time", $this->start_time);
        $stmt->bindParam(":duration_days", $this->duration_days);
        $stmt->bindParam(":remaining_quota", $this->remaining_quota);
        $stmt->bindParam(":total_quota", $this->total_quota);
        $stmt->bindParam(":difficulty", $this->difficulty);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":short_description", $this->short_description);
        $stmt->bindParam(":itinerary", $this->itinerary);
        $stmt->bindParam(":cover_image", $this->cover_image);
        $stmt->bindParam(":images", $this->images);
        $stmt->bindParam(":required_gear", $this->required_gear);
        $stmt->bindParam(":rules", $this->rules);
        $stmt->bindParam(":search_tags", $this->search_tags);
        $stmt->bindParam(":contact_name", $this->contact_name);
        $stmt->bindParam(":contact_whatsapp", $this->contact_whatsapp);
        $stmt->bindParam(":contact_role", $this->contact_role);
        $stmt->bindParam(":status", $this->status);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Update trip
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                SET
                    title = :title,
                    location = :location,
                    map_url = :map_url,
                    meeting_point_name = :meeting_point_name,
                    meeting_point_address = :meeting_point_address,
                    meeting_point_map_url = :meeting_point_map_url,
                    start_date = :start_date,
                    start_time = :start_time,
                    duration_days = :duration_days,
                    remaining_quota = :remaining_quota,
                    total_quota = :total_quota,
                    difficulty = :difficulty,
                    category = :category,
                    short_description = :short_description,
                    itinerary = :itinerary,
                    cover_image = :cover_image,
                    images = :images,
                    required_gear = :required_gear,
                    rules = :rules,
                    search_tags = :search_tags,
                    contact_name = :contact_name,
                    contact_whatsapp = :contact_whatsapp,
                    contact_role = :contact_role,
                    status = :status,
                    updated_at = CURRENT_TIMESTAMP
                WHERE trip_id = :trip_id";

        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":map_url", $this->map_url);
        $stmt->bindParam(":meeting_point_name", $this->meeting_point_name);
        $stmt->bindParam(":meeting_point_address", $this->meeting_point_address);
        $stmt->bindParam(":meeting_point_map_url", $this->meeting_point_map_url);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":start_time", $this->start_time);
        $stmt->bindParam(":duration_days", $this->duration_days);
        $stmt->bindParam(":remaining_quota", $this->remaining_quota);
        $stmt->bindParam(":total_quota", $this->total_quota);
        $stmt->bindParam(":difficulty", $this->difficulty);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":short_description", $this->short_description);
        $stmt->bindParam(":itinerary", $this->itinerary);
        $stmt->bindParam(":cover_image", $this->cover_image);
        $stmt->bindParam(":images", $this->images);
        $stmt->bindParam(":required_gear", $this->required_gear);
        $stmt->bindParam(":rules", $this->rules);
        $stmt->bindParam(":search_tags", $this->search_tags);
        $stmt->bindParam(":contact_name", $this->contact_name);
        $stmt->bindParam(":contact_whatsapp", $this->contact_whatsapp);
        $stmt->bindParam(":contact_role", $this->contact_role);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":trip_id", $this->trip_id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Delete trip
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE trip_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->trip_id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Search trips
    public function search($keyword) {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE (title LIKE ? OR location LIKE ? OR short_description LIKE ? OR search_tags LIKE ?) 
                 AND status = 'active' 
                 ORDER BY start_date ASC";
        
        $stmt = $this->conn->prepare($query);
        $keyword = "%{$keyword}%";
        $stmt->bindParam(1, $keyword);
        $stmt->bindParam(2, $keyword);
        $stmt->bindParam(3, $keyword);
        $stmt->bindParam(4, $keyword);
        $stmt->execute();
        return $stmt;
    }

    // Update quota (when someone joins)
    public function updateQuota($participants) {
        $query = "UPDATE " . $this->table_name . " 
                 SET remaining_quota = remaining_quota - ? 
                 WHERE trip_id = ? AND remaining_quota >= ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $participants);
        $stmt->bindParam(2, $this->trip_id);
        $stmt->bindParam(3, $participants);

        if($stmt->execute() && $stmt->rowCount() > 0) {
            return true;
        }
        return false;
    }
}
?>
