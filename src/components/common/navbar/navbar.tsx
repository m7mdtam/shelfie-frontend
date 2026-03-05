import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { useAuthContext } from '@/contexts/auth'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { NavbarLogo } from './navbar-logo'
import { NavbarLinks } from './navbar-links'
import { NavbarUserMenu } from './navbar-user-menu'
import { NavbarMobileMenu } from './navbar-mobile-menu'

const SCROLL_THRESHOLD = 60

const NAV_TRANSITION = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 22,
  mass: 1.4,
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const { isAuthenticated, decodedToken, logout } = useAuthContext()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false)
  }, [isMobile])

  return (
    <motion.header
      initial={false}
      animate={
        scrolled
          ? {
              top: 16,
              left: '50%',
              x: '-50%',
              width: isMobile ? '92%' : '55%',
              borderRadius: 20,
            }
          : {
              top: 0,
              left: 0,
              x: '0%',
              width: '100%',
              borderRadius: 0,
            }
      }
      transition={NAV_TRANSITION}
      className={cn(
        'fixed z-50 navbar-blur',
        scrolled
          ? 'navbar-bg-scrolled shadow-navbar border border-text-border/20 px-4 py-1.5'
          : 'navbar-bg-full border-b border-text-border/20 px-6 py-2'
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <NavbarLogo scrolled={scrolled} />
        {!isMobile && (
          <nav className="flex items-center gap-6">
            <NavbarLinks variant="desktop" />
          </nav>
        )}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {isAuthenticated && <NavbarUserMenu user={decodedToken} onLogout={logout} />}

          {isMobile && (
            <Button
              variant="ghost"
              size="icon-rounded"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="text-text-secondary hover:text-accent-primary"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {isMobile && mobileMenuOpen && <NavbarMobileMenu onClose={() => setMobileMenuOpen(false)} />}
    </motion.header>
  )
}
