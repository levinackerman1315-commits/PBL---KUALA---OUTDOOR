# 🔧 Vercel Environment Variables Setup

## ❌ Masalah Yang Terjadi
Frontend menampilkan error: **"Database Error: Failed to fetch"**

**Penyebab:** 
- File `src/lib/api.ts` sudah diperbaiki untuk membaca `VITE_API_URL` dari environment variable
- File `.env.production` sudah benar berisi URL production backend
- **TAPI** environment variable belum di-set di Vercel Dashboard

## ✅ Solusi: Tambahkan Environment Variables di Vercel

### 📋 Langkah-Langkah Detail:

#### 1️⃣ Buka Vercel Dashboard
- Buka: https://vercel.com/dashboard
- Login dengan akun Anda (naufalzakwan)

#### 2️⃣ Pilih Project `pbl-kelana-outdoor`
- Klik pada project **pbl-kelana-outdoor** dari daftar projects

#### 3️⃣ Masuk ke Settings
- Di bagian atas, klik tab **"Settings"**

#### 4️⃣ Buka Environment Variables
- Di sidebar kiri, klik **"Environment Variables"**

#### 5️⃣ Tambahkan Variable Baru
Klik tombol **"Add New"** dan masukkan variable berikut **SATU PER SATU**:

---

**Variable 1: API URL (WAJIB)**
```
Key   : VITE_API_URL
Value : https://kualaoutdoor.free.nf/api/public
Environment: Production, Preview, Development (centang semua)
```

---

**Variable 2: Supabase Project ID (jika pakai Supabase)**
```
Key   : VITE_SUPABASE_PROJECT_ID
Value : ffqhbvzlwubrcqddqoxq
Environment: Production, Preview, Development
```

---

**Variable 3: Supabase Key (jika pakai Supabase)**
```
Key   : VITE_SUPABASE_PUBLISHABLE_KEY
Value : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcWhidnpsd3VicmNxZGRxb3hxIiwicm9zZSI6ImFub24iLCJpYXQiOjE3NjA3NTQzMDgsImV4cCI6MjA3NjMzMDMwOH0.TvXgJsYsGi3nLlZGTfkX8mrfJZIQVwVNhoxpoBEm4OY
Environment: Production, Preview, Development
```

---

**Variable 4: Supabase URL (jika pakai Supabase)**
```
Key   : VITE_SUPABASE_URL
Value : https://ffqhbvzlwubrcqddqoxq.supabase.co
Environment: Production, Preview, Development
```

---

**Variable 5: Google Client ID (jika pakai Google OAuth)**
```
Key   : VITE_GOOGLE_CLIENT_ID
Value : 674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com
Environment: Production, Preview, Development
```

---

**Variable 6: WhatsApp Number (optional)**
```
Key   : VITE_WHATSAPP_NUMBER
Value : 6281234567890
Environment: Production, Preview, Development
```

---

#### 6️⃣ Save Changes
- Setelah menambahkan semua variable, klik **"Save"**

#### 7️⃣ Redeploy (PENTING!)
Ada 2 cara untuk redeploy:

**Cara A: Otomatis (Sudah dilakukan)**
- Code sudah di-push ke GitHub dengan commit baru
- Vercel akan otomatis redeploy dalam 1-3 menit
- Cek tab **"Deployments"** untuk melihat progress

**Cara B: Manual Redeploy (jika perlu)**
- Pergi ke tab **"Deployments"**
- Klik tombol **"..."** (3 titik) di deployment teratas
- Pilih **"Redeploy"**
- Klik **"Redeploy"** lagi untuk konfirmasi

---

## 🎯 Verifikasi Setup

### 1. Tunggu Build Selesai
- Di tab **"Deployments"**, tunggu hingga status berubah menjadi **"Ready"** (✅)
- Durasi: sekitar 20-60 detik

### 2. Cek URL Frontend
Buka: https://pbl-kuala-outdoor.vercel.app/

**Yang Harus Muncul:**
- ✅ Homepage dengan data equipment dari backend
- ✅ Tidak ada error "Database Error: Failed to fetch"
- ✅ Gambar dan data loading dengan benar

### 3. Tes API Connection
Buka browser console (F12) dan cek:
```javascript
// Seharusnya API URL sudah benar
console.log(import.meta.env.VITE_API_URL)
// Output: https://kualaoutdoor.free.nf/api/public
```

---

## 🔍 Troubleshooting

### ❌ Masih Error Setelah Redeploy?

**1. Cek Build Logs**
- Tab "Deployments" → Klik deployment terbaru
- Scroll ke **"Build Logs"**
- Cari error message

**2. Cek Environment Variables**
- Tab "Settings" → "Environment Variables"
- Pastikan `VITE_API_URL` terlihat di list
- Value harus: `https://kualaoutdoor.free.nf/api/public`

**3. Clear Browser Cache**
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

**4. Test Backend API Langsung**
Buka di browser:
```
https://kualaoutdoor.free.nf/api/public/equipment.php
```
Harus return JSON data equipment

---

## 📸 Screenshot Reference

Lokasi Setting Environment Variables di Vercel:
```
Vercel Dashboard 
  → Project: pbl-kelana-outdoor
    → Settings (tab atas)
      → Environment Variables (sidebar kiri)
        → Add New (button)
```

---

## ✅ Checklist Setup
Centang setelah selesai:

- [x] ✅ Code sudah di-push ke GitHub (commit: 1af5e62)
- [ ] ⏳ Environment variables sudah ditambahkan di Vercel
- [ ] ⏳ Vercel sudah redeploy otomatis
- [ ] ⏳ Frontend bisa akses backend API
- [ ] ⏳ Tidak ada error "Database Error: Failed to fetch"

---

## 📝 Notes

**Perubahan yang Sudah Dilakukan:**
1. ✅ File `src/lib/api.ts` sudah update pakai environment variable:
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/PBL-KELANA-OUTDOOR/api/public'
   ```

2. ✅ File `.env.production` sudah benar:
   ```env
   VITE_API_URL=https://kualaoutdoor.free.nf/api/public
   ```

3. ✅ Code sudah di-commit dan push ke GitHub

**Yang Masih Perlu Dilakukan:**
- ⏳ Set environment variables di Vercel Dashboard
- ⏳ Tunggu auto-redeploy selesai
- ⏳ Test frontend

---

## 🚀 Setelah Setup Berhasil

Anda bisa test fitur-fitur berikut:
1. ✅ Browse equipment catalog
2. ✅ View equipment details
3. ✅ Filter by category
4. ✅ Search equipment
5. ✅ Add to cart
6. ✅ User registration & login
7. ✅ Booking flow

---

**Last Updated:** December 6, 2025
**Status:** Waiting for Vercel environment variables setup
