"use client"

import { useState, useEffect } from "react"

export interface UserLocation {
  country: string
  street: string
}

export function useLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Check if running in browser environment
    if (typeof window !== "undefined") {
      try {
        const storedLocation = localStorage.getItem("userLocation")
        if (storedLocation) {
          setLocation(JSON.parse(storedLocation))
        }
      } catch (error) {
        console.error("Failed to parse stored location:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [])
  
  const updateLocation = (newLocation: UserLocation) => {
    setLocation(newLocation)
    if (typeof window !== "undefined") {
      localStorage.setItem("userLocation", JSON.stringify(newLocation))
    }
  }
  
  const clearLocation = () => {
    setLocation(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("userLocation")
    }
  }
  
  return {
    location,
    isLoading,
    updateLocation,
    clearLocation,
    hasLocation: !!location
  }
} 