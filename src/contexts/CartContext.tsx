import { createContext, useContext, useEffect, useState } from 'react'

// ✅ DEFINE EQUIPMENT INTERFACE
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
  available_stock: number;
  reserved_stock: number;
  rented_stock: number;
  price_per_day: number;
  condition: string;
  equipment_type?: string;
  image_url?: string;
  created_at: string;
}

export interface CartItem {
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

// ✅ CONSISTENT LOCALSTORAGE KEY
const CART_STORAGE_KEY = 'kelana_outdoor_cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // ✅ LOAD FROM LOCALSTORAGE ON MOUNT
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        console.log('🔄 Loading cart from localStorage...')
        const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        
        if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
          const parsedCart = JSON.parse(savedCart)
          console.log('✅ Found saved cart:', parsedCart)
          
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            const validatedCart = parsedCart.map((item: any) => ({
              ...item,
              addedAt: new Date(item.addedAt || new Date())
            }))
            
            setCartItems(validatedCart)
            console.log('✅ Cart loaded successfully:', validatedCart.length, 'items')
          } else {
            console.log('⚠️ Saved cart is empty or invalid')
            setCartItems([])
          }
        } else {
          console.log('ℹ️ No saved cart found')
          setCartItems([])
        }
      } catch (error) {
        console.error('❌ Error loading cart:', error)
        localStorage.removeItem(CART_STORAGE_KEY)
        setCartItems([])
      } finally {
        setIsLoaded(true)
      }
    }

    loadCartFromStorage()
  }, [])

  // ✅ SAVE TO LOCALSTORAGE WHEN CART CHANGES (ONLY AFTER INITIAL LOAD)
  useEffect(() => {
    if (!isLoaded) return // Don't save until we've loaded

    try {
      console.log('💾 Saving cart to localStorage:', cartItems.length, 'items')
      
      if (cartItems.length === 0) {
        localStorage.removeItem(CART_STORAGE_KEY)
        console.log('🗑️ Removed empty cart from localStorage')
      } else {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
        console.log('✅ Cart saved successfully')
      }
    } catch (error) {
      console.error('❌ Error saving cart:', error)
    }
  }, [cartItems, isLoaded])

  const addToCart = (equipment: Equipment, quantity: number = 1) => {
    console.log('🛒 Adding to cart:', equipment.name, 'qty:', quantity)
    
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.equipment.equipment_id === equipment.equipment_id)
      
      if (existingIndex >= 0) {
        console.log('📈 Updating existing item quantity')
        const newCart = [...prev]
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: Math.min(newCart[existingIndex].quantity + quantity, equipment.stock_quantity)
        }
        return newCart
      } else {
        console.log('✨ Adding new item to cart')
        const newItem: CartItem = {
          equipment,
          quantity: Math.min(quantity, equipment.stock_quantity),
          addedAt: new Date()
        }
        return [...prev, newItem]
      }
    })
  }

  const removeFromCart = (equipmentId: number) => {
    console.log('🗑️ Removing from cart:', equipmentId)
    setCartItems(prev => prev.filter(item => item.equipment.equipment_id !== equipmentId))
  }

  const updateQuantity = (equipmentId: number, quantity: number) => {
    console.log('🔢 Updating quantity:', equipmentId, 'to', quantity)
    
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
    console.log('🧹 Clearing cart')
    setCartItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  const getTotalItems = () => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0)
    return total
  }
  
  const getTotalCost = (duration: number) => 
    cartItems.reduce((total, item) => total + (item.equipment.price_per_day * item.quantity * duration), 0)

  const isInCart = (equipmentId: number) => {
    const inCart = cartItems.some(item => item.equipment.equipment_id === equipmentId)
    return inCart
  }

  const getCartItem = (equipmentId: number) => 
    cartItems.find(item => item.equipment.equipment_id === equipmentId)

  // ✅ SHOW LOADING STATE UNTIL CART IS LOADED
  if (!isLoaded) {
    return (
      <CartContext.Provider value={{
        cartItems: [],
        addToCart: () => {},
        removeFromCart: () => {},
        updateQuantity: () => {},
        clearCart: () => {},
        getTotalItems: () => 0,
        getTotalCost: () => 0,
        isInCart: () => false,
        getCartItem: () => undefined
      }}>
        {children}
      </CartContext.Provider>
    )
  }

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
