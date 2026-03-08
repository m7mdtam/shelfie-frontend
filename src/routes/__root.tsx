import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Navbar } from '@/components/common/navbar'
import { Toaster } from '@/components/ui/sonner'

const routeTitles: Record<string, string> = {
  '/': 'Shelfie - Organize Your Books',
  '/sign-in': 'Sign In - Shelfie',
  '/sign-up': 'Sign Up - Shelfie',
  '/sign-up-success': 'Welcome - Shelfie',
  '/books/explore': 'Explore Books - Shelfie',
  '/books/shelf': 'My Shelf - Shelfie',
  '/books/add': 'Add Book - Shelfie',
  '/profile': 'My Profile - Shelfie',
}

function RootLayout() {
  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname
    const title = routeTitles[pathname] || 'Shelfie'
    document.title = title
  }, [location.pathname])

  const hideNavbarPaths = ['/sign-in', '/sign-up', '/sign-up-success']
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname)

  return (
    <div className="relative min-h-dvh bg-background-base flex flex-col">
      {!shouldHideNavbar && <Navbar />}
      <main
        className={shouldHideNavbar ? 'flex flex-col min-h-dvh' : 'pt-16 flex flex-col flex-1'}
      >
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
