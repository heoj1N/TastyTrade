"use client"

import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { LocationProvider } from '@/components/location-provider'
import { CartProvider } from '@/components/cart-provider'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LocationProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </LocationProvider>
    </ThemeProvider>
  )
} 