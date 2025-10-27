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

import { useCart } from '@/contexts/CartContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link to="/"> 
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Home  
            </Button>
          </Link>
          
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Keranjang Kosong</h1>
            <p className="text-gray-600 mb-8">
              Belum ada peralatan yang ditambahkan ke keranjang
            </p>
            <Link to="/browse?from=cart">
              <Button className="bg-green-600 hover:bg-green-700">
                Mulai Browse Equipment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Keranjang Sewa</h1>
            <p className="text-gray-600">
              Total {getTotalItems()} items dari {cartItems.length} peralatan
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Kosongkan Keranjang
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <Card key={item.equipment.equipment_id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Equipment Image */}
                    <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {item.equipment.image_url ? (
                        <img 
                          src={item.equipment.image_url} 
                          alt={item.equipment.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {item.equipment.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Equipment Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-xl text-gray-900">{item.equipment.name}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {item.equipment.category.toUpperCase()}
                            </Badge>
                            <span className="text-sm text-gray-500">{item.equipment.code}</span>
                          </div>
                          
                          {item.equipment.description && (
                            <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                              {item.equipment.description}
                            </p>
                          )}
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.equipment.equipment_id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price & Controls */}
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            Rp {item.equipment.price_per_day.toLocaleString('id-ID')}
                          </p>
                          <p className="text-sm text-gray-500">per hari</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Jumlah:</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.equipment.equipment_id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.equipment.equipment_id, item.quantity + 1)}
                              disabled={item.quantity >= item.equipment.stock_quantity}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Item Actions */}
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          Stok tersedia: {item.equipment.stock_quantity} | 
                          Kondisi: {item.equipment.condition}
                        </div>
                        
                        <div className="flex gap-2">
                          <Link to={`/equipment/${item.equipment.equipment_id}`}>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Lihat Detail
                            </Button>
                          </Link>
                          
                          <Link to={`/booking/form?equipment_id=${item.equipment.equipment_id}&quantity=${item.quantity}`}>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Sewa Item Ini
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="space-y-4">
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
                  Pilih cara booking yang sesuai dengan kebutuhan Anda
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <div className="text-center">
                    <p className="text-sm text-blue-600 mb-2">Booking per item</p>
                    <p className="text-xs text-gray-500">
                      Klik "Sewa Item Ini" pada setiap peralatan
                    </p>
                  </div>
                  
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
      </div>
    </div>
  )
}

export default CartPage
