export type BookStatus = 'want-to-read' | 'reading' | 'finished'

export type BookGenre =
  | 'fiction'
  | 'non-fiction'
  | 'sci-fi'
  | 'fantasy'
  | 'biography'
  | 'history'
  | 'technology'
  | 'self-help'
  | 'other'

export interface BookMedia {
  id: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  sizes?: Array<{
    size?: string
    filename: string
    width: number
    height: number
    mimeType: string
    filesize: number
  }>
}

export interface Book {
  id: string
  title: string
  author: string
  cover?: BookMedia
  genre: BookGenre
  status: BookStatus
  rating?: number
  notes?: string
  isPublic: boolean
  owner: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  createdAt: string
  updatedAt: string
}

export interface GetBooksParams {
  page?: number
  limit?: number
  genre?: BookGenre
  status?: BookStatus
  search?: string
  ownerId?: string
}

export interface CreateBookRequest {
  title: string
  author: string
  cover?: string
  genre: BookGenre
  status: BookStatus
  rating?: number
  notes?: string
  isPublic: boolean
}

export interface UpdateBookRequest {
  title?: string
  author?: string
  cover?: string
  genre?: BookGenre
  status?: BookStatus
  rating?: number
  notes?: string
  isPublic?: boolean
}

export interface BooksListResponse {
  docs: Book[]
  totalDocs: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}
