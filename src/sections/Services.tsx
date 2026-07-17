import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'

const SERVICES = [
  {
    title: 'City Rides',
    image: '/images/service-city.jpg',
    text: 'On-demand cars across the city, any hour. Your chauffeur arrives in minutes, the route is planned, the price is fixed before you step in.',
  },
  {
    title: 'Airport Transfers',
    image: '/images/service-airport.jpg',
    text: 'Flight-tracked pickups, meet & greet at arrivals, and an hour of free waiting. Early or delayed — we’re there when you land.',
  },
  {
    title: 'Chauffeur Hire',
    image: '/images/service-chauffeur.jpg',
    text: 'A dedicated car and driver by the hour or the day. Meetings, errands, evenings out — your chauffeur waits, you never do.',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">Ride types</p>
          <h2 className="mt-4 font-display text-[2.4rem] font-medium leading-tight text-neutral-900 md:text-[3rem]">
            One fleet, three ways to travel
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <a href="#book" className="group relative block overflow-hidden rounded-2xl">
                <div className="relative aspect-[3/4] w-full">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <h3 className="font-display text-[2rem] font-medium">{s.title}</h3>
                    <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-white/75">{s.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-semibold uppercase tracking-[0.15em] text-white/90">
                      Book now
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <p className="text-[15px] text-neutral-600">Not sure which one you need?</p>
          <a
            href="#book"
            className="group mt-4 inline-flex items-center gap-3 rounded-lg border border-[#2323d6] px-8 py-3.5 text-[15px] font-medium text-[#2323d6] transition-all hover:bg-[#2323d6] hover:text-white"
          >
            Explore ride types
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
