<?php
// filepath: c:\xampp\htdocs\PBL - KELANA OUTDOOR\api\models\Booking.php

class Booking {
    private $conn;
    private $table_name = "bookings";

    public $booking_id;
    public $customer_id;
    public $booking_code;
    public $start_date;
    public $end_date;
    public $estimated_duration;
    public $total_estimated_cost;
    public $actual_duration;
    public $total_actual_cost;
    public $compensation_fee;
    public $status;
    public $payment_status;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create new booking
    public function create() {
        // Generate booking code
        $this->booking_code = 'BK' . date('Ymd') . sprintf('%04d', rand(1, 9999));

        $query = "INSERT INTO " . $this->table_name . " 
                SET customer_id=:customer_id, booking_code=:booking_code, 
                    start_date=:start_date, end_date=:end_date, 
                    estimated_duration=:estimated_duration, 
                    total_estimated_cost=:total_estimated_cost";

        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":customer_id", $this->customer_id);
        $stmt->bindParam(":booking_code", $this->booking_code);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":end_date", $this->end_date);
        $stmt->bindParam(":estimated_duration", $this->estimated_duration);
        $stmt->bindParam(":total_estimated_cost", $this->total_estimated_cost);

        if($stmt->execute()) {
            $this->booking_id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    // Get customer bookings
    public function readByCustomer() {
        $query = "SELECT b.*, 
                         GROUP_CONCAT(
                             CONCAT(e.name, ' (', bi.quantity, 'x)')
                             SEPARATOR ', '
                         ) as items
                 FROM " . $this->table_name . " b
                 LEFT JOIN booking_items bi ON b.booking_id = bi.booking_id
                 LEFT JOIN equipment e ON bi.equipment_id = e.equipment_id
                 WHERE b.customer_id = ?
                 GROUP BY b.booking_id
                 ORDER BY b.created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->customer_id);
        $stmt->execute();
        return $stmt;
    }

    // Get single booking
    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE booking_id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->booking_id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->customer_id = $row['customer_id'];
            $this->booking_code = $row['booking_code'];
            $this->start_date = $row['start_date'];
            $this->end_date = $row['end_date'];
            $this->estimated_duration = $row['estimated_duration'];
            $this->total_estimated_cost = $row['total_estimated_cost'];
            $this->status = $row['status'];
            $this->payment_status = $row['payment_status'];
            $this->created_at = $row['created_at'];
            return true;
        }
        return false;
    }
}
?>