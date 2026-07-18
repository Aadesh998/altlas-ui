import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { homepageContentStore } from '@/lib/homepageContentStore'
import { useSingletonStore } from '@/lib/dataStore'

export default function DarkCard() {
  const { value: content } = useSingletonStore(homepageContentStore)
  const { darkCard } = content

  return (
    <section id="about" className="scroll-mt-24 bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-[#060650] text-white">
            <div className="grid gap-10 p-8 md:grid-cols-2 md:gap-14 md:p-16 lg:p-20">
              <div className="flex flex-col justify-center">
                <h3 className="font-display text-[2.3rem] font-medium leading-tight md:text-[2.9rem]">
                  {darkCard.heading}
                </h3>
                <div className="mt-7 space-y-5 text-[15.5px] leading-relaxed text-white/80">
                  {darkCard.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-9">
                  <a
                    href="#book"
                    className="group inline-flex items-center gap-3 rounded-lg border border-white/50 px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#060650]"
                  >
                    {darkCard.ctaText}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              <div className="relative min-h-[320px] overflow-hidden rounded-xl md:min-h-[480px]">
                <img
                  src="/images/chauffeur.png"
                  alt="AXLE chauffeur opening the rear door of a luxury sedan"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
