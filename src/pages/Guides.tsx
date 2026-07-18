import { ArrowRight, Briefcase, CalendarClock, Luggage, MapPin, ShieldCheck, Wallet } from 'lucide-react'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import Reveal from '@/components/Reveal'
import SmartLink from '@/components/SmartLink'

const GUIDES = [
  {
    icon: MapPin,
    tag: 'Getting started',
    title: 'How AXLE fixed pricing works',
    text: 'No meters, no surge. See exactly how your fare is calculated at booking, and what tolls or waiting time can add to it.',
  },
  {
    icon: CalendarClock,
    tag: 'Airport transfers',
    title: 'Booking a flight-tracked airport transfer',
    text: 'How flight tracking, meet & greet, and free waiting time work — and how to get it right for early or delayed landings.',
  },
  {
    icon: Briefcase,
    tag: 'Chauffeur hire',
    title: 'Booking a chauffeur by the hour',
    text: 'What to expect from hourly hire, how minimum bookings work, and how to add extra stops during your reservation.',
  },
  {
    icon: Wallet,
    tag: 'Corporate travel',
    title: 'Setting up a corporate account',
    text: "Invoiced billing, priority booking and multi-rider management — what's involved in setting up AXLE for your team.",
  },
  {
    icon: Luggage,
    tag: 'Before you ride',
    title: 'Choosing the right car for your luggage',
    text: 'A quick guide to seats and boot space across our fleet, so your group and bags fit comfortably every time.',
  },
  {
    icon: ShieldCheck,
    tag: 'Trust & safety',
    title: 'How we vet every chauffeur',
    text: 'Background checks, licensing, and the ongoing training every AXLE chauffeur goes through before — and after — joining the fleet.',
  },
]

export default function Guides() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main>
        <section className="bg-[#060650] pb-16 pt-36 text-white md:pb-20 md:pt-44">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-white/60">Guides</p>
            <h1 className="mt-4 max-w-2xl font-display text-[2.4rem] font-medium leading-tight md:text-[3rem]">
              Everything you need to know before you ride
            </h1>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-white/75">
              Practical guides on pricing, airport transfers, chauffeur hire and more — written from a decade of
              getting 40,000 rides a year right.
            </p>
          </div>
        </section>

        <section className="pb-24 pt-16 md:pb-32 md:pt-20">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.map((g, i) => (
                <Reveal key={g.title} delay={i * 90}>
                  <article className="group flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
                      <g.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2323d6]">
                      {g.tag}
                    </p>
                    <h3 className="mt-2 font-display text-[1.35rem] font-medium leading-snug text-neutral-900">
                      {g.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-neutral-600">{g.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16 text-center">
              <p className="text-[15px] text-neutral-600">Ready to put it into practice?</p>
              <SmartLink
                href="#book"
                className="group mt-4 inline-flex items-center gap-3 rounded-lg border border-[#2323d6] px-8 py-3.5 text-[15px] font-medium text-[#2323d6] transition-all hover:bg-[#2323d6] hover:text-white"
              >
                Book your ride
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
