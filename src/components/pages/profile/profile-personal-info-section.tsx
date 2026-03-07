import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUpdateProfile } from '@/hooks/pages/profile'
import type { PayloadUser } from '@/@types/auth'

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

interface ProfilePersonalInfoSectionProps {
  user: PayloadUser | undefined
}

export function ProfilePersonalInfoSection({ user }: ProfilePersonalInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile()

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  })

  const onSubmit = (data: PersonalInfoFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Personal Information</h2>
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
            Edit
          </Button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
                First Name
              </p>
              <p className="text-sm text-text-primary">{user?.firstName || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
                Last Name
              </p>
              <p className="text-sm text-text-primary">{user?.lastName || 'Not provided'}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
              Email
            </p>
            <p className="text-sm text-text-primary">{user?.email}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Personal Information</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
              Email
            </p>
            <p className="text-sm text-text-primary">{user?.email}</p>
            <p className="text-xs text-text-secondary mt-1">Email cannot be changed</p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSaving} variant="default" className="flex-1">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsEditing(false)
                form.reset()
              }}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
