# 📋 CHECKLIST DEPLOYMENT KUALA OUTDOOR

## ✅ FILE YANG SUDAH DISESUAIKAN

### 1. `.env.production` ✅ DONE
```env
VITE_API_URL=https://placeholder-backend.com/api
VITE_WHATSAPP_NUMBER=6281234567890
```

### 2. `src/hooks/useWhatsApp.ts` ✅ DONE
- ✅ sendBookingConfirmation()
- ✅ sendTripInquiry() (BARU)
- ✅ sendInquiry()
- ✅ phoneNumber dari env variable

### 3. `src/pages/Trips.tsx` ✅ DONE
- ✅ API_BASE_URL declaration
- ✅ fetch(`${API_BASE_URL}/public/trips.php`)

### 4. `src/components/BookingSuccessDialog.tsx` ✅ DONE
- ✅ onWhatsAppClick prop
- ✅ handleWhatsApp function

---

## 🔄 FILE YANG PERLU DISESUAIKAN (TOTAL: 11 FILE)

### CARA CEPAT: Gunakan Script Otomatis

```bash
# Jalankan script auto-update
node update-api-urls.js
```

Script ini akan otomatis update **11 file** sekaligus:

1. ✅ `src/pages/AdminDashboard.tsx` (2 fetch)
2. ✅ `src/pages/AdminLogin.tsx` (1 fetch)
3. ✅ `src/pages/BookingForm.tsx` (1 fetch)
4. ✅ `src/pages/BookingManagement.tsx` (5 fetch)
5. ✅ `src/pages/BookingDetail.tsx` (1 fetch)
6. ✅ `src/pages/Browse.tsx` (1 fetch)
7. ✅ `src/pages/EquipmentDetail.tsx` (1 fetch)
8. ✅ `src/pages/EquipmentManagement.tsx` (6 fetch)
9. ✅ `src/pages/TripDetailPage.tsx` (1 fetch)
10. ✅ `src/pages/TambahEquipment.tsx` (1 fetch)
11. ✅ `src/pages/TripForm.tsx` (1 fetch)

**Total: 21 fetch() yang akan diupdate otomatis!**

---

## 🚀 LANGKAH DEPLOYMENT

### STEP 1: Update Semua File API URLs

```bash
# OPSI A: Otomatis (RECOMMENDED)
node update-api-urls.js

# OPSI B: Manual (satu per satu, lihat detail di bawah)
```

---

### STEP 2: Test Build

```bash
npm run build
```

**Jika ERROR:**
- Screenshot error-nya
- Fix error
- Build lagi

**Jika SUCCESS:**
- Lanjut STEP 3

---

### STEP 3: Deploy ke Vercel

```bash
# Commit changes
git add .
git commit -m "Update all API URLs for production deployment"

# Deploy production
vercel --prod
```

---

### STEP 4: Setup Backend (InfinityFree)

1. **Daftar InfinityFree:**
   - https://infinityfree.com
   - Sign up dengan email Google
   - Verify email
   - Create website

2. **Upload PHP Files:**
   - cPanel → File Manager
   - Upload folder `api/` ke `public_html/api/`

3. **Setup Database:**
   - cPanel → MySQL Databases
   - Create database & user
   - phpMyAdmin → Import SQL
   - Update `config/database.php`:
     ```php
     $host = 'sql123.byethost.com';
     $dbname = 'epiz_XXXXX_kuala_outdoor';
     $username = 'epiz_XXXXX';
     $password = 'your_password';
     ```

4. **Test API:**
   - Buka: https://yourusername.great-site.net/api/public/trips.php
   - Should return JSON

---

### STEP 5: Update Environment Variables di Vercel

1. **Buka Vercel Dashboard:**
   - https://vercel.com/naufalzakwans-projects/pbl-kelana-outdoor/settings

2. **Settings → Environment Variables**

3. **Add/Update:**
   ```
   Name: VITE_API_URL
   Value: https://yourusername.great-site.net/api
   
   Name: VITE_WHATSAPP_NUMBER
   Value: 6281234567890 (nomor WA asli Kuala Outdoor)
   ```

4. **Redeploy:**
   - Deployments → Latest → ... → Redeploy

---

## 📊 SUMMARY FILE CHANGES

```
✅ SUDAH UPDATE:
├── .env.production
├── src/hooks/useWhatsApp.ts
├── src/pages/Trips.tsx
└── src/components/BookingSuccessDialog.tsx

🔄 AKAN DIUPDATE OLEH SCRIPT:
├── src/pages/AdminDashboard.tsx
├── src/pages/AdminLogin.tsx
├── src/pages/BookingForm.tsx
├── src/pages/BookingManagement.tsx
├── src/pages/BookingDetail.tsx
├── src/pages/Browse.tsx
├── src/pages/EquipmentDetail.tsx
├── src/pages/EquipmentManagement.tsx
├── src/pages/TripDetailPage.tsx
├── src/pages/TambahEquipment.tsx
└── src/pages/TripForm.tsx

📝 SCRIPT HELPER:
└── update-api-urls.js (untuk auto-update)
```

---

## 🎯 QUICK START

```bash
# 1. Run auto-update script
node update-api-urls.js

# 2. Test build
npm run build

# 3. Deploy
git add .
git commit -m "Production ready: Update all API URLs"
vercel --prod

# Done! ✅
```

---

## ⚠️ JIKA ADA ERROR

### Error: "module not found"
```bash
npm install
npm run build
```

### Error: "fetch failed"
- Backend belum deploy (normal)
- Dashboard akan error sampai backend ready
- Deploy backend dulu (InfinityFree)

### Error: "environment variable undefined"
- Tambahkan di Vercel Dashboard
- Settings → Environment Variables
- Add: VITE_API_URL & VITE_WHATSAPP_NUMBER
- Redeploy

---

## 📱 TESTING CHECKLIST

### Frontend (Vercel):
- [ ] Homepage load
- [ ] Browse equipment page
- [ ] Equipment detail page
- [ ] Trips page
- [ ] Admin login
- [ ] Admin dashboard (akan error sampai backend ready)

### Backend (InfinityFree):
- [ ] API endpoint accessible
- [ ] Database connected
- [ ] trips.php returns JSON
- [ ] equipment.php returns JSON
- [ ] bookings.php returns JSON

---

## 🔗 USEFUL LINKS

- **Frontend:** https://pbl-kelana-outdoor-ifkuyyj67-naufalzakwans-projects.vercel.app
- **Vercel Dashboard:** https://vercel.com/naufalzakwans-projects/pbl-kelana-outdoor
- **InfinityFree:** https://infinityfree.com
- **Repository:** https://github.com/levinackerman1315-commits/PBL---KUALA---OUTDOOR

---

**Status:** 🟡 Ready untuk update API URLs dan deploy!
**Next Action:** Run `node update-api-urls.js`
