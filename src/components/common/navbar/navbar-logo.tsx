import { Link } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavbarLogoProps {
  scrolled: boolean
}

export function NavbarLogo({ scrolled }: NavbarLogoProps) {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 no-underline hover:no-underline group"
    >
      <BookOpen
        className={cn(
          'text-accent-primary transition-all duration-300',
          scrolled ? 'h-5 w-5' : 'h-6 w-6'
        )}
      />
      <span
        className={cn(
          'font-bold text-text-primary no-underline transition-all duration-300 font-sans',
          scrolled ? 'text-base' : 'text-lg'
        )}
      >
        Shelfie
      </span>
    </Link>
  )
}
