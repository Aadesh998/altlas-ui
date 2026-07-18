import { Star } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { testimonialsStore } from '@/lib/testimonialsStore'
import { useLocalStore } from '@/lib/dataStore'

export default function Testimonials() {
  const { items: REVIEWS } = useLocalStore(testimonialsStore)

  return (
    <section id="reviews" className="scroll-mt-24 bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">Reviews</p>
          <h2 className="mt-4 font-display text-[2.4rem] font-medium leading-tight text-neutral-900 md:text-[3rem]">
            Real journeys, real satisfaction
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.slug} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
                <div className="flex items-center gap-1" aria-label={`${r.rating} star review`}>
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-[#00b67a] text-[#00b67a]" />
                  ))}
                </div>
                <figcaption className="mt-4 text-[15.5px] font-semibold text-neutral-900">{r.title}</figcaption>
                <blockquote className="mt-3 flex-1 text-[14px] leading-relaxed text-neutral-600">
                  “{r.text}”
                </blockquote>
                <footer className="mt-6 border-t border-neutral-100 pt-4">
                  <p className="text-[14px] font-semibold text-neutral-900">{r.name}</p>
                  <p className="text-[12.5px] text-neutral-500">{r.detail}</p>
                </footer>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
