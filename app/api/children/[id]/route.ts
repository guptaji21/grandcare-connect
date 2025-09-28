import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { childSchema } from '@/lib/validations/child'

export const runtime = 'nodejs'

interface RouteParams {
  params: {
    id: string
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'PARENT') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = childSchema.parse(body)

    // Check if child belongs to user
    const existingChild = await prisma.child.findFirst({
      where: {
        id: params.id,
        parentId: session.user.id
      }
    })

    if (!existingChild) {
      return NextResponse.json(
        { error: 'Child not found' },
        { status: 404 }
      )
    }

    const child = await prisma.child.update({
      where: { id: params.id },
      data: validatedData
    })

    return NextResponse.json({ child })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Update child error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'PARENT') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if child belongs to user
    const existingChild = await prisma.child.findFirst({
      where: {
        id: params.id,
        parentId: session.user.id
      }
    })

    if (!existingChild) {
      return NextResponse.json(
        { error: 'Child not found' },
        { status: 404 }
      )
    }

    await prisma.child.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Child deleted successfully' })
  } catch (error) {
    console.error('Delete child error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
