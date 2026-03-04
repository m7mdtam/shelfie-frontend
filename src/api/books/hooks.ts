import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryOptions,
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

export const useInfiniteListBooks = (
  params?: Omit<PaginationParams & Record<string, unknown>, 'page'>,
  options?: UseInfiniteQueryOptions<BooksListResponse, ApiError>
) => {
  return useInfiniteQuery({
    queryKey: booksQueryKeys.list(params),
    queryFn: ({ pageParam = 1 }) => booksRequests.list({ ...params, page: pageParam as number }),
    getNextPageParam: lastPage => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined
    },
    initialPageParam: 1,
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
    ...options,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: booksQueryKeys.lists() })
      options?.onSuccess?.(data, variables, context, mutation)
    },
  })
}

export const useUpdateBook = (
  id: string,
  options?: UseMutationOptions<Book, ApiError, Partial<Book>>
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: payload => booksRequests.update(id, payload),
    ...options,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: booksQueryKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: booksQueryKeys.lists() })
      options?.onSuccess?.(data, variables, context, mutation)
    },
  })
}

export const useDeleteBook = (options?: UseMutationOptions<void, ApiError, string>) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: booksRequests.delete,
    ...options,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: booksQueryKeys.lists() })
      options?.onSuccess?.(data, variables, context, mutation)
    },
  })
}
