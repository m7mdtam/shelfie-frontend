import { useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useBookList } from '@/hooks/pages/books'
import { useAuthContext } from '@/contexts/auth'
import { BookCard } from '@/components/pages/books/BookCard'
import { BookFilters } from '@/components/pages/books/BookFilters'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const GENRES = [
  'fiction',
  'non-fiction',
  'fantasy',
  'science-fiction',
  'mystery',
  'thriller',
  'romance',
  'historical-fiction',
  'biography',
  'self-help',
  'other',
]

const STATUSES = ['want-to-read', 'reading', 'finished']

export function ExplorePage() {
  const auth = useAuthContext()
  const bookList = useBookList({ limit: 50 })
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: bookList.hasNextPage ? bookList.allBooks.length + 1 : bookList.allBooks.length,
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

    if (
      lastItem.index >= bookList.allBooks.length - 1 &&
      bookList.hasNextPage &&
      !bookList.isFetchingNextPage
    ) {
      bookList.fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    virtualItems,
    bookList.allBooks.length,
    bookList.hasNextPage,
    bookList.isFetchingNextPage,
    bookList.fetchNextPage,
  ])

  return (
    <div className="flex-1 bg-background-base p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">Explore Books</h1>
            <p className="text-text-secondary">Discover books from the community</p>
          </div>
          {auth.isAuthenticated && (
            <Link to="/books/shelf">
              <Button variant="default" className="flex gap-2 w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                Add Book
              </Button>
            </Link>
          )}
        </div>

        <BookFilters
          search={bookList.search}
          onSearchChange={bookList.setSearch}
          genre={bookList.genre}
          onGenreChange={bookList.setGenre}
          status={bookList.status}
          onStatusChange={bookList.setStatus}
          genres={GENRES}
          statuses={STATUSES}
        />

        {bookList.isLoading && bookList.allBooks.length === 0 ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-background-surface rounded-lg animate-pulse" />
            ))}
          </div>
        ) : bookList.error ? (
          <Card variant="default">
            <CardHeader>
              <CardTitle className="text-state-error">Error Loading Books</CardTitle>
              <CardDescription>{bookList.error?.message || 'Failed to load books'}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.location.reload()} className="w-full" variant="default">
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : bookList.allBooks.length === 0 ? (
          <Card variant="default" className="text-center">
            <CardHeader>
              <CardTitle>No Books Found</CardTitle>
              <CardDescription>Try adjusting your filters</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div>
            <p className="text-sm text-text-secondary mb-4">
              Showing {bookList.allBooks.length} of {bookList.totalCount} books
            </p>
            <div
              ref={parentRef}
              className="h-200 overflow-y-auto"
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
                  const isLoaderRow = virtualItem.index > bookList.allBooks.length - 1
                  const book = bookList.allBooks[virtualItem.index]

                  return (
                    <div key={virtualItem.key} data-index={virtualItem.index}>
                      {isLoaderRow ? (
                        <div className="flex items-center justify-center p-4">
                          {bookList.isFetchingNextPage && <div className="animate-spin">⟳</div>}
                        </div>
                      ) : (
                        <BookCard book={book} isOwner={false} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExplorePage
