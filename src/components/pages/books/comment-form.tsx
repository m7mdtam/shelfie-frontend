import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useCreateComment } from '@/hooks/pages/books/use-comments'
import { Send } from 'lucide-react'

interface CommentFormProps {
  bookId: string
  onSuccess?: () => void
}

export function CommentForm({ bookId, onSuccess }: CommentFormProps) {
  const [text, setText] = useState('')
  const createComment = useCreateComment(bookId)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    resize(e.target)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    try {
      await createComment.mutateAsync({ text: text.trim() })
      setText('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
      onSuccess?.()
    } catch {
      // Handle error silently
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-end gap-2 rounded-md border border-(--text-border) bg-background-base px-3 py-2 focus-within:ring-2 focus-within:ring-accent-primary transition-all duration-200">
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Add a comment..."
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none overflow-hidden bg-transparent text-sm text-text-primary placeholder:text-text-secondary outline-none min-h-0 py-0 leading-normal"
        />
        <Button
          type="submit"
          size="icon-rounded"
          disabled={!text.trim() || createComment.isPending}
          className="h-6 w-6 shrink-0"
        >
          <Send className="w-3 h-3" />
        </Button>
      </div>
    </form>
  )
}
