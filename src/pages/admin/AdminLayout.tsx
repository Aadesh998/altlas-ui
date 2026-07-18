import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import {
  CalendarCheck2,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  MessageSquareText,
  Package,
  Quote,
  Sparkles,
} from 'lucide-react'
import { useAdminAuth } from '@/lib/adminAuth'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

const NAV = [
  { label: 'Overview', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Bookings', to: '/admin/bookings', icon: CalendarCheck2 },
  { label: 'Custom requests', to: '/admin/requests', icon: MessageSquareText },
  { label: 'Tour packages', to: '/admin/tour-packages', icon: Package },
  { label: 'Service packages', to: '/admin/service-packages', icon: Package },
  { label: 'Service categories', to: '/admin/service-categories', icon: Package },
  { label: 'Destinations', to: '/admin/destinations', icon: MapPin },
  { label: 'Site images', to: '/admin/images', icon: ImageIcon },
  { label: 'Hero copy', to: '/admin/hero', icon: Sparkles },
  { label: 'Homepage sections', to: '/admin/homepage', icon: Sparkles },
  { label: 'FAQs', to: '/admin/faqs', icon: MessageSquareText },
  { label: 'Testimonials', to: '/admin/testimonials', icon: Quote },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-2.5 text-[14.5px] font-medium transition-colors ${
              isActive ? 'bg-[#2323d6] text-white' : 'text-neutral-600 hover:bg-neutral-100'
            }`
          }
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function AdminLayout() {
  const { isAdmin, ready, logout } = useAdminAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (ready && !isAdmin) navigate('/admin/login')
  }, [ready, isAdmin, navigate])

  if (!ready || !isAdmin) return null

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="rounded-md p-1.5 hover:bg-neutral-100 lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-white p-4">
              <SheetTitle className="mb-4 font-display text-[1.2rem] font-medium text-[#060650]">
                AXLE Admin
              </SheetTitle>
              <NavLinks onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="font-display text-[1.15rem] font-medium text-[#060650]">AXLE Admin</span>
        </div>
        <button
          onClick={() => {
            logout()
            navigate('/admin/login')
          }}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13.5px] font-medium text-neutral-600 hover:bg-neutral-100"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-60 shrink-0 border-r border-neutral-200 px-4 py-6 lg:block">
          <NavLinks />
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
