import axiosInstance from '@/api/axios-instance'
import {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
  CommentsListResponse,
} from '@/@types/comment'

export const commentsRequests = {
  list: async (bookId: string, page: number = 1, limit: number = 10) => {
    const { data } = await axiosInstance.get<CommentsListResponse>(
      `/api/books/${bookId}/comments`,
      {
        params: { page, limit },
      }
    )
    return data
  },

  create: async (bookId: string, payload: CreateCommentRequest) => {
    const { data } = await axiosInstance.post<Comment>(`/api/books/${bookId}/comments`, payload)
    return data
  },

  update: async (commentId: string, payload: UpdateCommentRequest) => {
    const { data } = await axiosInstance.put<Comment>(`/api/comments/${commentId}`, payload)
    return data
  },

  delete: async (commentId: string) => {
    await axiosInstance.delete(`/api/comments/${commentId}`)
  },
}
