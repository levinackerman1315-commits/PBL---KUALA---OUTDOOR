// // import { useEffect, useState } from 'react'
// // import { useParams, Link } from 'react-router-dom'
// // import { equipmentAPI, Equipment } from '@/lib/api'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Badge } from '@/components/ui/badge'
// // import { Button } from '@/components/ui/button'
// // import { ArrowLeft, Package, Weight, Ruler, CheckCircle, AlertCircle } from 'lucide-react'

// // const EquipmentDetail = () => {
// //   const { id } = useParams<{ id: string }>()
// //   const [equipment, setEquipment] = useState<Equipment | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)

// //   useEffect(() => {
// //     if (id) {
// //       fetchEquipmentDetail(parseInt(id))
// //     }
// //   }, [id])

// //   const fetchEquipmentDetail = async (equipmentId: number) => {
// //     try {
// //       setLoading(true)
// //       const response = await equipmentAPI.getById(equipmentId)
      
// //       if (response.data.status === 'success') {
// //         setEquipment(response.data.data)
// //       } else {
// //         setError('Equipment tidak ditemukan')
// //       }
// //     } catch (err) {
// //       console.error('Error:', err)
// //       setError('Gagal memuat detail equipment')
// //     } finally {
// //       setLoading(false)
// //     }
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

// //   if (error || !equipment) {
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

// //   const isAvailable = equipment.stock_quantity > 0

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
// //                     {isAvailable ? 'Sewa Sekarang' : 'Stok Tidak Tersedia'}
// //                   </Button>
// //                 </Link>

// //                 <p className="text-sm text-gray-500 text-center mt-3">
// //                   * Sistem sewa dihitung per 24 jam dengan toleransi keterlambatan 12 jam
// //                 </p>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default EquipmentDetail

// import { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { equipmentAPI, Equipment } from '@/lib/api'
// import { useCart } from '@/contexts/CartContext'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { ArrowLeft, Package, Weight, Ruler, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react'

// const EquipmentDetail = () => {
//   const { id } = useParams<{ id: string }>()
//   const [equipment, setEquipment] = useState<Equipment | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
  
//   const { addToCart, isInCart, getCartItem } = useCart()

//   useEffect(() => {
//     if (id) {
//       fetchEquipmentDetail(parseInt(id))
//     }
//   }, [id])

//   const fetchEquipmentDetail = async (equipmentId: number) => {
//     try {
//       setLoading(true)
//       const response = await equipmentAPI.getById(equipmentId)
      
//       if (response.data.status === 'success') {
//         setEquipment(response.data.data)
//       } else {
//         setError('Equipment tidak ditemukan')
//       }
//     } catch (err) {
//       console.error('Error:', err)
//       setError('Gagal memuat detail equipment')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleAddToCart = () => {
//     if (!equipment) return
    
//     addToCart(equipment, 1)
//     alert(`✅ ${equipment.name} telah ditambahkan ke keranjang!`)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Memuat detail equipment...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error || !equipment) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//           <p className="text-red-600 text-lg mb-4">{error || 'Equipment tidak ditemukan'}</p>
//           <Link to="/browse">
//             <Button>Kembali ke Browse</Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const isAvailable = equipment.stock_quantity > 0
//   const isItemInCart = isInCart(equipment.equipment_id)
//   const cartItem = getCartItem(equipment.equipment_id)

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

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Equipment Image */}
//           <div className="space-y-4">
//             <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
//               {equipment.image_url ? (
//                 <img 
//                   src={equipment.image_url} 
//                   alt={equipment.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                   <span className="text-white text-6xl font-bold">
//                     {equipment.name.charAt(0)}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* ✅ CART SECTION - TAMBAH DI BAWAH GAMBAR */}
//             <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//               <h3 className="font-medium text-blue-800 mb-2">
//                 💡 Simpan untuk nanti?
//               </h3>
//               <p className="text-sm text-blue-600 mb-3">
//                 Tambahkan ke keranjang untuk booking nanti
//               </p>
              
//               {isItemInCart ? (
//                 <div className="space-y-2">
//                   <p className="text-sm text-green-600">
//                     ✅ Sudah di keranjang ({cartItem?.quantity})
//                   </p>
//                   <div className="flex gap-2">
//                     <Link to="/cart" className="flex-1">
//                       <Button variant="outline" className="w-full border-blue-600 text-blue-600">
//                         <ShoppingCart className="h-4 w-4 mr-2" />
//                         Lihat Keranjang
//                       </Button>
//                     </Link>
//                     <Button 
//                       onClick={handleAddToCart}
//                       disabled={!isAvailable}
//                       className="bg-blue-600 hover:bg-blue-700"
//                     >
//                       +1
//                     </Button>
//                   </div>
//                 </div>
//               ) : (
//                 <Button 
//                   onClick={handleAddToCart}
//                   disabled={!isAvailable}
//                   variant="outline"
//                   className="w-full border-blue-600 text-blue-600 hover:bg-blue-100"
//                 >
//                   <ShoppingCart className="h-4 w-4 mr-2" />
//                   Tambah ke Keranjang
//                 </Button>
//               )}
//             </div>
//           </div>

//           {/* Equipment Details */}
//           <div className="space-y-6">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <Badge variant="secondary" className="bg-blue-100 text-blue-800">
//                   {equipment.category.toUpperCase()}
//                 </Badge>
//                 <span className="text-sm text-gray-500">{equipment.code}</span>
//               </div>
              
//               <h1 className="text-3xl font-bold text-gray-900 mb-4">
//                 {equipment.name}
//               </h1>

//               {equipment.description && (
//                 <p className="text-gray-600 text-lg leading-relaxed mb-6">
//                   {equipment.description}
//                 </p>
//               )}
//             </div>

//             {/* ✅ SPESIFIKASI - KEMBALIKAN SECTION INI */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Spesifikasi</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {equipment.size_capacity && (
//                   <div className="flex items-center gap-3">
//                     <Package className="h-5 w-5 text-gray-500" />
//                     <div>
//                       <p className="font-medium">Kapasitas</p>
//                       <p className="text-gray-600">{equipment.size_capacity}</p>
//                     </div>
//                   </div>
//                 )}

//                 {equipment.dimensions && (
//                   <div className="flex items-center gap-3">
//                     <Ruler className="h-5 w-5 text-gray-500" />
//                     <div>
//                       <p className="font-medium">Dimensi</p>
//                       <p className="text-gray-600">{equipment.dimensions}</p>
//                     </div>
//                   </div>
//                 )}

//                 {equipment.weight && (
//                   <div className="flex items-center gap-3">
//                     <Weight className="h-5 w-5 text-gray-500" />
//                     <div>
//                       <p className="font-medium">Berat</p>
//                       <p className="text-gray-600">{equipment.weight} kg</p>
//                     </div>
//                   </div>
//                 )}

//                 {equipment.material && (
//                   <div className="flex items-center gap-3">
//                     <CheckCircle className="h-5 w-5 text-gray-500" />
//                     <div>
//                       <p className="font-medium">Material</p>
//                       <p className="text-gray-600">{equipment.material}</p>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* ✅ PRICE AND AVAILABILITY - KEMBALIKAN SECTION INI */}
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <div>
//                     <p className="text-3xl font-bold text-green-600">
//                       Rp {equipment.price_per_day.toLocaleString('id-ID')}
//                     </p>
//                     <p className="text-gray-500">per 24 jam</p>
//                   </div>
                  
//                   <div className="text-right">
//                     <p className="text-lg font-semibold">
//                       {isAvailable ? (
//                         <span className="text-green-600">
//                           <CheckCircle className="inline h-5 w-5 mr-1" />
//                           Tersedia ({equipment.stock_quantity})
//                         </span>
//                       ) : (
//                         <span className="text-red-600">
//                           <AlertCircle className="inline h-5 w-5 mr-1" />
//                           Stok Habis
//                         </span>
//                       )}
//                     </p>
//                     <Badge variant={equipment.condition === 'baik' ? 'default' : 'secondary'}>
//                       Kondisi: {equipment.condition}
//                     </Badge>
//                   </div>
//                 </div>

//                 {/* Rental Action */}
//                 <Link 
//                   to={`/booking/form?equipment_id=${equipment.equipment_id}`}
//                   className="block"
//                 >
//                   <Button 
//                     className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
//                     disabled={!isAvailable}
//                   >
//                     {isAvailable ? 'Sewa Sekarang' : 'Stok Tidak Tersedia'}
//                   </Button>
//                 </Link>

//                 <p className="text-sm text-gray-500 text-center mt-3">
//                   * Sistem sewa dihitung per 24 jam dengan toleransi keterlambatan 12 jam
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EquipmentDetail

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Package, Weight, Ruler, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react'
import { useCart, Equipment } from '@/contexts/CartContext'

const EquipmentDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ USE CART CONTEXT
  const { addToCart, isInCart, getCartItem, getTotalItems } = useCart()

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
      
      // ✅ FETCH BY ID dari API
      const response = await fetch(`http://localhost/PBL-KELANA-OUTDOOR/api/public/equipment.php?id=${equipmentId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const text = await response.text()
      console.log('📄 Raw response:', text.substring(0, 200))
      
      const data = JSON.parse(text)
      console.log('✅ Parsed data:', data)
      
      if (data.error) {
        throw new Error(data.message || 'Equipment tidak ditemukan')
      }

      if (data.equipment_id) {
        // Single equipment response
        setEquipment(data)
        console.log('✅ Equipment loaded:', data.name)
      } else if (Array.isArray(data)) {
        // Array response, find by ID
        const foundEquipment = data.find((item: any) => item.equipment_id === equipmentId)
        if (foundEquipment) {
          setEquipment(foundEquipment)
          console.log('✅ Equipment found in array:', foundEquipment.name)
        } else {
          throw new Error('Equipment tidak ditemukan')
        }
      } else {
        throw new Error('Equipment tidak ditemukan')
      }
      
    } catch (err) {
      console.error('❌ Error:', err)
      setError('Gagal memuat detail equipment')
      
      // ✅ FALLBACK DATA untuk testing
      const fallbackEquipment: Equipment = {
        equipment_id: parseInt(id || '1'),
        name: "Tenda Dome 4 Orang (FALLBACK)",
        code: "TENDA-001",
        description: "Tenda berkualitas tinggi untuk 4 orang dengan fitur tahan air dan mudah dipasang. Cocok untuk camping keluarga atau petualangan outdoor.",
        category: "tenda",
        size_capacity: "4 orang",
        dimensions: "300x200x150 cm",
        weight: 4.5,
        material: "Polyester 190T",
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
      
      setEquipment(fallbackEquipment)
      
    } finally {
      setLoading(false)
    }
  }

  // ✅ SIMPLIFIED ADD TO CART
  const handleAddToCart = () => {
    if (!equipment) return
    
    console.log('🛒 Adding equipment to cart:', equipment.name)
    addToCart(equipment, 1)
    alert(`✅ ${equipment.name} ditambahkan ke keranjang!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat detail equipment...</p>
        </div>
      </div>
    )
  }

  if (error && !equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-4">{error || 'Equipment tidak ditemukan'}</p>
          <Link to="/browse">
            <Button>Kembali ke Browse</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-4">Equipment tidak ditemukan</p>
          <Link to="/browse">
            <Button>Kembali ke Browse</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isAvailable = equipment.stock_quantity > 0
  const itemInCart = isInCart(equipment.equipment_id)
  const cartItem = getCartItem(equipment.equipment_id)

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

        {/* Error Warning */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ {error} - Menampilkan data fallback untuk testing
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Equipment Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              {equipment.image_url ? (
                <img 
                  src={equipment.image_url} 
                  alt={equipment.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">
                    {equipment.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* ✅ CART SECTION */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">
                🛒 Simpan untuk nanti?
              </h3>
              <p className="text-sm text-blue-600 mb-3">
                Tambahkan ke keranjang untuk booking multiple items
              </p>
              
              {itemInCart ? (
                <div className="space-y-2">
                  <p className="text-sm text-green-600 font-medium">
                    ✅ Sudah di keranjang ({cartItem?.quantity})
                  </p>
                  <div className="flex gap-2">
                    <Link to="/cart" className="flex-1">
                      <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Lihat Keranjang
                      </Button>
                    </Link>
                    <Button 
                      onClick={handleAddToCart}
                      disabled={!isAvailable}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      +1
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={handleAddToCart}
                  disabled={!isAvailable}
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-100"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Tambah ke Keranjang
                </Button>
              )}
            </div>
          </div>

          {/* Equipment Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {equipment.category.toUpperCase()}
                </Badge>
                <span className="text-sm text-gray-500">{equipment.code}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {equipment.name}
              </h1>

              {equipment.description && (
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {equipment.description}
                </p>
              )}
            </div>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Spesifikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {equipment.size_capacity && (
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Kapasitas</p>
                      <p className="text-gray-600">{equipment.size_capacity}</p>
                    </div>
                  </div>
                )}

                {equipment.dimensions && (
                  <div className="flex items-center gap-3">
                    <Ruler className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Dimensi</p>
                      <p className="text-gray-600">{equipment.dimensions}</p>
                    </div>
                  </div>
                )}

                {equipment.weight && (
                  <div className="flex items-center gap-3">
                    <Weight className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Berat</p>
                      <p className="text-gray-600">{equipment.weight} kg</p>
                    </div>
                  </div>
                )}

                {equipment.material && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Material</p>
                      <p className="text-gray-600">{equipment.material}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Price and Availability */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-3xl font-bold text-green-600">
                      Rp {equipment.price_per_day.toLocaleString('id-ID')}
                    </p>
                    <p className="text-gray-500">per 24 jam</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {isAvailable ? (
                        <span className="text-green-600">
                          <CheckCircle className="inline h-5 w-5 mr-1" />
                          Tersedia ({equipment.stock_quantity})
                        </span>
                      ) : (
                        <span className="text-red-600">
                          <AlertCircle className="inline h-5 w-5 mr-1" />
                          Stok Habis
                        </span>
                      )}
                    </p>
                    <Badge variant={equipment.condition === 'baik' ? 'default' : 'secondary'}>
                      Kondisi: {equipment.condition}
                    </Badge>
                  </div>
                </div>

                {/* Rental Action */}
                <Link 
                  to={`/booking/form?equipment_id=${equipment.equipment_id}`}
                  className="block"
                >
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                    disabled={!isAvailable}
                  >
                    {isAvailable ? '🎒 Sewa Sekarang' : '❌ Stok Tidak Tersedia'}
                  </Button>
                </Link>

                <p className="text-sm text-gray-500 text-center mt-3">
                  * Sistem sewa dihitung per 24 jam dengan toleransi keterlambatan 12 jam
                </p>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-4">
                  <Link to="/cart" className="flex-1">
                    <Button variant="outline" className="w-full text-sm">
                      Lihat Keranjang ({getTotalItems()})
                    </Button>
                  </Link>
                  
                  <Link to="/browse" className="flex-1">
                    <Button variant="outline" className="w-full text-sm">
                      Browse Lainnya
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipmentDetail