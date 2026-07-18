import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ChevronDown, LogOut, Menu, User } from 'lucide-react'
import Logo from '@/components/Logo'
import SmartLink from '@/components/SmartLink'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth'
import { useImageOverrides, resolveImage } from '@/lib/imageOverrides'
import { destinationsStore } from '@/lib/destinationsStore'
import { serviceCategoriesStore } from '@/lib/serviceCategoriesStore'
import { useLocalStore } from '@/lib/dataStore'

interface MenuItem {
  label: string
  href: string
  children?: { label: string; href: string; image?: string; imageKey?: string }[]
}

const STATIC_MENU: MenuItem[] = [
  { label: 'Guides', href: '/guides' },
  {
    label: 'About AXLE',
    href: '#about',
    children: [
      { label: 'Our Story', href: '#about' },
      { label: 'How it Works', href: '#process' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'FAQs', href: '#faqs' },
    ],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { overrides } = useImageOverrides()
  const { items: DESTINATIONS } = useLocalStore(destinationsStore)
  const { items: SERVICE_CATEGORIES } = useLocalStore(serviceCategoriesStore)
  const navigate = useNavigate()

  const MENU: MenuItem[] = [
    {
      label: 'Services',
      href: '#services',
      children: SERVICE_CATEGORIES.map((c) => ({ label: c.title, href: `/services/${c.slug}` })),
    },
    {
      label: 'Tours',
      href: '/tours',
      children: [
        ...DESTINATIONS.slice(0, 4).map((d) => ({
          label: d.name,
          href: `/tours/${d.slug}`,
          image: d.images[0],
          imageKey: `destination.${d.slug}.0`,
        })),
        { label: 'All destinations', href: '/tours' },
      ],
    },
    ...STATIC_MENU,
  ]

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
              <SmartLink
                href={item.href}
                className="flex items-center gap-1.5 py-8 text-[15px] font-normal tracking-wide opacity-95 transition-opacity hover:opacity-100"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:rotate-180" />}
              </SmartLink>
              {item.children && (
                <div
                  className={`invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-0 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 ${
                    item.children.some((c) => c.image) ? 'w-64' : 'w-56'
                  }`}
                >
                  <div className="overflow-hidden rounded-xl bg-white py-2 text-neutral-800 shadow-xl ring-1 ring-black/5">
                    {item.children.map((child) => (
                      <SmartLink
                        key={child.label}
                        href={child.href}
                        className="flex items-center gap-3 px-4 py-2 text-[14px] transition-colors hover:bg-neutral-50 hover:text-[#2323d6]"
                      >
                        {child.image && (
                          <img
                            src={resolveImage(overrides, child.imageKey ?? '', child.image)}
                            alt=""
                            className="h-9 w-9 shrink-0 rounded-lg object-cover"
                          />
                        )}
                        {child.label}
                      </SmartLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-[15px] opacity-95 transition-opacity hover:opacity-100">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-current/10 text-[13px] font-semibold ring-1 ring-current/25">
                    {user.name.slice(0, 1).toUpperCase()}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={14}
                className="w-52 overflow-hidden rounded-xl border-none bg-white p-0 py-2 text-neutral-800 shadow-xl ring-1 ring-black/5"
              >
                <DropdownMenuItem
                  onClick={() => navigate('/profile')}
                  className="rounded-none px-5 py-2.5 text-[14px] font-normal text-neutral-800 focus:bg-neutral-50 focus:text-[#2323d6] [&_svg]:text-neutral-400 [&_svg]:opacity-100 focus:[&_svg]:text-[#2323d6]"
                >
                  <User className="h-4 w-4" />
                  My profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  className="rounded-none px-5 py-2.5 text-[14px] font-normal text-neutral-800 focus:bg-neutral-50 focus:text-[#2323d6] [&_svg]:text-neutral-400 [&_svg]:opacity-100 focus:[&_svg]:text-[#2323d6]"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SmartLink href="/login" className="text-[15px] opacity-95 transition-opacity hover:opacity-100">
              Sign in
            </SmartLink>
          )}

          <SmartLink
            href="#book"
            className={`rounded-lg px-6 py-3 text-[15px] font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
              scrolled ? 'bg-[#2323d6] text-white' : 'bg-white text-neutral-900'
            }`}
          >
            Book Now
          </SmartLink>
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
                  <SmartLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 font-display text-lg tracking-wide"
                  >
                    {item.label}
                  </SmartLink>
                  {item.children && (
                    <div className="mb-2 flex flex-col gap-0.5 pl-3">
                      {item.children.map((child) => (
                        <SmartLink
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2.5 py-1.5 text-sm text-white/70"
                        >
                          {child.image && (
                            <img
                              src={resolveImage(overrides, child.imageKey ?? '', child.image)}
                              alt=""
                              className="h-7 w-7 shrink-0 rounded-md object-cover"
                            />
                          )}
                          {child.label}
                        </SmartLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <SmartLink
                href="#book"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-lg bg-white px-6 py-3.5 text-center font-medium text-neutral-900"
              >
                Book Now
              </SmartLink>

              <div className="mt-2 border-t border-white/10 pt-4">
                {user ? (
                  <>
                    <SmartLink
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 py-2 text-[15px] text-white/85"
                    >
                      <User className="h-4 w-4" />
                      My profile
                    </SmartLink>
                    <button
                      onClick={() => {
                        logout()
                        setOpen(false)
                        navigate('/')
                      }}
                      className="flex items-center gap-2 py-2 text-[15px] text-white/85"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </>
                ) : (
                  <SmartLink
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2 text-[15px] text-white/85"
                  >
                    <User className="h-4 w-4" />
                    Sign in
                  </SmartLink>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
