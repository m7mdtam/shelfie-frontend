import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface DeleteBookDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookTitle: string
  onConfirm: () => void
  isLoading?: boolean
}

export function DeleteBookDialog({
  open,
  onOpenChange,
  bookTitle,
  onConfirm,
  isLoading,
}: DeleteBookDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-state-error flex-shrink-0 mt-0.5" />
            <div>
              <DialogTitle className="text-state-error">Delete Book</DialogTitle>
              <DialogDescription className="mt-2">
                Are you sure you want to delete "{bookTitle}"? This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
