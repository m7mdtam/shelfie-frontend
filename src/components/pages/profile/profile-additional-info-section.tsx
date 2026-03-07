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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUpdateProfile } from '@/hooks/pages/profile'
import type { PayloadUser } from '@/@types/auth'

const additionalInfoSchema = z.object({
  sex: z.string().optional(),
  birthDate: z.string().optional(),
})

type AdditionalInfoFormData = z.infer<typeof additionalInfoSchema>

interface ProfileAdditionalInfoSectionProps {
  user: PayloadUser | undefined
}

export function ProfileAdditionalInfoSection({
  user,
}: ProfileAdditionalInfoSectionProps): React.ReactElement {
  const [isEditing, setIsEditing] = useState(false)
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile()

  // TODO: Replace with actual user data when available from backend
  const userAdditionalInfo = {
    sex: user?.sex,
    birthDate: user?.birthDate,
  }

  const form = useForm<AdditionalInfoFormData>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      sex: userAdditionalInfo.sex || '',
      birthDate: userAdditionalInfo.birthDate || '',
    },
  })

  const onSubmit = (data: AdditionalInfoFormData) => {
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
          <h2 className="text-lg font-semibold text-text-primary">Additional Information</h2>
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
            Edit
          </Button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
                Sex
              </p>
              <p className="text-sm text-text-primary">
                {userAdditionalInfo.sex || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
                Birth Date
              </p>
              <p className="text-sm text-text-primary">
                {userAdditionalInfo.birthDate || 'Not provided'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Additional Information</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sex (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your sex" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date (Optional)</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Select your birth date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
