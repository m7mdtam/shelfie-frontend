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
import { signInSchema } from '@/schemas'
import { Loader } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const SignInForm = () => {
  const { form, onSubmit, isPending } = useSignInForm()

  return (
    <Form {...form} schema={signInSchema}>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {form.formState.errors.root && (
          <div className="rounded-md p-4 border border-state-error bg-state-error-bg text-state-error">
            <p className="text-sm font-medium">{form.formState.errors.root.message}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-text-primary">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  autoComplete="email"
                  disabled={isPending}
                  {...field}
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
            <FormItem className="flex flex-col">
              <FormLabel className="text-text-primary">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  autoComplete="current-password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-state-error" />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-accent-primary text-sm font-medium hover:text-accent-primary-hover transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full mt-4" disabled={isPending}>
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
