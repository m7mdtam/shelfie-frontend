import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSignInForm } from '@/hooks/auth'

export const SignInForm = () => {
  const { form, onSubmit, isPending } = useSignInForm()

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {form.formState.errors.root && (
          <div className="rounded-md bg-red-50 p-4" style={{ backgroundColor: 'var(--state-error-bg)', color: 'var(--state-error)' }}>
            <p className="text-sm font-medium">
              {form.formState.errors.root.message}
            </p>
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </Form>
  )
}
