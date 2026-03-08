import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface NavbarLogoProps {
  scrolled: boolean
}

export function NavbarLogo({ scrolled }: NavbarLogoProps) {
  return (
    <Link to="/" className="flex items-center no-underline hover:no-underline">
      <img
        src="/logo.svg"
        alt="Shelfie"
        className={cn(
          'transition-all duration-300',
          scrolled ? 'h-7 w-auto lg:h-6 scale-[1.55]' : 'h-8 w-auto lg:h-7 scale-[1.55]'
        )}
      />
    </Link>
  )
}
