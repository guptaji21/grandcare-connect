import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateMatchingScore } from '@/lib/matching'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lng = parseFloat(searchParams.get('lng') || '0')
    const radius = parseFloat(searchParams.get('radius') || '50') // km
    const minRate = parseInt(searchParams.get('minRate') || '0')
    const maxRate = parseInt(searchParams.get('maxRate') || '10000')
    const weekday = parseInt(searchParams.get('weekday') || '0')
    const startTime = parseInt(searchParams.get('start') || '0')
    const endTime = parseInt(searchParams.get('end') || '1440')
    const childAge = parseInt(searchParams.get('age') || '5')
    const languages = searchParams.get('languages')?.split(',') || []

    // Get all verified caregivers
    const caregivers = await prisma.caregiverCouple.findMany({
      where: {
        isVerified: true,
        backgroundStatus: 'APPROVED',
        hourlyRateCents: {
          gte: minRate,
          lte: maxRate
        },
        availability: {
          some: {
            weekday,
            startTime: { lte: startTime },
            endTime: { gte: endTime }
          }
        }
      },
      include: {
        user: {
          include: {
            profile: true
          }
        },
        availability: true,
        listings: {
          where: { isActive: true },
          include: {
            reviews: true
          }
        },
        reviews: true
      }
    })

    // Calculate matching scores
    const caregiversWithScores = caregivers.map(caregiver => {
      const score = calculateMatchingScore({
        caregiver,
        parentLocation: { lat, lng },
        childAge,
        preferredLanguages: languages,
        searchRadius: radius
      })

      return {
        ...caregiver,
        matchingScore: score
      }
    })

    // Filter by languages if specified
    const filteredCaregivers = languages.length > 0 
      ? caregiversWithScores.filter(caregiver => 
          languages.some(lang => caregiver.languages.includes(lang))
        )
      : caregiversWithScores

    // Sort by matching score
    const sortedCaregivers = filteredCaregivers.sort((a, b) => b.matchingScore - a.matchingScore)

    return NextResponse.json({ 
      caregivers: sortedCaregivers,
      total: sortedCaregivers.length
    })
  } catch (error) {
    console.error('Search caregivers error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
