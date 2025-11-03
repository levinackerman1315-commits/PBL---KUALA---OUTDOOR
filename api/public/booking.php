<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

try {
    $database = new Database();
    $pdo = $database->getConnection();

    if (!$pdo) {
        throw new Exception("Database connection failed");
    }

    $method = $_SERVER['REQUEST_METHOD'];

    // POST: Create new booking
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        // Validasi input
        if (
            empty($input['customer_name']) ||
            empty($input['equipment_items']) ||
            empty($input['start_date']) ||
            empty($input['end_date'])
        ) {
            throw new Exception("Data booking tidak lengkap");
        }

        $customer_name = $input['customer_name'];
        $customer_phone = $input['customer_phone'] ?? null;
        $customer_email = $input['customer_email'] ?? null;
        $customer_identity_number = $input['customer_identity_number'] ?? null;
        $customer_id = $input['customer_id'] ?? null;
        $equipment_items = $input['equipment_items'];
        $start_date = $input['start_date'];
        $end_date = $input['end_date'];
        $notes = $input['notes'] ?? '';

        // Validasi tanggal minimal besok
        $tomorrow = new DateTime('tomorrow');
        $bookingStart = new DateTime($start_date);
        if ($bookingStart < $tomorrow) {
            throw new Exception("Tanggal pengambilan minimal besok, tidak bisa hari ini!");
        }

        // Hitung durasi
        $start = new DateTime($start_date);
        $end = new DateTime($end_date);
        $duration = $start->diff($end)->days;
        if ($duration <= 0) $duration = 1;

        // Mulai transaksi
        $pdo->beginTransaction();

        try {
            // Hitung total harga
            $total_price = 0;
            foreach ($equipment_items as $item) {
                $stmt = $pdo->prepare("SELECT price_per_day FROM equipment WHERE equipment_id = ?");
                $stmt->execute([$item['equipment_id']]);
                $equipment = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$equipment) {
                    throw new Exception("Equipment ID {$item['equipment_id']} tidak ditemukan");
                }

                $total_price += $equipment['price_per_day'] * $item['quantity'] * $duration;
            }

            // Generate booking code
            $booking_code = "KO-" . date('Ymd') . "-" . str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT);

            // Insert booking
            $query = "INSERT INTO bookings (
                customer_name, customer_phone, customer_email, customer_identity_number,
                customer_id, booking_code, start_date, end_date,
                estimated_duration, total_estimated_cost, status, payment_status, notes, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'unpaid', ?, NOW())";

            $stmt = $pdo->prepare($query);
            $stmt->execute([
                $customer_name,
                $customer_phone,
                $customer_email,
                $customer_identity_number,
                $customer_id,
                $booking_code,
                $start_date,
                $end_date,
                $duration,
                $total_price,
                $notes
            ]);

            $booking_id = $pdo->lastInsertId();

            // Insert booking items
            foreach ($equipment_items as $item) {
                $stmt = $pdo->prepare("SELECT price_per_day FROM equipment WHERE equipment_id = ?");
                $stmt->execute([$item['equipment_id']]);
                $equipment = $stmt->fetch(PDO::FETCH_ASSOC);

                $subtotal = $equipment['price_per_day'] * $item['quantity'] * $duration;

                $stmt = $pdo->prepare("
                    INSERT INTO booking_items (booking_id, equipment_id, quantity, price_per_day, subtotal)
                    VALUES (?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $booking_id,
                    $item['equipment_id'],
                    $item['quantity'],
                    $equipment['price_per_day'],
                    $subtotal
                ]);
            }

            $pdo->commit();

            http_response_code(200);
            echo json_encode([
                "success" => true,
                "message" => "Booking berhasil dibuat",
                "booking_id" => $booking_id,
                "booking_code" => $booking_code,
                "total_price" => $total_price
            ]);
        } catch (Exception $e) {
            $pdo->rollBack();
            throw $e;
        }
        exit;
    }

    // GET: Ambil detail booking atau riwayat
    if ($method === 'GET') {
        $booking_id = $_GET['id'] ?? 0;
        $customer_id = $_GET['customer_id'] ?? 0;

        if ($booking_id) {
            // Detail booking
            $stmt = $pdo->prepare("
                SELECT b.*, c.name as customer_name, c.phone, c.email
                FROM bookings b
                LEFT JOIN customers c ON b.customer_id = c.customer_id
                WHERE b.booking_id = ?
            ");
            $stmt->execute([$booking_id]);
            $booking = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$booking) {
                throw new Exception("Booking tidak ditemukan");
            }

            $stmt = $pdo->prepare("
                SELECT bi.*, e.name as equipment_name, e.code, e.category
                FROM booking_items bi
                JOIN equipment e ON bi.equipment_id = e.equipment_id
                WHERE bi.booking_id = ?
            ");
            $stmt->execute([$booking_id]);
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $booking['items'] = $items;

            echo json_encode(["success" => true, "booking" => $booking]);
        } elseif ($customer_id) {
            // Riwayat booking
            $stmt = $pdo->prepare("
                SELECT b.*, COUNT(bi.booking_item_id) as item_count
                FROM bookings b
                LEFT JOIN booking_items bi ON b.booking_id = bi.booking_id
                WHERE b.customer_id = ?
                GROUP BY b.booking_id
                ORDER BY b.created_at DESC
            ");
            $stmt->execute([$customer_id]);
            $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(["success" => true, "bookings" => $bookings]);
        } else {
            throw new Exception("Parameter tidak valid");
        }
        exit;
    }

    // PUT: Update status booking
    if ($method === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        $booking_id = $input['booking_id'] ?? 0;
        $action = $input['action'] ?? '';

        if (!$booking_id || !$action) {
            throw new Exception("Booking ID dan action diperlukan");
        }

        $pdo->beginTransaction();
        try {
            switch ($action) {
                case 'confirm_payment':
                    $stmt = $pdo->prepare("UPDATE bookings SET status = 'paid', payment_date = NOW() WHERE booking_id = ?");
                    $stmt->execute([$booking_id]);
                    $message = "Pembayaran dikonfirmasi";
                    break;

                case 'handover':
                    $stmt = $pdo->prepare("UPDATE bookings SET status = 'active', handover_date = NOW() WHERE booking_id = ?");
                    $stmt->execute([$booking_id]);

                    $stmt = $pdo->prepare("SELECT equipment_id, quantity FROM booking_items WHERE booking_id = ?");
                    $stmt->execute([$booking_id]);
                    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    foreach ($items as $item) {
                        $stmt = $pdo->prepare("
                            UPDATE equipment 
                            SET available_stock = available_stock - ?, rented_stock = rented_stock + ?
                            WHERE equipment_id = ? AND available_stock >= ?
                        ");
                        $stmt->execute([
                            $item['quantity'],
                            $item['quantity'],
                            $item['equipment_id'],
                            $item['quantity']
                        ]);

                        if ($stmt->rowCount() == 0) {
                            throw new Exception("Stok tidak cukup untuk serah terima");
                        }
                    }
                    $message = "Serah terima berhasil";
                    break;

                case 'return':
                    $stmt = $pdo->prepare("UPDATE bookings SET status = 'completed', return_date = NOW() WHERE booking_id = ?");
                    $stmt->execute([$booking_id]);

                    $stmt = $pdo->prepare("SELECT equipment_id, quantity FROM booking_items WHERE booking_id = ?");
                    $stmt->execute([$booking_id]);
                    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    foreach ($items as $item) {
                        $stmt = $pdo->prepare("
                            UPDATE equipment 
                            SET available_stock = available_stock + ?, rented_stock = rented_stock - ?
                            WHERE equipment_id = ?
                        ");
                        $stmt->execute([
                            $item['quantity'],
                            $item['quantity'],
                            $item['equipment_id']
                        ]);
                    }
                    $message = "Pengembalian berhasil";
                    break;

                case 'cancel':
                    $stmt = $pdo->prepare("UPDATE bookings SET status = 'cancelled' WHERE booking_id = ?");
                    $stmt->execute([$booking_id]);
                    $message = "Booking dibatalkan";
                    break;

                default:
                    throw new Exception("Action tidak valid");
            }

            $pdo->commit();
            echo json_encode(["success" => true, "message" => $message]);
        } catch (Exception $e) {
            $pdo->rollBack();
            throw $e;
        }
        exit;
    }

    throw new Exception("Method not allowed");

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>