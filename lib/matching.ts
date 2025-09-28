interface Caregiver {
  id: string
  partnerOneName: string
  partnerTwoName: string
  yearsExperience: number
  bio: string
  hourlyRateCents: number
  maxKids: number
  languages: string[]
  city: string
  state: string
  country: string
  isVerified: boolean
  backgroundStatus: string
  listings: Array<{
    avgRating: number
    reviewCount: number
  }>
  reviews: Array<{
    rating: number
  }>
}

interface ParentLocation {
  lat: number
  lng: number
}

interface MatchingParams {
  caregiver: Caregiver
  parentLocation: ParentLocation
  childAge: number
  preferredLanguages: string[]
  searchRadius: number
}

export function calculateMatchingScore({
  caregiver,
  parentLocation,
  childAge,
  preferredLanguages,
  searchRadius
}: MatchingParams): number {
  let score = 0

  // Base score for verified caregivers
  if (caregiver.isVerified && caregiver.backgroundStatus === 'APPROVED') {
    score += 30
  }

  // Experience score (0-25 points)
  const experienceScore = Math.min(caregiver.yearsExperience * 2, 25)
  score += experienceScore

  // Review score (0-20 points)
  const avgRating = caregiver.listings[0]?.avgRating || 0
  const reviewCount = caregiver.listings[0]?.reviewCount || 0
  const reviewScore = (avgRating / 5) * 15 + Math.min(reviewCount * 0.5, 5)
  score += reviewScore

  // Language compatibility (0-15 points)
  const languageMatches = preferredLanguages.filter(lang => 
    caregiver.languages.includes(lang)
  ).length
  const languageScore = (languageMatches / preferredLanguages.length) * 15
  score += languageScore

  // Age compatibility (0-10 points)
  // Elderly couples are generally good with all ages, but prefer 3-8 range
  const ageCompatibility = childAge >= 3 && childAge <= 8 ? 10 : 7
  score += ageCompatibility

  // Distance score (0-10 points)
  // For now, we'll use a simple city-based matching
  // In production, you'd calculate actual distance using coordinates
  const distanceScore = 8 // Placeholder - would calculate based on actual coordinates
  score += distanceScore

  // Availability bonus (0-5 points)
  // This would be calculated based on actual availability slots
  const availabilityScore = 3 // Placeholder
  score += availabilityScore

  // Rate competitiveness (0-5 points)
  // Lower rates get slightly higher scores, but not too much
  const rateScore = caregiver.hourlyRateCents < 2000 ? 5 : 3
  score += rateScore

  return Math.min(Math.round(score), 100)
}

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}
