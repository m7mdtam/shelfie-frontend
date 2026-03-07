import axiosInstance from '@/api/axios-instance'

export interface SubmitRatingResponse {
  bookId: string
  userRating: number
  averageRating: number
  totalRatings: number
}

export const ratingsRequests = {
  submit: async (bookId: string, rating: number): Promise<SubmitRatingResponse> => {
    const { data } = await axiosInstance.post<SubmitRatingResponse>(`/api/books/${bookId}/rating`, {
      rating,
    })
    return data
  },
}
