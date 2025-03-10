"use client"

import Image from "next/image"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
}

interface MenuSectionProps {
  section: {
    name: string
    items: MenuItem[]
  }
}

export function MenuSection({ section }: MenuSectionProps) {
  const { toast } = useToast()

  const addToCart = (item: MenuItem) => {
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{section.name}</h3>
      <div className="space-y-4">
        {section.items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
            </div>
            <div className="relative h-20 w-20 rounded-md overflow-hidden">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              <Button
                size="icon"
                className="absolute bottom-1 right-1 h-7 w-7 rounded-full"
                onClick={() => addToCart(item)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

