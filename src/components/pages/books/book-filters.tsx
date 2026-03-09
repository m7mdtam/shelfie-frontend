import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { motion } from 'motion/react'
import { ANIMATION_DURATION } from '@/utils/animations'

const formatLabel = (value: string) =>
  value
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

interface BookFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  genre?: string
  onGenreChange: (value: string) => void
  downloadable?: string
  onDownloadableChange: (value: string) => void
  genres: string[]
}

export function BookFilters({
  search,
  onSearchChange,
  genre,
  onGenreChange,
  downloadable,
  onDownloadableChange,
  genres,
}: BookFiltersProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-end gap-3 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATION.midFast }}
    >
      <div className="flex-1">
        <Label className="text-text-secondary mb-2">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-secondary" />
          <Input
            placeholder="Search by title or author..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="w-full md:w-48">
        <Label className="text-text-secondary mb-2">Genre</Label>
        <Select value={genre || 'all'} onValueChange={v => onGenreChange(v === 'all' ? '' : v)}>
          <SelectTrigger>
            <SelectValue placeholder="All genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All genres</SelectItem>
            {genres.map(g => (
              <SelectItem key={g} value={g}>
                {formatLabel(g)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-48">
        <Label className="text-text-secondary mb-2">Availability</Label>
        <Select
          value={downloadable || 'all'}
          onValueChange={v => onDownloadableChange(v === 'all' ? '' : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All books" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All books</SelectItem>
            <SelectItem value="true">Downloadable</SelectItem>
            <SelectItem value="false">Not downloadable</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}
