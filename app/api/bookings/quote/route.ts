import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

const quoteSchema = z.object({
  caregiverId: z.string(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { caregiverId, startAt, endAt } = quoteSchema.parse(body)

    const caregiver = await prisma.caregiverCouple.findUnique({
      where: { id: caregiverId }
    })

    if (!caregiver) {
      return NextResponse.json(
        { error: 'Caregiver not found' },
        { status: 404 }
      )
    }

    const hours = (new Date(endAt).getTime() - new Date(startAt).getTime()) / (1000 * 60 * 60)
    const priceCents = Math.round(hours * caregiver.hourlyRateCents)
    const platformFeeCents = Math.round(priceCents * 0.1) // 10% platform fee
    const totalCents = priceCents + platformFeeCents

    return NextResponse.json({
      hours: Math.round(hours * 100) / 100,
      hourlyRateCents: caregiver.hourlyRateCents,
      priceCents,
      platformFeeCents,
      totalCents
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Get quote error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
