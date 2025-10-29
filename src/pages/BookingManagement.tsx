import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft,
  Search, 
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  Package,
  DollarSign,
  User,
  RefreshCw,
  Trash2 // ✅ TAMBAH ICON TRASH
} from "lucide-react";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // ✅ FETCH DATA DARI API
  const fetchBookings = async () => {
    setLoading(true);
    try {
      console.log("🔍 Fetching bookings from API...");
      
      const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/bookings.php');
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      const data = await response.json();
      
      console.log("✅ Bookings data received:", data);
      
      if (data.success && Array.isArray(data.data)) {
        setBookings(data.data);
        setFilteredBookings(data.data);
      } else if (Array.isArray(data)) {
        setBookings(data);
        setFilteredBookings(data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('❌ Error fetching bookings:', error);
      alert('Gagal memuat data booking dari database.');
      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings
  useEffect(() => {
    let filtered = bookings;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.booking_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.equipment_names?.toLowerCase().includes(searchTerm.toLowerCase())
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
      case 'partial': return 'bg-yellow-500';
      case 'paid': return 'bg-green-500';
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
      case 'partial': return 'DP Paid';
      case 'paid': return 'Lunas';
      default: return status;
    }
  };

  // ✅ UPDATE STATUS BOOKING
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/update_booking_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_id: bookingId,
          status: newStatus
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setBookings(prev => prev.map(booking => 
          booking.booking_id === bookingId 
            ? { ...booking, status: newStatus }
            : booking
        ));
        alert(`✅ Status booking diubah ke: ${getStatusText(newStatus)}`);
      } else {
        alert('❌ Gagal mengubah status: ' + result.message);
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  // ✅ UPDATE PAYMENT STATUS
  const handlePaymentStatusChange = async (bookingId, newPaymentStatus) => {
    try {
      const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/update_payment_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_id: bookingId,
          payment_status: newPaymentStatus
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setBookings(prev => prev.map(booking => 
          booking.booking_id === bookingId 
            ? { ...booking, payment_status: newPaymentStatus }
            : booking
        ));
        
        if (newPaymentStatus === 'partial') {
          alert('✅ DP dikonfirmasi! Stok equipment dikurangi (reserved)');
        } else if (newPaymentStatus === 'paid') {
          alert('✅ Pembayaran lunas! Equipment siap disewa');
        }
      } else {
        alert('❌ Gagal mengubah status payment: ' + result.message);
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  // ✅ TAMBAH FUNGSI HAPUS BOOKING
  const handleDeleteBooking = async (bookingId, bookingCode) => {
    const confirmDelete = window.confirm(
      `⚠️ PERINGATAN!\n\nAnda yakin ingin menghapus booking:\n${bookingCode}?\n\nData yang dihapus tidak dapat dikembalikan!`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/delete_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_id: bookingId
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Hapus dari state
        setBookings(prev => prev.filter(booking => booking.booking_id !== bookingId));
        alert(`✅ Booking ${bookingCode} berhasil dihapus!`);
      } else {
        alert('❌ Gagal menghapus booking: ' + result.message);
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
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
      {/* HEADER */}
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
            
            <Button 
              onClick={fetchBookings}
              className="bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* STATS CARDS */}
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

        {/* FILTERS */}
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

        {/* LOADING STATE */}
        {loading && (
          <Card>
            <CardContent className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Memuat data booking...</p>
            </CardContent>
          </Card>
        )}

        {/* BOOKINGS TABLE */}
        {!loading && (
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
                                📅 {new Date(booking.created_at).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
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
                              <span className="font-medium">{booking.customer_name || 'Nama tidak tersedia'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-gray-500" />
                              <span>{booking.equipment_names || 'Equipment tidak tersedia'}</span>
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
                                Rp {Number(booking.total_estimated_cost || 0).toLocaleString('id-ID')}
                              </span>
                            </div>
                            {booking.notes && (
                              <div className="flex items-start gap-2 mt-2 p-2 bg-gray-50 rounded">
                                <span className="text-xs text-gray-600">
                                  📝 {booking.notes}
                                </span>
                              </div>
                            )}
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

                            {/* ✅ TAMBAH TOMBOL DETAIL & HAPUS */}
                            <div className="flex gap-2 pt-2 border-t">
                              <Link to={`/admin/bookings/${booking.booking_id}`}>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Detail
                                </Button>
                              </Link>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteBooking(booking.booking_id, booking.booking_code)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Hapus
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
        )}
      </div>
    </div>
  );
};

export default BookingManagement;