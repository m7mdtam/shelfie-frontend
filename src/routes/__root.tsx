import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '@/components/common/navbar'

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
