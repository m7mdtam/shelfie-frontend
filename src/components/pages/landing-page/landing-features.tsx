import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { BookOpen, Compass, Star, Lock } from 'lucide-react'
import { useLandingScrollPreset } from '@/lib/animations'
import { FeatureCard } from './features/feature-card'

interface Feature {
  icon: ReactNode
  title: string
  description: string
  delay: number
}

const FEATURES: Feature[] = [
  {
    icon: <BookOpen className="size-5" />,
    title: 'Personal Shelf',
    description: 'Add books you\'ve read, are reading, or want to read. Your library, organized exactly how you like it.',
    delay: 0,
  },
  {
    icon: <Compass className="size-5" />,
    title: 'Discover Freely',
    description: 'Browse the full community library without signing up. Find your next great read and explore book details.',
    delay: 0.08,
  },
  {
    icon: <Star className="size-5" />,
    title: 'Community Ratings',
    description: 'See honest ratings and comments from real readers. Know what you\'re getting into before you start.',
    delay: 0.16,
  },
  {
    icon: <Lock className="size-5" />,
    title: 'Join to Contribute',
    description: 'Create a free account to rate books, leave comments, upload your own titles, and build your shelf.',
    delay: 0.24,
  },
]

export function LandingFeatures() {
  const titlePreset = useLandingScrollPreset()

  return (
    <section className="px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          {...titlePreset}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Everything for your reading life
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-lg mx-auto">
            Start exploring for free. Create an account when you\'re ready to contribute.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
