import { Book, getBookOwner } from '@/@types/book'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { ANIMATION_DURATION, ANIMATION_STATE, EASING, INTERACTION_STATE } from '@/utils/animations'
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
      <motion.div
        initial={ANIMATION_STATE.slideUp.hidden}
        animate={ANIMATION_STATE.slideUp.visible}
        transition={{
          duration: ANIMATION_DURATION.normal,
          ease: EASING.easeOut as any,
        }}
        whileHover={INTERACTION_STATE.hoverSlideUp}
      >
        <Card
          variant="default"
          className="flex flex-row hover:shadow-lg transition-shadow cursor-pointer p-3 gap-3 h-56 max-[425px]:p-2 max-[425px]:gap-2 max-[425px]:h-44"
        >
          <div className="w-36 max-[425px]:w-24 self-stretch shrink-0 rounded-md overflow-hidden">
            <img
              src={book.coverImage?.url ?? fallbackImage}
              alt={book.title}
              className="w-full h-full object-cover dark:brightness-75"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between min-w-0 overflow-hidden">
            <div>
              <p className="font-bold text-lg max-[425px]:text-sm text-text-primary line-clamp-1">
                {book.title}
              </p>
              <p className="text-xs max-[425px]:text-[10px] text-text-secondary line-clamp-1">
                {book.author}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex gap-3 max-[425px]:gap-2">
                {book.genre && (
                  <div>
                    <p className="text-[10px] max-[425px]:text-[9px] font-semibold text-text-secondary uppercase tracking-wide">
                      Genre
                    </p>
                    <p className="text-xs max-[425px]:text-[10px] text-text-primary">
                      {formatLabel(book.genre)}
                    </p>
                  </div>
                )}
                {book.isPublic !== undefined && (
                  <div>
                    <p className="text-[10px] max-[425px]:text-[9px] font-semibold text-text-secondary uppercase tracking-wide">
                      Visibility
                    </p>
                    <p className="text-xs max-[425px]:text-[10px] text-text-primary">
                      {book.isPublic ? 'Public' : 'Private'}
                    </p>
                  </div>
                )}
              </div>
              {book.isDownloadable && (
                <div>
                  <p className="text-[10px] max-[425px]:text-[9px] font-semibold text-text-secondary uppercase tracking-wide">
                    Download
                  </p>
                  <p className="text-xs max-[425px]:text-[10px] text-text-primary">Available</p>
                </div>
              )}
            </div>

            {owner && (
              <div>
                <p className="text-[10px] max-[425px]:text-[9px] font-semibold text-text-secondary uppercase tracking-wide">
                  Posted by
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Avatar className="w-4 h-4 max-[425px]:w-3.5 max-[425px]:h-3.5 shrink-0">
                    <AvatarImage
                      src={owner.profileImage?.sizes?.[0]?.url || owner.profileImage?.url}
                      alt={`${owner.firstName} ${owner.lastName}`}
                    />
                    <AvatarFallback className="text-[7px] max-[425px]:text-[6px]">
                      {owner.firstName[0]}
                      {owner.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xs max-[425px]:text-[10px] text-text-primary line-clamp-1">
                    {owner.firstName} {owner.lastName}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1 max-[425px]:gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={[
                    'w-3.5 h-3.5 max-[425px]:w-2.5 max-[425px]:h-2.5',
                    i < Math.round(book.averageRating ?? 0)
                      ? 'fill-star-filled text-star-filled'
                      : 'text-text-secondary',
                  ].join(' ')}
                />
              ))}
              <span className="text-xs max-[425px]:text-[10px] text-text-secondary ml-0.5">
                {(book.averageRating ?? 0).toFixed(1)}
                <span className="text-text-secondary/60 ml-0.5">({book.totalRatings ?? 0})</span>
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}

export default BookCard
