import { CalendarCheck2, MapPinned, ShieldCheck, Sparkles } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { homepageContentStore } from '@/lib/homepageContentStore'
import { useSingletonStore } from '@/lib/dataStore'

const STEP_ICONS = [CalendarCheck2, ShieldCheck, MapPinned, Sparkles]

export default function Process() {
  const { value: content } = useSingletonStore(homepageContentStore)
  const { process } = content

  return (
    <section id="process" className="scroll-mt-24 bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">
              {process.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-[2.4rem] font-medium leading-tight text-neutral-900 md:text-[3rem]">
              {process.heading}
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-neutral-600">{process.subtext}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length]
            return (
              <Reveal key={step.title} delay={i * 100}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <span className="pointer-events-none absolute -right-3 -top-6 font-display text-[6.5rem] font-semibold leading-none text-[#060650]/5 transition-colors duration-300 group-hover:text-[#2323d6]/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-6 font-display text-[1.5rem] font-medium text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 text-[14px] leading-relaxed text-neutral-600">{step.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
