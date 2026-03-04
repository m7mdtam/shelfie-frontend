import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '@/components/common/navbar'

function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-10 flex flex-col min-h-screen">
        <Outlet />
      </main>
    </>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
