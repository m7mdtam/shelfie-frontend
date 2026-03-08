import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Navbar } from '@/components/common/navbar'
import { Toaster } from '@/components/ui/sonner'
import Aurora from '@/components/Aurora'

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
    <div className="relative min-h-dvh flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-50 dark:opacity-70">
        <Aurora
          colorStops={['#0c4a6e', '#0e7490', '#164e63']}
          amplitude={1.0}
          blend={0.5}
          speed={0.4}
        />
      </div>
      {!shouldHideNavbar && <Navbar />}
      <main
        className={
          shouldHideNavbar
            ? 'relative z-10 flex flex-col min-h-dvh'
            : 'relative z-10 pt-16 flex flex-col flex-1'
        }
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
