import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:h-10 md:text-base',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, type, prefixIcon, suffixIcon, ...props }, ref) => {
    return (
      <div className="relative w-full flex items-center">
        {prefixIcon && (
          <div className="absolute left-2.5 md:left-3 flex items-center justify-center text-[var(--text-secondary)] pointer-events-none [&_svg]:size-3 md:[&_svg]:size-4">
            {prefixIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:h-10 md:text-base',
            prefixIcon && 'pl-8 md:pl-9',
            suffixIcon && 'pr-8 md:pr-9',
            className
          )}
          ref={ref}
          {...props}
        />
        {suffixIcon && (
          <div className="absolute right-2.5 md:right-3 flex items-center justify-center text-[var(--text-secondary)] pointer-events-none [&_svg]:size-3 md:[&_svg]:size-4">
            {suffixIcon}
          </div>
        )}
      </div>
    )
  }
)
InputWithIcon.displayName = 'InputWithIcon'

export { Input, InputWithIcon }
