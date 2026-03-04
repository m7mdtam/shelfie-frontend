import { Link } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SignInForm } from '@/components/auth'

export function SignInPage() {
  const isMobile = useIsMobile()

  return (
    <div
      className="min-h-screen bg-background-base flex flex-col items-center justify-center px-4 py-8"
      data-mobile={isMobile}
    >
      <div className="w-full max-w-md">
        <Card variant="default" className="w-full">
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm">
          <span className="text-text-secondary">Don't have an account? </span>
          <Link
            to="/sign-up"
            className="text-accent-primary font-medium hover:text-[var(--accent-primary-hover)] transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
