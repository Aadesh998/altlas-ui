import { useParams } from 'react-router'
import { ArrowRight, CalendarDays, CheckCircle2, Gauge, MapPin, Sun } from 'lucide-react'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import Reveal from '@/components/Reveal'
import SmartLink from '@/components/SmartLink'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useAutoAdvance } from '@/lib/useAutoAdvance'
import { useImageOverrides, resolveImage } from '@/lib/imageOverrides'
import { resolveIcon } from '@/data/icons'
import { destinationsStore } from '@/lib/destinationsStore'
import { tourPackagesStore } from '@/lib/tourPackagesStore'
import { useLocalStore } from '@/lib/dataStore'

export default function TourDetail() {
  const { slug } = useParams()
  const { items: DESTINATIONS } = useLocalStore(destinationsStore)
  const { items: TOUR_PACKAGES } = useLocalStore(tourPackagesStore)
  const destination = DESTINATIONS.find((d) => d.slug === slug)
  const { setApi } = useAutoAdvance()
  const { overrides } = useImageOverrides()

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#faf9f6]">
        <Navbar />
        <main className="flex min-h-screen items-center justify-center px-5 pt-32 text-center">
          <div>
            <h1 className="font-display text-[2rem] font-medium text-neutral-900">Destination not found</h1>
            <SmartLink
              href="/tours"
              className="mt-5 inline-block rounded-lg bg-[#2323d6] px-6 py-3 text-[15px] font-medium text-white hover:bg-[#1a1ab8]"
            >
              Browse all destinations
            </SmartLink>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const relatedPackages = TOUR_PACKAGES.filter((p) => p.destinations.includes(destination.name))
  const Icon = resolveIcon(destination.icon)

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <Carousel className="group" opts={{ loop: true }} setApi={setApi}>
            <CarouselContent>
              {destination.images.map((src, i) => (
                <CarouselItem key={src}>
                  <div className="relative h-[70vh] min-h-[420px] w-full">
                    <img
                      src={resolveImage(overrides, `destination.${destination.slug}.${i}`, src)}
                      alt={`${destination.name} ${i + 1}`}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060650]/90 via-[#060650]/25 to-black/20" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-5 border-none bg-white/15 text-white opacity-0 backdrop-blur transition-opacity hover:bg-white/25 group-hover:opacity-100 md:left-8" />
            <CarouselNext className="right-5 border-none bg-white/15 text-white opacity-0 backdrop-blur transition-opacity hover:bg-white/25 group-hover:opacity-100 md:right-8" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-14 pt-24 text-white md:px-10 md:pb-20">
              <div className="mx-auto max-w-[1000px]">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.3em] text-white/70">
                  {destination.category} · {destination.region}
                </p>
                <h1 className="mt-3 font-display text-[2.4rem] font-medium leading-tight md:text-[3rem]">
                  {destination.name}
                </h1>
                <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/85">{destination.tagline}</p>
              </div>
            </div>
          </Carousel>
        </section>

        <section className="pb-24 pt-14 md:pb-32 md:pt-16">
          <div className="mx-auto max-w-[1000px] px-5 md:px-10">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                  <Gauge className="h-3.5 w-3.5" />
                  From Delhi
                </p>
                <p className="mt-2 text-[14.5px] font-medium text-neutral-900">{destination.distanceFromDelhi}</p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Ideal duration
                </p>
                <p className="mt-2 text-[14.5px] font-medium text-neutral-900">{destination.idealDuration}</p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                  <Sun className="h-3.5 w-3.5" />
                  Best time to visit
                </p>
                <p className="mt-2 text-[14.5px] font-medium text-neutral-900">{destination.bestTime}</p>
              </div>
            </div>

            <Reveal className="mt-12">
              <h2 className="font-display text-[1.6rem] font-medium text-neutral-900">Overview</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{destination.overview}</p>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="font-display text-[1.6rem] font-medium text-neutral-900">Highlights</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {destination.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-[14.5px] text-neutral-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00b67a]" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            {relatedPackages.length > 0 && (
              <Reveal className="mt-12">
                <h2 className="font-display text-[1.6rem] font-medium text-neutral-900">Available packages</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {relatedPackages.map((p) => (
                    <div key={p.slug} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                      <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#2323d6]">
                        <MapPin className="h-3.5 w-3.5" />
                        {p.duration}
                      </div>
                      <h3 className="mt-2 font-display text-[1.15rem] font-medium text-neutral-900">{p.title}</h3>
                      <p className="mt-2 text-[13.5px] text-neutral-500">
                        From <span className="font-semibold text-neutral-900">{p.indicativeFrom}*</span> ({p.carType})
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal className="mt-14 rounded-2xl bg-[#060650] p-8 text-center text-white md:p-10">
              <h3 className="font-display text-[1.5rem] font-medium">Plan your trip to {destination.name}</h3>
              <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-white/75">
                Tell us your dates and group size — we'll put together a custom itinerary and dynamic quote based
                on distance, driver allowance and night halts.
              </p>
              <SmartLink
                href={`/tours?destination=${encodeURIComponent(destination.name)}#custom-package`}
                className="group mt-6 inline-flex items-center gap-3 rounded-lg bg-white px-7 py-3.5 text-[15px] font-medium text-[#060650] transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Request a custom itinerary
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </SmartLink>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
