'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users, DollarSign, MessageSquare } from 'lucide-react'

interface BookingDetailsProps {
  booking: any // This would be properly typed in production
}

export function BookingDetails({ booking }: BookingDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REQUESTED':
        return 'bg-yellow-100 text-yellow-800'
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800'
      case 'DECLINED':
        return 'bg-red-100 text-red-800'
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800'
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800'
      case 'DISPUTED':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
          <div className="flex items-center mt-2">
            <Badge className={getStatusColor(booking.status)}>
              {booking.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Info */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">Date</div>
                      <div className="text-sm text-gray-500">
                        {new Date(booking.startAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">Time</div>
                      <div className="text-sm text-gray-500">
                        {new Date(booking.startAt).toLocaleTimeString()} - {new Date(booking.endAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-gray-500">
                        {booking.hours} hours
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">Total Cost</div>
                      <div className="text-sm text-gray-500">
                        ${(booking.priceCents / 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Children */}
            <Card>
              <CardHeader>
                <CardTitle>Children</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {booking.children?.map((child: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{child.child.name}</div>
                        <div className="text-sm text-gray-500">
                          Age: {new Date().getFullYear() - new Date(child.child.birthdate).getFullYear()} years
                        </div>
                        {child.child.allergies && (
                          <div className="text-sm text-red-600">
                            Allergies: {child.child.allergies}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {booking.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Special Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{booking.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Caregiver Info */}
            <Card>
              <CardHeader>
                <CardTitle>Caregivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="font-medium">
                    {booking.caregiver.user.profile.firstName} & {booking.caregiver.partnerTwoName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.caregiver.city}, {booking.caregiver.state}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {booking.status === 'REQUESTED' && (
                  <>
                    <Button className="w-full">Accept Booking</Button>
                    <Button variant="outline" className="w-full">Decline</Button>
                  </>
                )}
                {booking.status === 'ACCEPTED' && (
                  <>
                    <Button variant="outline" className="w-full">Cancel Booking</Button>
                    <Button variant="outline" className="w-full">Reschedule</Button>
                  </>
                )}
                {booking.status === 'COMPLETED' && (
                  <Button className="w-full">Leave Review</Button>
                )}
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Hourly Rate</span>
                    <span className="text-sm">${(booking.caregiver.hourlyRateCents / 100).toFixed(2)}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Hours</span>
                    <span className="text-sm">{booking.hours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm">${((booking.priceCents * 0.9) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Platform Fee (10%)</span>
                    <span className="text-sm">${((booking.priceCents * 0.1) / 100).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(booking.priceCents / 100).toFixed(2)}</span>
                    </div>
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
