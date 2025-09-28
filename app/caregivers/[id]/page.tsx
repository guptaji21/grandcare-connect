import { CaregiverProfile } from '@/components/caregivers/caregiver-profile'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

interface CaregiverPageProps {
  params: {
    id: string
  }
}

export default async function CaregiverPage({ params }: CaregiverPageProps) {
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
      }
    }
  })

  if (!caregiver) {
    notFound()
  }

  return <CaregiverProfile caregiver={caregiver} />
}
