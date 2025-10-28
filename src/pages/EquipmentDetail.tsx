// // // // import { useEffect, useState } from 'react'
// // // // import { useParams, Link } from 'react-router-dom'
// // // // import { equipmentAPI, Equipment } from '@/lib/api'
// // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // // import { Badge } from '@/components/ui/badge'
// // // // import { Button } from '@/components/ui/button'
// // // // import { ArrowLeft, Package, Weight, Ruler, CheckCircle, AlertCircle } from 'lucide-react'

// // // // const EquipmentDetail = () => {
// // // //   const { id } = useParams<{ id: string }>()
// // // //   const [equipment, setEquipment] = useState<Equipment | null>(null)
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [error, setError] = useState<string | null>(null)

// // // //   useEffect(() => {
// // // //     if (id) {
// // // //       fetchEquipmentDetail(parseInt(id))
// // // //     }
// // // //   }, [id])

// // // //   const fetchEquipmentDetail = async (equipmentId: number) => {
// // // //     try {
// // // //       setLoading(true)
// // // //       const response = await equipmentAPI.getById(equipmentId)
      
// // // //       if (response.data.status === 'success') {
// // // //         setEquipment(response.data.data)
// // // //       } else {
// // // //         setError('Equipment tidak ditemukan')
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Error:', err)
// // // //       setError('Gagal memuat detail equipment')
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
// // // //           <p className="mt-4 text-gray-600">Memuat detail equipment...</p>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   if (error || !equipment) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
// // // //           <p className="text-red-600 text-lg mb-4">{error || 'Equipment tidak ditemukan'}</p>
// // // //           <Link to="/browse">
// // // //             <Button>Kembali ke Browse</Button>
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   const isAvailable = equipment.stock_quantity > 0

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

// // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // //           {/* Equipment Image */}
// // // //           <div className="space-y-4">
// // // //             <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
// // // //               {equipment.image_url ? (
// // // //                 <img 
// // // //                   src={equipment.image_url} 
// // // //                   alt={equipment.name}
// // // //                   className="w-full h-full object-cover"
// // // //                 />
// // // //               ) : (
// // // //                 <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
// // // //                   <span className="text-white text-6xl font-bold">
// // // //                     {equipment.name.charAt(0)}
// // // //                   </span>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Equipment Details */}
// // // //           <div className="space-y-6">
// // // //             <div>
// // // //               <div className="flex items-center gap-3 mb-2">
// // // //                 <Badge variant="secondary" className="bg-blue-100 text-blue-800">
// // // //                   {equipment.category.toUpperCase()}
// // // //                 </Badge>
// // // //                 <span className="text-sm text-gray-500">{equipment.code}</span>
// // // //               </div>
              
// // // //               <h1 className="text-3xl font-bold text-gray-900 mb-4">
// // // //                 {equipment.name}
// // // //               </h1>

// // // //               {equipment.description && (
// // // //                 <p className="text-gray-600 text-lg leading-relaxed mb-6">
// // // //                   {equipment.description}
// // // //                 </p>
// // // //               )}
// // // //             </div>

// // // //             {/* Specifications */}
// // // //             <Card>
// // // //               <CardHeader>
// // // //                 <CardTitle>Spesifikasi</CardTitle>
// // // //               </CardHeader>
// // // //               <CardContent className="space-y-4">
// // // //                 {equipment.size_capacity && (
// // // //                   <div className="flex items-center gap-3">
// // // //                     <Package className="h-5 w-5 text-gray-500" />
// // // //                     <div>
// // // //                       <p className="font-medium">Kapasitas</p>
// // // //                       <p className="text-gray-600">{equipment.size_capacity}</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}

// // // //                 {equipment.dimensions && (
// // // //                   <div className="flex items-center gap-3">
// // // //                     <Ruler className="h-5 w-5 text-gray-500" />
// // // //                     <div>
// // // //                       <p className="font-medium">Dimensi</p>
// // // //                       <p className="text-gray-600">{equipment.dimensions}</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}

// // // //                 {equipment.weight && (
// // // //                   <div className="flex items-center gap-3">
// // // //                     <Weight className="h-5 w-5 text-gray-500" />
// // // //                     <div>
// // // //                       <p className="font-medium">Berat</p>
// // // //                       <p className="text-gray-600">{equipment.weight} kg</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}

// // // //                 {equipment.material && (
// // // //                   <div className="flex items-center gap-3">
// // // //                     <CheckCircle className="h-5 w-5 text-gray-500" />
// // // //                     <div>
// // // //                       <p className="font-medium">Material</p>
// // // //                       <p className="text-gray-600">{equipment.material}</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //               </CardContent>
// // // //             </Card>

// // // //             {/* Price and Availability */}
// // // //             <Card>
// // // //               <CardContent className="pt-6">
// // // //                 <div className="flex justify-between items-center mb-4">
// // // //                   <div>
// // // //                     <p className="text-3xl font-bold text-green-600">
// // // //                       Rp {equipment.price_per_day.toLocaleString('id-ID')}
// // // //                     </p>
// // // //                     <p className="text-gray-500">per 24 jam</p>
// // // //                   </div>
                  
// // // //                   <div className="text-right">
// // // //                     <p className="text-lg font-semibold">
// // // //                       {isAvailable ? (
// // // //                         <span className="text-green-600">
// // // //                           <CheckCircle className="inline h-5 w-5 mr-1" />
// // // //                           Tersedia ({equipment.stock_quantity})
// // // //                         </span>
// // // //                       ) : (
// // // //                         <span className="text-red-600">
// // // //                           <AlertCircle className="inline h-5 w-5 mr-1" />
// // // //                           Stok Habis
// // // //                         </span>
// // // //                       )}
// // // //                     </p>
// // // //                     <Badge variant={equipment.condition === 'baik' ? 'default' : 'secondary'}>
// // // //                       Kondisi: {equipment.condition}
// // // //                     </Badge>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Rental Action */}
// // // //                 <Link 
// // // //                   to={`/booking/form?equipment_id=${equipment.equipment_id}`}
// // // //                   className="block"
// // // //                 >
// // // //                   <Button 
// // // //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// // // //                     disabled={!isAvailable}
// // // //                   >
// // // //                     {isAvailable ? 'Sewa Sekarang' : 'Stok Tidak Tersedia'}
// // // //                   </Button>
// // // //                 </Link>

// // // //                 <p className="text-sm text-gray-500 text-center mt-3">
// // // //                   * Sistem sewa dihitung per 24 jam dengan toleransi keterlambatan 12 jam
// // // //                 </p>
// // // //               </CardContent>
// // // //             </Card>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default EquipmentDetail

// // // import { useEffect, useState } from 'react'
// // // import { useParams, Link } from 'react-router-dom'
// // // import { equipmentAPI, Equipment } from '@/lib/api'
// // // import { useCart } from '@/contexts/CartContext'
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // import { Badge } from '@/components/ui/badge'
// // // import { Button } from '@/components/ui/button'
// // // import { ArrowLeft, Package, Weight, Ruler, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react'

// // // const EquipmentDetail = () => {
// // //   const { id } = useParams<{ id: string }>()
// // //   const [equipment, setEquipment] = useState<Equipment | null>(null)
// // //   const [loading, setLoading] = useState(true)
// // //   const [error, setError] = useState<string | null>(null)
  
// // //   const { addToCart, isInCart, getCartItem } = useCart()

// // //   useEffect(() => {
// // //     if (id) {
// // //       fetchEquipmentDetail(parseInt(id))
// // //     }
// // //   }, [id])

// // //   const fetchEquipmentDetail = async (equipmentId: number) => {
// // //     try {
// // //       setLoading(true)
// // //       const response = await equipmentAPI.getById(equipmentId)
      
// // //       if (response.data.status === 'success') {
// // //         setEquipment(response.data.data)
// // //       } else {
// // //         setError('Equipment tidak ditemukan')
// // //       }
// // //     } catch (err) {
// // //       console.error('Error:', err)
// // //       setError('Gagal memuat detail equipment')
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const handleAddToCart = () => {
// // //     if (!equipment) return
    
// // //     addToCart(equipment, 1)
// // //     alert(`✅ ${equipment.name} telah ditambahkan ke keranjang!`)
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
// // //           <p className="mt-4 text-gray-600">Memuat detail equipment...</p>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   if (error || !equipment) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center">
// // //           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
// // //           <p className="text-red-600 text-lg mb-4">{error || 'Equipment tidak ditemukan'}</p>
// // //           <Link to="/browse">
// // //             <Button>Kembali ke Browse</Button>
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   const isAvailable = equipment.stock_quantity > 0
// // //   const isItemInCart = isInCart(equipment.equipment_id)
// // //   const cartItem = getCartItem(equipment.equipment_id)

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

// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // //           {/* Equipment Image */}
// // //           <div className="space-y-4">
// // //             <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
// // //               {equipment.image_url ? (
// // //                 <img 
// // //                   src={equipment.image_url} 
// // //                   alt={equipment.name}
// // //                   className="w-full h-full object-cover"
// // //                 />
// // //               ) : (
// // //                 <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
// // //                   <span className="text-white text-6xl font-bold">
// // //                     {equipment.name.charAt(0)}
// // //                   </span>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* ✅ CART SECTION - TAMBAH DI BAWAH GAMBAR */}
// // //             <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
// // //               <h3 className="font-medium text-blue-800 mb-2">
// // //                 💡 Simpan untuk nanti?
// // //               </h3>
// // //               <p className="text-sm text-blue-600 mb-3">
// // //                 Tambahkan ke keranjang untuk booking nanti
// // //               </p>
              
// // //               {isItemInCart ? (
// // //                 <div className="space-y-2">
// // //                   <p className="text-sm text-green-600">
// // //                     ✅ Sudah di keranjang ({cartItem?.quantity})
// // //                   </p>
// // //                   <div className="flex gap-2">
// // //                     <Link to="/cart" className="flex-1">
// // //                       <Button variant="outline" className="w-full border-blue-600 text-blue-600">
// // //                         <ShoppingCart className="h-4 w-4 mr-2" />
// // //                         Lihat Keranjang
// // //                       </Button>
// // //                     </Link>
// // //                     <Button 
// // //                       onClick={handleAddToCart}
// // //                       disabled={!isAvailable}
// // //                       className="bg-blue-600 hover:bg-blue-700"
// // //                     >
// // //                       +1
// // //                     </Button>
// // //                   </div>
// // //                 </div>
// // //               ) : (
// // //                 <Button 
// // //                   onClick={handleAddToCart}
// // //                   disabled={!isAvailable}
// // //                   variant="outline"
// // //                   className="w-full border-blue-600 text-blue-600 hover:bg-blue-100"
// // //                 >
// // //                   <ShoppingCart className="h-4 w-4 mr-2" />
// // //                   Tambah ke Keranjang
// // //                 </Button>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Equipment Details */}
// // //           <div className="space-y-6">
// // //             <div>
// // //               <div className="flex items-center gap-3 mb-2">
// // //                 <Badge variant="secondary" className="bg-blue-100 text-blue-800">
// // //                   {equipment.category.toUpperCase()}
// // //                 </Badge>
// // //                 <span className="text-sm text-gray-500">{equipment.code}</span>
// // //               </div>
              
// // //               <h1 className="text-3xl font-bold text-gray-900 mb-4">
// // //                 {equipment.name}
// // //               </h1>

// // //               {equipment.description && (
// // //                 <p className="text-gray-600 text-lg leading-relaxed mb-6">
// // //                   {equipment.description}
// // //                 </p>
// // //               )}
// // //             </div>

// // //             {/* ✅ SPESIFIKASI - KEMBALIKAN SECTION INI */}
// // //             <Card>
// // //               <CardHeader>
// // //                 <CardTitle>Spesifikasi</CardTitle>
// // //               </CardHeader>
// // //               <CardContent className="space-y-4">
// // //                 {equipment.size_capacity && (
// // //                   <div className="flex items-center gap-3">
// // //                     <Package className="h-5 w-5 text-gray-500" />
// // //                     <div>
// // //                       <p className="font-medium">Kapasitas</p>
// // //                       <p className="text-gray-600">{equipment.size_capacity}</p>
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 {equipment.dimensions && (
// // //                   <div className="flex items-center gap-3">
// // //                     <Ruler className="h-5 w-5 text-gray-500" />
// // //                     <div>
// // //                       <p className="font-medium">Dimensi</p>
// // //                       <p className="text-gray-600">{equipment.dimensions}</p>
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 {equipment.weight && (
// // //                   <div className="flex items-center gap-3">
// // //                     <Weight className="h-5 w-5 text-gray-500" />
// // //                     <div>
// // //                       <p className="font-medium">Berat</p>
// // //                       <p className="text-gray-600">{equipment.weight} kg</p>
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 {equipment.material && (
// // //                   <div className="flex items-center gap-3">
// // //                     <CheckCircle className="h-5 w-5 text-gray-500" />
// // //                     <div>
// // //                       <p className="font-medium">Material</p>
// // //                       <p className="text-gray-600">{equipment.material}</p>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </CardContent>
// // //             </Card>

// // //             {/* ✅ PRICE AND AVAILABILITY - KEMBALIKAN SECTION INI */}
// // //             <Card>
// // //               <CardContent className="pt-6">
// // //                 <div className="flex justify-between items-center mb-4">
// // //                   <div>
// // //                     <p className="text-3xl font-bold text-green-600">
// // //                       Rp {equipment.price_per_day.toLocaleString('id-ID')}
// // //                     </p>
// // //                     <p className="text-gray-500">per 24 jam</p>
// // //                   </div>
                  
// // //                   <div className="text-right">
// // //                     <p className="text-lg font-semibold">
// // //                       {isAvailable ? (
// // //                         <span className="text-green-600">
// // //                           <CheckCircle className="inline h-5 w-5 mr-1" />
// // //                           Tersedia ({equipment.stock_quantity})
// // //                         </span>
// // //                       ) : (
// // //                         <span className="text-red-600">
// // //                           <AlertCircle className="inline h-5 w-5 mr-1" />
// // //                           Stok Habis
// // //                         </span>
// // //                       )}
// // //                     </p>
// // //                     <Badge variant={equipment.condition === 'baik' ? 'default' : 'secondary'}>
// // //                       Kondisi: {equipment.condition}
// // //                     </Badge>
// // //                   </div>
// // //                 </div>

// // //                 {/* Rental Action */}
// // //                 <Link 
// // //                   to={`/booking/form?equipment_id=${equipment.equipment_id}`}
// // //                   className="block"
// // //                 >
// // //                   <Button 
// // //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// // //                     disabled={!isAvailable}
// // //                   >
// // //                     {isAvailable ? 'Sewa Sekarang' : 'Stok Tidak Tersedia'}
// // //                   </Button>
// // //                 </Link>

// // //                 <p className="text-sm text-gray-500 text-center mt-3">
// // //                   * Sistem sewa dihitung per 24 jam dengan toleransi keterlambatan 12 jam
// // //                 </p>
// // //               </CardContent>
// // //             </Card>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default EquipmentDetail

// // import { useEffect, useState } from 'react'
// // import { useParams, Link } from 'react-router-dom'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Badge } from '@/components/ui/badge'
// // import { Button } from '@/components/ui/button'
// // import { ArrowLeft, Package, Weight, Ruler, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react'
// // import { useCart, Equipment } from '@/contexts/CartContext'

// // const EquipmentDetail = () => {
// //   const { id } = useParams<{ id: string }>()
// //   const [equipment, setEquipment] = useState<Equipment | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)

// //   // ✅ USE CART CONTEXT
// //   const { addToCart, isInCart, getCartItem, getTotalItems } = useCart()

// //   useEffect(() => {
// //     if (id) {
// //       fetchEquipmentDetail(parseInt(id))
// //     }
// //   }, [id])

// //   const fetchEquipmentDetail = async (equipmentId: number) => {
// //     try {
// //       setLoading(true)
// //       setError(null)
      
// //       console.log('🔍 Fetching equipment detail for ID:', equipmentId)
      
// //       // ✅ FETCH BY ID dari API
// //       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php?id=${equipmentId}`)
      
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`)
// //       }
      
// //       const text = await response.text()
// //       console.log('📄 Raw response:', text.substring(0, 200))
      
// //       const data = JSON.parse(text)
// //       console.log('✅ Parsed data:', data)
      
// //       if (data.error) {
// //         throw new Error(data.message || 'Equipment tidak ditemukan')
// //       }

// //       if (data.equipment_id) {
// //         // Single equipment response
// //         setEquipment(data)
// //         console.log('✅ Equipment loaded:', data.name)
// //       } else if (Array.isArray(data)) {
// //         // Array response, find by ID
// //         const foundEquipment = data.find((item: any) => item.equipment_id === equipmentId)
// //         if (foundEquipment) {
// //           setEquipment(foundEquipment)
// //           console.log('✅ Equipment found in array:', foundEquipment.name)
// //         } else {
// //           throw new Error('Equipment tidak ditemukan')
// //         }
// //       } else {
// //         throw new Error('Equipment tidak ditemukan')
// //       }
      
// //     } catch (err) {
// //       console.error('❌ Error:', err)
// //       setError('Gagal memuat detail equipment')
      
// //       // ✅ FALLBACK DATA untuk testing
// //       const fallbackEquipment: Equipment = {
// //         equipment_id: parseInt(id || '1'),
// //         name: "Tenda Dome 4 Orang (FALLBACK)",
// //         code: "TENDA-001",
// //         description: "Tenda berkualitas tinggi untuk 4 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
// //         category: "tenda",
// //         size_capacity: "4 orang",
// //         dimensions: "300x200x150 cm",
// //         weight: 4.5,
// //         material: "Polyester 190T",
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
      
// //       setEquipment(fallbackEquipment)
      
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // ✅ SIMPLIFIED ADD TO CART
// //   const handleAddToCart = () => {
// //     if (!equipment) return
    
// //     console.log('🛒 Adding equipment to cart:', equipment.name)
// //     addToCart(equipment, 1)
// //     alert(`✅ ${equipment.name} ditambahkan ke keranjang!`)
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
// //           <p className="mt-4 text-gray-600">Memuat detail equipment...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (error && !equipment) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
// //           <p className="text-red-600 text-lg mb-4">{error || 'Equipment tidak ditemukan'}</p>
// //           <Link to="/browse">
// //             <Button>Kembali ke Browse</Button>
// //           </Link>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (!equipment) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
// //           <p className="text-red-600 text-lg mb-4">Equipment tidak ditemukan</p>
// //           <Link to="/browse">
// //             <Button>Kembali ke Browse</Button>
// //           </Link>
// //         </div>
// //       </div>
// //     )
// //   }

// //   const isAvailable = equipment.stock_quantity > 0
// //   const itemInCart = isInCart(equipment.equipment_id)
// //   const cartItem = getCartItem(equipment.equipment_id)

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

// //         {/* Error Warning */}
// //         {error && (
// //           <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
// //             <p className="text-yellow-800 text-sm">
// //               ⚠️ {error} - Menampilkan data fallback untuk testing
// //             </p>
// //           </div>
// //         )}

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* Equipment Image */}
// //           <div className="space-y-4">
// //             <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
// //               {equipment.image_url ? (
// //                 <img 
// //                   src={equipment.image_url} 
// //                   alt={equipment.name}
// //                   className="w-full h-full object-cover"
// //                 />
// //               ) : (
// //                 <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
// //                   <span className="text-white text-6xl font-bold">
// //                     {equipment.name.charAt(0)}
// //                   </span>
// //                 </div>
// //               )}
// //             </div>

// //             {/* ✅ CART SECTION */}
// //             <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
// //               <h3 className="font-medium text-blue-800 mb-2">
// //                 🛒 Simpan untuk nanti?
// //               </h3>
// //               <p className="text-sm text-blue-600 mb-3">
// //                 Tambahkan ke keranjang untuk booking multiple items
// //               </p>
              
// //               {itemInCart ? (
// //                 <div className="space-y-2">
// //                   <p className="text-sm text-green-600 font-medium">
// //                     ✅ Sudah di keranjang ({cartItem?.quantity})
// //                   </p>
// //                   <div className="flex gap-2">
// //                     <Link to="/cart" className="flex-1">
// //                       <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
// //                         <ShoppingCart className="h-4 w-4 mr-2" />
// //                         Lihat Keranjang
// //                       </Button>
// //                     </Link>
// //                     <Button 
// //                       onClick={handleAddToCart}
// //                       disabled={!isAvailable}
// //                       className="bg-blue-600 hover:bg-blue-700"
// //                       size="sm"
// //                     >
// //                       +1
// //                     </Button>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <Button 
// //                   onClick={handleAddToCart}
// //                   disabled={!isAvailable}
// //                   variant="outline"
// //                   className="w-full border-blue-600 text-blue-600 hover:bg-blue-100"
// //                 >
// //                   <ShoppingCart className="h-4 w-4 mr-2" />
// //                   Tambah ke Keranjang
// //                 </Button>
// //               )}
// //             </div>
// //           </div>

// //           {/* Equipment Details */}
// //           <div className="space-y-6">
// //             <div>
// //               <div className="flex items-center gap-3 mb-2">
// //                 <Badge variant="secondary" className="bg-blue-100 text-blue-800">
// //                   {equipment.category.toUpperCase()}
// //                 </Badge>
// //                 <span className="text-sm text-gray-500">{equipment.code}</span>
// //               </div>
              
// //               <h1 className="text-3xl font-bold text-gray-900 mb-4">
// //                 {equipment.name}
// //               </h1>

// //               {equipment.description && (
// //                 <p className="text-gray-600 text-lg leading-relaxed mb-6">
// //                   {equipment.description}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Specifications */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Spesifikasi</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 {equipment.size_capacity && (
// //                   <div className="flex items-center gap-3">
// //                     <Package className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Kapasitas</p>
// //                       <p className="text-gray-600">{equipment.size_capacity}</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {equipment.dimensions && (
// //                   <div className="flex items-center gap-3">
// //                     <Ruler className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Dimensi</p>
// //                       <p className="text-gray-600">{equipment.dimensions}</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {equipment.weight && (
// //                   <div className="flex items-center gap-3">
// //                     <Weight className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Berat</p>
// //                       <p className="text-gray-600">{equipment.weight} kg</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {equipment.material && (
// //                   <div className="flex items-center gap-3">
// //                     <CheckCircle className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Material</p>
// //                       <p className="text-gray-600">{equipment.material}</p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>

// //             {/* Price and Availability */}
// //             <Card>
// //               <CardContent className="pt-6">
// //                 <div className="flex justify-between items-center mb-4">
// //                   <div>
// //                     <p className="text-3xl font-bold text-green-600">
// //                       Rp {equipment.price_per_day.toLocaleString('id-ID')}
// //                     </p>
// //                     <p className="text-gray-500">per 24 jam</p>
// //                   </div>
                  
// //                   <div className="text-right">
// //                     <p className="text-lg font-semibold">
// //                       {isAvailable ? (
// //                         <span className="text-green-600">
// //                           <CheckCircle className="inline h-5 w-5 mr-1" />
// //                           Tersedia ({equipment.stock_quantity})
// //                         </span>
// //                       ) : (
// //                         <span className="text-red-600">
// //                           <AlertCircle className="inline h-5 w-5 mr-1" />
// //                           Stok Habis
// //                         </span>
// //                       )}
// //                     </p>
// //                     <Badge variant={equipment.condition === 'baik' ? 'default' : 'secondary'}>
// //                       Kondisi: {equipment.condition}
// //                     </Badge>
// //                   </div>
// //                 </div>

// //                 {/* Rental Action */}
// //                 <Link 
// //                   to={`/booking/form?equipment_id=${equipment.equipment_id}`}
// //                   className="block"
// //                 >
// //                   <Button 
// //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// //                     disabled={!isAvailable}
// //                   >
// //                     {isAvailable ? '🎒 Sewa Sekarang' : '❌ Stok Tidak Tersedia'}
// //                   </Button>
// //                 </Link>

// //                 <p className="text-sm text-gray-500 text-center mt-3">
// //                   * Sistem sewa dihitung per 24 jam dengan toleransi keterlambatan 12 jam
// //                 </p>

// //                 {/* Quick Actions */}
// //                 <div className="flex gap-2 mt-4">
// //                   <Link to="/cart" className="flex-1">
// //                     <Button variant="outline" className="w-full text-sm">
// //                       Lihat Keranjang ({getTotalItems()})
// //                     </Button>
// //                   </Link>
                  
// //                   <Link to="/browse" className="flex-1">
// //                     <Button variant="outline" className="w-full text-sm">
// //                       Browse Lainnya
// //                     </Button>
// //                   </Link>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default EquipmentDetail



// // import { useEffect, useState } from 'react'
// // import { useParams, Link } from 'react-router-dom'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Badge } from '@/components/ui/badge'
// // import { Button } from '@/components/ui/button'
// // import { ArrowLeft, Package, Weight, Ruler, CheckCircle, AlertCircle, ShoppingCart, Image as ImageIcon } from 'lucide-react'
// // import { useCart, Equipment } from '@/contexts/CartContext'

// // const EquipmentDetail = () => {
// //   const { id } = useParams<{ id: string }>()
// //   const [equipment, setEquipment] = useState<Equipment | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)

// //   // ✅ USE CART CONTEXT
// //   const { addToCart, isInCart, getCartItem, getTotalItems } = useCart()

// //   useEffect(() => {
// //     if (id) {
// //       fetchEquipmentDetail(parseInt(id))
// //     }
// //   }, [id])
// // // ✅ TAMBAHKAN FUNCTION UNTUK BUILD IMAGE URL
// //   // ✅ PERBAIKI FUNCTION buildImageUrl
// // const buildImageUrl = (item: Equipment) => {
// //   if (!item.image_url) return null;
  
// //   console.log('🖼️ Original image_url:', item.image_url); // Debug log
  
// //   // Jika sudah full URL, return as is
// //   if (item.image_url.startsWith('http')) {
// //     return item.image_url;
// //   }
  
// //   // ✅ PERBAIKAN: Pastikan path yang benar
// //   if (item.image_url.startsWith('/uploads/')) {
// //     // Path sudah lengkap dari root, tambahkan base URL
// //     return `http://localhost/PBL - KELANA OUTDOOR${item.image_url}`;
// //   }
  
// //   if (item.image_url.startsWith('uploads/')) {
// //     // Path tanpa slash di depan
// //     return `http://localhost/PBL - KELANA OUTDOOR/${item.image_url}`;
// //   }
  
// //   // Jika hanya nama file saja
// //   return `http://localhost/PBL - KELANA OUTDOOR/uploads/equipment/${item.image_url}`;
// // };

// //   // ✅ TAMBAHKAN FUNCTION UNTUK HANDLE IMAGE ERROR
// //  // ✅ ENHANCED handleImageError dengan lebih banyak fallback
// // const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, item: Equipment) => {
// //   const img = e.target as HTMLImageElement;
  
// //   console.log(`❌ Image load error for ${item.code}:`);
// //   console.log(`   Original URL: ${item.image_url}`);
// //   console.log(`   Failed URL: ${img.src}`);
// //   console.log(`   Trying fallback...`);
  
// //   // Coba beberapa alternatif path
// //   const alternatives = [
// //     `http://localhost/PBL - KELANA OUTDOOR/uploads/${item.image_url}`,
// //     `http://localhost/PBL - KELANA OUTDOOR/images/equipment/${item.image_url}`,
// //     `http://localhost/PBL - KELANA OUTDOOR/assets/images/${item.image_url}`,
// //   ];
  
// //   // Hide failed image and show fallback
// //   img.style.display = 'none';
// //   const fallback = img.nextElementSibling as HTMLElement;
// //   if (fallback && fallback.classList.contains('image-fallback')) {
// //     fallback.style.display = 'flex';
// //   }
// // };

// //   // ✅ TAMBAHKAN FUNCTION UNTUK HANDLE IMAGE LOAD SUCCESS
// //   const handleImageLoad = (item: Equipment) => {
// //     console.log(`✅ Image loaded successfully for ${item.code}`);
// //   };

// //   const fetchEquipmentDetail = async (equipmentId: number) => {
// //     try {
// //       setLoading(true)
// //       setError(null)
      
// //       console.log('🔍 Fetching equipment detail for ID:', equipmentId)
      
// //       // ✅ FETCH BY ID dari API
// //       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php?id=${equipmentId}`)
      
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`)
// //       }
      
// //       const text = await response.text()
// //       console.log('📄 Raw response:', text.substring(0, 200))
      
// //       const data = JSON.parse(text)
// //       console.log('✅ Parsed data:', data)
      
// //       // ✅ Debug image URL
// //       if (data.image_url) {
// //         console.log('🖼️ Equipment image URL:', data.image_url)
// //         console.log('🖼️ Full image URL will be:', `http://localhost${data.image_url}`)
// //       }
      
// //       if (data.error) {
// //         throw new Error(data.message || 'Equipment tidak ditemukan')
// //       }

// //       if (data.equipment_id) {
// //         // Single equipment response
// //         setEquipment(data)
// //         console.log('✅ Equipment loaded:', data.name)
// //       } else if (Array.isArray(data)) {
// //         // Array response, find by ID
// //         const foundEquipment = data.find((item: any) => item.equipment_id === equipmentId)
// //         if (foundEquipment) {
// //           setEquipment(foundEquipment)
// //           console.log('✅ Equipment found in array:', foundEquipment.name)
// //         } else {
// //           throw new Error('Equipment tidak ditemukan')
// //         }
// //       } else {
// //         throw new Error('Equipment tidak ditemukan')
// //       }
      
// //     } catch (err) {
// //       console.error('❌ Error:', err)
// //       setError('Gagal memuat detail equipment')
      
// //       // ✅ FALLBACK DATA untuk testing
// //       const fallbackEquipment: Equipment = {
// //         equipment_id: parseInt(id || '1'),
// //         name: "Tenda Dome 4 Orang (FALLBACK)",
// //         code: "TENDA-001",
// //         description: "Tenda berkualitas tinggi untuk 4 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
// //         category: "tenda",
// //         size_capacity: "4 orang",
// //         dimensions: "300x200x150 cm",
// //         weight: 4.5,
// //         material: "Polyester 190T",
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
      
// //       setEquipment(fallbackEquipment)
      
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // ✅ SIMPLIFIED ADD TO CART
// //   const handleAddToCart = () => {
// //     if (!equipment) return
    
// //     console.log('🛒 Adding equipment to cart:', equipment.name)
// //     addToCart(equipment, 1)
// //     alert(`✅ ${equipment.name} ditambahkan ke keranjang!`)
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
// //           <p className="mt-4 text-gray-600">Memuat detail equipment...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (error && !equipment) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
// //           <p className="text-red-600 text-lg mb-4">{error || 'Equipment tidak ditemukan'}</p>
// //           <Link to="/browse">
// //             <Button>Kembali ke Browse</Button>
// //           </Link>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (!equipment) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
// //           <p className="text-red-600 text-lg mb-4">Equipment tidak ditemukan</p>
// //           <Link to="/browse">
// //             <Button>Kembali ke Browse</Button>
// //           </Link>
// //         </div>
// //       </div>
// //     )
// //   }

// //   const isAvailable = equipment.stock_quantity > 0
// //   const itemInCart = isInCart(equipment.equipment_id)
// //   const cartItem = getCartItem(equipment.equipment_id)

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

// //         {/* Error Warning */}
// //         {error && (
// //           <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
// //             <p className="text-yellow-800 text-sm">
// //               ⚠️ {error} - Menampilkan data fallback untuk testing
// //             </p>
// //           </div>
// //         )}

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* ✅ FIXED: Equipment Image Section */}
// //           <div className="space-y-4">
// //             <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
// //               {equipment.image_url ? (
// //                 <>
// //                   <img 
// //                     src={`http://localhost${equipment.image_url}`}
// //                     alt={equipment.name}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       console.error('❌ Image failed to load:', equipment.image_url)
// //                       ;(e.target as HTMLImageElement).style.display = 'none'
// //                       const nextElement = (e.target as HTMLImageElement).nextElementSibling as HTMLElement
// //                       if (nextElement) {
// //                         nextElement.style.display = 'flex'
// //                       }
// //                     }}
// //                   />
// //                   {/* Fallback jika gambar error */}
// //                   <div className="w-full h-full hidden bg-gradient-to-br from-green-400 to-green-600 items-center justify-center">
// //                     <div className="text-center text-white">
// //                       <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-70" />
// //                       <span className="text-4xl font-bold block mb-2">
// //                         {equipment.name.charAt(0)}
// //                       </span>
// //                       <p className="text-sm opacity-70">Gambar tidak dapat dimuat</p>
// //                     </div>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
// //                   <div className="text-center text-white">
// //                     <span className="text-6xl font-bold block mb-4">
// //                       {equipment.name.charAt(0)}
// //                     </span>
// //                     <p className="text-lg opacity-70">Belum ada gambar</p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* ✅ CART SECTION */}
// //             <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
// //               <h3 className="font-medium text-blue-800 mb-2">
// //                 🛒 Simpan untuk nanti?
// //               </h3>
// //               <p className="text-sm text-blue-600 mb-3">
// //                 Tambahkan ke keranjang untuk booking multiple items
// //               </p>
              
// //               {itemInCart ? (
// //                 <div className="space-y-2">
// //                   <p className="text-sm text-green-600 font-medium">
// //                     ✅ Sudah di keranjang ({cartItem?.quantity})
// //                   </p>
// //                   <div className="flex gap-2">
// //                     <Link to="/cart" className="flex-1">
// //                       <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
// //                         <ShoppingCart className="h-4 w-4 mr-2" />
// //                         Lihat Keranjang
// //                       </Button>
// //                     </Link>
// //                     <Button 
// //                       onClick={handleAddToCart}
// //                       disabled={!isAvailable}
// //                       className="bg-blue-600 hover:bg-blue-700"
// //                       size="sm"
// //                     >
// //                       +1
// //                     </Button>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <Button 
// //                   onClick={handleAddToCart}
// //                   disabled={!isAvailable}
// //                   variant="outline"
// //                   className="w-full border-blue-600 text-blue-600 hover:bg-blue-100"
// //                 >
// //                   <ShoppingCart className="h-4 w-4 mr-2" />
// //                   Tambah ke Keranjang
// //                 </Button>
// //               )}

// //               {/* ✅ Image Debug Info */}
// //               {equipment.image_url && (
// //                 <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
// //                   <p className="text-blue-700 font-mono break-all">
// //                     🖼️ Image: {equipment.image_url}
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Equipment Details */}
// //           <div className="space-y-6">
// //             <div>
// //               <div className="flex items-center gap-3 mb-2">
// //                 <Badge variant="secondary" className="bg-blue-100 text-blue-800">
// //                   {equipment.category.toUpperCase()}
// //                 </Badge>
// //                 <span className="text-sm text-gray-500">{equipment.code}</span>
// //               </div>
              
// //               <h1 className="text-3xl font-bold text-gray-900 mb-4">
// //                 {equipment.name}
// //               </h1>

// //               {equipment.description && (
// //                 <p className="text-gray-600 text-lg leading-relaxed mb-6">
// //                   {equipment.description}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Specifications */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Spesifikasi</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 {equipment.size_capacity && (
// //                   <div className="flex items-center gap-3">
// //                     <Package className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Kapasitas</p>
// //                       <p className="text-gray-600">{equipment.size_capacity}</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {equipment.dimensions && (
// //                   <div className="flex items-center gap-3">
// //                     <Ruler className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Dimensi</p>
// //                       <p className="text-gray-600">{equipment.dimensions}</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {equipment.weight && (
// //                   <div className="flex items-center gap-3">
// //                     <Weight className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Berat</p>
// //                       <p className="text-gray-600">{equipment.weight} kg</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {equipment.material && (
// //                   <div className="flex items-center gap-3">
// //                     <CheckCircle className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Material</p>
// //                       <p className="text-gray-600">{equipment.material}</p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>

// //             {/* Price and Availability */}
// //             <Card>
// //               <CardContent className="pt-6">
// //                 <div className="flex justify-between items-center mb-4">
// //                   <div>
// //                     <p className="text-3xl font-bold text-green-600">
// //                       Rp {equipment.price_per_day.toLocaleString('id-ID')}
// //                     </p>
// //                     <p className="text-gray-500">per 24 jam</p>
// //                   </div>
                  
// //                   <div className="text-right">
// //                     <p className="text-lg font-semibold">
// //                       {isAvailable ? (
// //                         <span className="text-green-600">
// //                           <CheckCircle className="inline h-5 w-5 mr-1" />
// //                           Tersedia ({equipment.stock_quantity})
// //                         </span>
// //                       ) : (
// //                         <span className="text-red-600">
// //                           <AlertCircle className="inline h-5 w-5 mr-1" />
// //                           Stok Habis
// //                         </span>
// //                       )}
// //                     </p>
// //                     <Badge variant={equipment.condition === 'baik' ? 'default' : 'secondary'}>
// //                       Kondisi: {equipment.condition}
// //                     </Badge>
// //                   </div>
// //                 </div>

// //                 {/* Rental Action */}
// //                 <Link 
// //                   to={`/booking/form?equipment_id=${equipment.equipment_id}`}
// //                   className="block"
// //                 >
// //                   <Button 
// //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// //                     disabled={!isAvailable}
// //                   >
// //                     {isAvailable ? '🎒 Sewa Sekarang' : '❌ Stok Tidak Tersedia'}
// //                   </Button>
// //                 </Link>

// //                 <p className="text-sm text-gray-500 text-center mt-3">
// //                   * Sistem sewa dihitung per 24 jam dengan toleransi keterlambatan 12 jam
// //                 </p>

// //                 {/* Quick Actions */}
// //                 <div className="flex gap-2 mt-4">
// //                   <Link to="/cart" className="flex-1">
// //                     <Button variant="outline" className="w-full text-sm">
// //                       Lihat Keranjang ({getTotalItems()})
// //                     </Button>
// //                   </Link>
                  
// //                   <Link to="/browse" className="flex-1">
// //                     <Button variant="outline" className="w-full text-sm">
// //                       Browse Lainnya
// //                     </Button>
// //                   </Link>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default EquipmentDetail


// // import { useEffect, useState } from 'react'
// // import { useParams, Link } from 'react-router-dom'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Badge } from '@/components/ui/badge'
// // import { Button } from '@/components/ui/button'
// // import { ArrowLeft, Package, Weight, Ruler, CheckCircle, AlertCircle, ShoppingCart, Image as ImageIcon } from 'lucide-react'
// // import { useCart, Equipment } from '@/contexts/CartContext'
// // import { useParams, Link, useLocation } from 'react-router-dom'

// // const EquipmentDetail = () => {
// //   const { id } = useParams<{ id: string }>()
// //   const [equipment, setEquipment] = useState<Equipment | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)
// //   const location = useLocation()
// //   const params = new URLSearchParams(location.search)
// //   const from = params.get('from') // 'cart' atau null

// //   // ✅ USE CART CONTEXT
// //   const { addToCart, isInCart, getCartItem, getTotalItems } = useCart()

// //   useEffect(() => {
// //     if (id) {
// //       fetchEquipmentDetail(parseInt(id))
// //     }
// //   }, [id])

// //   // ✅ PERBAIKI FUNCTION buildImageUrl - PINDAH KE ATAS SEBELUM fetchEquipmentDetail
// //   const buildImageUrl = (item: Equipment) => {
// //     if (!item.image_url) return null;
    
// //     console.log('🖼️ Original image_url:', item.image_url);
    
// //     // Jika sudah full URL, return as is
// //     if (item.image_url.startsWith('http')) {
// //       return item.image_url;
// //     }
    
// //     // ✅ PERBAIKAN: Pastikan path yang benar
// //     if (item.image_url.startsWith('/uploads/')) {
// //       // Path sudah lengkap dari root, tambahkan base URL
// //       return `http://localhost/PBL - KELANA OUTDOOR${item.image_url}`;
// //     }
    
// //     if (item.image_url.startsWith('uploads/')) {
// //       // Path tanpa slash di depan
// //       return `http://localhost/PBL - KELANA OUTDOOR/${item.image_url}`;
// //     }
    
// //     // Jika hanya nama file saja
// //     return `http://localhost/PBL - KELANA OUTDOOR/uploads/equipment/${item.image_url}`;
// //   };

// //   // ✅ ENHANCED handleImageError dengan lebih banyak fallback
// //   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, item: Equipment) => {
// //     const img = e.target as HTMLImageElement;
    
// //     console.log(`❌ Image load error for ${item.code}:`);
// //     console.log(`   Original URL: ${item.image_url}`);
// //     console.log(`   Failed URL: ${img.src}`);
// //     console.log(`   Trying fallback...`);
    
// //     // Hide failed image and show fallback
// //     img.style.display = 'none';
// //     const fallback = img.nextElementSibling as HTMLElement;
// //     if (fallback && fallback.classList.contains('image-fallback')) {
// //       fallback.style.display = 'flex';
// //     }
// //   };

// //   // ✅ TAMBAHKAN FUNCTION UNTUK HANDLE IMAGE LOAD SUCCESS
// //   const handleImageLoad = (item: Equipment) => {
// //     console.log(`✅ Image loaded successfully for ${item.code}`);
// //   };

// //   const fetchEquipmentDetail = async (equipmentId: number) => {
// //     try {
// //       setLoading(true)
// //       setError(null)
      
// //       console.log('🔍 Fetching equipment detail for ID:', equipmentId)
      
// //       // ✅ FETCH BY ID dari API
// //       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php?id=${equipmentId}`)
      
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`)
// //       }
      
// //       const text = await response.text()
// //       console.log('📄 Raw response:', text.substring(0, 200))
      
// //       const data = JSON.parse(text)
// //       console.log('✅ Parsed data:', data)
      
// //       // ✅ Debug image URL
// //       if (data.image_url) {
// //         console.log('🖼️ Equipment image URL:', data.image_url)
// //         console.log('🖼️ Full image URL will be:', buildImageUrl(data))
// //       }
      
// //       if (data.error) {
// //         throw new Error(data.message || 'Equipment tidak ditemukan')
// //       }

// //       if (data.equipment_id) {
// //         // Single equipment response
// //         setEquipment(data)
// //         console.log('✅ Equipment loaded:', data.name)
// //       } else if (Array.isArray(data)) {
// //         // Array response, find by ID
// //         const foundEquipment = data.find((item: any) => item.equipment_id === equipmentId)
// //         if (foundEquipment) {
// //           setEquipment(foundEquipment)
// //           console.log('✅ Equipment found in array:', foundEquipment.name)
// //         } else {
// //           throw new Error('Equipment tidak ditemukan')
// //         }
// //       } else {
// //         throw new Error('Equipment tidak ditemukan')
// //       }
      
// //     } catch (err) {
// //       console.error('❌ Error:', err)
// //       setError('Gagal memuat detail equipment')
      
// //       // ✅ FALLBACK DATA untuk testing
// //       const fallbackEquipment: Equipment = {
// //         equipment_id: parseInt(id || '1'),
// //         name: "Tenda Dome 4 Orang (FALLBACK)",
// //         code: "TENDA-001",
// //         description: "Tenda berkualitas tinggi untuk 4 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
// //         category: "tenda",
// //         size_capacity: "4 orang",
// //         dimensions: "300x200x150 cm",
// //         weight: 4.5,
// //         material: "Polyester 190T",
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
      
// //       setEquipment(fallbackEquipment)
      
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // ✅ SIMPLIFIED ADD TO CART
// //   const handleAddToCart = () => {
// //     if (!equipment) return
    
// //     console.log('🛒 Adding equipment to cart:', equipment.name)
// //     addToCart(equipment, 1)
// //     alert(`✅ ${equipment.name} ditambahkan ke keranjang!`)
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
// //           <p className="mt-4 text-gray-600">Memuat detail equipment...</p>
// //         </div>
// //       </div>
// //     )
// //   }

 
// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="container mx-auto px-4 py-8">
// //         {/* Back Button */}
// //         <Link to={from === 'cart' ? '/cart' : '/browse'}>
// //           <Button variant="ghost" className="mb-6">
// //             <ArrowLeft className="h-4 w-4 mr-2" />
// //             {from === 'cart' ? 'Kembali ke Keranjang' : 'Kembali ke Browse'}
// //           </Button>
// //         </Link>
// //         {/* ...existing code... */}
// //       </div>
// //     </div>
// //   )
// // }

// //   if (!equipment) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
// //           <p className="text-red-600 text-lg mb-4">Equipment tidak ditemukan</p>
// //           <Link to="/browse">
// //             <Button>Kembali ke Browse</Button>
// //           </Link>
// //         </div>
// //       </div>
// //     )
// //   }

// //   const isAvailable = equipment.stock_quantity > 0
// //   const itemInCart = isInCart(equipment.equipment_id)
// //   const cartItem = getCartItem(equipment.equipment_id)

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

// //         {/* Error Warning */}
// //         {error && (
// //           <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
// //             <p className="text-yellow-800 text-sm">
// //               ⚠️ {error} - Menampilkan data fallback untuk testing
// //             </p>
// //           </div>
// //         )}

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* ✅ ENHANCED: Equipment Image Section dengan Perfect Error Handling */}
// //           <div className="space-y-4">
// //             <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
// //               {equipment.image_url ? (
// //                 <>
// //                   <img 
// //                     key={`detail-img-${equipment.equipment_id}-${Date.now()}`}
// //                     src={buildImageUrl(equipment)}
// //                     alt={equipment.name}
// //                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
// //                     onError={(e) => handleImageError(e, equipment)}
// //                     onLoad={() => handleImageLoad(equipment)}
// //                     style={{ display: 'block' }}
// //                   />
// //                   {/* ✅ ENHANCED FALLBACK jika gambar error */}
// //                   <div className="image-fallback absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
// //                     <div className="text-center text-white p-6">
// //                       <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-70" />
// //                       <span className="text-4xl font-bold block mb-2">
// //                         {equipment.name.charAt(0)}
// //                       </span>
// //                       <p className="text-sm opacity-70 mb-2">Gambar tidak dapat dimuat</p>
// //                       <p className="text-xs opacity-50">{equipment.code}</p>
// //                       {/* Debug info */}
// //                       <div className="mt-3 text-xs opacity-60 bg-black bg-opacity-20 p-2 rounded max-w-full truncate">
// //                         Original: {equipment.image_url}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
// //                   <div className="text-center text-white">
// //                     <span className="text-6xl font-bold block mb-4">
// //                       {equipment.name.charAt(0)}
// //                     </span>
// //                     <p className="text-lg opacity-70">Belum ada gambar</p>
// //                     <p className="text-sm opacity-50 mt-2">{equipment.code}</p>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* ✅ Stock Badge */}
// //               <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
// //                 equipment.stock_quantity > 5 ? 'bg-green-500 text-white' :
// //                 equipment.stock_quantity > 0 ? 'bg-yellow-500 text-white' :
// //                 'bg-red-500 text-white'
// //               }`}>
// //                 {equipment.stock_quantity > 0 ? `${equipment.stock_quantity} unit` : 'Habis'}
// //               </div>

// //               {/* ✅ Condition Badge */}
// //               <div className={`absolute bottom-4 left-4 px-3 py-1 rounded text-sm font-medium ${
// //                 equipment.condition === 'baik' ? 'bg-green-600 text-white' :
// //                 equipment.condition === 'rusak_ringan' ? 'bg-yellow-600 text-white' :
// //                 'bg-red-600 text-white'
// //               }`}>
// //                 {equipment.condition}
// //               </div>
// //             </div>

// //             {/* ✅ CART SECTION */}
// //             <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
// //               <h3 className="font-medium text-blue-800 mb-2">
// //                 🛒 Simpan untuk nanti?
// //               </h3>
// //               <p className="text-sm text-blue-600 mb-3">
// //                 Tambahkan ke keranjang untuk booking multiple items
// //               </p>
              
// //               {itemInCart ? (
// //                 <div className="space-y-2">
// //                   <p className="text-sm text-green-600 font-medium">
// //                     ✅ Sudah di keranjang ({cartItem?.quantity})
// //                   </p>
// //                   <div className="flex gap-2">
// //                     <Link to="/cart" className="flex-1">
// //                       <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
// //                         <ShoppingCart className="h-4 w-4 mr-2" />
// //                         Lihat Keranjang
// //                       </Button>
// //                     </Link>
// //                     <Button 
// //                       onClick={handleAddToCart}
// //                       disabled={!isAvailable}
// //                       className="bg-blue-600 hover:bg-blue-700"
// //                       size="sm"
// //                     >
// //                       +1
// //                     </Button>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <Button 
// //                   onClick={handleAddToCart}
// //                   disabled={!isAvailable}
// //                   variant="outline"
// //                   className="w-full border-blue-600 text-blue-600 hover:bg-blue-100"
// //                 >
// //                   <ShoppingCart className="h-4 w-4 mr-2" />
// //                   Tambah ke Keranjang
// //                 </Button>
// //               )}

// //               {/* ✅ Enhanced Image Debug Info */}
// //               {equipment.image_url && (
// //                 <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
// //                   <p className="text-blue-700 font-mono break-all mb-1">
// //                     🖼️ Original: {equipment.image_url}
// //                   </p>
// //                   <p className="text-blue-700 font-mono break-all">
// //                     🔗 Built URL: {buildImageUrl(equipment)}
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Equipment Details */}
// //           <div className="space-y-6">
// //             <div>
// //               <div className="flex items-center gap-3 mb-2">
// //                 <Badge variant="secondary" className="bg-blue-100 text-blue-800">
// //                   {equipment.category.toUpperCase()}
// //                 </Badge>
// //                 <span className="text-sm text-gray-500">{equipment.code}</span>
// //               </div>
              
// //               <h1 className="text-3xl font-bold text-gray-900 mb-4">
// //                 {equipment.name}
// //               </h1>

// //               {equipment.description && (
// //                 <p className="text-gray-600 text-lg leading-relaxed mb-6">
// //                   {equipment.description}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Specifications */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Spesifikasi</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 {equipment.size_capacity && (
// //                   <div className="flex items-center gap-3">
// //                     <Package className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Kapasitas</p>
// //                       <p className="text-gray-600">{equipment.size_capacity}</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {equipment.dimensions && (
// //                   <div className="flex items-center gap-3">
// //                     <Ruler className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Dimensi</p>
// //                       <p className="text-gray-600">{equipment.dimensions}</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {equipment.weight && (
// //                   <div className="flex items-center gap-3">
// //                     <Weight className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Berat</p>
// //                       <p className="text-gray-600">{equipment.weight} kg</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {equipment.material && (
// //                   <div className="flex items-center gap-3">
// //                     <CheckCircle className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Material</p>
// //                       <p className="text-gray-600">{equipment.material}</p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>

// //             {/* Price and Availability */}
// //             <Card>
// //               <CardContent className="pt-6">
// //                 <div className="flex justify-between items-center mb-4">
// //                   <div>
// //                     <p className="text-3xl font-bold text-green-600">
// //                       Rp {equipment.price_per_day.toLocaleString('id-ID')}
// //                     </p>
// //                     <p className="text-gray-500">per 24 jam</p>
// //                   </div>
                  
// //                   <div className="text-right">
// //                     <p className="text-lg font-semibold">
// //                       {isAvailable ? (
// //                         <span className="text-green-600">
// //                           <CheckCircle className="inline h-5 w-5 mr-1" />
// //                           Tersedia ({equipment.stock_quantity})
// //                         </span>
// //                       ) : (
// //                         <span className="text-red-600">
// //                           <AlertCircle className="inline h-5 w-5 mr-1" />
// //                           Stok Habis
// //                         </span>
// //                       )}
// //                     </p>
// //                     <Badge variant={equipment.condition === 'baik' ? 'default' : 'secondary'}>
// //                       Kondisi: {equipment.condition}
// //                     </Badge>
// //                   </div>
// //                 </div>

// //                 {/* Rental Action */}
// //                 <Link 
// //                   to={`/booking/form?equipment_id=${equipment.equipment_id}`}
// //                   className="block"
// //                 >
// //                   <Button 
// //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// //                     disabled={!isAvailable}
// //                   >
// //                     {isAvailable ? '🎒 Sewa Sekarang' : '❌ Stok Tidak Tersedia'}
// //                   </Button>
// //                 </Link>

// //                 <p className="text-sm text-gray-500 text-center mt-3">
// //                   * Sistem sewa dihitung per 24 jam dengan toleransi keterlambatan 12 jam
// //                 </p>

// //                 {/* Quick Actions */}
// //                 <div className="flex gap-2 mt-4">
// //                   <Link to="/cart" className="flex-1">
// //                     <Button variant="outline" className="w-full text-sm">
// //                       Lihat Keranjang ({getTotalItems()})
// //                     </Button>
// //                   </Link>
                  
// //                   <Link to="/browse" className="flex-1">
// //                     <Button variant="outline" className="w-full text-sm">
// //                       Browse Lainnya
// //                     </Button>
// //                   </Link>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default EquipmentDetail


// // import { useEffect, useState } from 'react'
// // import { useParams, Link, useLocation } from 'react-router-dom'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Badge } from '@/components/ui/badge'
// // import { Button } from '@/components/ui/button'
// // import { ArrowLeft, Package, Weight, Ruler, CheckCircle, AlertCircle, ShoppingCart, Image as ImageIcon } from 'lucide-react'
// // import { useCart, Equipment } from '@/contexts/CartContext'

// // const EquipmentDetail = () => {
// //   const { id } = useParams<{ id: string }>()
// //   const [equipment, setEquipment] = useState<Equipment | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)
// //   const location = useLocation()
// //   const params = new URLSearchParams(location.search)
// //   const from = params.get('from') // 'cart' atau null

// //   const { addToCart, isInCart, getCartItem, getTotalItems } = useCart()

// //   useEffect(() => {
// //     if (id) {
// //       fetchEquipmentDetail(parseInt(id))
// //     }
// //     // eslint-disable-next-line
// //   }, [id])

// //   const buildImageUrl = (item: Equipment) => {
// //     if (!item.image_url) return null
// //     if (item.image_url.startsWith('http')) return item.image_url
// //     if (item.image_url.startsWith('/uploads/')) return `http://localhost/PBL-KELANA-OUTDOOR${item.image_url}`
// //     if (item.image_url.startsWith('uploads/')) return `http://localhost/PBL-KELANA-OUTDOOR/${item.image_url}`
// //     return `http://localhost/PBL-KELANA-OUTDOOR/uploads/equipment/${item.image_url}`
// //   }

// //   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, item: Equipment) => {
// //     const img = e.target as HTMLImageElement
// //     img.style.display = 'none'
// //     const fallback = img.nextElementSibling as HTMLElement
// //     if (fallback && fallback.classList.contains('image-fallback')) {
// //       fallback.style.display = 'flex'
// //     }
// //   }

// //   const handleImageLoad = (item: Equipment) => {
// //     // Success log (optional)
// //   }

// //   const fetchEquipmentDetail = async (equipmentId: number) => {
// //     try {
// //       setLoading(true)
// //       setError(null)
// //       const response = await fetch(`http://localhost/PBL - KELANA OUTDOOR/api/public/equipment.php?id=${equipmentId}`)
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
// //       const text = await response.text()
// //       const data = JSON.parse(text)
// //       if (data.error) throw new Error(data.message || 'Equipment tidak ditemukan')
// //       if (data.equipment_id) {
// //         setEquipment(data)
// //       } else if (Array.isArray(data)) {
// //         const foundEquipment = data.find((item: any) => item.equipment_id === equipmentId)
// //         if (foundEquipment) setEquipment(foundEquipment)
// //         else throw new Error('Equipment tidak ditemukan')
// //       } else {
// //         throw new Error('Equipment tidak ditemukan')
// //       }
// //     } catch (err) {
// //       setError('Gagal memuat detail equipment')
// //       const fallbackEquipment: Equipment = {
// //         equipment_id: parseInt(id || '1'),
// //         name: "Tenda Dome 4 Orang (FALLBACK)",
// //         code: "TENDA-001",
// //         description: "Tenda berkualitas tinggi untuk 4 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
// //         category: "tenda",
// //         size_capacity: "4 orang",
// //         dimensions: "300x200x150 cm",
// //         weight: 4.5,
// //         material: "Polyester 190T",
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
// //       setEquipment(fallbackEquipment)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const handleAddToCart = () => {
// //     if (!equipment) return
// //     addToCart(equipment, 1)
// //     alert(`✅ ${equipment.name} ditambahkan ke keranjang!`)
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
// //           <p className="mt-4 text-gray-600">Memuat detail equipment...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (!equipment) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
// //           <p className="text-red-600 text-lg mb-4">Equipment tidak ditemukan</p>
// //           <Link to="/browse">
// //             <Button>Kembali ke Browse</Button>
// //           </Link>
// //         </div>
// //       </div>
// //     )
// //   }

// //   const isAvailable = equipment.stock_quantity > 0
// //   const itemInCart = isInCart(equipment.equipment_id)
// //   const cartItem = getCartItem(equipment.equipment_id)

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="container mx-auto px-4 py-8">
// //         {/* Back Button */}
// //         <Link to={from === 'cart' ? '/cart' : '/browse'}>
// //           <Button variant="ghost" className="mb-6">
// //             <ArrowLeft className="h-4 w-4 mr-2" />
// //             {from === 'cart' ? 'Kembali ke Keranjang' : 'Kembali ke Browse'}
// //           </Button>
// //         </Link>

// //         {/* Error Warning */}
// //         {error && (
// //           <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
// //             <p className="text-yellow-800 text-sm">
// //               ⚠️ {error} - Menampilkan data fallback untuk testing
// //             </p>
// //           </div>
// //         )}

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* Equipment Image Section */}
// //           <div className="space-y-4">
// //             <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
// //               {equipment.image_url ? (
// //                 <>
// //                   <img
// //                     key={`detail-img-${equipment.equipment_id}-${Date.now()}`}
// //                     src={buildImageUrl(equipment)}
// //                     alt={equipment.name}
// //                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
// //                     onError={(e) => handleImageError(e, equipment)}
// //                     onLoad={() => handleImageLoad(equipment)}
// //                     style={{ display: 'block' }}
// //                   />
// //                   <div className="image-fallback absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
// //                     <div className="text-center text-white p-6">
// //                       <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-70" />
// //                       <span className="text-4xl font-bold block mb-2">
// //                         {equipment.name.charAt(0)}
// //                       </span>
// //                       <p className="text-sm opacity-70 mb-2">Gambar tidak dapat dimuat</p>
// //                       <p className="text-xs opacity-50">{equipment.code}</p>
// //                       <div className="mt-3 text-xs opacity-60 bg-black bg-opacity-20 p-2 rounded max-w-full truncate">
// //                         Original: {equipment.image_url}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
// //                   <div className="text-center text-white">
// //                     <span className="text-6xl font-bold block mb-4">
// //                       {equipment.name.charAt(0)}
// //                     </span>
// //                     <p className="text-lg opacity-70">Belum ada gambar</p>
// //                     <p className="text-sm opacity-50 mt-2">{equipment.code}</p>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Stock Badge */}
// //               <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
// //                 equipment.stock_quantity > 5 ? 'bg-green-500 text-white' :
// //                 equipment.stock_quantity > 0 ? 'bg-yellow-500 text-white' :
// //                 'bg-red-500 text-white'
// //               }`}>
// //                 {equipment.stock_quantity > 0 ? `${equipment.stock_quantity} unit` : 'Habis'}
// //               </div>

// //               {/* Condition Badge */}
// //               <div className={`absolute bottom-4 left-4 px-3 py-1 rounded text-sm font-medium ${
// //                 equipment.condition === 'baik' ? 'bg-green-600 text-white' :
// //                 equipment.condition === 'rusak_ringan' ? 'bg-yellow-600 text-white' :
// //                 'bg-red-600 text-white'
// //               }`}>
// //                 {equipment.condition}
// //               </div>
// //             </div>

// //             {/* Cart Section */}
// //             <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
// //               <h3 className="font-medium text-blue-800 mb-2">
// //                 🛒 Simpan untuk nanti?
// //               </h3>
// //               <p className="text-sm text-blue-600 mb-3">
// //                 Tambahkan ke keranjang untuk booking multiple items
// //               </p>
// //               {itemInCart ? (
// //                 <div className="space-y-2">
// //                   <p className="text-sm text-green-600 font-medium">
// //                     ✅ Sudah di keranjang ({cartItem?.quantity})
// //                   </p>
// //                   <div className="flex gap-2">
// //                     <Link to="/cart" className="flex-1">
// //                       <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
// //                         <ShoppingCart className="h-4 w-4 mr-2" />
// //                         Lihat Keranjang
// //                       </Button>
// //                     </Link>
// //                     <Button
// //                       onClick={handleAddToCart}
// //                       disabled={!isAvailable}
// //                       className="bg-blue-600 hover:bg-blue-700"
// //                       size="sm"
// //                     >
// //                       +1
// //                     </Button>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <Button
// //                   onClick={handleAddToCart}
// //                   disabled={!isAvailable}
// //                   variant="outline"
// //                   className="w-full border-blue-600 text-blue-600 hover:bg-blue-100"
// //                 >
// //                   <ShoppingCart className="h-4 w-4 mr-2" />
// //                   Tambah ke Keranjang
// //                 </Button>
// //               )}
// //               {equipment.image_url && (
// //                 <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
// //                   <p className="text-blue-700 font-mono break-all mb-1">
// //                     🖼️ Original: {equipment.image_url}
// //                   </p>
// //                   <p className="text-blue-700 font-mono break-all">
// //                     🔗 Built URL: {buildImageUrl(equipment)}
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Equipment Details */}
// //           <div className="space-y-6">
// //             <div>
// //               <div className="flex items-center gap-3 mb-2">
// //                 <Badge variant="secondary" className="bg-blue-100 text-blue-800">
// //                   {equipment.category.toUpperCase()}
// //                 </Badge>
// //                 <span className="text-sm text-gray-500">{equipment.code}</span>
// //               </div>
// //               <h1 className="text-3xl font-bold text-gray-900 mb-4">
// //                 {equipment.name}
// //               </h1>
// //               {equipment.description && (
// //                 <p className="text-gray-600 text-lg leading-relaxed mb-6">
// //                   {equipment.description}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Specifications */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Spesifikasi</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 {equipment.size_capacity && (
// //                   <div className="flex items-center gap-3">
// //                     <Package className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Kapasitas</p>
// //                       <p className="text-gray-600">{equipment.size_capacity}</p>
// //                     </div>
// //                   </div>
// //                 )}
// //                 {equipment.dimensions && (
// //                   <div className="flex items-center gap-3">
// //                     <Ruler className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Dimensi</p>
// //                       <p className="text-gray-600">{equipment.dimensions}</p>
// //                     </div>
// //                   </div>
// //                 )}
// //                 {equipment.weight && (
// //                   <div className="flex items-center gap-3">
// //                     <Weight className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Berat</p>
// //                       <p className="text-gray-600">{equipment.weight} kg</p>
// //                     </div>
// //                   </div>
// //                 )}
// //                 {equipment.material && (
// //                   <div className="flex items-center gap-3">
// //                     <CheckCircle className="h-5 w-5 text-gray-500" />
// //                     <div>
// //                       <p className="font-medium">Material</p>
// //                       <p className="text-gray-600">{equipment.material}</p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>

// //             {/* Price and Availability */}
// //             <Card>
// //               <CardContent className="pt-6">
// //                 <div className="flex justify-between items-center mb-4">
// //                   <div>
// //                     <p className="text-3xl font-bold text-green-600">
// //                       Rp {equipment.price_per_day.toLocaleString('id-ID')}
// //                     </p>
// //                     <p className="text-gray-500">per 24 jam</p>
// //                   </div>
// //                   <div className="text-right">
// //                     <p className="text-lg font-semibold">
// //                       {isAvailable ? (
// //                         <span className="text-green-600">
// //                           <CheckCircle className="inline h-5 w-5 mr-1" />
// //                           Tersedia ({equipment.stock_quantity})
// //                         </span>
// //                       ) : (
// //                         <span className="text-red-600">
// //                           <AlertCircle className="inline h-5 w-5 mr-1" />
// //                           Stok Habis
// //                         </span>
// //                       )}
// //                     </p>
// //                     <Badge variant={equipment.condition === 'baik' ? 'default' : 'secondary'}>
// //                       Kondisi: {equipment.condition}
// //                     </Badge>
// //                   </div>
// //                 </div>
// //                 <Link
// //                   to={`/booking/form?equipment_id=${equipment.equipment_id}`}
// //                   className="block"
// //                 >
// //                   <Button
// //                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
// //                     disabled={!isAvailable}
// //                   >
// //                     {isAvailable ? '🎒 Sewa Sekarang' : '❌ Stok Tidak Tersedia'}
// //                   </Button>
// //                 </Link>
// //                 <p className="text-sm text-gray-500 text-center mt-3">
// //                   * Sistem sewa dihitung per 24 jam dengan toleransi keterlambatan 12 jam
// //                 </p>
// //                 <div className="flex gap-2 mt-4">
// //                   <Link to="/cart" className="flex-1">
// //                     <Button variant="outline" className="w-full text-sm">
// //                       Lihat Keranjang ({getTotalItems()})
// //                     </Button>
// //                   </Link>
// //                   <Link to="/browse" className="flex-1">
// //                     <Button variant="outline" className="w-full text-sm">
// //                       Browse Lainnya
// //                     </Button>
// //                   </Link>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default EquipmentDetail


// import { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { 
//   ArrowLeft, Package, Weight, Ruler, CheckCircle, AlertCircle, 
//   ShoppingCart, Star, FileText, BookOpen, Shield,
//   ChevronLeft, ChevronRight, ImageIcon
// } from 'lucide-react'

// const EquipmentDetailV2 = () => {
//   const [activeTab, setActiveTab] = useState('detail')
//   const [quantity, setQuantity] = useState(1)
  
//   // Mock data - nanti replace dengan data dari API
//   const equipment = {
//     equipment_id: 1,
//     name: "Tenda Dome 4 Orang Premium",
//     code: "TENDA-001",
//     description: "Tenda berkualitas tinggi untuk 4 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor. Material premium dengan ventilasi optimal.",
//     category: "tenda",
//     size_capacity: "4 orang",
//     dimensions: "300x200x150 cm",
//     weight: 4.5,
//     material: "Polyester 190T Waterproof",
//     stock_quantity: 5,
//     price_per_day: 60000,
//     condition: "baik",
//     image_url: null,
//     rating: 4.8,
//     total_reviews: 127,
//     total_rentals: 450
//   }

//   const reviews = [
//     {
//       id: 1,
//       user: "Budi Santoso",
//       rating: 5,
//       date: "2 minggu lalu",
//       comment: "Tenda sangat bagus! Waterproof beneran, kemarin kehujanan tetap kering. Pemasangannya juga mudah, cuma 10 menit udah jadi.",
//       images: []
//     },
//     {
//       id: 2,
//       user: "Siti Nurhaliza",
//       rating: 5,
//       date: "1 bulan lalu",
//       comment: "Recommended banget! Ownernya baik, barang bersih dan terawat. Kemarin camping di Ranca Upas pake tenda ini, nyaman banget.",
//       images: []
//     },
//     {
//       id: 3,
//       user: "Ahmad Rizki",
//       rating: 4,
//       date: "2 bulan lalu",
//       comment: "Bagus sih, cuma agak berat aja kalo dibawa hiking. Tapi untuk car camping perfect!",
//       images: []
//     }
//   ]

//   const usageGuide = [
//     {
//       step: 1,
//       title: "Persiapan Area",
//       description: "Pilih area datar, bersihkan dari batu/duri. Bentangkan groundsheet terlebih dahulu."
//     },
//     {
//       step: 2,
//       title: "Pasang Rangka",
//       description: "Masukkan tiang ke lubang pojok, pasang secara diagonal. Pastikan terkunci dengan baik."
//     },
//     {
//       step: 3,
//       title: "Pasang Flysheet",
//       description: "Tutup dengan flysheet, kencangkan tali-tali pengencang. Pastikan tidak ada bagian yang kendor."
//     },
//     {
//       step: 4,
//       title: "Fiksasi",
//       description: "Pasang pasak di setiap titik pengait. Sesuaikan ketegangan tali guy line."
//     }
//   ]

//   const terms = [
//     {
//       title: "Ketentuan Peminjaman",
//       items: [
//         "Peminjaman minimal 1 hari (24 jam)",
//         "Booking minimal H-1 (tidak bisa same-day)",
//         "Pengambilan barang sesuai jadwal yang disepakati",
//         "Terlambat pengambilan maksimal 2 jam dari jadwal"
//       ]
//     },
//     {
//       title: "Ketentuan Pengembalian",
//       items: [
//         "Barang dikembalikan dalam kondisi bersih",
//         "Toleransi keterlambatan 12 jam tanpa charge",
//         "Keterlambatan > 12 jam dikenakan biaya sewa 1 hari penuh",
//         "Kerusakan akan dikenakan biaya ganti rugi"
//       ]
//     },
//     {
//       title: "Tanggung Jawab Penyewa",
//       items: [
//         "Menjaga barang dengan baik selama masa sewa",
//         "Tidak memindahtangankan kepada pihak lain",
//         "Melaporkan kerusakan sebelum pengembalian",
//         "Membersihkan barang sebelum dikembalikan"
//       ]
//     },
//     {
//       title: "Kebijakan Pembatalan",
//       items: [
//         "Pembatalan H-2 atau lebih: Full refund",
//         "Pembatalan H-1: Refund 50%",
//         "Pembatalan H-0: Tidak ada refund",
//         "Force majeure akan dipertimbangkan case by case"
//       ]
//     }
//   ]

//   const handleAddToCart = () => {
//     alert(`✅ ${equipment.name} (${quantity}x) ditambahkan ke keranjang!\n💰 Rp ${(equipment.price_per_day * quantity).toLocaleString('id-ID')}/hari`)
//   }

//   const renderStars = (rating) => {
//     return (
//       <div className="flex items-center gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`h-4 w-4 ${
//               star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
//             }`}
//           />
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         {/* Breadcrumb */}
//         <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
//           <button className="hover:text-green-600 flex items-center gap-1">
//             <ArrowLeft className="h-4 w-4" />
//             Browse
//           </button>
//           <span>/</span>
//           <span className="capitalize">{equipment.category}</span>
//           <span>/</span>
//           <span className="text-gray-900 font-medium truncate max-w-md">{equipment.name}</span>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {/* LEFT - Image Gallery */}
//           <div className="lg:col-span-4">
//             <div className="sticky top-4 space-y-4">
//               {/* Main Image */}
//               <div className="relative bg-white rounded-xl overflow-hidden shadow-sm">
//                 <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center relative">
//                   <div className="text-center text-white">
//                     <span className="text-8xl font-bold block mb-4">
//                       {equipment.name.charAt(0)}
//                     </span>
//                     <p className="text-xl opacity-70">Preview Image</p>
//                     <p className="text-sm opacity-50 mt-2">{equipment.code}</p>
//                   </div>
                  
//                   {/* Image Navigation */}
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//                     <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg">
//                       <ChevronLeft className="h-4 w-4 text-gray-700" />
//                     </button>
//                     <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg">
//                       <ChevronRight className="h-4 w-4 text-gray-700" />
//                     </button>
//                   </div>

//                   {/* Badges Overlay */}
//                   <div className="absolute top-4 right-4 flex flex-col gap-2">
//                     <Badge className="bg-green-500 text-white font-bold shadow-lg">
//                       {equipment.stock_quantity} Unit
//                     </Badge>
//                     <Badge className="bg-blue-500 text-white capitalize shadow-lg">
//                       {equipment.condition}
//                     </Badge>
//                   </div>
//                 </div>
//               </div>

//               {/* Thumbnail Images */}
//               <div className="grid grid-cols-4 gap-2">
//                 {[1, 2, 3, 4].map((thumb) => (
//                   <button
//                     key={thumb}
//                     className="aspect-square bg-gradient-to-br from-green-300 to-green-500 rounded-lg hover:ring-2 hover:ring-green-600 transition flex items-center justify-center"
//                   >
//                     <ImageIcon className="h-6 w-6 text-white opacity-70" />
//                   </button>
//                 ))}
//               </div>

//               {/* Quick Stats */}
//               <div className="grid grid-cols-3 gap-2">
//                 <Card className="text-center">
//                   <CardContent className="pt-4 pb-4">
//                     <Star className="h-5 w-5 mx-auto mb-1 text-yellow-400 fill-yellow-400" />
//                     <div className="text-xl font-bold">{equipment.rating}</div>
//                     <div className="text-xs text-gray-500">{equipment.total_reviews} Reviews</div>
//                   </CardContent>
//                 </Card>
//                 <Card className="text-center">
//                   <CardContent className="pt-4 pb-4">
//                     <CheckCircle className="h-5 w-5 mx-auto mb-1 text-green-500" />
//                     <div className="text-xl font-bold">{equipment.total_rentals}</div>
//                     <div className="text-xs text-gray-500">Kali Disewa</div>
//                   </CardContent>
//                 </Card>
//                 <Card className="text-center">
//                   <CardContent className="pt-4 pb-4">
//                     <Package className="h-5 w-5 mx-auto mb-1 text-blue-500" />
//                     <div className="text-xl font-bold">{equipment.stock_quantity}</div>
//                     <div className="text-xs text-gray-500">Stok Ready</div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>

//           {/* CENTER - Detail Content with Tabs */}
//           <div className="lg:col-span-5">
//             <Card>
//               <CardHeader className="border-b pb-4">
//                 {/* Product Name & Badge */}
//                 <div className="flex items-start justify-between gap-4 mb-4">
//                   <div className="flex-1">
//                     <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-2">
//                       {equipment.category.toUpperCase()}
//                     </Badge>
//                     <h1 className="text-2xl font-bold text-gray-900 mb-1">
//                       {equipment.name}
//                     </h1>
//                     <p className="text-sm text-gray-500">{equipment.code}</p>
//                   </div>
//                 </div>

//                 {/* Tab Navigation */}
//                 <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
//                   {[
//                     { id: 'detail', label: 'Detail Produk', icon: Package },
//                     { id: 'reviews', label: 'Reviews', icon: Star },
//                     { id: 'guide', label: 'Cara Pakai', icon: BookOpen },
//                     { id: 'terms', label: 'Perjanjian Sewa', icon: Shield }
//                   ].map((tab) => {
//                     const Icon = tab.icon
//                     return (
//                       <button
//                         key={tab.id}
//                         onClick={() => setActiveTab(tab.id)}
//                         className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap text-sm font-medium ${
//                           activeTab === tab.id
//                             ? 'bg-green-600 text-white'
//                             : 'hover:bg-gray-100 text-gray-600'
//                         }`}
//                       >
//                         <Icon className="h-4 w-4" />
//                         {tab.label}
//                       </button>
//                     )
//                   })}
//                 </div>
//               </CardHeader>

//               <CardContent className="pt-6 max-h-[600px] overflow-y-auto">
//                 {/* Detail Tab */}
//                 {activeTab === 'detail' && (
//                   <div className="space-y-6">
//                     <div>
//                       <p className="text-gray-600 leading-relaxed">
//                         {equipment.description}
//                       </p>
//                     </div>

//                     <div>
//                       <h3 className="font-semibold text-lg mb-4">Spesifikasi Teknis</h3>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                           <Package className="h-5 w-5 text-gray-500 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-sm">Kapasitas</p>
//                             <p className="text-gray-600 text-sm">{equipment.size_capacity}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                           <Ruler className="h-5 w-5 text-gray-500 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-sm">Dimensi</p>
//                             <p className="text-gray-600 text-sm">{equipment.dimensions}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                           <Weight className="h-5 w-5 text-gray-500 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-sm">Berat</p>
//                             <p className="text-gray-600 text-sm">{equipment.weight} kg</p>
//                           </div>
//                         </div>
//                         <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                           <CheckCircle className="h-5 w-5 text-gray-500 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-sm">Material</p>
//                             <p className="text-gray-600 text-sm">{equipment.material}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="border-t pt-6">
//                       <h3 className="font-semibold text-base mb-3">Yang Termasuk dalam Sewa:</h3>
//                       <ul className="space-y-2">
//                         <li className="flex items-center gap-2 text-gray-600 text-sm">
//                           <CheckCircle className="h-4 w-4 text-green-500" />
//                           1x Tenda lengkap dengan rangka
//                         </li>
//                         <li className="flex items-center gap-2 text-gray-600 text-sm">
//                           <CheckCircle className="h-4 w-4 text-green-500" />
//                           Pasak dan tali-tali pengencang
//                         </li>
//                         <li className="flex items-center gap-2 text-gray-600 text-sm">
//                           <CheckCircle className="h-4 w-4 text-green-500" />
//                           Tas carrier
//                         </li>
//                         <li className="flex items-center gap-2 text-gray-600 text-sm">
//                           <CheckCircle className="h-4 w-4 text-green-500" />
//                           Panduan pemasangan
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 )}

//                 {/* Reviews Tab */}
//                 {activeTab === 'reviews' && (
//                   <div className="space-y-6">
//                     <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
//                       <div className="flex items-center gap-6">
//                         <div className="text-center">
//                           <div className="text-5xl font-bold text-gray-900">{equipment.rating}</div>
//                           <div className="flex justify-center mt-2">
//                             {renderStars(5)}
//                           </div>
//                           <p className="text-sm text-gray-600 mt-1">{equipment.total_reviews} reviews</p>
//                         </div>
//                         <div className="flex-1">
//                           <div className="space-y-2">
//                             {[5, 4, 3, 2, 1].map((star) => (
//                               <div key={star} className="flex items-center gap-2">
//                                 <span className="text-sm w-8">{star} ★</span>
//                                 <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                   <div 
//                                     className="h-full bg-yellow-400"
//                                     style={{ width: star === 5 ? '95%' : star === 4 ? '4%' : '1%' }}
//                                   />
//                                 </div>
//                                 <span className="text-sm text-gray-600 w-12 text-right">
//                                   {star === 5 ? '119' : star === 4 ? '5' : '3'}
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       {reviews.map((review) => (
//                         <Card key={review.id}>
//                           <CardContent className="pt-6">
//                             <div className="flex items-start justify-between mb-3">
//                               <div>
//                                 <p className="font-semibold">{review.user}</p>
//                                 <p className="text-sm text-gray-500">{review.date}</p>
//                               </div>
//                               {renderStars(review.rating)}
//                             </div>
//                             <p className="text-gray-600 text-sm">{review.comment}</p>
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>

//                     <Button variant="outline" className="w-full">
//                       Lihat Semua Reviews ({equipment.total_reviews})
//                     </Button>
//                   </div>
//                 )}

//                 {/* Usage Guide Tab */}
//                 {activeTab === 'guide' && (
//                   <div className="space-y-6">
//                     <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
//                       <div className="flex items-start gap-3">
//                         <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
//                         <div>
//                           <p className="font-medium text-blue-900">Panduan Lengkap</p>
//                           <p className="text-sm text-blue-700 mt-1">
//                             Ikuti langkah-langkah berikut untuk pemasangan yang optimal
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {usageGuide.map((step) => (
//                       <div key={step.step} className="flex gap-4">
//                         <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
//                           {step.step}
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-semibold text-base mb-2">{step.title}</h4>
//                           <p className="text-gray-600 text-sm">{step.description}</p>
//                         </div>
//                       </div>
//                     ))}

//                     <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-6">
//                       <div className="flex items-start gap-3">
//                         <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
//                         <div>
//                           <p className="font-medium text-yellow-900">Tips Penting</p>
//                           <ul className="text-sm text-yellow-700 mt-2 space-y-1">
//                             <li>• Latihan pemasangan di rumah sebelum ke lokasi camping</li>
//                             <li>• Pastikan area pemasangan rata dan aman</li>
//                             <li>• Jangan paksa tiang jika terasa macet</li>
//                             <li>• Simpan semua aksesoris di tas carrier setelah digunakan</li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Terms Tab */}
//                 {activeTab === 'terms' && (
//                   <div className="space-y-6">
//                     <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
//                       <div className="flex items-start gap-3">
//                         <Shield className="h-5 w-5 text-red-600 mt-0.5" />
//                         <div>
//                           <p className="font-medium text-red-900">Wajib Dibaca</p>
//                           <p className="text-sm text-red-700 mt-1">
//                             Dengan melakukan pemesanan, Anda menyetujui seluruh ketentuan berikut
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {terms.map((section, idx) => (
//                       <div key={idx}>
//                         <h3 className="font-semibold text-base mb-3">{section.title}</h3>
//                         <ul className="space-y-2">
//                           {section.items.map((item, itemIdx) => (
//                             <li key={itemIdx} className="flex items-start gap-2 text-gray-600 text-sm">
//                               <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
//                               <span>{item}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ))}

//                     <div className="bg-gray-50 p-4 rounded mt-6">
//                       <p className="text-sm text-gray-600 text-center">
//                         Untuk informasi lebih lanjut, hubungi kami via WhatsApp di{' '}
//                         <a href="https://wa.me/6281234567890" className="text-green-600 font-medium hover:underline">
//                           +62 812-3456-7890
//                         </a>
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* RIGHT - Cart Sidebar (Sticky) */}
//           <div className="lg:col-span-3">
//             <Card className="sticky top-4">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-lg">Atur Jumlah & Catatan</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Price */}
//                 <div className="text-center pb-4 border-b">
//                   <div className="text-3xl font-bold text-green-600">
//                     Rp {equipment.price_per_day.toLocaleString('id-ID')}
//                   </div>
//                   <p className="text-sm text-gray-500">per 24 jam</p>
//                 </div>

//                 {/* Stock Info */}
//                 <div className="bg-green-50 p-3 rounded-lg text-center">
//                   <p className="text-sm font-medium text-green-900">
//                     Stok Tersedia: <span className="font-bold">{equipment.stock_quantity} unit</span>
//                   </p>
//                 </div>

//                 {/* Quantity Selector */}
//                 <div>
//                   <label className="text-sm font-medium mb-2 block">
//                     Jumlah
//                   </label>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center font-bold text-lg"
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       value={quantity}
//                       onChange={(e) => setQuantity(Math.max(1, Math.min(equipment.stock_quantity, parseInt(e.target.value) || 1)))}
//                       className="flex-1 text-center border-2 border-gray-300 rounded-lg py-2 font-bold text-lg"
//                       min="1"
//                       max={equipment.stock_quantity}
//                     />
//                     <button
//                       onClick={() => setQuantity(Math.min(equipment.stock_quantity, quantity + 1))}
//                       className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center font-bold text-lg"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 {/* Subtotal */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm text-gray-600">Subtotal</span>
//                     <span className="text-sm font-medium">
//                       Rp {equipment.price_per_day.toLocaleString('id-ID')} x {quantity}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center pt-2 border-t">
//                     <span className="font-semibold">Total</span>
//                     <span className="text-xl font-bold text-green-600">
//                       Rp {(equipment.price_per_day * quantity).toLocaleString('id-ID')}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-2 text-center">
//                     * Harga per hari sewa
//                   </p>
//                 </div>

//                 {/* Add to Cart Button */}
//                 <Button
//                   onClick={handleAddToCart}
//                   className="w-full bg-green-600 hover:bg-green-700 text-base py-6 font-semibold"
//                   disabled={equipment.stock_quantity === 0}
//                 >
//                   <ShoppingCart className="h-5 w-5 mr-2" />
//                   + Keranjang
//                 </Button>

//                 <p className="text-xs text-center text-gray-500">
//                   Pilih tanggal saat checkout
//                 </p>

//                 {/* Info Box */}
//                 <div className="bg-blue-50 p-3 rounded-lg space-y-2">
//                   <p className="text-xs font-semibold text-blue-900">📌 Info Penting:</p>
//                   <ul className="text-xs text-blue-700 space-y-1">
//                     <li>✓ Tanggal dipilih saat checkout</li>
//                     <li>✓ Booking minimal H-1</li>
//                     <li>✓ Pembayaran via WhatsApp</li>
//                     <li>✓ Toleransi terlambat 12 jam</li>
//                   </ul>
//                 </div>

//                 {/* Contact Button */}
//                 <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
//                   💬 Hubungi Kami
//                 </Button>

//                 {/* View Cart Link */}
//                 <Button variant="ghost" className="w-full text-gray-600 hover:text-green-600">
//                   Lihat Keranjang (0)
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EquipmentDetailV2
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, Package, Weight, Ruler, CheckCircle, AlertCircle, 
  ShoppingCart, Star, BookOpen, Shield,
  ChevronLeft, ChevronRight, ImageIcon, Loader2
} from 'lucide-react'

// ✅ INTERFACE
interface EquipmentImage {
  image_id: number;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

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
  price_per_day: number;
  condition: string;
  images: EquipmentImage[];
  primary_image?: string;
}

const EquipmentDetailV2 = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('detail')
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // ✅ API STATE
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ FIXED: Gunakan endpoint TANPA SPASI yang sama dengan API
  useEffect(() => {
    if (id) {
      fetchEquipmentDetail(parseInt(id))
    }
  }, [id])

  const fetchEquipmentDetail = async (equipmentId: number) => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔍 Fetching equipment detail for ID:', equipmentId)
      
      // ✅ FIXED: Gunakan endpoint TANPA SPASI
      const response = await fetch(`http://localhost/PBL-KELANA-OUTDOOR/api/public/equipment.php?id=${equipmentId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📥 Equipment detail response:', data)
      
      if (data.error) {
        throw new Error(data.message || 'Equipment tidak ditemukan')
      }

      // ✅ HANDLE BOTH SINGLE OBJECT AND ARRAY RESPONSE
      if (data.equipment_id) {
        setEquipment(data)
        console.log('✅ Equipment loaded:', data.name)
        console.log('🖼️ Images from API:', data.images)
      } else if (Array.isArray(data) && data.length > 0) {
        // Jika response adalah array, cari equipment by ID
        const foundEquipment = data.find((item: any) => item.equipment_id === equipmentId)
        if (foundEquipment) {
          setEquipment(foundEquipment)
          console.log('✅ Equipment loaded from array:', foundEquipment.name)
        } else {
          throw new Error('Equipment tidak ditemukan')
        }
      } else {
        throw new Error('Equipment tidak ditemukan')
      }
      
    } catch (err: any) {
      console.error('❌ Error fetching equipment:', err)
      setError('Gagal memuat detail equipment: ' + err.message)
      
      // ✅ FALLBACK DATA untuk testing
      const fallbackEquipment: Equipment = {
        equipment_id: parseInt(id || '1'),
        name: "Tenda Dome 4 Orang Premium",
        code: "TENDA-001",
        description: "Tenda berkualitas tinggi untuk 4 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
        category: "tenda",
        size_capacity: "4 orang",
        dimensions: "300x200x150 cm",
        weight: 4.5,
        material: "Polyester 190T Waterproof",
        stock_quantity: 5,
        available_stock: 5,
        price_per_day: 60000,
        condition: "baik",
        images: [
          {
            image_id: 1,
            image_url: 'https://via.placeholder.com/600x400/22c55e/ffffff?text=Tenda+Dome+4+Orang',
            is_primary: true,
            display_order: 1
          }
        ]
      }
      
      setEquipment(fallbackEquipment)
    } finally {
      setLoading(false)
    }
  }

  // ✅ IMAGE NAVIGATION
  const handlePrevImage = () => {
    if (!equipment?.images || equipment.images.length === 0) return
    setCurrentImageIndex((prev) => 
      prev > 0 ? prev - 1 : equipment.images.length - 1
    )
  }

  const handleNextImage = () => {
    if (!equipment?.images || equipment.images.length === 0) return
    setCurrentImageIndex((prev) => 
      prev < equipment.images.length - 1 ? prev + 1 : 0
    )
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleAddToCart = () => {
    if (!equipment) return
    alert(`✅ ${equipment.name} (${quantity}x) ditambahkan ke keranjang!\n💰 Rp ${(equipment.price_per_day * quantity).toLocaleString('id-ID')}/hari`)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail equipment...</p>
        </div>
      </div>
    )
  }

  // ✅ ERROR STATE
  if (error && !equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Equipment Tidak Ditemukan</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => navigate('/browse')}
              className="bg-green-600 hover:bg-green-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Browse
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Equipment Tidak Ditemukan</h3>
            <p className="text-gray-600 mb-4">Data equipment tidak tersedia</p>
            <Button 
              onClick={() => navigate('/browse')}
              className="bg-green-600 hover:bg-green-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Browse
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ✅ GET DISPLAY IMAGES (sorted by display_order)
  const displayImages = equipment.images && equipment.images.length > 0 
    ? equipment.images.sort((a, b) => a.display_order - b.display_order)
    : []
  
  const hasImages = displayImages.length > 0
  const currentImage = hasImages ? displayImages[currentImageIndex] : null

  // Mock data untuk reviews, guide, terms
  const mockRating = 4.8
  const mockTotalReviews = 127
  const mockTotalRentals = 450

  const reviews = [
    {
      id: 1,
      user: "Budi Santoso",
      rating: 5,
      date: "2 minggu lalu",
      comment: "Tenda sangat bagus! Waterproof beneran, kemarin kehujanan tetap kering. Pemasangannya juga mudah, cuma 10 menit udah jadi."
    }
  ]

  const usageGuide = [
    {
      step: 1,
      title: "Persiapan Area",
      description: "Pilih area datar, bersihkan dari batu/duri. Bentangkan groundsheet terlebih dahulu."
    }
  ]

  const terms = [
    {
      title: "Ketentuan Peminjaman",
      items: [
        "Peminjaman minimal 1 hari (24 jam)",
        "Booking minimal H-1 (tidak bisa same-day)"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <button 
            onClick={() => navigate('/browse')}
            className="hover:text-green-600 flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse
          </button>
          <span>/</span>
          <span className="capitalize">{equipment.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-md">{equipment.name}</span>
        </div>

        {/* Error Warning */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ {error} - Menampilkan data fallback untuk testing
            </p>
          </div>
        )}

        {/* ✅ DEBUG INFO - Tampilkan informasi gambar */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            🔍 Debug Info: {displayImages.length} gambar tersedia
            {hasImages && currentImage && (
              <span className="ml-2">• URL: {currentImage.image_url}</span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ✅ LEFT - REAL IMAGE GALLERY */}
          <div className="lg:col-span-4">
            <div className="sticky top-4 space-y-4">
              {/* Main Image */}
              <div className="relative bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center relative">
                  {hasImages && currentImage ? (
                    <>
                      {/* REAL IMAGE */}
                      <img
                        key={`main-img-${currentImage.image_id}`}
                        src={currentImage.image_url}
                        alt={`${equipment.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('❌ Gambar gagal dimuat:', currentImage.image_url)
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const fallback = target.nextElementSibling as HTMLElement
                          if (fallback) fallback.style.display = 'flex'
                        }}
                        onLoad={() => console.log('✅ Gambar berhasil dimuat:', currentImage.image_url)}
                      />
                      
                      {/* FALLBACK */}
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 items-center justify-center">
                        <div className="text-center text-white p-4">
                          <ImageIcon className="h-16 w-16 mx-auto mb-2 opacity-70" />
                          <p className="text-sm opacity-70">Gambar tidak dapat dimuat</p>
                          <p className="text-xs opacity-50 mt-1">URL: {currentImage.image_url}</p>
                        </div>
                      </div>

                      {/* PRIMARY BADGE */}
                      {currentImage.is_primary && (
                        <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          ⭐ Gambar Utama
                        </div>
                      )}

                      {/* IMAGE COUNTER */}
                      {displayImages.length > 1 && (
                        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          {currentImageIndex + 1} / {displayImages.length}
                        </div>
                      )}

                      {/* STOCK & CONDITION BADGES */}
                      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                        <Badge className="bg-green-500 text-white font-bold shadow-lg">
                          {equipment.stock_quantity} Unit
                        </Badge>
                        <Badge className="bg-blue-500 text-white capitalize shadow-lg">
                          {equipment.condition}
                        </Badge>
                      </div>

                      {/* NAVIGATION BUTTONS */}
                      {displayImages.length > 1 && (
                        <>
                          <button 
                            onClick={handlePrevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                          >
                            <ChevronLeft className="h-5 w-5 text-gray-700" />
                          </button>
                          <button 
                            onClick={handleNextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-700" />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    /* NO IMAGE PLACEHOLDER */
                    <div className="text-center text-white">
                      <span className="text-8xl font-bold block mb-4">
                        {equipment.name.charAt(0)}
                      </span>
                      <p className="text-xl opacity-70">Belum ada gambar</p>
                      <p className="text-sm opacity-50 mt-2">{equipment.code}</p>
                      <p className="text-xs opacity-30 mt-4">Total gambar: {displayImages.length}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ✅ THUMBNAIL IMAGES - REAL DATA */}
              {displayImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {displayImages.map((img, idx) => (
                    <button
                      key={img.image_id}
                      onClick={() => handleThumbnailClick(idx)}
                      className={`aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-green-600 transition relative ${
                        idx === currentImageIndex ? 'ring-2 ring-green-600' : ''
                      }`}
                    >
                      <img
                        src={img.image_url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3C/svg%3E'
                        }}
                      />
                      {img.is_primary && (
                        <div className="absolute top-0 left-0 bg-yellow-500 text-white text-[10px] px-1 rounded-br">
                          ★
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2">
                <Card className="text-center">
                  <CardContent className="pt-4 pb-4">
                    <Star className="h-5 w-5 mx-auto mb-1 text-yellow-400 fill-yellow-400" />
                    <div className="text-xl font-bold">{mockRating}</div>
                    <div className="text-xs text-gray-500">{mockTotalReviews} Reviews</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 pb-4">
                    <CheckCircle className="h-5 w-5 mx-auto mb-1 text-green-500" />
                    <div className="text-xl font-bold">{mockTotalRentals}</div>
                    <div className="text-xs text-gray-500">Kali Disewa</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 pb-4">
                    <Package className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <div className="text-xl font-bold">{equipment.stock_quantity}</div>
                    <div className="text-xs text-gray-500">Stok Ready</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* CENTER - Detail Content dengan Tabs */}
          <div className="lg:col-span-5">
            <Card>
              <CardHeader className="border-b pb-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-2">
                      {equipment.category.toUpperCase()}
                    </Badge>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      {equipment.name}
                    </h1>
                    <p className="text-sm text-gray-500">{equipment.code}</p>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
                  {[
                    { id: 'detail', label: 'Detail Produk', icon: Package },
                    { id: 'reviews', label: 'Reviews', icon: Star },
                    { id: 'guide', label: 'Cara Pakai', icon: BookOpen },
                    { id: 'terms', label: 'Perjanjian Sewa', icon: Shield }
                  ].map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap text-sm font-medium ${
                          activeTab === tab.id
                            ? 'bg-green-600 text-white'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
              </CardHeader>

              <CardContent className="pt-6 max-h-[600px] overflow-y-auto">
                {/* Detail Tab */}
                {activeTab === 'detail' && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-600 leading-relaxed">
                        {equipment.description || 'Tidak ada deskripsi untuk equipment ini.'}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Spesifikasi Teknis</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {equipment.size_capacity && (
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <Package className="h-5 w-5 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">Kapasitas</p>
                              <p className="text-gray-600 text-sm">{equipment.size_capacity}</p>
                            </div>
                          </div>
                        )}
                        {equipment.dimensions && (
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <Ruler className="h-5 w-5 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">Dimensi</p>
                              <p className="text-gray-600 text-sm">{equipment.dimensions}</p>
                            </div>
                          </div>
                        )}
                        {equipment.weight && equipment.weight > 0 && (
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <Weight className="h-5 w-5 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">Berat</p>
                              <p className="text-gray-600 text-sm">{equipment.weight} kg</p>
                            </div>
                          </div>
                        )}
                        {equipment.material && (
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">Material</p>
                              <p className="text-gray-600 text-sm">{equipment.material}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-semibold text-base mb-3">Yang Termasuk dalam Sewa:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-600 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          1x {equipment.name} lengkap dengan rangka
                        </li>
                        <li className="flex items-center gap-2 text-gray-600 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Pasak dan tali-tali pengencang
                        </li>
                        <li className="flex items-center gap-2 text-gray-600 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Tas carrier
                        </li>
                        <li className="flex items-center gap-2 text-gray-600 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Panduan pemasangan
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tabs lainnya... */}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT - Cart Sidebar */}
          <div className="lg:col-span-3">
            <Card className="sticky top-4">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Atur Jumlah & Catatan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center pb-4 border-b">
                  <div className="text-3xl font-bold text-green-600">
                    Rp {equipment.price_per_day.toLocaleString('id-ID')}
                  </div>
                  <p className="text-sm text-gray-500">per 24 jam</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium text-green-900">
                    Stok Tersedia: <span className="font-bold">{equipment.stock_quantity} unit</span>
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Jumlah</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center font-bold text-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(equipment.stock_quantity, parseInt(e.target.value) || 1)))}
                      className="flex-1 text-center border-2 border-gray-300 rounded-lg py-2 font-bold text-lg"
                      min="1"
                      max={equipment.stock_quantity}
                    />
                    <button
                      onClick={() => setQuantity(Math.min(equipment.stock_quantity, quantity + 1))}
                      className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm font-medium">
                      Rp {(equipment.price_per_day * quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-green-600">
                      Rp {(equipment.price_per_day * quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    * Harga belum termasuk biaya tambahan
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-semibold"
                    onClick={handleAddToCart}
                    disabled={equipment.stock_quantity === 0}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {equipment.stock_quantity === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                  </Button>
                  
                  <Button variant="outline" className="w-full h-12">
                    Hubungi Kami via WhatsApp
                  </Button>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Pickup tersedia saat checkout</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Free cancellation 24 jam</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Booking minimal 1 hari</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Konfirmasi via WhatsApp</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Support teknis 12 jam</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipmentDetailV2