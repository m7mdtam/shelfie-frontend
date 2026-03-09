import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ArrowRight, Compass } from 'lucide-react'
import { useLandingScrollPreset } from '@/lib/animations'
import { Button } from '@/components/ui/button'

export function LandingCta() {
  const ctaPreset = useLandingScrollPreset()

  return (
    <section className="px-4 py-24">
      <motion.div
        {...ctaPreset}
        className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-8 rounded-2xl border border-text-border/30 bg-background-surface px-8 py-16 md:px-16 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-primary/40 to-transparent" />

        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Ready to build your shelf?
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-md leading-relaxed">
            Join Shelfie for free. Track what you read, discover what\'s next, and share with the
            community.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link to="/sign-up">
              Create Account
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/books/explore">
              <Compass className="size-4" />
              Explore Books
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
