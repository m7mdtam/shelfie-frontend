import { Link, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Home } from 'lucide-react'
import FuzzyText from '@/components/FuzzyText'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)] px-4">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-text-border/30 bg-background-surface px-10 py-12 text-center max-w-sm w-full">

        <div className="flex flex-col items-center gap-4">
          <FuzzyText
            fontSize="5rem"
            fontWeight={900}
            baseIntensity={0.1}
            hoverIntensity={0.4}
            enableHover
            color="#e2e8f0"
            fuzzRange={22}
            transitionDuration={200}
          >
            404
          </FuzzyText>

          <FuzzyText
            fontSize="1.125rem"
            fontWeight={600}
            baseIntensity={0.05}
            hoverIntensity={0.2}
            enableHover
            color="#94a3b8"
            fuzzRange={10}
            transitionDuration={200}
          >
            Page Not Found
          </FuzzyText>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button className="flex-1" onClick={() => router.history.back()}>
            <ArrowLeft className="size-4" />
            Go Back
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link to="/">
              <Home className="size-4" />
              Home
            </Link>
          </Button>
        </div>

      </div>
    </div>
  )
}
