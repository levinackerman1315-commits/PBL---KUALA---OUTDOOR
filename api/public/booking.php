<?php
// API untuk booking management
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

try {
    $pdo = new PDO("mysql:host=localhost;dbname=kuala_outdoor", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    // POST: Create new booking
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $customer_id = $input['customer_id'] ?? 0;
        $equipment_items = $input['equipment_items'] ?? []; // Array of {equipment_id, quantity}
        $start_date = $input['start_date'] ?? '';
        $end_date = $input['end_date'] ?? '';
        $notes = $input['notes'] ?? '';
        
        if (!$customer_id || empty($equipment_items) || !$start_date || !$end_date) {
            throw new Exception("Data booking tidak lengkap");
        }
        
        // Validasi tanggal minimal besok
        $tomorrow = new DateTime('tomorrow');
        $bookingStartDate = new DateTime($start_date);
        
        if ($bookingStartDate < $tomorrow) {
            throw new Exception("Tanggal pengambilan minimal besok, tidak bisa hari ini!");
        }
        
        // Calculate duration
        $start = new DateTime($start_date);
        $end = new DateTime($end_date);
        $duration = $start->diff($end)->days;
        
        if ($duration <= 0) {
            throw new Exception("Durasi sewa minimal 1 hari");
        }
        
        // Start transaction
        $pdo->beginTransaction();
        
        try {
            // Calculate total price
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
            
            // Insert booking
            $stmt = $pdo->prepare("
                INSERT INTO bookings (
                    customer_id, 
                    start_date, 
                    end_date, 
                    duration_days, 
                    total_price, 
                    notes,
                    status,
                    booking_date
                ) VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())
            ");
            
            $stmt->execute([
                $customer_id,
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
                
                $stmt = $pdo->prepare("
                    INSERT INTO booking_items (
                        booking_id,
                        equipment_id,
                        quantity,
                        price_per_day,
                        subtotal
                    ) VALUES (?, ?, ?, ?, ?)
                ");
                
                $subtotal = $equipment['price_per_day'] * $item['quantity'] * $duration;
                
                $stmt->execute([
                    $booking_id,
                    $item['equipment_id'],
                    $item['quantity'],
                    $equipment['price_per_day'],
                    $subtotal
                ]);
            }
            
            $pdo->commit();
            
            echo json_encode([
                "success" => true,
                "message" => "Booking berhasil dibuat",
                "booking_id" => $booking_id,
                "total_price" => $total_price
            ]);
            
        } catch (Exception $e) {
            $pdo->rollBack();
            throw $e;
        }
        
        exit;
    }
    
    // GET: Get booking details
    if ($method === 'GET') {
        $booking_id = $_GET['id'] ?? 0;
        $customer_id = $_GET['customer_id'] ?? 0;
        
        if ($booking_id) {
            // Get specific booking
            $stmt = $pdo->prepare("
                SELECT 
                    b.*,
                    c.name as customer_name,
                    c.phone as customer_phone,
                    c.email as customer_email
                FROM bookings b
                JOIN customers c ON b.customer_id = c.customer_id
                WHERE b.booking_id = ?
            ");
            $stmt->execute([$booking_id]);
            $booking = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$booking) {
                throw new Exception("Booking tidak ditemukan");
            }
            
            // Get booking items
            $stmt = $pdo->prepare("
                SELECT 
                    bi.*,
                    e.name as equipment_name,
                    e.code as equipment_code,
                    e.category
                FROM booking_items bi
                JOIN equipment e ON bi.equipment_id = e.equipment_id
                WHERE bi.booking_id = ?
            ");
            $stmt->execute([$booking_id]);
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $booking['items'] = $items;
            
            echo json_encode([
                "success" => true,
                "booking" => $booking
            ]);
            
        } else if ($customer_id) {
            // Get all bookings for a customer
            $stmt = $pdo->prepare("
                SELECT 
                    b.*,
                    COUNT(bi.booking_item_id) as item_count
                FROM bookings b
                LEFT JOIN booking_items bi ON b.booking_id = bi.booking_id
                WHERE b.customer_id = ?
                GROUP BY b.booking_id
                ORDER BY b.booking_date DESC
            ");
            $stmt->execute([$customer_id]);
            $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode([
                "success" => true,
                "bookings" => $bookings
            ]);
            
        } else {
            throw new Exception("Parameter tidak valid");
        }
        
        exit;
    }
    
    // PUT: Update booking status
    if ($method === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $booking_id = $input['booking_id'] ?? 0;
        $status = $input['status'] ?? '';
        $action = $input['action'] ?? ''; // 'confirm_payment', 'handover', 'return', 'cancel'
        
        if (!$booking_id) {
            throw new Exception("Booking ID required");
        }
        
        // Get booking data
        $stmt = $pdo->prepare("SELECT * FROM bookings WHERE booking_id = ?");
        $stmt->execute([$booking_id]);
        $booking = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$booking) {
            throw new Exception("Booking tidak ditemukan");
        }
        
        $pdo->beginTransaction();
        
        try {
            switch ($action) {
                case 'confirm_payment':
                    // Admin konfirmasi pembayaran
                    $stmt = $pdo->prepare("
                        UPDATE bookings 
                        SET status = 'paid', payment_date = NOW() 
                        WHERE booking_id = ?
                    ");
                    $stmt->execute([$booking_id]);
                    $message = "Pembayaran dikonfirmasi";
                    break;
                    
                case 'handover':
                    // ✅ SERAH TERIMA - Stok berkurang di sini
                    $stmt = $pdo->prepare("
                        UPDATE bookings 
                        SET status = 'active', handover_date = NOW() 
                        WHERE booking_id = ?
                    ");
                    $stmt->execute([$booking_id]);
                    
                    // Kurangi stok available, tambah rented_stock
                    $stmt = $pdo->prepare("
                        SELECT equipment_id, quantity 
                        FROM booking_items 
                        WHERE booking_id = ?
                    ");
                    $stmt->execute([$booking_id]);
                    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    foreach ($items as $item) {
                        $stmt = $pdo->prepare("
                            UPDATE equipment 
                            SET 
                                available_stock = available_stock - ?,
                                rented_stock = rented_stock + ?
                            WHERE equipment_id = ? AND available_stock >= ?
                        ");
                        $stmt->execute([
                            $item['quantity'], 
                            $item['quantity'], 
                            $item['equipment_id'], 
                            $item['quantity']
                        ]);
                        
                        if ($stmt->rowCount() == 0) {
                            throw new Exception("Stok equipment tidak cukup untuk serah terima");
                        }
                    }
                    
                    $message = "Serah terima berhasil, stok equipment berkurang";
                    break;
                    
                case 'return':
                    // Pengembalian - Stok kembali
                    $stmt = $pdo->prepare("
                        UPDATE bookings 
                        SET status = 'completed', return_date = NOW() 
                        WHERE booking_id = ?
                    ");
                    $stmt->execute([$booking_id]);
                    
                    // Kembalikan stok
                    $stmt = $pdo->prepare("
                        SELECT equipment_id, quantity 
                        FROM booking_items 
                        WHERE booking_id = ?
                    ");
                    $stmt->execute([$booking_id]);
                    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    foreach ($items as $item) {
                        $stmt = $pdo->prepare("
                            UPDATE equipment 
                            SET 
                                available_stock = available_stock + ?,
                                rented_stock = rented_stock - ?
                            WHERE equipment_id = ?
                        ");
                        $stmt->execute([
                            $item['quantity'], 
                            $item['quantity'], 
                            $item['equipment_id']
                        ]);
                    }
                    
                    $message = "Pengembalian berhasil, stok dikembalikan";
                    break;
                    
                case 'cancel':
                    // Cancel booking
                    $stmt = $pdo->prepare("
                        UPDATE bookings 
                        SET status = 'cancelled' 
                        WHERE booking_id = ?
                    ");
                    $stmt->execute([$booking_id]);
                    $message = "Booking dibatalkan";
                    break;
                    
                default:
                    throw new Exception("Action tidak valid");
            }
            
            $pdo->commit();
            
            echo json_encode([
                "success" => true,
                "message" => $message
            ]);
            
        } catch (Exception $e) {
            $pdo->rollBack();
            throw $e;
        }
        
        exit;
    }
    
    throw new Exception("Method not allowed");
    
} catch(Exception $e) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
