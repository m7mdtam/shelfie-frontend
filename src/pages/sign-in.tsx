import { Link } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks'
import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from '@/components/page-section'
import { SignInForm } from '@/components/auth'

export function SignInPage() {
  const isMobile = useIsMobile()

  return (
    <div
      className="flex-1 bg-background-base flex flex-col items-center justify-center px-4 py-8"
      data-mobile={isMobile}
    >
      <div className="w-full max-w-sm">
        <PageSection variant="default" className="w-full flex flex-col">
          <PageSectionHeader className="text-center">
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
