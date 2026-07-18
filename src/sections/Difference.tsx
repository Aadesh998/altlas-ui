import { ArrowRight, Star } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { homepageContentStore } from '@/lib/homepageContentStore'
import { useSingletonStore } from '@/lib/dataStore'

export default function Difference() {
  const { value: content } = useSingletonStore(homepageContentStore)
  const { difference } = content

  return (
    <section className="bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* The AXLE difference */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[2.4rem] font-medium leading-tight text-neutral-900 md:text-[3rem]">
            {difference.heading}
          </h2>
          <div className="mt-7 space-y-5 text-[15.5px] leading-relaxed text-neutral-600">
            {difference.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <a
            href="#why"
            className="group mt-9 inline-flex items-center gap-3 rounded-lg bg-[#2323d6] px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
          >
            {difference.ctaText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>

        {/* Big statement */}
        <Reveal className="mx-auto mt-16 max-w-4xl text-center sm:mt-24 md:mt-36">
          <p className="font-display text-[1.9rem] font-medium leading-[1.25] text-neutral-900 md:text-[2.9rem]">
            {difference.bigStatement}
          </p>
          <p className="mx-auto mt-7 max-w-2xl text-[15.5px] leading-relaxed text-neutral-600">
            {difference.bigStatementSub}
          </p>
          <div className="mt-10 flex flex-col items-center gap-2">
            <span className="text-[12px] font-medium uppercase tracking-[0.25em] text-neutral-500">
              Average review rating
            </span>
            <span className="font-display text-5xl font-medium text-neutral-900">{difference.ratingValue}</span>
            <span className="flex items-center gap-1" aria-label={`${difference.ratingValue} out of 5 stars`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5 fill-[#2323d6] text-[#2323d6]" />
              ))}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
