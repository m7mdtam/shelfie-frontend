import { Link } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks'
import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from '@/components/page-section'
import { ForgotPasswordForm } from '@/components/auth'

export function ForgotPasswordPage() {
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
            <PageSectionTitle>Forgot Password</PageSectionTitle>
            <PageSectionDescription>
              Enter your email and we'll send you a reset link
            </PageSectionDescription>
          </PageSectionHeader>
          <PageSectionContent>
            <ForgotPasswordForm />
          </PageSectionContent>
          <div className="mt-4 border-t border-text-border pt-4 flex justify-center items-center gap-1.5">
            <span className="text-text-secondary text-sm">Remember your password?</span>
            <Link
              to="/sign-in"
              className="text-accent-primary font-medium hover:text-accent-primary-hover transition-colors text-sm"
            >
              Sign in
            </Link>
          </div>
        </PageSection>
      </div>
    </div>
  )
}
