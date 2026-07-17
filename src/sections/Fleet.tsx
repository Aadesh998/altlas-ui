import { useState } from 'react'
import { ArrowRight, Briefcase, Gauge, Sparkles, Users } from 'lucide-react'
import Reveal from '@/components/Reveal'

interface Car {
  name: string
  category: 'Sedan' | 'SUV' | 'Electric'
  image: string
  seats: string
  bags: string
  klass: string
  year: string
  city: string
  airport: string
  blurb: string
}

const CARS: Car[] = [
  {
    name: 'Executive Sedan',
    category: 'Sedan',
    image: '/images/fleet-sedan.png',
    seats: '3 guests',
    bags: '2 bags',
    klass: 'Business class',
    year: '2024 fleet',
    city: '$45',
    airport: '$89',
    blurb: 'The boardroom on wheels — whisper-quiet, polished black, always early.',
  },
  {
    name: 'Premium SUV',
    category: 'SUV',
    image: '/images/fleet-suv.png',
    seats: '5 guests',
    bags: '5 bags',
    klass: 'First class',
    year: '2024 fleet',
    city: '$65',
    airport: '$119',
    blurb: 'Commanding presence, cavernous boot, room for the whole family and more.',
  },
  {
    name: 'Electric Elite',
    category: 'Electric',
    image: '/images/fleet-electric.png',
    seats: '4 guests',
    bags: '2 bags',
    klass: 'Zero emission',
    year: '2025 fleet',
    city: '$49',
    airport: '$95',
    blurb: 'Silent, instant torque and a clear conscience — the future of city travel.',
  },
  {
    name: 'Prestige 4×4',
    category: 'SUV',
    image: '/images/fleet-4x4.jpg',
    seats: '5 guests',
    bags: '6 bags',
    klass: 'All-terrain luxury',
    year: '2023 fleet',
    city: '$75',
    airport: '$139',
    blurb: 'For country weekends and winter escapes — unstoppable, unflappable.',
  },
]

const TABS = ['All', 'Sedan', 'SUV', 'Electric'] as const

export default function Fleet() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('All')
  const cars = CARS.filter((c) => tab === 'All' || c.category === tab)

  return (
    <section id="fleet" className="bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">Our fleet</p>
            <h2 className="mt-4 font-display text-[2.4rem] font-medium leading-tight text-neutral-900 md:text-[3rem]">
              Browse Our Cars
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
                    : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:ring-neutral-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((car, i) => (
            <Reveal key={car.name} delay={i * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-800 backdrop-blur">
                    {car.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[1.65rem] font-medium text-neutral-900">{car.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">{car.blurb}</p>
                  <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] text-neutral-600">
                    <span className="flex items-center gap-2"><Users className="h-4 w-4 text-[#2323d6]" />{car.seats}</span>
                    <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-[#2323d6]" />{car.bags}</span>
                    <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#2323d6]" />{car.klass}</span>
                    <span className="flex items-center gap-2"><Gauge className="h-4 w-4 text-[#2323d6]" />{car.year}</span>
                  </div>
                  <div className="my-5 h-px bg-neutral-100" />
                  <div className="mt-auto space-y-1.5 text-[13.5px]">
                    <p className="flex items-baseline justify-between">
                      <span className="text-neutral-500">City rides from</span>
                      <span className="font-display text-xl font-semibold text-neutral-900">{car.city}<span className="ml-1 font-sans text-[12px] font-normal text-neutral-400">/ trip</span></span>
                    </p>
                    <p className="flex items-baseline justify-between">
                      <span className="text-neutral-500">Airport flat rate</span>
                      <span className="font-display text-xl font-semibold text-neutral-900">{car.airport}<span className="ml-1 font-sans text-[12px] font-normal text-neutral-400">fixed</span></span>
                    </p>
                  </div>
                  <a
                    href="#book"
                    className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#2323d6] transition-colors hover:text-[#1a1ab8]"
                  >
                    Book this car
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href="#book"
            className="group inline-flex items-center gap-3 rounded-lg border border-[#2323d6] px-8 py-3.5 text-[15px] font-medium text-[#2323d6] transition-all hover:bg-[#2323d6] hover:text-white"
          >
            See all
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
