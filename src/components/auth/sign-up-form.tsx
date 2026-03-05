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
import { useSignUpForm } from '@/hooks/auth'
import { Loader } from 'lucide-react'

export const SignUpForm = () => {
  const { form, onSubmit, isPending } = useSignUpForm()

  return (
    <Form {...form}>
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
              <FormItem className="flex flex-col">
                <FormLabel className="text-text-primary">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    autoComplete="given-name"
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-text-primary">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    autoComplete="family-name"
                    disabled={isPending}
                    {...field}
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
                  placeholder=""
                  type="password"
                  autoComplete="new-password"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-text-primary">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="password"
                  autoComplete="new-password"
                  disabled={isPending}
                  {...field}
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
