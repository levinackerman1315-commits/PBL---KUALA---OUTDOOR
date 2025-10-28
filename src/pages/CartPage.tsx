// import { useCart } from '@/contexts/CartContext'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, ExternalLink } from 'lucide-react'
// import { Link } from 'react-router-dom'


// const CartPage = () => {
//   const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCart()

//   // Empty cart state
//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="container mx-auto px-4 py-8">
//           {/* Back Button */}
//           {/* <Link to="/">
//             <Button variant="ghost" className="mb-6">
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Kembali ke Home
//             </Button>
//           </Link>
//            */}

//            <Link to="/"> 
//   <Button variant="ghost" className="mb-4">
//     <ArrowLeft className="h-4 w-4 mr-2" />
//     Kembali ke Home  
//   </Button>
// </Link>
//           <div className="max-w-2xl mx-auto text-center">
//             <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">Keranjang Kosong</h1>
//             <p className="text-gray-600 mb-8">
//               Belum ada peralatan yang ditambahkan ke keranjang
//             </p>
//             {/* <Link to="/browse">
//               <Button className="bg-green-600 hover:bg-green-700">
//                 Mulai Browse Equipment
//               </Button>
//             </Link> */}
//             <Link to="/browse?from=cart">
//   <Button className="bg-green-600 hover:bg-green-700">
//     Mulai Browse Equipment
//   </Button>
// </Link>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <Link to="/browse">
//               <Button variant="ghost" className="mb-4">
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Kembali ke Browse
//               </Button>
//             </Link>
//             <h1 className="text-4xl font-bold text-gray-900">Keranjang Sewa</h1>
//             <p className="text-gray-600">
//               Total {getTotalItems()} items dari {cartItems.length} peralatan
//             </p>
//           </div>
          
//           <Button 
//             variant="outline" 
//             onClick={clearCart}
//             className="text-red-600 hover:text-red-700 hover:bg-red-50"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Kosongkan Keranjang
//           </Button>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           {/* Cart Items */}
//           <div className="space-y-4 mb-8">
//             {cartItems.map((item) => (
//               <Card key={item.equipment.equipment_id} className="overflow-hidden">
//                 <CardContent className="p-6">
//                   <div className="flex gap-4">
//                     {/* Equipment Image */}
//                     <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                       {item.equipment.image_url ? (
//                         <img 
//                           src={item.equipment.image_url} 
//                           alt={item.equipment.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                           <span className="text-white text-2xl font-bold">
//                             {item.equipment.name.charAt(0)}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Equipment Info */}
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start mb-3">
//                         <div>
//                           <h3 className="font-bold text-xl text-gray-900">{item.equipment.name}</h3>
//                           <div className="flex items-center gap-3 mt-2">
//                             <Badge variant="secondary" className="text-xs">
//                               {item.equipment.category.toUpperCase()}
//                             </Badge>
//                             <span className="text-sm text-gray-500">{item.equipment.code}</span>
//                           </div>
                          
//                           {item.equipment.description && (
//                             <p className="text-gray-600 mt-2 text-sm line-clamp-2">
//                               {item.equipment.description}
//                             </p>
//                           )}
//                         </div>
                        
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeFromCart(item.equipment.equipment_id)}
//                           className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>

//                       {/* Price & Controls */}
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <p className="text-2xl font-bold text-green-600">
//                             Rp {item.equipment.price_per_day.toLocaleString('id-ID')}
//                           </p>
//                           <p className="text-sm text-gray-500">per hari</p>
//                         </div>

//                         {/* Quantity Controls */}
//                         <div className="flex items-center gap-4">
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm font-medium text-gray-700">Jumlah:</span>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => updateQuantity(item.equipment.equipment_id, item.quantity - 1)}
//                               disabled={item.quantity <= 1}
//                             >
//                               <Minus className="h-3 w-3" />
//                             </Button>
                            
//                             <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                            
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => updateQuantity(item.equipment.equipment_id, item.quantity + 1)}
//                               disabled={item.quantity >= item.equipment.stock_quantity}
//                             >
//                               <Plus className="h-3 w-3" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Item Actions */}
//                       <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
//                         <div className="text-sm text-gray-500">
//                           Stok tersedia: {item.equipment.stock_quantity} | 
//                           Kondisi: {item.equipment.condition}
//                         </div>
                        
//                         <div className="flex gap-2">
//                           {/* Lihat Detail */}
//                           <Link to={`/equipment/${item.equipment.equipment_id}`}>
//                             <Button variant="outline" size="sm">
//                               <ExternalLink className="h-3 w-3 mr-1" />
//                               Lihat Detail
//                             </Button>
//                           </Link>
                          
//                           {/* Sewa Item Ini */}
//                           <Link to={`/booking/form?equipment_id=${item.equipment.equipment_id}&quantity=${item.quantity}`}>
//                             <Button size="sm" className="bg-green-600 hover:bg-green-700">
//                               Sewa Item Ini
//                             </Button>
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Bottom Actions */}
//           <div className="space-y-4">
//             {/* Add More Items */}
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="font-semibold text-lg">Butuh peralatan lain?</h3>
//                     <p className="text-gray-600">Browse koleksi lengkap peralatan outdoor kami</p>
//                   </div>
//                   {/* <Link to="/browse">
//                     <Button variant="outline">
//                       <Plus className="h-4 w-4 mr-2" />
//                       Tambah Peralatan
//                     </Button>
//                   </Link> */}
//                   <Link to="/browse?from=cart">  y
//   <Button variant="outline">
//     <Plus className="h-4 w-4 mr-2" />
//     Tambah Peralatan
//   </Button>
// </Link>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Quick Actions */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//               <div className="text-center">
//                 <h3 className="font-semibold text-blue-800 mb-2">
//                   🎒 Siap untuk petualangan?
//                 </h3>
//                 <p className="text-blue-600 mb-4">
//                   Pilih cara booking yang sesuai dengan kebutuhan Anda
//                 </p>
                
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   {/* Booking Terpisah */}
//                   <div className="text-center">
//                     <p className="text-sm text-blue-600 mb-2">Booking per item</p>
//                     <p className="text-xs text-gray-500">
//                       Klik "Sewa Item Ini" pada setiap peralatan
//                     </p>
//                   </div>
                  
//                   <div className="sm:border-l sm:border-blue-300 sm:pl-6">
//                     <p className="text-sm text-blue-600 mb-2">Atau hubungi langsung</p>
//                     <a 
//                       href="https://wa.me/6281258599058?text=Halo, saya tertarik dengan peralatan di keranjang saya"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Button className="bg-green-600 hover:bg-green-700">
//                         Chat WhatsApp
//                       </Button>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartPage

// import { useCart } from '@/contexts/CartContext'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, ExternalLink } from 'lucide-react'
// import { Link } from 'react-router-dom'

// const CartPage = () => {
//   const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCart()

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="container mx-auto px-4 py-8">
//           <Link to="/"> 
//             <Button variant="ghost" className="mb-4">
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Kembali ke Home  
//             </Button>
//           </Link>
          
//           <div className="max-w-2xl mx-auto text-center">
//             <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">Keranjang Kosong</h1>
//             <p className="text-gray-600 mb-8">
//               Belum ada peralatan yang ditambahkan ke keranjang
//             </p>
//             <Link to="/browse?from=cart">
//               <Button className="bg-green-600 hover:bg-green-700">
//                 Mulai Browse Equipment
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <Link to="/">
//               <Button variant="ghost" className="mb-4">
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Kembali ke Home
//               </Button>
//             </Link>
//             <h1 className="text-4xl font-bold text-gray-900">Keranjang Sewa</h1>
//             <p className="text-gray-600">
//               Total {getTotalItems()} items dari {cartItems.length} peralatan
//             </p>
//           </div>
          
//           <Button 
//             variant="outline" 
//             onClick={clearCart}
//             className="text-red-600 hover:text-red-700 hover:bg-red-50"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Kosongkan Keranjang
//           </Button>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           {/* Cart Items */}
//           <div className="space-y-4 mb-8">
//             {cartItems.map((item) => (
//               <Card key={item.equipment.equipment_id} className="overflow-hidden">
//                 <CardContent className="p-6">
//                   <div className="flex gap-4">
//                     {/* Equipment Image */}
//                     <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                       {item.equipment.image_url ? (
//                         <img 
//                           src={item.equipment.image_url} 
//                           alt={item.equipment.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                           <span className="text-white text-2xl font-bold">
//                             {item.equipment.name.charAt(0)}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Equipment Info */}
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start mb-3">
//                         <div>
//                           <h3 className="font-bold text-xl text-gray-900">{item.equipment.name}</h3>
//                           <div className="flex items-center gap-3 mt-2">
//                             <Badge variant="secondary" className="text-xs">
//                               {item.equipment.category.toUpperCase()}
//                             </Badge>
//                             <span className="text-sm text-gray-500">{item.equipment.code}</span>
//                           </div>
                          
//                           {item.equipment.description && (
//                             <p className="text-gray-600 mt-2 text-sm line-clamp-2">
//                               {item.equipment.description}
//                             </p>
//                           )}
//                         </div>
                        
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeFromCart(item.equipment.equipment_id)}
//                           className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>

//                       {/* Price & Controls */}
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <p className="text-2xl font-bold text-green-600">
//                             Rp {item.equipment.price_per_day.toLocaleString('id-ID')}
//                           </p>
//                           <p className="text-sm text-gray-500">per hari</p>
//                         </div>

//                         {/* Quantity Controls */}
//                         <div className="flex items-center gap-4">
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm font-medium text-gray-700">Jumlah:</span>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => updateQuantity(item.equipment.equipment_id, item.quantity - 1)}
//                               disabled={item.quantity <= 1}
//                             >
//                               <Minus className="h-3 w-3" />
//                             </Button>
                            
//                             <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                            
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => updateQuantity(item.equipment.equipment_id, item.quantity + 1)}
//                               disabled={item.quantity >= item.equipment.stock_quantity}
//                             >
//                               <Plus className="h-3 w-3" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Item Actions */}
//                       <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
//                         <div className="text-sm text-gray-500">
//                           Stok tersedia: {item.equipment.stock_quantity} | 
//                           Kondisi: {item.equipment.condition}
//                         </div>
                        
//                         <div className="flex gap-2">
//                           <Link to={`/equipment/${item.equipment.equipment_id}`}>
//                             <Button variant="outline" size="sm">
//                               <ExternalLink className="h-3 w-3 mr-1" />
//                               Lihat Detail
//                             </Button>
//                           </Link>
                          
//                           <Link to={`/booking/form?equipment_id=${item.equipment.equipment_id}&quantity=${item.quantity}`}>
//                             <Button size="sm" className="bg-green-600 hover:bg-green-700">
//                               Sewa Item Ini
//                             </Button>
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Bottom Actions */}
//           <div className="space-y-4">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="font-semibold text-lg">Butuh peralatan lain?</h3>
//                     <p className="text-gray-600">Browse koleksi lengkap peralatan outdoor kami</p>
//                   </div>
//                   <Link to="/browse?from=cart">  
//                     <Button variant="outline">
//                       <Plus className="h-4 w-4 mr-2" />
//                       Tambah Peralatan
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//               <div className="text-center">
//                 <h3 className="font-semibold text-blue-800 mb-2">
//                   🎒 Siap untuk petualangan?
//                 </h3>
//                 <p className="text-blue-600 mb-4">
//                   Pilih cara booking yang sesuai dengan kebutuhan Anda
//                 </p>
                
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <div className="text-center">
//                     <p className="text-sm text-blue-600 mb-2">Booking per item</p>
//                     <p className="text-xs text-gray-500">
//                       Klik "Sewa Item Ini" pada setiap peralatan
//                     </p>
//                   </div>
                  
//                   <div className="sm:border-l sm:border-blue-300 sm:pl-6">
//                     <p className="text-sm text-blue-600 mb-2">Atau hubungi langsung</p>
//                     <a 
//                       href="https://wa.me/6281258599058?text=Halo, saya tertarik dengan peralatan di keranjang saya"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Button className="bg-green-600 hover:bg-green-700">
//                         Chat WhatsApp
//                       </Button>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartPage


// import { useCart } from '@/contexts/CartContext'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, ExternalLink } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog'

// const CartPage = () => {
//   const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCart()

//   // Hitung total harga semua item
//   const getTotalPrice = () =>
//     cartItems.reduce(
//       (total, item) => total + item.equipment.price_per_day * item.quantity,
//       0
//     )

//   // AlertDialog state
//   const [itemToDelete, setItemToDelete] = useState<string | null>(null)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   const handleDeleteClick = (equipmentId: string) => {
//     setItemToDelete(equipmentId)
//     setIsDialogOpen(true)
//   }

//   const handleConfirmDelete = () => {
//     if (itemToDelete) {
//       removeFromCart(Number(itemToDelete))
//       setIsDialogOpen(false)
//       setItemToDelete(null)
//     }
//   }

//   const handleCancelDelete = () => {
//     setIsDialogOpen(false)
//     setItemToDelete(null)
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="container mx-auto px-4 py-8">
//           <Link to="/">
//             <Button variant="ghost" className="mb-4">
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Kembali ke Home
//             </Button>
//           </Link>
//           <div className="max-w-2xl mx-auto text-center">
//             <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">Keranjang Kosong</h1>
//             <p className="text-gray-600 mb-8">
//               Belum ada peralatan yang ditambahkan ke keranjang
//             </p>
//             <Link to="/browse?from=cart">
//               <Button className="bg-green-600 hover:bg-green-700">
//                 Mulai Browse Equipment
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <Link to="/">
//               <Button variant="ghost" className="mb-4">
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Kembali ke Home
//               </Button>
//             </Link>
//             <h1 className="text-4xl font-bold text-gray-900">Keranjang Sewa</h1>
//             <p className="text-gray-600">
//               Total {getTotalItems()} items dari {cartItems.length} peralatan
//             </p>
//           </div>

//           <Button
//             variant="outline"
//             onClick={clearCart}
//             className="text-red-600 hover:text-red-700 hover:bg-red-50"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Kosongkan Keranjang
//           </Button>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           {/* Cart Items */}
//           <div className="space-y-4 mb-8">
//             {cartItems.map((item) => (
//               <Card key={item.equipment.equipment_id} className="overflow-hidden">
//                 <CardContent className="p-6">
//                   <div className="flex gap-4">
//                     {/* Equipment Image */}
//                     <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                       {item.equipment.image_url ? (
//                         <img
//                           src={item.equipment.image_url}
//                           alt={item.equipment.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                           <span className="text-white text-2xl font-bold">
//                             {item.equipment.name.charAt(0)}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Equipment Info */}
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start mb-3">
//                         <div>
//                           <h3 className="font-bold text-xl text-gray-900">{item.equipment.name}</h3>
//                           <div className="flex items-center gap-3 mt-2">
//                             <Badge variant="secondary" className="text-xs">
//                               {item.equipment.category.toUpperCase()}
//                             </Badge>
//                             <span className="text-sm text-gray-500">{item.equipment.code}</span>
//                           </div>

//                           {item.equipment.description && (
//                             <p className="text-gray-600 mt-2 text-sm line-clamp-2">
//                               {item.equipment.description}
//                             </p>
//                           )}
//                         </div>

//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => handleDeleteClick(String(item.equipment.equipment_id))}
//                           className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>

//                       {/* Price & Controls */}
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <p className="text-2xl font-bold text-green-600">
//                             Rp {item.equipment.price_per_day.toLocaleString('id-ID')}
//                           </p>
//                           <p className="text-sm text-gray-500">per hari</p>
//                         </div>

//                         {/* Quantity Controls */}
//                         <div className="flex items-center gap-4">
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm font-medium text-gray-700">Jumlah:</span>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() =>
//                                 updateQuantity(item.equipment.equipment_id, item.quantity - 1)
//                               }
//                               disabled={item.quantity <= 1}
//                             >
//                               <Minus className="h-3 w-3" />
//                             </Button>

//                             <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>

//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() =>
//                                 updateQuantity(item.equipment.equipment_id, item.quantity + 1)
//                               }
//                               disabled={item.quantity >= item.equipment.stock_quantity}
//                             >
//                               <Plus className="h-3 w-3" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Item Actions */}
//                       <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
//                         <div className="text-sm text-gray-500">
//                           Stok tersedia: {item.equipment.stock_quantity} | Kondisi: {item.equipment.condition}
//                         </div>

//                         <div className="flex gap-2">
//                           <Link to={`/equipment/${item.equipment.equipment_id}`}>
//                             <Button variant="outline" size="sm">
//                               <ExternalLink className="h-3 w-3 mr-1" />
//                               Lihat Detail
//                             </Button>
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                     {/* Total per item */}
//                     <div className="text-right min-w-[120px] flex flex-col justify-between">
//                       <p className="font-semibold text-lg text-green-700">
//                         Rp {(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Ringkasan Total & Checkout */}
//           <Card className="mb-8">
//             <CardContent className="p-6">
//               <div className="flex flex-col md:flex-row justify-between items-center">
//                 <div className="mb-4 md:mb-0">
//                   <h2 className="text-xl font-semibold mb-2">Ringkasan Pesanan</h2>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
//                     </div>
//                     <div className="flex justify-between font-semibold text-lg pt-2 border-t">
//                       <span>Total</span>
//                       <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <Link to="/booking/form">
//                   <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto mt-4 md:mt-0">
//                     Lanjut ke Pembayaran
//                   </Button>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Bottom Actions */}
//           <div className="space-y-4">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="font-semibold text-lg">Butuh peralatan lain?</h3>
//                     <p className="text-gray-600">Browse koleksi lengkap peralatan outdoor kami</p>
//                   </div>
//                   <Link to="/browse?from=cart">
//                     <Button variant="outline">
//                       <Plus className="h-4 w-4 mr-2" />
//                       Tambah Peralatan
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//               <div className="text-center">
//                 <h3 className="font-semibold text-blue-800 mb-2">
//                   🎒 Siap untuk petualangan?
//                 </h3>
//                 <p className="text-blue-600 mb-4">
//                   Booking seluruh keranjang sekaligus atau hubungi kami langsung
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <div className="sm:border-l sm:border-blue-300 sm:pl-6">
//                     <p className="text-sm text-blue-600 mb-2">Atau hubungi langsung</p>
//                     <a
//                       href="https://wa.me/6281258599058?text=Halo, saya tertarik dengan peralatan di keranjang saya"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Button className="bg-green-600 hover:bg-green-700">
//                         Chat WhatsApp
//                       </Button>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* AlertDialog Hapus Item */}
//       <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Hapus Item dari Keranjang?</AlertDialogTitle>
//             <AlertDialogDescription>
//               Apakah Anda yakin ingin menghapus item ini dari keranjang? Tindakan ini tidak dapat dibatalkan.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={handleCancelDelete}>
//               Batal
//             </AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleConfirmDelete}
//               className="bg-red-600 hover:bg-red-700"
//             >
//               Ya, Hapus
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }

// export default CartPage


// import { useCart } from '@/contexts/CartContext'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, ExternalLink } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog'
// import { Footer } from '@/components/Footer'

// const CartPage = () => {
//   const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCart()

//   // Hitung total harga semua item
//   const getTotalPrice = () =>
//     cartItems.reduce(
//       (total, item) => total + item.equipment.price_per_day * item.quantity,
//       0
//     )

//   // AlertDialog state
//   const [itemToDelete, setItemToDelete] = useState<string | null>(null)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   const handleDeleteClick = (equipmentId: string) => {
//     setItemToDelete(equipmentId)
//     setIsDialogOpen(true)
//   }

//   const handleConfirmDelete = () => {
//     if (itemToDelete) {
//       removeFromCart(Number(itemToDelete))
//       setIsDialogOpen(false)
//       setItemToDelete(null)
//     }
//   }

//   const handleCancelDelete = () => {
//     setIsDialogOpen(false)
//     setItemToDelete(null)
//   }

//   if (cartItems.length === 0) {
//     return (
//       <>
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <Card className="max-w-md w-full mx-4">
//             <CardContent className="pt-6 text-center">
//               <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//               <h2 className="text-2xl font-semibold mb-2">Keranjang Kosong</h2>
//               <p className="text-gray-600 mb-4">
//                 Belum ada peralatan yang ditambahkan ke keranjang
//               </p>
//               <Link to="/browse?from=cart">
//                 <Button className="bg-green-600 hover:bg-green-700">
//                   Mulai Browse Equipment
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>
//         </div>
//         <Footer />
//       </>
//     )
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 py-8 flex flex-col">
//         <div className="container mx-auto px-4 flex-1">
//           {/* Header */}
//           <div className="mb-6 flex items-center">
//             <Link to="/">
//               <Button variant="ghost" className="gap-2 mr-2">
//                 <ArrowLeft className="h-4 w-4" />
//                 Home
//               </Button>
//             </Link>
//             <h1 className="text-3xl font-bold">Keranjang Belanja</h1>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* List Keranjang */}
//             <div className="lg:col-span-2 space-y-4">
//               {cartItems.map((item) => (
//                 <Card key={item.equipment.equipment_id} className="overflow-hidden">
//                   <CardContent className="p-6">
//                     <div className="flex gap-4 items-center">
//                       {/* Equipment Image */}
//                       <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
//                         {item.equipment.image_url ? (
//                           <img
//                             src={item.equipment.image_url}
//                             alt={item.equipment.name}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <span className="text-gray-400 text-2xl font-bold">
//                             <ShoppingCart className="h-8 w-8" />
//                           </span>
//                         )}
//                       </div>
//                       {/* Info */}
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-lg">{item.equipment.name}</h3>
//                         <p className="text-gray-600">
//                           Rp {item.equipment.price_per_day.toLocaleString('id-ID')} / hari
//                         </p>
//                         <div className="flex items-center gap-4 mt-4">
//                           <div className="flex items-center gap-2">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() =>
//                                 updateQuantity(item.equipment.equipment_id, item.quantity - 1)
//                               }
//                               disabled={item.quantity <= 1}
//                             >
//                               <Minus className="h-4 w-4" />
//                             </Button>
//                             <span className="w-12 text-center">{item.quantity}</span>
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() =>
//                                 updateQuantity(item.equipment.equipment_id, item.quantity + 1)
//                               }
//                               disabled={item.quantity >= item.equipment.stock_quantity}
//                             >
//                               <Plus className="h-4 w-4" />
//                             </Button>
//                           </div>
//                           <Button
//                             size="sm"
//                             variant="destructive"
//                             onClick={() => handleDeleteClick(String(item.equipment.equipment_id))}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                         <div className="flex gap-2 mt-2">
//                           <Badge variant="secondary" className="text-xs">
//                             {item.equipment.category.toUpperCase()}
//                           </Badge>
//                           <span className="text-sm text-gray-500">{item.equipment.code}</span>
//                         </div>
//                         <div className="text-xs text-gray-500 mt-2">
//                           Stok: {item.equipment.stock_quantity} | Kondisi: {item.equipment.condition}
//                         </div>
//                         <div className="mt-2">
//                           <Link to={`/equipment/${item.equipment.equipment_id}?from=cart`}>
//                             <Button variant="outline" size="sm">
//                         <ExternalLink className="h-3 w-3 mr-1" />
//                         Lihat Detail
//                       </Button>
//                     </Link>
//                         </div>
//                       </div>
//                       {/* Total per item */}
//                       <div className="text-right min-w-[120px] flex flex-col justify-between">
//                         <p className="font-semibold text-lg text-green-700">
//                           Rp {(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}
//                         </p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {/* Ringkasan Pesanan */}
//             <div className="lg:col-span-1">
//               <Card className="sticky top-4">
//                 <CardContent className="p-6">
//                   <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
//                   <div className="space-y-2 mb-4">
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
//                     </div>
//                     <div className="flex justify-between font-semibold text-lg pt-2 border-t">
//                       <span>Total</span>
//                       <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
//                     </div>
//                   </div>
//                   <Link to="/booking/form">
//                     <Button className="w-full bg-green-600 hover:bg-green-700">
//                       Lanjut ke Pembayaran
//                     </Button>
//                   </Link>
//                   <Button
//                     variant="outline"
//                     onClick={clearCart}
//                     className="w-full mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
//                   >
//                     <Trash2 className="h-4 w-4 mr-2" />
//                     Kosongkan Keranjang
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>

//           {/* Bottom Actions */}
//           <div className="max-w-4xl mx-auto mt-8 space-y-4">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="font-semibold text-lg">Butuh peralatan lain?</h3>
//                     <p className="text-gray-600">Browse koleksi lengkap peralatan outdoor kami</p>
//                   </div>
//                   <Link to="/browse?from=cart">
//                     <Button variant="outline">
//                       <Plus className="h-4 w-4 mr-2" />
//                       Tambah Peralatan
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//               <div className="text-center">
//                 <h3 className="font-semibold text-blue-800 mb-2">
//                   🎒 Siap untuk petualangan?
//                 </h3>
//                 <p className="text-blue-600 mb-4">
//                   Booking seluruh keranjang sekaligus atau hubungi kami langsung
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <div className="sm:border-l sm:border-blue-300 sm:pl-6">
//                     <p className="text-sm text-blue-600 mb-2">Atau hubungi langsung</p>
//                     <a
//                       href="https://wa.me/6281258599058?text=Halo, saya tertarik dengan peralatan di keranjang saya"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Button className="bg-green-600 hover:bg-green-700">
//                         Chat WhatsApp
//                       </Button>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* AlertDialog Hapus Item */}
//         <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Hapus Item dari Keranjang?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 Apakah Anda yakin ingin menghapus item ini dari keranjang? Tindakan ini tidak dapat dibatalkan.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel onClick={handleCancelDelete}>
//                 Batal
//               </AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={handleConfirmDelete}
//                 className="bg-red-600 hover:bg-red-700"
//               >
//                 Ya, Hapus
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default CartPage


import { useCart } from '@/contexts/CartContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, ExternalLink, Image as ImageIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Footer } from '@/components/Footer'

// ✅ INTERFACE UNTUK IMAGES
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
  reserved_stock: number;
  rented_stock: number;
  price_per_day: number;
  condition: string;
  equipment_type?: string;
  image_url?: string;
  images: EquipmentImage[]; // ✅ TAMBAHKAN INI
  created_at: string;
}

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCart()

  // ✅ FUNGSI UNTUK MENDAPATKAN GAMBAR UTAMA
  const getPrimaryImage = (item: Equipment) => {
    // Jika ada images array, cari yang primary atau ambil pertama
    if (item.images && item.images.length > 0) {
      const primaryImage = item.images.find(img => img.is_primary) || item.images[0];
      return primaryImage.image_url;
    }
    // Fallback ke image_url lama
    return item.image_url;
  };

  // ✅ BUILD IMAGE URL YANG DIPERBAIKI
  const buildImageUrl = (item: Equipment) => {
    const imageUrl = getPrimaryImage(item);
    
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/uploads/')) return `http://localhost/PBL-KELANA-OUTDOOR${imageUrl}`;
    if (imageUrl.startsWith('uploads/')) return `http://localhost/PBL-KELANA-OUTDOOR/${imageUrl}`;
    return `http://localhost/PBL-KELANA-OUTDOOR/uploads/equipment/${imageUrl}`;
  };

  // ✅ HANDLE IMAGE ERROR
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, item: Equipment) => {
    const img = e.target as HTMLImageElement;
    img.style.display = 'none';
    const fallback = img.nextElementSibling as HTMLElement;
    if (fallback && fallback.classList.contains('image-fallback')) {
      fallback.style.display = 'flex';
    }
  };

  // Hitung total harga semua item
  const getTotalPrice = () =>
    cartItems.reduce(
      (total, item) => total + item.equipment.price_per_day * item.quantity,
      0
    )

  // AlertDialog state
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDeleteClick = (equipmentId: string) => {
    setItemToDelete(equipmentId)
    setIsDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(Number(itemToDelete))
      setIsDialogOpen(false)
      setItemToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setIsDialogOpen(false)
    setItemToDelete(null)
  }

  if (cartItems.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Keranjang Kosong</h2>
              <p className="text-gray-600 mb-4">
                Belum ada peralatan yang ditambahkan ke keranjang
              </p>
              <Link to="/browse?from=cart">
                <Button className="bg-green-600 hover:bg-green-700">
                  Mulai Browse Equipment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 flex flex-col">
        <div className="container mx-auto px-4 flex-1">
          {/* Header */}
          <div className="mb-6 flex items-center">
            <Link to="/">
              <Button variant="ghost" className="gap-2 mr-2">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Keranjang Belanja</h1>
            <Badge variant="secondary" className="ml-4 bg-green-100 text-green-800">
              {getTotalItems()} items
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List Keranjang */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const imageUrl = buildImageUrl(item.equipment);
                const hasImages = item.equipment.images && item.equipment.images.length > 0;
                
                return (
                  <Card key={item.equipment.equipment_id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-4 items-center">
                        {/* ✅ Equipment Image - DIPERBAIKI */}
                        <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center overflow-hidden relative">
                          {imageUrl ? (
                            <>
                              <img
                                src={imageUrl}
                                alt={item.equipment.name}
                                className="w-full h-full object-cover"
                                onError={(e) => handleImageError(e, item.equipment)}
                              />
                              {/* Fallback jika gambar error */}
                              <div className="image-fallback hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
                                <div className="text-center text-white p-2">
                                  <ImageIcon className="h-6 w-6 mx-auto mb-1 opacity-70" />
                                  <p className="text-xs opacity-70">Gambar error</p>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="text-center text-gray-400">
                              <ImageIcon className="h-8 w-8 mx-auto mb-1" />
                              <p className="text-xs">No image</p>
                              {hasImages && (
                                <p className="text-xs opacity-50 mt-1">
                                  {item.equipment.images.length} images in DB
                                </p>
                              )}
                            </div>
                          )}
                          
                          {/* Badge untuk gambar utama */}
                          {hasImages && item.equipment.images.some(img => img.is_primary) && (
                            <div className="absolute top-1 left-1 bg-yellow-500 text-white text-[8px] px-1 rounded">
                              ★
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.equipment.name}</h3>
                          <p className="text-gray-600">
                            Rp {item.equipment.price_per_day.toLocaleString('id-ID')} / hari
                          </p>
                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateQuantity(item.equipment.equipment_id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateQuantity(item.equipment.equipment_id, item.quantity + 1)
                                }
                                disabled={item.quantity >= item.equipment.stock_quantity}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteClick(String(item.equipment.equipment_id))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {item.equipment.category.toUpperCase()}
                            </Badge>
                            <span className="text-sm text-gray-500">{item.equipment.code}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            Stok: {item.equipment.stock_quantity} | Kondisi: {item.equipment.condition}
                            {hasImages && (
                              <span className="ml-2">• {item.equipment.images.length} gambar</span>
                            )}
                          </div>
                          <div className="mt-2">
                            <Link to={`/equipment/${item.equipment.equipment_id}?from=cart`}>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Lihat Detail
                              </Button>
                            </Link>
                          </div>
                        </div>

                        {/* Total per item */}
                        <div className="text-right min-w-[120px] flex flex-col justify-between">
                          <p className="font-semibold text-lg text-green-700">
                            Rp {(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} × Rp {item.equipment.price_per_day.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Ringkasan Pesanan */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Jumlah Item</span>
                      <span>{getTotalItems()} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-green-700">Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  
                  <Link to="/booking/form">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-base py-2">
                      Lanjut ke Pembayaran
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full mt-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Kosongkan Keranjang
                  </Button>

                  {/* Info tambahan */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-700 text-center">
                      📦 Gratis pickup & return di lokasi kami
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="max-w-4xl mx-auto mt-8 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">Butuh peralatan lain?</h3>
                    <p className="text-gray-600">Browse koleksi lengkap peralatan outdoor kami</p>
                  </div>
                  <Link to="/browse?from=cart">
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Peralatan
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-center">
                <h3 className="font-semibold text-blue-800 mb-2">
                  🎒 Siap untuk petualangan?
                </h3>
                <p className="text-blue-600 mb-4">
                  Booking seluruh keranjang sekaligus atau hubungi kami langsung
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <div className="sm:border-l sm:border-blue-300 sm:pl-6">
                    <p className="text-sm text-blue-600 mb-2">Atau hubungi langsung</p>
                    <a
                      href="https://wa.me/6281258599058?text=Halo, saya tertarik dengan peralatan di keranjang saya"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-green-600 hover:bg-green-700">
                        Chat WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AlertDialog Hapus Item */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Item dari Keranjang?</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus item ini dari keranjang? Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelDelete}>
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Ya, Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Footer />
    </>
  )
}

export default CartPage