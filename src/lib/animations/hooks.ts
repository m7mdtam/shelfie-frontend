import { useReducedMotion as useMotionReducedMotion } from 'motion/react'
import { useRef } from 'react'
import type { Variants } from 'motion/react'
import { DURATION } from './core'

export function useReducedMotion() {
  const prefersReducedMotion = useMotionReducedMotion()
  const safeVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
    exit:    { opacity: 0 },
  }
  return { prefersReducedMotion, safeVariants }
}

export function useAnimateOnMount() {
  const ref = useRef<HTMLElement | null>(null)
  return {
    ref,
    initial:  'hidden',
    animate:  'visible',
  }
}

export function useStaggerChildren(count: number, baseDelay: number = DURATION.fast) {
  return Array.from({ length: count }, (_, i) => ({ delay: i * baseDelay }))
}

export function usePageTransition() {
  return {
    initial: 'hidden',
    animate: 'visible',
    exit:    'exit',
  } as const
}
