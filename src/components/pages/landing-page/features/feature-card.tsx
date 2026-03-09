import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useLandingFeaturePreset } from '@/lib/animations'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay: number
}

export function FeatureCard(props: FeatureCardProps) {
  const featurePreset = useLandingFeaturePreset(props.delay)

  return (
    <motion.div
      {...featurePreset}
      className="flex flex-col gap-4 rounded-xl border border-text-border/40 bg-background-surface p-6 md:p-8"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-background text-accent-primary shrink-0">
        {props.icon}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold text-text-primary md:text-lg">{props.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed md:text-base">{props.description}</p>
      </div>
    </motion.div>
  )
}
