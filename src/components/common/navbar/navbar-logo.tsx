import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useNavbarLogoPreset, hoverScaleLarge, SPRING } from '@/lib/animations'

interface NavbarLogoProps {
  scrolled: boolean
}

export function NavbarLogo({ scrolled }: NavbarLogoProps) {
  const logoPreset = useNavbarLogoPreset()
  return (
    <motion.div {...logoPreset}>
      <Link to="/" className="flex items-center no-underline hover:no-underline">
        <motion.img
          src="/logo.svg"
          alt="Shelfie"
          className={cn(
            'transition-all duration-300',
            scrolled ? 'h-7 w-auto lg:h-6 scale-[1.55]' : 'h-8 w-auto lg:h-7 scale-[1.55]'
          )}
          whileHover={hoverScaleLarge}
          transition={SPRING.snappy}
        />
      </Link>
    </motion.div>
  )
}
