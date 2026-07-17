import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Reveal from '@/components/Reveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (email.trim()) setDone(true)
  }

  return (
    <section className="border-t border-white/10 bg-[#060650]">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-10 md:py-20">
        <Reveal>
          <h2 className="font-display text-[2.2rem] font-medium leading-tight text-white md:text-[2.8rem]">
            Best rides only.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
            First look at new cars, seasonal deals, and routes our chauffeurs love — straight to
            your inbox.
          </p>
        </Reveal>
        <Reveal delay={120}>
          {done ? (
            <p className="flex items-center gap-3 rounded-xl bg-white/10 px-6 py-5 text-[15px] text-white">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#00b67a]" />
              Valuable updates and insider tips, tailored just for you. You’re on the list!
            </p>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your e-mail"
                className="h-14 flex-1 rounded-lg bg-white px-5 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2323d6]"
              />
              <button
                type="submit"
                className="h-14 rounded-lg bg-[#2323d6] px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#1a1ab8]"
              >
                Subscribe
              </button>
            </form>
          )}
          {!done && (
            <p className="mt-3 text-[13px] text-white/50">
              Valuable updates and insider tips tailored just for you!
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
