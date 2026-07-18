import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { homepageContentStore } from '@/lib/homepageContentStore'
import { useSingletonStore } from '@/lib/dataStore'

export default function CtaBanner() {
  const { value: content } = useSingletonStore(homepageContentStore)
  const { ctaBanner } = content

  return (
    <section className="relative overflow-hidden bg-[#060650]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, #fff 0.8px, transparent 0.8px)',
          backgroundSize: '34px 34px',
        }}
      />
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-9 px-5 py-24 text-center md:px-10 md:py-28">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-[2.4rem] font-medium leading-tight text-white md:text-[3.4rem]">
            {ctaBanner.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-white/70">
            {ctaBanner.subtext}
          </p>
          <a
            href="#book"
            className="group mt-9 inline-flex items-center gap-3 rounded-lg bg-white px-9 py-4 text-[15px] font-semibold text-[#060650] transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            {ctaBanner.ctaText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
