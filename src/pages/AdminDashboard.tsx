// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Lock, User, Shield } from "lucide-react";

// const AdminLogin = () => {
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: ""
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // 🚨 UNTUK TEST SEMENTARA (sebelum API ready)
//     if (credentials.username === "admin" && credentials.password === "kuala2024") {
//       localStorage.setItem('admin_token', 'test_token_123');
//       localStorage.setItem('admin_user', JSON.stringify({ 
//         id: 1, 
//         username: 'admin', 
//         name: 'Admin Kuala Outdoor' 
//       }));
      
//       alert("Login berhasil! (Mode Test)");
//       navigate('/admin/dashboard');
//       setLoading(false);
//       return;
//     }

//     try {
//       // TODO: Real API call nanti
//       setError('Username atau password salah');
//     } catch (err) {
//       setError('Terjadi kesalahan sistem');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Shield className="h-8 w-8 text-white" />
//           </div>
//           <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
//           <p className="text-gray-600">Kuala Outdoor Management System</p>
//         </CardHeader>
        
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
            
//             <div className="space-y-2">
//               <Label htmlFor="username">
//                 <User className="h-4 w-4 inline mr-2" />
//                 Username
//               </Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="Masukkan username admin"
//                 value={credentials.username}
//                 onChange={(e) => setCredentials({...credentials, username: e.target.value})}
//                 required
//                 className="h-11"
//               />
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="password">
//                 <Lock className="h-4 w-4 inline mr-2" />
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Masukkan password"
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({...credentials, password: e.target.value})}
//                 required
//                 className="h-11"
//               />
//             </div>
            
//             <Button 
//               type="submit" 
//               className="w-full h-11 bg-green-600 hover:bg-green-700"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "🔐 Login Admin"}
//             </Button>
//           </form>
          
//           <div className="mt-6 text-center">
//             <p className="text-xs text-gray-500">
//               Hanya untuk admin Kuala Outdoor<br />
//               Hubungi supervisor untuk akses
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminLogin;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Package, ShoppingCart, Users, TrendingUp, Calendar, DollarSign, AlertCircle, Mountain, Shirt } from "lucide-react";

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
  };

  // ✅ Data statistik dummy (bisa diganti dengan real data nanti)
  const stats = [
    { label: "Total Booking", value: "24", icon: Calendar, color: "bg-blue-500", trend: "+12%" },
    { label: "Equipment", value: "156", icon: Package, color: "bg-green-500", trend: "+5%" },
    { label: "Customers", value: "89", icon: Users, color: "bg-purple-500", trend: "+8%" },
    { label: "Revenue", value: "Rp 12.5jt", icon: DollarSign, color: "bg-yellow-500", trend: "+15%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* ✅ Header dengan Background Card */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Kuala Outdoor Management System</p>
            </div>
            
            <Button 
              onClick={handleLogout} 
              variant="outline"
              className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* ✅ Stats Cards - TAMBAHAN BARU (tidak menghapus yang lama) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4"
                style={{ borderLeftColor: stat.color.replace('bg-', '#') }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                      </div>
                    </div>
                    <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ✅ Menu Cards - STYLE DIPERBAIKI (tidak dihapus) */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          Quick Access Menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <Link to="/admin/bookings" className="group">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-400">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
                  <Calendar className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  📋 Kelola Booking
                </h3>
                <p className="text-gray-600 text-sm">Konfirmasi dan tracking booking</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/equipment" className="group">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-green-400">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors">
                  <Package className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                  📦 Kelola Equipment
                </h3>
                <p className="text-gray-600 text-sm">Tambah dan edit equipment</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/customers" className="group">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-purple-400">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500 transition-colors">
                  <Users className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                  👥 Kelola Customer
                </h3>
                <p className="text-gray-600 text-sm">Data customer dan history</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/trips" className="group">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-emerald-400">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500 transition-colors">
                  <Mountain className="h-8 w-8 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                  🗺️ Kelola Open Trip
                </h3>
                <p className="text-gray-600 text-sm">Tambah dan edit trip</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/merchandise" className="group">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-orange-400">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
                  <Shirt className="h-8 w-8 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                  👕 Kelola Merchandise
                </h3>
                <p className="text-gray-600 text-sm">Tambah dan edit merchandise</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* ✅ Test Mode Card - TETAP ADA (tidak dihapus) */}
        <Card className="border-2 border-dashed border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Package className="h-5 w-5" />
              🎉 Dashboard Test Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Selamat! Login admin berhasil. Dashboard ini masih dalam mode test.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/admin/bookings">
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Calendar className="h-4 w-4" />
                  Test Booking Management
                </Button>
              </Link>
              <Link to="/admin/equipment">
                <Button className="bg-green-600 hover:bg-green-700 gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Test Equipment Management
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* ✅ BONUS: Recent Activity Section (Optional) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { action: "New booking", user: "John Doe", time: "2 minutes ago", type: "booking" },
                  { action: "Equipment updated", user: "Admin", time: "15 minutes ago", type: "equipment" },
                  { action: "New customer registered", user: "Jane Smith", time: "1 hour ago", type: "customer" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'booking' ? 'bg-blue-100' :
                      activity.type === 'equipment' ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      {activity.type === 'booking' ? <Calendar className="h-5 w-5 text-blue-600" /> :
                       activity.type === 'equipment' ? <Package className="h-5 w-5 text-green-600" /> :
                       <Users className="h-5 w-5 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
