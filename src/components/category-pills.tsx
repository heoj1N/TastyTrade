"use client"

import { useState } from "react"
import { SandwichIcon as Hamburger, Pizza, Salad, FishIcon as Sushi, Coffee, IceCream } from "lucide-react"

import { cn } from "@/lib/utils"

const categories = [
  { name: "All", icon: null },
  { name: "Burgers", icon: Hamburger },
  { name: "Pizza", icon: Pizza },
  { name: "Healthy", icon: Salad },
  { name: "Sushi", icon: Sushi },
  { name: "Desserts", icon: IceCream },
  { name: "Coffee", icon: Coffee },
]

export function CategoryPills() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <div className="flex overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      <div className="flex gap-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors",
                activeCategory === category.name ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {category.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

