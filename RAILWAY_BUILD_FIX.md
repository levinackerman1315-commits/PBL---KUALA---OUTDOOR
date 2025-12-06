# 🔧 RAILWAY DEPLOYMENT FIX - Build Error Solution

## ❌ ERROR YANG TERJADI:

```
RUN bun run build
/bin/bash: line 1: bun: command not found
ERROR: failed to build: exit code: 127
```

## 🔍 ROOT CAUSE:

Railway **salah detect project type**!

**Problem**:
- Railway lihat `package.json` (untuk Vite frontend)
- Railway assume: "Oh ini Node.js/Bun project!"
- Railway coba run: `bun run build`
- **TAPI**: Ini PHP backend project, ga butuh build!
- **RESULT**: Build failed!

## ✅ SOLUTION YANG SUDAH DITERAPKAN:

### **1. Update `nixpacks.toml`**
Tambah explicit build phase yang skip build:

```toml
[phases.setup]
nixPkgs = ['php82', 'php82Extensions.pdo', ...]

[phases.install]
cmds = ['echo "✅ PHP environment ready"']

[phases.build]
# Disable build - PHP ga butuh build step!
cmds = ['echo "✅ No build step needed for PHP"']

[start]
cmd = 'php -S 0.0.0.0:$PORT'
```

### **2. Update `railway.json`**
Simplified start command:

```json
{
  "deploy": {
    "startCommand": "php -S 0.0.0.0:$PORT"
  }
}
```

### **3. Add `.railwayignore`**
Exclude frontend files dari deployment:

```
node_modules/
src/
package.json
vite.config.ts
# ... frontend files
```

### **4. Add `index.php` Router**
Entry point untuk handle routing:
- Health check: `/`
- API routes: `/api/public/*.php`

---

## 🚀 NEXT STEPS:

### **STEP 1: Railway Auto-Redeploy**
Push sudah trigger Railway redeploy otomatis.

**Cek di Railway Dashboard**:
1. Go to: https://railway.app/project/your-project
2. Check: Deployments tab
3. Latest deployment (commit: `7f0cb52`)
4. Wait for: **"Deployed"** status (2-3 minutes)

### **STEP 2: Verify Build Logs**
Harusnya sekarang ga ada error `bun: command not found`!

**Expected logs**:
```
✅ PHP environment ready
✅ No build step needed for PHP
✅ Starting PHP server on 0.0.0.0:$PORT
```

### **STEP 3: Add MySQL Database**
Setelah deployment sukses:

1. Railway Project → **"+ New"**
2. Select: **"Database"** → **"Add MySQL"**
3. Railway provision MySQL
4. Credentials auto-inject ke environment

### **STEP 4: Test API**
Setelah deployed, test endpoints:

```bash
# Health check
curl https://your-app.railway.app/

# Equipment API
curl https://your-app.railway.app/api/public/equipment.php

# Should return JSON
```

---

## 📋 TROUBLESHOOTING CHECKLIST:

### **If Still Build Error:**

- [ ] Verify `nixpacks.toml` exists di root
- [ ] Verify `railway.json` exists di root
- [ ] Check Railway logs untuk error message
- [ ] Try manual redeploy: Deployments → "..." → Redeploy

### **If Deployment Success tapi API Error:**

- [ ] Add MySQL database
- [ ] Check environment variables set
- [ ] Check Deploy Logs untuk runtime errors
- [ ] Test health check: `curl https://your-app.railway.app/`

### **If Database Connection Error:**

- [ ] Verify MySQL service added
- [ ] Check env vars: `MYSQLHOST`, `MYSQLUSER`, `MYSQLPASSWORD`
- [ ] Import database SQL file
- [ ] Test connection via Railway MySQL CLI

---

## 🎯 EXPECTED FLOW SEKARANG:

### **Build Phase:**
```
1. Setup PHP 8.2 ✅
2. Install PHP extensions ✅
3. Skip build (no bun/npm) ✅
4. Start PHP server ✅
```

### **Runtime:**
```
1. PHP server start on PORT ✅
2. Load environment variables ✅
3. Connect to Railway MySQL ✅
4. API ready ✅
```

---

## 💡 KENAPA INI TERJADI?

**Railway auto-detection logic:**
1. Scan project files
2. Find `package.json` → "Node.js project!"
3. Find `bun.lockb` → "Use Bun!"
4. Run `bun run build` → **ERROR!**

**Our fix:**
1. Explicit `nixpacks.toml` → "This is PHP!"
2. Disable build phase → "No build needed!"
3. Simple start command → "Just run PHP server!"
4. `.railwayignore` → "Ignore frontend files!"

---

## ✅ VERIFICATION:

Setelah push commit `7f0cb52`, Railway akan:

1. **Detect** nixpacks.toml configuration
2. **Skip** build phase (no bun)
3. **Run** PHP server
4. **Deploy** successfully!

**Timeline:**
- Push: ✅ Done
- Railway detect: 30 seconds
- Build: 1-2 minutes
- Deploy: 30 seconds
- **Total**: ~3 minutes

---

## 🔄 NEXT DEPLOYMENT:

Setelah ini, workflow jadi:

```bash
# Edit code
nano api/public/equipment.php

# Commit & push
git add .
git commit -m "feat: update API"
git push origin master

# Railway auto-deploy ✅
# No more bun error! ✅
# No manual upload! ✅
```

---

## 📞 IF STILL ERROR:

Screenshot these logs:
1. Railway Build Logs (full)
2. Railway Deploy Logs (full)
3. Environment Variables page

Lalu report back dengan:
- Error message
- Which step failed
- Environment vars set or not

---

**STATUS**: Fix pushed, waiting for Railway redeploy...  
**ETA**: 3 minutes  
**Expected**: Deployment SUCCESS! 🎉
