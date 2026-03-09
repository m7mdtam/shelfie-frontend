import type { Transition } from 'motion/react'

export const DURATION = {
  veryFast: 0.2,
  fast: 0.3,
  midFast: 0.4,
  normal: 0.5,
  midSlow: 0.6,
  slow: 0.8,
  verySlow: 1.2,
} as const

export const EASING = {
  easeIn: 'easeIn' as const,
  easeOut: 'easeOut' as const,
  easeInOut: 'easeInOut' as const,
} as const

export const SPRING: Record<'snappy' | 'bouncy' | 'gentle' | 'stiff' | 'wobbly' | 'loose', Transition> = {
  snappy:  { type: 'spring', stiffness: 400, damping: 30, mass: 1 },
  bouncy:  { type: 'spring', stiffness: 300, damping: 15, mass: 1 },
  gentle:  { type: 'spring', stiffness: 120, damping: 20, mass: 1 },
  stiff:   { type: 'spring', stiffness: 500, damping: 40, mass: 1 },
  wobbly:  { type: 'spring', stiffness: 200, damping: 10, mass: 1 },
  loose:   { type: 'spring', stiffness: 80,  damping: 12, mass: 1 },
}

export const TWEEN_OPACITY: Transition = {
  type: 'tween',
  duration: DURATION.fast,
  ease: EASING.easeOut,
}

export const layoutTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}
