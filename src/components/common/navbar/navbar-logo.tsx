import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { ANIMATION_DURATION, ANIMATION_STATE, EASING, INTERACTION_STATE } from '@/utils/animations'
import logo from '@/assets/svg/logo.svg?url'

interface NavbarLogoProps {
  scrolled: boolean
}

export function NavbarLogo({ scrolled }: NavbarLogoProps) {
  return (
    <motion.div
      initial={ANIMATION_STATE.scaleDown.hidden}
      animate={ANIMATION_STATE.scaleDown.visible}
      transition={{
        duration: ANIMATION_DURATION.slow,
        ease: EASING.easeOut as any,
        type: 'spring',
        stiffness: 100,
      }}
    >
      <Link to="/" className="flex items-center no-underline hover:no-underline">
        <motion.img
          src={logo}
          alt="Shelfie"
          className={cn(
            'transition-all duration-300',
            scrolled ? 'h-7 w-auto lg:h-6 scale-[1.55]' : 'h-8 w-auto lg:h-7 scale-[1.55]'
          )}
          whileHover={INTERACTION_STATE.hoverScaleLarge}
          transition={{ duration: ANIMATION_DURATION.fast }}
        />
      </Link>
    </motion.div>
  )
}
