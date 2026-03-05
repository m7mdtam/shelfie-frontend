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
import { useSignInForm } from '@/hooks/auth'
import { Loader } from 'lucide-react'
import { useState } from 'react'

export const SignInForm = () => {
  const { form, onSubmit, isPending } = useSignInForm()
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {form.formState.errors.root && (
          <div className="rounded-md p-4 border border-state-error bg-state-error-bg text-state-error">
            <p className="text-sm font-medium">{form.formState.errors.root.message}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-text-primary">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  autoComplete="email"
                  disabled={isPending}
                  className={`bg-background-base text-text-primary placeholder:text-text-secondary rounded-md transition-all duration-200 ${
                    emailFocused
                      ? 'border border-accent-primary ring-2 ring-accent-background'
                      : 'border-0'
                  }`}
                  {...field}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => {
                    field.onBlur()
                    setEmailFocused(false)
                  }}
                />
              </FormControl>
              <FormMessage className="text-state-error" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-text-primary">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  autoComplete="current-password"
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

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              Signing in...
            </div>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </Form>
  )
}
