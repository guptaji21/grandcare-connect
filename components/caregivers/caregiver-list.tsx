'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Clock, Users, Shield, Heart } from 'lucide-react'
import Link from 'next/link'

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
  isVerified: boolean
  backgroundStatus: string
  avgRating: number
  reviewCount: number
  matchingScore: number
}

export function CaregiverList() {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for now - in production, this would fetch from API
    const mockCaregivers: Caregiver[] = [
      {
        id: '1',
        partnerOneName: 'Robert',
        partnerTwoName: 'Mary',
        yearsExperience: 15,
        bio: 'Retired teachers with 15 years of experience caring for children. We love spending time with kids and creating fun, educational activities.',
        hourlyRateCents: 2500, // $25/hour
        maxKids: 3,
        languages: ['English', 'Spanish'],
        city: 'San Francisco',
        state: 'CA',
        isVerified: true,
        backgroundStatus: 'APPROVED',
        avgRating: 4.9,
        reviewCount: 23,
        matchingScore: 95
      },
      {
        id: '2',
        partnerOneName: 'David',
        partnerTwoName: 'Linda',
        yearsExperience: 12,
        bio: 'Grandparents of 6 who enjoy providing loving care for children. We specialize in arts and crafts and outdoor activities.',
        hourlyRateCents: 2200, // $22/hour
        maxKids: 4,
        languages: ['English'],
        city: 'Austin',
        state: 'TX',
        isVerified: true,
        backgroundStatus: 'APPROVED',
        avgRating: 4.8,
        reviewCount: 18,
        matchingScore: 88
      },
      {
        id: '3',
        partnerOneName: 'James',
        partnerTwoName: 'Patricia',
        yearsExperience: 20,
        bio: 'Former daycare owners with extensive experience in child development. We provide structured, educational care.',
        hourlyRateCents: 3000, // $30/hour
        maxKids: 2,
        languages: ['English', 'French'],
        city: 'Miami',
        state: 'FL',
        isVerified: true,
        backgroundStatus: 'APPROVED',
        avgRating: 5.0,
        reviewCount: 31,
        matchingScore: 92
      }
    ]

    setTimeout(() => {
      setCaregivers(mockCaregivers)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {caregivers.length} Caregivers Found
        </h2>
        <div className="text-sm text-gray-500">
          Sorted by best match
        </div>
      </div>

      {caregivers.map((caregiver) => (
        <Card key={caregiver.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {caregiver.partnerOneName} & {caregiver.partnerTwoName}
                </h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{caregiver.city}, {caregiver.state}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  ${(caregiver.hourlyRateCents / 100).toFixed(0)}/hr
                </div>
                <div className="text-sm text-gray-500">per hour</div>
              </div>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-2">
              {caregiver.bio}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                Background Checked
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {caregiver.yearsExperience} years experience
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                Up to {caregiver.maxKids} children
              </Badge>
              <Badge variant="secondary">
                {caregiver.languages.join(', ')}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{caregiver.avgRating}</span>
                  <span className="text-gray-500 ml-1">({caregiver.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Available now</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Link href={`/caregivers/${caregiver.id}`}>
                  <Button variant="outline">View Profile</Button>
                </Link>
                <Link href={`/caregivers/${caregiver.id}`}>
                  <Button>Book Now</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
