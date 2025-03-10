"use client"

import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocationContext } from "./location-provider"

interface LocationDisplayProps {
  className?: string
}

export function LocationDisplay({ className }: LocationDisplayProps) {
  const { location, isLoading, hasLocation, showLocationDialog } = useLocationContext()
  
  return (
    <Button 
      variant="ghost" 
      className={`flex items-center gap-2 px-2 py-1 h-auto ${className}`}
      onClick={showLocationDialog}
    >
      <MapPin className="h-4 w-4 text-blue-500" />
      <span className="text-sm font-medium truncate max-w-[150px]">
        {isLoading 
          ? "Loading..." 
          : hasLocation 
          ? `${location?.street}, ${location?.country}` 
          : "Add your location"}
      </span>
    </Button>
  )
} 