// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useToast } from "@/hooks/use-toast";
// import { Mountain } from "lucide-react";
// import { Link } from "react-router-dom";

// const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [searchParams] = useSearchParams();
//   const [activeTab, setActiveTab] = useState("signin");
  
//   const { signIn, signUp, user } = useAuth();
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   // Set tab based on URL params
//   useEffect(() => {
//     const mode = searchParams.get('mode');
//     if (mode === 'register') {
//       setActiveTab('signup');
//     } else {
//       setActiveTab('signin');
//     }
//   }, [searchParams]);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await signIn(email, password);
//       toast({
//         title: "Selamat datang kembali!",
//         description: "Anda berhasil masuk ke akun Anda.",
//       });
//       navigate("/");
//     } catch (error: any) {
//       toast({
//         title: "Gagal masuk",
//         description: error.message || "Email atau password salah",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!fullName.trim()) {
//       toast({
//         title: "Nama diperlukan",
//         description: "Silakan masukkan nama lengkap Anda",
//         variant: "destructive",
//       });
//       setLoading(false);
//       return;
//     }

//     if (!phone.trim()) {
//       toast({
//         title: "Nomor telepon diperlukan",
//         description: "Silakan masukkan nomor telepon Anda",
//         variant: "destructive",
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       await signUp(fullName, email, password, phone);
//       toast({
//         title: "Akun berhasil dibuat!",
//         description: "Selamat datang di Kelana Outdoor!",
//       });
//       navigate("/");
//     } catch (error: any) {
//       toast({
//         title: "Gagal membuat akun",
//         description: error.message || "Terjadi kesalahan saat membuat akun",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
//       <div className="w-full max-w-md">
//         <Link to="/" className="flex items-center justify-center gap-2 mb-8 text-green-600 hover:text-green-700">
//           <Mountain className="h-8 w-8" />
//           <span className="text-2xl font-bold">Kelana Outdoor</span>
//         </Link>

//         <Card className="shadow-lg">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl text-gray-900">
//               {activeTab === 'signin' ? 'Masuk ke Akun' : 'Buat Akun Baru'}
//             </CardTitle>
//             <CardDescription>
//               {activeTab === 'signin' 
//                 ? 'Masuk untuk melanjutkan petualangan Anda' 
//                 : 'Bergabunglah dengan komunitas petualang Indonesia'
//               }
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Tabs value={activeTab} onValueChange={setActiveTab}>
//               <TabsList className="grid w-full grid-cols-2 mb-6">
//                 <TabsTrigger value="signin">Masuk</TabsTrigger>
//                 <TabsTrigger value="signup">Daftar</TabsTrigger>
//               </TabsList>

//               <TabsContent value="signin">
//                 <form onSubmit={handleSignIn} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="signin-email">Email</Label>
//                     <Input
//                       id="signin-email"
//                       type="email"
//                       placeholder="contoh@email.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="signin-password">Password</Label>
//                     <Input
//                       id="signin-password"
//                       type="password"
//                       placeholder="••••••••"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <Button 
//                     type="submit" 
//                     className="w-full bg-green-600 hover:bg-green-700" 
//                     disabled={loading}
//                   >
//                     {loading ? "Sedang masuk..." : "Masuk"}
//                   </Button>
//                 </form>
//               </TabsContent>

//               <TabsContent value="signup">
//                 <form onSubmit={handleSignUp} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="signup-name">Nama Lengkap</Label>
//                     <Input
//                       id="signup-name"
//                       type="text"
//                       placeholder="Nama Lengkap Anda"
//                       value={fullName}
//                       onChange={(e) => setFullName(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="signup-phone">Nomor Telepon</Label>
//                     <Input
//                       id="signup-phone"
//                       type="tel"
//                       placeholder="08xxxxxxxxxx"
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="signup-email">Email</Label>
//                     <Input
//                       id="signup-email"
//                       type="email"
//                       placeholder="contoh@email.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="signup-password">Password</Label>
//                     <Input
//                       id="signup-password"
//                       type="password"
//                       placeholder="Minimal 6 karakter"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       minLength={6}
//                     />
//                   </div>
//                   <Button 
//                     type="submit" 
//                     className="w-full bg-green-600 hover:bg-green-700" 
//                     disabled={loading}
//                   >
//                     {loading ? "Membuat akun..." : "Buat Akun"}
//                   </Button>
//                 </form>
//               </TabsContent>
//             </Tabs>

//             <div className="mt-6 text-center text-sm text-gray-600">
//               <p>
//                 Dengan mendaftar, Anda menyetujui{" "}
//                 <Link to="/terms" className="text-green-600 hover:underline">
//                   Syarat & Ketentuan
//                 </Link>{" "}
//                 dan{" "}
//                 <Link to="/privacy" className="text-green-600 hover:underline">
//                   Kebijakan Privasi
//                 </Link>{" "}
//                 kami.
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Auth;



// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ArrowLeft, Eye, EyeOff, Mountain, User, Mail, Lock } from "lucide-react";
// import { GoogleLogin } from '@react-oauth/google';
// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (isLogin) {
//       // Login logic
//       console.log("Login:", { email: formData.email, password: formData.password });
//       alert("Login berhasil! (Demo)");
//     } else {
//       // Register logic
//       if (formData.password !== formData.confirmPassword) {
//         alert("Password tidak cocok!");
//         return;
//       }
//       console.log("Register:", formData);
//       alert("Registrasi berhasil! (Demo)");
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* ✅ BACK TO HOME */}
//         <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
//           <ArrowLeft className="h-4 w-4" />
//           Kembali ke Home
//         </Link>

//         {/* ✅ BRAND HEADER */}
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Mountain className="h-8 w-8 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900">KUALA OUTDOOR</h1>
//           <p className="text-gray-600">Penyewaan Alat Camping & Pendakian</p>
//         </div>

//         {/* ✅ AUTH CARD */}
//         <Card className="shadow-xl border-0">
//           <CardHeader>
//             <CardTitle className="text-center">
//               {isLogin ? "🔐 Masuk ke Akun" : "📝 Daftar Akun Baru"}
//             </CardTitle>
//             <p className="text-center text-gray-600 text-sm">
//               {isLogin ? "Masuk untuk melanjutkan rental equipment" : "Buat akun untuk mulai rental equipment"}
//             </p>
//           </CardHeader>
          
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* ✅ NAME FIELD (REGISTER ONLY) */}
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-sm font-medium">
//                     <User className="h-4 w-4 inline mr-2" />
//                     Nama Lengkap
//                   </Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     type="text"
//                     placeholder="Masukkan nama lengkap"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required={!isLogin}
//                     className="h-11"
//                   />
//                 </div>
//               )}

//               {/* ✅ EMAIL FIELD */}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium">
//                   <Mail className="h-4 w-4 inline mr-2" />
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="contoh@email.com"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="h-11"
//                 />
//               </div>

//               {/* ✅ PASSWORD FIELD */}
//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-sm font-medium">
//                   <Lock className="h-4 w-4 inline mr-2" />
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Masukkan password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     required
//                     className="h-11 pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* ✅ CONFIRM PASSWORD (REGISTER ONLY) */}
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword" className="text-sm font-medium">
//                     <Lock className="h-4 w-4 inline mr-2" />
//                     Konfirmasi Password
//                   </Label>
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     placeholder="Ulangi password"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     required={!isLogin}
//                     className="h-11"
//                   />
//                 </div>
//               )}

//               {/* ✅ FORGOT PASSWORD (LOGIN ONLY) */}
//               {isLogin && (
//                 <div className="text-right">
//                   <a 
//                     href="https://wa.me/6289692854470?text=Halo,%20saya%20lupa%20password"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-green-600 hover:text-green-700"
//                   >
//                     Lupa password?
//                   </a>
//                 </div>
//               )}

//               {/* ✅ SUBMIT BUTTON */}
//               <Button 
//                 type="submit" 
//                 className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium"
//               >
//                 {isLogin ? "🔐 Masuk" : "📝 Daftar"}
//               </Button>
//             </form>

//             {/* ✅ TOGGLE LOGIN/REGISTER */}
//             <div className="mt-6 text-center">
//               <p className="text-gray-600 text-sm">
//                 {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
//                 <button
//                   onClick={() => setIsLogin(!isLogin)}
//                   className="ml-2 text-green-600 hover:text-green-700 font-medium"
//                 >
//                   {isLogin ? "Daftar di sini" : "Masuk di sini"}
//                 </button>
//               </p>
//             </div>

//             {/* ✅ DIVIDER */}
//             <div className="my-6 flex items-center">
//               <div className="flex-1 border-t border-gray-300"></div>
//               <span className="px-4 text-gray-500 text-sm">atau</span>
//               <div className="flex-1 border-t border-gray-300"></div>
//             </div>

            
// <div className="my-6 flex items-center">
//   <div className="flex-1 border-t border-gray-300"></div>
//   <span className="px-4 text-gray-500 text-sm">atau</span>
//   <div className="flex-1 border-t border-gray-300"></div>
// </div>

// {/* ✅ GOOGLE LOGIN BUTTON */}
// <div className="mb-6 flex justify-center">
//   <GoogleLogin
//     onSuccess={credentialResponse => {
//       fetch('http://localhost/PBL-KELANA-OUTDOOR/api/public/google-login.php', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ credential: credentialResponse.credential })
//       })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           alert('Login Google berhasil!');
//           // TODO: Simpan data user ke context/session, redirect, dll
//         } else {
//           alert('Login gagal: ' + data.message);
//         }
//       });
//     }}
//     onError={() => alert('Login Google gagal')}
//     useOneTap
//   />
// </div>

//             {/* ✅ WHATSAPP CONTACT */}
//             <div className="space-y-3">
//               <a 
//                 href="https://wa.me/6289692854470?text=Halo%20Kuala%20Outdoor,%20saya%20ingin%20rental%20equipment"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block"
//               >
//                 <Button variant="outline" className="w-full h-11 border-green-600 text-green-600 hover:bg-green-50">
//                   💬 Langsung Chat WhatsApp
//                 </Button>
//               </a>
              
//               <p className="text-center text-xs text-gray-500">
//                 📞 089692854470 • 082253446316<br />
//                 Melayani 24 jam (Fast Response)
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* ✅ BOTTOM INFO */}
//         <div className="mt-8 text-center">
//           <p className="text-xs text-gray-500">
//             Dengan mendaftar, Anda menyetujui{" "}
//             <Link to="/about" className="text-green-600 hover:underline">
//               Syarat & Ketentuan
//             </Link>{" "}
//             kami
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ArrowLeft, Eye, EyeOff, Mountain, User, Mail, Lock } from "lucide-react";
// import { GoogleLogin } from '@react-oauth/google';
// import { useAuth } from "@/contexts/AuthContext";

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const { signIn, signUp, signInWithGoogle } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isLogin) {
//         await signIn(formData.email, formData.password);
//         navigate("/");
//       } else {
//         if (formData.password !== formData.confirmPassword) {
//           alert("Password tidak cocok!");
//           return;
//         }
//         await signUp(formData.name, formData.email, formData.password, "");
//         navigate("/");
//       }
//     } catch (err: any) {
//       alert(err.message || "Login/Registrasi gagal");
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* ✅ BACK TO HOME */}
//         <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
//           <ArrowLeft className="h-4 w-4" />
//           Kembali ke Home
//         </Link>

//         {/* ✅ BRAND HEADER */}
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Mountain className="h-8 w-8 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900">KUALA OUTDOOR</h1>
//           <p className="text-gray-600">Penyewaan Alat Camping & Pendakian</p>
//         </div>

//         {/* ✅ AUTH CARD */}
//         <Card className="shadow-xl border-0">
//           <CardHeader>
//             <CardTitle className="text-center">
//               {isLogin ? "🔐 Masuk ke Akun" : "📝 Daftar Akun Baru"}
//             </CardTitle>
//             <p className="text-center text-gray-600 text-sm">
//               {isLogin ? "Masuk untuk melanjutkan rental equipment" : "Buat akun untuk mulai rental equipment"}
//             </p>
//           </CardHeader>
          
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* ✅ NAME FIELD (REGISTER ONLY) */}
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-sm font-medium">
//                     <User className="h-4 w-4 inline mr-2" />
//                     Nama Lengkap
//                   </Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     type="text"
//                     placeholder="Masukkan nama lengkap"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required={!isLogin}
//                     className="h-11"
//                   />
//                 </div>
//               )}

//               {/* ✅ EMAIL FIELD */}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium">
//                   <Mail className="h-4 w-4 inline mr-2" />
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="contoh@email.com"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="h-11"
//                 />
//               </div>

//               {/* ✅ PASSWORD FIELD */}
//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-sm font-medium">
//                   <Lock className="h-4 w-4 inline mr-2" />
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Masukkan password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     required
//                     className="h-11 pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* ✅ CONFIRM PASSWORD (REGISTER ONLY) */}
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword" className="text-sm font-medium">
//                     <Lock className="h-4 w-4 inline mr-2" />
//                     Konfirmasi Password
//                   </Label>
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     placeholder="Ulangi password"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     required={!isLogin}
//                     className="h-11"
//                   />
//                 </div>
//               )}

//               {/* ✅ FORGOT PASSWORD (LOGIN ONLY) */}
//               {isLogin && (
//                 <div className="text-right">
//                   <a 
//                     href="https://wa.me/6289692854470?text=Halo,%20saya%20lupa%20password"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-green-600 hover:text-green-700"
//                   >
//                     Lupa password?
//                   </a>
//                 </div>
//               )}

//               {/* ✅ SUBMIT BUTTON */}
//               <Button 
//                 type="submit" 
//                 className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium"
//               >
//                 {isLogin ? "🔐 Masuk" : "📝 Daftar"}
//               </Button>
//             </form>

//             {/* ✅ TOGGLE LOGIN/REGISTER */}
//             <div className="mt-6 text-center">
//               <p className="text-gray-600 text-sm">
//                 {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
//                 <button
//                   onClick={() => setIsLogin(!isLogin)}
//                   className="ml-2 text-green-600 hover:text-green-700 font-medium"
//                 >
//                   {isLogin ? "Daftar di sini" : "Masuk di sini"}
//                 </button>
//               </p>
//             </div>

//             {/* ✅ DIVIDER */}
//             <div className="my-6 flex items-center">
//               <div className="flex-1 border-t border-gray-300"></div>
//               <span className="px-4 text-gray-500 text-sm">atau</span>
//               <div className="flex-1 border-t border-gray-300"></div>
//             </div>

//             {/* ✅ GOOGLE LOGIN BUTTON */}
//             <div className="mb-6 flex justify-center">
//               <GoogleLogin
//                 onSuccess={async credentialResponse => {
//                   try {
//                     await signInWithGoogle(credentialResponse.credential || "");
//                     navigate("/");
//                   } catch (err: any) {
//                     alert(err.message || "Login Google gagal");
//                   }
//                 }}
//                 onError={() => alert('Login Google gagal')}
//                 useOneTap
//               />
//             </div>

//             {/* ✅ WHATSAPP CONTACT */}
//             <div className="space-y-3">
//               <a 
//                 href="https://wa.me/6289692854470?text=Halo%20Kuala%20Outdoor,%20saya%20ingin%20rental%20equipment"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block"
//               >
//                 <Button variant="outline" className="w-full h-11 border-green-600 text-green-600 hover:bg-green-50">
//                   💬 Langsung Chat WhatsApp
//                 </Button>
//               </a>
              
//               <p className="text-center text-xs text-gray-500">
//                 📞 089692854470 • 082253446316<br />
//                 Melayani 24 jam (Fast Response)
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* ✅ BOTTOM INFO */}
//         <div className="mt-8 text-center">
//           <p className="text-xs text-gray-500">
//             Dengan mendaftar, Anda menyetujui{" "}
//             <Link to="/about" className="text-green-600 hover:underline">
//               Syarat & Ketentuan
//             </Link>{" "}
//             kami
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ArrowLeft, Eye, EyeOff, Mountain, User, Mail, Lock } from "lucide-react";
// import { GoogleLogin } from '@react-oauth/google';
// import { useAuth } from "@/contexts/AuthContext";

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(""); // ✅ pesan sukses
//   const { signIn, signUp, signInWithGoogle } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     try {
//       if (isLogin) {
//         if (!formData.email || !formData.password) {
//           setError("Email dan password wajib diisi.");
//           return;
//         }
//         await signIn(formData.email, formData.password);
//         navigate("/");
//       } else {
//         if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
//           setError("Semua field wajib diisi.");
//           return;
//         }
//         if (formData.password !== formData.confirmPassword) {
//           setError("Password dan konfirmasi password tidak cocok.");
//           return;
//         }
//         if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
//           setError("Password harus mengandung huruf besar dan angka.");
//           return;
//         }
//         await signUp(formData.name, formData.email, formData.password, "");
//         setSuccess("Registrasi berhasil! Silakan login.");
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//           confirmPassword: ""
//         });
//         setTimeout(() => {
//           setIsLogin(true);
//           setSuccess("");
//         }, 1500); // otomatis pindah ke login setelah 1.5 detik
//       }
//     } catch (err: any) {
//       setError(err.message || "Login/Registrasi gagal");
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
//           <ArrowLeft className="h-4 w-4" />
//           Kembali ke Home
//         </Link>
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Mountain className="h-8 w-8 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900">KUALA OUTDOOR</h1>
//           <p className="text-gray-600">Penyewaan Alat Camping & Pendakian</p>
//         </div>
//         <Card className="shadow-xl border-0">
//           <CardHeader>
//             <CardTitle className="text-center">
//               {isLogin ? "🔐 Masuk ke Akun" : "📝 Daftar Akun Baru"}
//             </CardTitle>
//             <p className="text-center text-gray-600 text-sm">
//               {isLogin ? "Masuk untuk melanjutkan rental equipment" : "Buat akun untuk mulai rental equipment"}
//             </p>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-sm font-medium">
//                     <User className="h-4 w-4 inline mr-2" />
//                     Nama Lengkap
//                   </Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     type="text"
//                     placeholder="Masukkan nama lengkap"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required={!isLogin}
//                     className="h-11"
//                   />
//                 </div>
//               )}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium">
//                   <Mail className="h-4 w-4 inline mr-2" />
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="contoh@email.com"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="h-11"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-sm font-medium">
//                   <Lock className="h-4 w-4 inline mr-2" />
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Masukkan password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     required
//                     className="h-11 pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword" className="text-sm font-medium">
//                     <Lock className="h-4 w-4 inline mr-2" />
//                     Konfirmasi Password
//                   </Label>
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     placeholder="Ulangi password"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     required={!isLogin}
//                     className="h-11"
//                   />
//                 </div>
//               )}
//               {isLogin && (
//                 <div className="text-right">
//                   <a 
//                     href="https://wa.me/6289692854470?text=Halo,%20saya%20lupa%20password"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-green-600 hover:text-green-700"
//                   >
//                     Lupa password?
//                   </a>
//                 </div>
//               )}
//               {/* ✅ ERROR MESSAGE */}
//               {error && (
//                 <div className="text-red-600 text-sm text-center">{error}</div>
//               )}
//               {/* ✅ SUCCESS MESSAGE */}
//               {success && (
//                 <div className="text-green-600 text-sm text-center">{success}</div>
//               )}
//               <Button 
//                 type="submit" 
//                 className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium"
//               >
//                 {isLogin ? "🔐 Masuk" : "📝 Daftar"}
//               </Button>
//             </form>
//             <div className="mt-6 text-center">
//               <p className="text-gray-600 text-sm">
//                 {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
//                 <button
//                   onClick={() => {
//                     setIsLogin(!isLogin);
//                     setError("");
//                     setSuccess("");
//                   }}
//                   className="ml-2 text-green-600 hover:text-green-700 font-medium"
//                 >
//                   {isLogin ? "Daftar di sini" : "Masuk di sini"}
//                 </button>
//               </p>
//             </div>
//             <div className="my-6 flex items-center">
//               <div className="flex-1 border-t border-gray-300"></div>
//               <span className="px-4 text-gray-500 text-sm">atau</span>
//               <div className="flex-1 border-t border-gray-300"></div>
//             </div>
//             <div className="mb-6 flex justify-center">
//               <GoogleLogin
//                 onSuccess={async credentialResponse => {
//                   try {
//                     await signInWithGoogle(credentialResponse.credential || "");
//                     navigate("/");
//                   } catch (err: any) {
//                     setError(err.message || "Login Google gagal");
//                   }
//                 }}
//                 onError={() => setError('Login Google gagal')}
//                 useOneTap
//               />
//             </div>
//             <div className="space-y-3">
//               <a 
//                 href="https://wa.me/6289692854470?text=Halo%20Kuala%20Outdoor,%20saya%20ingin%20rental%20equipment"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block"
//               >
//                 <Button variant="outline" className="w-full h-11 border-green-600 text-green-600 hover:bg-green-50">
//                   💬 Langsung Chat WhatsApp
//                 </Button>
//               </a>
//               <p className="text-center text-xs text-gray-500">
//                 📞 089692854470 • 082253446316<br />
//                 Melayani 24 jam (Fast Response)
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//         <div className="mt-8 text-center">
//           <p className="text-xs text-gray-500">
//             Dengan mendaftar, Anda menyetujui{" "}
//             <Link to="/about" className="text-green-600 hover:underline">
//               Syarat & Ketentuan
//             </Link>{" "}
//             kami
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;

// filepath: [Auth.tsx](http://_vscodecontentref_/3)
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ArrowLeft, Eye, EyeOff, Mountain, User, Mail, Lock, Phone } from "lucide-react";
// import { GoogleLogin } from '@react-oauth/google';
// import { useAuth } from "@/contexts/AuthContext";

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "" // ✅ Tambahkan phone di state
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(""); // ✅ pesan sukses
//   const { signIn, signUp, signInWithGoogle } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     try {
//       if (isLogin) {
//         if (!formData.email || !formData.password) {
//           setError("Email dan password wajib diisi.");
//           return;
//         }
//         await signIn(formData.email, formData.password);
//         navigate("/");
//       } else {
//         if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
//           setError("Semua field wajib diisi.");
//           return;
//         }
//         if (formData.password !== formData.confirmPassword) {
//           setError("Password dan konfirmasi password tidak cocok.");
//           return;
//         }
//         if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
//           setError("Password harus mengandung huruf besar dan angka.");
//           return;
//         }
//         await signUp(formData.name, formData.email, formData.password, formData.phone); // ✅ Kirim phone ke backend
//         setSuccess("Registrasi berhasil! Silakan login.");
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           phone: "" // Reset phone
//         });
//         setTimeout(() => {
//           setIsLogin(true);
//           setSuccess("");
//         }, 1500); // otomatis pindah ke login setelah 1.5 detik
//       }
//     } catch (err: any) {
//       setError(err.message || "Login/Registrasi gagal");
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
//           <ArrowLeft className="h-4 w-4" />
//           Kembali ke Home
//         </Link>
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Mountain className="h-8 w-8 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900">KUALA OUTDOOR</h1>
//           <p className="text-gray-600">Penyewaan Alat Camping & Pendakian</p>
//         </div>
//         <Card className="shadow-xl border-0">
//           <CardHeader>
//             <CardTitle className="text-center">
//               {isLogin ? "🔐 Masuk ke Akun" : "📝 Daftar Akun Baru"}
//             </CardTitle>
//             <p className="text-center text-gray-600 text-sm">
//               {isLogin ? "Masuk untuk melanjutkan rental equipment" : "Buat akun untuk mulai rental equipment"}
//             </p>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-sm font-medium">
//                     <User className="h-4 w-4 inline mr-2" />
//                     Nama Lengkap
//                   </Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     type="text"
//                     placeholder="Masukkan nama lengkap"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required={!isLogin}
//                     className="h-11"
//                   />
//                 </div>
//               )}
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="phone" className="text-sm font-medium">
//                     <Phone className="h-4 w-4 inline mr-2" />
//                     Nomor Telepon
//                   </Label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="text"
//                     placeholder="Masukkan nomor telepon"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     required={!isLogin}
//                     className="h-11"
//                   />
//                 </div>
//               )}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium">
//                   <Mail className="h-4 w-4 inline mr-2" />
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="contoh@email.com"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="h-11"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-sm font-medium">
//                   <Lock className="h-4 w-4 inline mr-2" />
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Masukkan password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     required
//                     className="h-11 pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>
//               {!isLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword" className="text-sm font-medium">
//                     <Lock className="h-4 w-4 inline mr-2" />
//                     Konfirmasi Password
//                   </Label>
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     placeholder="Ulangi password"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     required={!isLogin}
//                     className="h-11"
//                   />
//                 </div>
//               )}
//               {isLogin && (
//                 <div className="text-right">
//                   <a 
//                     href="https://wa.me/6289692854470?text=Halo,%20saya%20lupa%20password"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-green-600 hover:text-green-700"
//                   >
//                     Lupa password?
//                   </a>
//                 </div>
//               )}
//               {/* ✅ ERROR MESSAGE */}
//               {error && (
//                 <div className="text-red-600 text-sm text-center">{error}</div>
//               )}
//               {/* ✅ SUCCESS MESSAGE */}
//               {success && (
//                 <div className="text-green-600 text-sm text-center">{success}</div>
//               )}
//               <Button 
//                 type="submit" 
//                 className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium"
//               >
//                 {isLogin ? "🔐 Masuk" : "📝 Daftar"}
//               </Button>
//             </form>
//             <div className="mt-6 text-center">
//               <p className="text-gray-600 text-sm">
//                 {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
//                 <button
//                   onClick={() => {
//                     setIsLogin(!isLogin);
//                     setError("");
//                     setSuccess("");
//                   }}
//                   className="ml-2 text-green-600 hover:text-green-700 font-medium"
//                 >
//                   {isLogin ? "Daftar di sini" : "Masuk di sini"}
//                 </button>
//               </p>
//             </div>
//             <div className="my-6 flex items-center">
//               <div className="flex-1 border-t border-gray-300"></div>
//               <span className="px-4 text-gray-500 text-sm">atau</span>
//               <div className="flex-1 border-t border-gray-300"></div>
//             </div>
//             <div className="mb-6 flex justify-center">
//               <GoogleLogin
//                 onSuccess={async credentialResponse => {
//                   try {
//                     await signInWithGoogle(credentialResponse.credential || "");
//                     navigate("/");
//                   } catch (err: any) {
//                     setError(err.message || "Login Google gagal");
//                   }
//                 }}
//                 onError={() => setError('Login Google gagal')}
//                 useOneTap
//               />
//             </div>
//             <div className="space-y-3">
//               <a 
//                 href="https://wa.me/6289692854470?text=Halo%20Kuala%20Outdoor,%20saya%20ingin%20rental%20equipment"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block"
//               >
//                 <Button variant="outline" className="w-full h-11 border-green-600 text-green-600 hover:bg-green-50">
//                   💬 Langsung Chat WhatsApp
//                 </Button>
//               </a>
//               <p className="text-center text-xs text-gray-500">
//                 📞 089692854470 • 082253446316<br />
//                 Melayani 24 jam (Fast Response)
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//         <div className="mt-8 text-center">
//           <p className="text-xs text-gray-500">
//             Dengan mendaftar, Anda menyetujui{" "}
//             <Link to="/about" className="text-green-600 hover:underline">
//               Syarat & Ketentuan
//             </Link>{" "}
//             kami
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Mountain, User, Mail, Lock, Phone, Loader2 } from "lucide-react";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (isLogin) {
        // Validasi login
        if (!formData.email || !formData.password) {
          setError("Email dan password wajib diisi.");
          setIsLoading(false);
          return;
        }
        
        await signIn(formData.email, formData.password);
        setSuccess("Login berhasil! Mengalihkan...");
        setTimeout(() => navigate("/"), 500);
      } else {
        // Validasi registrasi
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
          setError("Semua field wajib diisi.");
          setIsLoading(false);
          return;
        }
        
        if (formData.password !== formData.confirmPassword) {
          setError("Password dan konfirmasi password tidak cocok.");
          setIsLoading(false);
          return;
        }
        
        if (formData.password.length < 6) {
          setError("Password minimal 6 karakter.");
          setIsLoading(false);
          return;
        }
        
        if (!/[A-Z]/.test(formData.password)) {
          setError("Password harus mengandung minimal 1 huruf besar.");
          setIsLoading(false);
          return;
        }
        
        if (!/[0-9]/.test(formData.password)) {
          setError("Password harus mengandung minimal 1 angka.");
          setIsLoading(false);
          return;
        }

        await signUp(formData.name, formData.email, formData.password, formData.phone);
        setSuccess("✅ Registrasi berhasil! Silakan login.");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: ""
        });
        
        setTimeout(() => {
          setIsLogin(true);
          setSuccess("");
        }, 2000);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error saat user mulai mengetik
    if (error) setError("");
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithGoogle(credentialResponse.credential || "");
      setSuccess("Login Google berhasil! Mengalihkan...");
      setTimeout(() => navigate("/"), 500);
    } catch (err: any) {
      console.error('Google login error:', err);
      setError(err.message || "Login Google gagal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Home
        </Link>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mountain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">KUALA OUTDOOR</h1>
          <p className="text-gray-600">Penyewaan Alat Camping & Pendakian</p>
        </div>
        
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center">
              {isLogin ? "🔐 Masuk ke Akun" : "📝 Daftar Akun Baru"}
            </CardTitle>
            <p className="text-center text-gray-600 text-sm">
              {isLogin ? "Masuk untuk melanjutkan rental equipment" : "Buat akun untuk mulai rental equipment"}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    <User className="h-4 w-4 inline mr-2" />
                    Nama Lengkap
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>
              )}
              
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Nomor Telepon
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contoh@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  <Lock className="h-4 w-4 inline mr-2" />
                  Password {!isLogin && <span className="text-xs text-gray-500">(min. 6 karakter, 1 huruf besar, 1 angka)</span>}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-11 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    <Lock className="h-4 w-4 inline mr-2" />
                    Konfirmasi Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>
              )}
              
              {isLogin && (
                <div className="text-right">
                  <a 
                    href="https://wa.me/6289692854470?text=Halo,%20saya%20lupa%20password"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Lupa password?
                  </a>
                </div>
              )}
              
              {/* ERROR MESSAGE */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  ⚠️ {error}
                </div>
              )}
              
              {/* SUCCESS MESSAGE */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {isLogin ? "Masuk..." : "Mendaftar..."}
                  </>
                ) : (
                  isLogin ? "🔐 Masuk" : "📝 Daftar"
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setSuccess("");
                    setFormData({
                      name: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      phone: ""
                    });
                  }}
                  className="ml-2 text-green-600 hover:text-green-700 font-medium"
                  disabled={isLoading}
                >
                  {isLogin ? "Daftar di sini" : "Masuk di sini"}
                </button>
              </p>
            </div>
            
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">atau</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            
            <div className="mb-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Login Google gagal. Silakan coba lagi.')}
                useOneTap
              />
            </div>
            
            <div className="space-y-3">
              <a 
                href="https://wa.me/6289692854470?text=Halo%20Kuala%20Outdoor,%20saya%20ingin%20rental%20equipment"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full h-11 border-green-600 text-green-600 hover:bg-green-50">
                  💬 Langsung Chat WhatsApp
                </Button>
              </a>
              <p className="text-center text-xs text-gray-500">
                📞 089692854470 • 082253446316<br />
                Melayani 24 jam (Fast Response)
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Dengan mendaftar, Anda menyetujui{" "}
            <Link to="/about" className="text-green-600 hover:underline">
              Syarat & Ketentuan
            </Link>{" "}
            kami
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;