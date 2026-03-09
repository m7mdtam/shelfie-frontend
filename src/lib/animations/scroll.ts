import type { Variants } from 'motion/react'

export const fadeInView: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
}

export const slideUpInView: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 20 },
}

export const slideLeftInView: Variants = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: 20 },
}

export const scaleInView: Variants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit:    { opacity: 0, scale: 0.95 },
}

export const viewport = {
  once:   { once: true  } as const,
  repeat: { once: false } as const,
} as const

export const threshold = {
  eager:  { amount: 0.1 } as const,
  normal: { amount: 0.2 } as const,
  lazy:   { amount: 0.4 } as const,
} as const
