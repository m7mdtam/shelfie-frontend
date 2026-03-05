import { useNavigate } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export function SignUpSuccessPage() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  return (
    <div
      className="flex-1 bg-background-base flex flex-col items-center justify-center px-4 py-8"
      data-mobile={isMobile}
    >
      <div className="w-full max-w-md">
        <Card variant="elevated" className="w-full">
          <CardHeader className="text-center pt-8">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-[var(--state-success)]" />
            </div>
            <CardTitle>Account Created!</CardTitle>
            <CardDescription>
              Your account has been successfully created. You can now sign in.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pb-8">
            <p className="text-sm text-text-secondary text-center">
              Get ready to organize and track all your favorite books!
            </p>
            <Button
              onClick={() => navigate({ to: '/sign-in' })}
              className="w-full"
              variant="default"
            >
              Go to Sign In
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm">
          <span className="text-text-secondary">Want to explore first? </span>
          <button
            onClick={() => navigate({ to: '/' })}
            className="text-accent-primary font-medium hover:text-[var(--accent-primary-hover)] transition-colors cursor-pointer bg-none border-none p-0"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  )
}
