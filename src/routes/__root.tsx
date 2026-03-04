import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '@/components/common/navbar'

function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-10">
        <Outlet />
      </main>
    </>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
