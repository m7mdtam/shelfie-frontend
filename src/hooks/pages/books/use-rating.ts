import { useMutation } from '@tanstack/react-query'
import { ratingsRequests } from '@/api/ratings'
import { toast } from 'sonner'

export function useRating(bookId: string) {
  return useMutation({
    mutationFn: (rating: number) => ratingsRequests.submit(bookId, rating),
    onSuccess: async () => {
      toast.success('Rating submitted successfully')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    },
    onError: () => {
      toast.error('Failed to submit rating')
    },
  })
}
