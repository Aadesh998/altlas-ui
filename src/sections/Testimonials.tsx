import { ArrowRight, Star } from 'lucide-react'
import Reveal from '@/components/Reveal'

interface Review {
  title: string
  text: string
  name: string
  detail: string
}

const REVIEWS: Review[] = [
  {
    title: '100% Great Experience',
    text: 'AXLE found us the perfect car for a 4am airport run at a reasonable flat fee... Like many I’m nervous about trusting anything on the internet, they respected this and answered all my questions. Communications awesome and the ride was the best experience we’ve ever had.',
    name: 'Margaret T.',
    detail: 'Airport transfer, London',
  },
  {
    title: 'Fantastic service from a great company!',
    text: 'AXLE has looked after us for years — this is the 5th trip we have done with them. Extremely knowledgeable team, who always deliver what we are looking for. They know the city inside out and recommend excellent routes. We couldn’t recommend highly enough.',
    name: 'Daniel R.',
    detail: 'Monthly chauffeur client',
  },
  {
    title: 'Super helpful',
    text: 'The team at AXLE were super helpful in planning our wedding day cars. They were really responsive with all the questions we had, the cars were spotless and the drivers impeccable. I’d definitely use them again.',
    name: 'Priya S.',
    detail: 'Events & weddings, Mumbai',
  },
  {
    title: 'The team at AXLE are first class',
    text: 'The team helped us organise our first corporate account. We were utterly clueless but they helped us find the perfect setup — invoicing, priority booking, the lot. Our board members now refuse to travel any other way.',
    name: 'James W.',
    detail: 'Corporate travel, New York',
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">Reviews</p>
          <h2 className="mt-4 font-display text-[2.4rem] font-medium leading-tight text-neutral-900 md:text-[3rem]">
            Real journeys, real satisfaction
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.title} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
                <div className="flex items-center gap-1" aria-label="5 star review">
                  {[0, 1, 2, 3, 4].map((s) => (
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

        <Reveal className="mt-10 text-center">
          <a
            href="#book"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-[#2323d6] hover:text-[#1a1ab8]"
          >
            See more reviews
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
