import { z } from 'zod'

export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: z.string().min(1, 'Genre is required'),
  status: z.string().default('want-to-read'),
  rating: z.number().min(0).max(5).default(0),
  notes: z.string().optional().default(''),
  isPublic: z.boolean().default(false),
})

export type BookFormData = z.infer<typeof bookSchema>
