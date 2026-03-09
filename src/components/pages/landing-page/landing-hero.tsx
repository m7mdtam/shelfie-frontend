import { motion } from 'motion/react'
import Aurora from '@/components/common/aurora'
import { useLandingHeroItemPreset } from '@/lib/animations'
import { HeroBadge } from './hero/hero-badge'
import ShinyText from '@/components/ShinyText'
import TextType from '@/components/TextType'

const SUBTITLE_PHRASES = [
  'Discover, track, and share books with a community of passionate readers.',
  'No account needed to start exploring.',
  'Your next great read is one shelf away.',
]

export function LandingHero() {
  const badgePreset    = useLandingHeroItemPreset(0)
  const headlinePreset = useLandingHeroItemPreset(0.1)
  const subtitlePreset = useLandingHeroItemPreset(0.2)

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-4 py-24 text-center overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-[55%] opacity-60 pointer-events-none">
        <Aurora
          colorStops={['#0e9580', '#134e4a', '#0e9580']}
          amplitude={1.2}
          blend={0.6}
          speed={0.6}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-7 max-w-4xl mx-auto">
        <motion.div {...badgePreset}>
          <HeroBadge text="Community Book Library" />
        </motion.div>

        <motion.h1
          {...headlinePreset}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.08] tracking-tight"
        >
          Your books.{' '}
          <ShinyText
            text="Beautifully"
            color="var(--accent-primary)"
            shineColor="oklch(85% 0.12 190)"
            speed={3}
            spread={130}
          />{' '}
          organized.
        </motion.h1>

        <motion.div
          {...subtitlePreset}
          className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed min-h-18 md:min-h-8 flex items-start justify-center"
        >
          <TextType
            text={SUBTITLE_PHRASES}
            typingSpeed={35}
            deletingSpeed={18}
            pauseDuration={3000}
            loop
            showCursor
            cursorCharacter="|"
            cursorClassName="text-accent-primary"
          />
        </motion.div>
      </div>
    </section>
  )
}
