"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  restaurant: string
}

// Default cart items that will be shown on first launch
const defaultCartItems: CartItem[] = [
  {
    id: "1",
    name: "Classic Cheeseburger",
    price: 8.99,
    quantity: 1,
    image: "/assets/default/img/cart/cheeseburger.jpg",
    restaurant: "Burger Palace",
  },
  {
    id: "4",
    name: "French Fries",
    price: 3.99,
    quantity: 1,
    image: "/assets/default/img/cart/fries.jpg",
    restaurant: "Burger Palace",
  },
  {
    id: "6",
    name: "Soft Drink",
    price: 2.49,
    quantity: 1,
    image: "/assets/default/img/cart/coke.jpg",
    restaurant: "Burger Palace",
  },
]

interface CartContextType {
  cartItems: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, change: number) => void
  clearCart: () => void
  resetToDefaults: () => void
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const visitStatus = localStorage.getItem('visited')
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error)
        setCartItems(defaultCartItems)
      }
    } else if (visitStatus !== 'true') {
      // First time visit, use default items
      setCartItems(defaultCartItems)
      localStorage.setItem('visited', 'true')
    }
  }, [])

  // Update localStorage and item count whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
    const count = cartItems.reduce((total, item) => total + item.quantity, 0)
    setItemCount(count)
  }, [cartItems])

  const addItem = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id)
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      } else {
        return [...prev, item]
      }
    })
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const resetToDefaults = () => {
    setCartItems(defaultCartItems)
  }

  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    resetToDefaults,
    itemCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
} 