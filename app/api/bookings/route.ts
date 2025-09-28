import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { createBookingSchema } from '@/lib/validations/booking'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'PARENT') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createBookingSchema.parse(body)

    const { caregiverId, listingId, startAt, endAt, childIds, notes } = validatedData

    // Get caregiver and listing details
    const caregiver = await prisma.caregiverCouple.findUnique({
      where: { id: caregiverId },
      include: {
        listings: {
          where: { id: listingId }
        }
      }
    })

    if (!caregiver || caregiver.listings.length === 0) {
      return NextResponse.json(
        { error: 'Caregiver or listing not found' },
        { status: 404 }
      )
    }

    const listing = caregiver.listings[0]
    const hours = (new Date(endAt).getTime() - new Date(startAt).getTime()) / (1000 * 60 * 60)
    const priceCents = Math.round(hours * caregiver.hourlyRateCents)

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceCents,
      currency: 'usd',
      capture_method: 'manual', // Authorize only, capture later
      metadata: {
        type: 'booking'
      }
    })

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        parentId: session.user.id,
        caregiverId,
        listingId,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
        hours,
        priceCents,
        notes,
        children: {
          create: childIds.map((childId: string) => ({
            childId
          }))
        },
        payments: {
          create: {
            stripePaymentIntentId: paymentIntent.id,
            amountCents: priceCents,
            status: 'REQUIRES_CAPTURE'
          }
        }
      },
      include: {
        children: {
          include: {
            child: true
          }
        },
        payments: true
      }
    })

    return NextResponse.json({ 
      booking,
      clientSecret: paymentIntent.client_secret
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
