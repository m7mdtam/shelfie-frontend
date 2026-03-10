import { PencilLine, Trash, ExternalLink } from 'lucide-react'
import { Book, getBookOwner } from '@/@types/book'
import { PageSection } from '@/components/common/page-section'
import { StarDisplay } from './ratings/star-display'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import fallbackImage from '@/assets/images/fallbackImage.jfif'

const formatLabel = (value: string) =>
  value
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

interface BookDetailCoverProps {
  book: Book
  isOwner: boolean
  onEdit: () => void
  onDelete: () => void
}

export function BookDetailCover({ book, isOwner, onEdit, onDelete }: BookDetailCoverProps) {
  const bookOwner = getBookOwner(book.owner)

  return (
    <PageSection>
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="w-full sm:w-44 shrink-0 rounded-lg overflow-hidden self-start">
          <img
            src={book.coverImage?.url ?? fallbackImage}
            alt={book.title}
            className="w-full h-auto max-h-96 sm:h-64 sm:max-h-none object-contain sm:object-cover dark:brightness-75"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary leading-tight">
                {book.title}
              </h1>
              <div className="mt-1">
                <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide">
                  Author
                </p>
                <p className="text-sm sm:text-base text-text-primary">{book.author}</p>
              </div>
            </div>
            {isOwner && (
              <div className="flex shrink-0 gap-2 items-center">
                <button
                  onClick={onEdit}
                  className="text-text-secondary hover:text-accent-primary transition-colors cursor-pointer"
                >
                  <PencilLine className="w-6 h-6" />
                </button>
                <button
                  onClick={onDelete}
                  className="text-state-error/60 hover:text-state-error transition-colors cursor-pointer"
                >
                  <Trash className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {book.genre && (
              <div>
                <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide">
                  Genre
                </p>
                <p className="text-sm text-text-primary">{formatLabel(book.genre)}</p>
              </div>
            )}
            {book.isPublic !== undefined && (
              <div>
                <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide">
                  Visibility
                </p>
                <p className="text-sm text-text-primary">
                  {book.isPublic ? 'Public' : 'Private'}
                </p>
              </div>
            )}
          </div>

          {bookOwner && (
            <div>
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide mb-0.5">
                Posted by
              </p>
              <Link
                to="/profile/$userId"
                params={{ userId: bookOwner.id }}
                className="flex items-center gap-1.5 text-sm text-text-primary hover:text-accent-primary transition-colors w-fit"
              >
                <Avatar className="w-5 h-5 shrink-0">
                  <AvatarImage
                    src={bookOwner.profileImage?.sizes?.[0]?.url || bookOwner.profileImage?.url}
                    alt={`${bookOwner.firstName} ${bookOwner.lastName}`}
                  />
                  <AvatarFallback className="text-[9px]">
                    {bookOwner.firstName[0]}
                    {bookOwner.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {bookOwner.firstName} {bookOwner.lastName}
              </Link>
            </div>
          )}

          {book.isDownloadable && book.downloadLink && (
            <Button
              variant="outline"
              className="w-fit flex items-center gap-2"
              onClick={() => window.open(book.downloadLink, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              Download
            </Button>
          )}

          {(book.totalRatings ?? 0) > 0 && (
            <div className="flex items-center gap-1.5">
              <StarDisplay rating={book.averageRating ?? 0} className="w-4 h-4" />
              <span className="text-sm font-medium text-text-primary ml-0.5">
                {(book.averageRating ?? 0).toFixed(1)}
              </span>
              <span className="text-sm text-text-secondary">
                ({book.totalRatings ?? 0}{' '}
                {(book.totalRatings ?? 0) === 1 ? 'rating' : 'ratings'})
              </span>
            </div>
          )}
        </div>
      </div>
    </PageSection>
  )
}
