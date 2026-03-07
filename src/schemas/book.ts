import { z } from 'zod'

export const bookObjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: z.string().min(1, 'Genre is required'),
  status: z.string().default('want-to-read'),
  isDownloadable: z.boolean().default(false),
  downloadLink: z.string(),
  rating: z.number().min(0).max(5).default(0),
  description: z.string().optional().default(''),
  isPublic: z.boolean().default(false),
})

export const bookSchema = bookObjectSchema.refine(
  data => !data.isDownloadable || (data.downloadLink && data.downloadLink.length > 0),
  { message: 'Download link is required', path: ['downloadLink'] }
)

export type BookFormData = z.infer<typeof bookSchema>
