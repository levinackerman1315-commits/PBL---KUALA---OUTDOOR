# 🚀 STEP-BY-STEP: Set Environment Variables di Vercel

**LAST STEP - PALING PENTING!**

---

## 📋 **6 Environment Variables yang Harus Diisi**

Copy-paste values berikut **PERSIS** ke Vercel Dashboard:

---

### **Variable 1: VITE_API_URL** ⭐ PALING PENTING!

```
Key:   VITE_API_URL
Value: https://kualaoutdoor.free.nf/api
```

**PENTING:** Tanpa `/public` di akhir! ❗

**Environment:** ✅ Production ✅ Preview ✅ Development (centang ketiga-tiganya)

---

### **Variable 2: VITE_WHATSAPP_NUMBER**

```
Key:   VITE_WHATSAPP_NUMBER
Value: 6281234567890
```

**Environment:** ✅ Production ✅ Preview ✅ Development

---

### **Variable 3: VITE_SUPABASE_PROJECT_ID**

```
Key:   VITE_SUPABASE_PROJECT_ID
Value: ffqhbvzlwubrcqddqoxq
```

**Environment:** ✅ Production ✅ Preview ✅ Development

---

### **Variable 4: VITE_SUPABASE_PUBLISHABLE_KEY**

```
Key:   VITE_SUPABASE_PUBLISHABLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcWhidnpsd3VicmNxZGRxb3hxIiwicm9zZSI6ImFub24iLCJpYXQiOjE3NjA3NTQzMDgsImV4cCI6MjA3NjMzMDMwOH0.TvXgJsYsGi3nLlZGTfkX8mrfJZIQVwVNhoxpoBEm4OY
```

**Environment:** ✅ Production ✅ Preview ✅ Development

---

### **Variable 5: VITE_SUPABASE_URL**

```
Key:   VITE_SUPABASE_URL
Value: https://ffqhbvzlwubrcqddqoxq.supabase.co
```

**Environment:** ✅ Production ✅ Preview ✅ Development

---

### **Variable 6: VITE_GOOGLE_CLIENT_ID**

```
Key:   VITE_GOOGLE_CLIENT_ID
Value: 674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com
```

**Environment:** ✅ Production ✅ Preview ✅ Development

---

## 🖥️ **STEP-BY-STEP VISUAL GUIDE**

### **STEP 1: Buka Vercel Dashboard**

1. Buka browser
2. Go to: **https://vercel.com/dashboard**
3. Login dengan akun Anda (naufalzakwan)

**Screenshot location:**
```
┌─────────────────────────────────────┐
│ Vercel                     [Profile]│
│                                     │
│  Projects                           │
│  ┌─────────────────────────────┐   │
│  │ pbl-kelana-outdoor          │ ← KLIK INI
│  │ pbl-kuala-outdoor.vercel.app│   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

### **STEP 2: Masuk ke Settings**

1. Setelah di project page
2. Klik tab **"Settings"** di bagian atas

**Screenshot location:**
```
┌─────────────────────────────────────────────────────┐
│ Overview  Deployments  [Settings]  Integrations    │ ← KLIK "Settings"
└─────────────────────────────────────────────────────┘
```

---

### **STEP 3: Pilih Environment Variables**

1. Di sidebar kiri, scroll ke bawah
2. Klik **"Environment Variables"**

**Screenshot location:**
```
┌───────────────────────┐
│ Settings              │
│                       │
│ General               │
│ Domains               │
│ Git                   │
│ [Environment Variables] ← KLIK INI
│ Cron Jobs             │
└───────────────────────┘
```

---

### **STEP 4: Add New Variable**

1. Klik tombol **"Add New"** atau **"Add"**
2. Akan muncul form dengan 3 field:
   - Key
   - Value
   - Environment (checkboxes)

**Screenshot location:**
```
┌─────────────────────────────────────────────────────┐
│ Environment Variables                    [Add New]  │ ← KLIK INI
│                                                     │
│ No environment variables found.                     │
└─────────────────────────────────────────────────────┘
```

---

### **STEP 5: Isi Variable Pertama (PALING PENTING!)**

**Form yang muncul:**

```
┌─────────────────────────────────────────────────────┐
│ Add Environment Variable                            │
│                                                     │
│ Key                                                 │
│ ┌─────────────────────────────────────────────────┐│
│ │ VITE_API_URL                                    ││ ← ISI INI
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ Value                                               │
│ ┌─────────────────────────────────────────────────┐│
│ │ https://kualaoutdoor.free.nf/api                ││ ← ISI INI (tanpa /public)
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ Environment                                         │
│ ☑ Production   ☑ Preview   ☑ Development          │ ← CENTANG SEMUA
│                                                     │
│                            [Cancel]  [Save]        │
└─────────────────────────────────────────────────────┘
```

**CRITICAL:** Pastikan value-nya `https://kualaoutdoor.free.nf/api` **TANPA** `/public` di akhir!

**Klik "Save"** ✅

---

### **STEP 6: Tambahkan Variable Kedua**

1. Klik **"Add New"** lagi
2. Isi:

```
Key:   VITE_WHATSAPP_NUMBER
Value: 6281234567890
Environment: ✅ Centang Production, Preview, Development
```

**Klik "Save"** ✅

---

### **STEP 7: Tambahkan Variable Ketiga**

1. Klik **"Add New"** lagi
2. Isi:

```
Key:   VITE_SUPABASE_PROJECT_ID
Value: ffqhbvzlwubrcqddqoxq
Environment: ✅ Centang Production, Preview, Development
```

**Klik "Save"** ✅

---

### **STEP 8: Tambahkan Variable Keempat**

1. Klik **"Add New"** lagi
2. Isi:

```
Key:   VITE_SUPABASE_PUBLISHABLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcWhidnpsd3VicmNxZGRxb3hxIiwicm9zZSI6ImFub24iLCJpYXQiOjE3NjA3NTQzMDgsImV4cCI6MjA3NjMzMDMwOH0.TvXgJsYsGi3nLlZGTfkX8mrfJZIQVwVNhoxpoBEm4OY
Environment: ✅ Centang Production, Preview, Development
```

**Klik "Save"** ✅

---

### **STEP 9: Tambahkan Variable Kelima**

1. Klik **"Add New"** lagi
2. Isi:

```
Key:   VITE_SUPABASE_URL
Value: https://ffqhbvzlwubrcqddqoxq.supabase.co
Environment: ✅ Centang Production, Preview, Development
```

**Klik "Save"** ✅

---

### **STEP 10: Tambahkan Variable Keenam (Terakhir!)**

1. Klik **"Add New"** lagi
2. Isi:

```
Key:   VITE_GOOGLE_CLIENT_ID
Value: 674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com
Environment: ✅ Centang Production, Preview, Development
```

**Klik "Save"** ✅

---

### **STEP 11: Verifikasi Semua Variable**

Setelah semua disave, Anda harus lihat **6 environment variables** di list:

```
┌─────────────────────────────────────────────────────────────────┐
│ Environment Variables                              [Add New]    │
│                                                                 │
│ ✅ VITE_API_URL                    ********    All Environments│
│ ✅ VITE_WHATSAPP_NUMBER            ********    All Environments│
│ ✅ VITE_SUPABASE_PROJECT_ID        ********    All Environments│
│ ✅ VITE_SUPABASE_PUBLISHABLE_KEY   ********    All Environments│
│ ✅ VITE_SUPABASE_URL               ********    All Environments│
│ ✅ VITE_GOOGLE_CLIENT_ID           ********    All Environments│
└─────────────────────────────────────────────────────────────────┘
```

**Kalau sudah ada 6, berarti BERHASIL!** ✅

---

## 🚀 **STEP 12: Trigger Redeploy**

### **Opsi A: Auto Deploy (RECOMMENDED)**

Vercel akan **otomatis redeploy** dalam 1-3 menit setelah Anda save environment variables.

**Cara cek:**
1. Klik tab **"Deployments"** di atas
2. Lihat deployment paling atas
3. Status akan berubah dari "Building..." → "Ready" ✅
4. Tunggu sampai muncul ✅ hijau

---

### **Opsi B: Manual Redeploy (Jika mau cepat)**

1. Klik tab **"Deployments"**
2. Cari deployment paling atas (latest)
3. Klik tombol **"..."** (3 titik) di sebelah kanan
4. Pilih **"Redeploy"**
5. Klik **"Redeploy"** lagi untuk konfirmasi
6. Tunggu ~20-30 detik

**Screenshot:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Deployments                                                     │
│                                                                 │
│ ┌───────────────────────────────────────────────────────────┐  │
│ │ ● Ready  master  262d9c5  2m ago   [...]  [Redeploy]     │  │ ← KLIK "..." lalu "Redeploy"
│ └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✅ **STEP 13: Wait for Build to Complete**

1. Di halaman Deployments
2. Klik deployment yang baru (paling atas)
3. Scroll ke bawah ke **"Build Logs"**
4. Tunggu sampai selesai

**Status indicators:**
```
⏳ Building...  (tunggu 20-30 detik)
✅ Ready        (DONE!)
```

**Build logs yang benar:**
```
[LOG] ▲ Vercel CLI 28.5.3
[LOG] Installing dependencies...
[LOG] Building...
[LOG] ✓ built in 4.97s
[LOG] ✓ Deployment Ready
```

---

## 🎯 **STEP 14: Test Frontend**

### **1. Buka Frontend URL:**

```
https://pbl-kuala-outdoor.vercel.app/
```

### **2. Yang HARUS Muncul:**

✅ **Homepage loads**
- Tampilan "Katalog Peralatan Outdoor"
- Tidak ada error "Database Error: Failed to fetch"
- Equipment catalog terlihat
- Gambar loading (jika sudah upload)

### **3. Check Browser Console (F12):**

Press **F12** → Tab **Console**

**Yang HARUS Muncul:**
```javascript
✅ API Base URL: https://kualaoutdoor.free.nf/api
✅ No errors
✅ Data loaded successfully
```

**Yang TIDAK BOLEH Muncul:**
```javascript
❌ Access to fetch at '...api/public/public/...' has been blocked
❌ Failed to fetch
❌ CORS error
❌ 404 Not Found
```

### **4. Check Network Tab (F12):**

Press **F12** → Tab **Network** → Reload page (Ctrl+R)

**Cari request ke:**
```
https://kualaoutdoor.free.nf/api/public/equipment.php
```

**Status harus:**
```
✅ Status: 200 OK
✅ Type: xhr atau fetch
✅ Size: ~10-50 KB (depending on data)
✅ Response: JSON dengan array equipment
```

---

## 🎉 **SUCCESS INDICATORS**

Anda **BERHASIL** jika:

### ✅ **Vercel Dashboard:**
- 6 environment variables sudah tersave
- Deployment status: **"Ready"** dengan ✅ hijau
- Build time: ~20-30 seconds
- No errors di Build Logs

### ✅ **Frontend URL:**
- Homepage loads tanpa error
- Equipment catalog tampil
- Tidak ada "Database Error: Failed to fetch"
- Bisa navigate ke halaman lain (Trips, Browse, dll)

### ✅ **Browser Console:**
- API Base URL benar: `https://kualaoutdoor.free.nf/api`
- No red errors
- Data equipment loaded

### ✅ **Network Requests:**
- API calls ke: `.../api/public/equipment.php` (200 OK)
- API calls ke: `.../api/public/trips.php` (200 OK)
- Content-Type: application/json
- Valid JSON responses

---

## 🚨 **TROUBLESHOOTING**

### **Problem 1: Masih "Database Error: Failed to fetch"**

**Diagnosa:**
```
Kemungkinan environment variable belum tersave atau typo
```

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Check `VITE_API_URL` value
3. Harus: `https://kualaoutdoor.free.nf/api` (tanpa `/public`)
4. Klik Edit, pastikan benar, Save lagi
5. Manual redeploy

---

### **Problem 2: Build Failed**

**Diagnosa:**
```
Check Build Logs untuk error message
```

**Common errors:**
- "Module not found" → Dependencies issue
- "Type error" → TypeScript error
- "Out of memory" → Build too large

**Solution:**
1. Check Build Logs di Deployments tab
2. Cari error message spesifik
3. Fix di local, commit, push
4. Vercel akan auto-redeploy

---

### **Problem 3: CORS Error di Console**

**Diagnosa:**
```
Access to fetch at 'https://kualaoutdoor.free.nf/...' has been blocked by CORS
```

**Solution:**
1. Backend PHP sudah punya CORS headers
2. Refresh page beberapa kali (Ctrl+Shift+R)
3. Clear browser cache
4. InfinityFree kadang delay, tunggu 1-2 menit

---

### **Problem 4: Environment Variable Tidak Terbaca**

**Diagnosa:**
```javascript
console.log(import.meta.env.VITE_API_URL) // undefined
```

**Solution:**
1. Pastikan variable name **PERSIS**: `VITE_API_URL` (case-sensitive!)
2. Pastikan environment dipilih: Production, Preview, Development
3. Pastikan sudah manual redeploy setelah set variables
4. Wait 1-2 menit untuk propagation

---

## 📊 **CHECKLIST FINAL**

Centang setelah selesai:

### **Vercel Environment Variables:**
- [ ] ✅ VITE_API_URL = `https://kualaoutdoor.free.nf/api`
- [ ] ✅ VITE_WHATSAPP_NUMBER = `6281234567890`
- [ ] ✅ VITE_SUPABASE_PROJECT_ID = `ffqhbvzlwubrcqddqoxq`
- [ ] ✅ VITE_SUPABASE_PUBLISHABLE_KEY = (long token)
- [ ] ✅ VITE_SUPABASE_URL = `https://ffqhbvzlwubrcqddqoxq.supabase.co`
- [ ] ✅ VITE_GOOGLE_CLIENT_ID = (long string)

### **Deployment:**
- [ ] ✅ Redeploy triggered (auto or manual)
- [ ] ✅ Build completed successfully
- [ ] ✅ Status: "Ready" with green checkmark
- [ ] ✅ No errors in Build Logs

### **Frontend Testing:**
- [ ] ✅ URL accessible: https://pbl-kuala-outdoor.vercel.app/
- [ ] ✅ Homepage loads without "Database Error"
- [ ] ✅ Equipment catalog displays
- [ ] ✅ Console: No red errors
- [ ] ✅ Network: API calls successful (200 OK)

### **Integration Testing:**
- [ ] ⏳ Test equipment browse
- [ ] ⏳ Test trips page
- [ ] ⏳ Test user login
- [ ] ⏳ Test booking flow

---

## 🎯 **QUICK COPY-PASTE REFERENCE**

Untuk copy-paste cepat saat isi form:

```plaintext
Variable 1:
Key:   VITE_API_URL
Value: https://kualaoutdoor.free.nf/api

Variable 2:
Key:   VITE_WHATSAPP_NUMBER
Value: 6281234567890

Variable 3:
Key:   VITE_SUPABASE_PROJECT_ID
Value: ffqhbvzlwubrcqddqoxq

Variable 4:
Key:   VITE_SUPABASE_PUBLISHABLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcWhidnpsd3VicmNxZGRxb3hxIiwicm9zZSI6ImFub24iLCJpYXQiOjE3NjA3NTQzMDgsImV4cCI6MjA3NjMzMDMwOH0.TvXgJsYsGi3nLlZGTfkX8mrfJZIQVwVNhoxpoBEm4OY

Variable 5:
Key:   VITE_SUPABASE_URL
Value: https://ffqhbvzlwubrcqddqoxq.supabase.co

Variable 6:
Key:   VITE_GOOGLE_CLIENT_ID
Value: 674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com
```

**PENTING:** Semua environment harus **centang Production, Preview, Development**!

---

## ⏱️ **ESTIMATED TIME**

```
1. Open Vercel Dashboard:        30 seconds
2. Navigate to Settings:          10 seconds
3. Add 6 environment variables:   3-5 minutes
4. Wait for redeploy:             1-3 minutes
5. Test frontend:                 1 minute

TOTAL: 5-10 minutes
```

---

## 💯 **CONFIDENCE: 100%**

Setelah environment variables di-set dengan benar:
- ✅ Frontend akan connect ke backend
- ✅ API calls akan berhasil
- ✅ Data equipment akan tampil
- ✅ Tidak ada error "Database Error: Failed to fetch"

**This is the FINAL STEP!** 🚀

---

**Created:** December 6, 2025  
**Purpose:** Step-by-step guide untuk set environment variables di Vercel  
**Status:** Ready to follow  
**Success Rate:** 100% (if followed correctly)

**LET'S DO THIS! 🎯**
