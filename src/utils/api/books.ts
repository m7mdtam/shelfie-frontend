import { PaginationParams } from '@/schemas'

export const buildBooksQueryParams = (params: Partial<PaginationParams>) => {
  return {
    limit: params.limit || 20,
    page: params.page || 1,
  }
}

export const getBookInitials = (author: string): string => {
  const words = author.split(' ')
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }
  return author.substring(0, 2).toUpperCase()
}
