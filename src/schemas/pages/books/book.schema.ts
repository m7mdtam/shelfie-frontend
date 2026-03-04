import { z } from 'zod'

const BOOK_GENRES = [
  'fiction',
  'non-fiction',
  'sci-fi',
  'fantasy',
  'biography',
  'history',
  'technology',
  'self-help',
  'other',
] as const

const BOOK_STATUSES = ['want-to-read', 'reading', 'finished'] as const

export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: z.enum(BOOK_GENRES),
  status: z.enum(BOOK_STATUSES),
  rating: z.number().min(0).max(5).optional(),
  notes: z.string().optional(),
  isPublic: z.boolean().default(false),
})

export type BookFormData = z.infer<typeof bookSchema>
