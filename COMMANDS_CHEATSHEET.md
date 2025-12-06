# 🚀 LANGKAH DEPLOYMENT - COPY PASTE COMMANDS

## STEP 1: Build dan Deploy Otomatis
Jalankan script ini untuk build dan push ke GitHub:

```bash
deploy-production.bat
```

Atau manual:

```bash
# 1. Update semua URL
node update-to-railway.js

# 2. Install dependencies
npm install

# 3. Build production
npm run build

# 4. Commit dan push
git add .
git commit -m "Production: Railway + Vercel migration complete"
git push origin master
```

---

## STEP 2: Deploy ke Railway (Backend)

### Option A: Auto-Deploy (Recommended)
Railway akan auto-deploy ketika Anda push ke GitHub.

**Check deployment status:**
1. Buka: https://railway.app/dashboard
2. Pilih project: `pbl-kuala-outdoor-production`
3. Lihat deployment progress

### Option B: Manual Deploy
Jika Railway belum connect ke GitHub:

1. Buka: https://railway.app/dashboard
2. Click "New Project"
3. "Deploy from GitHub repo"
4. Pilih: `levinackerman1315-commits/PBL---KUALA---OUTDOOR`
5. Railway akan auto-detect dan deploy

### Set Environment Variables (PENTING!)
1. Di Railway Dashboard, pilih project
2. Klik "Variables"
3. Tambahkan MySQL variables (Railway auto-inject jika pakai MySQL plugin)

```env
MYSQLHOST=containers-us-west-xxx.railway.app
MYSQLPORT=xxxx
MYSQLDATABASE=railway
MYSQLUSER=root
MYSQLPASSWORD=xxxxx
```

### Test Backend API
```bash
curl https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php
```

Expected: JSON array of equipment

---

## STEP 3: Deploy ke Vercel (Frontend)

### Option A: Auto-Deploy (Recommended)
Vercel akan auto-deploy ketika Anda push ke GitHub.

**Check deployment status:**
1. Buka: https://vercel.com/dashboard
2. Pilih project: `pbl-kuala-outdoor`
3. Lihat deployment progress

### Option B: Manual Deploy via CLI
```bash
# Install Vercel CLI (jika belum)
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Set Environment Variables (PENTING!)
1. Di Vercel Dashboard, pilih project
2. Settings → Environment Variables
3. Tambahkan semua VITE_* variables untuk **Production, Preview, dan Development**:

```env
VITE_API_URL=https://pbl-kuala-outdoor-production.up.railway.app/api
VITE_GOOGLE_CLIENT_ID=674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com
VITE_SUPABASE_URL=https://ffqhbvzlwubrcqddqoxq.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcWhidnpsd3VicmNxZGRxb3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NTQzMDgsImV4cCI6MjA3NjMzMDMwOH0.TvXgJsYsGi3nLlZGTfkX8mrfJZIQVwVNhoxpoBEm4OY
VITE_WHATSAPP_NUMBER=6281234567890
```

4. **PENTING:** Setelah add variables, klik "Redeploy" di Deployments tab!

### Test Frontend
```bash
curl -I https://pbl-kuala-outdoor.vercel.app
```

Expected: 200 OK

---

## STEP 4: Update Google OAuth

### 1. Buka Google Cloud Console
```
https://console.cloud.google.com/apis/credentials
```

### 2. Cari dan Edit OAuth 2.0 Client ID
- Cari Client ID: `674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n`
- Klik untuk edit

### 3. Authorized JavaScript origins
Tambahkan (paste langsung):
```
https://pbl-kuala-outdoor.vercel.app
```

### 4. Authorized redirect URIs
Tambahkan (paste langsung):
```
https://pbl-kuala-outdoor.vercel.app/auth
https://pbl-kuala-outdoor.vercel.app/
```

### 5. SAVE
- Klik **SAVE** di bawah
- **Tunggu 5-10 menit** untuk changes propagate

---

## STEP 5: Test Semua Fitur

### Test 1: Website Loading
```bash
# Buka di browser:
https://pbl-kuala-outdoor.vercel.app
```

Checklist:
- [ ] Homepage loads
- [ ] Navbar muncul
- [ ] Images di homepage muncul

### Test 2: Browse Equipment
```bash
# Buka di browser:
https://pbl-kuala-outdoor.vercel.app/browse
```

Checklist:
- [ ] Equipment list muncul
- [ ] Images equipment muncul (dari Railway)
- [ ] Filter kategori works
- [ ] Search works

### Test 3: Google Login
1. Klik "Login dengan Google"
2. Pilih Google account
3. Should redirect back ke website

Checklist:
- [ ] Google popup muncul
- [ ] No "redirect_uri_mismatch" error
- [ ] Berhasil login
- [ ] User name muncul di header

### Test 4: Cart Functionality
1. Login dulu
2. Browse equipment
3. Klik "Add to Cart"

Checklist:
- [ ] Item masuk cart
- [ ] Cart icon shows count
- [ ] Cart page displays items
- [ ] Can update quantity
- [ ] Can remove items

### Test 5: Admin Functions (Jika Anda admin)

**Login as Admin:**
```bash
# Buka:
https://pbl-kuala-outdoor.vercel.app/admin/login
```

**Test Upload Equipment:**
1. Go to Equipment Management
2. Click "Tambah Equipment"
3. Fill form
4. Upload image
5. Submit

Checklist:
- [ ] Form appears
- [ ] Can upload image
- [ ] Equipment saved successfully
- [ ] Image displays in list

**Test Update Equipment:**
1. Go to Equipment Management
2. Click "Edit" on any equipment
3. Change name or upload new image
4. Submit

Checklist:
- [ ] Edit form appears with current data
- [ ] Can change fields
- [ ] Can upload new image
- [ ] Changes saved successfully

**Test Delete Equipment:**
1. Go to Equipment Management
2. Click "Delete" on any equipment
3. Confirm deletion

Checklist:
- [ ] Confirmation dialog appears
- [ ] Equipment deleted successfully
- [ ] Images also deleted

---

## STEP 6: Verify CORS

### Test CORS Headers
```bash
curl -I -X OPTIONS \
  -H "Origin: https://pbl-kuala-outdoor.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php
```

Expected response headers:
```
Access-Control-Allow-Origin: https://pbl-kuala-outdoor.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
```

---

## STEP 7: Monitor Deployment

### Railway Logs
```bash
# View in Railway Dashboard:
# 1. Go to: https://railway.app/dashboard
# 2. Select project: pbl-kuala-outdoor-production
# 3. Click "View Logs"

# Or use Railway CLI:
railway logs --follow
```

### Vercel Logs
```bash
# View in Vercel Dashboard:
# 1. Go to: https://vercel.com/dashboard
# 2. Select project: pbl-kuala-outdoor
# 3. Click latest deployment
# 4. Click "View Function Logs"

# Or use Vercel CLI:
vercel logs --follow
```

---

## 🚨 TROUBLESHOOTING COMMANDS

### Problem: Images tidak muncul
```bash
# Check if uploads folder exists in Railway
# Login to Railway project
railway shell

# Then in shell:
ls -la uploads/
ls -la uploads/equipment/

# If not exist, create:
mkdir -p uploads/equipment
chmod 755 uploads/equipment
```

### Problem: CORS error
```bash
# Test CORS manually:
curl -v -X OPTIONS \
  -H "Origin: https://pbl-kuala-outdoor.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  https://pbl-kuala-outdoor-production.up.railway.app/api/admin/equipment.php

# Should return 200 with CORS headers
```

### Problem: API tidak respond
```bash
# Test API directly:
curl -v https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php

# Check Railway deployment status:
railway status

# Check Railway logs:
railway logs --tail 100
```

### Problem: Environment variables tidak work
```bash
# Vercel: Force redeploy after adding variables
vercel --prod --force

# Railway: Redeploy project
# (via dashboard or push empty commit)
git commit --allow-empty -m "Trigger redeploy"
git push origin master
```

---

## ✅ SUCCESS CHECKLIST

Deployment berhasil jika:

- [ ] ✅ Frontend loads: https://pbl-kuala-outdoor.vercel.app
- [ ] ✅ Backend API responds: https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php
- [ ] ✅ Equipment images load
- [ ] ✅ Google login works
- [ ] ✅ Can add to cart
- [ ] ✅ Admin can upload equipment
- [ ] ✅ Admin can update equipment
- [ ] ✅ Admin can delete equipment
- [ ] ✅ No CORS errors in console
- [ ] ✅ Mobile responsive works

---

## 📞 QUICK LINKS

| Service | URL |
|---------|-----|
| **Frontend** | https://pbl-kuala-outdoor.vercel.app |
| **Backend API** | https://pbl-kuala-outdoor-production.up.railway.app/api |
| **Equipment API** | https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php |
| **Railway Dashboard** | https://railway.app/dashboard |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Google Console** | https://console.cloud.google.com/apis/credentials |

---

## 📚 DOCUMENTATION

| File | Purpose |
|------|---------|
| `MIGRATION_SUMMARY.md` | Overview lengkap semua changes |
| `README_DEPLOYMENT_RAILWAY.md` | Detailed deployment guide |
| `GOOGLE_OAUTH_RAILWAY_SETUP.md` | Google OAuth setup |
| `COMMANDS_CHEATSHEET.md` | This file - quick commands |

---

**🎉 Selamat Deploy! 🚀**

Jika ada masalah, cek:
1. Browser Console (F12)
2. Network tab
3. Railway logs
4. Vercel logs
