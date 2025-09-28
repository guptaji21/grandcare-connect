import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

const f = createUploadthing()

export const uploadRouter = {
  caregiverImages: f({ image: { maxFileSize: '4MB', maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions)
      
      if (!session?.user) {
        throw new Error('Unauthorized')
      }

      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url }
    }),

  backgroundDocuments: f({ 
    image: { maxFileSize: '4MB', maxFileCount: 5 },
    pdf: { maxFileSize: '4MB', maxFileCount: 5 }
  })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions)
      
      if (!session?.user || session.user.role !== 'CAREGIVER') {
        throw new Error('Unauthorized')
      }

      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url }
    })
} satisfies FileRouter

export type OurFileRouter = typeof uploadRouter
