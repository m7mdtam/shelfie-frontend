import { useState } from 'react'
import { useCreateBook, useUpdateBook, useDeleteBook } from '@/api/books'
import { Book } from '@/@types/book'

interface UseBookFormProps {
  onSuccess?: () => void
}

export function useBookForm(props: UseBookFormProps = {}) {
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const createMutation = useCreateBook({
    onSuccess: () => {
      setFormOpen(false)
      setMode('create')
      setSelectedBook(null)
      props.onSuccess?.()
    },
  })

  const updateMutation = useUpdateBook(selectedBook?.id || '', {
    onSuccess: () => {
      setFormOpen(false)
      setMode('create')
      setSelectedBook(null)
      props.onSuccess?.()
    },
  })

  const deleteMutation = useDeleteBook({
    onSuccess: () => {
      setDeleteDialogOpen(false)
      setSelectedBook(null)
      props.onSuccess?.()
    },
  })

  return {
    mode,
    selectedBook,
    formOpen,
    setFormOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    openCreate: () => {
      setMode('create')
      setSelectedBook(null)
      setFormOpen(true)
    },
    openEdit: (book: Book) => {
      setMode('edit')
      setSelectedBook(book)
      setFormOpen(true)
    },
    submitForm: (data: any) => {
      if (mode === 'create') {
        createMutation.mutate(data)
      } else if (mode === 'edit' && selectedBook) {
        updateMutation.mutate(data)
      }
    },
    openDelete: (book: Book) => {
      setSelectedBook(book)
      setDeleteDialogOpen(true)
    },
    confirmDelete: () => {
      if (selectedBook) {
        deleteMutation.mutate(selectedBook.id)
      }
    },
  }
}
