// // import { useState, useEffect } from 'react'
// // import { useSearchParams, Link } from 'react-router-dom'
// // import { equipmentAPI, Equipment } from '@/lib/api'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Button } from '@/components/ui/button'
// // import { Input } from '@/components/ui/input'
// // import { Label } from '@/components/ui/label'
// // import { Textarea } from '@/components/ui/textarea'
// // import { Badge } from '@/components/ui/badge'
// // import { ArrowLeft, MessageCircle, Calendar } from 'lucide-react'
// // import { useToast } from '@/hooks/use-toast'

// // const BookingForm = () => {
// //   const [searchParams] = useSearchParams()
// //   const { toast } = useToast()
  
// //   const [equipment, setEquipment] = useState<Equipment | null>(null)
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

// //   useEffect(() => {
// //     if (equipmentId) {
// //       fetchEquipmentDetail(parseInt(equipmentId))
// //     }
// //   }, [equipmentId])

// //   const fetchEquipmentDetail = async (id: number) => {
// //     try {
// //       setLoading(true)
// //       const response = await equipmentAPI.getById(id)
      
// //       if (response.data.status === 'success') {
// //         setEquipment(response.data.data)
// //       }
// //     } catch (err) {
// //       console.error('Error:', err)
// //       toast({
// //         title: "Error",
// //         description: "Gagal memuat detail equipment",
// //         variant: "destructive"
// //       })
// //     } finally {
// //       setLoading(false)
// //     }
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

// //   const generateWhatsAppMessage = () => {
// //     if (!equipment) return ''

// //     const totalCost = equipment.price_per_day * formData.duration

// //     const message = `
// // 🏔️ *BOOKING KELANA OUTDOOR*

// // 👤 *DATA PENYEWA:*
// // • Nama: ${formData.name}
// // • HP: ${formData.phone}
// // • Email: ${formData.email}
// // • No. KTP: ${formData.identity_number}

// // 🎒 *PERALATAN:*
// // • ${equipment.name} (${equipment.code})
// // • Kategori: ${equipment.category.toUpperCase()}
// // • Harga: Rp ${equipment.price_per_day.toLocaleString('id-ID')}/hari

// // 📅 *PERIODE SEWA:*
// // • Mulai: ${formData.start_date}
// // • Selesai: ${formData.end_date} 
// // • Durasi: ${formData.duration} hari

// // 💰 *ESTIMASI BIAYA:*
// // Rp ${totalCost.toLocaleString('id-ID')}

// // 📝 *CATATAN:*
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
// //       toast({
// //         title: "Data Tidak Lengkap",
// //         description: "Mohon lengkapi semua data yang diperlukan",
// //         variant: "destructive"
// //       })
// //       return
// //     }

// //     if (new Date(formData.end_date) <= new Date(formData.start_date)) {
// //       toast({
// //         title: "Tanggal Tidak Valid",
// //         description: "Tanggal selesai harus setelah tanggal mulai",
// //         variant: "destructive"
// //       })
// //       return
// //     }

// //     // Generate WhatsApp link
// //     const message = generateWhatsAppMessage()
// //     const whatsappNumber = '6281258599058' // Ganti dengan nomor WA Kelana Outdoor
// //     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

// //     // Open WhatsApp
// //     window.open(whatsappUrl, '_blank')

// //     toast({
// //       title: "Berhasil!",
// //       description: "Anda akan diarahkan ke WhatsApp untuk konfirmasi booking",
// //     })
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

// //   if (!equipment) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <p className="text-red-600 text-lg mb-4">Equipment tidak ditemukan</p>
// //           <Link to="/browse">
// //             <Button>Kembali ke Browse</Button>
// //           </Link>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="container mx-auto px-4 py-8">
// //         {/* Back Button */}
// //         <Link to={`/equipment/${equipment.equipment_id}`}>
// //           <Button variant="ghost" className="mb-6">
// //             <ArrowLeft className="h-4 w-4 mr-2" />
// //             Kembali ke Detail
// //           </Button>
// //         </Link>

// //         <div className="max-w-4xl mx-auto">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //             {/* Equipment Summary */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Peralatan yang Dipilih</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
// //                   {equipment.image_url ? (
// //                     <img 
// //                       src={equipment.image_url} 
// //                       alt={equipment.name}
// //                       className="w-full h-full object-cover"
// //                     />
// //                   ) : (
// //                     <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
// //                       <span className="text-white text-2xl font-bold">
// //                         {equipment.name.charAt(0)}
// //                       </span>
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <h3 className="font-semibold text-lg">{equipment.name}</h3>
// //                   <div className="flex items-center gap-2 mt-2">
// //                     <Badge variant="secondary">{equipment.category.toUpperCase()}</Badge>
// //                     <span className="text-sm text-gray-500">{equipment.code}</span>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-2">
// //                   <p className="text-2xl font-bold text-green-600">
// //                     Rp {equipment.price_per_day.toLocaleString('id-ID')}
// //                   </p>
// //                   <p className="text-sm text-gray-500">per 24 jam</p>
// //                 </div>

// //                 {formData.duration > 0 && (
// //                   <div className="bg-green-50 p-4 rounded-lg">
// //                     <p className="font-medium text-green-800">Estimasi Total:</p>
// //                     <p className="text-2xl font-bold text-green-600">
// //                       Rp {(equipment.price_per_day * formData.duration).toLocaleString('id-ID')}
// //                     </p>
// //                     <p className="text-sm text-green-600">untuk {formData.duration} hari</p>
// //                   </div>
// //                 )}
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

// //                   {/* Submit Button */}
// //                   <Button
// //                     type="submit"
// //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// //                   >
// //                     <MessageCircle className="h-5 w-5 mr-2" />
// //                     Lanjut ke WhatsApp
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



// // import { useState, useEffect } from 'react'
// // import { useSearchParams, Link } from 'react-router-dom'
// // import { equipmentAPI, Equipment } from '@/lib/api'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Button } from '@/components/ui/button'
// // import { Input } from '@/components/ui/input'
// // import { Label } from '@/components/ui/label'
// // import { Textarea } from '@/components/ui/textarea'
// // import { Badge } from '@/components/ui/badge'
// // import { ArrowLeft, MessageCircle, Calendar, Plus, Minus, Trash2 } from 'lucide-react'
// // import { useToast } from '@/hooks/use-toast'

// // interface BookingItem {
// //   equipment: Equipment
// //   quantity: number
// // }

// // const BookingForm = () => {
// //   const [searchParams] = useSearchParams()
// //   const { toast } = useToast()
  
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

// //   useEffect(() => {
// //     if (equipmentId) {
// //       fetchEquipmentDetail(parseInt(equipmentId))
// //     }
// //   }, [equipmentId])

// //   const fetchEquipmentDetail = async (id: number) => {
// //     try {
// //       setLoading(true)
// //       const response = await equipmentAPI.getById(id)
      
// //       if (response.data.status === 'success') {
// //         setBookingItems([{
// //           equipment: response.data.data,
// //           quantity: 1
// //         }])
// //       }
// //     } catch (err) {
// //       console.error('Error:', err)
// //       toast({
// //         title: "Error",
// //         description: "Gagal memuat detail equipment",
// //         variant: "destructive"
// //       })
// //     } finally {
// //       setLoading(false)
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
// // 🏔️ *BOOKING KELANA OUTDOOR*

// // 👤 *DATA PENYEWA:*
// // • Nama: ${formData.name}
// // • HP: ${formData.phone}
// // • Email: ${formData.email}
// // • No. KTP: ${formData.identity_number}

// // 🎒 *PERALATAN:*
// // ${itemsList}

// // 📅 *PERIODE SEWA:*
// // • Mulai: ${formData.start_date}
// // • Selesai: ${formData.end_date} 
// // • Durasi: ${formData.duration} hari

// // 💰 *ESTIMASI BIAYA TOTAL:*
// // Rp ${totalCost.toLocaleString('id-ID')}

// // 📝 *CATATAN:*
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
// //       toast({
// //         title: "Data Tidak Lengkap",
// //         description: "Mohon lengkapi semua data yang diperlukan",
// //         variant: "destructive"
// //       })
// //       return
// //     }

// //     if (bookingItems.length === 0) {
// //       toast({
// //         title: "Tidak Ada Barang",
// //         description: "Pilih minimal satu peralatan untuk disewa",
// //         variant: "destructive"
// //       })
// //       return
// //     }

// //     if (new Date(formData.end_date) <= new Date(formData.start_date)) {
// //       toast({
// //         title: "Tanggal Tidak Valid",
// //         description: "Tanggal selesai harus setelah tanggal mulai",
// //         variant: "destructive"
// //       })
// //       return
// //     }

// //     // Generate WhatsApp link
// //     const message = generateWhatsAppMessage()
// //     const whatsappNumber = '6281258599058'
// //     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

// //     // Open WhatsApp
// //     window.open(whatsappUrl, '_blank')

// //     toast({
// //       title: "Berhasil!",
// //       description: "Anda akan diarahkan ke WhatsApp untuk konfirmasi booking",
// //     })
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
// //           <Link to="/browse">
// //             <Button>Kembali ke Browse</Button>
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
// //                 <Link to="/browse">
// //                   <Button variant="outline" className="w-full">
// //                     <Plus className="h-4 w-4 mr-2" />
// //                     Tambah Peralatan Lain
// //                   </Button>
// //                 </Link>
// //               </CardContent>
// //             </Card>

// //             {/* Booking Form - sama seperti sebelumnya */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Form Booking</CardTitle>
// //                 <p className="text-sm text-gray-600">
// //                   Isi data di bawah untuk melanjutkan ke WhatsApp
// //                 </p>
// //               </CardHeader>
// //               <CardContent>
// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                   {/* Personal Data - sama seperti sebelumnya */}
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

// //                   {/* Rental Period - sama seperti sebelumnya */}
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

// //                   {/* Submit Button */}
// //                   <Button
// //                     type="submit"
// //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// //                   >
// //                     <MessageCircle className="h-5 w-5 mr-2" />
// //                     Lanjut ke WhatsApp
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

// // ...existing imports...
// import { useState, useEffect } from 'react'
// import { useSearchParams, Link } from 'react-router-dom'
// import { equipmentAPI, Equipment } from '@/lib/api'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
// import { Badge } from '@/components/ui/badge'
// import { ArrowLeft, MessageCircle, Calendar, Plus, Minus, Trash2 } from 'lucide-react'
// import { useToast } from '@/hooks/use-toast'

// interface BookingItem {
//   equipment: Equipment
//   quantity: number
// }

// const BookingForm = () => {
//   const [searchParams] = useSearchParams()
//   const { toast } = useToast()
  
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
//   const additionalEquipmentId = searchParams.get('additional_equipment_id') // ✅ TAMBAH INI

//   useEffect(() => {
//     if (equipmentId) {
//       fetchEquipmentDetail(parseInt(equipmentId))
//     }
//   }, [equipmentId])

//   // ✅ TAMBAH EFFECT UNTUK ADDITIONAL EQUIPMENT
//   useEffect(() => {
//     if (additionalEquipmentId && bookingItems.length > 0) {
//       fetchAndAddAdditionalEquipment(parseInt(additionalEquipmentId))
//     }
//   }, [additionalEquipmentId, bookingItems.length])

//   const fetchEquipmentDetail = async (id: number) => {
//     try {
//       setLoading(true)
//       const response = await equipmentAPI.getById(id)
      
//       if (response.data.status === 'success') {
//         setBookingItems([{
//           equipment: response.data.data,
//           quantity: 1
//         }])
//       }
//     } catch (err) {
//       console.error('Error:', err)
//       toast({
//         title: "Error",
//         description: "Gagal memuat detail equipment",
//         variant: "destructive"
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ✅ TAMBAH FUNCTION UNTUK ADDITIONAL EQUIPMENT
//   const fetchAndAddAdditionalEquipment = async (id: number) => {
//     try {
//       const response = await equipmentAPI.getById(id)
      
//       if (response.data.status === 'success') {
//         const newEquipment = response.data.data
        
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
//           toast({
//             title: "Equipment Sudah Ada",
//             description: `Quantity ${newEquipment.name} ditambah 1`,
//           })
//         } else {
//           // If new, add to list
//           setBookingItems(prev => [...prev, {
//             equipment: newEquipment,
//             quantity: 1
//           }])
//           toast({
//             title: "Equipment Ditambahkan",
//             description: `${newEquipment.name} berhasil ditambahkan ke booking`,
//           })
//         }

//         // Clean up URL params
//         const newSearchParams = new URLSearchParams(searchParams)
//         newSearchParams.delete('additional_equipment_id')
//         window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams}`)
//       }
//     } catch (err) {
//       console.error('Error:', err)
//       toast({
//         title: "Error",
//         description: "Gagal menambah equipment",
//         variant: "destructive"
//       })
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

//   // ✅ GENERATE EXISTING IDS FOR ADD EQUIPMENT PAGE
//   const getExistingEquipmentIds = () => {
//     return bookingItems.map(item => item.equipment.equipment_id).join(',')
//   }

//   // ...existing functions (handleInputChange, calculateTotalCost, generateWhatsAppMessage, handleSubmit)...
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
// ⛰*BOOKING KELANA OUTDOOR*

// 👤 *DATA PENYEWA:*
// • Nama: ${formData.name}
// • HP: ${formData.phone}
// • Email: ${formData.email}
// • No. KTP: ${formData.identity_number}

// 🛍 *PERALATAN:*
// ${itemsList}

// 🗓 *PERIODE SEWA:*
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
//       toast({
//         title: "Data Tidak Lengkap",
//         description: "Mohon lengkapi semua data yang diperlukan",
//         variant: "destructive"
//       })
//       return
//     }

//     if (bookingItems.length === 0) {
//       toast({
//         title: "Tidak Ada Barang",
//         description: "Pilih minimal satu peralatan untuk disewa",
//         variant: "destructive"
//       })
//       return
//     }

//     if (new Date(formData.end_date) <= new Date(formData.start_date)) {
//       toast({
//         title: "Tanggal Tidak Valid",
//         description: "Tanggal selesai harus setelah tanggal mulai",
//         variant: "destructive"
//       })
//       return
//     }

//     // Generate WhatsApp link
//     const message = generateWhatsAppMessage()
//     const whatsappNumber = '6285750777394'
//     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

//     // Open WhatsApp
//     window.open(whatsappUrl, '_blank')

//     toast({
//       title: "Berhasil!",
//       description: "Anda akan diarahkan ke WhatsApp untuk konfirmasi booking",
//     })
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

//   if (bookingItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 text-lg mb-4">Tidak ada equipment yang dipilih</p>
//           <Link to="/browse">
//             <Button>Kembali ke Browse</Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Back Button */}
//         <Link to="/browse">
//           <Button variant="ghost" className="mb-6">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Kembali ke Browse
//           </Button>
//         </Link>

//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Equipment Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Peralatan yang Dipilih</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {bookingItems.map((item, index) => (
//                   <div key={index} className="border rounded-lg p-4 space-y-3">
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <h4 className="font-semibold">{item.equipment.name}</h4>
//                         <div className="flex items-center gap-2 mt-1">
//                           <Badge variant="secondary" className="text-xs">
//                             {item.equipment.category.toUpperCase()}
//                           </Badge>
//                           <span className="text-xs text-gray-500">{item.equipment.code}</span>
//                         </div>
//                         <p className="text-lg font-bold text-green-600 mt-2">
//                           Rp {item.equipment.price_per_day.toLocaleString('id-ID')}/hari
//                         </p>
//                       </div>
                      
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => removeItem(index)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
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

//                 {/* ✅ UPDATE ADD MORE EQUIPMENT BUTTON */}
//                 <Link to={`/add-equipment-to-booking?from=booking&existing_ids=${getExistingEquipmentIds()}`}>
//                   <Button variant="outline" className="w-full">
//                     <Plus className="h-4 w-4 mr-2" />
//                     Tambah Peralatan Lain
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             {/* Booking Form - rest of the form remains the same */}
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
//             {/* notes */}
//                   </div>
//                     <p className="text-xs text-gray-500 text-center">
//                     Notes, ketika datang ke Kelana - Outdoor jangan lupa membawa kartu identitas (KTP) sebagai syarat dan kebijakan booking
//                   </p>
//                   {/* Submit Button */}
//                   <Button
//                     type="submit"
//                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
//                   >
//                     <MessageCircle className="h-5 w-5 mr-2" />
//                     Booking Sekarang!
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
import { useSearchParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MessageCircle, Calendar, Plus, Minus, Trash2 } from 'lucide-react'

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
  
  const [bookingItems, setBookingItems] = useState<BookingItem[]>([])
  const [loading, setLoading] = useState(true)
  
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
  const additionalEquipmentId = searchParams.get('additional_equipment_id')

  useEffect(() => {
    if (equipmentId) {
      fetchEquipmentDetail(parseInt(equipmentId))
    }
  }, [equipmentId])

  useEffect(() => {
    if (additionalEquipmentId && bookingItems.length > 0) {
      fetchAndAddAdditionalEquipment(parseInt(additionalEquipmentId))
    }
  }, [additionalEquipmentId, bookingItems.length])

  const fetchEquipmentDetail = async (id: number) => {
    try {
      setLoading(true)
      
      // ✅ SIMPLE FETCH TANPA equipmentAPI
      const response = await fetch(`http://localhost/PBL-KELANA-OUTDOOR/api/public/equipment.php?id=${id}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      let foundEquipment = null
      if (data.equipment_id) {
        foundEquipment = data
      } else if (Array.isArray(data)) {
        foundEquipment = data.find(item => item.equipment_id === id)
      }
      
      if (foundEquipment) {
        setBookingItems([{
          equipment: foundEquipment,
          quantity: 1
        }])
      } else {
        throw new Error('Equipment tidak ditemukan')
      }
      
    } catch (err) {
      console.error('Error:', err)
      
      // ✅ FALLBACK DATA
      const fallbackEquipment: Equipment = {
        equipment_id: id,
        name: "Tenda Dome 4 Orang (Fallback)",
        code: "TENDA-001",
        description: "Data fallback untuk testing",
        category: "tenda",
        size_capacity: "4 orang",
        dimensions: "300x200x150 cm",
        weight: 4.5,
        material: "Polyester",
        stock_quantity: 5,
        available_stock: 5,
        reserved_stock: 0,
        rented_stock: 0,
        price_per_day: 60000,
        condition: "baik",
        equipment_type: "single",
        image_url: null,
        created_at: new Date().toISOString()
      }
      
      setBookingItems([{
        equipment: fallbackEquipment,
        quantity: 1
      }])
      
    } finally {
      setLoading(false)
    }
  }

  const fetchAndAddAdditionalEquipment = async (id: number) => {
    try {
      const response = await fetch(`http://localhost/PBL-KELANA-OUTDOOR/api/public/equipment.php?id=${id}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      let newEquipment = null
      if (data.equipment_id) {
        newEquipment = data
      } else if (Array.isArray(data)) {
        newEquipment = data.find(item => item.equipment_id === id)
      }
      
      if (newEquipment) {
        // Check if equipment already exists
        const existingIndex = bookingItems.findIndex(
          item => item.equipment.equipment_id === newEquipment.equipment_id
        )

        if (existingIndex >= 0) {
          // If exists, increase quantity
          setBookingItems(prev => 
            prev.map((item, index) => 
              index === existingIndex 
                ? { ...item, quantity: Math.min(item.quantity + 1, item.equipment.stock_quantity) }
                : item
            )
          )
          alert(`Quantity ${newEquipment.name} ditambah 1`)
        } else {
          // If new, add to list
          setBookingItems(prev => [...prev, {
            equipment: newEquipment,
            quantity: 1
          }])
          alert(`${newEquipment.name} berhasil ditambahkan ke booking`)
        }

        // Clean up URL params
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.delete('additional_equipment_id')
        window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams}`)
      }
    } catch (err) {
      console.error('Error:', err)
      alert('Gagal menambah equipment')
    }
  }

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setBookingItems(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, quantity: Math.min(newQuantity, item.equipment.stock_quantity) } : item
      )
    )
  }

  const removeItem = (index: number) => {
    setBookingItems(prev => prev.filter((_, i) => i !== index))
  }

  const getExistingEquipmentIds = () => {
    return bookingItems.map(item => item.equipment.equipment_id).join(',')
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
      alert('Mohon lengkapi semua data yang diperlukan')
      return
    }

    if (bookingItems.length === 0) {
      alert('Pilih minimal satu peralatan untuk disewa')
      return
    }

    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      alert('Tanggal selesai harus setelah tanggal mulai')
      return
    }

    // Generate WhatsApp link
    const message = generateWhatsAppMessage()
    const whatsappNumber = '6281344492934'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
    alert('Anda akan diarahkan ke WhatsApp untuk konfirmasi booking')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat form booking...</p>
        </div>
      </div>
    )
  }

  if (bookingItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Tidak ada equipment yang dipilih</p>
          <Link to="/browse">
            <Button>Kembali ke Browse</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/browse">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Browse
          </Button>
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Equipment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Peralatan yang Dipilih</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookingItems.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.equipment.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {item.equipment.category.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">{item.equipment.code}</span>
                        </div>
                        <p className="text-lg font-bold text-green-600 mt-2">
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

                {/* Add More Equipment */}
                <Link to={`/add-equipment-to-booking?from=booking&existing_ids=${getExistingEquipmentIds()}`}>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Peralatan Lain
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Booking Form */}
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
                  
                  <p className="text-xs text-gray-500 text-center">
                    Notes, ketika datang ke Kelana - Outdoor jangan lupa membawa kartu identitas (KTP) sebagai syarat dan kebijakan booking
                  </p>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Booking Sekarang!
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