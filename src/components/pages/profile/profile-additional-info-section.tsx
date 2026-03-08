import { useState, useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { format, isValid, parse } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CalendarDays, PencilLine, Mars, Venus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { useUpdateProfile } from '@/hooks/pages/profile'
import type { PayloadUser } from '@/@types/auth'

const additionalInfoSchema = z.object({
  sex: z.string().optional(),
  birthDate: z.string().optional(),
})

type AdditionalInfoFormData = z.infer<typeof additionalInfoSchema>

interface ProfileAdditionalInfoSectionProps {
  user: PayloadUser | undefined
  isOwner?: boolean
}

function parseBirthDate(raw: string | undefined): Date | undefined {
  if (!raw?.trim()) return undefined
  const d = parse(raw.slice(0, 10), 'yyyy-MM-dd', new Date())
  return isValid(d) ? d : undefined
}

function SexIcon({ sex }: { sex?: string }) {
  if (sex === 'male') return <Mars className="h-4 w-4 shrink-0 text-accent-primary" />
  if (sex === 'female') return <Venus className="h-4 w-4 shrink-0 text-accent-primary" />
  return null
}

export function ProfileAdditionalInfoSection({
  user,
  isOwner = true,
}: ProfileAdditionalInfoSectionProps): React.ReactElement {
  const [isEditing, setIsEditing] = useState(false)
  const isMobile = useIsMobile()
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile()

  const form = useForm<AdditionalInfoFormData>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      sex: user?.sex || '',
      birthDate: user?.birthDate?.slice(0, 10) || '',
    },
  })

  useEffect(() => {
    form.reset({
      sex: user?.sex || '',
      birthDate: user?.birthDate?.slice(0, 10) || '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const onSubmit = (data: AdditionalInfoFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }

  const birthDateDisplay = parseBirthDate(user?.birthDate)

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Additional Information</h2>
          {isOwner && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <PencilLine className="w-4 h-4" />
              {!isMobile && 'Edit'}
            </Button>
          )}
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
                Sex
              </p>
              {user?.sex ? (
                <p className="flex items-center gap-2 text-sm text-text-primary capitalize">
                  <SexIcon sex={user.sex} />
                  {user.sex}
                </p>
              ) : (
                <p className="text-sm text-text-primary">Not provided</p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
                Birth Date
              </p>
              {birthDateDisplay ? (
                <p className="flex items-center gap-2 text-sm text-text-primary">
                  <CalendarDays className="h-4 w-4 shrink-0 text-accent-primary" />
                  {format(birthDateDisplay, 'MMM dd, yyyy')}
                </p>
              ) : (
                <p className="text-sm text-text-primary">Not provided</p>
              )}
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your sex" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">
                      <div className="flex items-center gap-2">
                        <Mars className="h-4 w-4 text-accent-primary" />
                        Male
                      </div>
                    </SelectItem>
                    <SelectItem value="female">
                      <div className="flex items-center gap-2">
                        <Venus className="h-4 w-4 text-accent-primary" />
                        Female
                      </div>
                    </SelectItem>
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
                  <DatePicker
                    date={parseBirthDate(field.value)}
                    onDateChange={date => {
                      field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                    }}
                    placeholder="Pick a birth date"
                  />
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
