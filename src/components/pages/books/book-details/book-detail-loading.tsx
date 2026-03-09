import { PageSection } from '@/components/common/page-section'
import { CommentsSection } from '@/components/pages/books/book-details/comments/comments-section'

export function BookDetailLoading() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
        <div className="h-9 w-24 bg-background-surface rounded-md animate-pulse" />
        <PageSection>
          <div className="animate-pulse flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-44 h-56 sm:h-64 bg-background-base rounded-lg shrink-0" />
            <div className="flex-1 flex flex-col gap-3">
              <div className="h-7 bg-background-base rounded w-3/4" />
              <div className="h-5 bg-background-base rounded w-1/2" />
              <div className="flex gap-2 mt-1">
                <div className="h-5 w-16 bg-background-base rounded-full" />
                <div className="h-5 w-16 bg-background-base rounded-full" />
              </div>
              <div className="h-4 bg-background-base rounded w-full mt-2" />
              <div className="h-4 bg-background-base rounded w-full" />
              <div className="h-4 bg-background-base rounded w-2/3" />
            </div>
          </div>
        </PageSection>

        <PageSection>
          <div className="animate-pulse flex flex-col gap-3">
            <div className="h-4 w-40 bg-background-surface rounded" />
            <div className="h-3 w-full bg-background-surface rounded" />
            <div className="h-3 w-full bg-background-surface rounded" />
            <div className="h-3 w-3/4 bg-background-surface rounded" />
          </div>
        </PageSection>

        <CommentsSection
          bookId=""
          averageRating={0}
          userRating={null}
          totalRatings={0}
          isLoading={true}
        />
      </div>
    </div>
  )
}
