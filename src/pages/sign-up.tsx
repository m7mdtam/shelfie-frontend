import { Link } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SignUpForm } from '@/components/auth'

export function SignUpPage() {
  const isMobile = useIsMobile()

  return (
    <div
      className="flex-1 bg-background-base flex flex-col items-center justify-center px-4 py-8"
      data-mobile={isMobile}
    >
      <div className="w-full max-w-md">
        <Card variant="default" className="w-full">
          <CardHeader className="text-center">
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Join us and start managing your bookshelf</CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm">
          <span className="text-text-secondary">Already have an account? </span>
          <Link
            to="/sign-in"
            className="text-accent-primary font-medium hover:text-[var(--accent-primary-hover)] transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
