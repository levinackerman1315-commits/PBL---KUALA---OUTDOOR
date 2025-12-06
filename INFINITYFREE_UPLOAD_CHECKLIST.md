# 🔥 INFINITYFREE UPLOAD CHECKLIST

## ❌ MASALAH SAAT INI:

Backend InfinityFree **TIDAK MERESPON** dengan CORS headers!

Error di console:
```
No 'Access-Control-Allow-Origin' header is present on the requested resource
```

**Root Cause**: File PHP belum di-upload atau path salah!

---

## ✅ CARA VERIFY FILE SUDAH DI-UPLOAD:

### 1. **Test Backend URL Langsung di Browser**

Copy-paste URL ini ke browser (NEW TAB):
```
https://kualaoutdoor.free.nf/api/public/equipment.php
```

**Expected Result**: JSON data
```json
[{"equipment_id":24,"name":"tas 45","code":"TAS-01",...}]
```

**If Error**: HTML error page atau blank → **FILE BELUM DI-UPLOAD!**

---

### 2. **Test dengan query parameter**

```
https://kualaoutdoor.free.nf/api/public/equipment.php?id=1
```

**Expected**: JSON object untuk equipment ID 1

---

### 3. **Test database connection**

```
https://kualaoutdoor.free.nf/test-connection.php
```

(File test-connection.php yang saya buat sebelumnya)

---

## 📁 FILE STRUCTURE YANG HARUS ADA DI INFINITYFREE:

```
/htdocs/
  ├── index.html (Vercel handle ini)
  ├── test-connection.php ⭐ UPLOAD INI DULU
  └── api/
      ├── config/
      │   └── database.php ⭐ WAJIB
      └── public/
          ├── equipment.php ⭐ WAJIB
          ├── login.php
          ├── register.php
          ├── booking.php
          ├── bookings.php
          ├── trips.php
          ├── packages.php
          └── google-login.php
```

---

## 🚀 CARA UPLOAD FILE KE INFINITYFREE:

### **METHOD 1: File Manager (Recommended)**

1. Login: https://app.infinityfree.com/accounts
2. Select account: `kualaoutdoor.free.nf`
3. Click: **Control Panel**
4. Click: **File Manager** (orange button)
5. Navigate to: `/htdocs/`
6. Create folders:
   - Click **New Folder** → `api`
   - Go into `api/`
   - Create `config/` folder
   - Create `public/` folder

7. **Upload files**:
   - Go to `/htdocs/api/config/`
   - Click **Upload**
   - Select: `c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\config\database.php`
   - Upload

   - Go to `/htdocs/api/public/`
   - Click **Upload**
   - Select ALL files from: `c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\public\`
   - Upload

   - Go to `/htdocs/`
   - Upload: `test-connection.php`

---

### **METHOD 2: FTP (Faster for multiple files)**

1. Download FileZilla: https://filezilla-project.org/
2. Get FTP credentials dari InfinityFree:
   - Control Panel → **FTP Details**
   - Copy: Hostname, Username, Password

3. Connect FileZilla:
   - Host: `ftpupload.net`
   - Username: `if0_40557727`
   - Password: (from FTP Details)
   - Port: `21`

4. Navigate di FileZilla:
   - Left panel: Local computer → `c:\xampp\htdocs\PBL-KELANA-OUTDOOR\`
   - Right panel: Server → `/htdocs/`

5. Drag & Drop:
   - Drag folder `/api/` dari left ke right
   - Drag file `test-connection.php` ke `/htdocs/`

---

## 🔥 QUICK FIX - UPLOAD PRIORITY:

Upload files dalam urutan ini:

### **Priority 1**: test-connection.php
Upload ke: `/htdocs/test-connection.php`
Test: `https://kualaoutdoor.free.nf/test-connection.php`

### **Priority 2**: database.php
Upload ke: `/htdocs/api/config/database.php`

### **Priority 3**: equipment.php
Upload ke: `/htdocs/api/public/equipment.php`
Test: `https://kualaoutdoor.free.nf/api/public/equipment.php`

### **Priority 4**: Other PHP files
Upload semua file di `/api/public/`:
- login.php
- register.php
- booking.php
- trips.php
- packages.php

---

## ✅ VERIFICATION STEPS:

After upload, test each URL:

1. ✅ `https://kualaoutdoor.free.nf/test-connection.php`
   → Should return: `{"success":true,"message":"Database connected"...}`

2. ✅ `https://kualaoutdoor.free.nf/api/public/equipment.php`
   → Should return: JSON array of equipment

3. ✅ Check Response Headers (F12 → Network tab):
   ```
   Access-Control-Allow-Origin: *
   Content-Type: application/json
   ```

---

## 🔍 DEBUGGING - Check if files exist:

### Test 1: Does folder exist?
```
https://kualaoutdoor.free.nf/api/
```
If 403 Forbidden → folder exists  
If 404 Not Found → folder doesn't exist

### Test 2: Does file exist?
```
https://kualaoutdoor.free.nf/api/public/
```
If 403 Forbidden → folder exists  
If 404 Not Found → folder doesn't exist

### Test 3: Does equipment.php exist?
```
https://kualaoutdoor.free.nf/api/public/equipment.php
```
If JSON → file exists and working ✅  
If HTML error → file exists but has errors  
If 404 → file doesn't exist ❌

---

## 📝 FILES TO UPLOAD (LOCAL PATHS):

```
c:\xampp\htdocs\PBL-KELANA-OUTDOOR\test-connection.php
c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\config\database.php
c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\public\equipment.php
c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\public\login.php
c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\public\register.php
c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\public\booking.php
c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\public\bookings.php
c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\public\trips.php
c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\public\packages.php
c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\public\google-login.php
```

---

## 🎯 ACTION PLAN:

1. [ ] Open InfinityFree File Manager
2. [ ] Create folder structure (`/htdocs/api/config/` dan `/htdocs/api/public/`)
3. [ ] Upload `database.php` to `/htdocs/api/config/`
4. [ ] Upload `equipment.php` to `/htdocs/api/public/`
5. [ ] Upload `test-connection.php` to `/htdocs/`
6. [ ] Test `https://kualaoutdoor.free.nf/test-connection.php`
7. [ ] Test `https://kualaoutdoor.free.nf/api/public/equipment.php`
8. [ ] If both return JSON → SUCCESS!
9. [ ] Upload remaining PHP files
10. [ ] Test frontend again

---

## 💡 KENAPA INI TERUS ERROR?

Karena **FILE BELUM DI-UPLOAD KE INFINITYFREE SERVER!**

File PHP-mu hanya ada di:
- ❌ Local computer: `c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api\`
- ❌ GitHub repository (kode doang, bukan hosting)
- ✅ HARUS DI: InfinityFree server `/htdocs/api/`

**GitHub ≠ InfinityFree!** Kamu harus upload manual via File Manager atau FTP!

---

**DO THIS NOW**:
1. Login InfinityFree
2. Open File Manager
3. Upload `test-connection.php` ke `/htdocs/`
4. Test: `https://kualaoutdoor.free.nf/test-connection.php`
5. Screenshot hasilnya

Kalau test-connection.php berhasil, baru upload sisanya!
