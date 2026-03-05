import { useState, useMemo } from 'react'
import { useInfiniteListBooks, useInfiniteListMyBooks } from '@/api/books'
import { BooksListResponse } from '@/@types/book'
import type { InfiniteData } from '@tanstack/react-query'

interface UseBookListProps {
  limit?: number
  scope?: 'all' | 'mine'
  ownerId?: string
}

export function useBookList(props: UseBookListProps = {}) {
  const limit = props.limit ?? 50
  const scope = props.scope ?? 'all'

  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  const params = useMemo(
    () => ({
      limit,
      ...(search && { 'where[title][like]': search }),
      ...(genre && { 'where[genre][equals]': genre }),
      ...(status && { 'where[status][equals]': status }),
    }),
    [limit, search, genre, status]
  )

  const allBooksQuery = useInfiniteListBooks(scope === 'all' ? params : undefined, {
    enabled: scope === 'all',
  })
  const myBooksQuery = useInfiniteListMyBooks(scope === 'mine' ? params : undefined, {
    enabled: scope === 'mine',
  })

  const query = scope === 'mine' ? myBooksQuery : allBooksQuery

  const allBooks = useMemo(() => {
    const data = query.data as InfiniteData<BooksListResponse, unknown> | undefined
    return (data?.pages?.flatMap((page: BooksListResponse) => page.docs) ?? []) as any[]
  }, [query.data])

  return {
    allBooks,
    isLoading: query.isLoading,
    error: query.error,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    search,
    setSearch,
    genre,
    setGenre,
    status,
    setStatus,
    resetFilters: () => {
      setSearch('')
      setGenre('')
      setStatus('')
    },
    totalCount: (() => {
      const data = query.data as InfiniteData<BooksListResponse, unknown> | undefined
      return data?.pages?.[0]?.totalDocs ?? 0
    })(),
  }
}
