import { useBookList } from '@/hooks/pages/books'
import { BookListDisplay } from '@/components/pages/books/book-list-display'
import { BookFilters } from '@/components/pages/books/book-filters'
import { PageSection } from '@/components/page-section'

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

export function ExplorePage() {
  const bookList = useBookList({ limit: 10, scope: 'all' })

  return (
    <div className="flex-1 flex flex-col bg-background-base p-4 md:p-6">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">Explore Books</h1>
            <p className="text-text-secondary">Discover books from the community</p>
          </div>
        </div>

        <PageSection>
          <BookFilters
            search={bookList.search}
            onSearchChange={bookList.setSearch}
            genre={bookList.genre}
            onGenreChange={bookList.setGenre}
            downloadable={bookList.downloadable}
            onDownloadableChange={bookList.setDownloadable}
            genres={GENRES}
          />

          <BookListDisplay
            isLoading={bookList.isLoading}
            error={bookList.error}
            books={bookList.allBooks}
            totalCount={bookList.totalCount}
            isFetchingNextPage={bookList.isFetchingNextPage}
            hasNextPage={bookList.hasNextPage}
            onLoadMore={bookList.fetchNextPage}
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
