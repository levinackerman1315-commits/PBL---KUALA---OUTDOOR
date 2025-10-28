import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, User, Phone, Mail, MessageSquare } from 'lucide-react'

const BookingForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // ✅ TERIMA DATA DARI CART
  const { cartItems, totalItems, totalPrice, fromCart } = location.state || {}
  
  const [bookingData, setBookingData] = useState({
    customerName: '',
    phone: '',
    email: '',
    rentalStartDate: '',
    rentalEndDate: '',
    notes: ''
  })

  // ✅ CEK APAKAH ADA DATA CART
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      const confirmRedirect = window.confirm(
        '⚠️ Keranjang kosong!\n\nKlik OK untuk kembali ke halaman keranjang.'
      )
      if (confirmRedirect) {
        navigate('/cart')
      }
    }
  }, [cartItems, navigate])

  // ✅ HITUNG DURASI RENTAL
  const calculateDays = () => {
    if (!bookingData.rentalStartDate || !bookingData.rentalEndDate) return 0
    const start = new Date(bookingData.rentalStartDate)
    const end = new Date(bookingData.rentalEndDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays || 1
  }

  const rentalDays = calculateDays()
  const grandTotal = totalPrice * rentalDays

  // ✅ HANDLE SUBMIT
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validasi
    if (!bookingData.customerName || !bookingData.phone || !bookingData.rentalStartDate || !bookingData.rentalEndDate) {
      alert('⚠️ Mohon lengkapi semua data yang wajib diisi!')
      return
    }

    // Kirim data booking (implement API call di sini)
    console.log('📦 Booking Data:', {
      ...bookingData,
      cartItems,
      totalItems,
      rentalDays,
      grandTotal
    })

    alert(`✅ Booking berhasil!\n\n📋 Total: Rp ${grandTotal.toLocaleString('id-ID')}\n📅 Durasi: ${rentalDays} hari\n📦 Items: ${totalItems}`)
    
    // Redirect ke halaman konfirmasi atau success
    navigate('/booking/success')
  }

  if (!cartItems || cartItems.length === 0) {
    return null // Atau loading state
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/cart')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Keranjang
          </Button>
          <h1 className="text-3xl font-bold">Form Booking</h1>
          <p className="text-gray-600">Lengkapi data untuk melanjutkan pemesanan</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FORM */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Penyewa</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nama Lengkap */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={bookingData.customerName}
                      onChange={(e) => setBookingData({...bookingData, customerName: e.target.value})}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  
                  {/* No. Telepon */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Phone className="h-4 w-4 inline mr-1" />
                      No. Telepon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email (Opsional)
                    </label>
                    <input
                      type="email"
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                      placeholder="email@example.com"
                    />
                  </div>
                  
                  {/* Tanggal Rental */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Tanggal Mulai <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={bookingData.rentalStartDate}
                        onChange={(e) => setBookingData({...bookingData, rentalStartDate: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Tanggal Selesai <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={bookingData.rentalEndDate}
                        onChange={(e) => setBookingData({...bookingData, rentalEndDate: e.target.value})}
                        min={bookingData.rentalStartDate || new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Catatan */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MessageSquare className="h-4 w-4 inline mr-1" />
                      Catatan (Opsional)
                    </label>
                    <textarea
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={4}
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                      placeholder="Tambahkan catatan khusus untuk pesanan Anda..."
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                  >
                    Konfirmasi Booking
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* RINGKASAN PESANAN */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Item List */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {cartItems && cartItems.map((item: any) => (
                    <div key={item.equipment.equipment_id} className="flex justify-between border-b pb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.equipment.name}</p>
                        <p className="text-xs text-gray-600">
                          {item.quantity}x • Rp {item.equipment.price_per_day.toLocaleString('id-ID')}/hari
                        </p>
                      </div>
                      <p className="font-semibold text-sm">
                        Rp {(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Calculation */}
                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>Rp {totalPrice?.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Durasi Sewa</span>
                    <span className="font-semibold">{rentalDays} hari</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-green-700 pt-2 border-t">
                    <span>Total</span>
                    <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                  📦 Gratis pickup & return di lokasi kami
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingForm