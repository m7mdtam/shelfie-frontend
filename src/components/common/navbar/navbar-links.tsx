import { Link, useNavigate } from '@tanstack/react-router'
import { Library, Compass } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useAuthContext } from '@/contexts/auth'

interface NavbarLinksProps {
  variant?: 'desktop' | 'mobile'
  onClose?: () => void
}

export function NavbarLinks({ variant = 'desktop', onClose }: NavbarLinksProps) {
  const isMobile = variant === 'mobile'
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  const linkClass = cn(
    'relative flex items-center gap-2 font-semibold transition-all duration-200',
    'text-text-secondary hover:text-accent-primary',
    'data-[status=active]:text-accent-primary',
    isMobile
      ? 'px-3 py-3 rounded-lg hover:bg-accent-background text-base w-full data-[status=active]:bg-accent-background'
      : 'text-sm px-1 py-0.5 data-[status=active]:after:absolute data-[status=active]:after:bottom-[-3px] data-[status=active]:after:left-0 data-[status=active]:after:right-0 data-[status=active]:after:h-[2px] data-[status=active]:after:rounded-full data-[status=active]:after:bg-accent-primary'
  )

  const handleShelfClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      toast('Sign in required', {
        description: 'You need to sign in to access your shelf.',
      })
      navigate({ to: '/sign-in' })
    }
    onClose?.()
  }

  return (
    <>
      <Link
        to="/books/shelf"
        className={linkClass}
        onClick={handleShelfClick}
      >
        <Library className="h-4 w-4 shrink-0" />
        <span>Shelf</span>
      </Link>
      <Link
        to="/books/explore"
        className={linkClass}
        onClick={onClose}
      >
        <Compass className="h-4 w-4 shrink-0" />
        <span>Explore</span>
      </Link>
    </>
  )
}
