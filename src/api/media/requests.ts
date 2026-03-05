import axiosInstance from '@/api/axios-instance'
import { BookMedia } from '@/@types/book'

export const uploadMedia = async (file: File, alt: string): Promise<BookMedia> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('alt', alt)

  const { data } = await axiosInstance.post<BookMedia>('/api/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const updateMedia = async (id: string, alt: string): Promise<BookMedia> => {
  const { data } = await axiosInstance.put<BookMedia>(`/api/media?id=${id}`, { alt })
  return data
}

export const deleteMedia = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/media?id=${id}`)
}
