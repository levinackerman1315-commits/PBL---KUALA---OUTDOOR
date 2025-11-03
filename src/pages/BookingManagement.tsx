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
  Trash2,
  Clock,
  AlertTriangle,
  History,
  AlertCircle
} from "lucide-react";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [countdowns, setCountdowns] = useState({});
  const [lateReturnCountdowns, setLateReturnCountdowns] = useState({}); // ✅ TIMER KETERLAMBATAN

  // ✅ FETCH DATA DARI API
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/bookings.php');
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      const data = await response.json();
      
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

  // ✅ COUNTDOWN TIMER UNTUK BOOKING AKTIF + LATE RETURN
  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      const newLateCountdowns = {};
      
      bookings.forEach(booking => {
        if (booking.status === 'active') {
          const endDate = new Date(booking.end_date);
          const now = new Date();
          const diff = endDate.getTime() - now.getTime();
          
          if (diff > 0) {
            // ⏰ WAKTU NORMAL - COUNTDOWN MUNDUR
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            newCountdowns[booking.booking_id] = {
              days,
              hours,
              minutes,
              seconds,
              isOverdue: false
            };
          } else {
            // ⚠️ TERLAMBAT - COUNTDOWN MAJU (DENDA)
            const lateDiff = Math.abs(diff);
            const lateDays = Math.floor(lateDiff / (1000 * 60 * 60 * 24));
            const lateHours = Math.floor((lateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const lateMinutes = Math.floor((lateDiff % (1000 * 60 * 60)) / (1000 * 60));
            const lateSeconds = Math.floor((lateDiff % (1000 * 60)) / 1000);
            
            newCountdowns[booking.booking_id] = {
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
              isOverdue: true
            };
            
            newLateCountdowns[booking.booking_id] = {
              days: lateDays,
              hours: lateHours,
              minutes: lateMinutes,
              seconds: lateSeconds,
              totalMinutes: Math.floor(lateDiff / (1000 * 60))
            };
          }
        }
      });
      
      setCountdowns(newCountdowns);
      setLateReturnCountdowns(newLateCountdowns);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [bookings]);

  // ✅ FILTER BOOKING - PISAHKAN AKTIF DAN RIWAYAT
  useEffect(() => {
    let filtered = bookings;
    
    // ✅ FILTER BERDASARKAN MODE (AKTIF/RIWAYAT)
    if (showHistory) {
      // Mode Riwayat: hanya tampilkan completed & cancelled
      filtered = filtered.filter(booking => 
        booking.status === 'completed' || booking.status === 'cancelled'
      );
    } else {
      // Mode Aktif: tampilkan semua kecuali completed & cancelled
      filtered = filtered.filter(booking => 
        booking.status !== 'completed' && booking.status !== 'cancelled'
      );
    }
    
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
  }, [bookings, searchTerm, statusFilter, paymentFilter, showHistory]);

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

  // ✅ UPDATE STATUS BOOKING DENGAN KONFIRMASI
  const handleStatusChange = async (bookingId, newStatus, booking) => {
    let confirmMessage = '';
    
    if (newStatus === 'confirmed') {
      confirmMessage = `Konfirmasi booking ${booking.booking_code}?\n\nBarang akan siap untuk diserahkan kepada penyewa.`;
    } else if (newStatus === 'active') {
      confirmMessage = `⚠️ KONFIRMASI PENYERAHAN BARANG\n\nBooking: ${booking.booking_code}\nPenyewa: ${booking.customer_name}\n\nBarang sudah diterima oleh penyewa?\n\n✅ Stok equipment akan dikurangi\n⏰ Countdown pengembalian akan dimulai\n📅 Harus dikembalikan: ${new Date(booking.end_date).toLocaleString('id-ID')}`;
    } else if (newStatus === 'completed') {
      confirmMessage = `✅ KONFIRMASI PENGEMBALIAN BARANG\n\nBooking: ${booking.booking_code}\nPenyewa: ${booking.customer_name}\n\nBarang sudah dikembalikan oleh penyewa?\n\n✅ Stok equipment akan dikembalikan`;
    } else if (newStatus === 'cancelled') {
      confirmMessage = `❌ Batalkan booking ${booking.booking_code}?`;
    }
    
    if (!window.confirm(confirmMessage)) return;

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
        setBookings(prev => prev.map(b => 
          b.booking_id === bookingId 
            ? { ...b, status: newStatus }
            : b
        ));
        
        if (newStatus === 'active') {
          alert(`✅ Barang sudah diserahkan!\n⏰ Countdown pengembalian dimulai!\n📅 Harus dikembalikan: ${new Date(booking.end_date).toLocaleString('id-ID')}`);
        } else if (newStatus === 'completed') {
          alert(`✅ Barang sudah dikembalikan!\nBooking selesai.`);
        } else {
          alert(`✅ Status booking diubah ke: ${getStatusText(newStatus)}`);
        }
        
        // Refresh data
        fetchBookings();
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
          alert('✅ DP dikonfirmasi!');
        } else if (newPaymentStatus === 'paid') {
          alert('✅ Pembayaran lunas!');
        }
      } else {
        alert('❌ Gagal mengubah status payment: ' + result.message);
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  // ✅ HAPUS BOOKING
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
        setBookings(prev => prev.filter(booking => booking.booking_id !== bookingId));
        alert(`✅ Booking ${bookingCode} berhasil dihapus!`);
      } else {
        alert('❌ Gagal menghapus booking: ' + result.message);
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  // ✅ FUNGSI KONFIRMASI PENGEMBALIAN TERLAMBAT
  const handleConfirmLateReturn = async (booking) => {
    const lateData = lateReturnCountdowns[booking.booking_id];
    
    if (!lateData) {
      alert('❌ Data keterlambatan tidak ditemukan');
      return;
    }

    // Tampilkan info waktu keterlambatan
    const lateInfo = `⏰ WAKTU KETERLAMBATAN:\n\n` +
      `📦 Booking: ${booking.booking_code}\n` +
      `👤 Penyewa: ${booking.customer_name}\n\n` +
      `⏱️ Durasi Terlambat:\n` +
      `${lateData.days} hari, ${lateData.hours} jam, ${lateData.minutes} menit, ${lateData.seconds} detik\n\n` +
      `📊 Total: ${Math.floor(lateData.totalMinutes / 1440)} hari ${Math.floor((lateData.totalMinutes % 1440) / 60)} jam`;

    alert(lateInfo);

    // Input manual denda
    const lateFeeInput = prompt(
      `💰 MASUKKAN BESARAN DENDA\n\n` +
      `Waktu Terlambat: ${lateData.days} hari, ${lateData.hours} jam, ${lateData.minutes} menit\n\n` +
      `Masukkan jumlah denda (hanya angka, tanpa Rp dan titik):\n` +
      `Contoh: 50000 untuk Rp 50.000`
    );

    if (lateFeeInput === null) return; // Cancel

    const lateFee = parseInt(lateFeeInput.replace(/\D/g, ''));

    if (isNaN(lateFee) || lateFee < 0) {
      alert('❌ Input denda tidak valid! Masukkan angka yang benar.');
      return;
    }

    const confirmMessage = `⚠️ KONFIRMASI PENGEMBALIAN TERLAMBAT\n\n` +
      `Booking: ${booking.booking_code}\n` +
      `Penyewa: ${booking.customer_name}\n\n` +
      `⏰ Waktu Terlambat:\n` +
      `${lateData.days} hari, ${lateData.hours} jam, ${lateData.minutes} menit\n\n` +
      `💰 Denda yang Dikenakan:\n` +
      `Rp ${lateFee.toLocaleString('id-ID')}\n\n` +
      `💵 Biaya Sewa: Rp ${Number(booking.total_estimated_cost).toLocaleString('id-ID')}\n` +
      `💰 Denda: Rp ${lateFee.toLocaleString('id-ID')}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📊 TOTAL BIAYA: Rp ${(Number(booking.total_estimated_cost) + lateFee).toLocaleString('id-ID')}\n\n` +
      `Lanjutkan konfirmasi?`;

    if (!window.confirm(confirmMessage)) return;

    try {
      const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/confirm_late_return.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_id: booking.booking_id,
          late_minutes: lateData.totalMinutes,
          late_fee: lateFee
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`✅ PENGEMBALIAN BERHASIL DIKONFIRMASI!\n\n` +
              `⏰ Terlambat: ${lateData.days} hari, ${lateData.hours} jam, ${lateData.minutes} menit\n` +
              `💰 Denda: Rp ${lateFee.toLocaleString('id-ID')}\n` +
              `📊 Total Biaya: Rp ${(Number(booking.total_estimated_cost) + lateFee).toLocaleString('id-ID')}\n\n` +
              `📦 Stok equipment telah dikembalikan`);
        
        fetchBookings();
      } else {
        alert('❌ Gagal konfirmasi denda: ' + result.message);
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
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
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
                <h1 className="text-2xl font-bold text-gray-900">
                  {showHistory ? "📜 Riwayat Booking" : "📦 Kelola Booking Aktif"}
                </h1>
                <p className="text-gray-600">
                  {showHistory 
                    ? "Lihat booking yang sudah selesai atau dibatalkan" 
                    : "Konfirmasi dan tracking booking yang masih berlangsung"}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={fetchBookings}
                className="bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              {/* ✅ TOGGLE RIWAYAT */}
              <Button
                variant={showHistory ? "default" : "outline"}
                onClick={() => setShowHistory(!showHistory)}
                className={showHistory ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                <History className="h-4 w-4 mr-2" />
                {showHistory ? "Lihat Booking Aktif" : "Lihat Riwayat"}
              </Button>
            </div>
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
              <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Selesai</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
              <div className="text-sm text-gray-600">Dibatalkan</div>
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
                {!showHistory ? (
                  <>
                    <option value="pending">Menunggu</option>
                    <option value="confirmed">Dikonfirmasi</option>
                    <option value="active">Berlangsung</option>
                  </>
                ) : (
                  <>
                    <option value="completed">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                  </>
                )}
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

        {/* BOOKINGS LIST */}
        {!loading && (
          <Card>
            <CardHeader>
              <CardTitle>
                {showHistory 
                  ? `📜 Riwayat Booking (${filteredBookings.length})`
                  : `📦 Daftar Booking Aktif (${filteredBookings.length})`
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <Card key={booking.booking_id} className={`border-l-4 ${
                    booking.status === 'active' ? 'border-l-green-500' : 
                    booking.status === 'confirmed' ? 'border-l-blue-500' :
                    booking.status === 'pending' ? 'border-l-yellow-500' :
                    booking.status === 'completed' ? 'border-l-gray-500' :
                    'border-l-red-500'
                  }`}>
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
                            
                            {/* ✅ COUNTDOWN - UNTUK BOOKING AKTIF */}
                            {booking.status === 'active' && countdowns[booking.booking_id] && (
                              <div className={`mt-3 p-4 rounded-lg border-2 ${
                                countdowns[booking.booking_id].isOverdue 
                                  ? 'bg-red-50 border-red-300' 
                                  : 'bg-green-50 border-green-300'
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className={`h-5 w-5 ${
                                    countdowns[booking.booking_id].isOverdue ? 'text-red-600' : 'text-green-600'
                                  }`} />
                                  <span className={`font-bold ${
                                    countdowns[booking.booking_id].isOverdue ? 'text-red-600' : 'text-green-600'
                                  }`}>
                                    {countdowns[booking.booking_id].isOverdue 
                                      ? '⚠️ WAKTU KETERLAMBATAN (DENDA)' 
                                      : '⏰ Waktu Pengembalian'}
                                  </span>
                                </div>
                                
                                {!countdowns[booking.booking_id].isOverdue ? (
                                  // ⏰ COUNTDOWN NORMAL (HIJAU)
                                  <div className="grid grid-cols-4 gap-2 text-center">
                                    <div className="bg-white rounded p-2 border border-green-200">
                                      <div className="text-2xl font-bold text-green-600">
                                        {countdowns[booking.booking_id].days}
                                      </div>
                                      <div className="text-xs text-gray-600">Hari</div>
                                    </div>
                                    <div className="bg-white rounded p-2 border border-green-200">
                                      <div className="text-2xl font-bold text-green-600">
                                        {countdowns[booking.booking_id].hours}
                                      </div>
                                      <div className="text-xs text-gray-600">Jam</div>
                                    </div>
                                    <div className="bg-white rounded p-2 border border-green-200">
                                      <div className="text-2xl font-bold text-green-600">
                                        {countdowns[booking.booking_id].minutes}
                                      </div>
                                      <div className="text-xs text-gray-600">Menit</div>
                                    </div>
                                    <div className="bg-white rounded p-2 border border-green-200">
                                      <div className="text-2xl font-bold text-green-600">
                                        {countdowns[booking.booking_id].seconds}
                                      </div>
                                      <div className="text-xs text-gray-600">Detik</div>
                                    </div>
                                  </div>
                                ) : (
                                  // ⚠️ COUNTDOWN TERLAMBAT (MERAH) - BERJALAN MAJU
                                  <>
                                    <div className="grid grid-cols-4 gap-2 text-center mb-3">
                                      <div className="bg-white rounded p-2 border-2 border-red-300">
                                        <div className="text-2xl font-bold text-red-600 animate-pulse">
                                          {lateReturnCountdowns[booking.booking_id]?.days || 0}
                                        </div>
                                        <div className="text-xs text-gray-600">Hari</div>
                                      </div>
                                      <div className="bg-white rounded p-2 border-2 border-red-300">
                                        <div className="text-2xl font-bold text-red-600 animate-pulse">
                                          {lateReturnCountdowns[booking.booking_id]?.hours || 0}
                                        </div>
                                        <div className="text-xs text-gray-600">Jam</div>
                                      </div>
                                      <div className="bg-white rounded p-2 border-2 border-red-300">
                                        <div className="text-2xl font-bold text-red-600 animate-pulse">
                                          {lateReturnCountdowns[booking.booking_id]?.minutes || 0}
                                        </div>
                                        <div className="text-xs text-gray-600">Menit</div>
                                      </div>
                                      <div className="bg-white rounded p-2 border-2 border-red-300">
                                        <div className="text-2xl font-bold text-red-600 animate-pulse">
                                          {lateReturnCountdowns[booking.booking_id]?.seconds || 0}
                                        </div>
                                        <div className="text-xs text-gray-600">Detik</div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 p-2 bg-red-100 rounded mb-3">
                                      <AlertTriangle className="h-5 w-5 text-red-600" />
                                      <span className="text-red-600 font-semibold text-sm">
                                        Total: {Math.floor(lateReturnCountdowns[booking.booking_id]?.totalMinutes / 1440) || 0} hari, {' '}
                                        {Math.floor((lateReturnCountdowns[booking.booking_id]?.totalMinutes % 1440) / 60) || 0} jam, {' '}
                                        {(lateReturnCountdowns[booking.booking_id]?.totalMinutes % 60) || 0} menit terlambat
                                      </span>
                                    </div>
                                    
                                    {/* ✅ TOMBOL KONFIRMASI PENGEMBALIAN + INPUT DENDA */}
                                    <Button 
                                      onClick={() => handleConfirmLateReturn(booking)}
                                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                                      size="sm"
                                    >
                                      <AlertCircle className="h-4 w-4 mr-2" />
                                      Konfirmasi Pengembalian + Input Denda
                                    </Button>
                                  </>
                                )}
                              </div>
                            )}
                            

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
                            
                            {/* ACTIONS - HANYA UNTUK BOOKING AKTIF */}
                            {!showHistory && (
                              <>
                                {/* STATUS ACTIONS */}
                                <div>
                                  <label className="text-sm font-medium text-gray-700 block mb-2">
                                    Update Status Booking:
                                  </label>
                                  <div className="flex gap-2 flex-wrap">
                                    {booking.status === 'pending' && (
                                      <Button 
                                        size="sm"
                                        onClick={() => handleStatusChange(booking.booking_id, 'confirmed', booking)}
                                        className="bg-blue-600 hover:bg-blue-700"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Konfirmasi
                                      </Button>
                                    )}
                                    {booking.status === 'confirmed' && (
                                      <Button 
                                        size="sm"
                                        onClick={() => handleStatusChange(booking.booking_id, 'active', booking)}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <Package className="h-4 w-4 mr-1" />
                                        Mulai Rental
                                      </Button>
                                    )}
                                    {booking.status === 'active' && (
                                      <Button 
                                        size="sm"
                                        onClick={() => handleStatusChange(booking.booking_id, 'completed', booking)}
                                        className="bg-gray-600 hover:bg-gray-700"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Selesai
                                      </Button>
                                    )}
                                    <Button 
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleStatusChange(booking.booking_id, 'cancelled', booking)}
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
                              </>
                            )}

                            {/* INFO UNTUK RIWAYAT */}
                            {showHistory && (
                              <>
                                {booking.status === 'completed' && (
                                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center gap-2 text-green-700">
                                      <CheckCircle className="h-5 w-5" />
                                      <span className="font-semibold">Booking Selesai</span>
                                    </div>
                                    <p className="text-sm text-green-600 mt-1">
                                      Equipment sudah dikembalikan dan stok telah dipulihkan.
                                    </p>
                                  </div>
                                )}
                                
                                {booking.status === 'cancelled' && (
                                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center gap-2 text-red-700">
                                      <XCircle className="h-5 w-5" />
                                      <span className="font-semibold">Booking Dibatalkan</span>
                                    </div>
                                    <p className="text-sm text-red-600 mt-1">
                                      Booking ini telah dibatalkan.
                                    </p>
                                  </div>
                                )}
                              </>
                            )}

                            {/* DETAIL & HAPUS */}
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
                  {showHistory ? (
                    <>
                      <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Belum ada riwayat booking</p>
                    </>
                  ) : (
                    <>
                      <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Tidak ada booking aktif</p>
                    </>
                  )}
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