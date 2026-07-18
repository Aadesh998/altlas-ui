import type { ReactNode } from 'react'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'

interface LegalSection {
  heading: string
  body: ReactNode
}

interface LegalLayoutProps {
  eyebrow: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export default function LegalLayout({ eyebrow, title, updated, intro, sections }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main>
        <section className="bg-[#060650] pb-16 pt-36 text-white md:pb-20 md:pt-44">
          <div className="mx-auto max-w-[900px] px-5 md:px-10">
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-white/60">{eyebrow}</p>
            <h1 className="mt-4 font-display text-[2.4rem] font-medium leading-tight md:text-[3rem]">{title}</h1>
            <p className="mt-3 text-[14px] text-white/60">Last updated {updated}</p>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-white/80">{intro}</p>
          </div>
        </section>

        <section className="pb-24 pt-16 md:pb-32 md:pt-20">
          <div className="mx-auto max-w-[900px] px-5 md:px-10">
            <div className="space-y-12">
              {sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="font-display text-[1.5rem] font-medium text-neutral-900 md:text-[1.7rem]">
                    {s.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-neutral-600">{s.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
