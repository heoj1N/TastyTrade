import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuSection } from "@/components/menu-section"

// This would normally come from an API
const restaurant = {
  id: "1",
  name: "Burger Palace",
  image: "/placeholder.svg?height=300&width=800",
  rating: 4.8,
  reviewCount: 243,
  deliveryTime: "15-25 min",
  deliveryFee: "$1.99",
  address: "123 Main St, New York, NY",
  categories: ["Burgers", "American", "Fast Food"],
  menuSections: [
    {
      name: "Popular Items",
      items: [
        {
          id: "1",
          name: "Classic Cheeseburger",
          description: "Beef patty with cheese, lettuce, tomato, and special sauce",
          price: 8.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "2",
          name: "Bacon Deluxe Burger",
          description: "Beef patty with bacon, cheese, lettuce, tomato, and mayo",
          price: 10.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "3",
          name: "Crispy Chicken Sandwich",
          description: "Crispy chicken with lettuce, pickles, and special sauce",
          price: 9.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      name: "Sides",
      items: [
        {
          id: "4",
          name: "French Fries",
          description: "Crispy golden fries with sea salt",
          price: 3.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "5",
          name: "Onion Rings",
          description: "Crispy battered onion rings",
          price: 4.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      name: "Drinks",
      items: [
        {
          id: "6",
          name: "Soft Drink",
          description: "Choice of Coke, Sprite, or Dr. Pepper",
          price: 2.49,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "7",
          name: "Milkshake",
          description: "Chocolate, Vanilla, or Strawberry",
          price: 5.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
  ],
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-64 w-full">
        <Link href="/" className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
      </div>

      <main className="container px-4 py-6 -mt-10 relative">
        <div className="bg-background rounded-t-xl p-4 shadow-sm">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium text-foreground">{restaurant.rating}</span>
              <span>({restaurant.reviewCount}+ ratings)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{restaurant.address}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {restaurant.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>

          <Tabs defaultValue="menu" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="menu" className="mt-4 space-y-8">
              {restaurant.menuSections.map((section) => (
                <MenuSection key={section.name} section={section} />
              ))}
            </TabsContent>
            <TabsContent value="reviews">
              <div className="py-4 text-center text-muted-foreground">Reviews coming soon</div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

