# 🔐 GOOGLE OAUTH ERROR - ORIGIN MISMATCH

## ❌ Error di Screenshot:
```
Access blocked: Authorization Error
Error 400: origin_mismatch
```

**Akun**: levinackerman1315@gmail.com

---

## 🔍 ROOT CAUSE

Error ini terjadi karena:

### Current Origin (Vercel URL):
```
https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app
```

### What's in Google Console (Your screenshot showed):
```
✅ http://localhost:8080
✅ http://localhost:5173
✅ http://127.0.0.1:8080
✅ http://127.0.0.1:5173
```

### What's MISSING:
```
❌ https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app  ← VERCEL URL TIDAK ADA!
❌ https://pbl-kuala-outdoor.vercel.app                 ← DOMAIN UTAMA TIDAK ADA!
```

**Makanya Google block dengan error "origin_mismatch"!**

---

## ✅ SOLUTION - HARUS DILAKUKAN MANUAL!

### Step-by-Step (5 Menit):

#### 1. Buka Google Cloud Console:
URL: https://console.cloud.google.com/apis/credentials

Login dengan akun: **levinackerman1315@gmail.com**

#### 2. Pilih Project:
Cari project yang punya Client ID: `674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n`

#### 3. Edit OAuth 2.0 Client ID:
Klik nama client atau icon edit

#### 4. Add ke "Authorized JavaScript origins":

**JANGAN HAPUS** yang sudah ada! **TAMBAHKAN** di bawahnya:

```
https://pbl-kuala-outdoor.vercel.app
https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app
```

**Hasil akhir harus seperti ini**:
```
✅ http://localhost:8080
✅ http://localhost:5173
✅ http://127.0.0.1:8080
✅ http://127.0.0.1:5173
✅ https://pbl-kuala-outdoor.vercel.app                 ← TAMBAH INI!
✅ https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app  ← TAMBAH INI!
```

#### 5. Add ke "Authorized redirect URIs":

**TAMBAHKAN** juga:

```
https://pbl-kuala-outdoor.vercel.app
https://pbl-kuala-outdoor.vercel.app/auth
https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app
https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app/auth
```

**Hasil akhir**:
```
✅ http://localhost:8080
✅ http://localhost:5173
✅ http://127.0.0.1:8080
✅ http://127.0.0.1:5173
✅ https://pbl-kuala-outdoor.vercel.app                      ← TAMBAH!
✅ https://pbl-kuala-outdoor.vercel.app/auth                 ← TAMBAH!
✅ https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app       ← TAMBAH!
✅ https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app/auth  ← TAMBAH!
```

#### 6. SAVE!
Klik tombol **"SAVE"** di bagian bawah

#### 7. Tunggu 5-10 Menit
Google perlu propagate changes

#### 8. Test Lagi
Buka: https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app/auth
Klik "Login with Google"
**Harus berhasil!** ✅

---

## ⚠️ KENAPA HARUS MANUAL?

**Saya tidak bisa akses Google Cloud Console Anda!**

Ini membutuhkan:
- Login ke akun Google Anda
- Akses ke Google Cloud project
- Permission untuk edit OAuth settings

**Hanya Anda yang bisa melakukan ini!**

---

## 🔍 VERCEL URLS YANG PERLU DITAMBAHKAN

### Production URL:
```
https://pbl-kuala-outdoor.vercel.app
```

### Current Deployment URL:
```
https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app
```

**Note**: Vercel bisa generate URL baru setiap deploy. Better add both!

---

## 📋 CHECKLIST

Setup Google OAuth:
- [ ] Buka https://console.cloud.google.com/apis/credentials
- [ ] Login dengan levinackerman1315@gmail.com
- [ ] Pilih OAuth Client (674921949545...)
- [ ] Add Vercel URLs ke **Authorized JavaScript origins**
- [ ] Add Vercel URLs ke **Authorized redirect URIs**
- [ ] Klik **SAVE**
- [ ] Tunggu 5-10 menit
- [ ] Test Google Login lagi

---

## 🎯 AFTER YOU ADD URLS:

Google Login akan work dengan flow:
1. User klik "Login with Google" di Vercel
2. Redirect ke Google OAuth
3. User pilih akun Google
4. Google verify origin (Vercel URL) ← **INI YANG CURRENTLY FAILED!**
5. Redirect back ke Vercel dengan token
6. User logged in ✅

---

## 📱 SCREENSHOT REFERENCE

Dari screenshot Google Console Anda, saya lihat struktur yang benar.

**Anda cuma perlu**:
1. Scroll ke bagian "Authorized JavaScript origins"
2. Klik "+ ADD URI"
3. Paste: `https://pbl-kuala-outdoor.vercel.app`
4. Klik "+ ADD URI" lagi
5. Paste: `https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app`
6. Repeat untuk "Authorized redirect URIs"
7. SAVE!

**Selesai!** 🎉

---

**Date**: December 6, 2024  
**Error**: origin_mismatch (400)  
**Solution**: Add Vercel URLs to Google Console (manual)  
**Time Required**: 5 minutes  
**Who Can Fix**: Only you (requires Google account access)
