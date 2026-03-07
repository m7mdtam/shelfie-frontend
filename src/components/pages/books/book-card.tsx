import { Book, getBookOwner } from '@/@types/book'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Download, PenLine } from 'lucide-react'
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
  const owner = getBookOwner(book.owner)
  return (
    <Link to="/books/$bookId" params={{ bookId: book.id }} className="block">
      <Card
        variant="default"
        className="flex flex-row hover:shadow-lg transition-shadow cursor-pointer p-3 gap-3 h-40 sm:h-44"
      >
        <div className="w-20 sm:w-24 self-stretch shrink-0 rounded-md overflow-hidden">
          <img
            src={book.coverImage?.url ?? fallbackImage}
            alt={book.title}
            className="w-full h-full object-cover dark:brightness-75"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0 overflow-hidden">
          <div>
            <p className="font-semibold text-sm sm:text-base text-text-primary line-clamp-1">
              {book.title}
            </p>
            <p className="flex items-center gap-1 text-xs sm:text-sm text-text-secondary line-clamp-1 mt-0.5">
              <PenLine className="w-3 h-3 shrink-0 text-accent-primary" />
              {book.author}
            </p>
            {owner && (
              <div className="flex items-center gap-1 mt-0.5">
                <Avatar className="w-4 h-4 shrink-0">
                  <AvatarImage
                    src={owner.profileImage?.sizes?.[0]?.url || owner.profileImage?.url}
                    alt={`${owner.firstName} ${owner.lastName}`}
                  />
                  <AvatarFallback className="text-[8px]">
                    {owner.firstName[0]}{owner.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-xs text-text-secondary line-clamp-1">
                  {owner.firstName} {owner.lastName}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {book.genre && <Badge variant="muted">{formatLabel(book.genre)}</Badge>}
            {book.isPublic !== undefined && (
              <Badge variant="muted">{book.isPublic ? 'Public' : 'Private'}</Badge>
            )}
            {book.isDownloadable && (
              <Badge variant="muted" className="flex items-center gap-1">
                <Download className="w-3 h-3" />
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={[
                  'w-3 h-3 sm:w-3.5 sm:h-3.5',
                  i < Math.round(book.averageRating ?? 0)
                    ? 'fill-star-filled text-star-filled'
                    : 'text-text-secondary',
                ].join(' ')}
              />
            ))}
            <span className="text-xs text-text-secondary ml-0.5">
              {(book.averageRating ?? 0).toFixed(1)}
              <span className="text-text-secondary/60 ml-0.5">
                ({book.totalRatings ?? 0})
              </span>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default BookCard
