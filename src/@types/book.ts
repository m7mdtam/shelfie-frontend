export type BookStatus = 'want-to-read' | 'reading' | 'finished'

export type BookDownloadable = 'true' | 'false'

export type BookGenre =
  | 'fiction'
  | 'non-fiction'
  | 'fantasy'
  | 'science-fiction'
  | 'mystery'
  | 'thriller'
  | 'romance'
  | 'historical-fiction'
  | 'biography'
  | 'self-help'
  | 'other'

export interface BookMedia {
  id: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  sizes?: Array<{
    size?: string
    url?: string
    filename: string
    width: number
    height: number
    mimeType: string
    filesize: number
  }>
}

export interface BookRatingInfo {
  averageRating: number
  userRating: number | null
  totalRatings: number
}

export interface Book {
  id: string
  title: string
  author: string
  coverImage?: BookMedia
  genre: BookGenre
  status: BookStatus
  isDownloadable?: boolean
  downloadLink?: string
  description?: string
  isPublic: boolean
  owner: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  averageRating: number
  userRating: number | null
  totalRatings: number
  createdAt: string
  updatedAt: string
}

export interface GetBooksParams {
  page?: number
  limit?: number
  genre?: BookGenre
  status?: BookStatus
  isDownloadable?: boolean
  search?: string
  ownerId?: string
}

export interface CreateBookRequest {
  title: string
  author: string
  coverImage?: string
  genre: BookGenre
  status: BookStatus
  isDownloadable?: boolean
  downloadLink?: string
  description?: string
  isPublic: boolean
}

export interface UpdateBookRequest {
  title?: string
  author?: string
  coverImage?: string
  genre?: BookGenre
  status?: BookStatus
  isDownloadable?: boolean
  downloadLink?: string
  description?: string
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
