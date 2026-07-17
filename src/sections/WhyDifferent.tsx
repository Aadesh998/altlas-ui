import { useState } from 'react'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import Reveal from '@/components/Reveal'

interface Item {
  title: string
  body: string
}

const ITEMS: Item[] = [
  {
    title: 'Professional chauffeurs',
    body: 'Every AXLE driver is background-checked, licensed and trained in defensive driving and etiquette. They know the city’s shortcuts, the airport’s terminals and the value of your time. This is a partnership built on understanding your schedule, your privacy requirements, and what a truly restorative ride feels like.',
  },
  {
    title: 'Fixed, transparent pricing',
    body: 'The price you see at booking is the price you pay — no surge, no meters ticking in traffic, no surprises. Tolls, waiting time and taxes are itemised upfront, and receipts land in your inbox the moment you step out.',
  },
  {
    title: 'Always on time, 24/7',
    body: 'Our dispatch team watches every ride around the clock. For airport pickups we track your flight and adjust automatically — early or delayed, your chauffeur is there when you land, name board in hand.',
  },
  {
    title: 'An immaculate fleet',
    body: 'Your journeys are treasured time, so every car is detailed daily, inspected weekly and retired early. While thousands of cabs advertise rides, we only work with the top 5% — vehicles that represent the highest standards in maintenance, comfort and cleanliness.',
  },
  {
    title: 'Safety and discretion',
    body: 'Many of our long-term clients came to us through personal referrals, and we understand why. GPS-tracked rides, vetted drivers, full insurance and absolute discretion define everything we do. Your trust is earned through consistent excellence, never assumed.',
  },
]

export default function WhyDifferent() {
  const [open, setOpen] = useState(0)

  return (
    <section id="why" className="bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl bg-[#060650] text-white lg:grid-cols-2">
            {/* Accordion */}
            <div className="flex flex-col justify-center p-8 md:p-14 lg:p-20">
              <h2 className="font-display text-[2.3rem] font-medium leading-tight md:text-[3rem]">
                Why we’re different
              </h2>
              <div className="mt-10">
                {ITEMS.map((item, i) => {
                  const isOpen = open === i
                  return (
                    <div key={item.title} className="border-b border-white/15">
                      <button
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="flex w-full items-center gap-4 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                            isOpen ? 'bg-[#2323d6]' : 'bg-white text-[#060650]'
                          }`}
                        >
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </span>
                        <span className="flex-1 font-display text-[1.35rem] font-medium md:text-[1.5rem]">
                          {item.title}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-white/60 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className="grid transition-all duration-500 ease-in-out"
                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-6 pl-[52px] pr-2 text-[14.5px] leading-relaxed text-white/70">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <a
                href="#process"
                className="group mt-10 inline-flex w-fit items-center gap-3 rounded-lg border border-white/50 px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#060650]"
              >
                Learn more about AXLE
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
            {/* Image */}
            <div className="relative min-h-[380px] lg:min-h-full">
              <img
                src="/images/why-different.jpg"
                alt="City street at night seen from an AXLE car"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060650]/40 to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
