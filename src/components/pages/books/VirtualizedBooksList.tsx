import { useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Book, BooksListResponse } from '@/@types/book'
import { useInfiniteListBooks } from '@/api/books'
import { BookCard } from './BookCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { InfiniteData } from '@tanstack/react-query'

interface VirtualizedBooksListProps {
  onEdit?: (book: Book) => void
  onDelete?: (book: Book) => void
  isOwner?: boolean
  limit?: number
}

export function VirtualizedBooksList({
  onEdit,
  onDelete,
  isOwner,
  limit = 50,
}: VirtualizedBooksListProps) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteListBooks({ limit })

  const allBooks = ((data as InfiniteData<BooksListResponse, unknown> | undefined)?.pages?.flatMap(
    page => page.docs
  ) ?? []) as Book[]

  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: hasNextPage ? allBooks.length + 1 : allBooks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350,
    overscan: 10,
  })

  const virtualItems = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize()

  const paddingStart = virtualItems.length > 0 ? (virtualItems?.[0]?.start ?? 0) : 0
  const paddingEnd =
    virtualItems.length > 0 ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end ?? 0) : 0

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse()

    if (!lastItem) {
      return
    }

    if (lastItem.index >= allBooks.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [virtualItems, allBooks.length, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-background-surface rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card variant="default">
        <CardHeader>
          <CardTitle className="text-state-error">Error Loading Books</CardTitle>
          <CardDescription>{error?.message || 'Failed to load your books'}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.location.reload()} className="w-full" variant="default">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (allBooks.length === 0) {
    return (
      <Card variant="default" className="text-center">
        <CardHeader>
          <CardTitle>No Books Yet</CardTitle>
          <CardDescription>Start building your bookshelf by adding your first book</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div
      ref={parentRef}
      className="h-[800px] overflow-y-auto"
      style={{
        contain: 'strict',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
          paddingTop: paddingStart,
          paddingBottom: paddingEnd,
        }}
      >
        {virtualItems.map(virtualItem => {
          const isLoaderRow = virtualItem.index > allBooks.length - 1
          const book = allBooks[virtualItem.index]

          return (
            <div key={virtualItem.key} data-index={virtualItem.index}>
              {isLoaderRow ? (
                <div className="flex items-center justify-center p-4">
                  {isFetchingNextPage && <div className="animate-spin">⟳</div>}
                </div>
              ) : (
                <BookCard book={book} isOwner={isOwner} onEdit={onEdit} onDelete={onDelete} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
