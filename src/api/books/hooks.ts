import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import { Book, BooksListResponse } from '@/@types/book'
import { PaginationParams, ApiError } from '@/@types/api'
import { booksRequests } from './requests'
import { booksQueryKeys } from './keys'

export const useListBooks = (
  params?: PaginationParams & Record<string, unknown>,
  options?: UseQueryOptions<BooksListResponse, ApiError>
) => {
  return useQuery({
    queryKey: booksQueryKeys.list(params),
    queryFn: () => booksRequests.list(params),
    ...options,
  })
}

export const useGetBook = (id: string, options?: UseQueryOptions<Book, ApiError>) => {
  return useQuery({
    queryKey: booksQueryKeys.detail(id),
    queryFn: () => booksRequests.get(id),
    enabled: !!id,
    ...options,
  })
}

export const useCreateBook = (
  options?: UseMutationOptions<Book, ApiError, Omit<Book, 'id' | 'createdAt' | 'updatedAt'>>
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: booksRequests.create,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: booksQueryKeys.lists(),
      })
      return data
    },
    ...options,
  })
}

export const useUpdateBook = (
  id: string,
  options?: UseMutationOptions<Book, ApiError, Partial<Book>>
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: payload => booksRequests.update(id, payload),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: booksQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: booksQueryKeys.lists(),
      })
      return data
    },
    ...options,
  })
}

export const useDeleteBook = (options?: UseMutationOptions<void, ApiError, string>) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: booksRequests.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: booksQueryKeys.lists(),
      })
    },
    ...options,
  })
}
