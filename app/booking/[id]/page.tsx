import { BookingDetails } from '@/components/booking/booking-details'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface BookingPageProps {
  params: {
    id: string
  }
}

export default async function BookingPage({ params }: BookingPageProps) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: {
      parent: {
        include: {
          profile: true
        }
      },
      caregiver: {
        include: {
          user: {
            include: {
              profile: true
            }
          }
        }
      },
      listing: true,
      children: {
        include: {
          child: true
        }
      },
      payments: true,
      reviews: true
    }
  })

  if (!booking) {
    notFound()
  }

  // Check if user has access to this booking
  const hasAccess = 
    booking.parentId === session.user.id || 
    booking.caregiverId === session.user.id ||
    session.user.role === 'ADMIN'

  if (!hasAccess) {
    notFound()
  }

  return <BookingDetails booking={booking} />
}
