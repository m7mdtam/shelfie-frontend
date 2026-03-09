import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from '@tanstack/react-router'
import { BookOwner } from '@/@types/book'

interface BookDetailPosterProps {
  owner: BookOwner
}

export function BookDetailPoster({ owner }: BookDetailPosterProps) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide mb-0.5">
        Posted by
      </p>
      <Link
        to="/profile/$userId"
        params={{ userId: owner.id }}
        className="flex items-center gap-1.5 text-sm text-text-primary hover:text-accent-primary transition-colors w-fit"
      >
        <Avatar className="w-5 h-5 shrink-0">
          <AvatarImage
            src={owner.profileImage?.sizes?.[0]?.url || owner.profileImage?.url}
            alt={`${owner.firstName} ${owner.lastName}`}
          />
          <AvatarFallback className="text-[9px]">
            {owner.firstName[0]}
            {owner.lastName[0]}
          </AvatarFallback>
        </Avatar>
        {owner.firstName} {owner.lastName}
      </Link>
    </div>
  )
}
