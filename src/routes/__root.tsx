import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '@/components/common/navbar'
import DotGrid from '@/components/DotGrid'

function RootLayout() {
  return (
    <div className="relative min-h-screen bg-background-base">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotGrid
          dotSize={8}
          gap={40}
          baseColor="#9B8B7E"
          activeColor="#C9A876"
          proximity={120}
          speedTrigger={80}
          shockRadius={200}
          shockStrength={3}
          maxSpeed={3000}
          resistance={600}
          returnDuration={1.5}
          style={{ height: '100vh', width: '100%' }}
        />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main className="pt-10 flex flex-col min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
