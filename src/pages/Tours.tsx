import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import Reveal from '@/components/Reveal'
import SmartLink from '@/components/SmartLink'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { PACKAGE_TYPE_LABELS, type PackageType } from '@/data/tourPackages'
import { useAutoAdvance } from '@/lib/useAutoAdvance'
import { addCustomRequest } from '@/lib/customRequests'
import { useImageOverrides, resolveImage } from '@/lib/imageOverrides'
import { resolveIcon } from '@/data/icons'
import { destinationsStore } from '@/lib/destinationsStore'
import { tourPackagesStore } from '@/lib/tourPackagesStore'
import { useLocalStore } from '@/lib/dataStore'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

const TABS: PackageType[] = ['local-delhi', 'local-outstation', 'multi-day']

export default function Tours() {
  const [params] = useSearchParams()
  const [tab, setTab] = useState<PackageType>('local-delhi')
  const { items: DESTINATIONS } = useLocalStore(destinationsStore)
  const { items: TOUR_PACKAGES } = useLocalStore(tourPackagesStore)
  const packages = TOUR_PACKAGES.filter((p) => p.type === tab)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    pickupCity: '',
    destination: params.get('destination') ?? '',
    days: '',
    travelers: '',
    carType: 'Sedan',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const { setApi } = useAutoAdvance()
  const { overrides } = useImageOverrides()
  const heroImages = DESTINATIONS.slice(0, 6).map((d) => resolveImage(overrides, `destination.${d.slug}.0`, d.images[0]))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    addCustomRequest(form)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#060650] pb-16 pt-36 text-white md:pb-20 md:pt-44">
          <div className="absolute inset-0 overflow-hidden">
            <Carousel opts={{ loop: true }} setApi={setApi}>
              <CarouselContent className="ml-0">
                {heroImages.map((src, i) => (
                  <CarouselItem key={src} className="basis-full pl-0">
                    <img
                      src={src}
                      alt=""
                      className="h-[480px] w-full object-cover md:h-[560px]"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="absolute inset-0 bg-[#060650]/80" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.13]"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 20%, #fff 0.8px, transparent 0.8px)',
              backgroundSize: '34px 34px',
            }}
          />
          <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-white/60">Tours & Packages</p>
            <h1 className="mt-4 max-w-2xl font-display text-[2.4rem] font-medium leading-tight md:text-[3rem]">
              Explore India, one road trip at a time
            </h1>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-white/75">
              From Himalayan hill stations to Char Dham pilgrimages and heritage cities — our network of drivers
              covers every road-connected corner of India. Local sightseeing in Delhi and beyond, multi-day
              packages, or a fully custom itinerary — all with a chauffeur who knows the route.
            </p>
            <p className="mt-4 max-w-xl text-[13.5px] text-white/50">
              Every trip is priced dynamically based on distance travelled, driver allowance and night halt
              charges — the figures below are indicative starting points, not fixed fares.
            </p>
          </div>
        </section>

        {/* Destinations */}
        <section className="pb-24 pt-16 md:pb-32 md:pt-20">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">Where we drive</p>
                <h2 className="mt-4 font-display text-[2.2rem] font-medium leading-tight text-neutral-900 md:text-[2.8rem]">
                  Destinations across India
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DESTINATIONS.map((d, i) => {
                const Icon = resolveIcon(d.icon)
                return (
                <Reveal key={d.slug} delay={i * 70}>
                  <SmartLink
                    href={`/tours/${d.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={resolveImage(overrides, `destination.${d.slug}.0`, d.images[0])}
                        alt={d.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />
                      <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                        <Icon className="h-4 w-4 text-white" strokeWidth={1.75} />
                      </span>
                      <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
                        {d.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-[1.3rem] font-medium text-neutral-900">{d.name}</h3>
                      <p className="text-[13px] text-neutral-500">{d.region}</p>
                      <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-neutral-600">{d.tagline}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#2323d6] transition-colors group-hover:text-[#1a1ab8]">
                        Explore
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </SmartLink>
                </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="bg-white pb-24 pt-4 md:pb-32">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">Packages</p>
                <h2 className="mt-4 font-display text-[2.2rem] font-medium leading-tight text-neutral-900 md:text-[2.8rem]">
                  Local sightseeing & multi-day tours
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`rounded-full px-5 py-2.5 text-[14px] font-medium transition-all ${
                      tab === t
                        ? 'bg-[#060650] text-white'
                        : 'bg-neutral-50 text-neutral-600 ring-1 ring-neutral-200 hover:ring-neutral-400'
                    }`}
                  >
                    {PACKAGE_TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((p, i) => (
                <Reveal key={p.slug} delay={i * 90}>
                  <article className="flex h-full flex-col rounded-2xl bg-[#faf9f6] p-7 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <div className="flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[#2323d6]">
                      <MapPin className="h-3.5 w-3.5" />
                      {p.destinations.join(' · ')}
                    </div>
                    <h3 className="mt-3 font-display text-[1.4rem] font-medium leading-snug text-neutral-900">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] text-neutral-500">{p.duration}</p>
                    <ul className="mt-4 flex-1 space-y-1.5 text-[13.5px] text-neutral-600">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00b67a]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 border-t border-neutral-200 pt-4">
                      <p className="flex items-baseline justify-between">
                        <span className="text-[13px] text-neutral-500">From ({p.carType})</span>
                        <span className="font-display text-xl font-semibold text-neutral-900">
                          {p.indicativeFrom}*
                        </span>
                      </p>
                      <p className="mt-1 text-[11.5px] text-neutral-400">
                        *Indicative — final fare depends on km, driver & night charges.
                      </p>
                    </div>
                    {p.type === 'multi-day' ? (
                      <a
                        href="#custom-package"
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-[#2323d6] px-5 py-2.5 text-[14px] font-medium text-[#2323d6] transition-all hover:bg-[#2323d6] hover:text-white"
                      >
                        Enquire about this package
                      </a>
                    ) : (
                      <SmartLink
                        href={`/book-package?type=tour&slug=${p.slug}`}
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2323d6] px-5 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[#1a1ab8]"
                      >
                        Book this package
                      </SmartLink>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Custom package enquiry */}
        <section id="custom-package" className="bg-[#faf9f6] pb-24 pt-4 md:pb-32">
          <div className="mx-auto max-w-[800px] px-5 md:px-10">
            <Reveal className="text-center">
              <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">Custom package</p>
              <h2 className="mt-4 font-display text-[2rem] font-medium leading-tight text-neutral-900 md:text-[2.4rem]">
                Don't see the itinerary you want?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600">
                Tell us where you'd like to go, for how long, and how many travelers — we'll put together a custom
                itinerary and dynamic quote for you.
              </p>
            </Reveal>

            <Reveal className="mt-10 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              {submitted ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#00b67a]" />
                  <h3 className="mt-5 font-display text-[1.4rem] font-medium text-neutral-900">
                    Request received
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-neutral-600">
                    A travel expert will call you within 24 hours with a custom itinerary and dynamic quote.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                      Full name
                    </span>
                    <input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Jane Doe"
                      className={inputCls}
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                      Mobile number
                    </span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className={inputCls}
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                      Pickup city
                    </span>
                    <input
                      value={form.pickupCity}
                      onChange={(e) => setForm((f) => ({ ...f, pickupCity: e.target.value }))}
                      placeholder="Delhi"
                      className={inputCls}
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                      Destination(s)
                    </span>
                    <input
                      value={form.destination}
                      onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
                      placeholder="Manali, Kedarnath..."
                      className={inputCls}
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                      No. of days
                    </span>
                    <input
                      value={form.days}
                      onChange={(e) => setForm((f) => ({ ...f, days: e.target.value }))}
                      placeholder="5"
                      inputMode="numeric"
                      className={inputCls}
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                      No. of travelers
                    </span>
                    <input
                      value={form.travelers}
                      onChange={(e) => setForm((f) => ({ ...f, travelers: e.target.value }))}
                      placeholder="4"
                      inputMode="numeric"
                      className={inputCls}
                      required
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                      Preferred car type
                    </span>
                    <select
                      value={form.carType}
                      onChange={(e) => setForm((f) => ({ ...f, carType: e.target.value }))}
                      className={inputCls}
                    >
                      <option>Sedan</option>
                      <option>SUV</option>
                      <option>Tempo Traveller</option>
                      <option>Not sure — recommend one</option>
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                      Anything else we should know?
                    </span>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Travel dates, special requests..."
                      rows={3}
                      className={inputCls}
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2323d6] px-7 py-4 text-[15px] font-medium text-white transition-all hover:bg-[#1a1ab8] sm:col-span-2"
                  >
                    Request custom itinerary
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
