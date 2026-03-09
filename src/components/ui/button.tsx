import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { ANIMATION_DURATION, EASING, INTERACTION_STATE } from '@/utils/animations'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-[var(--text-border)] bg-[var(--background-surface)] shadow-sm hover:bg-[var(--accent-background)] hover:text-[var(--text-primary)]',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost:
          'hover:bg-background-tertiary dark:hover:bg-accent-background hover:text-text-primary data-[state=open]:bg-background-tertiary dark:data-[state=open]:bg-accent-background',
        link: 'text-primary underline-offset-4 hover:underline',
        success: 'bg-[var(--btn-success)] text-white shadow hover:bg-[var(--btn-success-hover)]',
        error: 'bg-[var(--btn-error)] text-white shadow hover:bg-[var(--btn-error-hover)]',
        warning: 'bg-[var(--btn-warning)] text-white shadow hover:bg-[var(--btn-warning-hover)]',
        'primary-soft':
          'bg-[var(--accent-background)] text-[var(--accent-primary)] hover:bg-opacity-80',
        'secondary-soft':
          'bg-[var(--selection-background)] text-[var(--selection-foreground)] hover:bg-opacity-80',
      },
      size: {
        default: 'h-9 px-3 py-1.5 text-sm md:text-base',
        sm: 'h-8 rounded-md px-3 text-xs md:text-sm',
        lg: 'h-10 rounded-md px-8 text-base md:text-lg',
        icon: 'h-9 w-9 md:h-10 md:w-10',
        'icon-rounded': 'h-8 w-8 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, prefixIcon, suffixIcon, children, ...props },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {prefixIcon}
          {children}
          {suffixIcon}
        </Slot>
      )
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={INTERACTION_STATE.hoverScale}
        whileTap={INTERACTION_STATE.tapScaleSmall}
        transition={{
          duration: ANIMATION_DURATION.fast,
          ease: EASING.easeOut,
        }}
        {...(props as any)}
      >
        {prefixIcon}
        {children}
        {suffixIcon}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
