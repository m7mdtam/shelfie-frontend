import axiosInstance from '@/api/axios-instance'
import { Book, BooksListResponse } from '@/@types/book'
import { PaginationParams } from '@/@types/api'

export const booksRequests = {
  list: async (params?: PaginationParams & Record<string, unknown>) => {
    const { data } = await axiosInstance.get<BooksListResponse>('/api/books', {
      params,
    })
    return data
  },

  get: async (id: string) => {
    const { data } = await axiosInstance.get<Book>(`/api/books/${id}`)
    return data
  },

  create: async (payload: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await axiosInstance.post<Book>('/api/books', payload)
    return data
  },

  update: async (id: string, payload: Partial<Book>) => {
    const { data } = await axiosInstance.patch<Book>(`/api/books/${id}`, payload)
    return data
  },

  delete: async (id: string) => {
    await axiosInstance.delete(`/api/books/${id}`)
  },
}
