


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Package, ShoppingCart, Users, TrendingUp, Calendar, DollarSign, AlertCircle, Mountain, Shirt } from "lucide-react";
import { Phone } from "lucide-react";
const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
  };

  // Data statistik dummy
  const stats = [
    { label: "Total Booking", value: "24", icon: Calendar, color: "bg-blue-500", trend: "+12%" },
    { label: "Equipment", value: "156", icon: Package, color: "bg-green-500", trend: "+5%" },
    { label: "Customers", value: "89", icon: Users, color: "bg-purple-500", trend: "+8%" },
    { label: "Revenue", value: "Rp 12.5jt", icon: DollarSign, color: "bg-yellow-500", trend: "+15%" },
  ];

  // Menu data
  const menus = [
    {
      to: "/admin/bookings",
      icon: <Calendar className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors" />,
      bg: "bg-blue-100 group-hover:bg-blue-500",
      border: "hover:border-blue-400",
      title: "📋 Kelola Booking",
      color: "group-hover:text-blue-600",
      desc: "Konfirmasi dan tracking booking"
    },
    {
      to: "/admin/equipment",
      icon: <Package className="h-10 w-10 text-green-600 group-hover:text-white transition-colors" />,
      bg: "bg-green-100 group-hover:bg-green-500",
      border: "hover:border-green-400",
      title: "📦 Kelola Equipment",
      color: "group-hover:text-green-600",
      desc: "Tambah dan edit equipment"
    },
    {
      to: "/admin/customers",
      icon: <Users className="h-10 w-10 text-purple-600 group-hover:text-white transition-colors" />,
      bg: "bg-purple-100 group-hover:bg-purple-500",
      border: "hover:border-purple-400",
      title: "👥 Kelola Customer",
      color: "group-hover:text-purple-600",
      desc: "Data customer dan history"
    },
    {
      to: "/admin/trips",
      icon: <Mountain className="h-10 w-10 text-emerald-600 group-hover:text-white transition-colors" />,
      bg: "bg-emerald-100 group-hover:bg-emerald-500",
      border: "hover:border-emerald-400",
      title: "🗺️ Kelola Open Trip",
      color: "group-hover:text-emerald-600",
      desc: "Tambah dan edit trip"
    },
    {
      to: "/admin/merchandise",
      icon: <Shirt className="h-10 w-10 text-orange-600 group-hover:text-white transition-colors" />,
      bg: "bg-orange-100 group-hover:bg-orange-500",
      border: "hover:border-orange-400",
      title: "👕 Kelola Merchandise",
      color: "group-hover:text-orange-600",
      desc: "Tambah dan edit merchandise"
    },
{
    to: "/admin/contact",
    icon: <Phone className="h-10 w-10 text-cyan-600 group-hover:text-white transition-colors" />,
    bg: "bg-cyan-100 group-hover:bg-cyan-500",
    border: "hover:border-cyan-400",
    title: "📞 Kelola Kontak",
    color: "group-hover:text-cyan-600",
    desc: "Ubah nomor telepon & info kontak"
  }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const borderColorClass = stat.color.replace("bg-", "border-");
            return (
              <Card
                key={index}
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 ${borderColorClass}`}
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

        {/* Quick Access Menu */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          Quick Access Menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
          {menus.map((menu, idx) => (
            <Link to={menu.to} className="group" key={idx}>
              <Card className={`border-2 rounded-2xl min-h-[260px] min-w-[220px] flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${menu.border}`}>
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <div className={`w-24 h-24 ${menu.bg} rounded-full flex items-center justify-center mb-6 transition-colors`}>
                    {menu.icon}
                  </div>
                  <h3 className={`font-semibold text-xl mb-2 ${menu.color} transition-colors`}>
                    {menu.title}
                  </h3>
                  <p className="text-gray-600 text-base">{menu.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Test Mode Card */}
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

        {/* Recent Activity Section */}
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