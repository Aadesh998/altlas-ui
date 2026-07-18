import { ArrowUpRight, Facebook, Instagram, Twitter } from 'lucide-react'
import Logo from '@/components/Logo'
import SmartLink from '@/components/SmartLink'
import { serviceCategoriesStore } from '@/lib/serviceCategoriesStore'
import { useLocalStore } from '@/lib/dataStore'

const COMPANY_LINKS = [
  { label: 'About AXLE', href: '#about' },
  { label: 'How it works', href: '#process' },
  { label: 'Tours & Packages', href: '/tours' },
  { label: 'Guides', href: '/guides' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'T&Cs', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
]

export default function Footer() {
  const { items: SERVICE_CATEGORIES } = useLocalStore(serviceCategoriesStore)

  const cols = [
    {
      heading: 'Services',
      links: SERVICE_CATEGORIES.map((c) => ({ label: c.title, href: `/services/${c.slug}` })),
    },
    { heading: 'Company', links: COMPANY_LINKS },
  ]

  return (
    <footer id="footer" className="bg-[#faf9f6]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div>
            <Logo className="text-[#2323d6]" />
            <p className="mt-6 max-w-xs text-[14.5px] leading-relaxed text-neutral-600">
              Read our brochure and explore your possibilities.
            </p>
            <SmartLink
              href="#book"
              className="group mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-[#2323d6] hover:text-[#1a1ab8]"
            >
              Open the brochure
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </SmartLink>
            <div className="mt-8 flex items-center gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-600 ring-1 ring-neutral-200 transition-all hover:bg-[#2323d6] hover:text-white hover:ring-[#2323d6]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="font-display text-[1.3rem] font-medium text-neutral-900">{col.heading}</h4>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink
                      href={link.href}
                      className="text-[14px] text-neutral-600 transition-colors hover:text-[#2323d6]"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-7 text-[13px] text-neutral-500 md:flex-row md:px-10">
          <p>© 2026 AXLE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <SmartLink href="/terms" className="transition-colors hover:text-[#2323d6]">Terms of Use</SmartLink>
            <SmartLink href="/privacy" className="transition-colors hover:text-[#2323d6]">Privacy Policy</SmartLink>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <a href="tel:+919818067278" className="transition-colors hover:text-[#2323d6]">+91 98180 67278</a>
            <a href="mailto:hello@axle.cab" className="transition-colors hover:text-[#2323d6]">hello@axle.cab</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
