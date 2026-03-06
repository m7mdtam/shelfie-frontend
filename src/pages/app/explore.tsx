import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useBookList } from '@/hooks/pages/books'
import { booksQueryKeys } from '@/api/books'
import { useAuthContext } from '@/contexts/auth'
import { BookListDisplay } from '@/components/pages/books/book-list-display'
import { BookFilters } from '@/components/pages/books/book-filters'
import { PageSection } from '@/components/page-section'
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
  const queryClient = useQueryClient()
  const bookList = useBookList({ limit: 50, scope: 'all' })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: booksQueryKeys.lists() })
  }, [auth.isAuthenticated, queryClient])

  return (
    <div className="flex-1 flex flex-col bg-background-base p-4 md:p-6">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

        <PageSection>
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

          <BookListDisplay
            isLoading={bookList.isLoading}
            error={bookList.error}
            books={bookList.allBooks}
            totalCount={bookList.totalCount}
            isFetchingNextPage={bookList.isFetchingNextPage}
            isOwner={false}
            emptyTitle="No Books Found"
            emptyDescription="Try adjusting your filters"
          />
        </PageSection>
      </div>
    </div>
  )
}

export default ExplorePage
