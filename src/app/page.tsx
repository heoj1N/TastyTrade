import Link from "next/link"
import { Search, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RestaurantCard } from "@/components/restaurant-card"
import { CategoryPills } from "@/components/category-pills"
import { ThemeToggle } from "@/components/theme-toggle"
import { LocationDisplay } from "@/components/location-display"
import { FoodCategories } from "../components/food-categories"
import { CartIcon } from "@/components/cart-icon"

export default function HomePage() {
  const getRandomDiscount = () => Math.floor(Math.random() * (60 - 10 + 1)) + 10;

  const restaurantImages = [
    '/assets/default/img/restaurant-previews/cheeseburger.jpg',
    '/assets/default/img/restaurant-previews/pancake.jpeg',
    '/assets/default/img/restaurant-previews/prawn.jpeg',
    '/assets/default/img/restaurant-previews/salmon.jpg',
    '/assets/default/img/restaurant-previews/spices.jpg',
    '/assets/default/img/restaurant-previews/sushi.jpg',
  ];

  const getSequentialImages = () => {
    const shuffled = [...restaurantImages].sort(() => Math.random() - 0.5);
    const result = [];
    let currentIndex = 0;
    for (let i = 0; i < 6; i++) {
      result.push(shuffled[currentIndex]);
      currentIndex = (currentIndex + 1) % shuffled.length;
    }
    return result;
  };
  const restaurantImageSequence = getSequentialImages();
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-white border-b dark:bg-slate-950 dark:border-slate-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Bite
          </Link>
          
          <div className="flex-1 flex items-center justify-between max-w-4xl mx-4">
            <LocationDisplay className="mr-2" />
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search restaurants..."
                className="w-full rounded-full bg-muted pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <CartIcon />
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <CategoryPills />
        
        {/* Food Categories Section */}
        <div className="mt-6 mb-8">
          <FoodCategories />
        </div>
        
        <h2 className="text-2xl font-bold mt-6 mb-4">Popular Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <RestaurantCard
              key={i}
              id={`restaurant-${i + 1}`}
              name={`Restaurant ${i + 1}`}
              image={restaurantImageSequence[i]}
              rating={Math.floor(Math.random() * 5) + 1}
              deliveryTime={`${Math.floor(Math.random() * 15) + 15}-${Math.floor(Math.random() * 15) + 30} min`}
              deliveryFee={`$${(Math.random() * 3 + 1).toFixed(2)}`}
              categories={["Food", "Restaurant", "Delivery"]}
              discountPercentage={getRandomDiscount()}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

