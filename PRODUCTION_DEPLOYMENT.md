# 🚀 PRODUCTION DEPLOYMENT GUIDE

## ✅ Pre-Deployment Checklist

### Frontend (Vercel)
- [x] All API URLs using environment variables
- [x] .env.production configured
- [x] WhatsApp number configured
- [ ] Test build: `npm run build`
- [ ] Deploy: `vercel --prod`

### Backend (InfinityFree)
- [ ] Register InfinityFree account
- [ ] Create database & user
- [ ] Upload PHP files to public_html/api/
- [ ] Import database SQL
- [ ] Update config/database.php with credentials
- [ ] Test API endpoints

## 📝 Environment Variables

### Vercel Dashboard Settings
```
VITE_API_URL = https://your-backend.infinityfreeapp.com/api
VITE_WHATSAPP_NUMBER = 6281234567890
```

### InfinityFree Database Config
Edit `config/database.php`:
```php
$host = 'sql123.byethost.com';
$dbname = 'epiz_XXXXX_kuala_outdoor';
$username = 'epiz_XXXXX';
$password = 'your_generated_password';
```

## 🧪 Testing URLs

### Frontend (Vercel)
https://pbl-kelana-outdoor-ifkuyyj67-naufalzakwans-projects.vercel.app

### Backend (After InfinityFree Setup)
- https://your-account.infinityfreeapp.com/api/public/trips.php
- https://your-account.infinityfreeapp.com/api/public/equipment.php
- https://your-account.infinityfreeapp.com/api/admin/login.php

## 🔧 Common Issues

### Frontend shows "Failed to fetch"
- Backend belum deploy (normal saat development)
- CORS not configured on backend
- Wrong VITE_API_URL in Vercel settings

### Images not loading
- Upload folder permissions on InfinityFree
- Check UPLOADS_BASE_URL configuration

### Admin login fails
- Check database connection on backend
- Verify admin credentials in database
- Check CORS headers on login.php

## 📚 Useful Links
- Vercel Dashboard: https://vercel.com/dashboard
- InfinityFree Panel: https://app.infinityfree.com
- Repository: https://github.com/levinackerman1315-commits/PBL---KUALA---OUTDOOR
