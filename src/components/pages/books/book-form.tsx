import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Book } from '@/@types/book'
import { bookSchema, bookObjectSchema } from '@/schemas/book.ts'
import { uploadMedia } from '@/api/media/requests'
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
import { ImagePlus, X } from 'lucide-react'

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
}

export function BookForm({ mode, initialData, onSubmit, isLoading, genres }: BookFormProps) {
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialData?.coverImage?.url ?? null
  )
  const [coverImageId, setCoverImageId] = useState<string | null>(
    (initialData?.coverImage?.id as string) ?? null
  )
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
    setCoverImageId(null) // will be replaced after upload
  }

  const removeCover = () => {
    setCoverFile(null)
    setCoverPreview(null)
    setCoverImageId(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const form = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialData?.title || '',
      author: initialData?.author || '',
      genre: initialData?.genre || '',
      status: initialData?.status || 'want-to-read',
      isDownloadable: initialData?.isDownloadable ?? false,
      downloadLink: initialData?.downloadLink || '',
      rating: initialData?.rating || 0,
      description: initialData?.description || '',
      isPublic: initialData?.isPublic ?? false,
    },
  })

  const handleSubmit = async (data: any) => {
    const payload = { ...data }
    if (!payload.rating) delete payload.rating
    if (coverFile) {
      setIsUploading(true)
      try {
        const media = await uploadMedia(coverFile, data.title || 'Book cover')
        payload.coverImage = media.id
        setCoverImageId(media.id)
      } finally {
        setIsUploading(false)
      }
    } else if (coverImageId) {
      payload.coverImage = coverImageId
    } else if (mode === 'edit') {
      payload.coverImage = null
    }
    onSubmit(payload)
  }

  return (
    <Form {...form} schema={bookObjectSchema}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-primary">Cover Image</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {coverPreview ? (
            <div className="relative w-full h-40 rounded-md overflow-hidden group">
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-full object-contain"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={removeCover}
                className="absolute top-2 right-2 bg-background-base/80 rounded-full w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-text-primary" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-40 rounded-md border-dashed flex flex-col gap-2 text-text-secondary hover:border-accent-primary hover:text-accent-primary"
            >
              <ImagePlus className="w-7 h-7" />
              <span className="text-sm">Click to upload cover</span>
            </Button>
          )}
          {coverPreview && (
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-accent-primary p-0 h-auto justify-start"
            >
              Change image
            </Button>
          )}
        </div>

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
          name="isDownloadable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Downloadable</FormLabel>
              <Select
                value={field.value ? 'true' : 'false'}
                onValueChange={v => field.onChange(v === 'true')}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Is it downloadable?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="false">Not downloadable</SelectItem>
                  <SelectItem value="true">Downloadable</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('isDownloadable') && (
          <FormField
            control={form.control}
            name="downloadLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Download Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/book.pdf" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
          name="description"
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

        <Button type="submit" className="w-full" disabled={isLoading || isUploading}>
          {isUploading
            ? 'Uploading cover...'
            : isLoading
              ? 'Saving...'
              : mode === 'create'
                ? 'Add Book'
                : 'Update Book'}
        </Button>
      </form>
    </Form>
  )
}
