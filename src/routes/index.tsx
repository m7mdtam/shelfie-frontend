import { createFileRoute, Link } from '@tanstack/react-router'
import { Compass } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-4">Shelfie</h1>
        <p className="text-lg md:text-xl text-text-secondary mb-12">
          Organize and track all your favorite books
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-3 py-1.5 md:text-base"
          >
            Get Started
          </Link>
          <Link
            to="/books/explore"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-text-border bg-background-surface shadow-sm hover:bg-accent-background hover:text-text-primary h-9 px-3 py-1.5 md:text-base"
          >
            <Compass className="size-4" />
            Explore
          </Link>
        </div>
      </div>
    </div>
  )
}
