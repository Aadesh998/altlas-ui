import { ArrowUpRight, Facebook, Instagram, Twitter } from 'lucide-react'
import Logo from '@/components/Logo'

const COLS: { heading: string; links: string[] }[] = [
  {
    heading: 'Popular Cities',
    links: ['New York', 'London', 'Dubai', 'Singapore', 'Mumbai', 'Los Angeles'],
  },
  {
    heading: 'Services',
    links: ['City Rides', 'Airport Transfers', 'Chauffeur Hire', 'Corporate Travel', 'Events & Weddings'],
  },
  {
    heading: 'Our Fleet',
    links: ['Executive Sedans', 'Premium SUVs', 'Electric Cars', 'Prestige 4×4', 'Vans & Groups'],
  },
  {
    heading: 'Company',
    links: ['About AXLE', 'How it works', 'Cities', 'Guides', 'FAQs', 'T&Cs', 'Privacy', 'Cookies', 'Careers'],
  },
]

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#faf9f6]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div>
            <Logo className="text-[#2323d6]" />
            <p className="mt-6 max-w-xs text-[14.5px] leading-relaxed text-neutral-600">
              Read our brochure and explore your possibilities.
            </p>
            <a
              href="#book"
              className="group mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-[#2323d6] hover:text-[#1a1ab8]"
            >
              Open the brochure
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
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
          {COLS.map((col) => (
            <div key={col.heading}>
              <h4 className="font-display text-[1.3rem] font-medium text-neutral-900">{col.heading}</h4>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-[14px] text-neutral-600 transition-colors hover:text-[#2323d6]"
                    >
                      {link}
                    </a>
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
            <a href="#top" className="transition-colors hover:text-[#2323d6]">Terms of Use</a>
            <a href="#top" className="transition-colors hover:text-[#2323d6]">Privacy Policy</a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <a href="tel:+442076327567" className="transition-colors hover:text-[#2323d6]">(+44) 0207 632 7567 UK</a>
            <a href="tel:+18005550199" className="transition-colors hover:text-[#2323d6]">(+1) 800 555 0199 USA</a>
            <a href="mailto:hello@axle.cab" className="transition-colors hover:text-[#2323d6]">hello@axle.cab</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
