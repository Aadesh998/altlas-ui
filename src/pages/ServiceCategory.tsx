import { useParams } from 'react-router'
import { CheckCircle2, Gauge, IndianRupee, MapPin, Moon } from 'lucide-react'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import Reveal from '@/components/Reveal'
import SmartLink from '@/components/SmartLink'
import { servicePackagesStore } from '@/lib/servicePackagesStore'
import { serviceCategoriesStore } from '@/lib/serviceCategoriesStore'
import { useLocalStore } from '@/lib/dataStore'

export default function ServiceCategory() {
  const { category } = useParams<{ category: string }>()
  const { items: SERVICE_CATEGORIES } = useLocalStore(serviceCategoriesStore)
  const meta = SERVICE_CATEGORIES.find((c) => c.slug === category)
  const { items: SERVICE_PACKAGES } = useLocalStore(servicePackagesStore)
  const packages = SERVICE_PACKAGES.filter((p) => p.category === category)

  if (!meta) {
    return (
      <div className="min-h-screen bg-[#faf9f6]">
        <Navbar />
        <main className="flex min-h-screen items-center justify-center px-5 pt-32 text-center">
          <div>
            <h1 className="font-display text-[2rem] font-medium text-neutral-900">Category not found</h1>
            <SmartLink
              href="#services"
              className="mt-5 inline-block rounded-lg bg-[#2323d6] px-6 py-3 text-[15px] font-medium text-white hover:bg-[#1a1ab8]"
            >
              Back to services
            </SmartLink>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main>
        <section className="bg-[#060650] pb-16 pt-36 text-white md:pb-20 md:pt-44">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-white/60">Popular packages</p>
            <h1 className="mt-4 max-w-2xl font-display text-[2.4rem] font-medium leading-tight md:text-[3rem]">
              {meta.title}
            </h1>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-white/75">{meta.tagline}</p>
            <p className="mt-4 max-w-xl text-[13.5px] text-white/50">
              Prices below are indicative starting points — your final fare is calculated from actual km driven,
              driver allowance and night halt charges where applicable, and extra km beyond what's included. A 10%
              advance confirms your booking; the rest is paid after the ride.
            </p>
          </div>
        </section>

        <section className="pb-24 pt-16 md:pb-32 md:pt-20">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((p, i) => (
                <Reveal key={p.slug} delay={i * 90}>
                  <article className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <span className="inline-flex w-fit items-center rounded-full bg-[#060650]/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[#060650]">
                      {p.vehicle}
                    </span>
                    <h3 className="mt-3 font-display text-[1.3rem] font-medium leading-snug text-neutral-900">
                      {p.title}
                    </h3>
                    {p.route && (
                      <p className="mt-1 flex items-center gap-1.5 text-[13px] text-neutral-500">
                        <MapPin className="h-3.5 w-3.5 text-[#2323d6]" />
                        {p.route}
                      </p>
                    )}
                    <ul className="mt-4 flex-1 space-y-1.5 text-[13.5px] text-neutral-600">
                      {p.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00b67a]" />
                          {inc}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 space-y-1.5 border-t border-neutral-100 pt-4 text-[13.5px]">
                      <p className="flex items-baseline justify-between">
                        <span className="text-neutral-500">From</span>
                        <span className="font-display text-xl font-semibold text-neutral-900">
                          {p.basePrice}*
                        </span>
                      </p>
                      <p className="flex items-center justify-between text-neutral-500">
                        <span className="flex items-center gap-1.5">
                          <Gauge className="h-3.5 w-3.5" />
                          Extra km
                        </span>
                        <span className="font-medium text-neutral-700">{p.extraKmRate}</span>
                      </p>
                      {p.extraHourRate && (
                        <p className="flex items-center justify-between text-neutral-500">
                          <span className="flex items-center gap-1.5">
                            <IndianRupee className="h-3.5 w-3.5" />
                            Extra hour
                          </span>
                          <span className="font-medium text-neutral-700">{p.extraHourRate}</span>
                        </p>
                      )}
                      {p.nightCharge && (
                        <p className="flex items-center justify-between text-neutral-500">
                          <span className="flex items-center gap-1.5">
                            <Moon className="h-3.5 w-3.5" />
                            Night charge
                          </span>
                          <span className="font-medium text-neutral-700">{p.nightCharge}</span>
                        </p>
                      )}
                      <p className="pt-1 text-[11.5px] text-neutral-400">
                        *Indicative — final fare depends on km, driver & night charges.
                      </p>
                    </div>

                    <SmartLink
                      href={`/book-package?type=service&slug=${p.slug}`}
                      className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#2323d6] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
                    >
                      Book this package
                    </SmartLink>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
