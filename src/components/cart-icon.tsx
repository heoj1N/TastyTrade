"use client"

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-provider'

interface CartIconProps {
  className?: string
}

export function CartIcon({ className }: CartIconProps) {
  const { itemCount } = useCart()

  return (
    <Link href="/cart">
      <div className="relative">
        <Button size="icon" variant="ghost" className={className}>
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Cart</span>
        </Button>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </div>
    </Link>
  )
} 