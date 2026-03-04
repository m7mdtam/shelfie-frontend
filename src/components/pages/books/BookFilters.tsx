import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

const formatLabel = (value: string) =>
  value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

interface BookFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  genre?: string
  onGenreChange: (value: string) => void
  status?: string
  onStatusChange: (value: string) => void
  genres: string[]
  statuses: string[]
}

export function BookFilters({
  search,
  onSearchChange,
  genre,
  onGenreChange,
  status,
  onStatusChange,
  genres,
  statuses,
}: BookFiltersProps) {
  return (
    <div className="space-y-4 md:space-y-0 md:flex md:gap-3 md:items-end mb-6">
      <div className="flex-1">
        <label className="text-sm text-text-secondary block mb-2">Search</label>
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
        <label className="text-sm text-text-secondary block mb-2">Genre</label>
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
        <label className="text-sm text-text-secondary block mb-2">Status</label>
        <Select value={status || 'all'} onValueChange={v => onStatusChange(v === 'all' ? '' : v)}>
          <SelectTrigger>
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statuses.map(s => (
              <SelectItem key={s} value={s}>
                {formatLabel(s)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
