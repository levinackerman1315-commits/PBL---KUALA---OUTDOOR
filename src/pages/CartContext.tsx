import { createContext, useContext, useEffect, useState } from 'react'
import { Equipment } from '@/lib/api'

interface CartItem {
  equipment: Equipment
  quantity: number
  addedAt: Date
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (equipment: Equipment, quantity?: number) => void
  removeFromCart: (equipmentId: number) => void
  updateQuantity: (equipmentId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalCost: (duration: number) => number
  isInCart: (equipmentId: number) => boolean
  getCartItem: (equipmentId: number) => CartItem | undefined
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('kelana_cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        })))
      } catch (error) {
        console.error('Error loading cart:', error)
        localStorage.removeItem('kelana_cart')
      }
    }
  }, [])

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('kelana_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (equipment: Equipment, quantity: number = 1) => {
    console.log('Adding to cart:', equipment.name, 'qty:', quantity) // Debug
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.equipment.equipment_id === equipment.equipment_id)
      
      if (existingItem) {
        // Update quantity
        return prev.map(item =>
          item.equipment.equipment_id === equipment.equipment_id
            ? { ...item, quantity: Math.min(item.quantity + quantity, equipment.stock_quantity) }
            : item
        )
      } else {
        // Add new item
        return [...prev, {
          equipment,
          quantity: Math.min(quantity, equipment.stock_quantity),
          addedAt: new Date()
        }]
      }
    })
  }

  const removeFromCart = (equipmentId: number) => {
    setCartItems(prev => prev.filter(item => item.equipment.equipment_id !== equipmentId))
  }

  const updateQuantity = (equipmentId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(equipmentId)
      return
    }

    setCartItems(prev =>
      prev.map(item =>
        item.equipment.equipment_id === equipmentId
          ? { ...item, quantity: Math.min(quantity, item.equipment.stock_quantity) }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('kelana_cart')
  }

  const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0)
  
  const getTotalCost = (duration: number) => 
    cartItems.reduce((total, item) => total + (item.equipment.price_per_day * item.quantity * duration), 0)

  const isInCart = (equipmentId: number) => 
    cartItems.some(item => item.equipment.equipment_id === equipmentId)

  const getCartItem = (equipmentId: number) => 
    cartItems.find(item => item.equipment.equipment_id === equipmentId)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalCost,
      isInCart,
      getCartItem
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}