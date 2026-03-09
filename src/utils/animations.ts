export const ANIMATION_DURATION = {
  veryFast: 0.2,
  fast: 0.3,
  midFast: 0.4,
  normal: 0.5,
  midSlow: 0.6,
  slow: 0.8,
  verySlow: 1.2,
}

export const EASING = {
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  smooth: 'ease-in-out',
}

export const ANIMATION_STATE = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideUpSmall: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
  slideUpMedium: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  slideLeftSmall: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleUpLarge: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  },
  popIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  combined: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  spin: {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0 },
  },
}

export const layoutTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

export const INTERACTION_STATE = {
  hoverSlide: { x: 4 },
  hoverSlideUp: { y: -4 },
  hoverScale: { scale: 1.02 },
  hoverScaleMedium: { scale: 1.05 },
  hoverScaleLarge: { scale: 1.1 },
  tapScale: { scale: 0.95 },
  tapScaleSmall: { scale: 0.98 },
}
