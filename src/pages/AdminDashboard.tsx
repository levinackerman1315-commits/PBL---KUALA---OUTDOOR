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

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Kuala Outdoor Management System</p>
          </div>
          
          <Button onClick={handleLogout} variant="outline">
            🚪 Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/bookings">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">📋 Kelola Booking</h3>
                <p className="text-gray-600">Konfirmasi dan tracking booking</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/equipment">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">📦 Kelola Equipment</h3>
                <p className="text-gray-600">Tambah dan edit equipment</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">👥 Kelola Customer</h3>
              <p className="text-gray-600">Data customer dan history</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>🎉 Dashboard Test Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Selamat! Login admin berhasil. Dashboard ini masih dalam mode test.
              </p>
              <div className="mt-4 space-x-2">
                <Link to="/admin/bookings">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Test Booking Management
                  </Button>
                </Link>
                <Link to="/admin/equipment">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Test Equipment Management
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;