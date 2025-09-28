'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Clock, Users, Shield, Heart, MessageSquare, Calendar } from 'lucide-react'

interface CaregiverProfileProps {
  caregiver: any // This would be properly typed in production
}

export function CaregiverProfile({ caregiver }: CaregiverProfileProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {caregiver.partnerOneName} & {caregiver.partnerTwoName}
              </h1>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{caregiver.city}, {caregiver.state}</span>
              </div>
              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                <span className="text-lg font-medium">{caregiver.avgRating}</span>
                <span className="text-gray-500 ml-2">({caregiver.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                ${(caregiver.hourlyRateCents / 100).toFixed(0)}/hr
              </div>
              <div className="text-gray-500">per hour</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About {caregiver.partnerOneName} & {caregiver.partnerTwoName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {caregiver.bio}
                </p>
              </CardContent>
            </Card>

            {/* Experience & Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle>Experience & Qualifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <div className="font-medium">{caregiver.yearsExperience} years of experience</div>
                    <div className="text-sm text-gray-500">Caring for children</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <div className="font-medium">Can care for up to {caregiver.maxKids} children</div>
                    <div className="text-sm text-gray-500">At one time</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <div className="font-medium">Background checked & verified</div>
                    <div className="text-sm text-gray-500">ID verified, references checked</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-5 w-5 text-primary mr-3 flex items-center justify-center">
                    🌍
                  </div>
                  <div>
                    <div className="font-medium">Languages: {caregiver.languages.join(', ')}</div>
                    <div className="text-sm text-gray-500">Can communicate in multiple languages</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews from Parents</CardTitle>
                <CardDescription>
                  What other families say about {caregiver.partnerOneName} & {caregiver.partnerTwoName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {caregiver.reviews?.slice(0, 3).map((review: any, index: number) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{review.parent?.profile?.firstName} {review.parent?.profile?.lastName}</div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                      <div className="text-sm text-gray-500 mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Book Care</CardTitle>
                <CardDescription>
                  Select a date and time for your booking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Date</label>
                  <input 
                    type="date" 
                    className="w-full mt-1 p-2 border rounded-md"
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Start Time</label>
                  <input 
                    type="time" 
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Time</label>
                  <input 
                    type="time" 
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                </div>
                <Button className="w-full" size="lg">
                  <Calendar className="mr-2 h-4 w-4" />
                  Request Booking
                </Button>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Call
                </Button>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Monday - Friday</span>
                    <span className="text-sm text-gray-500">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Saturday</span>
                    <span className="text-sm text-gray-500">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sunday</span>
                    <span className="text-sm text-gray-500">By request</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
