import { Book } from '@/@types/book'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import fallbackImage from '@/assets/images/fallbackImage.jfif'

const formatLabel = (value: string) =>
  value
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link to="/books/$bookId" params={{ bookId: book.id }} className="block">
      <Card
        variant="default"
        className="flex flex-row hover:shadow-lg transition-shadow cursor-pointer p-3 gap-3 h-32 sm:h-36"
      >
        <div className="w-16 sm:w-20 self-stretch shrink-0 rounded-md overflow-hidden">
          <img
            src={book.coverImage?.url ?? fallbackImage}
            alt={book.title}
            className="w-full h-full object-cover dark:brightness-75"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0 overflow-hidden">
          <div>
            <p className="font-semibold text-sm sm:text-base text-text-primary line-clamp-1">{book.title}</p>
            <p className="text-xs sm:text-sm text-text-secondary line-clamp-1 mt-0.5">{book.author}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {book.genre && <Badge variant="muted">{formatLabel(book.genre)}</Badge>}
            {book.isPublic !== undefined && (
              <Badge variant="muted">{book.isPublic ? 'Public' : 'Private'}</Badge>
            )}
          </div>

          {book.rating && (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) =>
                i < (book.rating || 0) ? (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-star-filled text-star-filled" />
                ) : (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-text-secondary" />
                )
              )}
              <span className="text-xs sm:text-sm text-text-secondary ml-1">{book.rating}/5</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}

export default BookCard
