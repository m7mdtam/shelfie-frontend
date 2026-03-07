import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentsRequests } from '@/api/books/comments'
import { CreateCommentRequest, UpdateCommentRequest } from '@/@types/comment'
import { toast } from 'sonner'

export const commentsQueryKeys = {
  all: ['comments'] as const,
  byBook: (bookId: string) => [...commentsQueryKeys.all, 'book', bookId] as const,
  byBookPage: (bookId: string, page: number) =>
    [...commentsQueryKeys.byBook(bookId), 'page', page] as const,
}

export function useComments(bookId: string, page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: commentsQueryKeys.byBookPage(bookId, page),
    queryFn: () => commentsRequests.list(bookId, page, limit),
    enabled: !!bookId,
  })
}

export function useCreateComment(bookId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateCommentRequest) => commentsRequests.create(bookId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.byBook(bookId),
      })
      toast.success('Comment added successfully')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to add comment'
      toast.error(message)
    },
  })
}

export function useUpdateComment(bookId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, payload }: { commentId: string; payload: UpdateCommentRequest }) =>
      commentsRequests.update(commentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.byBook(bookId),
      })
      toast.success('Comment updated successfully')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to update comment'
      toast.error(message)
    },
  })
}

export function useDeleteComment(bookId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: string) => commentsRequests.delete(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.byBook(bookId),
      })
      toast.success('Comment deleted successfully')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to delete comment'
      toast.error(message)
    },
  })
}
