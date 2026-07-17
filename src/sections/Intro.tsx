import Reveal from '@/components/Reveal'

export default function Intro() {
  return (
    <section id="intro" className="bg-[#faf9f6]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:grid-cols-2 md:gap-20 md:px-10 md:py-32">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">
            Introducing AXLE
          </p>
          <h2 className="mt-6 font-display text-[2.6rem] font-medium leading-[1.12] text-neutral-900 md:text-[3.4rem]">
            Your Impartial
            <br />
            Travel Experts
          </h2>
        </Reveal>
        <Reveal delay={150} className="flex flex-col justify-center gap-5 text-[16.5px] leading-relaxed text-neutral-700">
          <p>AXLE is your personalised cab and chauffeur service.</p>
          <p>
            Since 2015 we've specialized in matching discerning travelers with the city's finest
            drivers and cars.
          </p>
          <p>Welcome to AXLE: effortless comfort, handpicked and flawlessly curated.</p>
          <p>
            A cab ride is the start of every journey, and with AXLE nothing is left to chance, from
            first tap to final drop-off.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
