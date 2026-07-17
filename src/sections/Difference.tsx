import { ArrowRight, Star } from 'lucide-react'
import Reveal from '@/components/Reveal'

export default function Difference() {
  return (
    <section className="bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* The AXLE difference */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[2.4rem] font-medium leading-tight text-neutral-900 md:text-[3rem]">
            The AXLE difference
          </h2>
          <div className="mt-7 space-y-5 text-[15.5px] leading-relaxed text-neutral-600">
            <p>
              We offer only the finest cars on the road: the ones we know and trust, that undergo
              the most rigorous maintenance and are driven by the best trained chauffeurs.
            </p>
            <p>
              Your time is precious, so we'll strive to make every ride everything you want it to
              be.
            </p>
            <p>
              Our <span className="font-semibold text-[#2323d6]">unique Ride Concierge</span>{' '}
              allows us to understand not just where you want to go, but how you want to travel. We
              then handpick the car, the driver and the route that transform that vision into
              reality.
            </p>
          </div>
          <a
            href="#why"
            className="group mt-9 inline-flex items-center gap-3 rounded-lg bg-[#2323d6] px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
          >
            Why Choose AXLE?
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>

        {/* Big statement */}
        <Reveal className="mx-auto mt-16 max-w-4xl text-center sm:mt-24 md:mt-36">
          <p className="font-display text-[1.9rem] font-medium leading-[1.25] text-neutral-900 md:text-[2.9rem]">
            There are more than 50,000 cabs operating in the city, but we only work with the very
            best 5%.
          </p>
          <p className="mx-auto mt-7 max-w-2xl text-[15.5px] leading-relaxed text-neutral-600">
            We handpick the finest cars and personalise every detail to perfection. Our friendly
            experts ensure a seamless journey from start to finish, creating a ride you'll want to
            repeat. Trust us to deliver the ultimate travel experience customised just for you.
          </p>
          <div className="mt-10 flex flex-col items-center gap-2">
            <span className="text-[12px] font-medium uppercase tracking-[0.25em] text-neutral-500">
              Average review rating
            </span>
            <span className="font-display text-5xl font-medium text-neutral-900">4.9</span>
            <span className="flex items-center gap-1" aria-label="4.9 out of 5 stars">
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
