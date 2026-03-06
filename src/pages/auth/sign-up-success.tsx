import { motion } from 'motion/react'
import { useIsMobile } from '@/hooks'
import { useVerificationPolling } from '@/hooks/auth'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Loader, MailCheck } from 'lucide-react'

export function SignUpSuccessPage() {
  const isMobile = useIsMobile()
  const { isVerified } = useVerificationPolling()

  return (
    <div
      className="flex-1 bg-background-base flex flex-col items-center justify-center px-4 py-8"
      data-mobile={isMobile}
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Card variant="elevated" className="w-full">
            <CardHeader className="text-center pt-8">
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.9,
                    type: 'spring',
                    stiffness: 80,
                    damping: 12,
                  }}
                >
                  {isVerified ? (
                    <CheckCircle2 className="w-16 h-16 text-state-success" />
                  ) : (
                    <MailCheck className="w-16 h-16 text-state-success" />
                  )}
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <CardTitle>{isVerified ? 'Email Verified!' : 'Check your email'}</CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <CardDescription>
                  {isVerified
                    ? 'Your account is verified. Redirecting you to your shelf...'
                    : 'We sent a verification link to your email. Click it to verify your account.'}
                </CardDescription>
              </motion.div>
              {!isVerified && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
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
