import { createFileRoute, Outlet, Link, useNavigate } from '@tanstack/react-router'
import { useAuthContext } from '@/contexts/auth'
import { Button } from '@/components/ui/button'
import { BookOpen, LogOut, Library, Compass } from 'lucide-react'

function BooksLayout() {
  const auth = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await auth.logout()
    navigate({ to: '/sign-in' })
  }

  return (
    <div className="min-h-screen bg-background-base flex flex-col">
      <header className="border-b border-input bg-background-surface sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/books" className="flex items-center gap-2 font-bold text-text-primary text-lg">
            <BookOpen className="w-5 h-5 text-accent-primary" />
            Shelfie
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              to="/books/explore"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-background-base transition-colors"
            >
              <Compass className="w-4 h-4" />
              Explore
            </Link>

            {auth.isAuthenticated && (
              <Link
                to="/books/shelf"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-background-base transition-colors"
              >
                <Library className="w-4 h-4" />
                My Shelf
              </Link>
            )}

            {auth.isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="ml-2 flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </Button>
            ) : (
              <Link to="/sign-in">
                <Button variant="default" size="sm" className="ml-2">
                  Sign in
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createFileRoute('/books')({
  component: BooksLayout,
})
