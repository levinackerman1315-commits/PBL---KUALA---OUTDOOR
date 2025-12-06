# 🔐 GOOGLE OAUTH SETUP UNTUK VERCEL & RAILWAY

## CURRENT SETUP
- **Frontend (Vercel):** https://pbl-kuala-outdoor.vercel.app
- **Backend (Railway):** https://pbl-kuala-outdoor-production.up.railway.app
- **Google Client ID:** 674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com

---

## ✅ STEP 1: Update Google Cloud Console

### 1. Buka Google Cloud Console
```
https://console.cloud.google.com/apis/credentials
```

### 2. Pilih Project Anda
- Cari project yang menggunakan Client ID: `674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n`

### 3. Klik OAuth 2.0 Client IDs
- Cari "Web client" atau Client ID yang sedang digunakan
- Klik untuk Edit

### 4. Update Authorized JavaScript origins
Tambahkan domain Vercel:
```
https://pbl-kuala-outdoor.vercel.app
```

**List lengkap yang harus ada:**
- `http://localhost:5173` (development)
- `http://localhost:3000` (backup development)
- `https://pbl-kuala-outdoor.vercel.app` (production)

### 5. Update Authorized redirect URIs
Tambahkan redirect URL Vercel:
```
https://pbl-kuala-outdoor.vercel.app/auth
https://pbl-kuala-outdoor.vercel.app/
```

**List lengkap yang harus ada:**
- `http://localhost:5173/auth` (development)
- `http://localhost:5173/` (development)
- `http://localhost:3000/auth` (backup)
- `http://localhost:3000/` (backup)
- `https://pbl-kuala-outdoor.vercel.app/auth` (production)
- `https://pbl-kuala-outdoor.vercel.app/` (production)

### 6. SAVE CHANGES
- Klik **SAVE** di bagian bawah
- Tunggu beberapa detik untuk changes propagate

---

## ✅ STEP 2: Verify Environment Variables

### Vercel Dashboard
1. Buka: https://vercel.com/dashboard
2. Pilih project: `pbl-kuala-outdoor`
3. Settings → Environment Variables
4. Pastikan ada:

```env
VITE_API_URL=https://pbl-kuala-outdoor-production.up.railway.app/api
VITE_GOOGLE_CLIENT_ID=674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com
VITE_SUPABASE_URL=https://ffqhbvzlwubrcqddqoxq.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcWhidnpsd3VicmNxZGRxb3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NTQzMDgsImV4cCI6MjA3NjMzMDMwOH0.TvXgJsYsGi3nLlZGTfkX8mrfJZIQVwVNhoxpoBEm4OY
```

5. **IMPORTANT:** Setelah update environment variables, harus **REDEPLOY**!

---

## ✅ STEP 3: Update Railway CORS Settings

### Check File: `api/config/database.php` atau CORS headers di semua endpoint

Pastikan CORS headers di Railway backend mengizinkan Vercel domain:

```php
header("Access-Control-Allow-Origin: *");  // Atau spesifik ke Vercel
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
```

**ATAU lebih aman (spesifik ke Vercel):**

```php
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://pbl-kuala-outdoor.vercel.app'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *"); // Fallback
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
```

---

## ✅ STEP 4: Test OAuth Flow

### 1. Buka Browser (Incognito/Private)
```
https://pbl-kuala-outdoor.vercel.app
```

### 2. Klik "Login dengan Google"

### 3. Pilih Google Account

### 4. Expected Result:
```
✅ Login berhasil
✅ Redirect ke homepage/dashboard
✅ User data tersimpan di Supabase
✅ Session tersimpan di localStorage
```

### 5. Common Errors & Solutions:

#### Error: "redirect_uri_mismatch"
**Solution:**
- Pastikan redirect URI sudah ditambahkan di Google Console
- Cek typo di URL (https vs http, trailing slash)

#### Error: "origin not allowed"
**Solution:**
- Tambahkan domain Vercel di "Authorized JavaScript origins"

#### Error: "Access to fetch blocked by CORS"
**Solution:**
- Update CORS headers di Railway backend
- Deploy ulang Railway

---

## ✅ STEP 5: Deploy & Test

### Deploy Frontend ke Vercel
```bash
# Option 1: Auto deploy via Git push
git add .
git commit -m "Update: Railway API URLs & OAuth config"
git push origin master

# Option 2: Manual deploy via Vercel CLI
vercel --prod
```

### Deploy Backend ke Railway
```bash
# Railway auto-deploys dari Git
# Pastikan file sudah di-push ke GitHub

# Atau trigger manual di Railway Dashboard:
# 1. Buka https://railway.app/dashboard
# 2. Pilih project: pbl-kuala-outdoor-production
# 3. Klik "Deploy" → "Redeploy"
```

---

## ✅ STEP 6: Verification Checklist

### Frontend (Vercel)
- [ ] Website loading: https://pbl-kuala-outdoor.vercel.app
- [ ] Browse page shows equipment
- [ ] Images loading dari Railway
- [ ] Login button visible
- [ ] Click "Login dengan Google" opens Google popup

### Google OAuth
- [ ] Google login popup appears
- [ ] Can select Google account
- [ ] No "redirect_uri_mismatch" error
- [ ] No "origin not allowed" error
- [ ] Successfully redirects back to website

### Backend (Railway)
- [ ] API responding: https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php
- [ ] CORS headers present in response
- [ ] Images accessible: https://pbl-kuala-outdoor-production.up.railway.app/uploads/equipment/...

### After Login
- [ ] User data saved in Supabase
- [ ] Session persists after page refresh
- [ ] Can access protected routes (cart, profile)
- [ ] Can add items to cart
- [ ] Can upload images (admin)
- [ ] Can update equipment (admin)

---

## 🚨 TROUBLESHOOTING

### Issue: Images tidak tampil
**Check:**
1. Apakah folder `uploads/` ada di Railway?
2. Apakah path di database benar? (harus `/uploads/equipment/filename.jpg`)
3. Apakah Railway serving static files?

**Solution:**
- Upload folder `uploads/` ke Railway via Git
- Pastikan Railway config serve static files (sudah OK jika pakai `php -S`)

### Issue: Upload gagal
**Check:**
1. Apakah folder `uploads/equipment/` writable?
2. Apakah API endpoint `/api/upload/multi_image.php` working?
3. Check Railway logs

**Solution:**
```bash
# Railway console/SSH:
chmod 755 /app/uploads
chmod 755 /app/uploads/equipment
```

### Issue: CORS error saat upload
**Check:**
- CORS headers di `api/upload/multi_image.php`
- Railway environment variables

**Solution:**
- Pastikan semua PHP files punya CORS headers yang benar
- Restart Railway deployment

---

## 📋 SUMMARY CHECKLIST

### ✅ Completed:
- [x] Update .env.production with Railway URL
- [x] Update all frontend files (15 files) with Railway API URL
- [x] Update backend PHP files with dynamic Railway URL
- [x] Create migration script (update-to-railway.js)

### 🔄 TODO (BY YOU):
- [ ] Update Google Cloud Console OAuth settings
- [ ] Add Vercel domain to Authorized JavaScript origins
- [ ] Add Vercel redirect URIs
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway
- [ ] Test OAuth flow
- [ ] Test upload images
- [ ] Test update/delete equipment

---

## 🎯 FINAL VALIDATION

### Test Scenario 1: Browse Equipment
1. Open: https://pbl-kuala-outdoor.vercel.app/browse
2. Should see equipment list
3. Should see images loading

### Test Scenario 2: Login
1. Click "Login dengan Google"
2. Select Google account
3. Should redirect back to website
4. Should see user profile/name

### Test Scenario 3: Admin Upload (If admin)
1. Login as admin
2. Go to Equipment Management
3. Click "Tambah Equipment"
4. Fill form & upload image
5. Should upload successfully

### Test Scenario 4: Update Equipment (If admin)
1. Go to Equipment Management
2. Click "Edit" on any equipment
3. Change name or upload new image
4. Should update successfully

---

**Good luck! 🚀**

Jika ada error, cek:
1. Browser Console (F12)
2. Network tab untuk API calls
3. Railway logs
4. Vercel deployment logs
