import { z } from 'zod'

export const createBookingSchema = z.object({
  caregiverId: z.string().min(1, 'Caregiver ID is required'),
  listingId: z.string().min(1, 'Listing ID is required'),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  childIds: z.array(z.string()).min(1, 'At least one child must be selected'),
  notes: z.string().optional()
})
