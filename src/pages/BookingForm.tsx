// // // // import { useState, useEffect } from 'react'
// // // // import { useSearchParams, Link } from 'react-router-dom'
// // // // import { equipmentAPI, Equipment } from '@/lib/api'
// // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // // import { Button } from '@/components/ui/button'
// // // // import { Input } from '@/components/ui/input'
// // // // import { Label } from '@/components/ui/label'
// // // // import { Textarea } from '@/components/ui/textarea'
// // // // import { Badge } from '@/components/ui/badge'
// // // // import { ArrowLeft, MessageCircle, Calendar } from 'lucide-react'
// // // // import { useToast } from '@/hooks/use-toast'

// // // // const BookingForm = () => {
// // // //   const [searchParams] = useSearchParams()
// // // //   const { toast } = useToast()
  
// // // //   const [equipment, setEquipment] = useState<Equipment | null>(null)
// // // //   const [loading, setLoading] = useState(true)
  
// // // //   // Form data
// // // //   const [formData, setFormData] = useState({
// // // //     name: '',
// // // //     phone: '',
// // // //     email: '',
// // // //     identity_number: '',
// // // //     start_date: '',
// // // //     end_date: '',
// // // //     duration: 1,
// // // //     notes: ''
// // // //   })

// // // //   const equipmentId = searchParams.get('equipment_id')

// // // //   useEffect(() => {
// // // //     if (equipmentId) {
// // // //       fetchEquipmentDetail(parseInt(equipmentId))
// // // //     }
// // // //   }, [equipmentId])

// // // //   const fetchEquipmentDetail = async (id: number) => {
// // // //     try {
// // // //       setLoading(true)
// // // //       const response = await equipmentAPI.getById(id)
      
// // // //       if (response.data.status === 'success') {
// // // //         setEquipment(response.data.data)
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Error:', err)
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Gagal memuat detail equipment",
// // // //         variant: "destructive"
// // // //       })
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // // //     const { name, value } = e.target
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       [name]: value
// // // //     }))

// // // //     // Auto calculate duration when dates change
// // // //     if (name === 'start_date' || name === 'end_date') {
// // // //       const start = name === 'start_date' ? new Date(value) : new Date(formData.start_date)
// // // //       const end = name === 'end_date' ? new Date(value) : new Date(formData.end_date)
      
// // // //       if (start && end && end > start) {
// // // //         const diffTime = Math.abs(end.getTime() - start.getTime())
// // // //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
// // // //         setFormData(prev => ({ ...prev, duration: diffDays }))
// // // //       }
// // // //     }
// // // //   }

// // // //   const generateWhatsAppMessage = () => {
// // // //     if (!equipment) return ''

// // // //     const totalCost = equipment.price_per_day * formData.duration

// // // //     const message = `
// // // // 🏔️ *BOOKING KELANA OUTDOOR*

// // // // 👤 *DATA PENYEWA:*
// // // // • Nama: ${formData.name}
// // // // • HP: ${formData.phone}
// // // // • Email: ${formData.email}
// // // // • No. KTP: ${formData.identity_number}

// // // // 🎒 *PERALATAN:*
// // // // • ${equipment.name} (${equipment.code})
// // // // • Kategori: ${equipment.category.toUpperCase()}
// // // // • Harga: Rp ${equipment.price_per_day.toLocaleString('id-ID')}/hari

// // // // 📅 *PERIODE SEWA:*
// // // // • Mulai: ${formData.start_date}
// // // // • Selesai: ${formData.end_date} 
// // // // • Durasi: ${formData.duration} hari

// // // // 💰 *ESTIMASI BIAYA:*
// // // // Rp ${totalCost.toLocaleString('id-ID')}

// // // // 📝 *CATATAN:*
// // // // ${formData.notes || 'Tidak ada catatan khusus'}

// // // // ---
// // // // Mohon konfirmasi ketersediaan dan detail pembayaran. Terima kasih! 🙏
// // // //     `.trim()

// // // //     return encodeURIComponent(message)
// // // //   }

// // // //   const handleSubmit = (e: React.FormEvent) => {
// // // //     e.preventDefault()

// // // //     // Validation
// // // //     if (!formData.name || !formData.phone || !formData.start_date || !formData.end_date) {
// // // //       toast({
// // // //         title: "Data Tidak Lengkap",
// // // //         description: "Mohon lengkapi semua data yang diperlukan",
// // // //         variant: "destructive"
// // // //       })
// // // //       return
// // // //     }

// // // //     if (new Date(formData.end_date) <= new Date(formData.start_date)) {
// // // //       toast({
// // // //         title: "Tanggal Tidak Valid",
// // // //         description: "Tanggal selesai harus setelah tanggal mulai",
// // // //         variant: "destructive"
// // // //       })
// // // //       return
// // // //     }

// // // //     // Generate WhatsApp link
// // // //     const message = generateWhatsAppMessage()
// // // //     const whatsappNumber = '6281258599058' // Ganti dengan nomor WA Kelana Outdoor
// // // //     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

// // // //     // Open WhatsApp
// // // //     window.open(whatsappUrl, '_blank')

// // // //     toast({
// // // //       title: "Berhasil!",
// // // //       description: "Anda akan diarahkan ke WhatsApp untuk konfirmasi booking",
// // // //     })
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
// // // //           <p className="mt-4 text-gray-600">Memuat form booking...</p>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   if (!equipment) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <p className="text-red-600 text-lg mb-4">Equipment tidak ditemukan</p>
// // // //           <Link to="/browse">
// // // //             <Button>Kembali ke Browse</Button>
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       <div className="container mx-auto px-4 py-8">
// // // //         {/* Back Button */}
// // // //         <Link to={`/equipment/${equipment.equipment_id}`}>
// // // //           <Button variant="ghost" className="mb-6">
// // // //             <ArrowLeft className="h-4 w-4 mr-2" />
// // // //             Kembali ke Detail
// // // //           </Button>
// // // //         </Link>

// // // //         <div className="max-w-4xl mx-auto">
// // // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // //             {/* Equipment Summary */}
// // // //             <Card>
// // // //               <CardHeader>
// // // //                 <CardTitle>Peralatan yang Dipilih</CardTitle>
// // // //               </CardHeader>
// // // //               <CardContent className="space-y-4">
// // // //                 <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
// // // //                   {equipment.image_url ? (
// // // //                     <img 
// // // //                       src={equipment.image_url} 
// // // //                       alt={equipment.name}
// // // //                       className="w-full h-full object-cover"
// // // //                     />
// // // //                   ) : (
// // // //                     <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
// // // //                       <span className="text-white text-2xl font-bold">
// // // //                         {equipment.name.charAt(0)}
// // // //                       </span>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>

// // // //                 <div>
// // // //                   <h3 className="font-semibold text-lg">{equipment.name}</h3>
// // // //                   <div className="flex items-center gap-2 mt-2">
// // // //                     <Badge variant="secondary">{equipment.category.toUpperCase()}</Badge>
// // // //                     <span className="text-sm text-gray-500">{equipment.code}</span>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="space-y-2">
// // // //                   <p className="text-2xl font-bold text-green-600">
// // // //                     Rp {equipment.price_per_day.toLocaleString('id-ID')}
// // // //                   </p>
// // // //                   <p className="text-sm text-gray-500">per 24 jam</p>
// // // //                 </div>

// // // //                 {formData.duration > 0 && (
// // // //                   <div className="bg-green-50 p-4 rounded-lg">
// // // //                     <p className="font-medium text-green-800">Estimasi Total:</p>
// // // //                     <p className="text-2xl font-bold text-green-600">
// // // //                       Rp {(equipment.price_per_day * formData.duration).toLocaleString('id-ID')}
// // // //                     </p>
// // // //                     <p className="text-sm text-green-600">untuk {formData.duration} hari</p>
// // // //                   </div>
// // // //                 )}
// // // //               </CardContent>
// // // //             </Card>

// // // //             {/* Booking Form */}
// // // //             <Card>
// // // //               <CardHeader>
// // // //                 <CardTitle>Form Booking</CardTitle>
// // // //                 <p className="text-sm text-gray-600">
// // // //                   Isi data di bawah untuk melanjutkan ke WhatsApp
// // // //                 </p>
// // // //               </CardHeader>
// // // //               <CardContent>
// // // //                 <form onSubmit={handleSubmit} className="space-y-4">
// // // //                   {/* Personal Data */}
// // // //                   <div className="space-y-4">
// // // //                     <div>
// // // //                       <Label htmlFor="name">Nama Lengkap *</Label>
// // // //                       <Input
// // // //                         id="name"
// // // //                         name="name"
// // // //                         type="text"
// // // //                         required
// // // //                         value={formData.name}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="Nama sesuai KTP"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <Label htmlFor="phone">Nomor WhatsApp *</Label>
// // // //                       <Input
// // // //                         id="phone"
// // // //                         name="phone"
// // // //                         type="tel"
// // // //                         required
// // // //                         value={formData.phone}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="08xxxxxxxxxx"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <Label htmlFor="email">Email</Label>
// // // //                       <Input
// // // //                         id="email"
// // // //                         name="email"
// // // //                         type="email"
// // // //                         value={formData.email}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="email@contoh.com"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <Label htmlFor="identity_number">Nomor KTP</Label>
// // // //                       <Input
// // // //                         id="identity_number"
// // // //                         name="identity_number"
// // // //                         type="text"
// // // //                         value={formData.identity_number}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="3201xxxxxxxxxxxxxx"
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Rental Period */}
// // // //                   <div className="space-y-4 pt-4 border-t">
// // // //                     <h4 className="font-medium flex items-center gap-2">
// // // //                       <Calendar className="h-4 w-4" />
// // // //                       Periode Sewa
// // // //                     </h4>

// // // //                     <div className="grid grid-cols-2 gap-4">
// // // //                       <div>
// // // //                         <Label htmlFor="start_date">Tanggal Mulai *</Label>
// // // //                         <Input
// // // //                           id="start_date"
// // // //                           name="start_date"
// // // //                           type="date"
// // // //                           required
// // // //                           value={formData.start_date}
// // // //                           onChange={handleInputChange}
// // // //                           min={new Date().toISOString().split('T')[0]}
// // // //                         />
// // // //                       </div>

// // // //                       <div>
// // // //                         <Label htmlFor="end_date">Tanggal Selesai *</Label>
// // // //                         <Input
// // // //                           id="end_date"
// // // //                           name="end_date"
// // // //                           type="date"
// // // //                           required
// // // //                           value={formData.end_date}
// // // //                           onChange={handleInputChange}
// // // //                           min={formData.start_date || new Date().toISOString().split('T')[0]}
// // // //                         />
// // // //                       </div>
// // // //                     </div>

// // // //                     {formData.duration > 0 && (
// // // //                       <p className="text-sm text-gray-600">
// // // //                         Durasi: <span className="font-medium">{formData.duration} hari</span>
// // // //                       </p>
// // // //                     )}
// // // //                   </div>

// // // //                   {/* Notes */}
// // // //                   <div>
// // // //                     <Label htmlFor="notes">Catatan Tambahan</Label>
// // // //                     <Textarea
// // // //                       id="notes"
// // // //                       name="notes"
// // // //                       rows={3}
// // // //                       value={formData.notes}
// // // //                       onChange={handleInputChange}
// // // //                       placeholder="Catatan khusus untuk penyewaan ini..."
// // // //                     />
// // // //                   </div>

// // // //                   {/* Submit Button */}
// // // //                   <Button
// // // //                     type="submit"
// // // //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// // // //                   >
// // // //                     <MessageCircle className="h-5 w-5 mr-2" />
// // // //                     Lanjut ke WhatsApp
// // // //                   </Button>

// // // //                   <p className="text-xs text-gray-500 text-center">
// // // //                     Dengan melanjutkan, Anda akan diarahkan ke WhatsApp untuk konfirmasi booking
// // // //                   </p>
// // // //                 </form>
// // // //               </CardContent>
// // // //             </Card>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default BookingForm



// // // // import { useState, useEffect } from 'react'
// // // // import { useSearchParams, Link } from 'react-router-dom'
// // // // import { equipmentAPI, Equipment } from '@/lib/api'
// // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // // import { Button } from '@/components/ui/button'
// // // // import { Input } from '@/components/ui/input'
// // // // import { Label } from '@/components/ui/label'
// // // // import { Textarea } from '@/components/ui/textarea'
// // // // import { Badge } from '@/components/ui/badge'
// // // // import { ArrowLeft, MessageCircle, Calendar, Plus, Minus, Trash2 } from 'lucide-react'
// // // // import { useToast } from '@/hooks/use-toast'

// // // // interface BookingItem {
// // // //   equipment: Equipment
// // // //   quantity: number
// // // // }

// // // // const BookingForm = () => {
// // // //   const [searchParams] = useSearchParams()
// // // //   const { toast } = useToast()
  
// // // //   const [bookingItems, setBookingItems] = useState<BookingItem[]>([])
// // // //   const [loading, setLoading] = useState(true)
  
// // // //   // Form data
// // // //   const [formData, setFormData] = useState({
// // // //     name: '',
// // // //     phone: '',
// // // //     email: '',
// // // //     identity_number: '',
// // // //     start_date: '',
// // // //     end_date: '',
// // // //     duration: 1,
// // // //     notes: ''
// // // //   })

// // // //   const equipmentId = searchParams.get('equipment_id')

// // // //   useEffect(() => {
// // // //     if (equipmentId) {
// // // //       fetchEquipmentDetail(parseInt(equipmentId))
// // // //     }
// // // //   }, [equipmentId])

// // // //   const fetchEquipmentDetail = async (id: number) => {
// // // //     try {
// // // //       setLoading(true)
// // // //       const response = await equipmentAPI.getById(id)
      
// // // //       if (response.data.status === 'success') {
// // // //         setBookingItems([{
// // // //           equipment: response.data.data,
// // // //           quantity: 1
// // // //         }])
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Error:', err)
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Gagal memuat detail equipment",
// // // //         variant: "destructive"
// // // //       })
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   const updateQuantity = (index: number, newQuantity: number) => {
// // // //     if (newQuantity < 1) return
    
// // // //     setBookingItems(prev => 
// // // //       prev.map((item, i) => 
// // // //         i === index ? { ...item, quantity: Math.min(newQuantity, item.equipment.stock_quantity) } : item
// // // //       )
// // // //     )
// // // //   }

// // // //   const removeItem = (index: number) => {
// // // //     setBookingItems(prev => prev.filter((_, i) => i !== index))
// // // //   }

// // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // // //     const { name, value } = e.target
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       [name]: value
// // // //     }))

// // // //     // Auto calculate duration when dates change
// // // //     if (name === 'start_date' || name === 'end_date') {
// // // //       const start = name === 'start_date' ? new Date(value) : new Date(formData.start_date)
// // // //       const end = name === 'end_date' ? new Date(value) : new Date(formData.end_date)
      
// // // //       if (start && end && end > start) {
// // // //         const diffTime = Math.abs(end.getTime() - start.getTime())
// // // //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
// // // //         setFormData(prev => ({ ...prev, duration: diffDays }))
// // // //       }
// // // //     }
// // // //   }

// // // //   const calculateTotalCost = () => {
// // // //     return bookingItems.reduce((total, item) => {
// // // //       return total + (item.equipment.price_per_day * item.quantity * formData.duration)
// // // //     }, 0)
// // // //   }

// // // //   const generateWhatsAppMessage = () => {
// // // //     if (bookingItems.length === 0) return ''

// // // //     const totalCost = calculateTotalCost()

// // // //     const itemsList = bookingItems.map(item => 
// // // //       `• ${item.equipment.name} (${item.equipment.code}) - ${item.quantity}x - Rp ${(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}/hari`
// // // //     ).join('\n')

// // // //     const message = `
// // // // 🏔️ *BOOKING KELANA OUTDOOR*

// // // // 👤 *DATA PENYEWA:*
// // // // • Nama: ${formData.name}
// // // // • HP: ${formData.phone}
// // // // • Email: ${formData.email}
// // // // • No. KTP: ${formData.identity_number}

// // // // 🎒 *PERALATAN:*
// // // // ${itemsList}

// // // // 📅 *PERIODE SEWA:*
// // // // • Mulai: ${formData.start_date}
// // // // • Selesai: ${formData.end_date} 
// // // // • Durasi: ${formData.duration} hari

// // // // 💰 *ESTIMASI BIAYA TOTAL:*
// // // // Rp ${totalCost.toLocaleString('id-ID')}

// // // // 📝 *CATATAN:*
// // // // ${formData.notes || 'Tidak ada catatan khusus'}

// // // // ---
// // // // Mohon konfirmasi ketersediaan dan detail pembayaran. Terima kasih! 🙏
// // // //     `.trim()

// // // //     return encodeURIComponent(message)
// // // //   }

// // // //   const handleSubmit = (e: React.FormEvent) => {
// // // //     e.preventDefault()

// // // //     // Validation
// // // //     if (!formData.name || !formData.phone || !formData.start_date || !formData.end_date) {
// // // //       toast({
// // // //         title: "Data Tidak Lengkap",
// // // //         description: "Mohon lengkapi semua data yang diperlukan",
// // // //         variant: "destructive"
// // // //       })
// // // //       return
// // // //     }

// // // //     if (bookingItems.length === 0) {
// // // //       toast({
// // // //         title: "Tidak Ada Barang",
// // // //         description: "Pilih minimal satu peralatan untuk disewa",
// // // //         variant: "destructive"
// // // //       })
// // // //       return
// // // //     }

// // // //     if (new Date(formData.end_date) <= new Date(formData.start_date)) {
// // // //       toast({
// // // //         title: "Tanggal Tidak Valid",
// // // //         description: "Tanggal selesai harus setelah tanggal mulai",
// // // //         variant: "destructive"
// // // //       })
// // // //       return
// // // //     }

// // // //     // Generate WhatsApp link
// // // //     const message = generateWhatsAppMessage()
// // // //     const whatsappNumber = '6281258599058'
// // // //     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

// // // //     // Open WhatsApp
// // // //     window.open(whatsappUrl, '_blank')

// // // //     toast({
// // // //       title: "Berhasil!",
// // // //       description: "Anda akan diarahkan ke WhatsApp untuk konfirmasi booking",
// // // //     })
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
// // // //           <p className="mt-4 text-gray-600">Memuat form booking...</p>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   if (bookingItems.length === 0) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <p className="text-red-600 text-lg mb-4">Tidak ada equipment yang dipilih</p>
// // // //           <Link to="/browse">
// // // //             <Button>Kembali ke Browse</Button>
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       <div className="container mx-auto px-4 py-8">
// // // //         {/* Back Button */}
// // // //         <Link to="/browse">
// // // //           <Button variant="ghost" className="mb-6">
// // // //             <ArrowLeft className="h-4 w-4 mr-2" />
// // // //             Kembali ke Browse
// // // //           </Button>
// // // //         </Link>

// // // //         <div className="max-w-6xl mx-auto">
// // // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // //             {/* Equipment Summary */}
// // // //             <Card>
// // // //               <CardHeader>
// // // //                 <CardTitle>Peralatan yang Dipilih</CardTitle>
// // // //               </CardHeader>
// // // //               <CardContent className="space-y-4">
// // // //                 {bookingItems.map((item, index) => (
// // // //                   <div key={index} className="border rounded-lg p-4 space-y-3">
// // // //                     <div className="flex justify-between items-start">
// // // //                       <div className="flex-1">
// // // //                         <h4 className="font-semibold">{item.equipment.name}</h4>
// // // //                         <div className="flex items-center gap-2 mt-1">
// // // //                           <Badge variant="secondary" className="text-xs">
// // // //                             {item.equipment.category.toUpperCase()}
// // // //                           </Badge>
// // // //                           <span className="text-xs text-gray-500">{item.equipment.code}</span>
// // // //                         </div>
// // // //                         <p className="text-lg font-bold text-green-600 mt-2">
// // // //                           Rp {item.equipment.price_per_day.toLocaleString('id-ID')}/hari
// // // //                         </p>
// // // //                       </div>
                      
// // // //                       <Button
// // // //                         variant="ghost"
// // // //                         size="sm"
// // // //                         onClick={() => removeItem(index)}
// // // //                         className="text-red-500 hover:text-red-700"
// // // //                       >
// // // //                         <Trash2 className="h-4 w-4" />
// // // //                       </Button>
// // // //                     </div>

// // // //                     {/* Quantity Controls */}
// // // //                     <div className="flex items-center gap-3">
// // // //                       <span className="text-sm font-medium">Jumlah:</span>
// // // //                       <div className="flex items-center gap-2">
// // // //                         <Button
// // // //                           variant="outline"
// // // //                           size="sm"
// // // //                           onClick={() => updateQuantity(index, item.quantity - 1)}
// // // //                           disabled={item.quantity <= 1}
// // // //                         >
// // // //                           <Minus className="h-3 w-3" />
// // // //                         </Button>
                        
// // // //                         <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
// // // //                         <Button
// // // //                           variant="outline"
// // // //                           size="sm"
// // // //                           onClick={() => updateQuantity(index, item.quantity + 1)}
// // // //                           disabled={item.quantity >= item.equipment.stock_quantity}
// // // //                         >
// // // //                           <Plus className="h-3 w-3" />
// // // //                         </Button>
// // // //                       </div>
                      
// // // //                       <span className="text-xs text-gray-500">
// // // //                         (Stok: {item.equipment.stock_quantity})
// // // //                       </span>
// // // //                     </div>

// // // //                     {formData.duration > 0 && (
// // // //                       <div className="bg-gray-50 p-3 rounded text-sm">
// // // //                         <p className="font-medium">
// // // //                           Subtotal: Rp {(item.equipment.price_per_day * item.quantity * formData.duration).toLocaleString('id-ID')}
// // // //                         </p>
// // // //                         <p className="text-gray-600">
// // // //                           {item.quantity}x untuk {formData.duration} hari
// // // //                         </p>
// // // //                       </div>
// // // //                     )}
// // // //                   </div>
// // // //                 ))}

// // // //                 {/* Total Cost */}
// // // //                 {formData.duration > 0 && (
// // // //                   <div className="bg-green-50 p-4 rounded-lg border-t-2 border-green-600">
// // // //                     <p className="font-bold text-green-800 text-lg">Total Estimasi:</p>
// // // //                     <p className="text-3xl font-bold text-green-600">
// // // //                       Rp {calculateTotalCost().toLocaleString('id-ID')}
// // // //                     </p>
// // // //                     <p className="text-sm text-green-600">untuk {formData.duration} hari</p>
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Add More Equipment */}
// // // //                 <Link to="/browse">
// // // //                   <Button variant="outline" className="w-full">
// // // //                     <Plus className="h-4 w-4 mr-2" />
// // // //                     Tambah Peralatan Lain
// // // //                   </Button>
// // // //                 </Link>
// // // //               </CardContent>
// // // //             </Card>

// // // //             {/* Booking Form - sama seperti sebelumnya */}
// // // //             <Card>
// // // //               <CardHeader>
// // // //                 <CardTitle>Form Booking</CardTitle>
// // // //                 <p className="text-sm text-gray-600">
// // // //                   Isi data di bawah untuk melanjutkan ke WhatsApp
// // // //                 </p>
// // // //               </CardHeader>
// // // //               <CardContent>
// // // //                 <form onSubmit={handleSubmit} className="space-y-4">
// // // //                   {/* Personal Data - sama seperti sebelumnya */}
// // // //                   <div className="space-y-4">
// // // //                     <div>
// // // //                       <Label htmlFor="name">Nama Lengkap *</Label>
// // // //                       <Input
// // // //                         id="name"
// // // //                         name="name"
// // // //                         type="text"
// // // //                         required
// // // //                         value={formData.name}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="Nama sesuai KTP"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <Label htmlFor="phone">Nomor WhatsApp *</Label>
// // // //                       <Input
// // // //                         id="phone"
// // // //                         name="phone"
// // // //                         type="tel"
// // // //                         required
// // // //                         value={formData.phone}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="08xxxxxxxxxx"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <Label htmlFor="email">Email</Label>
// // // //                       <Input
// // // //                         id="email"
// // // //                         name="email"
// // // //                         type="email"
// // // //                         value={formData.email}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="email@contoh.com"
// // // //                       />
// // // //                     </div>

// // // //                     <div>
// // // //                       <Label htmlFor="identity_number">Nomor KTP</Label>
// // // //                       <Input
// // // //                         id="identity_number"
// // // //                         name="identity_number"
// // // //                         type="text"
// // // //                         value={formData.identity_number}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="3201xxxxxxxxxxxxxx"
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Rental Period - sama seperti sebelumnya */}
// // // //                   <div className="space-y-4 pt-4 border-t">
// // // //                     <h4 className="font-medium flex items-center gap-2">
// // // //                       <Calendar className="h-4 w-4" />
// // // //                       Periode Sewa
// // // //                     </h4>

// // // //                     <div className="grid grid-cols-2 gap-4">
// // // //                       <div>
// // // //                         <Label htmlFor="start_date">Tanggal Mulai *</Label>
// // // //                         <Input
// // // //                           id="start_date"
// // // //                           name="start_date"
// // // //                           type="date"
// // // //                           required
// // // //                           value={formData.start_date}
// // // //                           onChange={handleInputChange}
// // // //                           min={new Date().toISOString().split('T')[0]}
// // // //                         />
// // // //                       </div>

// // // //                       <div>
// // // //                         <Label htmlFor="end_date">Tanggal Selesai *</Label>
// // // //                         <Input
// // // //                           id="end_date"
// // // //                           name="end_date"
// // // //                           type="date"
// // // //                           required
// // // //                           value={formData.end_date}
// // // //                           onChange={handleInputChange}
// // // //                           min={formData.start_date || new Date().toISOString().split('T')[0]}
// // // //                         />
// // // //                       </div>
// // // //                     </div>

// // // //                     {formData.duration > 0 && (
// // // //                       <p className="text-sm text-gray-600">
// // // //                         Durasi: <span className="font-medium">{formData.duration} hari</span>
// // // //                       </p>
// // // //                     )}
// // // //                   </div>

// // // //                   {/* Notes */}
// // // //                   <div>
// // // //                     <Label htmlFor="notes">Catatan Tambahan</Label>
// // // //                     <Textarea
// // // //                       id="notes"
// // // //                       name="notes"
// // // //                       rows={3}
// // // //                       value={formData.notes}
// // // //                       onChange={handleInputChange}
// // // //                       placeholder="Catatan khusus untuk penyewaan ini..."
// // // //                     />
// // // //                   </div>

// // // //                   {/* Submit Button */}
// // // //                   <Button
// // // //                     type="submit"
// // // //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// // // //                   >
// // // //                     <MessageCircle className="h-5 w-5 mr-2" />
// // // //                     Lanjut ke WhatsApp
// // // //                   </Button>

// // // //                   <p className="text-xs text-gray-500 text-center">
// // // //                     Dengan melanjutkan, Anda akan diarahkan ke WhatsApp untuk konfirmasi booking
// // // //                   </p>
// // // //                 </form>
// // // //               </CardContent>
// // // //             </Card>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default BookingForm

// // // // ...existing imports...
// // // import { useState, useEffect } from 'react'
// // // import { useSearchParams, Link } from 'react-router-dom'
// // // import { equipmentAPI, Equipment } from '@/lib/api'
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // import { Button } from '@/components/ui/button'
// // // import { Input } from '@/components/ui/input'
// // // import { Label } from '@/components/ui/label'
// // // import { Textarea } from '@/components/ui/textarea'
// // // import { Badge } from '@/components/ui/badge'
// // // import { ArrowLeft, MessageCircle, Calendar, Plus, Minus, Trash2 } from 'lucide-react'
// // // import { useToast } from '@/hooks/use-toast'

// // // interface BookingItem {
// // //   equipment: Equipment
// // //   quantity: number
// // // }

// // // const BookingForm = () => {
// // //   const [searchParams] = useSearchParams()
// // //   const { toast } = useToast()
  
// // //   const [bookingItems, setBookingItems] = useState<BookingItem[]>([])
// // //   const [loading, setLoading] = useState(true)
  
// // //   // Form data
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     phone: '',
// // //     email: '',
// // //     identity_number: '',
// // //     start_date: '',
// // //     end_date: '',
// // //     duration: 1,
// // //     notes: ''
// // //   })

// // //   const equipmentId = searchParams.get('equipment_id')
// // //   const additionalEquipmentId = searchParams.get('additional_equipment_id') // ✅ TAMBAH INI

// // //   useEffect(() => {
// // //     if (equipmentId) {
// // //       fetchEquipmentDetail(parseInt(equipmentId))
// // //     }
// // //   }, [equipmentId])

// // //   // ✅ TAMBAH EFFECT UNTUK ADDITIONAL EQUIPMENT
// // //   useEffect(() => {
// // //     if (additionalEquipmentId && bookingItems.length > 0) {
// // //       fetchAndAddAdditionalEquipment(parseInt(additionalEquipmentId))
// // //     }
// // //   }, [additionalEquipmentId, bookingItems.length])

// // //   const fetchEquipmentDetail = async (id: number) => {
// // //     try {
// // //       setLoading(true)
// // //       const response = await equipmentAPI.getById(id)
      
// // //       if (response.data.status === 'success') {
// // //         setBookingItems([{
// // //           equipment: response.data.data,
// // //           quantity: 1
// // //         }])
// // //       }
// // //     } catch (err) {
// // //       console.error('Error:', err)
// // //       toast({
// // //         title: "Error",
// // //         description: "Gagal memuat detail equipment",
// // //         variant: "destructive"
// // //       })
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   // ✅ TAMBAH FUNCTION UNTUK ADDITIONAL EQUIPMENT
// // //   const fetchAndAddAdditionalEquipment = async (id: number) => {
// // //     try {
// // //       const response = await equipmentAPI.getById(id)
      
// // //       if (response.data.status === 'success') {
// // //         const newEquipment = response.data.data
        
// // //         // Check if equipment already exists
// // //         const existingIndex = bookingItems.findIndex(
// // //           item => item.equipment.equipment_id === newEquipment.equipment_id
// // //         )

// // //         if (existingIndex >= 0) {
// // //           // If exists, increase quantity
// // //           setBookingItems(prev => 
// // //             prev.map((item, index) => 
// // //               index === existingIndex 
// // //                 ? { ...item, quantity: Math.min(item.quantity + 1, item.equipment.stock_quantity) }
// // //                 : item
// // //             )
// // //           )
// // //           toast({
// // //             title: "Equipment Sudah Ada",
// // //             description: `Quantity ${newEquipment.name} ditambah 1`,
// // //           })
// // //         } else {
// // //           // If new, add to list
// // //           setBookingItems(prev => [...prev, {
// // //             equipment: newEquipment,
// // //             quantity: 1
// // //           }])
// // //           toast({
// // //             title: "Equipment Ditambahkan",
// // //             description: `${newEquipment.name} berhasil ditambahkan ke booking`,
// // //           })
// // //         }

// // //         // Clean up URL params
// // //         const newSearchParams = new URLSearchParams(searchParams)
// // //         newSearchParams.delete('additional_equipment_id')
// // //         window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams}`)
// // //       }
// // //     } catch (err) {
// // //       console.error('Error:', err)
// // //       toast({
// // //         title: "Error",
// // //         description: "Gagal menambah equipment",
// // //         variant: "destructive"
// // //       })
// // //     }
// // //   }

// // //   const updateQuantity = (index: number, newQuantity: number) => {
// // //     if (newQuantity < 1) return
    
// // //     setBookingItems(prev => 
// // //       prev.map((item, i) => 
// // //         i === index ? { ...item, quantity: Math.min(newQuantity, item.equipment.stock_quantity) } : item
// // //       )
// // //     )
// // //   }

// // //   const removeItem = (index: number) => {
// // //     setBookingItems(prev => prev.filter((_, i) => i !== index))
// // //   }

// // //   // ✅ GENERATE EXISTING IDS FOR ADD EQUIPMENT PAGE
// // //   const getExistingEquipmentIds = () => {
// // //     return bookingItems.map(item => item.equipment.equipment_id).join(',')
// // //   }

// // //   // ...existing functions (handleInputChange, calculateTotalCost, generateWhatsAppMessage, handleSubmit)...
// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // //     const { name, value } = e.target
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }))

// // //     // Auto calculate duration when dates change
// // //     if (name === 'start_date' || name === 'end_date') {
// // //       const start = name === 'start_date' ? new Date(value) : new Date(formData.start_date)
// // //       const end = name === 'end_date' ? new Date(value) : new Date(formData.end_date)
      
// // //       if (start && end && end > start) {
// // //         const diffTime = Math.abs(end.getTime() - start.getTime())
// // //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
// // //         setFormData(prev => ({ ...prev, duration: diffDays }))
// // //       }
// // //     }
// // //   }

// // //   const calculateTotalCost = () => {
// // //     return bookingItems.reduce((total, item) => {
// // //       return total + (item.equipment.price_per_day * item.quantity * formData.duration)
// // //     }, 0)
// // //   }

// // //   const generateWhatsAppMessage = () => {
// // //     if (bookingItems.length === 0) return ''

// // //     const totalCost = calculateTotalCost()

// // //     const itemsList = bookingItems.map(item => 
// // //       `• ${item.equipment.name} (${item.equipment.code}) - ${item.quantity}x - Rp ${(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}/hari`
// // //     ).join('\n')

// // //     const message = `
// // // ⛰*BOOKING KELANA OUTDOOR*

// // // 👤 *DATA PENYEWA:*
// // // • Nama: ${formData.name}
// // // • HP: ${formData.phone}
// // // • Email: ${formData.email}
// // // • No. KTP: ${formData.identity_number}

// // // 🛍 *PERALATAN:*
// // // ${itemsList}

// // // 🗓 *PERIODE SEWA:*
// // // • Mulai: ${formData.start_date}
// // // • Selesai: ${formData.end_date} 
// // // • Durasi: ${formData.duration} hari

// // // 💰 *ESTIMASI BIAYA TOTAL:*
// // // Rp ${totalCost.toLocaleString('id-ID')}

// // // 📒 *CATATAN:*
// // // ${formData.notes || 'Tidak ada catatan khusus'}

// // // ---
// // // Mohon konfirmasi ketersediaan dan detail pembayaran. Terima kasih! 🙏
// // //     `.trim()

// // //     return encodeURIComponent(message)
// // //   }

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault()

// // //     // Validation
// // //     if (!formData.name || !formData.phone || !formData.start_date || !formData.end_date) {
// // //       toast({
// // //         title: "Data Tidak Lengkap",
// // //         description: "Mohon lengkapi semua data yang diperlukan",
// // //         variant: "destructive"
// // //       })
// // //       return
// // //     }

// // //     if (bookingItems.length === 0) {
// // //       toast({
// // //         title: "Tidak Ada Barang",
// // //         description: "Pilih minimal satu peralatan untuk disewa",
// // //         variant: "destructive"
// // //       })
// // //       return
// // //     }

// // //     if (new Date(formData.end_date) <= new Date(formData.start_date)) {
// // //       toast({
// // //         title: "Tanggal Tidak Valid",
// // //         description: "Tanggal selesai harus setelah tanggal mulai",
// // //         variant: "destructive"
// // //       })
// // //       return
// // //     }

// // //     // Generate WhatsApp link
// // //     const message = generateWhatsAppMessage()
// // //     const whatsappNumber = '6285750777394'
// // //     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

// // //     // Open WhatsApp
// // //     window.open(whatsappUrl, '_blank')

// // //     toast({
// // //       title: "Berhasil!",
// // //       description: "Anda akan diarahkan ke WhatsApp untuk konfirmasi booking",
// // //     })
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
// // //           <p className="mt-4 text-gray-600">Memuat form booking...</p>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   if (bookingItems.length === 0) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center">
// // //           <p className="text-red-600 text-lg mb-4">Tidak ada equipment yang dipilih</p>
// // //           <Link to="/browse">
// // //             <Button>Kembali ke Browse</Button>
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <div className="container mx-auto px-4 py-8">
// // //         {/* Back Button */}
// // //         <Link to="/browse">
// // //           <Button variant="ghost" className="mb-6">
// // //             <ArrowLeft className="h-4 w-4 mr-2" />
// // //             Kembali ke Browse
// // //           </Button>
// // //         </Link>

// // //         <div className="max-w-6xl mx-auto">
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // //             {/* Equipment Summary */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>Peralatan yang Dipilih</CardTitle>
// // //               </CardHeader>
// // //               <CardContent className="space-y-4">
// // //                 {bookingItems.map((item, index) => (
// // //                   <div key={index} className="border rounded-lg p-4 space-y-3">
// // //                     <div className="flex justify-between items-start">
// // //                       <div className="flex-1">
// // //                         <h4 className="font-semibold">{item.equipment.name}</h4>
// // //                         <div className="flex items-center gap-2 mt-1">
// // //                           <Badge variant="secondary" className="text-xs">
// // //                             {item.equipment.category.toUpperCase()}
// // //                           </Badge>
// // //                           <span className="text-xs text-gray-500">{item.equipment.code}</span>
// // //                         </div>
// // //                         <p className="text-lg font-bold text-green-600 mt-2">
// // //                           Rp {item.equipment.price_per_day.toLocaleString('id-ID')}/hari
// // //                         </p>
// // //                       </div>
                      
// // //                       <Button
// // //                         variant="ghost"
// // //                         size="sm"
// // //                         onClick={() => removeItem(index)}
// // //                         className="text-red-500 hover:text-red-700"
// // //                       >
// // //                         <Trash2 className="h-4 w-4" />
// // //                       </Button>
// // //                     </div>

// // //                     {/* Quantity Controls */}
// // //                     <div className="flex items-center gap-3">
// // //                       <span className="text-sm font-medium">Jumlah:</span>
// // //                       <div className="flex items-center gap-2">
// // //                         <Button
// // //                           variant="outline"
// // //                           size="sm"
// // //                           onClick={() => updateQuantity(index, item.quantity - 1)}
// // //                           disabled={item.quantity <= 1}
// // //                         >
// // //                           <Minus className="h-3 w-3" />
// // //                         </Button>
                        
// // //                         <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
// // //                         <Button
// // //                           variant="outline"
// // //                           size="sm"
// // //                           onClick={() => updateQuantity(index, item.quantity + 1)}
// // //                           disabled={item.quantity >= item.equipment.stock_quantity}
// // //                         >
// // //                           <Plus className="h-3 w-3" />
// // //                         </Button>
// // //                       </div>
                      
// // //                       <span className="text-xs text-gray-500">
// // //                         (Stok: {item.equipment.stock_quantity})
// // //                       </span>
// // //                     </div>

// // //                     {formData.duration > 0 && (
// // //                       <div className="bg-gray-50 p-3 rounded text-sm">
// // //                         <p className="font-medium">
// // //                           Subtotal: Rp {(item.equipment.price_per_day * item.quantity * formData.duration).toLocaleString('id-ID')}
// // //                         </p>
// // //                         <p className="text-gray-600">
// // //                           {item.quantity}x untuk {formData.duration} hari
// // //                         </p>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 ))}

// // //                 {/* Total Cost */}
// // //                 {formData.duration > 0 && (
// // //                   <div className="bg-green-50 p-4 rounded-lg border-t-2 border-green-600">
// // //                     <p className="font-bold text-green-800 text-lg">Total Estimasi:</p>
// // //                     <p className="text-3xl font-bold text-green-600">
// // //                       Rp {calculateTotalCost().toLocaleString('id-ID')}
// // //                     </p>
// // //                     <p className="text-sm text-green-600">untuk {formData.duration} hari</p>
// // //                   </div>
// // //                 )}

// // //                 {/* ✅ UPDATE ADD MORE EQUIPMENT BUTTON */}
// // //                 <Link to={`/add-equipment-to-booking?from=booking&existing_ids=${getExistingEquipmentIds()}`}>
// // //                   <Button variant="outline" className="w-full">
// // //                     <Plus className="h-4 w-4 mr-2" />
// // //                     Tambah Peralatan Lain
// // //                   </Button>
// // //                 </Link>
// // //               </CardContent>
// // //             </Card>

// // //             {/* Booking Form - rest of the form remains the same */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>Form Booking</CardTitle>
// // //                 <p className="text-sm text-gray-600">
// // //                   Isi data di bawah untuk melanjutkan ke WhatsApp
// // //                 </p>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <form onSubmit={handleSubmit} className="space-y-4">
// // //                   {/* Personal Data */}
// // //                   <div className="space-y-4">
// // //                     <div>
// // //                       <Label htmlFor="name">Nama Lengkap *</Label>
// // //                       <Input
// // //                         id="name"
// // //                         name="name"
// // //                         type="text"
// // //                         required
// // //                         value={formData.name}
// // //                         onChange={handleInputChange}
// // //                         placeholder="Nama sesuai KTP"
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="phone">Nomor WhatsApp *</Label>
// // //                       <Input
// // //                         id="phone"
// // //                         name="phone"
// // //                         type="tel"
// // //                         required
// // //                         value={formData.phone}
// // //                         onChange={handleInputChange}
// // //                         placeholder="08xxxxxxxxxx"
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="email">Email</Label>
// // //                       <Input
// // //                         id="email"
// // //                         name="email"
// // //                         type="email"
// // //                         value={formData.email}
// // //                         onChange={handleInputChange}
// // //                         placeholder="email@contoh.com"
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <Label htmlFor="identity_number">Nomor KTP</Label>
// // //                       <Input
// // //                         id="identity_number"
// // //                         name="identity_number"
// // //                         type="text"
// // //                         value={formData.identity_number}
// // //                         onChange={handleInputChange}
// // //                         placeholder="3201xxxxxxxxxxxxxx"
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* Rental Period */}
// // //                   <div className="space-y-4 pt-4 border-t">
// // //                     <h4 className="font-medium flex items-center gap-2">
// // //                       <Calendar className="h-4 w-4" />
// // //                       Periode Sewa
// // //                     </h4>

// // //                     <div className="grid grid-cols-2 gap-4">
// // //                       <div>
// // //                         <Label htmlFor="start_date">Tanggal Mulai *</Label>
// // //                         <Input
// // //                           id="start_date"
// // //                           name="start_date"
// // //                           type="date"
// // //                           required
// // //                           value={formData.start_date}
// // //                           onChange={handleInputChange}
// // //                           min={new Date().toISOString().split('T')[0]}
// // //                         />
// // //                       </div>

// // //                       <div>
// // //                         <Label htmlFor="end_date">Tanggal Selesai *</Label>
// // //                         <Input
// // //                           id="end_date"
// // //                           name="end_date"
// // //                           type="date"
// // //                           required
// // //                           value={formData.end_date}
// // //                           onChange={handleInputChange}
// // //                           min={formData.start_date || new Date().toISOString().split('T')[0]}
// // //                         />
// // //                       </div>
// // //                     </div>

// // //                     {formData.duration > 0 && (
// // //                       <p className="text-sm text-gray-600">
// // //                         Durasi: <span className="font-medium">{formData.duration} hari</span>
// // //                       </p>
// // //                     )}
// // //                   </div>

// // //                   {/* Notes */}
// // //                   <div>
// // //                     <Label htmlFor="notes">Catatan Tambahan</Label>
// // //                     <Textarea
// // //                       id="notes"
// // //                       name="notes"
// // //                       rows={3}
// // //                       value={formData.notes}
// // //                       onChange={handleInputChange}
// // //                       placeholder="Catatan khusus untuk penyewaan ini..."
// // //                     />
// // //             {/* notes */}
// // //                   </div>
// // //                     <p className="text-xs text-gray-500 text-center">
// // //                     Notes, ketika datang ke Kelana - Outdoor jangan lupa membawa kartu identitas (KTP) sebagai syarat dan kebijakan booking
// // //                   </p>
// // //                   {/* Submit Button */}
// // //                   <Button
// // //                     type="submit"
// // //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// // //                   >
// // //                     <MessageCircle className="h-5 w-5 mr-2" />
// // //                     Booking Sekarang!
// // //                   </Button>

// // //                   <p className="text-xs text-gray-500 text-center">
// // //                     Dengan melanjutkan, Anda akan diarahkan ke WhatsApp untuk konfirmasi booking
// // //                   </p>
// // //                 </form>
// // //               </CardContent>
// // //             </Card>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default BookingForm

// // import { useState, useEffect } from 'react'
// // import { useSearchParams, Link } from 'react-router-dom'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Button } from '@/components/ui/button'
// // import { Input } from '@/components/ui/input'
// // import { Label } from '@/components/ui/label'
// // import { Textarea } from '@/components/ui/textarea'
// // import { Badge } from '@/components/ui/badge'
// // import { ArrowLeft, MessageCircle, Calendar, Plus, Minus, Trash2 } from 'lucide-react'

// // interface Equipment {
// //   equipment_id: number;
// //   name: string;
// //   code: string;
// //   description?: string;
// //   category: string;
// //   size_capacity?: string;
// //   dimensions?: string;
// //   weight?: number;
// //   material?: string;
// //   stock_quantity: number;
// //   available_stock: number;
// //   reserved_stock: number;
// //   rented_stock: number;
// //   price_per_day: number;
// //   condition: string;
// //   equipment_type?: string;
// //   image_url?: string;
// //   created_at: string;
// // }

// // interface BookingItem {
// //   equipment: Equipment
// //   quantity: number
// // }

// // const BookingForm = () => {
// //   const [searchParams] = useSearchParams()
  
// //   const [bookingItems, setBookingItems] = useState<BookingItem[]>([])
// //   const [loading, setLoading] = useState(true)
  
// //   // Form data
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     phone: '',
// //     email: '',
// //     identity_number: '',
// //     start_date: '',
// //     end_date: '',
// //     duration: 1,
// //     notes: ''
// //   })

// //   const equipmentId = searchParams.get('equipment_id')
// //   const additionalEquipmentId = searchParams.get('additional_equipment_id')

// //   useEffect(() => {
// //     if (equipmentId) {
// //       fetchEquipmentDetail(parseInt(equipmentId))
// //     }
// //   }, [equipmentId])

// //   useEffect(() => {
// //     if (additionalEquipmentId && bookingItems.length > 0) {
// //       fetchAndAddAdditionalEquipment(parseInt(additionalEquipmentId))
// //     }
// //   }, [additionalEquipmentId, bookingItems.length])

// //   const fetchEquipmentDetail = async (id: number) => {
// //     try {
// //       setLoading(true)
      
// //       // ✅ SIMPLE FETCH TANPA equipmentAPI
// //       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php?id=${id}`)
      
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`)
// //       }
      
// //       const data = await response.json()
      
// //       let foundEquipment = null
// //       if (data.equipment_id) {
// //         foundEquipment = data
// //       } else if (Array.isArray(data)) {
// //         foundEquipment = data.find(item => item.equipment_id === id)
// //       }
      
// //       if (foundEquipment) {
// //         setBookingItems([{
// //           equipment: foundEquipment,
// //           quantity: 1
// //         }])
// //       } else {
// //         throw new Error('Equipment tidak ditemukan')
// //       }
      
// //     } catch (err) {
// //       console.error('Error:', err)
      
// //       // ✅ FALLBACK DATA
// //       const fallbackEquipment: Equipment = {
// //         equipment_id: id,
// //         name: "Tenda Dome 4 Orang (FALLBACK)",
// //         code: "TENDA-001",
// //         description: "Data fallback untuk testing",
// //         category: "tenda",
// //         size_capacity: "4 orang",
// //         dimensions: "300x200x150 cm",
// //         weight: 4.5,
// //         material: "Polyester",
// //         stock_quantity: 5,
// //         available_stock: 5,
// //         reserved_stock: 0,
// //         rented_stock: 0,
// //         price_per_day: 60000,
// //         condition: "baik",
// //         equipment_type: "single",
// //         image_url: null,
// //         created_at: new Date().toISOString()
// //       }
      
// //       setBookingItems([{
// //         equipment: fallbackEquipment,
// //         quantity: 1
// //       }])
      
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const fetchAndAddAdditionalEquipment = async (id: number) => {
// //     try {
// //       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php?id=${id}`)
      
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`)
// //       }
      
// //       const data = await response.json()
      
// //       let newEquipment = null
// //       if (data.equipment_id) {
// //         newEquipment = data
// //       } else if (Array.isArray(data)) {
// //         newEquipment = data.find(item => item.equipment_id === id)
// //       }
      
// //       if (newEquipment) {
// //         // Check if equipment already exists
// //         const existingIndex = bookingItems.findIndex(
// //           item => item.equipment.equipment_id === newEquipment.equipment_id
// //         )

// //         if (existingIndex >= 0) {
// //           // If exists, increase quantity
// //           setBookingItems(prev => 
// //             prev.map((item, index) => 
// //               index === existingIndex 
// //                 ? { ...item, quantity: Math.min(item.quantity + 1, item.equipment.stock_quantity) }
// //                 : item
// //             )
// //           )
// //           alert(`Quantity ${newEquipment.name} ditambah 1`)
// //         } else {
// //           // If new, add to list
// //           setBookingItems(prev => [...prev, {
// //             equipment: newEquipment,
// //             quantity: 1
// //           }])
// //           alert(`${newEquipment.name} berhasil ditambahkan ke booking`)
// //         }

// //         // Clean up URL params
// //         const newSearchParams = new URLSearchParams(searchParams)
// //         newSearchParams.delete('additional_equipment_id')
// //         window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams}`)
// //       }
// //     } catch (err) {
// //       console.error('Error:', err)
// //       alert('Gagal menambah equipment')
// //     }
// //   }

// //   const updateQuantity = (index: number, newQuantity: number) => {
// //     if (newQuantity < 1) return
    
// //     setBookingItems(prev => 
// //       prev.map((item, i) => 
// //         i === index ? { ...item, quantity: Math.min(newQuantity, item.equipment.stock_quantity) } : item
// //       )
// //     )
// //   }

// //   const removeItem = (index: number) => {
// //     setBookingItems(prev => prev.filter((_, i) => i !== index))
// //   }

// //   const getExistingEquipmentIds = () => {
// //     return bookingItems.map(item => item.equipment.equipment_id).join(',')
// //   }

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }))

// //     // Auto calculate duration when dates change
// //     if (name === 'start_date' || name === 'end_date') {
// //       const start = name === 'start_date' ? new Date(value) : new Date(formData.start_date)
// //       const end = name === 'end_date' ? new Date(value) : new Date(formData.end_date)
      
// //       if (start && end && end > start) {
// //         const diffTime = Math.abs(end.getTime() - start.getTime())
// //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
// //         setFormData(prev => ({ ...prev, duration: diffDays }))
// //       }
// //     }
// //   }

// //   const calculateTotalCost = () => {
// //     return bookingItems.reduce((total, item) => {
// //       return total + (item.equipment.price_per_day * item.quantity * formData.duration)
// //     }, 0)
// //   }

// //   const generateWhatsAppMessage = () => {
// //     if (bookingItems.length === 0) return ''

// //     const totalCost = calculateTotalCost()

// //     const itemsList = bookingItems.map(item => 
// //       `• ${item.equipment.name} (${item.equipment.code}) - ${item.quantity}x - Rp ${(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}/hari`
// //     ).join('\n')

// //     const message = `
// // ⛰️ *BOOKING KELANA OUTDOOR*

// // 👤 *DATA PENYEWA:*
// // • Nama: ${formData.name}
// // • HP: ${formData.phone}
// // • Email: ${formData.email}
// // • No. KTP: ${formData.identity_number}

// // 🛍️ *PERALATAN:*
// // ${itemsList}

// // 🗓️ *PERIODE SEWA:*
// // • Mulai: ${formData.start_date}
// // • Selesai: ${formData.end_date} 
// // • Durasi: ${formData.duration} hari

// // 💰 *ESTIMASI BIAYA TOTAL:*
// // Rp ${totalCost.toLocaleString('id-ID')}

// // 📒 *CATATAN:*
// // ${formData.notes || 'Tidak ada catatan khusus'}

// // ---
// // Mohon konfirmasi ketersediaan dan detail pembayaran. Terima kasih! 🙏
// //     `.trim()

// //     return encodeURIComponent(message)
// //   }

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault()

// //     // Validation
// //     if (!formData.name || !formData.phone || !formData.start_date || !formData.end_date) {
// //       alert('Mohon lengkapi semua data yang diperlukan')
// //       return
// //     }

// //     if (bookingItems.length === 0) {
// //       alert('Pilih minimal satu peralatan untuk disewa')
// //       return
// //     }

// //     if (new Date(formData.end_date) <= new Date(formData.start_date)) {
// //       alert('Tanggal selesai harus setelah tanggal mulai')
// //       return
// //     }

// //     // Generate WhatsApp link
// //     const message = generateWhatsAppMessage()
// //     const whatsappNumber = '6281344492934'
// //     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

// //     // Open WhatsApp
// //     window.open(whatsappUrl, '_blank')
// //     alert('Anda akan diarahkan ke WhatsApp untuk konfirmasi booking')
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
// //           <p className="mt-4 text-gray-600">Memuat form booking...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (bookingItems.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <p className="text-red-600 text-lg mb-4">Tidak ada equipment yang dipilih</p>
// //           <Link to="/equipmentdetail">
// //             <Button>Kembali ke Equipment Detail</Button>
// //           </Link>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="container mx-auto px-4 py-8">
// //         {/* Back Button */}
// //         <Link to="/browse">
// //           <Button variant="ghost" className="mb-6">
// //             <ArrowLeft className="h-4 w-4 mr-2" />
// //             Kembali ke Browse
// //           </Button>
// //         </Link>

// //         <div className="max-w-6xl mx-auto">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //             {/* Equipment Summary */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Peralatan yang Dipilih</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 {bookingItems.map((item, index) => (
// //                   <div key={index} className="border rounded-lg p-4 space-y-3">
// //                     <div className="flex justify-between items-start">
// //                       <div className="flex-1">
// //                         <h4 className="font-semibold">{item.equipment.name}</h4>
// //                         <div className="flex items-center gap-2 mt-1">
// //                           <Badge variant="secondary" className="text-xs">
// //                             {item.equipment.category.toUpperCase()}
// //                           </Badge>
// //                           <span className="text-xs text-gray-500">{item.equipment.code}</span>
// //                         </div>
// //                         <p className="text-lg font-bold text-green-600 mt-2">
// //                           Rp {item.equipment.price_per_day.toLocaleString('id-ID')}/hari
// //                         </p>
// //                       </div>
                      
// //                       <Button
// //                         variant="ghost"
// //                         size="sm"
// //                         onClick={() => removeItem(index)}
// //                         className="text-red-500 hover:text-red-700"
// //                       >
// //                         <Trash2 className="h-4 w-4" />
// //                       </Button>
// //                     </div>

// //                     {/* Quantity Controls */}
// //                     <div className="flex items-center gap-3">
// //                       <span className="text-sm font-medium">Jumlah:</span>
// //                       <div className="flex items-center gap-2">
// //                         <Button
// //                           variant="outline"
// //                           size="sm"
// //                           onClick={() => updateQuantity(index, item.quantity - 1)}
// //                           disabled={item.quantity <= 1}
// //                         >
// //                           <Minus className="h-3 w-3" />
// //                         </Button>
                        
// //                         <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
// //                         <Button
// //                           variant="outline"
// //                           size="sm"
// //                           onClick={() => updateQuantity(index, item.quantity + 1)}
// //                           disabled={item.quantity >= item.equipment.stock_quantity}
// //                         >
// //                           <Plus className="h-3 w-3" />
// //                         </Button>
// //                       </div>
                      
// //                       <span className="text-xs text-gray-500">
// //                         (Stok: {item.equipment.stock_quantity})
// //                       </span>
// //                     </div>

// //                     {formData.duration > 0 && (
// //                       <div className="bg-gray-50 p-3 rounded text-sm">
// //                         <p className="font-medium">
// //                           Subtotal: Rp {(item.equipment.price_per_day * item.quantity * formData.duration).toLocaleString('id-ID')}
// //                         </p>
// //                         <p className="text-gray-600">
// //                           {item.quantity}x untuk {formData.duration} hari
// //                         </p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ))}

// //                 {/* Total Cost */}
// //                 {formData.duration > 0 && (
// //                   <div className="bg-green-50 p-4 rounded-lg border-t-2 border-green-600">
// //                     <p className="font-bold text-green-800 text-lg">Total Estimasi:</p>
// //                     <p className="text-3xl font-bold text-green-600">
// //                       Rp {calculateTotalCost().toLocaleString('id-ID')}
// //                     </p>
// //                     <p className="text-sm text-green-600">untuk {formData.duration} hari</p>
// //                   </div>
// //                 )}

// //                 {/* Add More Equipment */}
// //                 <Link to={`/add-equipment-to-booking?from=booking&existing_ids=${getExistingEquipmentIds()}`}>
// //                   <Button variant="outline" className="w-full">
// //                     <Plus className="h-4 w-4 mr-2" />
// //                     Tambah Peralatan Lain
// //                   </Button>
// //                 </Link>
// //               </CardContent>
// //             </Card>

// //             {/* Booking Form */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Form Booking</CardTitle>
// //                 <p className="text-sm text-gray-600">
// //                   Isi data di bawah untuk melanjutkan ke WhatsApp
// //                 </p>
// //               </CardHeader>
// //               <CardContent>
// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                   {/* Personal Data */}
// //                   <div className="space-y-4">
// //                     <div>
// //                       <Label htmlFor="name">Nama Lengkap *</Label>
// //                       <Input
// //                         id="name"
// //                         name="name"
// //                         type="text"
// //                         required
// //                         value={formData.name}
// //                         onChange={handleInputChange}
// //                         placeholder="Nama sesuai KTP"
// //                       />
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="phone">Nomor WhatsApp *</Label>
// //                       <Input
// //                         id="phone"
// //                         name="phone"
// //                         type="tel"
// //                         required
// //                         value={formData.phone}
// //                         onChange={handleInputChange}
// //                         placeholder="08xxxxxxxxxx"
// //                       />
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="email">Email</Label>
// //                       <Input
// //                         id="email"
// //                         name="email"
// //                         type="email"
// //                         value={formData.email}
// //                         onChange={handleInputChange}
// //                         placeholder="email@contoh.com"
// //                       />
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="identity_number">Nomor KTP</Label>
// //                       <Input
// //                         id="identity_number"
// //                         name="identity_number"
// //                         type="text"
// //                         value={formData.identity_number}
// //                         onChange={handleInputChange}
// //                         placeholder="3201xxxxxxxxxxxxxx"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Rental Period */}
// //                   <div className="space-y-4 pt-4 border-t">
// //                     <h4 className="font-medium flex items-center gap-2">
// //                       <Calendar className="h-4 w-4" />
// //                       Periode Sewa
// //                     </h4>

// //                     <div className="grid grid-cols-2 gap-4">
// //                       <div>
// //                         <Label htmlFor="start_date">Tanggal Mulai *</Label>
// //                         <Input
// //                           id="start_date"
// //                           name="start_date"
// //                           type="date"
// //                           required
// //                           value={formData.start_date}
// //                           onChange={handleInputChange}
// //                           min={new Date().toISOString().split('T')[0]}
// //                         />
// //                       </div>

// //                       <div>
// //                         <Label htmlFor="end_date">Tanggal Selesai *</Label>
// //                         <Input
// //                           id="end_date"
// //                           name="end_date"
// //                           type="date"
// //                           required
// //                           value={formData.end_date}
// //                           onChange={handleInputChange}
// //                           min={formData.start_date || new Date().toISOString().split('T')[0]}
// //                         />
// //                       </div>
// //                     </div>

// //                     {formData.duration > 0 && (
// //                       <p className="text-sm text-gray-600">
// //                         Durasi: <span className="font-medium">{formData.duration} hari</span>
// //                       </p>
// //                     )}
// //                   </div>

// //                   {/* Notes */}
// //                   <div>
// //                     <Label htmlFor="notes">Catatan Tambahan</Label>
// //                     <Textarea
// //                       id="notes"
// //                       name="notes"
// //                       rows={3}
// //                       value={formData.notes}
// //                       onChange={handleInputChange}
// //                       placeholder="Catatan khusus untuk penyewaan ini..."
// //                     />
// //                   </div>
                  
// //                   <p className="text-xs text-gray-500 text-center">
// //                     Notes, ketika datang ke Kelana - Outdoor jangan lupa membawa kartu identitas (KTP) sebagai syarat dan kebijakan booking
// //                   </p>

// //                   {/* Submit Button */}
// //                   <Button
// //                     type="submit"
// //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// //                   >
// //                     <MessageCircle className="h-5 w-5 mr-2" />
// //                     Booking Sekarang!
// //                   </Button>

// //                   <p className="text-xs text-gray-500 text-center">
// //                     Dengan melanjutkan, Anda akan diarahkan ke WhatsApp untuk konfirmasi booking
// //                   </p>
// //                 </form>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default BookingForm


// import { useState, useEffect } from 'react'
// import { useSearchParams, Link } from 'react-router-dom'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
// import { Badge } from '@/components/ui/badge'
// import { ArrowLeft, MessageCircle, Calendar, Plus, Minus, Trash2, Image as ImageIcon } from 'lucide-react'

// interface Equipment {
//   equipment_id: number;
//   name: string;
//   code: string;
//   description?: string;
//   category: string;
//   size_capacity?: string;
//   dimensions?: string;
//   weight?: number;
//   material?: string;
//   stock_quantity: number;
//   available_stock: number;
//   reserved_stock: number;
//   rented_stock: number;
//   price_per_day: number;
//   condition: string;
//   equipment_type?: string;
//   image_url?: string;
//   created_at: string;
// }

// interface BookingItem {
//   equipment: Equipment
//   quantity: number
// }

// const BookingForm = () => {
//   const [searchParams] = useSearchParams()
  
//   const [bookingItems, setBookingItems] = useState<BookingItem[]>([])
//   const [loading, setLoading] = useState(true)
  
//   // Form data
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     identity_number: '',
//     start_date: '',
//     end_date: '',
//     duration: 1,
//     notes: ''
//   })

//   const equipmentId = searchParams.get('equipment_id')
//   const additionalEquipmentId = searchParams.get('additional_equipment_id')

//   useEffect(() => {
//     if (equipmentId) {
//       fetchEquipmentDetail(parseInt(equipmentId))
//     }
//   }, [equipmentId])

//   useEffect(() => {
//     if (additionalEquipmentId && bookingItems.length > 0) {
//       fetchAndAddAdditionalEquipment(parseInt(additionalEquipmentId))
//     }
//   }, [additionalEquipmentId, bookingItems.length])

//   const fetchEquipmentDetail = async (id: number) => {
//   try {
//     setLoading(true)
    
//     console.log('🔍 Fetching equipment for booking:', id)
    
//     // ✅ ADD: Timeout untuk debugging
//     const controller = new AbortController()
//     const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
//     const response = await fetch(
//       `http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php?id=${id}`,
//       { signal: controller.signal }
//     )
    
//     clearTimeout(timeoutId)
    
//     console.log('📡 Response status:', response.status)
//     console.log('📡 Response headers:', response.headers)
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }
    
//     const text = await response.text()
//     console.log('📄 Raw response:', text.substring(0, 500))
    
//     const data = JSON.parse(text)
//     console.log('✅ Parsed data:', data)
    
//     let foundEquipment = null
//     if (data.equipment_id) {
//       foundEquipment = data
//     } else if (Array.isArray(data)) {
//       foundEquipment = data.find(item => item.equipment_id === id)
//     }
    
//     if (foundEquipment) {
//       setBookingItems([{
//         equipment: foundEquipment,
//         quantity: 1
//       }])
//       console.log('✅ Equipment loaded successfully')
//     } else {
//       throw new Error('Equipment tidak ditemukan dalam response')
//     }
    
//   } catch (err) {
//     console.error('❌ Error details:', err)
    
//     if (err.name === 'AbortError') {
//       console.error('❌ Request timeout - API too slow')
//       alert('❌ Koneksi ke server terlalu lama. Periksa server Anda.')
//     }
    
//     // ✅ FALLBACK DATA untuk development
//     const fallbackEquipment: Equipment = {
//       equipment_id: id,
//       name: "Equipment Debug (FALLBACK)",
//       code: `DEBUG-${id}`,
//       description: "Data fallback karena API error",
//       category: "debug",
//       size_capacity: "Testing",
//       dimensions: "Debug mode",
//       weight: 1,
//       material: "Fallback",
//       stock_quantity: 99,
//       available_stock: 99,
//       reserved_stock: 0,
//       rented_stock: 0,
//       price_per_day: 10000,
//       condition: "baik",
//       equipment_type: "single",
//       image_url: null,
//       created_at: new Date().toISOString()
//     }
    
//     setBookingItems([{
//       equipment: fallbackEquipment,
//       quantity: 1
//     }])
    
//     alert(`⚠️ API Error: ${err.message}\n\nMenggunakan data fallback untuk testing.`)
    
//   } finally {
//     setLoading(false)
//   }
// }

//   const fetchAndAddAdditionalEquipment = async (id: number) => {
//     try {
//       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php?id=${id}`)
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const data = await response.json()
      
//       let newEquipment = null
//       if (data.equipment_id) {
//         newEquipment = data
//       } else if (Array.isArray(data)) {
//         newEquipment = data.find(item => item.equipment_id === id)
//       }
      
//       if (newEquipment) {
//         // Check if equipment already exists
//         const existingIndex = bookingItems.findIndex(
//           item => item.equipment.equipment_id === newEquipment.equipment_id
//         )

//         if (existingIndex >= 0) {
//           // If exists, increase quantity
//           setBookingItems(prev => 
//             prev.map((item, index) => 
//               index === existingIndex 
//                 ? { ...item, quantity: Math.min(item.quantity + 1, item.equipment.stock_quantity) }
//                 : item
//             )
//           )
//           alert(`✅ Quantity ${newEquipment.name} ditambah 1`)
//         } else {
//           // If new, add to list
//           setBookingItems(prev => [...prev, {
//             equipment: newEquipment,
//             quantity: 1
//           }])
//           alert(`✅ ${newEquipment.name} berhasil ditambahkan ke booking`)
//         }

//         // Clean up URL params
//         const newSearchParams = new URLSearchParams(searchParams)
//         newSearchParams.delete('additional_equipment_id')
//         window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams}`)
//       }
//     } catch (err) {
//       console.error('Error:', err)
//       alert('❌ Gagal menambah equipment')
//     }
//   }

//   const updateQuantity = (index: number, newQuantity: number) => {
//     if (newQuantity < 1) return
    
//     setBookingItems(prev => 
//       prev.map((item, i) => 
//         i === index ? { ...item, quantity: Math.min(newQuantity, item.equipment.stock_quantity) } : item
//       )
//     )
//   }

//   const removeItem = (index: number) => {
//     setBookingItems(prev => prev.filter((_, i) => i !== index))
//   }

//   const getExistingEquipmentIds = () => {
//     return bookingItems.map(item => item.equipment.equipment_id).join(',')
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))

//     // Auto calculate duration when dates change
//     if (name === 'start_date' || name === 'end_date') {
//       const start = name === 'start_date' ? new Date(value) : new Date(formData.start_date)
//       const end = name === 'end_date' ? new Date(value) : new Date(formData.end_date)
      
//       if (start && end && end > start) {
//         const diffTime = Math.abs(end.getTime() - start.getTime())
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//         setFormData(prev => ({ ...prev, duration: diffDays }))
//       }
//     }
//   }

//   const calculateTotalCost = () => {
//     return bookingItems.reduce((total, item) => {
//       return total + (item.equipment.price_per_day * item.quantity * formData.duration)
//     }, 0)
//   }

//   const generateWhatsAppMessage = () => {
//     if (bookingItems.length === 0) return ''

//     const totalCost = calculateTotalCost()

//     const itemsList = bookingItems.map(item => 
//       `• ${item.equipment.name} (${item.equipment.code}) - ${item.quantity}x - Rp ${(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}/hari`
//     ).join('\n')

//     const message = `
// ⛰️ *BOOKING KELANA OUTDOOR*

// 👤 *DATA PENYEWA:*
// • Nama: ${formData.name}
// • HP: ${formData.phone}
// • Email: ${formData.email}
// • No. KTP: ${formData.identity_number}

// 🛍️ *PERALATAN:*
// ${itemsList}

// 🗓️ *PERIODE SEWA:*
// • Mulai: ${formData.start_date}
// • Selesai: ${formData.end_date} 
// • Durasi: ${formData.duration} hari

// 💰 *ESTIMASI BIAYA TOTAL:*
// Rp ${totalCost.toLocaleString('id-ID')}

// 📒 *CATATAN:*
// ${formData.notes || 'Tidak ada catatan khusus'}

// ---
// Mohon konfirmasi ketersediaan dan detail pembayaran. Terima kasih! 🙏
//     `.trim()

//     return encodeURIComponent(message)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // Validation
//     if (!formData.name || !formData.phone || !formData.start_date || !formData.end_date) {
//       alert('❌ Mohon lengkapi semua data yang diperlukan')
//       return
//     }

//     if (bookingItems.length === 0) {
//       alert('❌ Pilih minimal satu peralatan untuk disewa')
//       return
//     }

//     if (new Date(formData.end_date) <= new Date(formData.start_date)) {
//       alert('❌ Tanggal selesai harus setelah tanggal mulai')
//       return
//     }

//     // Generate WhatsApp link
//     const message = generateWhatsAppMessage()
//     const whatsappNumber = '6281344492934'
//     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

//     // Open WhatsApp
//     window.open(whatsappUrl, '_blank')
//     alert('✅ Anda akan diarahkan ke WhatsApp untuk konfirmasi booking')
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Memuat form booking...</p>
//         </div>
//       </div>
//     )
//   }

//   // ✅ FIXED: Error handling dengan link yang benar
//   if (bookingItems.length === 0) {
//     const lastEquipmentId = equipmentId || '1' // Fallback ke ID 1 jika tidak ada
    
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 text-lg mb-4">Tidak ada equipment yang dipilih untuk booking</p>
//           <div className="space-y-3">
//             <Link to={`/equipment/${lastEquipmentId}`}>
//               <Button className="bg-green-600 hover:bg-green-700 mr-2">
//                 Kembali ke Equipment Detail
//               </Button>
//             </Link>
//             <Link to="/browse">
//               <Button variant="outline">
//                 Browse Equipment Lain
//               </Button>
//             </Link>
//           </div>
//           <p className="text-sm text-gray-500 mt-3">
//             Pilih equipment dari halaman detail atau browse untuk memulai booking
//           </p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* ✅ FIXED: Back Button dengan dynamic link */}
//         <div className="flex gap-2 mb-6">
//           <Link to={`/equipment/${bookingItems[0]?.equipment.equipment_id || '1'}`}>
//             <Button variant="ghost">
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Kembali ke Detail
//             </Button>
//           </Link>
//           <Link to="/browse">
//             <Button variant="outline" size="sm">
//               Browse Lagi
//             </Button>
//           </Link>
//         </div>

//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* ✅ Equipment Summary dengan Image */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Peralatan yang Dipilih ({bookingItems.length})</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {bookingItems.map((item, index) => (
//                   <div key={index} className="border rounded-lg p-4 space-y-3">
//                     {/* ✅ EQUIPMENT IMAGE PREVIEW */}
//                     <div className="flex gap-3">
//                       <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                         {item.equipment.image_url ? (
//                           <img 
//                             src={`http://localhost${item.equipment.image_url}`}
//                             alt={item.equipment.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).style.display = 'none'
//                               const nextElement = (e.target as HTMLImageElement).nextElementSibling as HTMLElement
//                               if (nextElement) {
//                                 nextElement.style.display = 'flex'
//                               }
//                             }}
//                           />
//                         ) : null}
//                         <div className={`w-full h-full ${item.equipment.image_url ? 'hidden' : 'flex'} bg-gradient-to-br from-green-400 to-green-600 items-center justify-center`}>
//                           <span className="text-white text-lg font-bold">
//                             {item.equipment.name.charAt(0)}
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div className="flex-1">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h4 className="font-semibold">{item.equipment.name}</h4>
//                             <div className="flex items-center gap-2 mt-1">
//                               <Badge variant="secondary" className="text-xs">
//                                 {item.equipment.category.toUpperCase()}
//                               </Badge>
//                               <span className="text-xs text-gray-500">{item.equipment.code}</span>
//                             </div>
//                             <p className="text-lg font-bold text-green-600 mt-1">
//                               Rp {item.equipment.price_per_day.toLocaleString('id-ID')}/hari
//                             </p>
//                           </div>
                          
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => removeItem(index)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Quantity Controls */}
//                     <div className="flex items-center gap-3">
//                       <span className="text-sm font-medium">Jumlah:</span>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => updateQuantity(index, item.quantity - 1)}
//                           disabled={item.quantity <= 1}
//                         >
//                           <Minus className="h-3 w-3" />
//                         </Button>
                        
//                         <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => updateQuantity(index, item.quantity + 1)}
//                           disabled={item.quantity >= item.equipment.stock_quantity}
//                         >
//                           <Plus className="h-3 w-3" />
//                         </Button>
//                       </div>
                      
//                       <span className="text-xs text-gray-500">
//                         (Stok: {item.equipment.stock_quantity})
//                       </span>
//                     </div>

//                     {formData.duration > 0 && (
//                       <div className="bg-gray-50 p-3 rounded text-sm">
//                         <p className="font-medium">
//                           Subtotal: Rp {(item.equipment.price_per_day * item.quantity * formData.duration).toLocaleString('id-ID')}
//                         </p>
//                         <p className="text-gray-600">
//                           {item.quantity}x untuk {formData.duration} hari
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 {/* Total Cost */}
//                 {formData.duration > 0 && (
//                   <div className="bg-green-50 p-4 rounded-lg border-t-2 border-green-600">
//                     <p className="font-bold text-green-800 text-lg">Total Estimasi:</p>
//                     <p className="text-3xl font-bold text-green-600">
//                       Rp {calculateTotalCost().toLocaleString('id-ID')}
//                     </p>
//                     <p className="text-sm text-green-600">untuk {formData.duration} hari</p>
//                   </div>
//                 )}

//                 {/* Add More Equipment */}
// <Link to={`/tambah-equipment?from=booking&existing_ids=${getExistingEquipmentIds()}`}>
//   <Button variant="outline" className="w-full">
//     <Plus className="h-4 w-4 mr-2" />
//     Tambah Equipment Lain
//   </Button>
// </Link>
//               </CardContent>
//             </Card>

//             {/* Booking Form */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Form Booking</CardTitle>
//                 <p className="text-sm text-gray-600">
//                   Isi data di bawah untuk melanjutkan ke WhatsApp
//                 </p>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   {/* Personal Data */}
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="name">Nama Lengkap *</Label>
//                       <Input
//                         id="name"
//                         name="name"
//                         type="text"
//                         required
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Nama sesuai KTP"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="phone">Nomor WhatsApp *</Label>
//                       <Input
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         required
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         placeholder="08xxxxxxxxxx"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="email@contoh.com"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="identity_number">Nomor KTP</Label>
//                       <Input
//                         id="identity_number"
//                         name="identity_number"
//                         type="text"
//                         value={formData.identity_number}
//                         onChange={handleInputChange}
//                         placeholder="3201xxxxxxxxxxxxxx"
//                       />
//                     </div>
//                   </div>

//                   {/* Rental Period */}
//                   <div className="space-y-4 pt-4 border-t">
//                     <h4 className="font-medium flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       Periode Sewa
//                     </h4>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="start_date">Tanggal Mulai *</Label>
//                         <Input
//                           id="start_date"
//                           name="start_date"
//                           type="date"
//                           required
//                           value={formData.start_date}
//                           onChange={handleInputChange}
//                           min={new Date().toISOString().split('T')[0]}
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="end_date">Tanggal Selesai *</Label>
//                         <Input
//                           id="end_date"
//                           name="end_date"
//                           type="date"
//                           required
//                           value={formData.end_date}
//                           onChange={handleInputChange}
//                           min={formData.start_date || new Date().toISOString().split('T')[0]}
//                         />
//                       </div>
//                     </div>

//                     {formData.duration > 0 && (
//                       <p className="text-sm text-gray-600">
//                         Durasi: <span className="font-medium">{formData.duration} hari</span>
//                       </p>
//                     )}
//                   </div>

//                   {/* Notes */}
//                   <div>
//                     <Label htmlFor="notes">Catatan Tambahan</Label>
//                     <Textarea
//                       id="notes"
//                       name="notes"
//                       rows={3}
//                       value={formData.notes}
//                       onChange={handleInputChange}
//                       placeholder="Catatan khusus untuk penyewaan ini..."
//                     />
//                   </div>
                  
//                   <div className="bg-blue-50 p-3 rounded-lg">
//                     <p className="text-xs text-blue-700">
//                       📋 <strong>Catatan Penting:</strong> Ketika datang ke Kelana Outdoor, jangan lupa membawa kartu identitas (KTP) sebagai syarat dan kebijakan booking.
//                     </p>
//                   </div>

//                   {/* Submit Button */}
//                   <Button
//                     type="submit"
//                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
//                   >
//                     <MessageCircle className="h-5 w-5 mr-2" />
//                     🚀 Booking Sekarang!
//                   </Button>

//                   <p className="text-xs text-gray-500 text-center">
//                     Dengan melanjutkan, Anda akan diarahkan ke WhatsApp untuk konfirmasi booking
//                   </p>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookingForm

// import { useState, useEffect } from 'react'
// import { useSearchParams, Link, useNavigate } from 'react-router-dom'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
// import { Badge } from '@/components/ui/badge'
// import { ArrowLeft, MessageCircle, Calendar, Plus, Minus, Trash2, CheckCircle, ShoppingCart, Package } from 'lucide-react'

// interface Equipment {
//   equipment_id: number;
//   name: string;
//   code: string;
//   description?: string;
//   category: string;
//   size_capacity?: string;
//   dimensions?: string;
//   weight?: number;
//   material?: string;
//   stock_quantity: number;
//   available_stock: number;
//   reserved_stock: number;
//   rented_stock: number;
//   price_per_day: number;
//   condition: string;
//   equipment_type?: string;
//   image_url?: string;
//   created_at: string;
// }

// interface BookingItem {
//   equipment: Equipment
//   quantity: number
// }

// const BookingForm = () => {
//   const [searchParams] = useSearchParams()
//   const navigate = useNavigate()
  
//   const [bookingItems, setBookingItems] = useState<BookingItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [initialEquipment, setInitialEquipment] = useState<Equipment | null>(null) // ✅ Store initial equipment
  
//   // Form data
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     identity_number: '',
//     start_date: '',
//     end_date: '',
//     duration: 1,
//     notes: ''
//   })

//   const equipmentId = searchParams.get('equipment_id')

//   // ✅ CLEANUP localStorage saat keluar dari BookingForm - RESET ke initial
//   useEffect(() => {
//     return () => {
//       console.log('🧹 Leaving BookingForm - resetting to initial equipment only')
//       localStorage.removeItem('bookingItems')
      
//       // ✅ RESET to initial equipment for next visit
//       if (initialEquipment) {
//         const resetBookingItems = [{
//           equipment: initialEquipment,
//           quantity: 1
//         }]
//         localStorage.setItem('bookingItems', JSON.stringify(resetBookingItems))
//         console.log('🔄 Reset to initial equipment:', initialEquipment.name)
//       }
//     }
//   }, [initialEquipment])

//   // ✅ MAIN EFFECT: Load booking items
//   useEffect(() => {
//     console.log('🔍 BookingForm mounted - loading booking items...')
//     loadBookingItems()
//   }, [])

//   // ✅ LISTEN for localStorage changes dari TambahEquipment
//   useEffect(() => {
//     const handleStorageChange = () => {
//       console.log('📦 localStorage updated from TambahEquipment')
//       const savedItems = JSON.parse(localStorage.getItem('bookingItems') || '[]')
//       if (savedItems.length > 0) {
//         setBookingItems(savedItems)
//       }
//     }

//     window.addEventListener('bookingItemsUpdated', handleStorageChange)
    
//     return () => {
//       window.removeEventListener('bookingItemsUpdated', handleStorageChange)
//     }
//   }, [])

//   const loadBookingItems = () => {
//     try {
//       setLoading(true)
      
//       // ✅ PRIORITY 1: URL parameter (fresh booking dari "Lihat Detail")
//       if (equipmentId) {
//         console.log('📦 Loading initial equipment from URL:', equipmentId)
//         fetchEquipmentDetail(parseInt(equipmentId))
//         return
//       }
      
//       // ✅ PRIORITY 2: localStorage (dari TambahEquipment return)
//       const savedBookingItems = JSON.parse(localStorage.getItem('bookingItems') || '[]')
//       if (savedBookingItems.length > 0) {
//         console.log('✅ Found saved booking session:', savedBookingItems.length, 'items')
//         setBookingItems(savedBookingItems)
//         setLoading(false)
//         return
//       }
      
//       // ✅ PRIORITY 3: No data
//       console.log('⚠️ No booking data - empty state')
//       setLoading(false)
      
//     } catch (error) {
//       console.error('❌ Error loading booking items:', error)
//       setLoading(false)
//     }
//   }

//   const fetchEquipmentDetail = async (id: number) => {
//     try {
//       console.log('🔍 Fetching initial equipment from API:', id)
      
//       const response = await fetch(
//         `http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php?id=${id}`
//       )
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const text = await response.text()
//       const data = JSON.parse(text)
      
//       if (data.equipment_id) {
//         // ✅ STORE initial equipment untuk reset nanti
//         setInitialEquipment(data)
        
//         const initialBookingItems = [{
//           equipment: data,
//           quantity: 1
//         }]
        
//         setBookingItems(initialBookingItems)
//         localStorage.setItem('bookingItems', JSON.stringify(initialBookingItems))
//         console.log('✅ Initial equipment loaded and stored:', data.name)
//       } else {
//         throw new Error('Equipment tidak ditemukan')
//       }
      
//     } catch (err) {
//       console.error('❌ Error loading initial equipment:', err)
      
//       // Fallback equipment
//       const fallbackEquipment: Equipment = {
//         equipment_id: id,
//         name: `Equipment ${id} (Demo)`,
//         code: `DEMO-${id}`,
//         description: "Equipment demo untuk testing booking",
//         category: "demo",
//         size_capacity: "Demo",
//         dimensions: "Demo",
//         weight: 1,
//         material: "Demo",
//         stock_quantity: 10,
//         available_stock: 10,
//         reserved_stock: 0,
//         rented_stock: 0,
//         price_per_day: 25000,
//         condition: "baik",
//         equipment_type: "single",
//         image_url: null,
//         created_at: new Date().toISOString()
//       }
      
//       setInitialEquipment(fallbackEquipment)
      
//       const fallbackBookingItems = [{
//         equipment: fallbackEquipment,
//         quantity: 1
//       }]
      
//       setBookingItems(fallbackBookingItems)
//       localStorage.setItem('bookingItems', JSON.stringify(fallbackBookingItems))
//       console.log('✅ Fallback equipment loaded')
      
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ✅ UPDATE QUANTITY
//   const updateQuantity = (index: number, newQuantity: number) => {
//     if (newQuantity < 1) return
    
//     const updatedItems = bookingItems.map((item, i) => 
//       i === index 
//         ? { ...item, quantity: Math.min(newQuantity, item.equipment.stock_quantity) } 
//         : item
//     )
    
//     setBookingItems(updatedItems)
//     localStorage.setItem('bookingItems', JSON.stringify(updatedItems))
//   }

//   // ✅ REMOVE ITEM
//   const removeItem = (index: number) => {
//     const itemToRemove = bookingItems[index]
//     if (confirm(`❌ Hapus ${itemToRemove.equipment.name} dari booking?`)) {
//       const updatedItems = bookingItems.filter((_, i) => i !== index)
//       setBookingItems(updatedItems)
      
//       if (updatedItems.length === 0) {
//         localStorage.removeItem('bookingItems')
//       } else {
//         localStorage.setItem('bookingItems', JSON.stringify(updatedItems))
//       }
//     }
//   }

//   // ✅ CLEAR ALL BOOKING
//   const clearAllBooking = () => {
//     if (confirm('❌ Hapus semua equipment dari booking?')) {
//       setBookingItems([])
//       localStorage.removeItem('bookingItems')
//       alert('✅ Semua equipment dihapus dari booking')
//     }
//   }

//   // ✅ HANDLE BROWSE LAGI - Reset ke initial equipment
//   const handleBrowseAgain = () => {
//     console.log('🔄 User clicking Browse Lagi - will reset to initial equipment')
//     // localStorage akan di-reset di cleanup effect
//     navigate('/browse')
//   }

//   // ✅ HANDLE TAMBAH EQUIPMENT - Tidak langsung kembali
//   const handleTambahEquipment = () => {
//     console.log('➕ Going to TambahEquipment - user can add more items')
//     // Pass current booking untuk context
//     localStorage.setItem('bookingItems', JSON.stringify(bookingItems))
//     navigate('/tambah-equipment')
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))

//     // Auto calculate duration when dates change
//     if (name === 'start_date' || name === 'end_date') {
//       const start = name === 'start_date' ? new Date(value) : new Date(formData.start_date)
//       const end = name === 'end_date' ? new Date(value) : new Date(formData.end_date)
      
//       if (start && end && end > start) {
//         const diffTime = Math.abs(end.getTime() - start.getTime())
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//         setFormData(prev => ({ ...prev, duration: diffDays }))
//       }
//     }
//   }

//   // ✅ CALCULATE TOTAL COST
//   const calculateTotalCost = () => {
//     return bookingItems.reduce((total, item) => {
//       return total + (item.equipment.price_per_day * item.quantity * formData.duration)
//     }, 0)
//   }

//   const generateWhatsAppMessage = () => {
//     if (bookingItems.length === 0) return ''

//     const totalCost = calculateTotalCost()

//     const itemsList = bookingItems.map(item => 
//       `• ${item.equipment.name} (${item.equipment.code}) - ${item.quantity}x - Rp ${(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}/hari`
//     ).join('\n')

//     const message = `
// ⛰️ *BOOKING KELANA OUTDOOR*

// 👤 *DATA PENYEWA:*
// • Nama: ${formData.name}
// • HP: ${formData.phone}
// • Email: ${formData.email}
// • No. KTP: ${formData.identity_number}

// 🛍️ *PERALATAN:*
// ${itemsList}

// 🗓️ *PERIODE SEWA:*
// • Mulai: ${formData.start_date}
// • Selesai: ${formData.end_date} 
// • Durasi: ${formData.duration} hari

// 💰 *ESTIMASI BIAYA TOTAL:*
// Rp ${totalCost.toLocaleString('id-ID')}

// 📒 *CATATAN:*
// ${formData.notes || 'Tidak ada catatan khusus'}

// ---
// Mohon konfirmasi ketersediaan dan detail pembayaran. Terima kasih! 🙏
//     `.trim()

//     return encodeURIComponent(message)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // Validation
//     if (!formData.name || !formData.phone || !formData.start_date || !formData.end_date) {
//       alert('❌ Mohon lengkapi semua data yang diperlukan')
//       return
//     }

//     if (bookingItems.length === 0) {
//       alert('❌ Pilih minimal satu peralatan untuk disewa')
//       return
//     }

//     if (new Date(formData.end_date) <= new Date(formData.start_date)) {
//       alert('❌ Tanggal selesai harus setelah tanggal mulai')
//       return
//     }

//     // Generate WhatsApp link
//     const message = generateWhatsAppMessage()
//     const whatsappNumber = '6281344492934'
//     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

//     // Open WhatsApp
//     window.open(whatsappUrl, '_blank')
    
//     // ✅ CLEAR booking setelah submit
//     setBookingItems([])
//     localStorage.removeItem('bookingItems')
//     alert('✅ Booking berhasil dikirim via WhatsApp!')
//   }

//   // ✅ LOADING STATE
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Memuat booking...</p>
//         </div>
//       </div>
//     )
//   }

//   // ✅ NO EQUIPMENT STATE
//   if (bookingItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-600 text-xl mb-2">Keranjang Booking Kosong</p>
//           <p className="text-gray-500 mb-6">Pilih equipment yang ingin Anda sewa</p>
//           <div className="space-y-3">
//             <Button 
//               onClick={handleBrowseAgain}
//               className="bg-green-600 hover:bg-green-700"
//             >
//               <Package className="h-4 w-4 mr-2" />
//               Browse Equipment
//             </Button>
//             <br />
//             <Button 
//               onClick={handleTambahEquipment}
//               variant="outline"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Tambah Equipment
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-4">
//             <Button 
//               onClick={handleBrowseAgain}
//               variant="ghost"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Browse Lagi
//             </Button>
            
//             {/* ✅ Status dengan initial equipment info */}
//             <div className="hidden md:block">
//               <p className="text-sm text-gray-600">
//                 🛒 <span className="font-medium">{bookingItems.length} equipment</span> dalam booking
//                 {initialEquipment && (
//                   <span className="text-xs text-gray-500 ml-2">
//                     (Started with: {initialEquipment.name})
//                   </span>
//                 )}
//               </p>
//             </div>
//           </div>
          
//           {/* Clear All Button */}
//           <Button 
//             variant="outline" 
//             onClick={clearAllBooking}
//             className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-500"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Kosongkan Booking
//           </Button>
//         </div>

//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Equipment Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <CheckCircle className="h-5 w-5 text-green-600" />
//                   Peralatan yang Dipilih ({bookingItems.length})
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Display all equipment */}
//                 {bookingItems.map((item, index) => (
//                   <div key={`${item.equipment.equipment_id}-${index}`} className="border rounded-lg p-4 space-y-3 bg-white">
//                     {/* ✅ Mark initial equipment */}
//                     {initialEquipment && item.equipment.equipment_id === initialEquipment.equipment_id && (
//                       <div className="bg-blue-50 px-2 py-1 rounded text-xs text-blue-700 mb-2">
//                         📌 Initial Equipment (dari detail)
//                       </div>
//                     )}
                    
//                     {/* Equipment Display */}
//                     <div className="flex gap-3">
//                       <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <span className="text-white text-lg font-bold">
//                           {item.equipment.name.charAt(0)}
//                         </span>
//                       </div>
                      
//                       <div className="flex-1">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h4 className="font-semibold">{item.equipment.name}</h4>
//                             <div className="flex items-center gap-2 mt-1">
//                               <Badge variant="secondary" className="text-xs">
//                                 {item.equipment.category.toUpperCase()}
//                               </Badge>
//                               <span className="text-xs text-gray-500">{item.equipment.code}</span>
//                             </div>
//                             <p className="text-lg font-bold text-green-600 mt-1">
//                               Rp {item.equipment.price_per_day.toLocaleString('id-ID')}/hari
//                             </p>
//                           </div>
                          
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => removeItem(index)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Quantity Controls */}
//                     <div className="flex items-center gap-3">
//                       <span className="text-sm font-medium">Jumlah:</span>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => updateQuantity(index, item.quantity - 1)}
//                           disabled={item.quantity <= 1}
//                         >
//                           <Minus className="h-3 w-3" />
//                         </Button>
                        
//                         <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => updateQuantity(index, item.quantity + 1)}
//                           disabled={item.quantity >= item.equipment.stock_quantity}
//                         >
//                           <Plus className="h-3 w-3" />
//                         </Button>
//                       </div>
                      
//                       <span className="text-xs text-gray-500">
//                         (Stok: {item.equipment.stock_quantity})
//                       </span>
//                     </div>

//                     {/* Subtotal */}
//                     {formData.duration > 0 && (
//                       <div className="bg-gray-50 p-3 rounded text-sm">
//                         <p className="font-medium">
//                           Subtotal: Rp {(item.equipment.price_per_day * item.quantity * formData.duration).toLocaleString('id-ID')}
//                         </p>
//                         <p className="text-gray-600">
//                           {item.quantity}x untuk {formData.duration} hari
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 {/* Total Cost */}
//                 {formData.duration > 0 && (
//                   <div className="bg-green-50 p-4 rounded-lg border-t-2 border-green-600">
//                     <p className="font-bold text-green-800 text-lg">Total Estimasi:</p>
//                     <p className="text-3xl font-bold text-green-600">
//                       Rp {calculateTotalCost().toLocaleString('id-ID')}
//                     </p>
//                     <p className="text-sm text-green-600">untuk {formData.duration} hari</p>
//                   </div>
//                 )}

//                 {/* Tambah Equipment Button */}
//                 <Button 
//                   onClick={handleTambahEquipment}
//                   variant="outline" 
//                   className="w-full"
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   Tambah Equipment Lain
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Form Booking - sama seperti sebelumnya */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Form Booking</CardTitle>
//                 <p className="text-sm text-gray-600">
//                   Isi data di bawah untuk melanjutkan ke WhatsApp
//                 </p>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   {/* Personal Data */}
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="name">Nama Lengkap *</Label>
//                       <Input
//                         id="name"
//                         name="name"
//                         type="text"
//                         required
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Nama sesuai KTP"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="phone">Nomor WhatsApp *</Label>
//                       <Input
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         required
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         placeholder="08xxxxxxxxxx"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="email@contoh.com"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="identity_number">Nomor KTP</Label>
//                       <Input
//                         id="identity_number"
//                         name="identity_number"
//                         type="text"
//                         value={formData.identity_number}
//                         onChange={handleInputChange}
//                         placeholder="3201xxxxxxxxxxxxxx"
//                       />
//                     </div>
//                   </div>

//                   {/* Rental Period */}
//                   <div className="space-y-4 pt-4 border-t">
//                     <h4 className="font-medium flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       Periode Sewa
//                     </h4>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="start_date">Tanggal Mulai *</Label>
//                         <Input
//                           id="start_date"
//                           name="start_date"
//                           type="date"
//                           required
//                           value={formData.start_date}
//                           onChange={handleInputChange}
//                           min={new Date().toISOString().split('T')[0]}
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="end_date">Tanggal Selesai *</Label>
//                         <Input
//                           id="end_date"
//                           name="end_date"
//                           type="date"
//                           required
//                           value={formData.end_date}
//                           onChange={handleInputChange}
//                           min={formData.start_date || new Date().toISOString().split('T')[0]}
//                         />
//                       </div>
//                     </div>

//                     {formData.duration > 0 && (
//                       <p className="text-sm text-gray-600">
//                         Durasi: <span className="font-medium">{formData.duration} hari</span>
//                       </p>
//                     )}
//                   </div>

//                   {/* Notes */}
//                   <div>
//                     <Label htmlFor="notes">Catatan Tambahan</Label>
//                     <Textarea
//                       id="notes"
//                       name="notes"
//                       rows={3}
//                       value={formData.notes}
//                       onChange={handleInputChange}
//                       placeholder="Catatan khusus untuk penyewaan ini..."
//                     />
//                   </div>
                  
//                   <div className="bg-blue-50 p-3 rounded-lg">
//                     <p className="text-xs text-blue-700">
//                       📋 <strong>Catatan Penting:</strong> Ketika datang ke Kelana Outdoor, jangan lupa membawa kartu identitas (KTP) sebagai syarat dan kebijakan booking.
//                     </p>
//                   </div>

//                   {/* Submit Button */}
//                   <Button
//                     type="submit"
//                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
//                   >
//                     <MessageCircle className="h-5 w-5 mr-2" />
//                     🚀 Booking via WhatsApp
//                   </Button>

//                   <p className="text-xs text-gray-500 text-center">
//                     Dengan melanjutkan, Anda akan diarahkan ke WhatsApp untuk konfirmasi booking
//                   </p>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookingForm


// import { useState, useEffect } from 'react'
// import { useSearchParams, Link, useNavigate } from 'react-router-dom'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
// import { Badge } from '@/components/ui/badge'
// import { ArrowLeft, MessageCircle, Calendar, Plus, Minus, Trash2, CheckCircle, ShoppingCart, Package } from 'lucide-react'

// interface Equipment {
//   equipment_id: number;
//   name: string;
//   code: string;
//   description?: string;
//   category: string;
//   size_capacity?: string;
//   dimensions?: string;
//   weight?: number;
//   material?: string;
//   stock_quantity: number;
//   available_stock: number;
//   reserved_stock: number;
//   rented_stock: number;
//   price_per_day: number;
//   condition: string;
//   equipment_type?: string;
//   image_url?: string;
//   created_at: string;
// }

// interface BookingItem {
//   equipment: Equipment
//   quantity: number
// }

// const BookingForm = () => {
//   const [searchParams] = useSearchParams()
//   const navigate = useNavigate()
  
//   const [bookingItems, setBookingItems] = useState<BookingItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [initialEquipment, setInitialEquipment] = useState<Equipment | null>(null) // ✅ Store initial equipment
  
//   // Form data
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     identity_number: '',
//     start_date: '',
//     end_date: '',
//     duration: 1,
//     notes: ''
//   })

//   const equipmentId = searchParams.get('equipment_id')

//   // ✅ CLEANUP localStorage saat keluar dari BookingForm - RESET ke initial
//   useEffect(() => {
//     return () => {
//       console.log('🧹 Leaving BookingForm - resetting to initial equipment only')
//       localStorage.removeItem('bookingItems')
      
//       // ✅ RESET to initial equipment for next visit
//       if (initialEquipment) {
//         const resetBookingItems = [{
//           equipment: initialEquipment,
//           quantity: 1
//         }]
//         localStorage.setItem('bookingItems', JSON.stringify(resetBookingItems))
//         console.log('🔄 Reset to initial equipment:', initialEquipment.name)
//       }
//     }
//   }, [initialEquipment])

//   // ✅ MAIN EFFECT: Load booking items
//   useEffect(() => {
//     console.log('🔍 BookingForm mounted - loading booking items...')
//     loadBookingItems()
//   }, [])

//   // ✅ LISTEN for localStorage changes dari TambahEquipment
//   useEffect(() => {
//     const handleStorageChange = () => {
//       console.log('📦 localStorage updated from TambahEquipment')
//       const savedItems = JSON.parse(localStorage.getItem('bookingItems') || '[]')
//       if (savedItems.length > 0) {
//         setBookingItems(savedItems)
//       }
//     }

//     window.addEventListener('bookingItemsUpdated', handleStorageChange)
    
//     return () => {
//       window.removeEventListener('bookingItemsUpdated', handleStorageChange)
//     }
//   }, [])

//   const loadBookingItems = () => {
//     try {
//       setLoading(true)
      
//       // ✅ PRIORITY 1: URL parameter (fresh booking dari "Lihat Detail")
//       if (equipmentId) {
//         console.log('📦 Loading initial equipment from URL:', equipmentId)
//         fetchEquipmentDetail(parseInt(equipmentId))
//         return
//       }
      
//       // ✅ PRIORITY 2: localStorage (dari TambahEquipment return)
//       const savedBookingItems = JSON.parse(localStorage.getItem('bookingItems') || '[]')
//       if (savedBookingItems.length > 0) {
//         console.log('✅ Found saved booking session:', savedBookingItems.length, 'items')
//         setBookingItems(savedBookingItems)
//         setLoading(false)
//         return
//       }
      
//       // ✅ PRIORITY 3: No data
//       console.log('⚠️ No booking data - empty state')
//       setLoading(false)
      
//     } catch (error) {
//       console.error('❌ Error loading booking items:', error)
//       setLoading(false)
//     }
//   }

//   const fetchEquipmentDetail = async (id: number) => {
//     try {
//       console.log('🔍 Fetching initial equipment from API:', id)
      
//       const response = await fetch(
//         `http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php?id=${id}`
//       )
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const text = await response.text()
//       const data = JSON.parse(text)
      
//       if (data.equipment_id) {
//         // ✅ STORE initial equipment untuk reset nanti
//         setInitialEquipment(data)
        
//         const initialBookingItems = [{
//           equipment: data,
//           quantity: 1
//         }]
        
//         setBookingItems(initialBookingItems)
//         localStorage.setItem('bookingItems', JSON.stringify(initialBookingItems))
//         console.log('✅ Initial equipment loaded and stored:', data.name)
//       } else {
//         throw new Error('Equipment tidak ditemukan')
//       }
      
//     } catch (err) {
//       console.error('❌ Error loading initial equipment:', err)
      
//       // Fallback equipment
//       const fallbackEquipment: Equipment = {
//         equipment_id: id,
//         name: `Equipment ${id} (Demo)`,
//         code: `DEMO-${id}`,
//         description: "Equipment demo untuk testing booking",
//         category: "demo",
//         size_capacity: "Demo",
//         dimensions: "Demo",
//         weight: 1,
//         material: "Demo",
//         stock_quantity: 10,
//         available_stock: 10,
//         reserved_stock: 0,
//         rented_stock: 0,
//         price_per_day: 25000,
//         condition: "baik",
//         equipment_type: "single",
//         image_url: null,
//         created_at: new Date().toISOString()
//       }
      
//       setInitialEquipment(fallbackEquipment)
      
//       const fallbackBookingItems = [{
//         equipment: fallbackEquipment,
//         quantity: 1
//       }]
      
//       setBookingItems(fallbackBookingItems)
//       localStorage.setItem('bookingItems', JSON.stringify(fallbackBookingItems))
//       console.log('✅ Fallback equipment loaded')
      
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ✅ UPDATE QUANTITY
//   const updateQuantity = (index: number, newQuantity: number) => {
//     if (newQuantity < 1) return
    
//     const updatedItems = bookingItems.map((item, i) => 
//       i === index 
//         ? { ...item, quantity: Math.min(newQuantity, item.equipment.stock_quantity) } 
//         : item
//     )
    
//     setBookingItems(updatedItems)
//     localStorage.setItem('bookingItems', JSON.stringify(updatedItems))
//   }

//   // ✅ REMOVE ITEM
//   const removeItem = (index: number) => {
//     const itemToRemove = bookingItems[index]
//     if (confirm(`❌ Hapus ${itemToRemove.equipment.name} dari booking?`)) {
//       const updatedItems = bookingItems.filter((_, i) => i !== index)
//       setBookingItems(updatedItems)
      
//       if (updatedItems.length === 0) {
//         localStorage.removeItem('bookingItems')
//       } else {
//         localStorage.setItem('bookingItems', JSON.stringify(updatedItems))
//       }
//     }
//   }

//   // ✅ CLEAR ALL BOOKING
//   const clearAllBooking = () => {
//     if (confirm('❌ Hapus semua equipment dari booking?')) {
//       setBookingItems([])
//       localStorage.removeItem('bookingItems')
//       alert('✅ Semua equipment dihapus dari booking')
//     }
//   }

//   // ✅ HANDLE BROWSE LAGI - Reset ke initial equipment
//   const handleBrowseAgain = () => {
//     console.log('🔄 User clicking Browse Lagi - will reset to initial equipment')
//     // localStorage akan di-reset di cleanup effect
//     navigate('/browse')
//   }

//   // ✅ HANDLE TAMBAH EQUIPMENT - Tidak langsung kembali
//   const handleTambahEquipment = () => {
//     console.log('➕ Going to TambahEquipment - user can add more items')
//     // Pass current booking untuk context
//     localStorage.setItem('bookingItems', JSON.stringify(bookingItems))
//     navigate('/tambah-equipment')
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))

//     // Auto calculate duration when dates change
//     if (name === 'start_date' || name === 'end_date') {
//       const start = name === 'start_date' ? new Date(value) : new Date(formData.start_date)
//       const end = name === 'end_date' ? new Date(value) : new Date(formData.end_date)
      
//       if (start && end && end > start) {
//         const diffTime = Math.abs(end.getTime() - start.getTime())
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//         setFormData(prev => ({ ...prev, duration: diffDays }))
//       }
//     }
//   }

//   // ✅ CALCULATE TOTAL COST
//   const calculateTotalCost = () => {
//     return bookingItems.reduce((total, item) => {
//       return total + (item.equipment.price_per_day * item.quantity * formData.duration)
//     }, 0)
//   }

//   const generateWhatsAppMessage = () => {
//     if (bookingItems.length === 0) return ''

//     const totalCost = calculateTotalCost()

//     const itemsList = bookingItems.map(item => 
//       `• ${item.equipment.name} (${item.equipment.code}) - ${item.quantity}x - Rp ${(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}/hari`
//     ).join('\n')

//     const message = `
// ⛰️ *BOOKING KELANA OUTDOOR*

// 👤 *DATA PENYEWA:*
// • Nama: ${formData.name}
// • HP: ${formData.phone}
// • Email: ${formData.email}
// • No. KTP: ${formData.identity_number}

// 🛍️ *PERALATAN:*
// ${itemsList}

// 🗓️ *PERIODE SEWA:*
// • Mulai: ${formData.start_date}
// • Selesai: ${formData.end_date} 
// • Durasi: ${formData.duration} hari

// 💰 *ESTIMASI BIAYA TOTAL:*
// Rp ${totalCost.toLocaleString('id-ID')}

// 📒 *CATATAN:*
// ${formData.notes || 'Tidak ada catatan khusus'}

// ---
// Mohon konfirmasi ketersediaan dan detail pembayaran. Terima kasih! 🙏
//     `.trim()

//     return encodeURIComponent(message)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // Validation
//     if (!formData.name || !formData.phone || !formData.start_date || !formData.end_date) {
//       alert('❌ Mohon lengkapi semua data yang diperlukan')
//       return
//     }

//     if (bookingItems.length === 0) {
//       alert('❌ Pilih minimal satu peralatan untuk disewa')
//       return
//     }

//     if (new Date(formData.end_date) <= new Date(formData.start_date)) {
//       alert('❌ Tanggal selesai harus setelah tanggal mulai')
//       return
//     }

//     // Generate WhatsApp link
//     const message = generateWhatsAppMessage()
//     const whatsappNumber = '6281344492934'
//     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

//     // Open WhatsApp
//     window.open(whatsappUrl, '_blank')
    
//     // ✅ CLEAR booking setelah submit
//     setBookingItems([])
//     localStorage.removeItem('bookingItems')
//     alert('✅ Booking berhasil dikirim via WhatsApp!')
//   }

//   // ✅ LOADING STATE
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Memuat booking...</p>
//         </div>
//       </div>
//     )
//   }

//   // ✅ NO EQUIPMENT STATE
//   if (bookingItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-600 text-xl mb-2">Keranjang Booking Kosong</p>
//           <p className="text-gray-500 mb-6">Pilih equipment yang ingin Anda sewa</p>
//           <div className="space-y-3">
//             <Button 
//               onClick={handleBrowseAgain}
//               className="bg-green-600 hover:bg-green-700"
//             >
//               <Package className="h-4 w-4 mr-2" />
//               Browse Equipment
//             </Button>
//             <br />
//             <Button 
//               onClick={handleTambahEquipment}
//               variant="outline"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Tambah Equipment
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-4">
//             <Button 
//               onClick={handleBrowseAgain}
//               variant="ghost"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Browse Lagi
//             </Button>
            
//             {/* ✅ Status dengan initial equipment info */}
//             <div className="hidden md:block">
//               <p className="text-sm text-gray-600">
//                 🛒 <span className="font-medium">{bookingItems.length} equipment</span> dalam booking
//                 {initialEquipment && (
//                   <span className="text-xs text-gray-500 ml-2">
//                     (Started with: {initialEquipment.name})
//                   </span>
//                 )}
//               </p>
//             </div>
//           </div>
          
//           {/* Clear All Button */}
//           <Button 
//             variant="outline" 
//             onClick={clearAllBooking}
//             className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-500"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Kosongkan Booking
//           </Button>
//         </div>

//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Equipment Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <CheckCircle className="h-5 w-5 text-green-600" />
//                   Peralatan yang Dipilih ({bookingItems.length})
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Display all equipment */}
//                 {bookingItems.map((item, index) => (
//                   <div key={`${item.equipment.equipment_id}-${index}`} className="border rounded-lg p-4 space-y-3 bg-white">
//                     {/* ✅ Mark initial equipment */}
//                     {initialEquipment && item.equipment.equipment_id === initialEquipment.equipment_id && (
//                       <div className="bg-blue-50 px-2 py-1 rounded text-xs text-blue-700 mb-2">
//                         📌 Initial Equipment (dari detail)
//                       </div>
//                     )}
                    
//                     {/* Equipment Display */}
//                     <div className="flex gap-3">
//                       <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <span className="text-white text-lg font-bold">
//                           {item.equipment.name.charAt(0)}
//                         </span>
//                       </div>
                      
//                       <div className="flex-1">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h4 className="font-semibold">{item.equipment.name}</h4>
//                             <div className="flex items-center gap-2 mt-1">
//                               <Badge variant="secondary" className="text-xs">
//                                 {item.equipment.category.toUpperCase()}
//                               </Badge>
//                               <span className="text-xs text-gray-500">{item.equipment.code}</span>
//                             </div>
//                             <p className="text-lg font-bold text-green-600 mt-1">
//                               Rp {item.equipment.price_per_day.toLocaleString('id-ID')}/hari
//                             </p>
//                           </div>
                          
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => removeItem(index)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Quantity Controls */}
//                     <div className="flex items-center gap-3">
//                       <span className="text-sm font-medium">Jumlah:</span>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => updateQuantity(index, item.quantity - 1)}
//                           disabled={item.quantity <= 1}
//                         >
//                           <Minus className="h-3 w-3" />
//                         </Button>
                        
//                         <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => updateQuantity(index, item.quantity + 1)}
//                           disabled={item.quantity >= item.equipment.stock_quantity}
//                         >
//                           <Plus className="h-3 w-3" />
//                         </Button>
//                       </div>
                      
//                       <span className="text-xs text-gray-500">
//                         (Stok: {item.equipment.stock_quantity})
//                       </span>
//                     </div>

//                     {/* Subtotal */}
//                     {formData.duration > 0 && (
//                       <div className="bg-gray-50 p-3 rounded text-sm">
//                         <p className="font-medium">
//                           Subtotal: Rp {(item.equipment.price_per_day * item.quantity * formData.duration).toLocaleString('id-ID')}
//                         </p>
//                         <p className="text-gray-600">
//                           {item.quantity}x untuk {formData.duration} hari
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 {/* Total Cost */}
//                 {formData.duration > 0 && (
//                   <div className="bg-green-50 p-4 rounded-lg border-t-2 border-green-600">
//                     <p className="font-bold text-green-800 text-lg">Total Estimasi:</p>
//                     <p className="text-3xl font-bold text-green-600">
//                       Rp {calculateTotalCost().toLocaleString('id-ID')}
//                     </p>
//                     <p className="text-sm text-green-600">untuk {formData.duration} hari</p>
//                   </div>
//                 )}

//                 {/* Tambah Equipment Button */}
//                 <Button 
//                   onClick={handleTambahEquipment}
//                   variant="outline" 
//                   className="w-full"
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   Tambah Equipment Lain
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Form Booking - sama seperti sebelumnya */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Form Booking</CardTitle>
//                 <p className="text-sm text-gray-600">
//                   Isi data di bawah untuk melanjutkan ke WhatsApp
//                 </p>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   {/* Personal Data */}
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="name">Nama Lengkap *</Label>
//                       <Input
//                         id="name"
//                         name="name"
//                         type="text"
//                         required
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Nama sesuai KTP"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="phone">Nomor WhatsApp *</Label>
//                       <Input
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         required
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         placeholder="08xxxxxxxxxx"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="email@contoh.com"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="identity_number">Nomor KTP</Label>
//                       <Input
//                         id="identity_number"
//                         name="identity_number"
//                         type="text"
//                         value={formData.identity_number}
//                         onChange={handleInputChange}
//                         placeholder="3201xxxxxxxxxxxxxx"
//                       />
//                     </div>
//                   </div>

//                   {/* Rental Period */}
//                   <div className="space-y-4 pt-4 border-t">
//                     <h4 className="font-medium flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       Periode Sewa
//                     </h4>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="start_date">Tanggal Mulai *</Label>
//                         <Input
//                           id="start_date"
//                           name="start_date"
//                           type="date"
//                           required
//                           value={formData.start_date}
//                           onChange={handleInputChange}
//                           min={new Date().toISOString().split('T')[0]}
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="end_date">Tanggal Selesai *</Label>
//                         <Input
//                           id="end_date"
//                           name="end_date"
//                           type="date"
//                           required
//                           value={formData.end_date}
//                           onChange={handleInputChange}
//                           min={formData.start_date || new Date().toISOString().split('T')[0]}
//                         />
//                       </div>
//                     </div>

//                     {formData.duration > 0 && (
//                       <p className="text-sm text-gray-600">
//                         Durasi: <span className="font-medium">{formData.duration} hari</span>
//                       </p>
//                     )}
//                   </div>

//                   {/* Notes */}
//                   <div>
//                     <Label htmlFor="notes">Catatan Tambahan</Label>
//                     <Textarea
//                       id="notes"
//                       name="notes"
//                       rows={3}
//                       value={formData.notes}
//                       onChange={handleInputChange}
//                       placeholder="Catatan khusus untuk penyewaan ini..."
//                     />
//                   </div>
                  
//                   <div className="bg-blue-50 p-3 rounded-lg">
//                     <p className="text-xs text-blue-700">
//                       📋 <strong>Catatan Penting:</strong> Ketika datang ke Kelana Outdoor, jangan lupa membawa kartu identitas (KTP) sebagai syarat dan kebijakan booking.
//                     </p>
//                   </div>

//                   {/* Submit Button */}
//                   <Button
//                     type="submit"
//                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
//                   >
//                     <MessageCircle className="h-5 w-5 mr-2" />
//                     🚀 Booking via WhatsApp
//                   </Button>

//                   <p className="text-xs text-gray-500 text-center">
//                     Dengan melanjutkan, Anda akan diarahkan ke WhatsApp untuk konfirmasi booking
//                   </p>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookingForm


// import { useState, useEffect } from 'react'
// import { useSearchParams, Link, useNavigate } from 'react-router-dom'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
// import { Badge } from '@/components/ui/badge'
// import { ArrowLeft, MessageCircle, Calendar, Plus, Minus, Trash2, CheckCircle, ShoppingCart, Package } from 'lucide-react'

// interface Equipment {
//   equipment_id: number;
//   name: string;
//   code: string;
//   description?: string;
//   category: string;
//   size_capacity?: string;
//   dimensions?: string;
//   weight?: number;
//   material?: string;
//   stock_quantity: number;
//   available_stock: number;
//   reserved_stock: number;
//   rented_stock: number;
//   price_per_day: number;
//   condition: string;
//   equipment_type?: string;
//   image_url?: string;
//   created_at: string;
// }

// interface BookingItem {
//   equipment: Equipment
//   quantity: number
// }

// const BookingForm = () => {
//   const [searchParams] = useSearchParams()
//   const navigate = useNavigate()
  
//   const [bookingItems, setBookingItems] = useState<BookingItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [initialEquipment, setInitialEquipment] = useState<Equipment | null>(null) // ✅ Store initial equipment
  
//   // Form data
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     identity_number: '',
//     start_date: '',
//     end_date: '',
//     duration: 1,
//     notes: ''
//   })

//   const equipmentId = searchParams.get('equipment_id')

//   // ✅ CLEANUP localStorage saat keluar dari BookingForm - RESET ke initial
//   useEffect(() => {
//     return () => {
//       console.log('🧹 Leaving BookingForm - resetting to initial equipment only')
//       localStorage.removeItem('bookingItems')
      
//       // ✅ RESET to initial equipment for next visit
//       if (initialEquipment) {
//         const resetBookingItems = [{
//           equipment: initialEquipment,
//           quantity: 1
//         }]
//         localStorage.setItem('bookingItems', JSON.stringify(resetBookingItems))
//         console.log('🔄 Reset to initial equipment:', initialEquipment.name)
//       }
//     }
//   }, [initialEquipment])

//   // ✅ MAIN EFFECT: Load booking items
//   useEffect(() => {
//     console.log('🔍 BookingForm mounted - loading booking items...')
//     loadBookingItems()
//   }, [])

//   // ✅ LISTEN for localStorage changes dari TambahEquipment
//   useEffect(() => {
//     const handleStorageChange = () => {
//       console.log('📦 localStorage updated from TambahEquipment')
//       const savedItems = JSON.parse(localStorage.getItem('bookingItems') || '[]')
//       if (savedItems.length > 0) {
//         setBookingItems(savedItems)
//       }
//     }

//     window.addEventListener('bookingItemsUpdated', handleStorageChange)
    
//     return () => {
//       window.removeEventListener('bookingItemsUpdated', handleStorageChange)
//     }
//   }, [])

//   const loadBookingItems = () => {
//     try {
//       setLoading(true)
      
//       // ✅ PRIORITY 1: URL parameter (fresh booking dari "Lihat Detail")
//       if (equipmentId) {
//         console.log('📦 Loading initial equipment from URL:', equipmentId)
//         fetchEquipmentDetail(parseInt(equipmentId))
//         return
//       }
      
//       // ✅ PRIORITY 2: localStorage (dari TambahEquipment return)
//       const savedBookingItems = JSON.parse(localStorage.getItem('bookingItems') || '[]')
//       if (savedBookingItems.length > 0) {
//         console.log('✅ Found saved booking session:', savedBookingItems.length, 'items')
//         setBookingItems(savedBookingItems)
//         setLoading(false)
//         return
//       }
      
//       // ✅ PRIORITY 3: No data
//       console.log('⚠️ No booking data - empty state')
//       setLoading(false)
      
//     } catch (error) {
//       console.error('❌ Error loading booking items:', error)
//       setLoading(false)
//     }
//   }

//   const fetchEquipmentDetail = async (id: number) => {
//     try {
//       console.log('🔍 Fetching initial equipment from API:', id)
      
//       const response = await fetch(
//         `http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php?id=${id}`
//       )
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const text = await response.text()
//       const data = JSON.parse(text)
      
//       if (data.equipment_id) {
//         // ✅ STORE initial equipment untuk reset nanti
//         setInitialEquipment(data)
        
//         const initialBookingItems = [{
//           equipment: data,
//           quantity: 1
//         }]
        
//         setBookingItems(initialBookingItems)
//         localStorage.setItem('bookingItems', JSON.stringify(initialBookingItems))
//         console.log('✅ Initial equipment loaded and stored:', data.name)
//       } else {
//         throw new Error('Equipment tidak ditemukan')
//       }
      
//     } catch (err) {
//       console.error('❌ Error loading initial equipment:', err)
      
//       // Fallback equipment
//       const fallbackEquipment: Equipment = {
//         equipment_id: id,
//         name: `Equipment ${id} (Demo)`,
//         code: `DEMO-${id}`,
//         description: "Equipment demo untuk testing booking",
//         category: "demo",
//         size_capacity: "Demo",
//         dimensions: "Demo",
//         weight: 1,
//         material: "Demo",
//         stock_quantity: 10,
//         available_stock: 10,
//         reserved_stock: 0,
//         rented_stock: 0,
//         price_per_day: 25000,
//         condition: "baik",
//         equipment_type: "single",
//         image_url: null,
//         created_at: new Date().toISOString()
//       }
      
//       setInitialEquipment(fallbackEquipment)
      
//       const fallbackBookingItems = [{
//         equipment: fallbackEquipment,
//         quantity: 1
//       }]
      
//       setBookingItems(fallbackBookingItems)
//       localStorage.setItem('bookingItems', JSON.stringify(fallbackBookingItems))
//       console.log('✅ Fallback equipment loaded')
      
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ✅ UPDATE QUANTITY
//   const updateQuantity = (index: number, newQuantity: number) => {
//     if (newQuantity < 1) return
    
//     const updatedItems = bookingItems.map((item, i) => 
//       i === index 
//         ? { ...item, quantity: Math.min(newQuantity, item.equipment.stock_quantity) } 
//         : item
//     )
    
//     setBookingItems(updatedItems)
//     localStorage.setItem('bookingItems', JSON.stringify(updatedItems))
//   }

//   // ✅ REMOVE ITEM
//   const removeItem = (index: number) => {
//     const itemToRemove = bookingItems[index]
//     if (confirm(`❌ Hapus ${itemToRemove.equipment.name} dari booking?`)) {
//       const updatedItems = bookingItems.filter((_, i) => i !== index)
//       setBookingItems(updatedItems)
      
//       if (updatedItems.length === 0) {
//         localStorage.removeItem('bookingItems')
//       } else {
//         localStorage.setItem('bookingItems', JSON.stringify(updatedItems))
//       }
//     }
//   }

//   // ✅ CLEAR ALL BOOKING
//   const clearAllBooking = () => {
//     if (confirm('❌ Hapus semua equipment dari booking?')) {
//       setBookingItems([])
//       localStorage.removeItem('bookingItems')
//       alert('✅ Semua equipment dihapus dari booking')
//     }
//   }

//   // ✅ HANDLE BROWSE LAGI - Reset ke initial equipment
//   const handleBrowseAgain = () => {
//     console.log('🔄 User clicking Browse Lagi - will reset to initial equipment')
//     // localStorage akan di-reset di cleanup effect
//     navigate('/browse')
//   }

//   // ✅ HANDLE TAMBAH EQUIPMENT - Tidak langsung kembali
//   const handleTambahEquipment = () => {
//     console.log('➕ Going to TambahEquipment - user can add more items')
//     // Pass current booking untuk context
//     localStorage.setItem('bookingItems', JSON.stringify(bookingItems))
//     navigate('/tambah-equipment')
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))

//     // Auto calculate duration when dates change
//     if (name === 'start_date' || name === 'end_date') {
//       const start = name === 'start_date' ? new Date(value) : new Date(formData.start_date)
//       const end = name === 'end_date' ? new Date(value) : new Date(formData.end_date)
      
//       if (start && end && end > start) {
//         const diffTime = Math.abs(end.getTime() - start.getTime())
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//         setFormData(prev => ({ ...prev, duration: diffDays }))
//       }
//     }
//   }

//   // ✅ CALCULATE TOTAL COST
//   const calculateTotalCost = () => {
//     return bookingItems.reduce((total, item) => {
//       return total + (item.equipment.price_per_day * item.quantity * formData.duration)
//     }, 0)
//   }

//   const generateWhatsAppMessage = () => {
//     if (bookingItems.length === 0) return ''

//     const totalCost = calculateTotalCost()

//     const itemsList = bookingItems.map(item => 
//       `• ${item.equipment.name} (${item.equipment.code}) - ${item.quantity}x - Rp ${(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}/hari`
//     ).join('\n')

//     const message = `
// ⛰️ *BOOKING KELANA OUTDOOR*

// 👤 *DATA PENYEWA:*
// • Nama: ${formData.name}
// • HP: ${formData.phone}
// • Email: ${formData.email}
// • No. KTP: ${formData.identity_number}

// 🛍️ *PERALATAN:*
// ${itemsList}

// 🗓️ *PERIODE SEWA:*
// • Mulai: ${formData.start_date}
// • Selesai: ${formData.end_date} 
// • Durasi: ${formData.duration} hari

// 💰 *ESTIMASI BIAYA TOTAL:*
// Rp ${totalCost.toLocaleString('id-ID')}

// 📒 *CATATAN:*
// ${formData.notes || 'Tidak ada catatan khusus'}

// ---
// Mohon konfirmasi ketersediaan dan detail pembayaran. Terima kasih! 🙏
//     `.trim()

//     return encodeURIComponent(message)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // Validation
//     if (!formData.name || !formData.phone || !formData.start_date || !formData.end_date) {
//       alert('❌ Mohon lengkapi semua data yang diperlukan')
//       return
//     }

//     if (bookingItems.length === 0) {
//       alert('❌ Pilih minimal satu peralatan untuk disewa')
//       return
//     }

//     if (new Date(formData.end_date) <= new Date(formData.start_date)) {
//       alert('❌ Tanggal selesai harus setelah tanggal mulai')
//       return
//     }

//     // Generate WhatsApp link
//     const message = generateWhatsAppMessage()
//     const whatsappNumber = '6281344492934'
//     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

//     // Open WhatsApp
//     window.open(whatsappUrl, '_blank')
    
//     // ✅ CLEAR booking setelah submit
//     setBookingItems([])
//     localStorage.removeItem('bookingItems')
//     alert('✅ Booking berhasil dikirim via WhatsApp!')
//   }

//   // ✅ LOADING STATE
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Memuat booking...</p>
//         </div>
//       </div>
//     )
//   }

//   // ✅ NO EQUIPMENT STATE
//   if (bookingItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-600 text-xl mb-2">Keranjang Booking Kosong</p>
//           <p className="text-gray-500 mb-6">Pilih equipment yang ingin Anda sewa</p>
//           <div className="space-y-3">
//             <Button 
//               onClick={handleBrowseAgain}
//               className="bg-green-600 hover:bg-green-700"
//             >
//               <Package className="h-4 w-4 mr-2" />
//               Browse Equipment
//             </Button>
//             <br />
//             <Button 
//               onClick={handleTambahEquipment}
//               variant="outline"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Tambah Equipment
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-4">
//             <Button 
//               onClick={handleBrowseAgain}
//               variant="ghost"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Browse Lagi
//             </Button>
            
//             {/* ✅ Status dengan initial equipment info */}
//             <div className="hidden md:block">
//               <p className="text-sm text-gray-600">
//                 🛒 <span className="font-medium">{bookingItems.length} equipment</span> dalam booking
//                 {initialEquipment && (
//                   <span className="text-xs text-gray-500 ml-2">
//                     (Started with: {initialEquipment.name})
//                   </span>
//                 )}
//               </p>
//             </div>
//           </div>
          
//           {/* Clear All Button */}
//           <Button 
//             variant="outline" 
//             onClick={clearAllBooking}
//             className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-500"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Kosongkan Booking
//           </Button>
//         </div>

//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Equipment Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <CheckCircle className="h-5 w-5 text-green-600" />
//                   Peralatan yang Dipilih ({bookingItems.length})
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Display all equipment */}
//                 {bookingItems.map((item, index) => (
//                   <div key={`${item.equipment.equipment_id}-${index}`} className="border rounded-lg p-4 space-y-3 bg-white">
//                     {/* ✅ Mark initial equipment */}
//                     {initialEquipment && item.equipment.equipment_id === initialEquipment.equipment_id && (
//                       <div className="bg-blue-50 px-2 py-1 rounded text-xs text-blue-700 mb-2">
//                         📌 Initial Equipment (dari detail)
//                       </div>
//                     )}
                    
//                     {/* ✅ EQUIPMENT DISPLAY DENGAN GAMBAR - PERBAIKAN DISINI */}
//                     <div className="flex gap-3">
//                       {/* ✅ IMAGE PREVIEW SECTION */}
//                       <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                         {item.equipment.image_url ? (
//                           <img 
//                            src={`http://localhost${item.equipment.image_url}`}
//                             alt={item.equipment.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               console.log('❌ Image failed to load:', item.equipment.image_url)
//                               // Hide img and show fallback
//                               const imgElement = e.target as HTMLImageElement
//                               imgElement.style.display = 'none'
//                               const parentDiv = imgElement.parentElement
//                               if (parentDiv) {
//                                 const fallbackDiv = parentDiv.querySelector('.fallback-gradient') as HTMLElement
//                                 if (fallbackDiv) {
//                                   fallbackDiv.style.display = 'flex'
//                                 }
//                               }
//                             }}
//                           />
//                         ) : null}
//                         {/* ✅ FALLBACK GRADIENT */}
//                         <div className={`fallback-gradient w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center ${item.equipment.image_url ? 'hidden' : 'flex'}`}>
//                           <span className="text-white text-lg font-bold">
//                             {item.equipment.name.charAt(0)}
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div className="flex-1">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h4 className="font-semibold">{item.equipment.name}</h4>
//                             <div className="flex items-center gap-2 mt-1">
//                               <Badge variant="secondary" className="text-xs">
//                                 {item.equipment.category.toUpperCase()}
//                               </Badge>
//                               <span className="text-xs text-gray-500">{item.equipment.code}</span>
//                             </div>
//                             <p className="text-lg font-bold text-green-600 mt-1">
//                               Rp {item.equipment.price_per_day.toLocaleString('id-ID')}/hari
//                             </p>
//                           </div>
                          
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => removeItem(index)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Quantity Controls */}
//                     <div className="flex items-center gap-3">
//                       <span className="text-sm font-medium">Jumlah:</span>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => updateQuantity(index, item.quantity - 1)}
//                           disabled={item.quantity <= 1}
//                         >
//                           <Minus className="h-3 w-3" />
//                         </Button>
                        
//                         <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => updateQuantity(index, item.quantity + 1)}
//                           disabled={item.quantity >= item.equipment.stock_quantity}
//                         >
//                           <Plus className="h-3 w-3" />
//                         </Button>
//                       </div>
                      
//                       <span className="text-xs text-gray-500">
//                         (Stok: {item.equipment.stock_quantity})
//                       </span>
//                     </div>

//                     {/* Subtotal */}
//                     {formData.duration > 0 && (
//                       <div className="bg-gray-50 p-3 rounded text-sm">
//                         <p className="font-medium">
//                           Subtotal: Rp {(item.equipment.price_per_day * item.quantity * formData.duration).toLocaleString('id-ID')}
//                         </p>
//                         <p className="text-gray-600">
//                           {item.quantity}x untuk {formData.duration} hari
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 {/* Total Cost */}
//                 {formData.duration > 0 && (
//                   <div className="bg-green-50 p-4 rounded-lg border-t-2 border-green-600">
//                     <p className="font-bold text-green-800 text-lg">Total Estimasi:</p>
//                     <p className="text-3xl font-bold text-green-600">
//                       Rp {calculateTotalCost().toLocaleString('id-ID')}
//                     </p>
//                     <p className="text-sm text-green-600">untuk {formData.duration} hari</p>
//                   </div>
//                 )}

//                 {/* Tambah Equipment Button */}
//                 <Button 
//                   onClick={handleTambahEquipment}
//                   variant="outline" 
//                   className="w-full"
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   Tambah Equipment Lain
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Form Booking - sama seperti sebelumnya */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Form Booking</CardTitle>
//                 <p className="text-sm text-gray-600">
//                   Isi data di bawah untuk melanjutkan ke WhatsApp
//                 </p>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   {/* Personal Data */}
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="name">Nama Lengkap *</Label>
//                       <Input
//                         id="name"
//                         name="name"
//                         type="text"
//                         required
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Nama sesuai KTP"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="phone">Nomor WhatsApp *</Label>
//                       <Input
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         required
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         placeholder="08xxxxxxxxxx"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="email@contoh.com"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="identity_number">Nomor KTP</Label>
//                       <Input
//                         id="identity_number"
//                         name="identity_number"
//                         type="text"
//                         value={formData.identity_number}
//                         onChange={handleInputChange}
//                         placeholder="3201xxxxxxxxxxxxxx"
//                       />
//                     </div>
//                   </div>

//                   {/* Rental Period */}
//                   <div className="space-y-4 pt-4 border-t">
//                     <h4 className="font-medium flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       Periode Sewa
//                     </h4>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="start_date">Tanggal Mulai *</Label>
//                         <Input
//                           id="start_date"
//                           name="start_date"
//                           type="date"
//                           required
//                           value={formData.start_date}
//                           onChange={handleInputChange}
//                           min={new Date().toISOString().split('T')[0]}
//                         />
//                       </div>

//                       <div>
//                         <Label htmlFor="end_date">Tanggal Selesai *</Label>
//                         <Input
//                           id="end_date"
//                           name="end_date"
//                           type="date"
//                           required
//                           value={formData.end_date}
//                           onChange={handleInputChange}
//                           min={formData.start_date || new Date().toISOString().split('T')[0]}
//                         />
//                       </div>
//                     </div>

//                     {formData.duration > 0 && (
//                       <p className="text-sm text-gray-600">
//                         Durasi: <span className="font-medium">{formData.duration} hari</span>
//                       </p>
//                     )}
//                   </div>

//                   {/* Notes */}
//                   <div>
//                     <Label htmlFor="notes">Catatan Tambahan</Label>
//                     <Textarea
//                       id="notes"
//                       name="notes"
//                       rows={3}
//                       value={formData.notes}
//                       onChange={handleInputChange}
//                       placeholder="Catatan khusus untuk penyewaan ini..."
//                     />
//                   </div>
                  
//                   <div className="bg-blue-50 p-3 rounded-lg">
//                     <p className="text-xs text-blue-700">
//                       📋 <strong>Catatan Penting:</strong> Ketika datang ke Kelana Outdoor, jangan lupa membawa kartu identitas (KTP) sebagai syarat dan kebijakan booking.
//                     </p>
//                   </div>

//                   {/* Submit Button */}
//                   <Button
//                     type="submit"
//                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
//                   >
//                     <MessageCircle className="h-5 w-5 mr-2" />
//                     🚀 Booking via WhatsApp
//                   </Button>

//                   <p className="text-xs text-gray-500 text-center">
//                     Dengan melanjutkan, Anda akan diarahkan ke WhatsApp untuk konfirmasi booking
//                   </p>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookingForm



import { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MessageCircle, Calendar, Plus, Minus, Trash2, CheckCircle, ShoppingCart, Package, Image as ImageIcon } from 'lucide-react'

interface Equipment {
  equipment_id: number;
  name: string;
  code: string;
  description?: string;
  category: string;
  size_capacity?: string;
  dimensions?: string;
  weight?: number;
  material?: string;
  stock_quantity: number;
  available_stock: number;
  reserved_stock: number;
  rented_stock: number;
  price_per_day: number;
  condition: string;
  equipment_type?: string;
  image_url?: string;
  created_at: string;
}

interface BookingItem {
  equipment: Equipment
  quantity: number
}

const BookingForm = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [bookingItems, setBookingItems] = useState<BookingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [initialEquipment, setInitialEquipment] = useState<Equipment | null>(null)
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    identity_number: '',
    start_date: '',
    end_date: '',
    duration: 1,
    notes: ''
  })

  const equipmentId = searchParams.get('equipment_id')

  // ✅ TAMBAHKAN FUNCTION UNTUK BUILD IMAGE URL
  const buildImageUrl = (item: Equipment) => {
    if (!item.image_url) return null;
    
    console.log('🖼️ Original image_url:', item.image_url);
    
    // Jika sudah full URL, return as is
    if (item.image_url.startsWith('http')) {
      return item.image_url;
    }
    
    // ✅ PERBAIKAN: Pastikan path yang benar
    if (item.image_url.startsWith('/uploads/')) {
      // Path sudah lengkap dari root, tambahkan base URL
      return `http://localhost/PBL-KELANA-OUTDOOR${item.image_url}`;
    }
    
    if (item.image_url.startsWith('uploads/')) {
      // Path tanpa slash di depan
      return `http://localhost/PBL-KELANA-OUTDOOR/${item.image_url}`;
    }
    
    // Jika hanya nama file saja
    return `http://localhost/PBL-KELANA-OUTDOOR/uploads/equipment/${item.image_url}`;
  };

  // ✅ TAMBAHKAN FUNCTION UNTUK HANDLE IMAGE ERROR
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, item: Equipment) => {
    const img = e.target as HTMLImageElement;
    
    console.log(`❌ Image load error for ${item.code}:`, item.image_url);
    console.log('❌ Failed URL:', img.src);
    
    // Hide failed image and show fallback
    img.style.display = 'none';
    const fallback = img.nextElementSibling as HTMLElement;
    if (fallback && fallback.classList.contains('image-fallback')) {
      fallback.style.display = 'flex';
    }
  };

  // ✅ TAMBAHKAN FUNCTION UNTUK HANDLE IMAGE LOAD SUCCESS
  const handleImageLoad = (item: Equipment) => {
    console.log(`✅ Image loaded successfully for ${item.code}`);
  };

  // ✅ CLEANUP localStorage saat keluar dari BookingForm - RESET ke initial
  useEffect(() => {
    return () => {
      console.log('🧹 Leaving BookingForm - resetting to initial equipment only')
      localStorage.removeItem('bookingItems')
      
      // ✅ RESET to initial equipment for next visit
      if (initialEquipment) {
        const resetBookingItems = [{
          equipment: initialEquipment,
          quantity: 1
        }]
        localStorage.setItem('bookingItems', JSON.stringify(resetBookingItems))
        console.log('🔄 Reset to initial equipment:', initialEquipment.name)
      }
    }
  }, [initialEquipment])

  // ✅ MAIN EFFECT: Load booking items
  useEffect(() => {
    console.log('🔍 BookingForm mounted - loading booking items...')
    loadBookingItems()
  }, [])

  // ✅ LISTEN for localStorage changes dari TambahEquipment
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('📦 localStorage updated from TambahEquipment')
      const savedItems = JSON.parse(localStorage.getItem('bookingItems') || '[]')
      if (savedItems.length > 0) {
        setBookingItems(savedItems)
      }
    }

    window.addEventListener('bookingItemsUpdated', handleStorageChange)
    
    return () => {
      window.removeEventListener('bookingItemsUpdated', handleStorageChange)
    }
  }, [])

  const loadBookingItems = () => {
    try {
      setLoading(true)
      
      // ✅ PRIORITY 1: URL parameter (fresh booking dari "Lihat Detail")
      if (equipmentId) {
        console.log('📦 Loading initial equipment from URL:', equipmentId)
        fetchEquipmentDetail(parseInt(equipmentId))
        return
      }
      
      // ✅ PRIORITY 2: localStorage (dari TambahEquipment return)
      const savedBookingItems = JSON.parse(localStorage.getItem('bookingItems') || '[]')
      if (savedBookingItems.length > 0) {
        console.log('✅ Found saved booking session:', savedBookingItems.length, 'items')
        setBookingItems(savedBookingItems)
        setLoading(false)
        return
      }
      
      // ✅ PRIORITY 3: No data
      console.log('⚠️ No booking data - empty state')
      setLoading(false)
      
    } catch (error) {
      console.error('❌ Error loading booking items:', error)
      setLoading(false)
    }
  }

  const fetchEquipmentDetail = async (id: number) => {
    try {
      console.log('🔍 Fetching initial equipment from API:', id)
      
      const response = await fetch(
        `http://localhost/PBL-KELANA-OUTDOOR/api/public/equipment.php?id=${id}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const text = await response.text()
      const data = JSON.parse(text)
      
      if (data.equipment_id) {
        // ✅ STORE initial equipment untuk reset nanti
        setInitialEquipment(data)
        
        const initialBookingItems = [{
          equipment: data,
          quantity: 1
        }]
        
        setBookingItems(initialBookingItems)
        localStorage.setItem('bookingItems', JSON.stringify(initialBookingItems))
        console.log('✅ Initial equipment loaded and stored:', data.name)
      } else {
        throw new Error('Equipment tidak ditemukan')
      }
      
    } catch (err) {
      console.error('❌ Error loading initial equipment:', err)
      
      // Fallback equipment
      const fallbackEquipment: Equipment = {
        equipment_id: id,
        name: `Equipment ${id} (Demo)`,
        code: `DEMO-${id}`,
        description: "Equipment demo untuk testing booking",
        category: "demo",
        size_capacity: "Demo",
        dimensions: "Demo",
        weight: 1,
        material: "Demo",
        stock_quantity: 10,
        available_stock: 10,
        reserved_stock: 0,
        rented_stock: 0,
        price_per_day: 25000,
        condition: "baik",
        equipment_type: "single",
        image_url: null,
        created_at: new Date().toISOString()
      }
      
      setInitialEquipment(fallbackEquipment)
      
      const fallbackBookingItems = [{
        equipment: fallbackEquipment,
        quantity: 1
      }]
      
      setBookingItems(fallbackBookingItems)
      localStorage.setItem('bookingItems', JSON.stringify(fallbackBookingItems))
      console.log('✅ Fallback equipment loaded')
      
    } finally {
      setLoading(false)
    }
  }

  // ✅ UPDATE QUANTITY
  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const updatedItems = bookingItems.map((item, i) => 
      i === index 
        ? { ...item, quantity: Math.min(newQuantity, item.equipment.stock_quantity) } 
        : item
    )
    
    setBookingItems(updatedItems)
    localStorage.setItem('bookingItems', JSON.stringify(updatedItems))
  }

  // ✅ REMOVE ITEM
  const removeItem = (index: number) => {
    const itemToRemove = bookingItems[index]
    if (confirm(`❌ Hapus ${itemToRemove.equipment.name} dari booking?`)) {
      const updatedItems = bookingItems.filter((_, i) => i !== index)
      setBookingItems(updatedItems)
      
      if (updatedItems.length === 0) {
        localStorage.removeItem('bookingItems')
      } else {
        localStorage.setItem('bookingItems', JSON.stringify(updatedItems))
      }
    }
  }

  // ✅ CLEAR ALL BOOKING
  const clearAllBooking = () => {
    if (confirm('❌ Hapus semua equipment dari booking?')) {
      setBookingItems([])
      localStorage.removeItem('bookingItems')
      alert('✅ Semua equipment dihapus dari booking')
    }
  }

  // ✅ HANDLE BROWSE LAGI - Reset ke initial equipment
  const handleBrowseAgain = () => {
    console.log('🔄 User clicking Browse Lagi - will reset to initial equipment')
    // localStorage akan di-reset di cleanup effect
    navigate('/browse')
  }

  // ✅ HANDLE TAMBAH EQUIPMENT - Tidak langsung kembali
  const handleTambahEquipment = () => {
    console.log('➕ Going to TambahEquipment - user can add more items')
    // Pass current booking untuk context
    localStorage.setItem('bookingItems', JSON.stringify(bookingItems))
    navigate('/tambah-equipment')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto calculate duration when dates change
    if (name === 'start_date' || name === 'end_date') {
      const start = name === 'start_date' ? new Date(value) : new Date(formData.start_date)
      const end = name === 'end_date' ? new Date(value) : new Date(formData.end_date)
      
      if (start && end && end > start) {
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        setFormData(prev => ({ ...prev, duration: diffDays }))
      }
    }
  }

  // ✅ CALCULATE TOTAL COST
  const calculateTotalCost = () => {
    return bookingItems.reduce((total, item) => {
      return total + (item.equipment.price_per_day * item.quantity * formData.duration)
    }, 0)
  }

  const generateWhatsAppMessage = () => {
    if (bookingItems.length === 0) return ''

    const totalCost = calculateTotalCost()

    const itemsList = bookingItems.map(item => 
      `• ${item.equipment.name} (${item.equipment.code}) - ${item.quantity}x - Rp ${(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}/hari`
    ).join('\n')

    const message = `
⛰️ *BOOKING KELANA OUTDOOR*

👤 *DATA PENYEWA:*
• Nama: ${formData.name}
• HP: ${formData.phone}
• Email: ${formData.email}
• No. KTP: ${formData.identity_number}

🛍️ *PERALATAN:*
${itemsList}

🗓️ *PERIODE SEWA:*
• Mulai: ${formData.start_date}
• Selesai: ${formData.end_date} 
• Durasi: ${formData.duration} hari

💰 *ESTIMASI BIAYA TOTAL:*
Rp ${totalCost.toLocaleString('id-ID')}

📒 *CATATAN:*
${formData.notes || 'Tidak ada catatan khusus'}

---
Mohon konfirmasi ketersediaan dan detail pembayaran. Terima kasih! 🙏
    `.trim()

    return encodeURIComponent(message)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.phone || !formData.start_date || !formData.end_date) {
      alert('❌ Mohon lengkapi semua data yang diperlukan')
      return
    }

    if (bookingItems.length === 0) {
      alert('❌ Pilih minimal satu peralatan untuk disewa')
      return
    }

    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      alert('❌ Tanggal selesai harus setelah tanggal mulai')
      return
    }

    // Generate WhatsApp link
    const message = generateWhatsAppMessage()
    const whatsappNumber = '6281344492934'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
    
    // ✅ CLEAR booking setelah submit
    setBookingItems([])
    localStorage.removeItem('bookingItems')
    alert('✅ Booking berhasil dikirim via WhatsApp!')
  }

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat booking...</p>
        </div>
      </div>
    )
  }

  // ✅ NO EQUIPMENT STATE
  if (bookingItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-xl mb-2">Keranjang Booking Kosong</p>
          <p className="text-gray-500 mb-6">Pilih equipment yang ingin Anda sewa</p>
          <div className="space-y-3">
            <Button 
              onClick={handleBrowseAgain}
              className="bg-green-600 hover:bg-green-700"
            >
              <Package className="h-4 w-4 mr-2" />
              Browse Equipment
            </Button>
            <br />
            <Button 
              onClick={handleTambahEquipment}
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Equipment
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleBrowseAgain}
              variant="ghost"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Lagi
            </Button>
            
            {/* ✅ Status dengan initial equipment info */}
            <div className="hidden md:block">
              <p className="text-sm text-gray-600">
                🛒 <span className="font-medium">{bookingItems.length} equipment</span> dalam booking
                {initialEquipment && (
                  <span className="text-xs text-gray-500 ml-2">
                    (Started with: {initialEquipment.name})
                  </span>
                )}
              </p>
            </div>
          </div>
          
          {/* Clear All Button */}
          <Button 
            variant="outline" 
            onClick={clearAllBooking}
            className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-500"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Kosongkan Booking
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Equipment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Peralatan yang Dipilih ({bookingItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Display all equipment */}
                {bookingItems.map((item, index) => (
                  <div key={`${item.equipment.equipment_id}-${index}`} className="border rounded-lg p-4 space-y-3 bg-white">
                    {/* ✅ Mark initial equipment */}
                    {initialEquipment && item.equipment.equipment_id === initialEquipment.equipment_id && (
                      <div className="bg-blue-50 px-2 py-1 rounded text-xs text-blue-700 mb-2">
                        📌 Initial Equipment (dari detail)
                      </div>
                    )}
                    
                    {/* ✅ ENHANCED EQUIPMENT DISPLAY DENGAN GAMBAR */}
                    <div className="flex gap-3">
                      {/* ✅ ENHANCED IMAGE PREVIEW SECTION */}
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                        {item.equipment.image_url ? (
                          <>
                            <img 
                              key={`booking-img-${item.equipment.equipment_id}-${Date.now()}`}
                              src={buildImageUrl(item.equipment)}
                              alt={item.equipment.name}
                              className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                              onError={(e) => handleImageError(e, item.equipment)}
                              onLoad={() => handleImageLoad(item.equipment)}
                              style={{ display: 'block' }}
                            />
                            {/* ✅ ENHANCED FALLBACK jika gambar error */}
                            <div className="image-fallback absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
                              <div className="text-center text-white p-2">
                                <ImageIcon className="h-6 w-6 mx-auto mb-1 opacity-70" />
                                <p className="text-xs opacity-70">Error</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          /* ✅ ENHANCED PLACEHOLDER jika belum ada gambar */
                          <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                            <span className="text-white text-lg font-bold">
                              {item.equipment.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{item.equipment.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {item.equipment.category.toUpperCase()}
                              </Badge>
                              <span className="text-xs text-gray-500">{item.equipment.code}</span>
                            </div>
                            <p className="text-lg font-bold text-green-600 mt-1">
                              Rp {item.equipment.price_per_day.toLocaleString('id-ID')}/hari
                            </p>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Jumlah:</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          disabled={item.quantity >= item.equipment.stock_quantity}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <span className="text-xs text-gray-500">
                        (Stok: {item.equipment.stock_quantity})
                      </span>
                    </div>

                    {/* Subtotal */}
                    {formData.duration > 0 && (
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        <p className="font-medium">
                          Subtotal: Rp {(item.equipment.price_per_day * item.quantity * formData.duration).toLocaleString('id-ID')}
                        </p>
                        <p className="text-gray-600">
                          {item.quantity}x untuk {formData.duration} hari
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Total Cost */}
                {formData.duration > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg border-t-2 border-green-600">
                    <p className="font-bold text-green-800 text-lg">Total Estimasi:</p>
                    <p className="text-3xl font-bold text-green-600">
                      Rp {calculateTotalCost().toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm text-green-600">untuk {formData.duration} hari</p>
                  </div>
                )}

                {/* Tambah Equipment Button */}
                <Button 
                  onClick={handleTambahEquipment}
                  variant="outline" 
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Equipment Lain
                </Button>
              </CardContent>
            </Card>

            {/* Form Booking - sama seperti sebelumnya */}
            <Card>
              <CardHeader>
                <CardTitle>Form Booking</CardTitle>
                <p className="text-sm text-gray-600">
                  Isi data di bawah untuk melanjutkan ke WhatsApp
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Data */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nama sesuai KTP"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Nomor WhatsApp *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@contoh.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="identity_number">Nomor KTP</Label>
                      <Input
                        id="identity_number"
                        name="identity_number"
                        type="text"
                        value={formData.identity_number}
                        onChange={handleInputChange}
                        placeholder="3201xxxxxxxxxxxxxx"
                      />
                    </div>
                  </div>

                  {/* Rental Period */}
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Periode Sewa
                    </h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start_date">Tanggal Mulai *</Label>
                        <Input
                          id="start_date"
                          name="start_date"
                          type="date"
                          required
                          value={formData.start_date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div>
                        <Label htmlFor="end_date">Tanggal Selesai *</Label>
                        <Input
                          id="end_date"
                          name="end_date"
                          type="date"
                          required
                          value={formData.end_date}
                          onChange={handleInputChange}
                          min={formData.start_date || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    {formData.duration > 0 && (
                      <p className="text-sm text-gray-600">
                        Durasi: <span className="font-medium">{formData.duration} hari</span>
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes">Catatan Tambahan</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Catatan khusus untuk penyewaan ini..."
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-700">
                      📋 <strong>Catatan Penting:</strong> Ketika datang ke Kelana Outdoor, jangan lupa membawa kartu identitas (KTP) sebagai syarat dan kebijakan booking.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    🚀 Booking via WhatsApp
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Dengan melanjutkan, Anda akan diarahkan ke WhatsApp untuk konfirmasi booking
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingForm