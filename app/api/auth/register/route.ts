import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations/auth'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    const { email, password, role, firstName, lastName, phone, city, state, country } = validatedData

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user and profile
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
        profile: {
          create: {
            firstName,
            lastName,
            phone,
            city,
            state,
            country
          }
        }
      },
      include: {
        profile: true
      }
    })

    // If caregiver, create caregiver couple record
    if (role === 'CAREGIVER') {
      await prisma.caregiverCouple.create({
        data: {
          userId: user.id,
          partnerOneName: firstName,
          partnerTwoName: lastName, // This will be updated during onboarding
          yearsExperience: 0,
          bio: '',
          hourlyRateCents: 0,
          maxKids: 1,
          languages: ['English'],
          address: '',
          city,
          state,
          country,
          zipCode: '',
          phone
        }
      })
    }

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          profile: user.profile
        }
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
