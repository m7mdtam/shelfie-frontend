import { LandingHero } from '@/components/pages/landing-page/landing-hero'
import { LandingFeatures } from '@/components/pages/landing-page/landing-features'
import { LandingCta } from '@/components/pages/landing-page/landing-cta'

export function LandingPage() {
  return (
    <div className="flex flex-col">
      <LandingHero />
      <LandingFeatures />
      <LandingCta />
    </div>
  )
}
