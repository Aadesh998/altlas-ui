import { useEffect, useState } from 'react'
import { ChevronDown, Menu, Phone } from 'lucide-react'
import Logo from '@/components/Logo'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

interface MenuItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const MENU: MenuItem[] = [
  {
    label: 'Services',
    href: '#services',
    children: [
      { label: 'City Rides', href: '#services' },
      { label: 'Airport Transfers', href: '#services' },
      { label: 'Chauffeur Hire', href: '#services' },
      { label: 'Corporate Travel', href: '#services' },
    ],
  },
  {
    label: 'Our Fleet',
    href: '#fleet',
    children: [
      { label: 'Executive Sedans', href: '#fleet' },
      { label: 'Premium SUVs', href: '#fleet' },
      { label: 'Electric Cars', href: '#fleet' },
      { label: 'Prestige 4×4', href: '#fleet' },
    ],
  },
  {
    label: 'Cities',
    href: '#cities',
    children: [
      { label: 'New York', href: '#cities' },
      { label: 'London', href: '#cities' },
      { label: 'Dubai', href: '#cities' },
      { label: 'Singapore', href: '#cities' },
    ],
  },
  { label: 'Guides', href: '#guides' },
  {
    label: 'About AXLE',
    href: '#about',
    children: [
      { label: 'Our Story', href: '#about' },
      { label: 'How it Works', href: '#process' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'FAQs', href: '#footer' },
    ],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 text-neutral-900 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md' : 'bg-transparent text-white'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Logo className={scrolled ? 'text-[#2323d6]' : 'text-white'} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {MENU.map((item) => (
            <div key={item.label} className="group relative">
              <a
                href={item.href}
                className="flex items-center gap-1.5 py-8 text-[15px] font-normal tracking-wide opacity-95 transition-opacity hover:opacity-100"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:rotate-180" />}
              </a>
              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-0 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-xl bg-white py-2 text-neutral-800 shadow-xl ring-1 ring-black/5">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-5 py-2.5 text-[14px] transition-colors hover:bg-neutral-50 hover:text-[#2323d6]"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href="tel:+18005550199" className="flex items-center gap-2 text-[15px] opacity-95 transition-opacity hover:opacity-100">
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">+1 (800) 555-0199</span>
          </a>
          <a
            href="#book"
            className={`rounded-lg px-6 py-3 text-[15px] font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
              scrolled ? 'bg-[#2323d6] text-white' : 'bg-white text-neutral-900'
            }`}
          >
            Book Now
          </a>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden" aria-label="Open menu">
              <Menu className="h-7 w-7" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[85vw] max-w-[360px] overflow-y-auto bg-[#060650] px-6 py-8 text-white sm:px-8"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-8 flex flex-col gap-1">
              {MENU.map((item) => (
                <div key={item.label} className="border-b border-white/10 py-1 last:border-0">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 font-display text-lg tracking-wide"
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="mb-2 flex flex-col gap-0.5 pl-3">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="py-1.5 text-sm text-white/70"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-lg bg-white px-6 py-3.5 text-center font-medium text-neutral-900"
              >
                Book Now
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
