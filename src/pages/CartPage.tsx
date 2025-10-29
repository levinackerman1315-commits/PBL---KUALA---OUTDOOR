// import { useCart } from '@/contexts/CartContext'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, ExternalLink, Image as ImageIcon } from 'lucide-react'
// import { Link, useNavigate } from 'react-router-dom'
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

// // ✅ INTERFACE YANG SESUAI DENGAN CARTCONTEXT BARU
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
//   price_per_day: number;
//   condition: string;
//   equipment_type?: string;
//   image_url?: string;
//   created_at: string;
  
//   // ✅ FIELD OPTIONAL UNTUK COMPATIBILITY
//   available_stock?: number;
//   reserved_stock?: number;
//   rented_stock?: number;
//   images?: any[]; // ✅ OPSIONAL, TIDAK WAJIB
// }

// const CartPage = () => {
//   const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCart()
//   const navigate = useNavigate()

//   // ✅ BUILD IMAGE URL YANG DIPERBAIKI - GUNAKAN image_url LANGSUNG
//   const buildImageUrl = (item: Equipment) => {
//     const imageUrl = item.image_url; // ✅ LANGSUNG PAKAI image_url
    
//     if (!imageUrl) return null;
//     if (imageUrl.startsWith('http')) return imageUrl;
//     if (imageUrl.startsWith('/uploads/')) return `http://localhost/PBL-KELANA-OUTDOOR${imageUrl}`;
//     if (imageUrl.startsWith('uploads/')) return `http://localhost/PBL-KELANA-OUTDOOR/${imageUrl}`;
//     return `http://localhost/PBL-KELANA-OUTDOOR/uploads/equipment/${imageUrl}`;
//   };

//   // ✅ HANDLE IMAGE ERROR
//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, item: Equipment) => {
//     const img = e.target as HTMLImageElement;
//     img.style.display = 'none';
//     const fallback = img.nextElementSibling as HTMLElement;
//     if (fallback && fallback.classList.contains('image-fallback')) {
//       fallback.style.display = 'flex';
//     }
//   };

//   // Hitung total harga semua item
//   const getTotalPrice = () =>
//     cartItems.reduce(
//       (total, item) => total + item.equipment.price_per_day * item.quantity,
//       0
//     )

//   // ✅ FUNCTION UNTUK HANDLE CHECKOUT
//   const handleCheckout = () => {
//     navigate('/booking/form', {
//       state: {
//         cartItems: cartItems,
//         totalItems: getTotalItems(),
//         totalPrice: getTotalPrice(),
//         fromCart: true
//       }
//     })
//   }

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
//             <Badge variant="secondary" className="ml-4 bg-green-100 text-green-800">
//               {getTotalItems()} items
//             </Badge>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* List Keranjang */}
//             <div className="lg:col-span-2 space-y-4">
//               {cartItems.map((item) => {
//                 const imageUrl = buildImageUrl(item.equipment);
                
//                 return (
//                   <Card key={item.equipment.equipment_id} className="overflow-hidden">
//                     <CardContent className="p-6">
//                       <div className="flex gap-4 items-center">
//                         {/* ✅ Equipment Image - SESUAI STRUKTUR BARU */}
//                         <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center overflow-hidden relative">
//                           {imageUrl ? (
//                             <>
//                               <img
//                                 src={imageUrl}
//                                 alt={item.equipment.name}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => handleImageError(e, item.equipment)}
//                               />
//                               {/* Fallback jika gambar error */}
//                               <div className="image-fallback hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
//                                 <div className="text-center text-white p-2">
//                                   <ImageIcon className="h-6 w-6 mx-auto mb-1 opacity-70" />
//                                   <p className="text-xs opacity-70">Gambar error</p>
//                                 </div>
//                               </div>
//                             </>
//                           ) : (
//                             <div className="text-center text-gray-400">
//                               <ImageIcon className="h-8 w-8 mx-auto mb-1" />
//                               <p className="text-xs">No image</p>
//                             </div>
//                           )}
//                         </div>

//                         {/* Info */}
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-lg">{item.equipment.name}</h3>
//                           <p className="text-gray-600">
//                             Rp {item.equipment.price_per_day.toLocaleString('id-ID')} / hari
//                           </p>
//                           <div className="flex items-center gap-4 mt-4">
//                             <div className="flex items-center gap-2">
//                               <Button
//                                 size="sm"
//                                 variant="outline"
//                                 onClick={() =>
//                                   updateQuantity(item.equipment.equipment_id, item.quantity - 1)
//                                 }
//                                 disabled={item.quantity <= 1}
//                               >
//                                 <Minus className="h-4 w-4" />
//                               </Button>
//                               <span className="w-12 text-center font-medium">{item.quantity}</span>
//                               <Button
//                                 size="sm"
//                                 variant="outline"
//                                 onClick={() =>
//                                   updateQuantity(item.equipment.equipment_id, item.quantity + 1)
//                                 }
//                                 disabled={item.quantity >= item.equipment.stock_quantity}
//                               >
//                                 <Plus className="h-4 w-4" />
//                               </Button>
//                             </div>
//                             <Button
//                               size="sm"
//                               variant="destructive"
//                               onClick={() => handleDeleteClick(String(item.equipment.equipment_id))}
//                             >
//                               <Trash2 className="h-4 w-4" />
//                             </Button>
//                           </div>
//                           <div className="flex gap-2 mt-2">
//                             <Badge variant="secondary" className="text-xs">
//                               {item.equipment.category.toUpperCase()}
//                             </Badge>
//                             <span className="text-sm text-gray-500">{item.equipment.code}</span>
//                           </div>
//                           <div className="text-xs text-gray-500 mt-2">
//                             Stok: {item.equipment.stock_quantity} | Kondisi: {item.equipment.condition}
//                           </div>
//                           <div className="mt-2">
//                             <Link to={`/equipment/${item.equipment.equipment_id}?from=cart`}>
//                               <Button variant="outline" size="sm">
//                                 <ExternalLink className="h-3 w-3 mr-1" />
//                                 Lihat Detail
//                               </Button>
//                             </Link>
//                           </div>
//                         </div>

//                         {/* Total per item */}
//                         <div className="text-right min-w-[120px] flex flex-col justify-between">
//                           <p className="font-semibold text-lg text-green-700">
//                             Rp {(item.equipment.price_per_day * item.quantity).toLocaleString('id-ID')}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {item.quantity} × Rp {item.equipment.price_per_day.toLocaleString('id-ID')}
//                           </p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>

//             {/* Ringkasan Pesanan */}
//             <div className="lg:col-span-1">
//               <Card className="sticky top-4">
//                 <CardContent className="p-6">
//                   <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
//                   <div className="space-y-2 mb-4">
//                     <div className="flex justify-between text-sm">
//                       <span>Jumlah Item</span>
//                       <span>{getTotalItems()} items</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
//                     </div>
//                     <div className="flex justify-between font-semibold text-lg pt-2 border-t">
//                       <span>Total</span>
//                       <span className="text-green-700">Rp {getTotalPrice().toLocaleString('id-ID')}</span>
//                     </div>
//                   </div>
                  
//                   <Button 
//                     onClick={handleCheckout}
//                     className="w-full bg-green-600 hover:bg-green-700 text-base py-2"
//                   >
//                     Lanjut ke Pembayaran
//                   </Button>
                  
//                   <Button
//                     variant="outline"
//                     onClick={clearCart}
//                     className="w-full mt-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
//                   >
//                     <Trash2 className="h-4 w-4 mr-2" />
//                     Kosongkan Keranjang
//                   </Button>

//                   {/* Info tambahan */}
//                   <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                     <p className="text-xs text-blue-700 text-center">
//                       📦 Gratis pickup & return di lokasi kami
//                     </p>
//                   </div>
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



import { useCart } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, ExternalLink, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Footer } from '@/components/Footer';
import { useContact } from '@/contexts/ContactContext';
import { Equipment } from '@/contexts/CartContext';

const CartPage = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalItems, 
    getTotalPrice, 
    loading,
    refreshCart 
  } = useCart();
  
  const { contactInfo } = useContact();
  const navigate = useNavigate();

  // ✅ STATE UNTUK REAL-TIME UPDATES
  const [localCartItems, setLocalCartItems] = useState(cartItems);
  const [isUpdating, setIsUpdating] = useState(false);

  // ✅ SYNCHRONISASI STATE LOKAL DENGAN CART CONTEXT
  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  // ✅ BUILD IMAGE URL
  const buildImageUrl = (item: Equipment) => {
    const imageUrl = item.image_url;
    
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

  // ✅ HANDLE CHECKOUT
  const handleCheckout = () => {
    navigate('/booking/form', {
      state: {
        cartItems: localCartItems,
        totalItems: getTotalItems(),
        totalPrice: getTotalPrice(),
        fromCart: true
      }
    });
  };

  // ✅ HANDLE QUANTITY CHANGE - DENGAN LOADING STATE
  const handleQuantityChange = async (equipmentId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleDeleteClick(String(equipmentId));
      return;
    }
    
    setIsUpdating(true);
    try {
      await updateQuantity(equipmentId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // ✅ HANDLE REFRESH CART
  const handleRefreshCart = async () => {
    setIsUpdating(true);
    try {
      await refreshCart();
    } catch (error) {
      console.error('Error refreshing cart:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // ✅ ALERT DIALOG STATE
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteClick = (equipmentId: string) => {
    setItemToDelete(equipmentId);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      setIsUpdating(true);
      try {
        await removeFromCart(Number(itemToDelete));
      } catch (error) {
        console.error('Error removing item:', error);
      } finally {
        setIsUpdating(false);
      }
      setIsDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
    setItemToDelete(null);
  };

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat keranjang...</p>
        </div>
      </div>
    );
  }

  // ✅ EMPTY CART STATE
  if (localCartItems.length === 0) {
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
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 flex flex-col">
        <div className="container mx-auto px-4 flex-1">
          {/* HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
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
            
            {/* ✅ REFRESH BUTTON */}
            <Button 
              variant="outline" 
              onClick={handleRefreshCart}
              disabled={isUpdating}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
              {isUpdating ? 'Memperbarui...' : 'Refresh'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CART ITEMS LIST */}
            <div className="lg:col-span-2 space-y-4">
              {localCartItems.map((item) => {
                const imageUrl = buildImageUrl(item.equipment);
                
                return (
                  <Card key={item.equipment.equipment_id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-4 items-center">
                        {/* EQUIPMENT IMAGE */}
                        <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center overflow-hidden relative">
                          {imageUrl ? (
                            <>
                              <img
                                src={imageUrl}
                                alt={item.equipment.name}
                                className="w-full h-full object-cover"
                                onError={(e) => handleImageError(e, item.equipment)}
                              />
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
                            </div>
                          )}
                        </div>

                        {/* ITEM INFO */}
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
                                onClick={() => handleQuantityChange(item.equipment.equipment_id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || isUpdating}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleQuantityChange(item.equipment.equipment_id, item.quantity + 1)}
                                disabled={item.quantity >= item.equipment.stock_quantity || isUpdating}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteClick(String(item.equipment.equipment_id))}
                              disabled={isUpdating}
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

                        {/* TOTAL PER ITEM */}
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

            {/* ORDER SUMMARY */}
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
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-green-600 hover:bg-green-700 text-base py-2"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Memproses...' : 'Lanjut ke Pembayaran'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full mt-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    disabled={isUpdating}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Kosongkan Keranjang
                  </Button>

                  {/* INFO */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-700 text-center">
                      📦 Gratis pickup & return di lokasi kami
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* BOTTOM ACTIONS */}
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
                    {/* ✅ TOMBOL WHATSAPP MENGGUNAKAN NOMOR DARI CONTEXT */}
                    <a
                      href={`https://wa.me/${contactInfo.phone1.replace(/[^\d]/g, '')}?text=Halo,%20saya%20tertarik%20dengan%20peralatan%20di%20keranjang%20saya`}
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

        {/* ALERT DIALOG */}
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
  );
};

export default CartPage;