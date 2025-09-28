import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const caregiver = await prisma.caregiverCouple.findUnique({
      where: { id: params.id },
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
            reviews: {
              include: {
                parent: {
                  include: {
                    profile: true
                  }
                }
              }
            }
          }
        },
        reviews: {
          include: {
            parent: {
              include: {
                profile: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        backgroundDocs: true
      }
    })

    if (!caregiver) {
      return NextResponse.json(
        { error: 'Caregiver not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ caregiver })
  } catch (error) {
    console.error('Get caregiver error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
