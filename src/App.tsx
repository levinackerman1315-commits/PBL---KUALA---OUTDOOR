// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import Index from "./pages/Index";
// import Auth from "./pages/Auth";
// import Browse from "./pages/Browse";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";

// // Temporary placeholder components for missing pages
// const Packages = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Paket Rental</h1>
//       <p className="text-gray-600 text-lg mb-8">Paket lengkap untuk petualangan Anda - Coming Soon!</p>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Fitur ini sedang dalam pengembangan</p>
//       </div>
//     </div>
//   </div>
// );

// const Trips = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Open Trip</h1>
//       <p className="text-gray-600 text-lg mb-8">Bergabunglah dengan petualangan bersama - Coming Soon!</p>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Fitur ini sedang dalam pengembangan</p>
//       </div>
//     </div>
//   </div>
// );

// const About = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h1>
//       <div className="bg-white rounded-lg shadow p-8">
//         <p className="text-gray-600 mb-4">
//           Kelana Outdoor adalah platform penyewaan peralatan outdoor terpercaya di Indonesia.
//         </p>
//         <p className="text-gray-600 mb-4">
//           Kami menyediakan berbagai peralatan berkualitas untuk mendukung petualangan Anda,
//           mulai dari mendaki gunung, camping, hingga aktivitas outdoor lainnya.
//         </p>
//         <p className="text-gray-600">
//           Dengan pengalaman bertahun-tahun, kami berkomitmen memberikan layanan terbaik
//           untuk para petualang Indonesia.
//         </p>
//       </div>
//     </div>
//   </div>
// );

// const Cart = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Keranjang Belanja</h1>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Keranjang Anda kosong</p>
//         <p className="text-gray-400 text-sm mt-2">Mulai browse equipment untuk menambahkan item</p>
//       </div>
//     </div>
//   </div>
// );

// const Bookings = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Riwayat Booking</h1>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Belum ada riwayat booking</p>
//         <p className="text-gray-400 text-sm mt-2">Booking pertama Anda akan muncul di sini</p>
//       </div>
//     </div>
//   </div>
// );

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/auth" element={<Auth />} />
//             <Route path="/browse" element={<Browse />} />
//             <Route path="/packages" element={<Packages />} />
//             <Route path="/trips" element={<Trips />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/bookings" element={<Bookings />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import Index from "./pages/Index";
// import Auth from "./pages/Auth";
// import Browse from "./pages/Browse";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";

// // ✅ TAMBAHKAN IMPORT INI
// import EquipmentDetail from "./pages/EquipmentDetail";
// import BookingForm from "./pages/BookingForm";

// // Temporary placeholder components for missing pages
// const Packages = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Paket Rental</h1>
//       <p className="text-gray-600 text-lg mb-8">Paket lengkap untuk petualangan Anda - Coming Soon!</p>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Fitur ini sedang dalam pengembangan</p>
//       </div>
//     </div>
//   </div>
// );

// const Trips = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Open Trip</h1>
//       <p className="text-gray-600 text-lg mb-8">Bergabunglah dengan petualangan bersama - Coming Soon!</p>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Fitur ini sedang dalam pengembangan</p>
//       </div>
//     </div>
//   </div>
// );

// const About = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h1>
//       <div className="bg-white rounded-lg shadow p-8">
//         <p className="text-gray-600 mb-4">
//           Kelana Outdoor adalah platform penyewaan peralatan outdoor terpercaya di Indonesia.
//         </p>
//         <p className="text-gray-600 mb-4">
//           Kami menyediakan berbagai peralatan berkualitas untuk mendukung petualangan Anda,
//           mulai dari mendaki gunung, camping, hingga aktivitas outdoor lainnya.
//         </p>
//         <p className="text-gray-600">
//           Dengan pengalaman bertahun-tahun, kami berkomitmen memberikan layanan terbaik
//           untuk para petualang Indonesia.
//         </p>
//       </div>
//     </div>
//   </div>
// );

// const Cart = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Keranjang Belanja</h1>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Keranjang Anda kosong</p>
//         <p className="text-gray-400 text-sm mt-2">Mulai browse equipment untuk menambahkan item</p>
//       </div>
//     </div>
//   </div>
// );

// const Bookings = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Riwayat Booking</h1>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Belum ada riwayat booking</p>
//         <p className="text-gray-400 text-sm mt-2">Booking pertama Anda akan muncul di sini</p>
//       </div>
//     </div>
//   </div>
// );

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/auth" element={<Auth />} />
//             <Route path="/browse" element={<Browse />} />
//             <Route path="/packages" element={<Packages />} />
//             <Route path="/trips" element={<Trips />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/bookings" element={<Bookings />} />
            
//             {/* ✅ TAMBAHKAN ROUTES INI */}
//             <Route path="/equipment/:id" element={<EquipmentDetail />} />
//             <Route path="/booking/form" element={<BookingForm />} />
            
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import { CartProvider } from "./contexts/CartContext"; // ✅ PASTIKAN INI ADA
// import Index from "./pages/Index";
// import Auth from "./pages/Auth";
// import Browse from "./pages/Browse";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";
// import EquipmentDetail from "./pages/EquipmentDetail";
// import BookingForm from "./pages/BookingForm";

// // ✅ TAMBAHKAN IMPORT INI


// // Temporary placeholder components for missing pages
// const Packages = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Paket Rental</h1>
//       <p className="text-gray-600 text-lg mb-8">Paket lengkap untuk petualangan Anda - Coming Soon!</p>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Fitur ini sedang dalam pengembangan</p>
//       </div>
//     </div>
//   </div>
// );

// const Trips = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Open Trip</h1>
//       <p className="text-gray-600 text-lg mb-8">Bergabunglah dengan petualangan bersama - Coming Soon!</p>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Fitur ini sedang dalam pengembangan</p>
//       </div>
//     </div>
//   </div>
// );

// const About = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h1>
//       <div className="bg-white rounded-lg shadow p-8">
//         <p className="text-gray-600 mb-4">
//           Kelana Outdoor adalah platform penyewaan peralatan outdoor terpercaya di Indonesia.
//         </p>
//         <p className="text-gray-600 mb-4">
//           Kami menyediakan berbagai peralatan berkualitas untuk mendukung petualangan Anda,
//           mulai dari mendaki gunung, camping, hingga aktivitas outdoor lainnya.
//         </p>
//         <p className="text-gray-600">
//           Dengan pengalaman bertahun-tahun, kami berkomitmen memberikan layanan terbaik
//           untuk para petualang Indonesia.
//         </p>
//       </div>
//     </div>
//   </div>
// );

// const Cart = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Keranjang Belanja</h1>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Keranjang Anda kosong</p>
//         <p className="text-gray-400 text-sm mt-2">Mulai browse equipment untuk menambahkan item</p>
//       </div>
//     </div>
//   </div>
// );

// const Bookings = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Riwayat Booking</h1>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Belum ada riwayat booking</p>
//         <p className="text-gray-400 text-sm mt-2">Booking pertama Anda akan muncul di sini</p>
//       </div>
//     </div>
//   </div>
// );

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <CartProvider> {/* ✅ HARUS ADA DAN TIDAK DI-COMMENT */}
//             <Routes>
//               <Route path="/" element={<Index />} />
//               <Route path="/auth" element={<Auth />} />
//               <Route path="/browse" element={<Browse />} />
//               <Route path="/packages" element={<Packages />} />
//               <Route path="/trips" element={<Trips />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/bookings" element={<Bookings />} />
            
//               {/* ✅ TAMBAHKAN ROUTES INI */}
//               <Route path="/equipment/:id" element={<EquipmentDetail />} />
//               <Route path="/booking/form" element={<BookingForm />} />
            
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </CartProvider>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import { CartProvider } from "./contexts/CartContext"; // ✅ Cart Context
// import Index from "./pages/Index";
// import Auth from "./pages/Auth";
// import Browse from "./pages/Browse";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";
// import EquipmentDetail from "./pages/EquipmentDetail";
// import BookingForm from "./pages/BookingForm";
// import CartPage from "./pages/CartPage"; // ✅ TAMBAH IMPORT INI
// import Packages from "./pages/Packages";
// import Trips from "./pages/Trips";
// import About from "./pages/About";
// Temporary placeholder components for missing pages
// const Packages = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Paket Rental</h1>
//       <p className="text-gray-600 text-lg mb-8">Paket lengkap untuk petualangan Anda - Coming Soon!</p>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Fitur ini sedang dalam pengembangan</p>
//       </div>
//     </div>
//   </div>
// );

// const Trips = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Open Trip</h1>
//       <p className="text-gray-600 text-lg mb-8">Bergabunglah dengan petualangan bersama - Coming Soon!</p>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Fitur ini sedang dalam pengembangan</p>
//       </div>
//     </div>
//   </div>
// );

// const About = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h1>
//       <div className="bg-white rounded-lg shadow p-8">
//         <p className="text-gray-600 mb-4">
//           Kelana Outdoor adalah platform penyewaan peralatan outdoor terpercaya di Indonesia.
//         </p>
//         <p className="text-gray-600 mb-4">
//           Kami menyediakan berbagai peralatan berkualitas untuk mendukung petualangan Anda,
//           mulai dari mendaki gunung, camping, hingga aktivitas outdoor lainnya.
//         </p>
//         <p className="text-gray-600">
//           Dengan pengalaman bertahun-tahun, kami berkomitmen memberikan layanan terbaik
//           untuk para petualang Indonesia.
//         </p>
//       </div>
//     </div>
//   </div>
// );

// const Bookings = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Riwayat Booking</h1>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Belum ada riwayat booking</p>
//         <p className="text-gray-400 text-sm mt-2">Booking pertama Anda akan muncul di sini</p>
//       </div>
//     </div>
//   </div>
// );

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <CartProvider> {/* ✅ WRAP DENGAN CARTPROVIDER */}
//             <Routes>
//               <Route path="/" element={<Index />} />
//               <Route path="/auth" element={<Auth />} />
//               <Route path="/browse" element={<Browse />} />
//               <Route path="/packages" element={<Packages />} />
//               <Route path="/trips" element={<Trips />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/cart" element={<CartPage />} /> {/* ✅ GANTI DENGAN CARTPAGE */}
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/bookings" element={<Bookings />} />
//               <Route path="/equipment/:id" element={<EquipmentDetail />} />
//               <Route path="/booking/form" element={<BookingForm />} />
//               <Route path="/packages" element={<Packages />} />  // 📦 Paket Rental
//               <Route path="/trips" element={<Trips />} />        // 🏔️ Open Trip
//               <Route path="/about" element={<About />} />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </CartProvider>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // ✅ CONTEXTS
// import { AuthProvider } from "./contexts/AuthContext";
// import { CartProvider } from "./contexts/CartContext";

// // ✅ PUBLIC PAGES
// import Index from "./pages/Index";
// import Auth from "./pages/Auth";
// import Browse from "./pages/Browse";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";
// import EquipmentDetail from "./pages/EquipmentDetail";
// import BookingForm from "./pages/BookingForm";
// import CartPage from "./pages/CartPage";
// import Packages from "./pages/Packages";
// import Trips from "./pages/Trips";
// import About from "./pages/About";
// import AdminDashboard from "./pages/AdminDashboard";
// ✅ ADMIN PAGES
// import AdminLogin from "./pages/AdminLogin";
// import BookingManagement from "./pages/BookingManagement";
// import AdminDashboard from "./pages/AdminDashboard"; // Akan dibuat nanti
// import { ProtectedRoute } from "./components/ProtectedRoute";
// import EquipmentManagement from "./pages/EquipmentManagement";
// ✅ TEMPORARY BOOKINGS COMPONENT
// const Bookings = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Riwayat Booking</h1>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Belum ada riwayat booking</p>
//         <p className="text-gray-400 text-sm mt-2">Booking pertama Anda akan muncul di sini</p>
//       </div>
//     </div>
//   </div>
// );

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <CartProvider>
//             <Routes>
//               {/* ✅ PUBLIC ROUTES */}
//               <Route path="/" element={<Index />} />
//               <Route path="/auth" element={<Auth />} />
//               <Route path="/browse" element={<Browse />} />
//               <Route path="/packages" element={<Packages />} />
//               <Route path="/trips" element={<Trips />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/cart" element={<CartPage />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/bookings" element={<Bookings />} />
//               <Route path="/equipment/:id" element={<EquipmentDetail />} />
//               <Route path="/booking/form" element={<BookingForm />} />
//               <Route path="/admin/login" element={<AdminLogin />} />
//               <Route 
//   path="/admin/bookings" 
//   element={
//     <ProtectedRoute>
//       <BookingManagement />
//     </ProtectedRoute>
//   } 
// />
//               <Route 
//   path="/admin/dashboard" 
//   element={
//     <ProtectedRoute>
//       <AdminDashboard />
//     </ProtectedRoute>
//   } 
// />

        //  {/* ✅ ADMIN ROUTES */}
        //       // <Route path="/admin/login" element={<AdminLogin />} />
        //       // {/* 
        //       <Route 
        //         path="/admin/dashboard" 
        //         element={
        //           <ProtectedRoute>
        //             <AdminDashboard />
        //           </ProtectedRoute>
        //         } 
        //       />
        //       */}
              
//               {/* ✅ 404 PAGE */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </CartProvider>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // ✅ CONTEXTS
// import { AuthProvider } from "./contexts/AuthContext";
// import { CartProvider } from "./contexts/CartContext";

// // ✅ PUBLIC PAGES
// import Index from "./pages/Index";
// import Auth from "./pages/Auth";
// import Browse from "./pages/Browse";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";
// import EquipmentDetail from "./pages/EquipmentDetail";
// import BookingForm from "./pages/BookingForm";
// import CartPage from "./pages/CartPage";
// import Packages from "./pages/Packages";
// import Trips from "./pages/Trips";
// import About from "./pages/About";

// // ✅ ADMIN PAGES
// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import BookingManagement from "./pages/BookingManagement";
// import EquipmentManagement from "./pages/EquipmentManagement";
// import { ProtectedRoute } from "./components/ProtectedRoute";

// // ✅ TEMPORARY BOOKINGS COMPONENT
// const Bookings = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Riwayat Booking</h1>
//       <div className="bg-white rounded-lg shadow p-8 text-center">
//         <p className="text-gray-500">Belum ada riwayat booking</p>
//         <p className="text-gray-400 text-sm mt-2">Booking pertama Anda akan muncul di sini</p>
//       </div>
//     </div>
//   </div>
// );

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <CartProvider>
//             <Routes>
//               {/* ✅ PUBLIC ROUTES */}
//               <Route path="/" element={<Index />} />
//               <Route path="/auth" element={<Auth />} />
//               <Route path="/browse" element={<Browse />} />
//               <Route path="/packages" element={<Packages />} />
//               <Route path="/trips" element={<Trips />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/cart" element={<CartPage />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/bookings" element={<Bookings />} />
//               <Route path="/equipment/:id" element={<EquipmentDetail />} />
//               <Route path="/booking/form" element={<BookingForm />} />
              
//               {/* ✅ CUSTOMER LOGIN */}
//               <Route path="/customer/login" element={<Auth />} />
              
//               {/* ✅ ADMIN ROUTES - SEMUA DIGABUNG */}
//               <Route path="/admin/login" element={<AdminLogin />} />
//               <Route 
//                 path="/admin/dashboard" 
//                 element={
//                   <ProtectedRoute>
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 } 
//               />
//               <Route 
//                 path="/admin/bookings" 
//                 element={
//                   <ProtectedRoute>
//                     <BookingManagement />
//                   </ProtectedRoute>
//                 } 
//               />
//               <Route 
//                 path="/admin/equipment" 
//                 element={
//                   <ProtectedRoute>
//                     <EquipmentManagement />
//                   </ProtectedRoute>
//                 } 
//               />
              
//               {/* ✅ 404 PAGE */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </CartProvider>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import EquipmentDetail from "./pages/EquipmentDetail";
import BookingForm from "./pages/BookingForm";
import CartPage from "./pages/CartPage";
import Packages from "./pages/Packages";
import Trips from "./pages/Trips";
import About from "./pages/About";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BookingManagement from "./pages/BookingManagement";
import EquipmentManagement from "./pages/EquipmentManagement";
import { ProtectedRoute } from "./components/ProtectedRoute";

const Bookings = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Riwayat Booking</h1>
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Belum ada riwayat booking</p>
        <p className="text-gray-400 text-sm mt-2">Booking pertama Anda akan muncul di sini</p>
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>  {/* ✅ HARUS ADA DAN TIDAK DI-COMMENT */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/equipment/:id" element={<EquipmentDetail />} />
              <Route path="/booking/form" element={<BookingForm />} />
              <Route path="/customer/login" element={<Auth />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/bookings" 
                element={
                  <ProtectedRoute>
                    <BookingManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/equipment" 
                element={
                  <ProtectedRoute>
                    <EquipmentManagement />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;