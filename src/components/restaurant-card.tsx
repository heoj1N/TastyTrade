import Link from "next/link"
import Image from "next/image"
import { Clock, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface RestaurantCardProps {
  id: string
  name: string
  image: string
  rating: number
  deliveryTime: string
  deliveryFee: string
  categories: string[]
  discountPercentage?: number
}

export function RestaurantCard({
  id,
  name,
  image,
  rating,
  deliveryTime,
  deliveryFee,
  categories,
  discountPercentage,
}: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48 w-full">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          
          {discountPercentage && (
            <div className="absolute top-2 right-2 bg-red-600 text-yellow-300 font-bold px-2 py-1 rounded-md text-sm z-10">
              {discountPercentage}%
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{deliveryTime}</span>
          </div>
          <div>{deliveryFee} delivery</div>
        </CardFooter>
      </Card>
    </Link>
  )
}

