import type { Transition, Variants } from 'motion/react'

export const staggerConfig = {
  fast:          { staggerChildren: 0.05, delayChildren: 0 } as Transition,
  normal:        { staggerChildren: 0.1,  delayChildren: 0 } as Transition,
  slow:          { staggerChildren: 0.15, delayChildren: 0 } as Transition,
  delayedFast:   { staggerChildren: 0.05, delayChildren: 0.2 } as Transition,
  delayedNormal: { staggerChildren: 0.1,  delayChildren: 0.3 } as Transition,
} as const

export const staggerContainer: Record<keyof typeof staggerConfig, Variants> = {
  fast: {
    hidden:  {},
    visible: { transition: staggerConfig.fast },
    exit:    {},
  },
  normal: {
    hidden:  {},
    visible: { transition: staggerConfig.normal },
    exit:    {},
  },
  slow: {
    hidden:  {},
    visible: { transition: staggerConfig.slow },
    exit:    {},
  },
  delayedFast: {
    hidden:  {},
    visible: { transition: staggerConfig.delayedFast },
    exit:    {},
  },
  delayedNormal: {
    hidden:  {},
    visible: { transition: staggerConfig.delayedNormal },
    exit:    {},
  },
}
