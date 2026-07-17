import { CalendarCheck2, MapPinned, ShieldCheck, Sparkles } from 'lucide-react'
import Reveal from '@/components/Reveal'

const STEPS = [
  {
    icon: CalendarCheck2,
    num: '01',
    title: 'Share Your Journey',
    text: 'Tell us where and when — app, web or a quick call. Fixed price confirmed in seconds, no surge ever.',
  },
  {
    icon: ShieldCheck,
    num: '02',
    title: 'Your Personal Chauffeur',
    text: 'We handpick a vetted, top-rated chauffeur for your trip and send their name, photo and plate in advance.',
  },
  {
    icon: MapPinned,
    num: '03',
    title: 'Track & Relax',
    text: 'Watch your car approach in real time. Bottled water, chargers and your preferred temperature await inside.',
  },
  {
    icon: Sparkles,
    num: '04',
    title: 'Arrive in Style',
    text: 'Door-to-door, luggage carried, receipt in your inbox. Rate your ride — we read every single one.',
  },
]

export default function Process() {
  return (
    <section id="process" className="bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">
              What sets us apart
            </p>
            <h2 className="mt-4 font-display text-[2.4rem] font-medium leading-tight text-neutral-900 md:text-[3rem]">
              The AXLE process
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-neutral-600">
            Four steps between you and the smoothest ride in the city — refined over a decade and
            40,000 journeys a year.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <span className="pointer-events-none absolute -right-3 -top-6 font-display text-[6.5rem] font-semibold leading-none text-[#060650]/5 transition-colors duration-300 group-hover:text-[#2323d6]/10">
                  {step.num}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="relative mt-6 font-display text-[1.5rem] font-medium text-neutral-900">
                  {step.title}
                </h3>
                <p className="relative mt-3 text-[14px] leading-relaxed text-neutral-600">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
