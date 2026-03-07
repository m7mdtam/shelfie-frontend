export interface CommentUser {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface Comment {
  id: string
  bookId: string
  userId: string | null
  text: string
  user: CommentUser | null
  createdAt: string
  updatedAt: string
}

export interface CreateCommentRequest {
  text: string
}

export interface UpdateCommentRequest {
  text: string
}

export interface CommentsListResponse {
  data: Comment[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
