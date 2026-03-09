import type { MotionProps, Transition } from 'motion/react'
import { SPRING, TWEEN_OPACITY } from './core'
import {
  fade,
  slideUp,
  slideUpSmall,
  slideUpMedium,
  slideDown,
  slideLeft,
  slideLeftSmall,
  slideRight,
  scaleUp,
  scaleUpLarge,
  popIn,
  combined,
  spin,
} from './variants'
import {
  hoverSlide,
  hoverSlideUp,
  hoverScale,
  hoverScaleMedium,
  hoverScaleLarge,
  tapScale,
  tapScaleSmall,
} from './interactions'
import { useReducedMotion } from './hooks'
import { slideUpInView, viewport, threshold } from './scroll'
import { staggerConfig } from './stagger'

export function usePagePreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }
  }
  return {
    variants:   slideUpMedium,
    initial:    'hidden',
    animate:    'visible',
    exit:       'exit',
    transition: SPRING.gentle,
  }
}

export function useCardPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return {
      variants:   safeVariants,
      initial:    'hidden',
      whileInView: 'visible',
      viewport:   { ...viewport.once, ...threshold.normal },
    }
  }
  return {
    variants:    combined,
    initial:     'hidden',
    whileInView: 'visible',
    whileHover:  hoverSlideUp,
    transition:  SPRING.gentle,
    viewport:    { ...viewport.once, ...threshold.normal },
    layout:      true,
  }
}

export function useBookCardPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   slideUp,
    initial:    'hidden',
    animate:    'visible',
    whileHover: hoverSlideUp,
    transition: SPRING.gentle,
  }
}

export function useBookCoverPreset(layoutId: string): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { layoutId, variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    layoutId,
    variants:   scaleUpLarge,
    initial:    'hidden',
    animate:    'visible',
    whileHover: hoverScaleMedium,
    transition: SPRING.gentle,
    layout:     true,
  }
}

export function useNavbarPreset(scrolled: boolean, isMobile: boolean): MotionProps {
  return {
    initial: false,
    animate: scrolled
      ? { top: 16, left: '50%', x: '-50%', width: isMobile ? '92%' : '55%', borderRadius: 20 }
      : { top: 0, left: 0, x: '0%', width: '100%', borderRadius: 0 },
    transition: {
      type:      'spring',
      stiffness: 100,
      damping:   22,
      mass:      1.4,
    } as Transition,
  }
}

export function useNavbarLogoPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   popIn,
    initial:    'hidden',
    animate:    'visible',
    transition: { type: 'spring', stiffness: 100, damping: 20, mass: 1 } as Transition,
  }
}

export function useNavLinkPreset(delay: number = 0): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   slideLeftSmall,
    initial:    'hidden',
    animate:    'visible',
    whileHover: hoverSlide,
    whileTap:   tapScale,
    transition: { ...SPRING.snappy, delay } as Transition,
  }
}

export function useButtonPreset(): MotionProps {
  const { prefersReducedMotion } = useReducedMotion()
  if (prefersReducedMotion) return {}
  return {
    whileHover: hoverScale,
    whileTap:   tapScaleSmall,
    transition: SPRING.snappy,
  }
}

export function useInputPreset(): MotionProps {
  const { prefersReducedMotion } = useReducedMotion()
  if (prefersReducedMotion) return {}
  return {
    whileFocus: { scale: 1.01 },
    transition: SPRING.snappy,
  }
}

export function useSelectPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }
  }
  return {
    variants:   slideDown,
    initial:    'hidden',
    animate:    'visible',
    exit:       'exit',
    transition: SPRING.snappy,
  }
}

export function useDropdownPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }
  }
  return {
    variants:   combined,
    initial:    'hidden',
    animate:    'visible',
    exit:       'exit',
    transition: SPRING.snappy,
  }
}

export function useDrawerPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }
  }
  return {
    variants:   slideUp,
    initial:    'hidden',
    animate:    'visible',
    exit:       'exit',
    transition: SPRING.gentle,
  }
}

export function useDialogPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }
  }
  return {
    variants:   combined,
    initial:    'hidden',
    animate:    'visible',
    exit:       'exit',
    transition: SPRING.bouncy,
  }
}

export function useTooltipPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }
  }
  return {
    variants:   scaleUp,
    initial:    'hidden',
    animate:    'visible',
    exit:       'exit',
    transition: SPRING.snappy,
  }
}

export function usePopupPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }
  }
  return {
    variants:   popIn,
    initial:    'hidden',
    animate:    'visible',
    exit:       'exit',
    transition: SPRING.bouncy,
  }
}

export function useAvatarPreset(interactive: boolean = false): MotionProps {
  const { prefersReducedMotion } = useReducedMotion()
  if (prefersReducedMotion || !interactive) return {}
  return {
    whileHover: hoverScaleMedium,
    transition: TWEEN_OPACITY,
  }
}

export function useImagePreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   fade,
    initial:    'hidden',
    animate:    'visible',
    transition: SPRING.gentle,
  }
}

export function useIconPreset(): MotionProps {
  const { prefersReducedMotion } = useReducedMotion()
  if (prefersReducedMotion) return {}
  return {
    whileHover: hoverScaleLarge,
    transition: TWEEN_OPACITY,
  }
}

export function useStarPreset(index: number): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   popIn,
    initial:    'hidden',
    animate:    'visible',
    transition: { ...SPRING.bouncy, delay: index * (staggerConfig.fast.staggerChildren as number) } as Transition,
  }
}

export function useToastPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }
  }
  return {
    variants:   slideRight,
    initial:    'hidden',
    animate:    'visible',
    exit:       'exit',
    transition: SPRING.snappy,
  }
}

export function usePageSectionPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return {
      variants:    safeVariants,
      initial:     'hidden',
      whileInView: 'visible',
      viewport:    { ...viewport.once, ...threshold.eager },
    }
  }
  return {
    variants:    slideUp,
    initial:     'hidden',
    whileInView: 'visible',
    transition:  SPRING.gentle,
    viewport:    { ...viewport.once, ...threshold.eager },
  }
}

export function useProfileSectionPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   slideLeft,
    initial:    'hidden',
    animate:    'visible',
    transition: SPRING.gentle,
  }
}

export function useAvatarSectionPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   scaleUpLarge,
    initial:    'hidden',
    animate:    'visible',
    transition: SPRING.gentle,
  }
}

export function useSignUpSuccessPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   slideUpMedium,
    initial:    'hidden',
    animate:    'visible',
    transition: SPRING.gentle,
  }
}

export function useSignUpIconPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   spin,
    initial:    'hidden',
    animate:    'visible',
    transition: { ...SPRING.loose, delay: 0.3 } as Transition,
  }
}

export function useBookFiltersPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   slideUp,
    initial:    'hidden',
    animate:    'visible',
    transition: SPRING.snappy,
  }
}

export function useBookListPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return {
      variants:    safeVariants,
      initial:     'hidden',
      whileInView: 'visible',
      viewport:    { ...viewport.once, ...threshold.eager },
    }
  }
  return {
    variants:    fade,
    initial:     'hidden',
    whileInView: 'visible',
    transition:  SPRING.gentle,
    viewport:    { ...viewport.once, ...threshold.eager },
  }
}

export function useRatingsSectionPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return {
      variants:    safeVariants,
      initial:     'hidden',
      whileInView: 'visible',
      viewport:    { ...viewport.once, amount: 0.5 },
    }
  }
  return {
    variants:    slideUpInView,
    initial:     'hidden',
    whileInView: 'visible',
    transition:  SPRING.gentle,
    viewport:    { ...viewport.once, amount: 0.5 },
  }
}

export function useCommentsListPreset(): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   fade,
    initial:    'hidden',
    animate:    'visible',
    transition: TWEEN_OPACITY,
  }
}

export function useCommentItemPreset(index: number): MotionProps {
  const { prefersReducedMotion, safeVariants } = useReducedMotion()
  if (prefersReducedMotion) {
    return { variants: safeVariants, initial: 'hidden', animate: 'visible' }
  }
  return {
    variants:   slideUpSmall,
    initial:    'hidden',
    animate:    'visible',
    transition: { ...SPRING.gentle, delay: index * (staggerConfig.fast.staggerChildren as number) } as Transition,
  }
}
