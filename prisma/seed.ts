import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@grandcareconnect.com' },
    update: {},
    create: {
      email: 'admin@grandcareconnect.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
      name: 'Admin User',
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'User',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          phone: '+1-555-0001'
        }
      }
    }
  })

  // Create parent users
  const parentPassword = await bcrypt.hash('parent123', 12)
  const parent1 = await prisma.user.upsert({
    where: { email: 'sarah.johnson@example.com' },
    update: {},
    create: {
      email: 'sarah.johnson@example.com',
      passwordHash: parentPassword,
      role: 'PARENT',
      name: 'Sarah Johnson',
      profile: {
        create: {
          firstName: 'Sarah',
          lastName: 'Johnson',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          phone: '+1-555-0002'
        }
      },
      children: {
        create: [
          {
            name: 'Emma Johnson',
            birthdate: new Date('2020-03-15'),
            allergies: 'Peanuts',
            notes: 'Loves arts and crafts'
          },
          {
            name: 'Liam Johnson',
            birthdate: new Date('2018-07-22'),
            allergies: null,
            notes: 'Very active, loves outdoor activities'
          }
        ]
      }
    }
  })

  const parent2 = await prisma.user.upsert({
    where: { email: 'michael.chen@example.com' },
    update: {},
    create: {
      email: 'michael.chen@example.com',
      passwordHash: parentPassword,
      role: 'PARENT',
      name: 'Michael Chen',
      profile: {
        create: {
          firstName: 'Michael',
          lastName: 'Chen',
          city: 'Austin',
          state: 'TX',
          country: 'USA',
          phone: '+1-555-0003'
        }
      },
      children: {
        create: [
          {
            name: 'Sophia Chen',
            birthdate: new Date('2019-11-08'),
            allergies: 'Dairy',
            notes: 'Shy at first but warms up quickly'
          }
        ]
      }
    }
  })

  // Create caregiver users
  const caregiverPassword = await bcrypt.hash('caregiver123', 12)
  
  const caregiver1 = await prisma.user.upsert({
    where: { email: 'robert.mary.smith@example.com' },
    update: {},
    create: {
      email: 'robert.mary.smith@example.com',
      passwordHash: caregiverPassword,
      role: 'CAREGIVER',
      name: 'Robert & Mary Smith',
      profile: {
        create: {
          firstName: 'Robert',
          lastName: 'Smith',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          phone: '+1-555-0004'
        }
      },
      caregiverCouple: {
        create: {
          partnerOneName: 'Robert',
          partnerTwoName: 'Mary',
          yearsExperience: 15,
          bio: 'Retired teachers with 15 years of experience caring for children. We love spending time with kids and creating fun, educational activities. We specialize in helping children with homework and encouraging creativity through arts and crafts.',
          hourlyRateCents: 2500, // $25/hour
          maxKids: 3,
          languages: ['English', 'Spanish'],
          address: '123 Oak Street',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          zipCode: '94102',
          phone: '+1-555-0004',
          isVerified: true,
          backgroundStatus: 'APPROVED',
          references: 'Former principal at Lincoln Elementary School, 10+ years working with children',
          availability: {
            create: [
              { weekday: 1, startTime: 540, endTime: 1080 }, // Monday 9 AM - 6 PM
              { weekday: 2, startTime: 540, endTime: 1080 }, // Tuesday 9 AM - 6 PM
              { weekday: 3, startTime: 540, endTime: 1080 }, // Wednesday 9 AM - 6 PM
              { weekday: 4, startTime: 540, endTime: 1080 }, // Thursday 9 AM - 6 PM
              { weekday: 5, startTime: 540, endTime: 1080 }, // Friday 9 AM - 6 PM
              { weekday: 6, startTime: 600, endTime: 960 },  // Saturday 10 AM - 4 PM
            ]
          },
          listings: {
            create: [
              {
                title: 'Experienced Retired Teachers',
                description: 'We are Robert and Mary, retired elementary school teachers with over 15 years of experience. We love working with children and provide educational, fun, and safe care.',
                coverImageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
                gallery: [
                  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
                  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800'
                ],
                isActive: true,
                avgRating: 4.9,
                reviewCount: 23
              }
            ]
          }
        }
      }
    }
  })

  const caregiver2 = await prisma.user.upsert({
    where: { email: 'david.linda.johnson@example.com' },
    update: {},
    create: {
      email: 'david.linda.johnson@example.com',
      passwordHash: caregiverPassword,
      role: 'CAREGIVER',
      name: 'David & Linda Johnson',
      profile: {
        create: {
          firstName: 'David',
          lastName: 'Johnson',
          city: 'Austin',
          state: 'TX',
          country: 'USA',
          phone: '+1-555-0005'
        }
      },
      caregiverCouple: {
        create: {
          partnerOneName: 'David',
          partnerTwoName: 'Linda',
          yearsExperience: 12,
          bio: 'Grandparents of 6 who enjoy providing loving care for children. We specialize in arts and crafts and outdoor activities. We believe in creating a warm, nurturing environment where children can learn and grow.',
          hourlyRateCents: 2200, // $22/hour
          maxKids: 4,
          languages: ['English'],
          address: '456 Maple Avenue',
          city: 'Austin',
          state: 'TX',
          country: 'USA',
          zipCode: '78701',
          phone: '+1-555-0005',
          isVerified: true,
          backgroundStatus: 'APPROVED',
          references: 'References available from 3 families we have cared for over the past 5 years',
          availability: {
            create: [
              { weekday: 1, startTime: 480, endTime: 1200 }, // Monday 8 AM - 8 PM
              { weekday: 2, startTime: 480, endTime: 1200 }, // Tuesday 8 AM - 8 PM
              { weekday: 3, startTime: 480, endTime: 1200 }, // Wednesday 8 AM - 8 PM
              { weekday: 4, startTime: 480, endTime: 1200 }, // Thursday 8 AM - 8 PM
              { weekday: 5, startTime: 480, endTime: 1200 }, // Friday 8 AM - 8 PM
              { weekday: 6, startTime: 600, endTime: 1200 }, // Saturday 10 AM - 8 PM
              { weekday: 0, startTime: 600, endTime: 1200 }, // Sunday 10 AM - 8 PM
            ]
          },
          listings: {
            create: [
              {
                title: 'Loving Grandparents with Big Hearts',
                description: 'We are David and Linda, proud grandparents who love spending time with children. We provide a home-like environment with lots of love, patience, and fun activities.',
                coverImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
                gallery: [
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
                  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800',
                  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800'
                ],
                isActive: true,
                avgRating: 4.8,
                reviewCount: 18
              }
            ]
          }
        }
      }
    }
  })

  const caregiver3 = await prisma.user.upsert({
    where: { email: 'james.patricia.brown@example.com' },
    update: {},
    create: {
      email: 'james.patricia.brown@example.com',
      passwordHash: caregiverPassword,
      role: 'CAREGIVER',
      name: 'James & Patricia Brown',
      profile: {
        create: {
          firstName: 'James',
          lastName: 'Brown',
          city: 'Miami',
          state: 'FL',
          country: 'USA',
          phone: '+1-555-0006'
        }
      },
      caregiverCouple: {
        create: {
          partnerOneName: 'James',
          partnerTwoName: 'Patricia',
          yearsExperience: 20,
          bio: 'Former daycare owners with extensive experience in child development. We provide structured, educational care with a focus on learning through play. We speak English and French fluently.',
          hourlyRateCents: 3000, // $30/hour
          maxKids: 2,
          languages: ['English', 'French'],
          address: '789 Pine Street',
          city: 'Miami',
          state: 'FL',
          country: 'USA',
          zipCode: '33101',
          phone: '+1-555-0006',
          isVerified: true,
          backgroundStatus: 'APPROVED',
          references: 'Former daycare center owners, 20+ years in early childhood education',
          availability: {
            create: [
              { weekday: 1, startTime: 540, endTime: 1020 }, // Monday 9 AM - 5 PM
              { weekday: 2, startTime: 540, endTime: 1020 }, // Tuesday 9 AM - 5 PM
              { weekday: 3, startTime: 540, endTime: 1020 }, // Wednesday 9 AM - 5 PM
              { weekday: 4, startTime: 540, endTime: 1020 }, // Thursday 9 AM - 5 PM
              { weekday: 5, startTime: 540, endTime: 1020 }, // Friday 9 AM - 5 PM
            ]
          },
          listings: {
            create: [
              {
                title: 'Professional Childcare Specialists',
                description: 'We are James and Patricia, former daycare owners with 20 years of experience in early childhood education. We provide professional, structured care with educational activities.',
                coverImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800',
                gallery: [
                  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
                  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800'
                ],
                isActive: true,
                avgRating: 5.0,
                reviewCount: 31
              }
            ]
          }
        }
      }
    }
  })

  // Create some sample bookings
  const booking1 = await prisma.booking.create({
    data: {
      parentId: parent1.id,
      caregiverId: caregiver1.caregiverCouple!.id,
      listingId: caregiver1.caregiverCouple!.listings[0].id,
      startAt: new Date('2024-02-15T14:00:00Z'),
      endAt: new Date('2024-02-15T18:00:00Z'),
      hours: 4,
      priceCents: 10000, // $100
      status: 'ACCEPTED',
      notes: 'Please help Emma with her homework and make sure Liam gets some outdoor time.',
      children: {
        create: [
          { childId: parent1.children[0].id },
          { childId: parent1.children[1].id }
        ]
      },
      payments: {
        create: {
          stripePaymentIntentId: 'pi_test_123',
          amountCents: 10000,
          status: 'CAPTURED'
        }
      }
    }
  })

  // Create some sample reviews
  await prisma.review.create({
    data: {
      bookingId: booking1.id,
      parentId: parent1.id,
      caregiverId: caregiver1.caregiverCouple!.id,
      listingId: caregiver1.caregiverCouple!.listings[0].id,
      rating: 5,
      text: 'Robert and Mary were absolutely wonderful with our children. They were patient, engaging, and the kids had a great time. Highly recommended!'
    }
  })

  console.log('✅ Seed completed successfully!')
  console.log('👤 Admin user: admin@grandcareconnect.com / admin123')
  console.log('👨‍👩‍👧‍👦 Parent user: sarah.johnson@example.com / parent123')
  console.log('👴👵 Caregiver user: robert.mary.smith@example.com / caregiver123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
