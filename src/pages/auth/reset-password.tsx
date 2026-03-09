import { Link, useSearch } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks'
import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from '@/components/common/page-section'
import { ResetPasswordForm } from '@/components/auth'

export function ResetPasswordPage() {
  const isMobile = useIsMobile()
  const search = useSearch({ strict: false })
  const token = (search as Record<string, string>).token

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
            <PageSectionTitle>Reset Password</PageSectionTitle>
            <PageSectionDescription>Enter your new password below</PageSectionDescription>
          </PageSectionHeader>
          <PageSectionContent>
            {!token ? (
              <div className="rounded-md p-4 border border-state-error bg-state-error-bg text-state-error flex flex-col gap-2">
                <p className="text-sm font-medium">Invalid or expired reset link</p>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  Request a new one
                </Link>
              </div>
            ) : (
              <ResetPasswordForm />
            )}
          </PageSectionContent>
        </PageSection>
      </div>
    </div>
  )
}
