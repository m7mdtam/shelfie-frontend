import { Link } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks'
import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from '@/components/page-section'
import { SignUpForm } from '@/components/auth'

export function SignUpPage() {
  const isMobile = useIsMobile()

  return (
    <div
      className="flex-1 bg-background-base flex flex-col items-center justify-center px-4 py-8"
      data-mobile={isMobile}
    >
      <div className="w-full max-w-sm">
        <PageSection variant="default" className="w-full flex flex-col">
          <PageSectionHeader className="text-center">
            <PageSectionTitle>Create Account</PageSectionTitle>
            <PageSectionDescription>
              Join us and start managing your bookshelf
            </PageSectionDescription>
          </PageSectionHeader>
          <PageSectionContent>
            <SignUpForm />
          </PageSectionContent>
          <div className="mt-4 border-t border-text-border pt-4 flex gap-1.5 justify-center items-center">
            <span className="text-text-secondary text-sm">Already have an account? </span>
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
