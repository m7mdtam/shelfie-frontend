import { Book } from '@/@types/book'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Edit2, Trash2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const formatLabel = (value: string) =>
  value
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

interface BookCardProps {
  book: Book
  isOwner?: boolean
  onEdit?: (book: Book) => void
  onDelete?: (book: Book) => void
}

export function BookCard({ book, isOwner, onEdit, onDelete }: BookCardProps) {
  return (
    <Link to="/books/$bookId" params={{ bookId: book.id }} className="block h-full">
      <Card
        variant="default"
        className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="h-48 bg-linear-to-br from-accent-primary-hover to-accent-primary rounded-t-lg flex items-center justify-center overflow-hidden">
          {book.coverImage?.url ? (
            <img
              src={book.coverImage.url}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen className="w-12 h-12 text-white opacity-50" />
          )}
        </div>

        <CardHeader className="flex-1">
          <CardTitle className="line-clamp-2 text-base">{book.title}</CardTitle>
          <p className="text-sm text-text-secondary line-clamp-1">{book.author}</p>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {book.genre && (
              <div>
                <span className="text-text-secondary">Genre</span>
                <Badge className="mt-1">{formatLabel(book.genre)}</Badge>
              </div>
            )}
            {book.status && (
              <div>
                <span className="text-text-secondary">Status</span>
                <Badge variant="outline" className="mt-1">
                  {formatLabel(book.status)}
                </Badge>
              </div>
            )}
          </div>

          {book.rating && (
            <div className="flex items-center gap-2 pt-2 border-t border-input">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < (book.rating || 0) ? 'text-accent-primary' : 'text-text-tertiary'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-text-secondary ml-auto">{book.rating}/5</span>
            </div>
          )}

          {isOwner && (onEdit || onDelete) && (
            <div className="flex gap-2 pt-2 border-t border-input">
              {onEdit && (
                <Button
                  onClick={() => onEdit(book)}
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  onClick={() => onDelete(book)}
                  size="sm"
                  variant="destructive"
                  className="flex-1 gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export default BookCard
