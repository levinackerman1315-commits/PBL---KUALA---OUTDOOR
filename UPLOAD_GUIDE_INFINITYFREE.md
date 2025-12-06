# 🚀 PANDUAN UPLOAD INFINITYFREE - STEP BY STEP

## ✅ STATUS: SEMUA FILE SUDAH DIFIX! (29 files)

---

## 📋 APA YANG SUDAH SELESAI?

✅ 29 file PHP sudah difix otomatis
✅ Database connection sudah ke InfinityFree format
✅ Semua URL sudah production (https://kualaoutdoor.free.nf)
✅ CORS sudah dikonfigurasi
✅ Error display sudah production mode
✅ Backup sudah dibuat (29 files)

---

## ⚠️ YANG HARUS ANDA LAKUKAN: 4 LANGKAH SAJA!

### **LANGKAH 1: UPDATE PASSWORD** (Wajib! 5 menit)

**A. Lihat Password di InfinityFree:**
1. Buka: https://app.infinityfree.com/
2. Login
3. Klik: MySQL Databases
4. Klik icon mata 👁️ di sebelah "MySQL Password"
5. Copy password yang muncul

**B. Update Password di 2 File:**

**File 1:** `api/config/database.php`
- Buka file
- Cari line 7: `private $password = "";`
- Ganti jadi: `private $password = "PASSWORD_ANDA";`
- Save

**File 2:** `api/config/database_mysqli.php`
- Buka file
- Cari line 7: `private $password = "";`
- Ganti jadi: `private $password = "PASSWORD_ANDA";`
- Save

**ATAU gunakan script otomatis (Windows):**
```cmd
cd c:\xampp\htdocs\PBL-KELANA-OUTDOOR
update-db-password.bat PASSWORD_ANDA
```

---

### **LANGKAH 2: UPLOAD KE INFINITYFREE** (10 menit)

**PENTING: Anda HANYA upload folder `api/` saja!**

**Cara Upload:**

1. **Login InfinityFree**
   - Buka: https://app.infinityfree.com/
   - Login dengan account Anda

2. **Buka File Manager**
   - Di dashboard, klik: **"File Manager"**
   - Atau klik: **"Manage"** > **"File Manager"**

3. **Navigate ke htdocs**
   - Di File Manager, klik folder: **"htdocs"**

4. **Hapus folder api lama (jika ada)**
   - Jika sudah ada folder `api/`, centang folder tersebut
   - Klik tombol **"Delete"**
   - Confirm

5. **Upload folder api baru**
   - Klik tombol **"Upload"** di toolbar
   - Atau klik kanan > Upload
   - Pilih folder: `C:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\`
   - **PENTING:** Select semua file di DALAM folder api, BUKAN folder api-nya
   - Atau zip dulu folder api, upload zip, lalu extract

6. **Tunggu Upload Selesai**
   - Progress bar akan muncul
   - Bisa 5-10 menit tergantung internet
   - Jangan close browser sampai selesai

7. **Verifikasi Upload**
   - Setelah selesai, refresh File Manager
   - Pastikan ada folder `/htdocs/api/` dengan isi:
     - config/
     - public/
     - admin/
     - packages/
     - dll

---

### **LANGKAH 3: IMPORT DATABASE** (5 menit)

1. **Buka phpMyAdmin**
   - Di InfinityFree dashboard
   - Klik: **"MySQL Databases"**
   - Klik tombol: **"phpMyAdmin"**
   - Login otomatis

2. **Pilih Database**
   - Di sidebar kiri
   - Klik: **`if0_40557727_kuala_outdoor`**

3. **Import SQL File**
   - Klik tab: **"Import"** (di bagian atas)
   - Klik: **"Choose File"**
   - Pilih file: `C:\xampp\htdocs\PBL-KELANA-OUTDOOR\database_packages.sql`
   - Scroll ke bawah
   - Klik tombol: **"Go"**
   
4. **Tunggu Import Selesai**
   - Bisa 1-2 menit
   - Akan muncul: **"Import has been successfully finished"**

5. **Verifikasi Tables**
   - Klik tab: **"Structure"**
   - Pastikan ada tables:
     - equipment
     - equipment_images
     - trips
     - customers
     - bookings
     - equipment_packages
     - dll (total 15+ tables)

---

### **LANGKAH 4: TEST!** (5 menit)

**Test 1: API Backend**
- Buka browser
- Ketik URL: `https://kualaoutdoor.free.nf/api/public/equipment.php`
- **Expected:** Muncul JSON data equipment
- **Jika error:** Lihat troubleshooting di bawah

**Test 2: Frontend**
- Buka: `https://pbl-kuala-outdoor.vercel.app/browse`
- **Expected:** 
  - Data equipment tampil
  - Gambar tampil (jika sudah upload)
  - Search & filter berfungsi
- **Check Console:**
  - Tekan F12
  - Tab Console
  - Tidak ada error merah

---

## 🐛 TROUBLESHOOTING:

### ❌ Error: "Database connection failed"

**Penyebab:**
- Password salah di database.php

**Solusi:**
1. Cek password di InfinityFree (icon mata)
2. Update lagi di `database.php` dan `database_mysqli.php`
3. Re-upload 2 file ini ke InfinityFree

---

### ❌ Error: "Failed to fetch"

**Penyebab:**
- Folder api/ belum diupload
- Path salah

**Solusi:**
1. Cek di File Manager: `/htdocs/api/` harus ada
2. Test direct URL: `https://kualaoutdoor.free.nf/api/public/equipment.php`

---

### ❌ Error: "Table doesn't exist"

**Penyebab:**
- Database belum diimport

**Solusi:**
1. Buka phpMyAdmin
2. Select database: `if0_40557727_kuala_outdoor`
3. Klik tab SQL
4. Run query: `SHOW TABLES;`
5. Jika kosong, import ulang `database_packages.sql`

---

### ❌ Error: 404 Not Found

**Penyebab:**
- File belum diupload

**Solusi:**
1. Cek File Manager
2. Pastikan file exist: `/htdocs/api/public/equipment.php`
3. Clear browser cache (Ctrl+Shift+Del)

---

## 📊 PROGRESS TRACKER:

```
□ Step 1: Password updated ✏️
□ Step 2: Folder api/ uploaded 📤
□ Step 3: Database imported 🗄️
□ Step 4: API tested (return JSON) 🧪
□ Step 5: Frontend tested (data tampil) 🌐
□ Step 6: No errors in console ✅
```

---

## 📁 FOLDER YANG DIUPLOAD:

**HANYA:** `api/`

**JANGAN upload:**
- src/
- node_modules/
- api_backup/
- api_backup_v2/
- .git/

---

## 🎯 QUICK COMMAND:

```bash
# Windows Command Prompt:
cd c:\xampp\htdocs\PBL-KELANA-OUTDOOR

# 1. Update password
update-db-password.bat YOUR_PASSWORD

# 2. Lanjut manual upload via File Manager
```

---

## 📞 BUTUH BANTUAN?

Jika masih error, kirim screenshot:
1. Error message di browser
2. Browser console (F12 > Console)
3. Network tab (F12 > Network)
4. File Manager structure

---

## 🎉 SELAMAT!

**Jika semua test passed:**
✅ Backend berfungsi
✅ Frontend berfungsi
✅ Integration success

**Deployment SELESAI!** 🎊

---

**Total waktu: 25-30 menit**
**Difficulty: ⭐⭐ (Easy)**
**Status: ✅ Ready to Deploy**

🚀 **SILAKAN MULAI STEP 1 SEKARANG!** 🚀
