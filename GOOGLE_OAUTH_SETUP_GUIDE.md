# 🔐 SETUP GOOGLE OAUTH - STEP BY STEP

## 📋 Current Status
**Google Client ID**: `674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com`

**Problem**: Google OAuth redirect URIs belum dikonfigurasi untuk Vercel production!

---

## ✅ LANGKAH SETUP (Yang Harus Dilakukan)

### 1. 🌐 Buka Google Cloud Console
URL: https://console.cloud.google.com/apis/credentials

Login dengan akun Google yang punya project ini.

---

### 2. 📝 Pilih OAuth 2.0 Client ID

Di halaman "Credentials", cari:
```
Client ID for Web application
Client ID: 674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n
```

Klik untuk edit.

---

### 3. ➕ Tambahkan Authorized JavaScript origins

Di bagian **"Authorized JavaScript origins"**, tambahkan:

```
✅ https://pbl-kuala-outdoor.vercel.app
✅ https://pbl-kuala-outdoor-k5nn-jwp9bj8yz.vercel.app (jika ada preview URL)
```

**JANGAN HAPUS** yang sudah ada (localhost)! Cukup TAMBAHKAN.

Screenshot Anda menunjukkan sudah ada:
- http://localhost:8080
- http://localhost:5173
- http://127.0.0.1:8080
- http://127.0.0.1:5173

**Tambahkan di bawahnya**:
```
https://pbl-kuala-outdoor.vercel.app
```

---

### 4. ➕ Tambahkan Authorized redirect URIs

Di bagian **"Authorized redirect URIs"**, tambahkan:

```
✅ https://pbl-kuala-outdoor.vercel.app
✅ https://pbl-kuala-outdoor.vercel.app/auth
✅ https://pbl-kuala-outdoor.vercel.app/login
✅ https://pbl-kuala-outdoor.vercel.app/callback
```

**JANGAN HAPUS** yang sudah ada! Cukup TAMBAHKAN.

Screenshot Anda menunjukkan sudah ada:
- http://localhost:8080
- http://localhost:5173
- http://127.0.0.1:8080
- http://127.0.0.1:5173

**Tambahkan di bawahnya**:
```
https://pbl-kuala-outdoor.vercel.app
https://pbl-kuala-outdoor.vercel.app/auth
```

---

### 5. 💾 SAVE!

Klik tombol **"SAVE"** di bagian bawah.

⚠️ **PENTING**: Perubahan mungkin butuh 5-10 menit untuk aktif!

---

## 🔍 VERIFIKASI - Cek Apakah Sudah Benar

Setelah save, Anda harus melihat di Google Console:

### Authorized JavaScript origins:
```
✅ http://localhost:8080
✅ http://localhost:5173
✅ http://127.0.0.1:8080
✅ http://127.0.0.1:5173
✅ https://pbl-kuala-outdoor.vercel.app          ← BARU!
```

### Authorized redirect URIs:
```
✅ http://localhost:8080
✅ http://localhost:5173
✅ http://127.0.0.1:8080
✅ http://127.0.0.1:5173
✅ https://pbl-kuala-outdoor.vercel.app          ← BARU!
✅ https://pbl-kuala-outdoor.vercel.app/auth     ← BARU!
```

---

## 📱 FILES YANG MENGGUNAKAN GOOGLE OAUTH

### 1. **src/App.tsx**
```typescript
const GOOGLE_CLIENT_ID = "674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com";

<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
  {/* App content */}
</GoogleOAuthProvider>
```

✅ **SUDAH BENAR** - Tidak perlu diubah!

---

### 2. **src/main.tsx**
```typescript
<GoogleOAuthProvider clientId="674921945545-ked4bb7am12ic3adqachl0dlsmnh8g2n.apps.googleusercontent.com">
```

⚠️ **SALAH!** Client ID di main.tsx BERBEDA dengan App.tsx!

**HARUS DIFIX** - Client ID di main.tsx salah!

---

### 3. **src/pages/Auth.tsx**
```typescript
const { signInWithGoogle } = useAuth();

const handleGoogleSuccess = async (credentialResponse: any) => {
  await signInWithGoogle(credentialResponse.credential || "");
};

<GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => setError('Login Google gagal. Silakan coba lagi.')}
/>
```

✅ **SUDAH BENAR** - Menggunakan GoogleLogin component dari @react-oauth/google

---

### 4. **src/contexts/AuthContext.tsx**
```typescript
// Google login COMMENTED OUT
// signInWithGoogle: (credential: string) => Promise<void>
```

⚠️ **PERLU DICEK** - Apakah `signInWithGoogle` function masih ada?

---

## 🛠️ FIXES YANG PERLU DILAKUKAN

### Fix #1: src/main.tsx - Client ID Salah! ❌

**Current** (SALAH):
```typescript
<GoogleOAuthProvider clientId="674921945545-ked4bb7am12ic3adqachl0dlsmnh8g2n.apps.googleusercontent.com">
```

**Should be**:
```typescript
<GoogleOAuthProvider clientId="674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com">
```

Perhatikan perbedaannya:
- SALAH: `674921945545-ked4bb7am12`... (angka 5545)
- BENAR: `674921949545-ked4b0t7aml`... (angka 9545)

---

### Fix #2: Vercel Environment Variables

Di Vercel Dashboard, pastikan ada:

```
VITE_GOOGLE_CLIENT_ID = 674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n.apps.googleusercontent.com
```

Untuk **Production**, **Preview**, dan **Development**.

---

## 🧪 CARA TEST GOOGLE LOGIN

### 1. Setelah setup Google Console (5-10 menit tunggu)
### 2. Buka: https://pbl-kuala-outdoor.vercel.app/auth
### 3. Klik tombol "Login with Google"
### 4. Pilih akun Google
### 5. Harus berhasil! ✅

---

## ⚠️ ERROR YANG MUNGKIN MUNCUL

### Error: "redirect_uri_mismatch"
**Penyebab**: Redirect URI belum ditambahkan di Google Console  
**Solusi**: Tambahkan `https://pbl-kuala-outdoor.vercel.app` di Authorized redirect URIs

### Error: "origin_mismatch"
**Penyebab**: JavaScript origin belum ditambahkan  
**Solusi**: Tambahkan `https://pbl-kuala-outdoor.vercel.app` di Authorized JavaScript origins

### Error: "invalid_client"
**Penyebab**: Client ID salah (seperti di main.tsx)  
**Solusi**: Gunakan Client ID yang benar: `674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n...`

---

## 📊 CHECKLIST SETUP

### Di Google Cloud Console:
- [ ] Add `https://pbl-kuala-outdoor.vercel.app` ke JavaScript origins
- [ ] Add `https://pbl-kuala-outdoor.vercel.app` ke Redirect URIs
- [ ] Add `https://pbl-kuala-outdoor.vercel.app/auth` ke Redirect URIs
- [ ] Klik SAVE
- [ ] Tunggu 5-10 menit

### Di Code:
- [ ] Fix `src/main.tsx` Client ID (SALAH saat ini!)
- [ ] Verify `src/App.tsx` Client ID (✅ SUDAH BENAR)
- [ ] Commit & push ke GitHub
- [ ] Vercel auto-deploy

### Di Vercel:
- [ ] Verify environment variable `VITE_GOOGLE_CLIENT_ID`
- [ ] Redeploy jika perlu

---

## 🎯 SUMMARY

**Yang Harus Dilakukan SEKARANG**:

1. ✅ **Buka Google Cloud Console** → Edit OAuth Client
2. ✅ **Tambahkan Vercel URLs** (JavaScript origins & Redirect URIs)
3. ✅ **Fix src/main.tsx** - Client ID salah!
4. ✅ **Commit & Push** perubahan
5. ✅ **Test** di production setelah 10 menit

**File yang perlu diubah**:
- `src/main.tsx` ← **Client ID SALAH!**

**Google Console yang perlu ditambah**:
- Authorized JavaScript origins: `https://pbl-kuala-outdoor.vercel.app`
- Authorized redirect URIs: `https://pbl-kuala-outdoor.vercel.app`, `https://pbl-kuala-outdoor.vercel.app/auth`

---

📅 **Date**: December 6, 2024  
🔑 **Client ID**: 674921949545-ked4b0t7aml2tc3adqa6h0dlsmnh8g2n  
🌐 **Production**: https://pbl-kuala-outdoor.vercel.app
