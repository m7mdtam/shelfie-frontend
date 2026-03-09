import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface BookDetailHeaderProps {
  onBack: () => void
}

export function BookDetailHeader({ onBack }: BookDetailHeaderProps) {
  return (
    <Button
      onClick={onBack}
      variant="outline"
      className="w-fit flex items-center gap-2"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  )
}
