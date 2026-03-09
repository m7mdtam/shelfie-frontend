import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useResetPasswordForm } from '@/hooks/pages/auth'
import { Loader } from 'lucide-react'

export const ResetPasswordForm = () => {
  const { form, onSubmit, isPending } = useResetPasswordForm()
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false)

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {form.formState.errors.root && (
          <div className="rounded-md p-4 border border-state-error bg-state-error-bg text-state-error">
            <p className="text-sm font-medium">{form.formState.errors.root.message}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-text-primary">New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your new password"
                  type="password"
                  autoComplete="new-password"
                  disabled={isPending}
                  className={`bg-background-base text-text-primary placeholder:text-text-secondary rounded-md transition-all duration-200 ${
                    passwordFocused
                      ? 'border border-accent-primary ring-2 ring-accent-background'
                      : 'border-0'
                  }`}
                  {...field}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => {
                    field.onBlur()
                    setPasswordFocused(false)
                  }}
                />
              </FormControl>
              <FormMessage className="text-state-error" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-text-primary">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm your new password"
                  type="password"
                  autoComplete="new-password"
                  disabled={isPending}
                  className={`bg-background-base text-text-primary placeholder:text-text-secondary rounded-md transition-all duration-200 ${
                    confirmPasswordFocused
                      ? 'border border-accent-primary ring-2 ring-accent-background'
                      : 'border-0'
                  }`}
                  {...field}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => {
                    field.onBlur()
                    setConfirmPasswordFocused(false)
                  }}
                />
              </FormControl>
              <FormMessage className="text-state-error" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              Resetting...
            </div>
          ) : (
            'Reset password'
          )}
        </Button>
      </form>
    </Form>
  )
}
