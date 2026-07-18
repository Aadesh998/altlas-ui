import { ArrowRight, ChevronDown } from 'lucide-react'
import { useSiteImage } from '@/lib/imageOverrides'
import { heroContentStore } from '@/lib/heroContentStore'
import { useSingletonStore } from '@/lib/dataStore'

export default function Hero() {
  const heroImage = useSiteImage('hero.main', '/images/hero.png')
  const { value: hero } = useSingletonStore(heroContentStore)

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Black luxury sedan driving along a coastal highway at dusk"
          className="hero-zoom h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-28 pt-40 md:px-10">
        <div className="max-w-3xl">
          <h1
            className="font-display text-[2.9rem] font-medium leading-[1.08] text-white opacity-0 sm:text-6xl lg:text-[4.6rem]"
            style={{ animation: 'heroFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.15s forwards' }}
          >
            {hero.headingLine1}
            <br />
            {hero.headingLine2}
          </h1>
          <p
            className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/85 opacity-0"
            style={{ animation: 'heroFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.4s forwards' }}
          >
            {hero.subtext}
          </p>
          <div
            className="mt-12 opacity-0"
            style={{ animation: 'heroFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.65s forwards' }}
          >
            <a
              href="#book"
              className="group inline-flex items-center gap-3 rounded-lg border border-white/60 px-8 py-4 text-[15px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-neutral-900"
            >
              {hero.ctaText}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-white"
        aria-label="Scroll to explore"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/80">Explore</span>
        <span className="scroll-cue flex h-11 w-11 items-center justify-center rounded-full border border-white/40">
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(34px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
