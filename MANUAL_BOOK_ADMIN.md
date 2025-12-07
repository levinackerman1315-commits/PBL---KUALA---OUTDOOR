# 📖 MANUAL BOOK - KUALA OUTDOOR ADMIN

## 🎯 Informasi Umum

**Nama Aplikasi:** KUALA OUTDOOR - Penyewaan Alat Camping & Pendakian  
**URL Production:** https://pbl-kuala-outdoor-mb1j.vercel.app  
**Backend API:** https://pbl-kuala-outdoor-production.up.railway.app/api  
**Status:** ✅ LIVE & READY

---

## ⚠️ CATATAN PENTING DARI DEVELOPER

Kepada Yth. Tim KUALA OUTDOOR,

Kami memohon maaf atas keterlambatan proses hosting website ini. Ini merupakan **pengalaman pertama kami dalam deployment production**, sehingga terdapat beberapa tantangan teknis yang harus diselesaikan.

### Apa yang Telah Kami Lakukan:

✅ **Migrasi Database:**
- Dari InfinityFree → Railway PostgreSQL
- Semua endpoint sudah menggunakan Railway database
- Auto-scaling dan high availability

✅ **Deployment Platform:**
- Frontend: Vercel (auto-deploy dari GitHub)
- Backend: Railway (PHP environment optimized)
- Google OAuth: Fully configured

✅ **Fitur yang Sudah Teruji:**
- Google Login (OAuth 2.0)
- Equipment Management (CRUD)
- Package Management
- Booking System
- Cart & Checkout
- User Profile
- Admin Dashboard

### ⚠️ Kemungkinan Bug & Maintenance:

**Karena ini deployment production pertama**, kemungkinan masih ada bug atau error yang belum terdeteksi. Namun kami berkomitmen:

1. **Monitoring Berkala** - Team kami akan melakukan pengecekan secara rutin jika memungkinkan
2. **Quick Response** - Jika ada kendala, kami akan segera maintenance
3. **Updates & Improvements** - Perbaikan berkelanjutan berdasarkan feedback
4. **24/7 Support** - (dalam kemampuan) untuk issue critical

**Jika Anda menemukan masalah/bug, harap segera hubungi kami** agar bisa ditangani dengan cepat.

---

## 🔐 LOGIN CREDENTIALS

### **Admin Dashboard:**
**URL:** https://pbl-kuala-outdoor-mb1j.vercel.app/admin-secret-login

**Username:** `admin`  
**Password:** `admin123`

> ⚠️ **PENTING:** Ganti password admin setelah login pertama kali!

### **User Testing (Optional):**
Gunakan **Google Login** untuk test user flow:
- Login: https://pbl-kuala-outdoor-mb1j.vercel.app/auth
- Klik "Lanjutkan sebagai nujji" atau akun Google lainnya

---

## 📋 FITUR UTAMA

### 1. **Dashboard Admin**
Path: `/admin/dashboard`

**Fungsi:**
- Overview statistik (Total Bookings, Equipment, Revenue)
- Grafik performa rental
- Quick actions

**Cara Akses:**
1. Login di `/admin-secret-login`
2. Otomatis redirect ke dashboard

---

### 2. **Equipment Management**
Path: `/admin/equipment`

**Fungsi:**
- Tambah equipment baru
- Edit equipment (nama, harga, stock, kategori)
- Upload multiple images
- Set kondisi equipment (Excellent/Good/Fair)
- Manage stock availability

**Cara Menambah Equipment:**
1. Klik **"Tambah Equipment"**
2. Isi form:
   - Kode Equipment (unique)
   - Nama Equipment
   - Kategori (Tenda/Carrier/Cooking/dll)
   - Harga per hari
   - Stock quantity
   - Deskripsi lengkap
3. Upload gambar (multiple allowed)
4. Klik **"Simpan"**

**Tips:**
- Gunakan kode yang jelas (misal: `TENT-001`, `CARRIER-002`)
- Upload gambar berkualitas tinggi (max 5MB per image)
- Pastikan stock quantity akurat

---

### 3. **Package Management**
Path: `/admin/packages`

**Fungsi:**
- Create package bundle (kombinasi equipment)
- Set harga paket (biasanya lebih murah dari individual)
- Manage package availability
- Set durasi paket (2D1N, 3D2N, dll)

**Cara Membuat Package:**
1. Klik **"Tambah Package"**
2. Isi:
   - Nama Package (misal: "Paket Pendakian Gunung")
   - Kapasitas (misal: "2-3 Orang")
   - Harga Package
   - Durasi hari
   - Stock available
3. Tambah items ke package (equipment yang included)
4. Klik **"Simpan"**

---

### 4. **Booking Management**
Path: `/admin/bookings`

**Fungsi:**
- Lihat semua booking dari customer
- Approve/Reject booking
- Update status (Pending → Confirmed → On Rent → Returned)
- Verify payment proof
- Track late returns

**Status Booking:**
- 🟡 **Pending** - Menunggu approval admin
- 🔵 **Confirmed** - Admin approve, customer bisa pickup
- 🟢 **On Rent** - Equipment sedang dipinjam
- ⚫ **Returned** - Equipment sudah dikembalikan
- 🔴 **Cancelled** - Booking dibatalkan

**Cara Handle Booking:**
1. Customer submit booking (via web)
2. Admin melihat di `/admin/bookings`
3. Cek detail booking (items, dates, payment proof)
4. **Approve** jika valid, **Reject** jika ada masalah
5. Update status sesuai progress rental

---

### 5. **Trip Management**
Path: `/admin/trips`

**Fungsi:**
- Create trip/event outdoor (misal: Open Trip Gunung Semeru)
- Set tanggal, lokasi, quota peserta
- Manage trip details (meeting point, kontak, jadwal)

**Cara Membuat Trip:**
1. Klik **"Tambah Trip"**
2. Isi form trip details
3. Upload cover image (bisa via URL)
4. Set quota & harga
5. Publish trip

---

## 🛠️ TROUBLESHOOTING

### **Problem 1: Admin tidak bisa login**
**Solusi:**
- Clear browser cache & cookies
- Gunakan Incognito/Private mode
- Coba browser lain (Chrome recommended)
- Pastikan credentials benar: `admin` / `admin123`

### **Problem 2: Google Login tidak muncul**
**Solusi:**
- Pastikan menggunakan domain `vercel.app` (bukan localhost)
- Clear cookies
- Disable ad-blocker

### **Problem 3: Equipment image tidak muncul**
**Solusi:**
- Cek ukuran file (max 5MB)
- Format support: JPG, PNG, WebP
- Upload ulang image

### **Problem 4: Booking tidak muncul di dashboard**
**Solusi:**
- Refresh halaman (Ctrl + F5)
- Cek filter status (pastikan tidak ada filter aktif)
- Contact developer jika tetap tidak muncul

---

## 📱 CUSTOMER USER FLOW

**Untuk testing/memahami customer experience:**

1. **Browse Equipment**
   - Customer lihat katalog: `/browse`
   - Filter by category/search

2. **Add to Cart**
   - Klik equipment → Tambah ke cart
   - Adjust quantity

3. **Checkout & Booking**
   - Ke `/cart` → Pilih tanggal rental
   - Upload payment proof
   - Submit booking

4. **Track Booking**
   - Customer bisa lihat status di `/bookings`

---

## 🔒 KEAMANAN

### **Credentials Management:**
- ⚠️ **JANGAN SHARE** password admin ke orang luar
- Ganti password default setelah login pertama
- Gunakan password yang kuat (min 8 karakter, kombinasi huruf+angka+simbol)

### **Data Backup:**
- Database otomatis backup daily by Railway
- Export data manual jika diperlukan (via Railway dashboard)

### **HTTPS & SSL:**
- ✅ Vercel & Railway support HTTPS by default
- SSL Certificate auto-renew

---

## 📞 CONTACT SUPPORT

**Jika menemukan bug, error, atau butuh bantuan:**

1. **Screenshot error** (jika ada)
2. **Catat step yang dilakukan** sebelum error
3. **Hubungi developer team:**
   - Email: [email developer]
   - WhatsApp: [nomor WA]
   - GitHub Issues: https://github.com/jaaanujjj-ai/PBL-KUALA-OUTDOOR/issues

**Response Time:**
- Critical issues: < 4 jam
- Normal bugs: < 24 jam
- Feature request: 2-7 hari

---

## 📊 MONITORING & MAINTENANCE

**Yang Kami Lakukan Berkala:**

✅ **Daily Check:**
- Server uptime monitoring
- Database connection health
- API response time

✅ **Weekly Review:**
- Error logs analysis
- Performance optimization
- Security updates

✅ **Monthly Report:**
- Usage statistics
- Bug fixes implemented
- New features deployed

---

## 🚀 FUTURE IMPROVEMENTS

**Fitur yang Akan Ditambahkan (Roadmap):**

1. **Auto WhatsApp Notification** - Booking confirmation via WA
2. **QR Code Booking** - Easy equipment pickup
3. **Rating & Review System** - Customer feedback
4. **Analytics Dashboard** - Advanced reports
5. **Mobile App** - Android/iOS version

---

## 📝 CHANGELOG

### **Version 1.0.0 (December 2025)**
- ✅ Initial production deployment
- ✅ Railway + Vercel integration
- ✅ Google OAuth login
- ✅ Full CRUD equipment & packages
- ✅ Booking management system
- ✅ Admin dashboard
- ✅ User profile & cart system

---

## ⚡ QUICK LINKS

| **Resource** | **URL** |
|-------------|---------|
| **Production Site** | https://pbl-kuala-outdoor-mb1j.vercel.app |
| **Admin Login** | https://pbl-kuala-outdoor-mb1j.vercel.app/admin-secret-login |
| **User Login** | https://pbl-kuala-outdoor-mb1j.vercel.app/auth |
| **API Docs** | https://pbl-kuala-outdoor-production.up.railway.app/api |
| **GitHub Repo** | https://github.com/jaaanujjj-ai/PBL-KUALA-OUTDOOR |
| **Railway Dashboard** | https://railway.app |
| **Vercel Dashboard** | https://vercel.com |

---

## 💚 TERIMA KASIH

Terima kasih atas kesempatan untuk membangun sistem ini. Kami berharap KUALA OUTDOOR dapat berkembang dan memberikan pelayanan terbaik untuk customer.

**Kami akan terus support maintenance dan improvement website ini.**

Salam,  
**Development Team KUALA OUTDOOR**

---

*Last Updated: December 7, 2025*
