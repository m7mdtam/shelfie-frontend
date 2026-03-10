import * as React from 'react'
import { format, isValid, setMonth, setYear } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const MONTHS = [
  { label: 'January', short: 'Jan' },
  { label: 'February', short: 'Feb' },
  { label: 'March', short: 'Mar' },
  { label: 'April', short: 'Apr' },
  { label: 'May', short: 'May' },
  { label: 'June', short: 'Jun' },
  { label: 'July', short: 'Jul' },
  { label: 'August', short: 'Aug' },
  { label: 'September', short: 'Sep' },
  { label: 'October', short: 'Oct' },
  { label: 'November', short: 'Nov' },
  { label: 'December', short: 'Dec' },
]

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  fromYear?: number
  toYear?: number
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = 'Pick a date',
  disabled = false,
  fromYear = 1920,
  toYear = new Date().getFullYear(),
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const validDate = date && isValid(date) ? date : undefined

  const [viewMonth, setViewMonth] = React.useState<Date>(validDate ?? new Date(toYear, 11))

  React.useEffect(() => {
    if (validDate) setViewMonth(validDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validDate?.getTime()])

  const years = React.useMemo(() => {
    const result: number[] = []
    for (let y = toYear; y >= fromYear; y--) result.push(y)
    return result
  }, [fromYear, toYear])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex h-9 w-full items-center rounded-md bg-background-base px-3 py-1.5 text-sm transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary',
            'disabled:cursor-not-allowed disabled:opacity-50 md:h-10 md:text-base',
            validDate ? 'text-text-primary' : 'text-text-secondary'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-accent-primary" />
          {validDate ? format(validDate, 'MMM dd, yyyy') : placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[min(18rem,calc(100vw-2rem))] p-0 border-text-border overflow-y-auto"
        align="start"
        collisionPadding={16}
        style={{ maxHeight: 'var(--radix-popover-content-available-height)' }}
      >
        <div className="flex gap-2 p-3 pb-0">
          <Select
            value={String(viewMonth.getMonth())}
            onValueChange={val => setViewMonth(prev => setMonth(prev, Number(val)))}
          >
            <SelectTrigger className="h-8 text-xs flex-1 min-w-0 bg-background-surface">
              <SelectValue>{MONTHS[viewMonth.getMonth()].short}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-40 overflow-y-auto bg-background-surface">
              {MONTHS.map((m, i) => (
                <SelectItem key={m.label} value={String(i)} className="text-xs">
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(viewMonth.getFullYear())}
            onValueChange={val => setViewMonth(prev => setYear(prev, Number(val)))}
          >
            <SelectTrigger className="h-8 text-xs w-18 shrink-0 bg-background-surface">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-40 overflow-y-auto bg-background-surface">
              {years.map(y => (
                <SelectItem key={y} value={String(y)} className="text-xs">
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          className="w-full"
          mode="single"
          selected={validDate}
          month={viewMonth}
          onMonthChange={setViewMonth}
          onSelect={selectedDate => {
            onDateChange?.(selectedDate)
            setOpen(false)
          }}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
}
