import axiosInstance from '@/api/axios-instance'
import { BookMedia } from '@/@types/book'

export const uploadMedia = async (file: File, alt: string): Promise<BookMedia> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('_payload', JSON.stringify({ alt }))

  const { data } = await axiosInstance.post<{ doc: BookMedia }>('/api/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data.doc
}
