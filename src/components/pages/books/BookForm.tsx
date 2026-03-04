import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState } from 'react'
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
import { uploadMedia } from '@/api/media/requests'
import { BookOpen, Upload, X } from 'lucide-react'

const formatLabel = (value: string) =>
  value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string>(initialData?.coverImage?.url || '')
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialData?.title || '',
      author: initialData?.author || '',
      genre: initialData?.genre || '',
      status: initialData?.status || 'want-to-read',
      rating: initialData?.rating || 0,
      notes: initialData?.notes || '',
      isPublic: initialData?.isPublic || false,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const removeCover = () => {
    setCoverFile(null)
    setCoverPreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (data: any) => {
    let coverImageId: string | undefined = initialData?.coverImage?.id

    if (coverFile) {
      setIsUploading(true)
      try {
        const media = await uploadMedia(coverFile, data.title || coverFile.name)
        coverImageId = media.id
      } finally {
        setIsUploading(false)
      }
    }

    onSubmit({ ...data, ...(coverImageId !== undefined && { coverImage: coverImageId }) })
  }

  const busy = isLoading || isUploading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Cover Image</label>
          <div className="mt-2">
            {coverPreview ? (
              <div className="relative w-full h-40 rounded-lg overflow-hidden group">
                <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeCover}
                  className="absolute top-2 right-2 bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-40 border-2 border-dashed border-input rounded-lg flex flex-col items-center justify-center gap-2 text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors"
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm">Click to upload cover</span>
              </button>
            )}
            {coverPreview && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-xs text-accent-primary hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3 h-3" /> Change image
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
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
              <FormLabel>Author *</FormLabel>
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
                  onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}
                />
              </FormControl>
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

        <Button type="submit" className="w-full" disabled={busy}>
          {isUploading ? 'Uploading cover...' : busy ? 'Saving...' : mode === 'create' ? 'Add Book' : 'Update Book'}
        </Button>
      </form>
    </Form>
  )
}
