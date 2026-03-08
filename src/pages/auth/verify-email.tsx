import { Link, useSearch } from '@tanstack/react-router'
import { CheckCircle, Loader, XCircle } from 'lucide-react'
import { useIsMobile } from '@/hooks'
import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from '@/components/page-section'
import { Button } from '@/components/ui/button'
import { useVerifyEmail } from '@/hooks/auth'
import DotGrid from '@/components/dot-grid'

export function VerifyEmailPage() {
  const isMobile = useIsMobile()
  const search = useSearch({ strict: false })
  const token = (search as Record<string, string>).token

  const { isLoading, isSuccess, isError, errorMessage } = useVerifyEmail()

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative"
      data-mobile={isMobile}
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <DotGrid
          dotSize={8}
          gap={40}
          baseColor="#9B8B7E"
          activeColor="#C9A876"
          proximity={120}
          speedTrigger={80}
          shockRadius={200}
          shockStrength={3}
          maxSpeed={3000}
          resistance={600}
          returnDuration={1.5}
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <PageSection variant="default" className="w-full gap-4 flex flex-col">
          <PageSectionHeader className="text-center">
            <Link to="/" className="relative z-10 justify-center flex items-center mb-5">
              <img src="/logo.svg" alt="Shelfie" className="h-12 w-auto" />
            </Link>{' '}
            <PageSectionTitle>Verify Email</PageSectionTitle>
          </PageSectionHeader>
          <PageSectionContent>
            {isLoading && token && (
              <div className="flex flex-col items-center gap-3 py-4">
                <Loader className="h-10 w-10 animate-spin text-accent-primary" />
                <span className="text-text-secondary text-sm">Verifying your email...</span>
              </div>
            )}

            {isSuccess && (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <CheckCircle className="h-10 w-10 text-state-success" />
                <PageSectionDescription>
                  Your email has been verified successfully
                </PageSectionDescription>
                <span className="text-text-secondary text-sm">Redirecting to sign in...</span>
              </div>
            )}

            {(isError || !token) && (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <XCircle className="h-10 w-10 text-state-error" />
                <PageSectionDescription>
                  {!token ? 'Invalid or expired verification link' : errorMessage}
                </PageSectionDescription>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/sign-up">Back to Sign Up</Link>
                </Button>
              </div>
            )}
          </PageSectionContent>
        </PageSection>
      </div>
    </div>
  )
}
