# 🚀 DEPLOYMENT OPTIONS - CLI vs Manual

## ❌ **TIDAK BISA** Deploy via Git/CLI ke InfinityFree

InfinityFree adalah **free hosting** dengan limitasi:
- ❌ No SSH access
- ❌ No Git repository integration
- ❌ No command-line deployment
- ❌ No CI/CD pipelines
- ❌ No automated workflows

**Kenapa?** Free hosting = strict resource limitations untuk prevent abuse.

---

## ✅ **BISA** - 3 Cara Upload ke InfinityFree:

### **METHOD 1: File Manager (Web Interface)** ⭐ EASIEST
**Steps**:
1. Login: https://app.infinityfree.com/accounts
2. Select: `kualaoutdoor.free.nf`
3. Click: Control Panel → File Manager
4. Navigate: `/htdocs/`
5. Upload: `infinityfree-api.zip`
6. Right-click ZIP → Extract
7. Done!

**Pros**: No software needed, just browser  
**Cons**: Slow for large files, manual process

---

### **METHOD 2: FTP via FileZilla** ⭐⭐ RECOMMENDED
**Setup**:
1. Download: https://filezilla-project.org/download.php?type=client
2. Get FTP credentials dari InfinityFree Control Panel → FTP Details
3. Open FileZilla → File → Site Manager
4. New Site:
   ```
   Host: ftpupload.net
   Port: 21
   Protocol: FTP
   Username: if0_40557727
   Password: (from InfinityFree)
   ```
5. Connect

**Upload**:
1. Left panel: Navigate to `c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api`
2. Right panel: Navigate to `/htdocs/`
3. Drag & drop `api` folder
4. Wait for upload complete

**Pros**: Faster, can resume, visual interface  
**Cons**: Need to install software

**Config file**: See `FILEZILLA_CONFIG.md`

---

### **METHOD 3: Automated FTP Script** ⭐⭐⭐ FASTEST (Once Setup)

#### **Option A: PowerShell Script**
File: `ftp-upload.ps1`

**Setup**:
1. Edit `ftp-upload.ps1`
2. Replace `YOUR_FTP_PASSWORD` with actual password
3. Save

**Run**:
```powershell
cd c:\xampp\htdocs\PBL-KELANA-OUTDOOR
.\ftp-upload.ps1
```

**Pros**: Can automate via task scheduler  
**Cons**: Need to configure once

---

#### **Option B: WinSCP Script** (More Reliable)
File: `winscp-upload.txt`

**Setup**:
1. Download WinSCP: https://winscp.net/eng/download.php
2. Install WinSCP
3. Edit `winscp-upload.txt`
4. Replace `YOUR_FTP_PASSWORD`

**Run**:
```cmd
"C:\Program Files (x86)\WinSCP\WinSCP.com" /script=winscp-upload.txt
```

**Pros**: Very reliable, can sync folders  
**Cons**: Need to install WinSCP

---

## 🔄 **ALTERNATIF**: Hosting dengan Git Deploy Support

Kalau mau deploy via CLI/Git, pindah ke hosting ini:

### **1. Railway.app** ⭐⭐⭐ BEST for PHP
```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

**Features**:
- ✅ PHP 8.x support
- ✅ MySQL database included
- ✅ Git auto-deploy
- ✅ Environment variables
- 💰 $5/month after free trial

**Setup**: https://railway.app/

---

### **2. Render.com** ⭐⭐ Good for Side Projects
```bash
# Connect GitHub repo
# Render auto-deploys on push
```

**Features**:
- ✅ Free tier (with limits)
- ✅ PHP support
- ✅ PostgreSQL free (MySQL paid)
- ✅ Git auto-deploy
- ⏱️ Spins down after 15min idle

**Setup**: https://render.com/

---

### **3. DigitalOcean App Platform** ⭐⭐⭐ Production Ready
```bash
# Install doctl
brew install doctl  # macOS
# or download from: https://docs.digitalocean.com/reference/doctl/

# Login
doctl auth init

# Create app
doctl apps create --spec app.yaml
```

**Features**:
- ✅ Full PHP + MySQL
- ✅ Git auto-deploy
- ✅ Scalable
- ✅ Professional hosting
- 💰 $5/month

**Setup**: https://www.digitalocean.com/products/app-platform

---

### **4. Vercel (Frontend Only)**
```bash
# Install CLI
npm install -g vercel

# Deploy
vercel
```

**Features**:
- ✅ Best for React/Next.js
- ✅ Free generous tier
- ✅ Git auto-deploy
- ❌ No PHP backend support (only serverless functions)

**Current Status**: ✅ Sudah dipakai untuk frontend!

---

## 📊 COMPARISON TABLE:

| Hosting | CLI Deploy | PHP | MySQL | Free Tier | Best For |
|---------|-----------|-----|-------|-----------|----------|
| **InfinityFree** | ❌ | ✅ | ✅ | ✅ Forever | Learning |
| **Vercel** | ✅ | ❌ | ❌ | ✅ Generous | Frontend |
| **Railway** | ✅ | ✅ | ✅ | ✅ Trial | Full-stack |
| **Render** | ✅ | ✅ | ⚠️ Postgres | ✅ Limited | Side project |
| **DigitalOcean** | ✅ | ✅ | ✅ | ❌ | Production |
| **Heroku** | ✅ | ✅ | ✅ Add-on | ❌ | Enterprise |

---

## 🎯 REKOMENDASI:

### **Untuk Belajar (Gratis Selamanya)**:
- Frontend: ✅ **Vercel** (sudah dipakai)
- Backend: ✅ **InfinityFree** (manual upload)

### **Untuk Project Serius**:
- Full-stack: ✅ **Railway** ($5/month)
- Alternatif: ✅ **Render** (free tier terbatas)

### **Untuk Production**:
- ✅ **DigitalOcean App Platform** ($5/month)
- ✅ **Railway** (scalable)

---

## 💡 SOLUSI SEMENTARA: Semi-Automated FTP

Karena kamu pakai InfinityFree dan ga mau upload manual setiap kali:

### **Quick Deploy Script**:

<function_calls>
<invoke name="create_file">
<parameter name="content">@echo off
REM Quick Deploy to InfinityFree via FTP
REM Setup: Install WinSCP first

echo ========================================
echo   DEPLOY TO INFINITYFREE
echo ========================================
echo.

REM Check if WinSCP installed
if not exist "C:\Program Files (x86)\WinSCP\WinSCP.com" (
    echo ERROR: WinSCP not found!
    echo Please install WinSCP from: https://winscp.net/eng/download.php
    pause
    exit /b 1
)

echo Step 1: Checking files...
if not exist "api\public\equipment.php" (
    echo ERROR: API files not found!
    pause
    exit /b 1
)
echo ✅ Files found

echo.
echo Step 2: Uploading to InfinityFree...
"C:\Program Files (x86)\WinSCP\WinSCP.com" /script=winscp-upload.txt

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   ✅ DEPLOYMENT SUCCESS!
    echo ========================================
    echo.
    echo Test your API:
    echo https://kualaoutdoor.free.nf/api/public/equipment.php
    echo.
) else (
    echo.
    echo ========================================
    echo   ❌ DEPLOYMENT FAILED!
    echo ========================================
    echo.
    echo Check:
    echo 1. WinSCP installed?
    echo 2. winscp-upload.txt configured?
    echo 3. FTP password correct?
    echo.
)

pause
