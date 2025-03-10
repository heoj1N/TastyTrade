"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: "burger",
    name: "Burger",
    places: 139,
    image: "/assets/default/img/categories/cheeseburger.jpg"
  },
  {
    id: "asian",
    name: "Asian",
    places: 160,
    image: "/assets/default/img/categories/sushi.jpg"
  },
  {
    id: "indian",
    name: "Indian",
    places: 91,
    image: "/assets/default/img/categories/spices.jpg"
  },
  {
    id: "burger2",
    name: "Burger",
    places: 139,
    image: "/assets/default/img/categories/cheeseburger.jpg"
  },
  {
    id: "asian2",
    name: "Asian",
    places: 160,
    image: "/assets/default/img/categories/sushi.jpg"
  },
  {
    id: "indian2",
    name: "Indian",
    places: 91,
    image: "/assets/default/img/categories/spices.jpg"
  }
]

export function FoodCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const scrollAmount = 300

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftButton(scrollLeft > 0)
    setShowRightButton(scrollLeft + clientWidth < scrollWidth - 10)
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll() // Check initially
      
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Food categories</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className={`rounded-full ${!showLeftButton ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={scrollLeft}
            disabled={!showLeftButton}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className={`rounded-full ${!showRightButton ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={scrollRight}
            disabled={!showRightButton}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="flex-shrink-0 w-56 overflow-hidden rounded-lg bg-black transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <div className="relative h-56 w-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="text-sm opacity-80">{category.places} places</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 