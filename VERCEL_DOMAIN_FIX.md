# 🔧 FIX: Vercel Domain Keeps Changing

## 🔴 MASALAH
Setiap deploy ke Vercel, URL berubah:
- Deploy 1: `pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app`
- Deploy 2: `pbl-kuala-outdoor-5rnw.vercel.app` ← NEW!
- Deploy 3: `pbl-kuala-outdoor-xxxx.vercel.app` ← AKAN BERUBAH LAGI!

Ini menyebabkan Google OAuth error karena URL baru tidak terdaftar.

---

## ✅ SOLUSI: Set Production Domain di Vercel

### Step 1: Buka Vercel Dashboard
1. Login ke: https://vercel.com
2. Pilih project: `pbl-kuala-outdoor`
3. Klik tab **Settings**
4. Klik **Domains** di sidebar

### Step 2: Set Production Domain
Anda akan lihat list domains seperti:
```
✅ pbl-kuala-outdoor.vercel.app (Production)
⚠️ pbl-kuala-outdoor-5rnw.vercel.app (Latest)
⚠️ pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app (Previous)
```

**PASTIKAN** `pbl-kuala-outdoor.vercel.app` di-set sebagai **Production Domain**.

### Step 3: Redeploy (Jika Perlu)
```bash
# Di project folder
git add .
git commit -m "trigger redeploy"
git push origin master
```

Atau klik **Redeploy** di Vercel dashboard.

---

## 🔒 UPDATE GOOGLE CONSOLE

Setelah production domain fixed, update Google Console dengan **HANYA** domain production:

### Authorized JavaScript origins:
```
http://localhost:5173
http://localhost:8080
http://127.0.0.1:5173
http://127.0.0.1:8080
https://pbl-kuala-outdoor.vercel.app
```

### Authorized redirect URIs:
```
http://localhost:5173
http://localhost:5173/auth
http://localhost:8080
http://localhost:8080/auth
https://pbl-kuala-outdoor.vercel.app
https://pbl-kuala-outdoor.vercel.app/auth
```

**JANGAN tambahkan** preview URLs (yang punya hash seperti `-k5nn-jwp9bj8yz` atau `-5rnw`).

---

## 🎯 HASIL AKHIR

Setelah fix:
- ✅ Production URL: `https://pbl-kuala-outdoor.vercel.app` (TETAP)
- ✅ Google OAuth works
- ✅ Tidak perlu update Google Console setiap deploy
- ✅ Preview deployments tetap bisa diakses (tapi tanpa Google OAuth)

---

## 🧪 CARA TEST

1. Buka: https://pbl-kuala-outdoor.vercel.app/auth
2. Klik "Sign in with Google"
3. Seharusnya berhasil! ✅

**Catatan:** Preview URLs (dengan hash) tidak akan work untuk Google OAuth, dan itu NORMAL. Gunakan production URL untuk test OAuth.
