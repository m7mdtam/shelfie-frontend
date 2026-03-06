import { Link } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'
import { useIsMobile } from '@/hooks'
import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from '@/components/page-section'
import { ForgotPasswordForm } from '@/components/auth'
import DotGrid from '@/components/DotGrid'

export function ForgotPasswordPage() {
  const isMobile = useIsMobile()

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
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      <Link to="/" className="relative z-10 flex items-center gap-2 mb-5 group">
        <BookOpen className="h-6 w-6 text-accent-primary" />
        <span className="font-bold text-xl text-text-primary">Shelfie</span>
      </Link>
      <div className="relative z-10 w-full max-w-sm">
        <PageSection variant="default" className="w-full gap-4 flex flex-col">
          <PageSectionHeader className="text-center">
            <PageSectionTitle>Forgot Password</PageSectionTitle>
            <PageSectionDescription>Enter your email and we'll send you a reset link</PageSectionDescription>
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
