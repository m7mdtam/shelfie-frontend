import * as React from 'react'
import { cn } from '@/lib/utils'

const PageSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'compact'
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-md bg-background-surface text-text-primary md:rounded-lg',
      variant === 'default' && 'p-4 md:p-6',
      variant === 'compact' && 'p-3 md:p-4',
      className
    )}
    {...props}
  />
))
PageSection.displayName = 'PageSection'

const PageSectionHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1 mb-3', className)} {...props} />
  )
)
PageSectionHeader.displayName = 'PageSectionHeader'

const PageSectionTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight md:text-xl', className)}
      {...props}
    />
  )
)
PageSectionTitle.displayName = 'PageSectionTitle'

const PageSectionDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm text-text-secondary md:text-base', className)} {...props} />
))
PageSectionDescription.displayName = 'PageSectionDescription'

const PageSectionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-4', className)} {...props} />
  )
)
PageSectionContent.displayName = 'PageSectionContent'

const PageSectionFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-2 items-center mt-6 md:flex-row md:justify-between',
        className
      )}
      {...props}
    />
  )
)
PageSectionFooter.displayName = 'PageSectionFooter'

export {
  PageSection,
  PageSectionHeader,
  PageSectionFooter,
  PageSectionTitle,
  PageSectionDescription,
  PageSectionContent,
}
