# 🔥 FIX "FAILED TO FETCH" ERROR - VERCEL

## ✅ RAILWAY BACKEND STATUS: **WORKING!**

Test results menunjukkan Railway backend sudah berfungsi sempurna:
- ✅ All endpoints accessible
- ✅ CORS configured correctly
- ✅ Data returned successfully

---

## ❌ MASALAH: "Failed to fetch" di Vercel

Error ini terjadi karena **Vercel belum deploy dengan environment variables yang benar**.

---

## 🔧 SOLUSI LENGKAP:

### STEP 1: Pastikan Environment Variables di Vercel

1. **Buka Vercel Dashboard:**
   ```
   https://vercel.com/dashboard
   ```

2. **Pilih project:** `pbl-kuala-outdoor`

3. **Go to Settings → Environment Variables**

4. **ADD/UPDATE variables ini untuk PRODUCTION:**

   ```env
   VITE_API_URL=https://pbl-kuala-outdoor-production.up.railway.app/api
   VITE_GOOGLE_CLIENT_ID=674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com
   VITE_SUPABASE_URL=https://ffqhbvzlwubrcqddqoxq.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcWhidnpsd3VicmNxZGRxb3hxIiwicm9zZSI6ImFub24iLCJpYXQiOjE3NjA3NTQzMDgsImV4cCI6MjA3NjMzMDMwOH0.TvXgJsYsGi3nLlZGTfkX8mrfJZIQVwVNhoxpoBEm4OY
   VITE_WHATSAPP_NUMBER=6281234567890
   ```

5. **PENTING:** Pastikan environment dipilih untuk:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. **Setelah add variables, HARUS REDEPLOY!**

---

### STEP 2: Force Redeploy Vercel

Ada 2 cara:

#### **Option A: Via Vercel Dashboard**
1. Go to Deployments tab
2. Click "..." menu on latest deployment
3. Click "Redeploy"
4. Pilih "Use existing Build Cache: No"
5. Click "Redeploy"

#### **Option B: Via Git Push**
```bash
# Commit semua changes
git add .
git commit -m "Fix: Add Railway API URL and environment variables"
git push origin master

# Vercel akan auto-deploy
```

#### **Option C: Via Vercel CLI**
```bash
# Install Vercel CLI jika belum
npm i -g vercel

# Deploy
vercel --prod --force
```

---

### STEP 3: Clear Browser Cache

Setelah redeploy:

1. **Hard Refresh Browser:**
   - Chrome/Edge: `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)
   - Firefox: `Ctrl + F5`

2. **Or Open in Incognito/Private Mode:**
   - Chrome: `Ctrl + Shift + N`
   - Firefox: `Ctrl + Shift + P`

---

### STEP 4: Test Endpoints

Setelah redeploy, test:

```bash
# Test if environment variables loaded
1. Buka: https://pbl-kuala-outdoor.vercel.app
2. Open DevTools (F12)
3. Console tab
4. Type: import.meta.env.VITE_API_URL
5. Should show: https://pbl-kuala-outdoor-production.up.railway.app/api
```

---

## 🚨 COMMON ISSUES & FIXES:

### Issue 1: Environment Variables Not Loading

**Symptoms:**
- `import.meta.env.VITE_API_URL` is `undefined`
- Console shows: "Using fallback URL"

**Fix:**
1. Vercel Dashboard → Settings → Environment Variables
2. Make sure variables are set for **Production** environment
3. Redeploy with NO cache: `vercel --prod --force --no-cache`

---

### Issue 2: Still Getting "Failed to fetch"

**Symptoms:**
- Console error: `TypeError: Failed to fetch`
- Network tab shows: (failed) net::ERR_FAILED

**Debug Steps:**

1. **Check Network Tab:**
   ```
   F12 → Network tab → Click failed request
   Look at:
   - Request URL (should be Railway URL)
   - Status (should be 200)
   - Response (should have data)
   ```

2. **Check Console:**
   ```javascript
   // Run in browser console:
   fetch('https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php')
     .then(r => r.json())
     .then(d => console.log('Success:', d))
     .catch(e => console.error('Error:', e))
   ```

3. **If fetch works in console but not in app:**
   - Environment variables not loaded
   - Need to rebuild: `npm run build`
   - Clear Vercel cache

---

### Issue 3: CORS Error (Cross-Origin)

**Symptoms:**
- Console error: `Access to fetch blocked by CORS policy`

**Fix:**
Railway CORS sudah OK (tested ✅), tapi jika masih error:

1. Check Railway logs:
   ```
   https://railway.app/dashboard
   → Select project
   → Click "View Logs"
   ```

2. Verify CORS headers:
   ```bash
   curl -I -X OPTIONS \
     -H "Origin: https://pbl-kuala-outdoor.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php
   ```

   Expected:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
   ```

---

### Issue 4: 404 Not Found on Vercel Routes

**Symptoms:**
- Homepage works
- Browse page shows 404
- Direct URL to `/browse` returns 404

**Fix:**
Already fixed with `vercel.json` rewrites, but if still error:

1. Verify `vercel.json`:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

2. Redeploy Vercel

---

## 📋 QUICK FIX CHECKLIST:

- [ ] ✅ Railway backend working (VERIFIED ✅)
- [ ] Add environment variables in Vercel Dashboard
- [ ] Set for Production, Preview, Development
- [ ] Redeploy Vercel (with --force --no-cache)
- [ ] Clear browser cache / use incognito
- [ ] Test: Open https://pbl-kuala-outdoor.vercel.app
- [ ] Test: Browse equipment page
- [ ] Test: Check console for errors
- [ ] Test: Network tab shows Railway API calls
- [ ] Test: Equipment images load

---

## 🎯 IF STILL NOT WORKING:

### Last Resort Fix:

```bash
# 1. Clean build
rm -rf dist node_modules .vercel

# 2. Fresh install
npm install

# 3. Build locally to test
npm run build

# 4. Test build locally
npm run preview

# 5. If local works, deploy to Vercel
vercel --prod --force
```

---

## 💡 DEBUGGING TIPS:

### Check if Vercel using correct environment:

1. Add temporary debug code di `src/pages/Browse.tsx`:

```typescript
useEffect(() => {
  console.log('🔍 Debug Info:');
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('UPLOADS_BASE_URL:', UPLOADS_BASE_URL);
  console.log('ENV VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('ENV MODE:', import.meta.env.MODE);
}, []);
```

2. Deploy dan check console
3. Should show Railway URL, not undefined

---

## ✅ EXPECTED WORKING STATE:

After all fixes:

```
✅ Vercel URL: https://pbl-kuala-outdoor.vercel.app
✅ Railway API: https://pbl-kuala-outdoor-production.up.railway.app/api
✅ Console: No CORS errors
✅ Network: All API calls return 200
✅ Browse page: Equipment list displayed
✅ Images: Loading from Railway
✅ No "Failed to fetch" errors
```

---

## 🚀 QUICK DEPLOY COMMANDS:

```bash
# 1. Commit changes
git add .
git commit -m "Fix: Environment variables and Railway integration"
git push origin master

# 2. Wait for Vercel auto-deploy (2-3 minutes)
# OR force deploy:
vercel --prod --force

# 3. Check deployment:
# https://vercel.com/dashboard

# 4. Test website:
# https://pbl-kuala-outdoor.vercel.app
```

---

## 📞 SUPPORT:

Jika masih error:

1. Check Vercel deployment logs
2. Check Railway logs
3. Check browser console
4. Check Network tab
5. Share error message/screenshot

**Railway backend sudah 100% OK!** ✅  
Tinggal fix Vercel deployment dan environment variables! 🚀
