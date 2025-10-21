import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// ✅ EXPORT INTERFACE
export interface Equipment {
  equipment_id: number
  name: string
  code: string
  category: string
  price_per_day: number
  stock_quantity: number
  condition: string
  image_url?: string | null
  description?: string
  size_capacity?: string
  dimensions?: string
  weight?: number
  material?: string
  available_stock?: number
  reserved_stock?: number
  rented_stock?: number
  equipment_type?: string
  created_at?: string
}

export interface CartItem {
  equipment: Equipment
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (equipment: Equipment, quantity?: number) => void
  updateQuantity: (equipmentId: number, quantity: number) => void
  removeFromCart: (equipmentId: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getCartCount: () => number
  isInCart: (equipmentId: number) => boolean // ✅ TAMBAH INI
  getCartItem: (equipmentId: number) => CartItem | undefined // ✅ TAMBAH INI
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load from localStorage
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (equipment: Equipment, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.equipment.equipment_id === equipment.equipment_id)
      
      if (existing) {
        return prev.map(item =>
          item.equipment.equipment_id === equipment.equipment_id
            ? { ...item, quantity: Math.min(item.quantity + quantity, equipment.stock_quantity) }
            : item
        )
      }
      
      return [...prev, { equipment, quantity }]
    })
  }

  const updateQuantity = (equipmentId: number, quantity: number) => {
    if (quantity < 1) return
    
    setCartItems(prev =>
      prev.map(item =>
        item.equipment.equipment_id === equipmentId
          ? { ...item, quantity: Math.min(quantity, item.equipment.stock_quantity) }
          : item
      )
    )
  }

  const removeFromCart = (equipmentId: number) => {
    setCartItems(prev => prev.filter(item => item.equipment.equipment_id !== equipmentId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  // ✅ FUNGSI UNTUK MENDAPATKAN JUMLAH JENIS BARANG (BUKAN TOTAL QUANTITY)
  const getCartCount = () => {
    return cartItems.length
  }

  // ✅ TAMBAH FUNGSI INI - Cek apakah equipment ada di cart
  const isInCart = (equipmentId: number): boolean => {
    return cartItems.some(item => item.equipment.equipment_id === equipmentId)
  }

  // ✅ TAMBAH FUNGSI INI - Ambil item dari cart by ID
  const getCartItem = (equipmentId: number) => {
    return cartItems.find(item => item.equipment.equipment_id === equipmentId)
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getTotalItems,
      getCartCount,
      isInCart, // ✅ EXPOSE FUNGSI BARU
      getCartItem // ✅ EXPOSE FUNGSI BARU
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}