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
  RefreshCw,
  Trash2,
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
  const [lateReturnCountdowns, setLateReturnCountdowns] = useState({});

  // FETCH DATA DARI API
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/bookings.php');
      
      if (!response.ok) throw new Error('Failed to fetch bookings');
      
      const data = await response.json();
      
      const bookingsData = Array.isArray(data) ? data : data.data || [];
      
      setBookings(bookingsData);
      setFilteredBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Gagal memuat data booking. Menggunakan mock data.');

      // Fallback mock data
      const mockBookings = [
        {
          booking_id: 1,
          booking_code: "KO-2024-001",
          customer_name: "Ahmad Fauzi",
          customer_phone: "081234567890",
          customer_email: "ahmad@email.com",
          equipment_names: "Tenda Dome 4 Orang + Sleeping Bag",
          start_date: "2024-10-25",
          end_date: "2024-10-27",
          estimated_duration: 2,
          total_estimated_cost: 105000,
          status: "pending",
          payment_status: "unpaid",
          created_at: "2024-10-20 14:30:00",
          notes: "Butuh tenda yang tahan hujan"
        }
      ];
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // COUNTDOWN TIMER UNTUK ACTIVE & LATE RETURN
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
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            newCountdowns[booking.booking_id] = { days, hours, minutes, seconds, isOverdue: false };
          } else {
            const lateDiff = Math.abs(diff);
            const lateDays = Math.floor(lateDiff / (1000 * 60 * 60 * 24));
            const lateHours = Math.floor((lateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const lateMinutes = Math.floor((lateDiff % (1000 * 60 * 60)) / (1000 * 60));
            const lateSeconds = Math.floor((lateDiff % (1000 * 60)) / 1000);
            const totalMinutes = Math.floor(lateDiff / (1000 * 60));

            newCountdowns[booking.booking_id] = { isOverdue: true };
            newLateCountdowns[booking.booking_id] = { lateDays, lateHours, lateMinutes, lateSeconds, totalMinutes };
          }
        }
      });

      setCountdowns(newCountdowns);
      setLateReturnCountdowns(newLateCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [bookings]);

  // FILTER BOOKINGS
  useEffect(() => {
    let filtered = bookings;

    // Mode: Aktif vs Riwayat
    if (showHistory) {
      filtered = filtered.filter(b => b.status === 'completed' || b.status === 'cancelled');
    } else {
      filtered = filtered.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(b =>
        b.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.booking_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.equipment_names?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status & Payment
    if (statusFilter !== "all") filtered = filtered.filter(b => b.status === statusFilter);
    if (paymentFilter !== "all") filtered = filtered.filter(b => b.payment_status === paymentFilter);

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, paymentFilter, showHistory]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-blue-500',
      active: 'bg-green-500',
      completed: 'bg-gray-500',
      cancelled: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      unpaid: 'bg-red-500',
      partial: 'bg-yellow-500',
      paid: 'bg-green-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Menunggu',
      confirmed: 'Dikonfirmasi',
      active: 'Berlangsung',
      completed: 'Selesai',
      cancelled: 'Dibatalkan'
    };
    return texts[status] || status;
  };

  const getPaymentStatusText = (status) => {
    const texts = {
      unpaid: 'Belum Bayar',
      partial: 'DP Paid',
      paid: 'Lunas'
    };
    return texts[status] || status;
  };

  // UPDATE STATUS
  const handleStatusChange = async (bookingId, newStatus, booking) => {
    const messages = {
      confirmed: `Konfirmasi booking ${booking.booking_code}?`,
      active: `Serahkan barang ke ${booking.customer_name}?`,
      completed: `Barang sudah dikembalikan?`,
      cancelled: `Batalkan booking ${booking.booking_code}?`
    };

    if (!window.confirm(messages[newStatus])) return;

    try {
      const res = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/update_booking_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: bookingId, status: newStatus })
      });
      const result = await res.json();

      if (result.success) {
        setBookings(prev => prev.map(b => b.booking_id === bookingId ? { ...b, status: newStatus } : b));
        alert(`Status diubah: ${getStatusText(newStatus)}`);
        fetchBookings();
      } else {
        alert('Gagal: ' + result.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // UPDATE PAYMENT
  const handlePaymentStatusChange = async (bookingId, newStatus) => {
    try {
      const res = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/update_payment_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: bookingId, payment_status: newStatus })
      });
      const result = await res.json();

      if (result.success) {
        setBookings(prev => prev.map(b => b.booking_id === bookingId ? { ...b, payment_status: newStatus } : b));
        alert(newStatus === 'partial' ? 'DP dikonfirmasi!' : 'Pembayaran lunas!');
      } else {
        alert('Gagal: ' + result.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // HAPUS BOOKING
  const handleDeleteBooking = async (bookingId, code) => {
    if (!window.confirm(`Hapus booking ${code}?\nData tidak bisa dikembalikan!`)) return;

    try {
      const res = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/delete_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: bookingId })
      });
      const result = await res.json();

      if (result.success) {
        setBookings(prev => prev.filter(b => b.booking_id !== bookingId));
        alert(`Booking ${code} dihapus!`);
      } else {
        alert('Gagal: ' + result.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // KONFIRMASI PENGEMBALIAN TERLAMBAT
  const handleConfirmLateReturn = async (booking) => {
    const late = lateReturnCountdowns[booking.booking_id];
    if (!late) return alert('Data keterlambatan tidak tersedia');

    const lateFeeInput = prompt(
      `WAKTU TERLAMBAT: ${late.lateDays} hari, ${late.lateHours} jam, ${late.lateMinutes} menit\n\nMasukkan denda (Rp):`
    );
    if (lateFeeInput === null) return;

    const lateFee = parseInt(lateFeeInput.replace(/\D/g, ''));
    if (isNaN(lateFee) || lateFee < 0) return alert('Denda tidak valid!');

    if (!window.confirm(`Konfirmasi denda Rp ${lateFee.toLocaleString()}?`)) return;

    try {
      const res = await fetch('http://localhost/PBL-KELANA-OUTDOOR/api/admin/confirm_late_return.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_id: booking.booking_id,
          late_minutes: late.totalMinutes,
          late_fee: lateFee
        })
      });
      const result = await res.json();

      if (result.success) {
        alert(`Pengembalian dikonfirmasi!\nDenda: Rp ${lateFee.toLocaleString()}`);
        fetchBookings();
      } else {
        alert('Gagal: ' + result.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
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
                  {showHistory ? "Riwayat Booking" : "Kelola Booking Aktif"}
                </h1>
                <p className="text-gray-600">
                  {showHistory ? "Booking selesai & dibatalkan" : "Konfirmasi & tracking booking"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchBookings} className="bg-green-600 hover:bg-green-700" disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant={showHistory ? "default" : "outline"}
                onClick={() => setShowHistory(!showHistory)}
                className={showHistory ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                <History className="h-4 w-4 mr-2" />
                {showHistory ? "Booking Aktif" : "Riwayat"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          {[
            { label: "Total", value: stats.total, color: "gray" },
            { label: "Menunggu", value: stats.pending, color: "yellow" },
            { label: "Dikonfirmasi", value: stats.confirmed, color: "blue" },
            { label: "Berlangsung", value: stats.active, color: "green" },
            { label: "Selesai", value: stats.completed, color: "gray" },
            { label: "Dibatalkan", value: stats.cancelled, color: "red" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FILTERS */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari nama, kode, equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-md">
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
              <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="px-3 py-2 border rounded-md">
                <option value="all">Semua Payment</option>
                <option value="unpaid">Belum Bayar</option>
                <option value="partial">DP Paid</option>
                <option value="paid">Lunas</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* LOADING */}
        {loading && (
          <Card>
            <CardContent className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Memuat data...</p>
            </CardContent>
          </Card>
        )}

        {/* BOOKINGS LIST */}
        {!loading && (
          <Card>
            <CardHeader>
              <CardTitle>
                {showHistory ? `Riwayat Booking (${filteredBookings.length})` : `Booking Aktif (${filteredBookings.length})`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <Card key={booking.booking_id} className={`border-l-4 ${
                    booking.status === 'active' ? 'border-l-green-500' :
                    booking.status === 'confirmed' ? 'border-l-blue-500' :
                    booking.status === 'pending' ? 'border-l-yellow-500' :
                    'border-l-gray-500'
                  }`}>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2">
                          <div className="flex justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{booking.booking_code}</h3>
                              <p className="text-sm text-gray-600">
                                {new Date(booking.created_at).toLocaleDateString('id-ID')}
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
                              <span>{booking.customer_name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <a href={`tel:${booking.customer_phone}`} className="text-blue-600 hover:underline">
                                {booking.customer_phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-gray-500" />
                              <span>{booking.equipment_names}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{new Date(booking.start_date).toLocaleDateString('id-ID')} - {new Date(booking.end_date).toLocaleDateString('id-ID')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-gray-500" />
                              <span className="font-semibold text-green-600">
                                Rp {Number(booking.total_estimated_cost).toLocaleString('id-ID')}
                              </span>
                            </div>

                            {/* COUNTDOWN */}
                            {booking.status === 'active' && countdowns[booking.booking_id] && (
                              <div className={`mt-3 p-4 rounded-lg border-2 ${countdowns[booking.booking_id].isOverdue ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className={`h-5 w-5 ${countdowns[booking.booking_id].isOverdue ? 'text-red-600' : 'text-green-600'}`} />
                                  <span className={`font-bold ${countdowns[booking.booking_id].isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                                    {countdowns[booking.booking_id].isOverdue ? 'Keterlambatan' : 'Waktu Pengembalian'}
                                  </span>
                                </div>
                                {!countdowns[booking.booking_id].isOverdue ? (
                                  <div className="grid grid-cols-4 gap-2 text-center">
                                    {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                                      <div key={unit} className="bg-white rounded p-2 border border-green-200">
                                        <div className="text-2xl font-bold text-green-600">
                                          {countdowns[booking.booking_id][unit]}
                                        </div>
                                        <div className="text-xs text-gray-600">{unit === 'days' ? 'Hari' : unit === 'hours' ? 'Jam' : unit === 'minutes' ? 'Menit' : 'Detik'}</div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <>
                                    <div className="grid grid-cols-4 gap-2 text-center mb-3">
                                      {Object.entries(lateReturnCountdowns[booking.booking_id] || {}).filter(([k]) => k !== 'totalMinutes').map(([key, value]) => (
                                        <div key={key} className="bg-white rounded p-2 border-2 border-red-300">
                                          <div className="text-2xl font-bold text-red-600 animate-pulse">{String(value)}</div>
                                          <div className="text-xs text-gray-600">
                                            {key === 'lateDays' ? 'Hari' : key === 'lateHours' ? 'Jam' : key === 'lateMinutes' ? 'Menit' : 'Detik'}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <Button onClick={() => handleConfirmLateReturn(booking)} className="w-full bg-red-600 hover:bg-red-700">
                                      <AlertCircle className="h-4 w-4 mr-2" />
                                      Konfirmasi + Input Denda
                                    </Button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="lg:col-span-2 space-y-3">
                          {!showHistory && (
                            <>
                              <div>
                                <label className="text-sm font-medium block mb-2">Update Status:</label>
                                <div className="flex gap-2 flex-wrap">
                                  {booking.status === 'pending' && (
                                    <Button size="sm" onClick={() => handleStatusChange(booking.booking_id, 'confirmed', booking)} className="bg-blue-600 hover:bg-blue-700">
                                      <CheckCircle className="h-4 w-4 mr-1" /> Konfirmasi
                                    </Button>
                                  )}
                                  {booking.status === 'confirmed' && (
                                    <Button size="sm" onClick={() => handleStatusChange(booking.booking_id, 'active', booking)} className="bg-green-600 hover:bg-green-700">
                                      <Package className="h-4 w-4 mr-1" /> Mulai
                                    </Button>
                                  )}
                                  {booking.status === 'active' && (
                                    <Button size="sm" onClick={() => handleStatusChange(booking.booking_id, 'completed', booking)} className="bg-gray-600 hover:bg-gray-700">
                                      <CheckCircle className="h-4 w-4 mr-1" /> Selesai
                                    </Button>
                                  )}
                                  <Button size="sm" variant="destructive" onClick={() => handleStatusChange(booking.booking_id, 'cancelled', booking)}>
                                    <XCircle className="h-4 w-4 mr-1" /> Cancel
                                  </Button>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium block mb-2">Payment:</label>
                                <div className="flex gap-2 flex-wrap">
                                  {booking.payment_status === 'unpaid' && (
                                    <>
                                      <Button size="sm" onClick={() => handlePaymentStatusChange(booking.booking_id, 'partial')} className="bg-yellow-600 hover:bg-yellow-700">
                                        Konfirm DP
                                      </Button>
                                      <Button size="sm" onClick={() => handlePaymentStatusChange(booking.booking_id, 'paid')} className="bg-green-600 hover:bg-green-700">
                                        Konfirm Lunas
                                      </Button>
                                    </>
                                  )}
                                  {booking.payment_status === 'partial' && (
                                    <Button size="sm" onClick={() => handlePaymentStatusChange(booking.booking_id, 'paid')} className="bg-green-600 hover:bg-green-700">
                                      Konfirm Lunas
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </>
                          )}

                          <div className="flex gap-2 pt-2 border-t">
                            <a href={`https://wa.me/62${booking.customer_phone.substring(1)}?text=Halo ${encodeURIComponent(booking.customer_name)}, terkait booking ${booking.booking_code}`} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline" className="text-green-600">
                                WhatsApp
                              </Button>
                            </a>
                            <Link to={`/admin/bookings/${booking.booking_id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" /> Detail
                              </Button>
                            </Link>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteBooking(booking.booking_id, booking.booking_code)}>
                              <Trash2 className="h-4 w-4 mr-1" /> Hapus
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredBookings.length === 0 && (
                  <div className="text-center py-8">
                    {showHistory ? (
                      <>
                        <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Belum ada riwayat</p>
                      </>
                    ) : (
                      <>
                        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Tidak ada booking aktif</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;