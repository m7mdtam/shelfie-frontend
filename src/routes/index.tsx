import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex-1 bg-background-base flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Shelfie
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-8">
          Organize and track all your favorite books
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/sign-in"
            className="px-6 py-3 bg-accent-primary text-white rounded-md font-medium hover:opacity-90 transition-opacity text-center"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="px-6 py-3 border-2 border-accent-primary text-accent-primary rounded-md font-medium hover:bg-accent-background transition-colors text-center"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
