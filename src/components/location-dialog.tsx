"use client"

import { useState, useEffect } from "react"
import { X, MapPin, Navigation } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LocationDialogProps {
  onLocationSelected: (location: { country: string; street: string }) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LocationDialog({ onLocationSelected, open, onOpenChange }: LocationDialogProps) {
  const [country, setCountry] = useState("Germany")
  const [street, setStreet] = useState("")
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false)
  const [geolocationError, setGeolocationError] = useState<string | null>(null)
  const [showGeolocationSuccess, setShowGeolocationSuccess] = useState(false)
  
  const handleContinue = () => {
    if (country && street) {
      const location = { country, street }
      if (typeof window !== 'undefined') {
        localStorage.setItem("userLocation", JSON.stringify(location))
      }
      onLocationSelected(location)
      onOpenChange(false)
    }
  }

  const requestGeolocation = () => {
    setIsLoadingGeolocation(true)
    setGeolocationError(null)
    
    if (!navigator.geolocation) {
      setGeolocationError("Geolocation is not supported by your browser")
      setIsLoadingGeolocation(false)
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          
          // OPTION 1: Direct Nominatim API call (free, but has usage limitations)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          )
          
          if (!response.ok) {
            throw new Error('Failed to fetch address')
          }
          
          const data = await response.json()
          
          // Extract relevant address components - format will vary based on location
          const street = data.address.road || data.address.street || data.address.pedestrian || '123 Main St'
          const houseNumber = data.address.house_number || ''
          const addressStr = houseNumber ? `${street} ${houseNumber}` : street
          
          // Set the country from the response
          if (data.address.country) {
            // Map country to our dropdown options, defaulting to the first option if not found
            const countryMap: Record<string, string> = {
              'Germany': 'Germany',
              'Deutschland': 'Germany',
              'United States': 'United States',
              'United Kingdom': 'United Kingdom',
              'France': 'France',
              'Spain': 'Spain'
            }
            
            const detectedCountry = countryMap[data.address.country] || country
            setCountry(detectedCountry)
          }
          
          // Set the street
          setStreet(addressStr)
          
          // OPTION 2: Using server-side API route (for production use)
          // Comment out the above and uncomment below when ready to use Google Maps API
          /*
          const response = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`)
          
          if (!response.ok) {
            throw new Error('Failed to fetch address from API')
          }
          
          const data = await response.json()
          
          if (data.success) {
            setStreet(data.address.street || '123 Main St')
            
            // Map the country if it exists
            if (data.address.country) {
              const countryMap: Record<string, string> = {
                'Germany': 'Germany',
                'United States': 'United States',
                'United Kingdom': 'United Kingdom',
                'France': 'France',
                'Spain': 'Spain'
              }
              
              const detectedCountry = countryMap[data.address.country] || country
              setCountry(detectedCountry)
            }
          } else {
            throw new Error(data.error || 'Failed to determine address')
          }
          */
          
          setShowGeolocationSuccess(true)
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            setShowGeolocationSuccess(false)
          }, 3000)
        } catch (error) {
          console.error('Geocoding error:', error)
          setGeolocationError('Unable to determine address from your location')
        } finally {
          setIsLoadingGeolocation(false)
        }
      },
      (error) => {
        setIsLoadingGeolocation(false)
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setGeolocationError("Location access was denied")
            break
          case error.POSITION_UNAVAILABLE:
            setGeolocationError("Location information is unavailable")
            break
          case error.TIMEOUT:
            setGeolocationError("Location request timed out")
            break
          default:
            setGeolocationError("An unknown error occurred")
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 text-white border-none">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-white">
            Add delivery address
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter your address to find restaurants that deliver to you
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {showGeolocationSuccess && (
            <Alert className="bg-green-800 border-green-700 text-white">
              <AlertDescription>Location successfully detected!</AlertDescription>
            </Alert>
          )}
          
          {geolocationError && (
            <Alert className="bg-red-900 border-red-800 text-white">
              <AlertDescription>{geolocationError}</AlertDescription>
            </Alert>
          )}
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            onClick={requestGeolocation}
            disabled={isLoadingGeolocation}
          >
            {isLoadingGeolocation ? (
              "Detecting location..."
            ) : (
              <>
                <Navigation className="h-4 w-4" />
                Use my current location
              </>
            )}
          </Button>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Country</label>
            <Select defaultValue={country} onValueChange={setCountry}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="France">France</SelectItem>
                <SelectItem value="Spain">Spain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 relative">
            <label className="text-sm text-gray-300">Street name and number</label>
            <div className="relative">
              <Input 
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white pl-3 pr-10"
                placeholder="Street name and number"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-6"
            onClick={handleContinue}
            disabled={!country || !street}
          >
            Continue
          </Button>
        </div>
        
        {/* Decorative illustration */}
        <div className="mt-6 flex justify-center items-center">
          <div className="relative h-32 w-full">
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              <div className="w-full h-full bg-center bg-contain bg-no-repeat" 
                  style={{ backgroundImage: "url('/assets/default/img/location-illustration.svg')" }}>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 