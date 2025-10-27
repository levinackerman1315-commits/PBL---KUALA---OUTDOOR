import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft,
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  Package,
  DollarSign,
  User,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Mock data - nanti diganti dengan API call
//   useEffect(() => {
//     const mockBookings = [
//       {
//         booking_id: 1,
//         booking_code: "KO-2024-001",
//         customer_name: "Ahmad Fauzi",
//         customer_phone: "081234567890",
//         customer_email: "ahmad@email.com",
//         equipment_name: "Tenda Dome 4 Orang + Sleeping Bag",
//         start_date: "2024-10-25",
//         end_date: "2024-10-27",
//         estimated_duration: 2,
//         total_estimated_cost: 105000,
//         status: "pending",
//         payment_status: "unpaid",
//         created_at: "2024-10-20 14:30:00"
//       },
//       {
//         booking_id: 2,
//         booking_code: "KO-2024-002", 
//         customer_name: "Siti Nurhaliza",
//         customer_phone: "082345678901",
//         customer_email: "siti@email.com",
//         equipment_name: "Tas Gunung 60L + Matras",
//         start_date: "2024-10-24",
//         end_date: "2024-10-25",
//         estimated_duration: 1,
//         total_estimated_cost: 45000,
//         status: "confirmed",
//         payment_status: "partial",
//         created_at: "2024-10-19 09:15:00"
//       },
//       {
//         booking_id: 3,
//         booking_code: "KO-2024-003",
//         customer_name: "Budi Santoso", 
//         customer_phone: "083456789012",
//         customer_email: "budi@email.com",
//         equipment_name: "Kompor Portable + Nesting",
//         start_date: "2024-10-23",
//         end_date: "2024-10-24",
//         estimated_duration: 1,
//         total_estimated_cost: 25000,
//         status: "active",
//         payment_status: "paid",
//         created_at: "2024-10-18 16:45:00"
//       },
//       {
//         booking_id: 4,
//         booking_code: "KO-2024-004",
//         customer_name: "Maya Indira",
//         customer_phone: "084567890123", 
//         customer_email: "maya@email.com",
//         equipment_name: "Tenda 2 Orang + Sleeping Bag",
//         start_date: "2024-10-26",
//         end_date: "2024-10-28",
//         estimated_duration: 2,
//         total_estimated_cost: 80000,
//         status: "pending",
//         payment_status: "unpaid",
//         created_at: "2024-10-20 11:20:00"
//       },
//       {
//         booking_id: 5,
//         booking_code: "KO-2024-005",
//         customer_name: "Rizki Pratama",
//         customer_phone: "085678901234",
//         customer_email: "rizki@email.com", 
//         equipment_name: "Paket Camping 4 Orang",
//         start_date: "2024-10-22",
//         end_date: "2024-10-24",
//         estimated_duration: 2,
//         total_estimated_cost: 150000,
//         status: "completed",
//         payment_status: "paid",
//         created_at: "2024-10-17 13:10:00"
//       },
//     ];
    
//     setBookings(mockBookings);
//     setFilteredBookings(mockBookings);
//   }, []);


// CARI bagian ini di file BookingManagement.tsx:
useEffect(() => {
  // HAPUS semua mock data di sini
  
  // GANTI DENGAN KODE INI:
  const fetchBookings = async () => {
    try {
      console.log("🔍 Fetching bookings from API...");
      
      const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/bookings.php');
      const data = await response.json();
      
      console.log("✅ Bookings data received:", data);
      
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      console.error('❌ Error fetching bookings:', error);
      alert('Gagal memuat data booking dari database. Menggunakan mock data.');
      
      // Fallback ke mock data jika API gagal
      const mockBookings = [
        {
          booking_id: 1,
          booking_code: "KO-2024-001",
          customer_name: "Ahmad Fauzi (MOCK)",
          customer_phone: "081234567890",
          customer_email: "ahmad@email.com",
          equipment_name: "Tenda Dome 4 Orang + Sleeping Bag",
          start_date: "2024-10-25",
          end_date: "2024-10-27",
          estimated_duration: 2,
          total_estimated_cost: 105000,
          status: "pending",
          payment_status: "unpaid",
          created_at: "2024-10-20 14:30:00"
        }
      ];
      
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
    }
  };

  fetchBookings();
}, []);

  // Filter bookings
  useEffect(() => {
    let filtered = bookings;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.booking_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.equipment_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }
    
    // Payment filter
    if (paymentFilter !== "all") {
      filtered = filtered.filter(booking => booking.payment_status === paymentFilter);
    }
    
    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, paymentFilter]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'unpaid': return 'bg-red-500';
      case 'partial': return 'bg-yellow-500'; // 🟡 DP Paid
      case 'paid': return 'bg-green-500';     // 🟢 Fully Paid
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Menunggu';
      case 'confirmed': return 'Dikonfirmasi';
      case 'active': return 'Berlangsung';
      case 'completed': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  const getPaymentStatusText = (status) => {
    switch(status) {
      case 'unpaid': return 'Belum Bayar';
      case 'partial': return 'DP Paid'; // 🟡
      case 'paid': return 'Lunas';      // 🟢
      default: return status;
    }
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev => prev.map(booking => 
      booking.booking_id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
    alert(`Status booking diubah ke: ${getStatusText(newStatus)}`);
  };

  const handlePaymentStatusChange = (bookingId, newPaymentStatus) => {
    setBookings(prev => prev.map(booking => 
      booking.booking_id === bookingId 
        ? { ...booking, payment_status: newPaymentStatus }
        : booking
    ));
    
    // TODO: Update stock ketika payment status berubah
    if (newPaymentStatus === 'partial') {
      alert('✅ DP dikonfirmasi! Stok equipment dikurangi (reserved)');
    } else if (newPaymentStatus === 'paid') {
      alert('✅ Pembayaran lunas! Equipment siap disewa');
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    active: bookings.filter(b => b.status === 'active').length,
    unpaid: bookings.filter(b => b.payment_status === 'unpaid').length,
    partial: bookings.filter(b => b.payment_status === 'partial').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ HEADER */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kelola Booking</h1>
                <p className="text-gray-600">Konfirmasi dan tracking semua booking</p>
              </div>
            </div>
            
            <Button className="bg-green-600 hover:bg-green-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* ✅ STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Booking</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Menunggu</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.confirmed}</div>
              <div className="text-sm text-gray-600">Dikonfirmasi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Berlangsung</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.unpaid}</div>
              <div className="text-sm text-gray-600">Belum Bayar</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.partial}</div>
              <div className="text-sm text-gray-600">DP Paid</div>
            </CardContent>
          </Card>
        </div>

        {/* ✅ FILTERS */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari customer, kode booking, atau equipment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Menunggu</option>
                <option value="confirmed">Dikonfirmasi</option>
                <option value="active">Berlangsung</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
              
              <select 
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">Semua Payment</option>
                <option value="unpaid">Belum Bayar</option>
                <option value="partial">DP Paid</option>
                <option value="paid">Lunas</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* ✅ BOOKINGS TABLE */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Daftar Booking ({filteredBookings.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <Card key={booking.booking_id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      {/* BOOKING INFO */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                              {booking.booking_code}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              📅 {new Date(booking.created_at).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={`${getStatusColor(booking.status)} text-white text-xs`}>
                              {getStatusText(booking.status)}
                            </Badge>
                            <Badge className={`${getPaymentStatusColor(booking.payment_status)} text-white text-xs`}>
                              {getPaymentStatusText(booking.payment_status)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{booking.customer_name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <a href={`tel:${booking.customer_phone}`} className="text-blue-600 hover:underline">
                              {booking.customer_phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-gray-500" />
                            <span>{booking.equipment_name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>
                              {new Date(booking.start_date).toLocaleDateString('id-ID')} - {' '}
                              {new Date(booking.end_date).toLocaleDateString('id-ID')} ({booking.estimated_duration} hari)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="font-semibold text-green-600">
                              Rp {booking.total_estimated_cost.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="lg:col-span-2">
                        <div className="space-y-3">
                          {/* STATUS ACTIONS */}
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Update Status Booking:
                            </label>
                            <div className="flex gap-2 flex-wrap">
                              {booking.status === 'pending' && (
                                <Button 
                                  size="sm"
                                  onClick={() => handleStatusChange(booking.booking_id, 'confirmed')}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Konfirmasi
                                </Button>
                              )}
                              {booking.status === 'confirmed' && (
                                <Button 
                                  size="sm"
                                  onClick={() => handleStatusChange(booking.booking_id, 'active')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Package className="h-4 w-4 mr-1" />
                                  Mulai Rental
                                </Button>
                              )}
                              {booking.status === 'active' && (
                                <Button 
                                  size="sm"
                                  onClick={() => handleStatusChange(booking.booking_id, 'completed')}
                                  className="bg-gray-600 hover:bg-gray-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Selesai
                                </Button>
                              )}
                              <Button 
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusChange(booking.booking_id, 'cancelled')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>

                          {/* PAYMENT ACTIONS */}
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Update Status Payment:
                            </label>
                            <div className="flex gap-2 flex-wrap">
                              {booking.payment_status === 'unpaid' && (
                                <>
                                  <Button 
                                    size="sm"
                                    onClick={() => handlePaymentStatusChange(booking.booking_id, 'partial')}
                                    className="bg-yellow-600 hover:bg-yellow-700"
                                  >
                                    🟡 Konfirm DP
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={() => handlePaymentStatusChange(booking.booking_id, 'paid')}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    🟢 Konfirm Lunas
                                  </Button>
                                </>
                              )}
                              {booking.payment_status === 'partial' && (
                                <Button 
                                  size="sm"
                                  onClick={() => handlePaymentStatusChange(booking.booking_id, 'paid')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  🟢 Konfirm Lunas
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* CONTACT ACTIONS */}
                          <div className="flex gap-2">
                            <a 
                              href={`https://wa.me/62${booking.customer_phone.substring(1)}?text=Halo%20${booking.customer_name},%20terkait%20booking%20${booking.booking_code}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" variant="outline" className="text-green-600">
                                💬 WhatsApp
                              </Button>
                            </a>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Detail
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Tidak ada booking yang ditemukan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingManagement;