# 🚀 DEPLOYMENT GUIDE - RAILWAY + VERCEL

**Last Updated:** December 6, 2025  
**Status:** ✅ Ready for Production

---

## 📊 ARCHITECTURE

```
┌─────────────────────────────────────────────────────┐
│                     USER                             │
│            (https://pbl-kuala-outdoor.vercel.app)    │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │   VERCEL FRONTEND    │
          │   (React + Vite)     │
          │   Static Site        │
          └──────────┬───────────┘
                     │
                     │ API Calls
                     ▼
          ┌──────────────────────┐
          │   RAILWAY BACKEND    │
          │   (PHP + MySQL)      │
          │   RESTful API        │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │   MYSQL DATABASE     │
          │   (Railway MySQL)    │
          └──────────────────────┘
```

---

## 🌐 DEPLOYMENT URLS

| Service | URL | Status |
|---------|-----|--------|
| **Frontend (Vercel)** | https://pbl-kuala-outdoor.vercel.app | ✅ Live |
| **Backend (Railway)** | https://pbl-kuala-outdoor-production.up.railway.app | ✅ Live |
| **API Endpoint** | https://pbl-kuala-outdoor-production.up.railway.app/api | ✅ Live |
| **Database** | Railway MySQL (Private) | ✅ Live |

---

## ✅ COMPLETED MIGRATIONS

### 1. URL Updates (InfinityFree → Railway)
- [x] Updated `.env.production` with Railway URL
- [x] Updated 15 frontend files with new API URL
- [x] Updated backend PHP files with dynamic URL handling
- [x] Created migration script: `update-to-railway.js`

### 2. CORS Configuration
- [x] Created shared CORS config: `api/config/cors.php`
- [x] Configured allowed origins (Vercel + localhost)
- [x] Added preflight OPTIONS handling

### 3. Backend Updates
- [x] Fixed image URL generation in `api/public/equipment.php`
- [x] Fixed image URL generation in `api/admin/equipment.php`
- [x] Updated upload handlers to use Railway URLs

---

## 🔧 DEPLOYMENT STEPS

### STEP 1: Deploy Backend to Railway

#### 1.1 Push Code to GitHub
```bash
git add .
git commit -m "Migration: InfinityFree → Railway + Vercel"
git push origin master
```

#### 1.2 Connect Railway to GitHub
1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose: `levinackerman1315-commits/PBL---KUALA---OUTDOOR`
5. Railway will auto-detect PHP project

#### 1.3 Set Environment Variables in Railway
Go to **Settings → Variables** and add:

```env
# MySQL Database (Railway will provide these)
MYSQLHOST=containers-us-west-xxx.railway.app
MYSQLPORT=7267
MYSQLDATABASE=railway
MYSQLUSER=root
MYSQLPASSWORD=xxxxx

# OR use Railway MySQL Plugin
# Railway will auto-inject these variables if you add MySQL service
```

#### 1.4 Add MySQL Service
1. In Railway dashboard, click "+ New"
2. Select "Database" → "Add MySQL"
3. Railway will create and connect database automatically
4. Environment variables will be auto-injected

#### 1.5 Deploy
```bash
# Railway will auto-deploy when you push to GitHub
# Or trigger manual deploy in Railway dashboard
```

#### 1.6 Verify Backend
Test API endpoints:
```bash
# Equipment endpoint
curl https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php

# Expected: JSON array of equipment
```

---

### STEP 2: Deploy Frontend to Vercel

#### 2.1 Build Project Locally (Optional test)
```bash
npm install
npm run build

# Test production build locally
npm run preview
```

#### 2.2 Connect Vercel to GitHub
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import Git Repository: `levinackerman1315-commits/PBL---KUALA---OUTDOOR`
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

#### 2.3 Set Environment Variables in Vercel
Go to **Settings → Environment Variables**:

```env
VITE_API_URL=https://pbl-kuala-outdoor-production.up.railway.app/api
VITE_GOOGLE_CLIENT_ID=674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com
VITE_SUPABASE_URL=https://ffqhbvzlwubrcqddqoxq.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcWhidnpsd3VicmNxZGRxb3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NTQzMDgsImV4cCI6MjA3NjMzMDMwOH0.TvXgJsYsGi3nLlZGTfkX8mrfJZIQVwVNhoxpoBEm4OY
VITE_WHATSAPP_NUMBER=6281234567890
```

**IMPORTANT:** Set these for **Production**, **Preview**, and **Development** environments!

#### 2.4 Deploy
```bash
# Vercel will auto-deploy when you push to GitHub
# Or use Vercel CLI:
vercel --prod
```

#### 2.5 Verify Frontend
1. Open: https://pbl-kuala-outdoor.vercel.app
2. Check:
   - Homepage loads
   - Browse page shows equipment
   - Images display correctly
   - Login button works

---

### STEP 3: Configure Google OAuth

#### 3.1 Open Google Cloud Console
```
https://console.cloud.google.com/apis/credentials
```

#### 3.2 Edit OAuth 2.0 Client ID

**Authorized JavaScript origins:**
```
http://localhost:5173
https://pbl-kuala-outdoor.vercel.app
```

**Authorized redirect URIs:**
```
http://localhost:5173/auth
http://localhost:5173/
https://pbl-kuala-outdoor.vercel.app/auth
https://pbl-kuala-outdoor.vercel.app/
```

#### 3.3 Save and Wait
- Click **SAVE**
- Wait 5-10 minutes for changes to propagate

---

## 🧪 TESTING CHECKLIST

### Frontend Tests
- [ ] Website loads: https://pbl-kuala-outdoor.vercel.app
- [ ] Homepage displays correctly
- [ ] Browse page shows equipment list
- [ ] Equipment images load
- [ ] Navigation works (Home, Browse, Packages, Trips)
- [ ] Mobile responsive

### Backend API Tests
```bash
# Test equipment endpoint
curl https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php

# Test trips endpoint  
curl https://pbl-kuala-outdoor-production.up.railway.app/api/public/trips.php

# Test packages endpoint
curl https://pbl-kuala-outdoor-production.up.railway.app/api/public/packages.php
```

Expected: JSON response with data, no CORS errors

### Authentication Tests
- [ ] Click "Login dengan Google"
- [ ] Google popup appears
- [ ] Can select Google account
- [ ] No redirect_uri_mismatch error
- [ ] Redirects back to website after login
- [ ] User profile appears in header
- [ ] Session persists after page refresh

### Admin Tests (If admin user)
- [ ] Can access admin dashboard
- [ ] Equipment list loads
- [ ] Can add new equipment
- [ ] Can upload images
- [ ] Can update equipment
- [ ] Can delete equipment
- [ ] Images display in equipment list

### Cart & Booking Tests
- [ ] Can add items to cart
- [ ] Cart icon shows count
- [ ] Cart page displays items
- [ ] Can update quantities
- [ ] Can remove items
- [ ] Can proceed to booking
- [ ] Booking form works
- [ ] Can upload payment proof

---

## 🚨 TROUBLESHOOTING

### Problem 1: "Failed to fetch" or CORS errors

**Symptoms:**
- Console shows: `Access to fetch blocked by CORS policy`
- API calls fail from Vercel but work from localhost

**Solution:**
1. Check CORS headers in Railway backend
2. Verify `api/config/cors.php` is included in all endpoints
3. Check Railway deployment logs for PHP errors
4. Redeploy Railway

**Test CORS:**
```bash
curl -I -X OPTIONS \
  -H "Origin: https://pbl-kuala-outdoor.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php
```

Expected headers:
```
Access-Control-Allow-Origin: https://pbl-kuala-outdoor.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

---

### Problem 2: Images not loading

**Symptoms:**
- Broken image icons
- 404 errors for image URLs

**Solution:**
1. Check if `uploads/` folder exists in Railway
2. Check image paths in database (should be `/uploads/equipment/filename.jpg`)
3. Verify Railway is serving static files

**Upload images to Railway:**
```bash
# Commit and push uploads folder
git add uploads/
git commit -m "Add equipment images"
git push origin master
```

---

### Problem 3: "redirect_uri_mismatch" on Google Login

**Symptoms:**
- Error after clicking "Login dengan Google"
- Redirect URI mismatch error page

**Solution:**
1. Go to Google Cloud Console
2. Add Vercel domain to Authorized redirect URIs
3. Make sure URLs match EXACTLY (https, no trailing slash issues)
4. Wait 5-10 minutes after saving

---

### Problem 4: Environment variables not working

**Symptoms:**
- `import.meta.env.VITE_API_URL` is undefined
- Using fallback URLs

**Solution:**

**For Vercel:**
1. Settings → Environment Variables
2. Add all VITE_* variables
3. **IMPORTANT:** Redeploy after adding variables
4. Vercel CLI: `vercel --prod --force`

**For Railway:**
1. Settings → Variables
2. Add MYSQL* variables
3. Restart deployment

---

### Problem 5: Upload gagal

**Symptoms:**
- "Failed to upload image" error
- 500 error on upload endpoint

**Solution:**
1. Check Railway logs
2. Verify folders exist and writable:
```bash
# In Railway console:
ls -la uploads/
chmod 755 uploads/equipment
```

3. Check PHP error logs
4. Verify database connection in upload handler

---

## 📊 MONITORING

### Railway Logs
```bash
# View live logs in Railway dashboard
# Or use Railway CLI:
railway logs
```

### Vercel Logs
```bash
# View in Vercel dashboard → Deployments → Select deployment → Logs

# Or use Vercel CLI:
vercel logs
```

### Database
```bash
# Connect to Railway MySQL:
railway connect mysql

# Or use MySQL client with Railway credentials
```

---

## 🔄 REDEPLOYMENT

### Quick Redeploy (After code changes)

```bash
# 1. Commit changes
git add .
git commit -m "Fix: your changes here"
git push origin master

# 2. Wait for auto-deployment
# Railway: Auto-deploys on push (check dashboard)
# Vercel: Auto-deploys on push (check dashboard)

# 3. Verify deployment
# Check Railway: https://railway.app/dashboard
# Check Vercel: https://vercel.com/dashboard
```

### Force Redeploy (No code changes)

**Vercel:**
```bash
vercel --prod --force
```

**Railway:**
- Dashboard → Click "Deploy" button
- Or push empty commit:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin master
```

---

## 📋 MAINTENANCE CHECKLIST

### Weekly
- [ ] Check Railway usage (bandwidth, database size)
- [ ] Check Vercel analytics
- [ ] Review error logs
- [ ] Test critical flows (login, checkout, admin)

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Review and rotate API keys if needed
- [ ] Backup database
- [ ] Check disk space usage in Railway

### Quarterly
- [ ] Review and optimize database queries
- [ ] Cleanup old images/files
- [ ] Security audit
- [ ] Performance optimization

---

## 🎯 SUCCESS METRICS

### ✅ Deployment Successful If:
1. Frontend loads without errors
2. Equipment browsing works
3. Images display correctly
4. Google OAuth login works
5. Admin can upload/update equipment
6. Cart and booking flows work
7. No CORS errors in console
8. Mobile responsive works

---

## 📞 SUPPORT

### Documentation
- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Google OAuth:** https://developers.google.com/identity/protocols/oauth2

### Project Files
- Deployment Guide: `README_DEPLOYMENT_RAILWAY.md`
- OAuth Setup: `GOOGLE_OAUTH_RAILWAY_SETUP.md`
- Migration Script: `update-to-railway.js`
- Railway Setup: `railway-setup.sh`

---

**🎉 Selamat! Your app is now live on Railway + Vercel! 🎉**

Next steps:
1. ✅ Test all features
2. ✅ Update Google OAuth
3. ✅ Share the link: https://pbl-kuala-outdoor.vercel.app
4. 🚀 Monitor and optimize!
