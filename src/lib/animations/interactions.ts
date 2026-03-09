import type { Target } from 'motion/react'

export const hoverSlide: Target = { x: 4 }
export const hoverSlideUp: Target = { y: -4 }
export const hoverSlideDown: Target = { y: 4 }
export const hoverSlideLeft: Target = { x: -4 }
export const hoverScale: Target = { scale: 1.02 }
export const hoverScaleMedium: Target = { scale: 1.05 }
export const hoverScaleLarge: Target = { scale: 1.1 }
export const hoverBright: Target = { filter: 'brightness(1.15)' }
export const hoverDim: Target = { filter: 'brightness(0.85)' }
export const hoverRotate: Target = { rotate: 5 }
export const tapScale: Target = { scale: 0.95 }
export const tapScaleSmall: Target = { scale: 0.98 }
export const tapScaleLarge: Target = { scale: 0.9 }

export const dragConstraints = {
  shelf: { top: 0, bottom: 0 },
} as const
