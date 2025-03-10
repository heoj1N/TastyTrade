"use client"

import { ReactNode, createContext, useContext, useState } from "react"
import { useLocation, UserLocation } from "@/hooks/use-location"
import { LocationDialog } from "@/components/location-dialog"

interface LocationContextType {
  showLocationDialog: () => void
  location: UserLocation | null
  isLoading: boolean
  hasLocation: boolean
  updateLocation: (location: UserLocation) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function useLocationContext() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider')
  }
  return context
}

interface LocationProviderProps {
  children: ReactNode
}

export function LocationProvider({ children }: LocationProviderProps) {
  const { location, updateLocation, isLoading, hasLocation } = useLocation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const handleLocationSelected = (location: UserLocation) => {
    updateLocation(location)
    setIsDialogOpen(false)
  }
  
  const showLocationDialog = () => {
    setIsDialogOpen(true)
  }
  
  return (
    <LocationContext.Provider value={{ 
      showLocationDialog, 
      location, 
      isLoading, 
      hasLocation,
      updateLocation 
    }}>
      {children}
      <LocationDialog 
        onLocationSelected={handleLocationSelected}
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </LocationContext.Provider>
  )
} 