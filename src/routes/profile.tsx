import { createFileRoute, Outlet } from '@tanstack/react-router'

function ProfileLayout() {
  return <Outlet />
}

export const Route = createFileRoute('/profile')({
  component: ProfileLayout,
})
