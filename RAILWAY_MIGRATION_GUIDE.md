# 🚂 RAILWAY DEPLOYMENT GUIDE - Git Auto-Deploy Backend PHP

## ✅ KENAPA PINDAH KE RAILWAY?

**Masalah InfinityFree:**
- ❌ No Git deploy (harus upload manual)
- ❌ No CLI access
- ❌ Limited database
- ❌ Sering down
- ❌ No environment variables

**Keuntungan Railway:**
- ✅ Git auto-deploy (push → deploy otomatis)
- ✅ MySQL database included
- ✅ Environment variables support
- ✅ HTTPS gratis
- ✅ 24/7 online (no sleep)
- ✅ Real logs & monitoring
- ✅ **GRATIS** $5 credit/month (cukup!)

---

## 🚀 SETUP RAILWAY (10 MENIT)

### **STEP 1: Create Railway Account**

1. Buka: https://railway.app
2. Click: **"Start a New Project"**
3. Login dengan: **GitHub account** kamu
4. Authorize Railway to access GitHub

### **STEP 2: Create New Project**

1. Dashboard Railway → Click **"+ New Project"**
2. Select: **"Deploy from GitHub repo"**
3. Search & select: `levinackerman1315-commits/PBL---KUALA---OUTDOOR`
4. Railway akan auto-detect project

### **STEP 3: Add MySQL Database**

1. Click **"+ New"** → **"Database"** → **"Add MySQL"**
2. Railway akan provision MySQL instance
3. Copy credentials:
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLDATABASE`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`

### **STEP 4: Configure Environment Variables**

Di Railway dashboard → Project → **Variables** tab:

```bash
# Database credentials (dari Railway MySQL)
DB_HOST=${MYSQLHOST}
DB_PORT=${MYSQLPORT}
DB_NAME=${MYSQLDATABASE}
DB_USER=${MYSQLUSER}
DB_PASSWORD=${MYSQLPASSWORD}

# Application URLs
FRONTEND_URL=https://pbl-kuala-outdoor.vercel.app
API_BASE_URL=https://your-app.railway.app/api

# Google OAuth
GOOGLE_CLIENT_ID=674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com

# Supabase
SUPABASE_PROJECT_ID=ffqhbvzlwubrcqddqoxq
SUPABASE_URL=https://ffqhbvzlwubrcqddqoxq.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📝 PERUBAHAN FILE (MINIMAL!)

### **File 1: `api/config/database.php`**

Ubah untuk support environment variables:

```php
<?php
class Database {
    // Railway environment variables
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $port;
    public $conn;

    public function __construct() {
        // Use environment variables (Railway) or fallback to local
        $this->host = getenv('DB_HOST') ?: getenv('MYSQLHOST') ?: 'localhost';
        $this->port = getenv('DB_PORT') ?: getenv('MYSQLPORT') ?: '3306';
        $this->db_name = getenv('DB_NAME') ?: getenv('MYSQLDATABASE') ?: 'kuala_outdoor';
        $this->username = getenv('DB_USER') ?: getenv('MYSQLUSER') ?: 'root';
        $this->password = getenv('DB_PASSWORD') ?: getenv('MYSQLPASSWORD') ?: '';
    }

    public function connect() {
        $this->conn = null;
        
        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->db_name};charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->username, $this->password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
            ]);
        } catch(PDOException $e) {
            error_log("Database Connection Error: " . $e->getMessage());
            http_response_code(500);
            die(json_encode([
                'success' => false,
                'error' => 'Database connection failed'
            ]));
        }
        
        return $this->conn;
    }

    public function getConnection() {
        return $this->connect();
    }
}
?>
```

### **File 2: `railway.json` (Optional, untuk konfigurasi)**

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "php -S 0.0.0.0:$PORT -t .",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### **File 3: `nixpacks.toml` (Tell Railway how to build)**

```toml
[phases.setup]
nixPkgs = ['php82', 'php82Extensions.pdo', 'php82Extensions.pdo_mysql', 'php82Extensions.mysqli']

[phases.install]
cmds = ['echo "Installing dependencies..."']

[start]
cmd = 'php -S 0.0.0.0:$PORT -t .'
```

---

## 🔄 WORKFLOW BARU (SUPER MUDAH!)

### **Development:**
```bash
# 1. Edit code di local
# 2. Test di localhost

# 3. Commit & push
git add .
git commit -m "feat: new feature"
git push origin master

# 4. Railway AUTO-DEPLOY! ✅
# 5. Check logs di Railway dashboard
```

**NO MORE**:
- ❌ Upload manual via File Manager
- ❌ Extract ZIP
- ❌ FTP upload
- ❌ Verify file structure

**JUST**:
- ✅ Git push → Auto deploy!

---

## 📊 PERBANDINGAN

| Feature | InfinityFree ❌ | Railway ✅ |
|---------|----------------|-----------|
| Git Deploy | Manual upload | **Auto-deploy** |
| CLI Access | No | **Yes** |
| MySQL | Limited | **Dedicated** |
| Environment Vars | No | **Yes** |
| HTTPS | Yes | **Yes** |
| Uptime | 90% | **99.9%** |
| Logs | No | **Real-time** |
| Sleep | Random | **Never** |
| Cost | Free | **Free $5/mo** |

---

## 🎯 MIGRASI DATABASE

### **STEP 1: Export dari InfinityFree**

1. Login phpMyAdmin InfinityFree
2. Select database: `if0_40557727_kuala_outdoor`
3. Click: **Export**
4. Format: **SQL**
5. Download: `database.sql`

### **STEP 2: Import ke Railway**

Railway dashboard → MySQL service → **Connect**:

```bash
# Get Railway MySQL connection string
mysql -h <MYSQLHOST> -P <MYSQLPORT> -u <MYSQLUSER> -p<MYSQLPASSWORD> <MYSQLDATABASE>

# Or use Railway CLI
railway connect mysql
```

Lalu import:
```bash
mysql -h <MYSQLHOST> -P <MYSQLPORT> -u <MYSQLUSER> -p<MYSQLPASSWORD> <MYSQLDATABASE> < database.sql
```

Atau via phpMyAdmin:
1. Railway → MySQL → **"Open phpMyAdmin"**
2. Import file `database.sql`

---

## 🔄 UPDATE VERCEL ENV VARS

Setelah Railway deploy, update di Vercel:

```bash
# Old (InfinityFree)
VITE_API_URL=https://kualaoutdoor.free.nf/api

# New (Railway)
VITE_API_URL=https://your-app.railway.app/api
```

Railway akan kasih domain: `your-app.railway.app`

---

## 📝 CHECKLIST MIGRASI

- [ ] Create Railway account
- [ ] Connect GitHub repo
- [ ] Add MySQL database
- [ ] Set environment variables
- [ ] Update `database.php` untuk env vars
- [ ] Push code to GitHub
- [ ] Railway auto-deploy
- [ ] Export database dari InfinityFree
- [ ] Import database ke Railway
- [ ] Update VITE_API_URL di Vercel
- [ ] Test API endpoints
- [ ] Test frontend

---

## 💰 BIAYA

**Railway Free Tier:**
- $5 credit/month
- Usage based:
  - Web service: ~$3-4/month
  - MySQL: ~$1-2/month
  - Total: ~$5/month (GRATIS!)

**Kalau butuh lebih**:
- Starter plan: $5/month tambahan
- Total: $10/month untuk production-ready app

**Still cheaper than**:
- Heroku: $7/month minimum
- DigitalOcean: $12/month minimum

---

## 🎉 KEUNTUNGAN AKHIR

### **Development Workflow:**
```bash
# Edit code
nano api/public/equipment.php

# Test local
php -S localhost:8000

# Deploy
git add .
git commit -m "fix: update equipment API"
git push origin master

# ✅ DONE! Railway auto-deploy dalam 2 menit!
```

### **No More:**
- ❌ Login InfinityFree
- ❌ Open File Manager
- ❌ Upload files
- ❌ Extract ZIP
- ❌ Clear cache
- ❌ Test URL
- ❌ Debug via browser

### **Just:**
- ✅ `git push`
- ✅ Check Railway logs
- ✅ **DONE!**

---

## 🚀 READY TO MIGRATE?

**Steps:**
1. Create Railway account: https://railway.app
2. Connect GitHub repo
3. Add MySQL
4. Update `database.php` (copy code di atas)
5. Push to GitHub
6. **AUTO-DEPLOY!** ✅

**ETA**: 15 menit total untuk full migration!

---

**Want to proceed?** Say yes dan saya akan guide step-by-step! 🚂
