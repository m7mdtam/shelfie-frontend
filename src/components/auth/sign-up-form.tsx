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
import { useSignUpForm } from '@/hooks/pages/auth'
import { signUpObjectSchema } from '@/schemas'
import { Loader } from 'lucide-react'
import { useState } from 'react'

export const SignUpForm = () => {
  const { form, onSubmit, isPending } = useSignUpForm()
  const [firstNameFocused, setFirstNameFocused] = useState(false)
  const [lastNameFocused, setLastNameFocused] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false)

  return (
    <Form {...form} schema={signUpObjectSchema}>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {form.formState.errors.root && (
          <div className="rounded-md p-4 border border-state-error bg-state-error-bg text-state-error">
            <p className="text-sm font-medium">{form.formState.errors.root.message}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex flex-col ">
                <FormLabel className="text-text-primary">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    autoComplete="given-name"
                    disabled={isPending}
                    className={`bg-background-base text-text-primary placeholder:text-text-secondary rounded-md transition-all duration-200 ${
                      firstNameFocused
                        ? 'border border-accent-primary ring-2 ring-accent-background'
                        : 'border-0'
                    }`}
                    {...field}
                    onFocus={() => setFirstNameFocused(true)}
                    onBlur={() => {
                      field.onBlur()
                      setFirstNameFocused(false)
                    }}
                  />
                </FormControl>
                <FormMessage className="text-state-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex flex-col ">
                <FormLabel className="text-text-primary">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    autoComplete="family-name"
                    disabled={isPending}
                    className={`bg-background-base text-text-primary placeholder:text-text-secondary rounded-md transition-all duration-200 ${
                      lastNameFocused
                        ? 'border border-accent-primary ring-2 ring-accent-background'
                        : 'border-0'
                    }`}
                    {...field}
                    onFocus={() => setLastNameFocused(true)}
                    onBlur={() => {
                      field.onBlur()
                      setLastNameFocused(false)
                    }}
                  />
                </FormControl>
                <FormMessage className="text-state-error" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
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
            <FormItem className="flex flex-col ">
              <FormLabel className="text-text-primary">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
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
            <FormItem className="flex flex-col ">
              <FormLabel className="text-text-primary">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm your password"
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

        <Button type="submit" className="w-full mt-4 " disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              Creating account...
            </div>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </Form>
  )
}
