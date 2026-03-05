import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/theme'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon-rounded"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="text-text-secondary hover:text-accent-primary"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
