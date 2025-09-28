import { z } from 'zod'

export const childSchema = z.object({
  name: z.string().min(1, 'Child name is required'),
  birthdate: z.string().datetime(),
  allergies: z.string().optional(),
  notes: z.string().optional()
})
