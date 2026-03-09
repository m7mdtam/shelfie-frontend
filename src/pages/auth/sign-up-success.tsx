import { motion } from 'motion/react'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks'
import { useVerificationPolling, useEmailVerificationEnabled } from '@/hooks/pages/auth'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Loader, MailCheck } from 'lucide-react'
import { ROUTES } from '@/utils/api/routes'
import {
  useSignUpSuccessPreset,
  useSignUpIconPreset,
  slideUpSmall,
  fade,
  SPRING,
  TWEEN_OPACITY,
} from '@/lib/animations'

export function SignUpSuccessPage() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const emailVerificationEnabled = useEmailVerificationEnabled()
  const { isVerified } = useVerificationPolling()
  const successPreset = useSignUpSuccessPreset()
  const iconPreset = useSignUpIconPreset()

  useEffect(() => {
    if (!emailVerificationEnabled) {
      navigate({ to: ROUTES.SIGN_IN })
    }
  }, [emailVerificationEnabled, navigate])

  if (!emailVerificationEnabled) {
    return null
  }

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-4 py-8"
      data-mobile={isMobile}
    >
      <div className="w-full max-w-md">
        <motion.div {...successPreset}>
          <Card variant="elevated" className="w-full">
            <CardHeader className="text-center pt-8">
              <div className="flex justify-center mb-6">
                <motion.div {...iconPreset}>
                  {isVerified ? (
                    <CheckCircle2 className="w-16 h-16 text-state-success" />
                  ) : (
                    <MailCheck className="w-16 h-16 text-state-success" />
                  )}
                </motion.div>
              </div>
              <motion.div
                variants={slideUpSmall}
                initial="hidden"
                animate="visible"
                transition={{ ...SPRING.gentle, delay: 0.6 }}
              >
                <CardTitle>{isVerified ? 'Email Verified!' : 'Check your email'}</CardTitle>
              </motion.div>
              <motion.div
                variants={slideUpSmall}
                initial="hidden"
                animate="visible"
                transition={{ ...SPRING.gentle, delay: 0.8 }}
              >
                <CardDescription>
                  {isVerified
                    ? 'Your account is verified. Redirecting you to your shelf...'
                    : 'We sent a verification link to your email. Click it to verify your account.'}
                </CardDescription>
              </motion.div>
              {!isVerified && (
                <motion.div
                  variants={fade}
                  initial="hidden"
                  animate="visible"
                  transition={{ ...TWEEN_OPACITY, delay: 1.1 }}
                  className="flex items-center justify-center gap-2 mt-4 text-text-secondary text-sm"
                >
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Waiting for email verification...</span>
                </motion.div>
              )}
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
