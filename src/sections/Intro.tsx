import Reveal from '@/components/Reveal'
import { homepageContentStore } from '@/lib/homepageContentStore'
import { useSingletonStore } from '@/lib/dataStore'

export default function Intro() {
  const { value: content } = useSingletonStore(homepageContentStore)
  const { intro } = content

  return (
    <section id="intro" className="bg-[#faf9f6]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:grid-cols-2 md:gap-20 md:px-10 md:py-32">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">
            {intro.eyebrow}
          </p>
          <h2 className="mt-6 font-display text-[2.6rem] font-medium leading-[1.12] text-neutral-900 md:text-[3.4rem]">
            {intro.headingLine1}
            <br />
            {intro.headingLine2}
          </h2>
        </Reveal>
        <Reveal delay={150} className="flex flex-col justify-center gap-5 text-[16.5px] leading-relaxed text-neutral-700">
          {intro.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
