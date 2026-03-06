import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Book } from '@/@types/book'
import { bookSchema } from '@/schemas/book.ts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formatLabel = (value: string) =>
  value
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

interface BookFormProps {
  mode: 'create' | 'edit'
  initialData?: Partial<Book>
  onSubmit: (data: any) => void
  isLoading?: boolean
  genres: string[]
  statuses: string[]
}

export function BookForm({
  mode,
  initialData,
  onSubmit,
  isLoading,
  genres,
  statuses,
}: BookFormProps) {
  const form = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialData?.title || '',
      author: initialData?.author || '',
      genre: initialData?.genre || '',
      status: initialData?.status || 'want-to-read',
      rating: initialData?.rating || 0,
      notes: initialData?.notes || '',
      isPublic: initialData?.isPublic ?? false,
    },
  })

  const handleSubmit = (data: any) => {
    const payload = { ...data }
    if (!payload.rating) delete payload.rating
    onSubmit(payload)
  }

  return (
    <Form {...form} schema={bookSchema}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select value={field.value || ''} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genres.map(g => (
                      <SelectItem key={g} value={g}>
                        {formatLabel(g)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select value={field.value || ''} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map(s => (
                      <SelectItem key={s} value={s}>
                        {formatLabel(s)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating (0-5)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  step="1"
                  placeholder="0"
                  {...field}
                  value={field.value === 0 ? '' : field.value}
                  onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <Select
                value={field.value ? 'public' : 'private'}
                onValueChange={e => field.onChange(e === 'public')}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public (visible to all users)</SelectItem>
                  <SelectItem value="private">Private (only in your shelf)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your thoughts about this book..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : mode === 'create' ? 'Add Book' : 'Update Book'}
        </Button>
      </form>
    </Form>
  )
}
