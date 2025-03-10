import { NextResponse } from 'next/server'

// In a real production app, you would store this in .env.local
// const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY
const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE' // Replace with your actual API key

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  
  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Missing latitude or longitude parameters' },
      { status: 400 }
    )
  }
  
  try {
    // Using Google Maps Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Google Maps API')
    }
    
    const data = await response.json()
    
    if (data.status !== 'OK') {
      throw new Error(`Google Maps API error: ${data.status}`)
    }
    
    // Process the response to extract the relevant address components
    const result = data.results[0]
    
    // Parse address components
    const addressComponents = result.address_components
    let streetNumber = ''
    let route = ''
    let country = ''
    
    for (const component of addressComponents) {
      if (component.types.includes('street_number')) {
        streetNumber = component.long_name
      } else if (component.types.includes('route')) {
        route = component.long_name
      } else if (component.types.includes('country')) {
        country = component.long_name
      }
    }
    
    const street = route ? (streetNumber ? `${route} ${streetNumber}` : route) : ''
    
    return NextResponse.json({
      success: true,
      address: {
        street,
        country,
        formatted_address: result.formatted_address
      }
    })
  } catch (error) {
    console.error('Geocoding error:', error)
    return NextResponse.json(
      { error: 'Failed to geocode coordinates' },
      { status: 500 }
    )
  }
} 