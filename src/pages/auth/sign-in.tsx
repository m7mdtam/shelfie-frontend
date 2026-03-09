import { Link } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks'
import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from '@/components/common/page-section'
import { SignInForm } from '@/components/auth'

export function SignInPage() {
  const isMobile = useIsMobile()

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative"
      data-mobile={isMobile}
    >
      <div className="relative z-10 w-full max-w-sm">
        <PageSection variant="default" className="w-full gap-4 flex flex-col">
          <PageSectionHeader className="text-center">
            <Link to="/" className="relative z-10 justify-center flex items-center mb-5">
              <img src="/logo.svg" alt="Shelfie" className="h-12 w-auto" />
            </Link>
            <PageSectionTitle>Welcome Back</PageSectionTitle>
            <PageSectionDescription>Sign in to your account to continue</PageSectionDescription>
          </PageSectionHeader>
          <PageSectionContent>
            <SignInForm />
          </PageSectionContent>
          <div className="mt-4 border-t border-text-border pt-4 flex justify-center items-center gap-1.5">
            <span className="text-text-secondary text-sm">Don't have an account? </span>
            <Link
              to="/sign-up"
              className="text-accent-primary font-medium hover:text-accent-primary-hover transition-colors text-sm"
            >
              Sign up
            </Link>
          </div>
        </PageSection>
      </div>
    </div>
  )
}
