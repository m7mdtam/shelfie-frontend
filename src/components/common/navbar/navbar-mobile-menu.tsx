import { useNavigate } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'
import { useAuthContext } from '@/contexts/auth'
import { NavbarLinks } from './navbar-links'

interface NavbarMobileMenuProps {
  onClose: () => void
}

export function NavbarMobileMenu({ onClose }: NavbarMobileMenuProps) {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  return (
    <div className="absolute top-full left-0 right-0 mt-2 mx-4 rounded-xl bg-background-surface shadow-navbar border border-(--text-border)/25 overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
      <nav className="flex flex-col gap-1 p-3">
        <NavbarLinks variant="mobile" onClose={onClose} />
        {!isAuthenticated && (
          <button
            className="relative flex items-center gap-2 font-semibold transition-all duration-200 text-text-secondary hover:text-accent-primary px-3 py-3 rounded-lg hover:bg-accent-background text-base w-full"
            onClick={() => { onClose(); navigate({ to: '/sign-in' }) }}
          >
            <LogIn className="h-4 w-4 shrink-0" />
            <span>Sign In</span>
          </button>
        )}
      </nav>
    </div>
  )
}
