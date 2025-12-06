# 🚀 Clean Deployment Guide - Master Branch

## ✅ Status Saat Ini

### Branch Naufal - ✅ READY FOR PRODUCTION
- [x] Semua PHP backend files sudah di-solve (68 files checked, 29 fixed)
- [x] Semua frontend hardcoded localhost URLs sudah dihapus (5 files fixed)
- [x] Environment variables sudah dikonfigurasi (.env.production ready)
- [x] Build configuration verified (vite.config.ts, package.json)
- [x] No syntax errors, no warnings
- [x] Backend API tested and working
- [x] All commits pushed to origin/Naufal

### Commits Ready to Deploy:
```
a07e95c - fix: remove all hardcoded localhost URLs for production deployment
1af5e62 - fix: use environment variable for API URL in production
10c4b2a - (previous backend fixes)
```

---

## 🎯 Opsi Deployment

### **Opsi 1: Deploy dari Branch Naufal (RECOMMENDED)**
Vercel bisa deploy dari branch Naufal langsung tanpa merge ke master.

**Keuntungan:**
- ✅ Tidak perlu merge (avoid conflicts)
- ✅ Lebih cepat
- ✅ Master tetap bersih
- ✅ Bisa test production sebelum merge

**Langkah:**
1. Set environment variables di Vercel (WAJIB)
2. Vercel akan auto-deploy dari branch Naufal
3. Setelah verified working, baru merge ke master

---

### **Opsi 2: Merge ke Master Dulu**
Merge semua fixes ke master branch kemudian deploy.

**Keuntungan:**
- ✅ Master branch up-to-date
- ✅ Clean deployment history
- ✅ All team members dapat latest code

**Resiko:**
- ⚠️ Possible merge conflicts jika ada perubahan di master
- ⚠️ Butuh resolve conflicts manual

---

## 📋 RECOMMENDED: Deploy dari Branch Naufal

### Step 1: Vercel Environment Variables (WAJIB)

Pergi ke: **https://vercel.com/dashboard**
1. Pilih project: **pbl-kelana-outdoor**
2. Klik tab: **Settings**
3. Sidebar: **Environment Variables**
4. Klik: **Add New**

**Tambahkan Variable Ini (Copy-Paste):**

#### Variable 1 (WAJIB):
```
Key         : VITE_API_URL
Value       : https://kualaoutdoor.free.nf/api/public
Environment : ✅ Production ✅ Preview ✅ Development
```

#### Variable 2:
```
Key         : VITE_WHATSAPP_NUMBER
Value       : 6281234567890
Environment : ✅ Production ✅ Preview ✅ Development
```

#### Variable 3 (Supabase):
```
Key         : VITE_SUPABASE_PROJECT_ID
Value       : ffqhbvzlwubrcqddqoxq
Environment : ✅ Production ✅ Preview ✅ Development
```

#### Variable 4 (Supabase):
```
Key         : VITE_SUPABASE_PUBLISHABLE_KEY
Value       : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcWhidnpsd3VicmNxZGRxb3hxIiwicm9zZSI6ImFub24iLCJpYXQiOjE3NjA3NTQzMDgsImV4cCI6MjA3NjMzMDMwOH0.TvXgJsYsGi3nLlZGTfkX8mrfJZIQVwVNhoxpoBEm4OY
Environment : ✅ Production ✅ Preview ✅ Development
```

#### Variable 5 (Supabase):
```
Key         : VITE_SUPABASE_URL
Value       : https://ffqhbvzlwubrcqddqoxq.supabase.co
Environment : ✅ Production ✅ Preview ✅ Development
```

#### Variable 6 (Google OAuth):
```
Key         : VITE_GOOGLE_CLIENT_ID
Value       : 674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com
Environment : ✅ Production ✅ Preview ✅ Development
```

**Klik Save setelah setiap variable!**

---

### Step 2: Trigger Clean Redeploy

Setelah semua environment variables di-set:

#### Cara A: Auto Redeploy (Sudah Jalan)
- Vercel sudah auto-deploy setelah push ke branch Naufal
- Cek tab **Deployments** untuk melihat progress
- Tunggu sampai status **"Ready"** (✅)

#### Cara B: Manual Redeploy (Jika Perlu)
1. Tab **"Deployments"**
2. Klik **"..."** (3 titik) di deployment paling atas
3. Pilih **"Redeploy"**
4. Klik **"Redeploy"** lagi untuk konfirmasi

---

### Step 3: Verify Deployment

#### 3.1 Cek Build Logs
- Tab **"Deployments"** → Klik deployment teratas
- Scroll ke **"Build Logs"**
- Pastikan tidak ada error
- Tunggu "✅ Built in XXs" muncul

#### 3.2 Test Production URL
Buka: **https://pbl-kuala-outdoor.vercel.app/**

**Yang Harus Muncul:**
- ✅ Homepage loads tanpa error
- ✅ Equipment catalog terlihat
- ✅ Tidak ada "Database Error: Failed to fetch"
- ✅ Data dari backend InfinityFree muncul

#### 3.3 Test Backend Connection
Buka browser console (F12) dan check:
```javascript
// Seharusnya tidak ada error fetch
// Seharusnya ada data equipment muncul
```

Direct test backend API:
```
https://kualaoutdoor.free.nf/api/public/equipment.php
```
Harus return JSON data equipment.

---

### Step 4: Test All Features

#### 4.1 Homepage
- [ ] Equipment catalog loads
- [ ] Images display
- [ ] Categories filter works
- [ ] Search works

#### 4.2 Trips Page
- [ ] Trip packages load
- [ ] Trip details show
- [ ] Can add to cart

#### 4.3 Authentication
- [ ] User registration works
- [ ] User login works
- [ ] Google OAuth (if enabled)

#### 4.4 Booking Flow
- [ ] Add to cart
- [ ] View cart
- [ ] Checkout process
- [ ] Payment confirmation

#### 4.5 Admin Panel
- [ ] Admin login
- [ ] View bookings
- [ ] Manage equipment
- [ ] Update status

---

## 🔄 Optional: Merge ke Master (Setelah Verified)

Jika deployment dari branch Naufal sudah **100% working**, baru merge ke master:

```bash
# 1. Switch ke master
git checkout master

# 2. Pull latest changes
git pull origin master

# 3. Merge Naufal ke master
git merge Naufal

# 4. Jika ada conflicts, resolve dulu
# Lihat file dengan conflicts:
git status

# Edit file yang conflict, pilih code yang benar
# Lalu:
git add .
git commit -m "resolve merge conflicts"

# 5. Push ke master
git push origin master
```

Vercel akan auto-deploy ulang dari master branch.

---

## 🚨 Troubleshooting

### Issue 1: Masih "Database Error: Failed to fetch"

**Diagnosa:**
```bash
# Cek apakah environment variables sudah set
# Di Vercel Dashboard → Settings → Environment Variables
# Pastikan VITE_API_URL ada dan valuenya:
# https://kualaoutdoor.free.nf/api/public
```

**Solution:**
1. Pastikan environment variables sudah di-save di Vercel
2. Manual redeploy (Deployments → ... → Redeploy)
3. Clear browser cache (Ctrl+Shift+R)

---

### Issue 2: Build Failed di Vercel

**Diagnosa:**
```bash
# Lihat Build Logs di Vercel Deployments tab
# Biasanya ada error message spesifik
```

**Common Errors & Solutions:**

**Error: "Module not found"**
```bash
# Solution: Check package.json dependencies
npm install
git add package-lock.json
git commit -m "fix: update dependencies"
git push origin Naufal
```

**Error: "TypeScript errors"**
```bash
# Solution: Check TypeScript compilation
npm run build

# Jika ada error, fix lalu commit
git add .
git commit -m "fix: resolve TypeScript errors"
git push origin Naufal
```

---

### Issue 3: CORS Error di Browser Console

**Diagnosa:**
```
Access to fetch at 'https://kualaoutdoor.free.nf/...' from origin 
'https://pbl-kuala-outdoor.vercel.app' has been blocked by CORS policy
```

**Solution:**
Backend PHP sudah ada CORS headers, tapi jika masih error:
1. Cek file `api/config/database.php` ada header CORS
2. Refresh page beberapa kali (InfinityFree kadang delay)
3. Test API langsung: https://kualaoutdoor.free.nf/api/public/equipment.php

---

### Issue 4: Environment Variables Tidak Terbaca

**Diagnosa:**
```javascript
// Di browser console (F12):
console.log(import.meta.env.VITE_API_URL)
// Output: undefined (❌ SALAH)
// Output: https://kualaoutdoor.free.nf/api/public (✅ BENAR)
```

**Solution:**
1. Pastikan variable name di Vercel **PERSIS**: `VITE_API_URL` (case-sensitive)
2. Pastikan environment dipilih: Production, Preview, Development
3. Manual redeploy setelah set variables
4. Wait 1-2 menit untuk propagation

---

## 📊 Expected Results

### ✅ Success Indicators:

**Vercel Dashboard:**
```
Status: ✅ Ready
Duration: ~20-30 seconds
Environment: Production
Source: Naufal (branch)
```

**Frontend URL:**
```
https://pbl-kuala-outdoor.vercel.app/
Status: 200 OK
Content: Homepage with equipment catalog
No errors in console
```

**Backend API:**
```
https://kualaoutdoor.free.nf/api/public/equipment.php
Status: 200 OK
Content-Type: application/json
Response: Array of equipment objects
```

**Browser Console (F12):**
```javascript
// No errors like:
// ❌ Failed to fetch
// ❌ CORS error
// ❌ Network error

// Should see:
// ✅ API calls successful
// ✅ Data loaded
// ✅ Components rendered
```

---

## 🎯 Quick Checklist

**Before Deployment:**
- [x] ✅ All code committed and pushed
- [x] ✅ No syntax errors in code
- [x] ✅ Backend API tested and working
- [x] ✅ .env.production file configured

**During Deployment:**
- [ ] ⏳ Environment variables set in Vercel
- [ ] ⏳ Deployment triggered (auto or manual)
- [ ] ⏳ Build completed successfully
- [ ] ⏳ Status shows "Ready"

**After Deployment:**
- [ ] ⏳ Frontend URL accessible
- [ ] ⏳ No "Database Error" shown
- [ ] ⏳ Equipment catalog loads
- [ ] ⏳ All features tested
- [ ] ⏳ No console errors

---

## 📞 Next Steps

### Immediate (WAJIB):
1. **Set environment variables di Vercel** (5 menit)
2. **Tunggu auto-redeploy selesai** (1-3 menit)
3. **Test frontend URL** (1 menit)

### After Success:
4. **Test all features** (10-15 menit)
5. **Optional: Merge ke master** (jika semua OK)
6. **Upload images** ke InfinityFree (optional)
7. **Full integration testing** (booking flow, payments, etc)

---

## 🎉 Deployment Success Criteria

Anda berhasil jika:
- ✅ Frontend URL loads tanpa error
- ✅ Equipment data muncul dari backend
- ✅ User bisa register & login
- ✅ Booking flow works end-to-end
- ✅ Admin panel accessible
- ✅ No console errors

---

**Created:** December 6, 2025  
**Branch:** Naufal (Ready for production)  
**Backend:** ✅ Working on InfinityFree  
**Frontend:** ⏳ Waiting for Vercel env vars + redeploy  

**Status:** 🚀 READY TO DEPLOY - Just set env vars and wait!
