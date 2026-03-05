import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Navbar } from '@/components/common/navbar'
import DotGrid from '@/components/DotGrid'

const routeTitles: Record<string, string> = {
  '/': 'Shelfie - Organize Your Books',
  '/sign-in': 'Sign In - Shelfie',
  '/sign-up': 'Sign Up - Shelfie',
  '/sign-up-success': 'Welcome - Shelfie',
  '/books/explore': 'Explore Books - Shelfie',
  '/books/shelf': 'My Shelf - Shelfie',
  '/books/add': 'Add Book - Shelfie',
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
    <div className="relative min-h-screen bg-background-base">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotGrid
          dotSize={8}
          gap={40}
          baseColor="#9B8B7E"
          activeColor="#C9A876"
          proximity={120}
          speedTrigger={80}
          shockRadius={200}
          shockStrength={3}
          maxSpeed={3000}
          resistance={600}
          returnDuration={1.5}
          style={{ height: '100vh', width: '100%' }}
        />
      </div>
      <div className="relative z-10">
        {!shouldHideNavbar && <Navbar />}
        <main
          className={
            shouldHideNavbar ? 'flex flex-col min-h-screen' : 'pt-10 flex flex-col min-h-screen'
          }
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
