// // // import { createContext, useContext, useEffect, useState } from 'react'

// // // // ✅ DEFINE EQUIPMENT INTERFACE
// // // export interface Equipment {
// // //   equipment_id: number;
// // //   name: string;
// // //   code: string;
// // //   description?: string;
// // //   category: string;
// // //   size_capacity?: string;
// // //   dimensions?: string;
// // //   weight?: number;
// // //   material?: string;
// // //   stock_quantity: number;
// // //   available_stock: number;
// // //   reserved_stock: number;
// // //   rented_stock: number;
// // //   price_per_day: number;
// // //   condition: string;
// // //   equipment_type?: string;
// // //   image_url?: string;
// // //   created_at: string;
// // // }

// // // export interface CartItem {
// // //   equipment: Equipment
// // //   quantity: number
// // //   addedAt: Date
// // // }

// // // interface CartContextType {
// // //   cartItems: CartItem[]
// // //   addToCart: (equipment: Equipment, quantity?: number) => void
// // //   removeFromCart: (equipmentId: number) => void
// // //   updateQuantity: (equipmentId: number, quantity: number) => void
// // //   clearCart: () => void
// // //   getTotalItems: () => number
// // //   getTotalCost: (duration: number) => number
// // //   isInCart: (equipmentId: number) => boolean
// // //   getCartItem: (equipmentId: number) => CartItem | undefined
// // // }

// // // const CartContext = createContext<CartContextType | undefined>(undefined)

// // // // ✅ CONSISTENT LOCALSTORAGE KEY
// // // const CART_STORAGE_KEY = 'kelana_outdoor_cart'

// // // export function CartProvider({ children }: { children: React.ReactNode }) {
// // //   const [cartItems, setCartItems] = useState<CartItem[]>([])
// // //   const [isLoaded, setIsLoaded] = useState(false)

// // //   // ✅ LOAD FROM LOCALSTORAGE ON MOUNT
// // //   useEffect(() => {
// // //     const loadCartFromStorage = () => {
// // //       try {
// // //         console.log('🔄 Loading cart from localStorage...')
// // //         const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        
// // //         if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
// // //           const parsedCart = JSON.parse(savedCart)
// // //           console.log('✅ Found saved cart:', parsedCart)
          
// // //           if (Array.isArray(parsedCart) && parsedCart.length > 0) {
// // //             const validatedCart = parsedCart.map((item: any) => ({
// // //               ...item,
// // //               addedAt: new Date(item.addedAt || new Date())
// // //             }))
            
// // //             setCartItems(validatedCart)
// // //             console.log('✅ Cart loaded successfully:', validatedCart.length, 'items')
// // //           } else {
// // //             console.log('⚠️ Saved cart is empty or invalid')
// // //             setCartItems([])
// // //           }
// // //         } else {
// // //           console.log('ℹ️ No saved cart found')
// // //           setCartItems([])
// // //         }
// // //       } catch (error) {
// // //         console.error('❌ Error loading cart:', error)
// // //         localStorage.removeItem(CART_STORAGE_KEY)
// // //         setCartItems([])
// // //       } finally {
// // //         setIsLoaded(true)
// // //       }
// // //     }

// // //     loadCartFromStorage()
// // //   }, [])

// // //   // ✅ SAVE TO LOCALSTORAGE WHEN CART CHANGES (ONLY AFTER INITIAL LOAD)
// // //   useEffect(() => {
// // //     if (!isLoaded) return // Don't save until we've loaded

// // //     try {
// // //       console.log('💾 Saving cart to localStorage:', cartItems.length, 'items')
      
// // //       if (cartItems.length === 0) {
// // //         localStorage.removeItem(CART_STORAGE_KEY)
// // //         console.log('🗑️ Removed empty cart from localStorage')
// // //       } else {
// // //         localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
// // //         console.log('✅ Cart saved successfully')
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ Error saving cart:', error)
// // //     }
// // //   }, [cartItems, isLoaded])

// // //   const addToCart = (equipment: Equipment, quantity: number = 1) => {
// // //     console.log('🛒 Adding to cart:', equipment.name, 'qty:', quantity)
    
// // //     setCartItems(prev => {
// // //       const existingIndex = prev.findIndex(item => item.equipment.equipment_id === equipment.equipment_id)
      
// // //       if (existingIndex >= 0) {
// // //         console.log('📈 Updating existing item quantity')
// // //         const newCart = [...prev]
// // //         newCart[existingIndex] = {
// // //           ...newCart[existingIndex],
// // //           quantity: Math.min(newCart[existingIndex].quantity + quantity, equipment.stock_quantity)
// // //         }
// // //         return newCart
// // //       } else {
// // //         console.log('✨ Adding new item to cart')
// // //         const newItem: CartItem = {
// // //           equipment,
// // //           quantity: Math.min(quantity, equipment.stock_quantity),
// // //           addedAt: new Date()
// // //         }
// // //         return [...prev, newItem]
// // //       }
// // //     })
// // //   }

// // //   const removeFromCart = (equipmentId: number) => {
// // //     console.log('🗑️ Removing from cart:', equipmentId)
// // //     setCartItems(prev => prev.filter(item => item.equipment.equipment_id !== equipmentId))
// // //   }

// // //   const updateQuantity = (equipmentId: number, quantity: number) => {
// // //     console.log('🔢 Updating quantity:', equipmentId, 'to', quantity)
    
// // //     if (quantity <= 0) {
// // //       removeFromCart(equipmentId)
// // //       return
// // //     }

// // //     setCartItems(prev =>
// // //       prev.map(item =>
// // //         item.equipment.equipment_id === equipmentId
// // //           ? { ...item, quantity: Math.min(quantity, item.equipment.stock_quantity) }
// // //           : item
// // //       )
// // //     )
// // //   }

// // //   const clearCart = () => {
// // //     console.log('🧹 Clearing cart')
// // //     setCartItems([])
// // //     localStorage.removeItem(CART_STORAGE_KEY)
// // //   }

// // //   const getTotalItems = () => {
// // //     const total = cartItems.reduce((total, item) => total + item.quantity, 0)
// // //     return total
// // //   }
  
// // //   const getTotalCost = (duration: number) => 
// // //     cartItems.reduce((total, item) => total + (item.equipment.price_per_day * item.quantity * duration), 0)

// // //   const isInCart = (equipmentId: number) => {
// // //     const inCart = cartItems.some(item => item.equipment.equipment_id === equipmentId)
// // //     return inCart
// // //   }

// // //   const getCartItem = (equipmentId: number) => 
// // //     cartItems.find(item => item.equipment.equipment_id === equipmentId)

// // //   // ✅ SHOW LOADING STATE UNTIL CART IS LOADED
// // //   if (!isLoaded) {
// // //     return (
// // //       <CartContext.Provider value={{
// // //         cartItems: [],
// // //         addToCart: () => {},
// // //         removeFromCart: () => {},
// // //         updateQuantity: () => {},
// // //         clearCart: () => {},
// // //         getTotalItems: () => 0,
// // //         getTotalCost: () => 0,
// // //         isInCart: () => false,
// // //         getCartItem: () => undefined
// // //       }}>
// // //         {children}
// // //       </CartContext.Provider>
// // //     )
// // //   }

// // //   return (
// // //     <CartContext.Provider value={{
// // //       cartItems,
// // //       addToCart,
// // //       removeFromCart,
// // //       updateQuantity,
// // //       clearCart,
// // //       getTotalItems,
// // //       getTotalCost,
// // //       isInCart,
// // //       getCartItem
// // //     }}>
// // //       {children}
// // //     </CartContext.Provider>
// // //   )
// // // }

// // // export function useCart() {
// // //   const context = useContext(CartContext)
// // //   if (context === undefined) {
// // //     throw new Error('useCart must be used within a CartProvider')
// // //   }
// // //   return context
// // // }


// // import { createContext, useContext, useEffect, useState } from 'react'

// // // ✅ DEFINE EQUIPMENT INTERFACE - UPDATE DENGAN DATA SEBENARNYA DARI API
// // export interface EquipmentImage {
// //   image_id: number;
// //   image_url: string;
// //   is_primary: boolean;
// //   display_order: number;
// // }

// // export interface Equipment {
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
// //   images: EquipmentImage[]; // ✅ TAMBAHKAN FIELD INI
// //   created_at: string;
// // }

// // export interface CartItem {
// //   equipment: Equipment
// //   quantity: number
// //   addedAt: Date
// // }

// // interface CartContextType {
// //   cartItems: CartItem[]
// //   addToCart: (equipment: Equipment, quantity?: number) => void
// //   removeFromCart: (equipmentId: number) => void
// //   updateQuantity: (equipmentId: number, quantity: number) => void
// //   clearCart: () => void
// //   getTotalItems: () => number
// //   getTotalCost: (duration: number) => number
// //   isInCart: (equipmentId: number) => boolean
// //   getCartItem: (equipmentId: number) => CartItem | undefined
// // }

// // const CartContext = createContext<CartContextType | undefined>(undefined)

// // // ✅ CONSISTENT LOCALSTORAGE KEY
// // const CART_STORAGE_KEY = 'kelana_outdoor_cart'

// // export function CartProvider({ children }: { children: React.ReactNode }) {
// //   const [cartItems, setCartItems] = useState<CartItem[]>([])
// //   const [isLoaded, setIsLoaded] = useState(false)

// //   // ✅ LOAD FROM LOCALSTORAGE ON MOUNT - DIPERBAIKI
// //   useEffect(() => {
// //     const loadCartFromStorage = () => {
// //       try {
// //         console.log('🔄 Loading cart from localStorage...')
// //         const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        
// //         if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
// //           const parsedCart = JSON.parse(savedCart)
// //           console.log('✅ Found saved cart:', parsedCart)
          
// //           if (Array.isArray(parsedCart) && parsedCart.length > 0) {
// //             // ✅ VALIDASI DAN TRANSFORMASI DATA YANG LEBIH BAIK
// //             const validatedCart = parsedCart
// //               .filter((item: any) => 
// //                 item && 
// //                 item.equipment && 
// //                 item.equipment.equipment_id &&
// //                 item.quantity > 0
// //               )
// //               .map((item: any) => ({
// //                 ...item,
// //                 equipment: {
// //                   ...item.equipment,
// //                   // ✅ PASTIKAN images ADA, JIKA TIDAK BERI ARRAY KOSONG
// //                   images: item.equipment.images || []
// //                 },
// //                 addedAt: new Date(item.addedAt || new Date())
// //               }))
            
// //             setCartItems(validatedCart)
// //             console.log('✅ Cart loaded successfully:', validatedCart.length, 'items')
// //           } else {
// //             console.log('⚠️ Saved cart is empty or invalid')
// //             setCartItems([])
// //           }
// //         } else {
// //           console.log('ℹ️ No saved cart found')
// //           setCartItems([])
// //         }
// //       } catch (error) {
// //         console.error('❌ Error loading cart:', error)
// //         localStorage.removeItem(CART_STORAGE_KEY)
// //         setCartItems([])
// //       } finally {
// //         setIsLoaded(true)
// //       }
// //     }

// //     loadCartFromStorage()
// //   }, [])

// //   // ✅ SAVE TO LOCALSTORAGE WHEN CART CHANGES (ONLY AFTER INITIAL LOAD)
// //   useEffect(() => {
// //     if (!isLoaded) return // Don't save until we've loaded

// //     try {
// //       console.log('💾 Saving cart to localStorage:', cartItems.length, 'items')
      
// //       if (cartItems.length === 0) {
// //         localStorage.removeItem(CART_STORAGE_KEY)
// //         console.log('🗑️ Removed empty cart from localStorage')
// //       } else {
// //         localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
// //         console.log('✅ Cart saved successfully')
// //       }
// //     } catch (error) {
// //       console.error('❌ Error saving cart:', error)
// //     }
// //   }, [cartItems, isLoaded])

// //   // ✅ ADD TO CART - DIPERBAIKI DENGAN VALIDASI LEBIH BAIK
// //   const addToCart = (equipment: Equipment, quantity: number = 1) => {
// //     console.log('🛒 Adding to cart:', equipment.name, 'qty:', quantity)
    
// //     // ✅ VALIDASI STOCK
// //     if (equipment.stock_quantity <= 0) {
// //       console.error('❌ Cannot add item with zero stock')
// //       alert('❌ Item tidak dapat ditambahkan karena stok habis')
// //       return
// //     }

// //     if (quantity <= 0) {
// //       console.error('❌ Invalid quantity')
// //       return
// //     }

// //     setCartItems(prev => {
// //       const existingIndex = prev.findIndex(item => 
// //         item.equipment.equipment_id === equipment.equipment_id
// //       )
      
// //       if (existingIndex >= 0) {
// //         console.log('📈 Updating existing item quantity')
// //         const newCart = [...prev]
// //         const newQuantity = Math.min(
// //           newCart[existingIndex].quantity + quantity, 
// //           equipment.stock_quantity
// //         )
        
// //         if (newQuantity <= 0) {
// //           // Jika quantity menjadi 0 atau negatif, hapus item
// //           return prev.filter(item => item.equipment.equipment_id !== equipment.equipment_id)
// //         }

// //         newCart[existingIndex] = {
// //           ...newCart[existingIndex],
// //           quantity: newQuantity
// //         }
// //         return newCart
// //       } else {
// //         console.log('✨ Adding new item to cart')
// //         const newItem: CartItem = {
// //           equipment: {
// //             ...equipment,
// //             // ✅ PASTIKAN images ADA
// //             images: equipment.images || []
// //           },
// //           quantity: Math.min(quantity, equipment.stock_quantity),
// //           addedAt: new Date()
// //         }
// //         return [...prev, newItem]
// //       }
// //     })
// //   }

// //   // ✅ REMOVE FROM CART - DIPERBAIKI
// //   const removeFromCart = (equipmentId: number) => {
// //     console.log('🗑️ Removing from cart:', equipmentId)
// //     setCartItems(prev => prev.filter(item => item.equipment.equipment_id !== equipmentId))
// //   }

// //   // ✅ UPDATE QUANTITY - DIPERBAIKI DENGAN VALIDASI
// //   const updateQuantity = (equipmentId: number, quantity: number) => {
// //     console.log('🔢 Updating quantity:', equipmentId, 'to', quantity)
    
// //     if (quantity <= 0) {
// //       removeFromCart(equipmentId)
// //       return
// //     }

// //     setCartItems(prev =>
// //       prev.map(item => {
// //         if (item.equipment.equipment_id === equipmentId) {
// //           const maxQuantity = item.equipment.stock_quantity
// //           const newQuantity = Math.min(quantity, maxQuantity)
          
// //           if (newQuantity <= 0) {
// //             return item // Tetap return item, biar removeFromCart yang handle
// //           }
          
// //           return { 
// //             ...item, 
// //             quantity: newQuantity 
// //           }
// //         }
// //         return item
// //       })
// //     )
// //   }

// //   const clearCart = () => {
// //     console.log('🧹 Clearing cart')
// //     setCartItems([])
// //     localStorage.removeItem(CART_STORAGE_KEY)
// //   }

// //   const getTotalItems = () => {
// //     const total = cartItems.reduce((total, item) => total + item.quantity, 0)
// //     console.log('📊 Total items in cart:', total)
// //     return total
// //   }
  
// //   const getTotalCost = (duration: number) => {
// //     const total = cartItems.reduce(
// //       (total, item) => total + (item.equipment.price_per_day * item.quantity * duration), 
// //       0
// //     )
// //     console.log('💰 Total cost for', duration, 'days:', total)
// //     return total
// //   }

// //   const isInCart = (equipmentId: number) => {
// //     const inCart = cartItems.some(item => item.equipment.equipment_id === equipmentId)
// //     console.log('🔍 Is equipment', equipmentId, 'in cart?', inCart)
// //     return inCart
// //   }

// //   const getCartItem = (equipmentId: number) => {
// //     const item = cartItems.find(item => item.equipment.equipment_id === equipmentId)
// //     console.log('🔍 Getting cart item:', equipmentId, item ? 'found' : 'not found')
// //     return item
// //   }

// //   // ✅ SHOW LOADING STATE UNTIL CART IS LOADED
// //   if (!isLoaded) {
// //     console.log('⏳ Cart context not loaded yet, showing loading state')
// //     return (
// //       <CartContext.Provider value={{
// //         cartItems: [],
// //         addToCart: () => console.warn('🔄 Cart not loaded yet'),
// //         removeFromCart: () => console.warn('🔄 Cart not loaded yet'),
// //         updateQuantity: () => console.warn('🔄 Cart not loaded yet'),
// //         clearCart: () => console.warn('🔄 Cart not loaded yet'),
// //         getTotalItems: () => 0,
// //         getTotalCost: () => 0,
// //         isInCart: () => false,
// //         getCartItem: () => undefined
// //       }}>
// //         {children}
// //       </CartContext.Provider>
// //     )
// //   }

// //   console.log('✅ Cart context fully loaded with', cartItems.length, 'items')
  
// //   return (
// //     <CartContext.Provider value={{
// //       cartItems,
// //       addToCart,
// //       removeFromCart,
// //       updateQuantity,
// //       clearCart,
// //       getTotalItems,
// //       getTotalCost,
// //       isInCart,
// //       getCartItem
// //     }}>
// //       {children}
// //     </CartContext.Provider>
// //   )
// // }

// // export function useCart() {
// //   const context = useContext(CartContext)
// //   if (context === undefined) {
// //     throw new Error('useCart must be used within a CartProvider')
// //   }
// //   return context
// // }


// import { createContext, useContext, useEffect, useState } from 'react'
// import { useAuth } from './AuthContext'

// // ✅ INTERFACE YANG SESUAI DENGAN DATABASE
// export interface EquipmentImage {
//   image_id: number;
//   image_url: string;
//   is_primary: boolean;
//   display_order: number;
// }

// export interface Equipment {
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
//   condition: string; // ✅ condition_item di database di-map ke condition
//   equipment_type?: string;
//   image_url?: string;
//   created_at: string;
  
//   // ✅ FIELD YANG DIBUTUHKAN FRONTEND - BERI DEFAULT VALUE
//   available_stock?: number;
//   reserved_stock?: number;
//   rented_stock?: number;
//   images?: EquipmentImage[];
// }

// export interface CartItem {
//   cart_id?: number;
//   equipment: Equipment
//   quantity: number
//   addedAt: Date
// }

// interface CartContextType {
//   cartItems: CartItem[]
//   addToCart: (equipment: Equipment, quantity?: number) => Promise<void>
//   removeFromCart: (equipmentId: number) => Promise<void>
//   updateQuantity: (equipmentId: number, quantity: number) => Promise<void>
//   clearCart: () => Promise<void>
//   getTotalItems: () => number
//   getTotalCost: (duration: number) => number
//   isInCart: (equipmentId: number) => boolean
//   getCartItem: (equipmentId: number) => CartItem | undefined
//   loading: boolean
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost/PBL-KELANA-OUTDOOR/api/public'

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const { user } = useAuth()
//   const [cartItems, setCartItems] = useState<CartItem[]>([])
//   const [loading, setLoading] = useState(true)

//   // ✅ LOAD CART DARI DATABASE - DENGAN DATA TRANSFORMATION
//   useEffect(() => {
//     const loadCartFromServer = async () => {
//       if (!user) {
//         console.log('ℹ️ No user logged in, clearing cart')
//         setCartItems([])
//         setLoading(false)
//         return
//       }

//       try {
//         console.log('🔄 Loading cart from server for user:', user.id)
//         setLoading(true)
        
//         const response = await fetch(`${API_BASE}/cart/get.php?customer_id=${user.id}`)
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }
        
//         const data = await response.json()
//         console.log('📥 Cart data from server:', data)
        
//         if (data.success && Array.isArray(data.cart_items)) {
//           // ✅ TRANSFORM DATA UNTUK MATCH DENGAN INTERFACE
//           const formattedCart = data.cart_items.map((item: any) => {
//             const equipmentData = item.equipment;
            
//             return {
//               cart_id: item.cart_id,
//               equipment: {
//                 // ✅ DATA DARI DATABASE
//                 equipment_id: equipmentData.equipment_id,
//                 name: equipmentData.name,
//                 code: equipmentData.code,
//                 description: equipmentData.description,
//                 category: equipmentData.category,
//                 size_capacity: equipmentData.size_capacity,
//                 dimensions: equipmentData.dimensions,
//                 weight: equipmentData.weight,
//                 material: equipmentData.material,
//                 stock_quantity: equipmentData.stock_quantity,
//                 price_per_day: equipmentData.price_per_day,
//                 condition: equipmentData.condition, // ✅ condition_item sudah di-map di backend
//                 equipment_type: equipmentData.equipment_type,
//                 image_url: equipmentData.image_url,
//                 created_at: equipmentData.created_at,
                
//                 // ✅ DEFAULT VALUES UNTUK FIELD YANG TIDAK ADA DI DATABASE
//                 available_stock: equipmentData.available_stock || equipmentData.stock_quantity,
//                 reserved_stock: equipmentData.reserved_stock || 0,
//                 rented_stock: equipmentData.rented_stock || 0,
//                 images: equipmentData.images || []
//               },
//               quantity: item.quantity,
//               addedAt: new Date(item.added_at)
//             }
//           })
          
//           setCartItems(formattedCart)
//           console.log('✅ Cart loaded from database:', formattedCart.length, 'items')
//         } else {
//           setCartItems([])
//           console.log('ℹ️ No cart items found in database')
//         }
//       } catch (error) {
//         console.error('❌ Error loading cart from database:', error)
//         setCartItems([])
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadCartFromServer()
//   }, [user])

//   // ✅ ADD TO CART - DENGAN EQUIPMENT DATA YANG SESUAI
//   const addToCart = async (equipment: Equipment, quantity: number = 1): Promise<void> => {
//     if (!user) {
//       throw new Error('Anda harus login terlebih dahulu!')
//     }

//     if (equipment.stock_quantity <= 0) {
//       throw new Error('Item tidak dapat ditambahkan karena stok habis')
//     }

//     try {
//       console.log('🛒 Adding to cart via API:', equipment.name, 'qty:', quantity)
      
//       const response = await fetch(`${API_BASE}/cart/add.php`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           customer_id: parseInt(user.id),
//           equipment_id: equipment.equipment_id,
//           quantity: quantity
//         })
//       })
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const data = await response.json()
//       console.log('📥 Add to cart response:', data)
      
//       if (data.success) {
//         // ✅ RELOAD CART DARI SERVER SETELAH BERHASIL
//         console.log('🔄 Reloading cart after successful add...')
//         const reloadResponse = await fetch(`${API_BASE}/cart/get.php?customer_id=${user.id}`)
//         const reloadData = await reloadResponse.json()
        
//         if (reloadData.success && Array.isArray(reloadData.cart_items)) {
//           const formattedCart = reloadData.cart_items.map((item: any) => {
//             const equipmentData = item.equipment;
            
//             return {
//               cart_id: item.cart_id,
//               equipment: {
//                 equipment_id: equipmentData.equipment_id,
//                 name: equipmentData.name,
//                 code: equipmentData.code,
//                 description: equipmentData.description,
//                 category: equipmentData.category,
//                 size_capacity: equipmentData.size_capacity,
//                 dimensions: equipmentData.dimensions,
//                 weight: equipmentData.weight,
//                 material: equipmentData.material,
//                 stock_quantity: equipmentData.stock_quantity,
//                 price_per_day: equipmentData.price_per_day,
//                 condition: equipmentData.condition,
//                 equipment_type: equipmentData.equipment_type,
//                 image_url: equipmentData.image_url,
//                 created_at: equipmentData.created_at,
//                 available_stock: equipmentData.available_stock || equipmentData.stock_quantity,
//                 reserved_stock: equipmentData.reserved_stock || 0,
//                 rented_stock: equipmentData.rented_stock || 0,
//                 images: equipmentData.images || []
//               },
//               quantity: item.quantity,
//               addedAt: new Date(item.added_at)
//             }
//           })
          
//           setCartItems(formattedCart)
//           console.log('✅ Cart updated from database')
//         }
//       } else {
//         throw new Error(data.message || 'Gagal menambahkan ke keranjang')
//       }
//     } catch (error: any) {
//       console.error('❌ Error adding to cart:', error)
//       throw error
//     }
//   }

//   // ✅ REMOVE FROM CART
//   const removeFromCart = async (equipmentId: number): Promise<void> => {
//     if (!user) {
//       throw new Error('User not logged in')
//     }

//     try {
//       console.log('🗑️ Removing from cart via API:', equipmentId)
      
//       const response = await fetch(`${API_BASE}/cart/delete.php`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           customer_id: parseInt(user.id),
//           equipment_id: equipmentId
//         })
//       })
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const data = await response.json()
//       console.log('📥 Remove from cart response:', data)
      
//       if (data.success) {
//         setCartItems(prev => prev.filter(item => item.equipment.equipment_id !== equipmentId))
//         console.log('✅ Item removed from cart')
//       } else {
//         throw new Error(data.message || 'Gagal menghapus item')
//       }
//     } catch (error: any) {
//       console.error('❌ Error removing from cart:', error)
//       throw error
//     }
//   }

//   // ✅ UPDATE QUANTITY
//   const updateQuantity = async (equipmentId: number, quantity: number): Promise<void> => {
//     if (!user) {
//       throw new Error('User not logged in')
//     }

//     try {
//       console.log('🔢 Updating quantity via API:', equipmentId, 'to', quantity)
      
//       const response = await fetch(`${API_BASE}/cart/update.php`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           customer_id: parseInt(user.id),
//           equipment_id: equipmentId,
//           quantity: quantity
//         })
//       })
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const data = await response.json()
//       console.log('📥 Update quantity response:', data)
      
//       if (data.success) {
//         if (quantity <= 0) {
//           setCartItems(prev => prev.filter(item => item.equipment.equipment_id !== equipmentId))
//         } else {
//           setCartItems(prev =>
//             prev.map(item =>
//               item.equipment.equipment_id === equipmentId
//                 ? { ...item, quantity: quantity }
//                 : item
//             )
//           )
//         }
//         console.log('✅ Quantity updated in database')
//       } else {
//         throw new Error(data.message || 'Gagal update quantity')
//       }
//     } catch (error: any) {
//       console.error('❌ Error updating quantity:', error)
//       throw error
//     }
//   }

//   // ✅ CLEAR CART
//   const clearCart = async (): Promise<void> => {
//     if (!user) {
//       throw new Error('User not logged in')
//     }

//     try {
//       console.log('🧹 Clearing cart via API')
      
//       const deletePromises = cartItems.map(item =>
//         fetch(`${API_BASE}/cart/delete.php`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             customer_id: parseInt(user.id),
//             equipment_id: item.equipment.equipment_id
//           })
//         })
//       )
      
//       await Promise.all(deletePromises)
//       setCartItems([])
//       console.log('✅ Cart cleared from database')
//     } catch (error: any) {
//       console.error('❌ Error clearing cart:', error)
//       throw error
//     }
//   }

//   // ✅ HELPER FUNCTIONS
//   const getTotalItems = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0)
//   }
  
//   const getTotalCost = (duration: number) => {
//     return cartItems.reduce(
//       (total, item) => total + (item.equipment.price_per_day * item.quantity * duration), 
//       0
//     )
//   }

//   const isInCart = (equipmentId: number) => {
//     return cartItems.some(item => item.equipment.equipment_id === equipmentId)
//   }

//   const getCartItem = (equipmentId: number) => {
//     return cartItems.find(item => item.equipment.equipment_id === equipmentId)
//   }

//   const value = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     getTotalItems,
//     getTotalCost,
//     isInCart,
//     getCartItem,
//     loading
//   }

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   )
// }

// export function useCart() {
//   const context = useContext(CartContext)
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider')
//   }
//   return context
// }

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthContext'

// ✅ INTERFACE YANG SESUAI DENGAN DATABASE
export interface EquipmentImage {
  image_id: number;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

export interface Equipment {
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
  price_per_day: number;
  condition: string;
  equipment_type?: string;
  image_url?: string;
  created_at: string;
  available_stock?: number;
  reserved_stock?: number;
  rented_stock?: number;
  images?: EquipmentImage[];
}

export interface CartItem {
  cart_id?: number;
  equipment: Equipment;
  quantity: number;
  addedAt: Date;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (equipment: Equipment, quantity?: number) => Promise<void>;
  removeFromCart: (equipmentId: number) => Promise<void>;
  updateQuantity: (equipmentId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalCost: (duration: number) => number;
  isInCart: (equipmentId: number) => boolean;
  getCartItem: (equipmentId: number) => CartItem | undefined;
  loading: boolean;
  refreshCart: () => Promise<void>; // ✅ FUNCTION BARU UNTUK REFRESH MANUAL
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost/PBL-KELANA-OUTDOOR/api/public';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FUNCTION UNTUK LOAD CART DARI SERVER - BISA DIPANGGIL ULANG
  const loadCartFromServer = useCallback(async () => {
    if (!user) {
      console.log('ℹ️ No user logged in, clearing cart');
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      console.log('🔄 Loading cart from server for user:', user.id);
      setLoading(true);
      
      const response = await fetch(`${API_BASE}/cart/get.php?customer_id=${user.id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 Cart data from server:', data);
      
      if (data.success && Array.isArray(data.cart_items)) {
        const formattedCart = data.cart_items.map((item: any) => {
          const equipmentData = item.equipment;
          
          return {
            cart_id: item.cart_id,
            equipment: {
              equipment_id: equipmentData.equipment_id,
              name: equipmentData.name,
              code: equipmentData.code,
              description: equipmentData.description,
              category: equipmentData.category,
              size_capacity: equipmentData.size_capacity,
              dimensions: equipmentData.dimensions,
              weight: equipmentData.weight,
              material: equipmentData.material,
              stock_quantity: equipmentData.stock_quantity,
              price_per_day: equipmentData.price_per_day,
              condition: equipmentData.condition,
              equipment_type: equipmentData.equipment_type,
              image_url: equipmentData.image_url,
              created_at: equipmentData.created_at,
              available_stock: equipmentData.available_stock || equipmentData.stock_quantity,
              reserved_stock: equipmentData.reserved_stock || 0,
              rented_stock: equipmentData.rented_stock || 0,
              images: equipmentData.images || []
            },
            quantity: item.quantity,
            addedAt: new Date(item.added_at)
          };
        });
        
        setCartItems(formattedCart);
        console.log('✅ Cart loaded from database:', formattedCart.length, 'items');
      } else {
        setCartItems([]);
        console.log('ℹ️ No cart items found in database');
      }
    } catch (error) {
      console.error('❌ Error loading cart from database:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // ✅ LOAD CART SAAT PERTAMA KALI ATAU USER BERUBAH
  useEffect(() => {
    loadCartFromServer();
  }, [loadCartFromServer]);

  // ✅ ADD TO CART
  const addToCart = async (equipment: Equipment, quantity: number = 1): Promise<void> => {
    if (!user) {
      throw new Error('Anda harus login terlebih dahulu!');
    }

    if (equipment.stock_quantity <= 0) {
      throw new Error('Item tidak dapat ditambahkan karena stok habis');
    }

    try {
      console.log('🛒 Adding to cart via API:', equipment.name, 'qty:', quantity);
      
      const response = await fetch(`${API_BASE}/cart/add.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: parseInt(user.id),
          equipment_id: equipment.equipment_id,
          quantity: quantity
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 Add to cart response:', data);
      
      if (data.success) {
        // ✅ RELOAD CART SETELAH BERHASIL UNTUK REAL-TIME UPDATE
        await loadCartFromServer();
        console.log('✅ Cart updated from database');
      } else {
        throw new Error(data.message || 'Gagal menambahkan ke keranjang');
      }
    } catch (error: any) {
      console.error('❌ Error adding to cart:', error);
      throw error;
    }
  };

  // ✅ REMOVE FROM CART
  const removeFromCart = async (equipmentId: number): Promise<void> => {
    if (!user) {
      throw new Error('User not logged in');
    }

    try {
      console.log('🗑️ Removing from cart via API:', equipmentId);
      
      const response = await fetch(`${API_BASE}/cart/delete.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: parseInt(user.id),
          equipment_id: equipmentId
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 Remove from cart response:', data);
      
      if (data.success) {
        // ✅ RELOAD CART SETELAH BERHASIL UNTUK REAL-TIME UPDATE
        await loadCartFromServer();
        console.log('✅ Item removed from cart');
      } else {
        throw new Error(data.message || 'Gagal menghapus item');
      }
    } catch (error: any) {
      console.error('❌ Error removing from cart:', error);
      throw error;
    }
  };

  // ✅ UPDATE QUANTITY
  const updateQuantity = async (equipmentId: number, quantity: number): Promise<void> => {
    if (!user) {
      throw new Error('User not logged in');
    }

    try {
      console.log('🔢 Updating quantity via API:', equipmentId, 'to', quantity);
      
      const response = await fetch(`${API_BASE}/cart/update.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: parseInt(user.id),
          equipment_id: equipmentId,
          quantity: quantity
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 Update quantity response:', data);
      
      if (data.success) {
        // ✅ RELOAD CART SETELAH BERHASIL UNTUK REAL-TIME UPDATE
        await loadCartFromServer();
        console.log('✅ Quantity updated in database');
      } else {
        throw new Error(data.message || 'Gagal update quantity');
      }
    } catch (error: any) {
      console.error('❌ Error updating quantity:', error);
      throw error;
    }
  };

  // ✅ CLEAR CART
  const clearCart = async (): Promise<void> => {
    if (!user) {
      throw new Error('User not logged in');
    }

    try {
      console.log('🧹 Clearing cart via API');
      
      const deletePromises = cartItems.map(item =>
        fetch(`${API_BASE}/cart/delete.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_id: parseInt(user.id),
            equipment_id: item.equipment.equipment_id
          })
        })
      );
      
      await Promise.all(deletePromises);
      // ✅ RELOAD CART SETELAH BERHASIL UNTUK REAL-TIME UPDATE
      await loadCartFromServer();
      console.log('✅ Cart cleared from database');
    } catch (error: any) {
      console.error('❌ Error clearing cart:', error);
      throw error;
    }
  };

  // ✅ REFRESH CART MANUAL
  const refreshCart = async (): Promise<void> => {
    await loadCartFromServer();
  };

  // ✅ HELPER FUNCTIONS
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + (item.equipment.price_per_day * item.quantity), 
      0
    );
  };

  const getTotalCost = (duration: number) => {
    return cartItems.reduce(
      (total, item) => total + (item.equipment.price_per_day * item.quantity * duration), 
      0
    );
  };

  const isInCart = (equipmentId: number) => {
    return cartItems.some(item => item.equipment.equipment_id === equipmentId);
  };

  const getCartItem = (equipmentId: number) => {
    return cartItems.find(item => item.equipment.equipment_id === equipmentId);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getTotalCost,
    isInCart,
    getCartItem,
    loading,
    refreshCart // ✅ EXPOSE REFRESH FUNCTION
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}