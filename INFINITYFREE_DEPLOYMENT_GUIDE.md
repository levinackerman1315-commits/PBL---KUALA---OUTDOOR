# 🚀 INFINITYFREE DEPLOYMENT GUIDE - KUALA OUTDOOR

## ✅ STATUS: SEMUA FILE PHP SUDAH DIFIX! (19/70 files modified)

---

## 📋 PERUBAHAN YANG SUDAH DILAKUKAN:

### 1. ✅ Database Configuration
- `api/config/database.php` - PDO connection untuk InfinityFree
- `api/config/database_mysqli.php` - MySQLi connection untuk InfinityFree
- Credentials sudah diupdate ke InfinityFree format

### 2. ✅ Files yang Sudah Difix (19 files):
```
✅ api/api.php
✅ api/admin/equipment.php
✅ api/customer/profile.php
✅ api/packages/check_availability.php
✅ api/packages/delete_package.php
✅ api/packages/get_package.php
✅ api/packages_bookings/cancel_booking.php
✅ api/packages_bookings/create_booking.php
✅ api/packages_bookings/get_bookings.php
✅ api/packages_bookings/get_booking_detail.php
✅ api/packages_bookings/update_booking_status.php
✅ api/packages_bookings/upload_payment_proof.php
✅ api/packages_cart/add_to_cart.php
✅ api/packages_cart/clear_cart.php
✅ api/packages_cart/get_cart.php
✅ api/packages_cart/remove_cart_item.php
✅ api/packages_cart/update_cart_item.php
✅ api/public/booking.php
✅ api/upload/multi_image.php
```

### 3. ✅ Changes Applied:
- ✅ Database credentials: `localhost` → InfinityFree credentials
- ✅ Image URLs: `http://localhost/PBL-KELANA-OUTDOOR` → `https://kualaoutdoor.free.nf`
- ✅ Error display: `display_errors = 1` → `display_errors = 0` (production)
- ✅ Database connection: Hardcoded → `require_once database.php`

---

## 🔧 LANGKAH DEPLOYMENT:

### ⚠️ **STEP 0: UPDATE PASSWORD DI DATABASE.PHP**

**PENTING!** Sebelum upload, update password di 2 file ini:

#### File 1: `api/config/database.php`
```php
private $host = "sql207.infinityfree.com";
private $db_name = "if0_40557727_kuala_outdoor";
private $username = "if0_40557727";
private $password = ""; // ⚠️ ISI PASSWORD DARI INFINITYFREE!
```

#### File 2: `api/config/database_mysqli.php`
```php
private $host = "sql207.infinityfree.com";
private $db_name = "if0_40557727_kuala_outdoor";
private $username = "if0_40557727";
private $password = ""; // ⚠️ ISI PASSWORD DARI INFINITYFREE!
```

**Cara Lihat Password:**
1. Login ke InfinityFree Control Panel
2. Go to: MySQL Databases
3. Click icon mata 👁️ di sebelah MySQL Password
4. Copy password
5. Paste ke 2 file di atas

---

### **STEP 1: UPLOAD FOLDER API KE INFINITYFREE**

#### Via File Manager:
1. Login ke InfinityFree Control Panel
2. Klik **"File Manager"**
3. Navigate ke folder: `/htdocs/`
4. **Delete folder `api/` lama** (jika ada)
5. **Upload folder `api/` yang baru** (yang sudah difix)
6. Extract jika di-zip

#### Via FTP:
```bash
Host: ftpupload.net (atau lihat di InfinityFree)
Username: if0_40557727
Password: (sama dengan cPanel password)
Port: 21

Upload folder: api/
```

---

### **STEP 2: UPLOAD DATABASE**

1. **Buka phpMyAdmin di InfinityFree**
   - Control Panel > MySQL Databases > phpMyAdmin

2. **Pilih Database:** `if0_40557727_kuala_outdoor`

3. **Import SQL:**
   - Click tab "Import"
   - Choose file: `database_packages.sql`
   - Click "Go"
   - Wait for success message

4. **Verifikasi Tables:**
   ```sql
   SHOW TABLES;
   ```
   
   Harus ada tables:
   - equipment
   - equipment_images
   - equipment_usage_guides
   - equipment_rental_terms
   - trips
   - customers
   - bookings
   - equipment_packages
   - package_items
   - dll...

---

### **STEP 3: TEST API ENDPOINTS**

Test URL berikut di browser atau Postman:

#### 1. Test Database Connection:
```
https://kualaoutdoor.free.nf/api/public/equipment.php
```

**Expected Response:**
```json
[
  {
    "equipment_id": 1,
    "name": "Tenda Camping 4 Orang",
    "price_per_day": 50000,
    ...
  }
]
```

#### 2. Test Single Equipment:
```
https://kualaoutdoor.free.nf/api/public/equipment.php?id=1
```

#### 3. Test Trips:
```
https://kualaoutdoor.free.nf/api/public/trips.php
```

#### 4. Test Packages:
```
https://kualaoutdoor.free.nf/api/public/packages.php
```

---

### **STEP 4: TEST FRONTEND**

1. **Buka Website:**
   ```
   https://pbl-kuala-outdoor.vercel.app/browse
   ```

2. **Check Browser Console (F12):**
   - Tidak ada error CORS
   - API calls berhasil (status 200)
   - Data equipment tampil

3. **Expected Result:**
   - ✅ Data equipment muncul
   - ✅ Gambar tampil (jika sudah upload)
   - ✅ Filter kategori bekerja
   - ✅ Search bekerja

---

## 🐛 TROUBLESHOOTING:

### Error: "Database connection failed"
**Solution:**
1. Cek password di `database.php` dan `database_mysqli.php`
2. Verify database name: `if0_40557727_kuala_outdoor`
3. Check phpMyAdmin apakah database sudah import

### Error: "Failed to fetch"
**Solution:**
1. Check file uploaded ke folder yang benar (`/htdocs/api/`)
2. Test direct URL: `https://kualaoutdoor.free.nf/api/public/equipment.php`
3. Check CORS headers di PHP files

### Error: "Table doesn't exist"
**Solution:**
1. Import database via phpMyAdmin
2. Run SQL:
   ```sql
   USE if0_40557727_kuala_outdoor;
   SHOW TABLES;
   ```

### Error: 404 Not Found
**Solution:**
1. Check folder structure:
   ```
   /htdocs/
   └── api/
       ├── config/
       ├── public/
       ├── admin/
       └── ...
   ```
2. File permissions: 644 for .php files

### Error: Image tidak muncul
**Solution:**
1. Upload folder `uploads/` ke InfinityFree
2. Check URL di database:
   ```sql
   SELECT image_url FROM equipment_images LIMIT 5;
   ```
3. Seharusnya: `/uploads/equipment/filename.jpg`

---

## 📦 FILE STRUCTURE DI INFINITYFREE:

```
/htdocs/
├── api/
│   ├── config/
│   │   ├── database.php ✅ (UPDATED)
│   │   └── database_mysqli.php ✅ (NEW)
│   ├── public/
│   │   ├── equipment.php ✅
│   │   ├── trips.php ✅
│   │   └── ...
│   ├── admin/
│   ├── packages/
│   ├── packages_bookings/
│   └── ...
└── uploads/ (OPTIONAL - jika ada gambar)
    └── equipment/
        └── *.jpg
```

---

## ✅ CHECKLIST DEPLOYMENT:

```
🔲 1. Update password di database.php dan database_mysqli.php
🔲 2. Upload folder api/ ke /htdocs/ di InfinityFree
🔲 3. Import database_packages.sql via phpMyAdmin
🔲 4. Test endpoint: https://kualaoutdoor.free.nf/api/public/equipment.php
🔲 5. Verify Vercel Environment Variables sudah benar
🔲 6. Test frontend: https://pbl-kuala-outdoor.vercel.app/browse
🔲 7. Check browser console untuk errors
🔲 8. Test semua fitur: browse, search, filter
🔲 9. Upload folder uploads/ jika ada gambar
🔲 10. Final testing: end-to-end flow
```

---

## 🆘 SUPPORT:

Jika masih ada error setelah semua step, kirim screenshot:
1. Error message di browser
2. Browser console (F12 > Console)
3. Network tab (F12 > Network)
4. phpMyAdmin tables list

---

## 🎉 SUCCESS INDICATORS:

✅ Backend API return data (bukan error 500)
✅ Frontend tampil data equipment
✅ Gambar equipment tampil (jika sudah upload)
✅ Filter dan search berfungsi
✅ No CORS errors di console
✅ Network tab show status 200

---

**Last Updated:** December 6, 2025
**Auto-fixed by:** Python script (19/70 files)
**Backup Location:** `api_backup/`
