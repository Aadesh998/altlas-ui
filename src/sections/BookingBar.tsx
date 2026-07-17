import { useState, type FormEvent } from 'react'
import { CalendarDays, CheckCircle2, MapPin, Search, Users } from 'lucide-react'
import Reveal from '@/components/Reveal'

const inputCls =
  'w-full bg-transparent text-[15.5px] font-medium text-neutral-900 placeholder:font-normal placeholder:text-neutral-400 focus:outline-none'

export default function BookingBar() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [when, setWhen] = useState('')
  const [guests, setGuests] = useState('2 passengers')
  const [confirmed, setConfirmed] = useState<string | null>(null)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const from = pickup.trim() || 'Your location'
    const to = dropoff.trim() || 'your destination'
    setConfirmed(`${from} → ${to} · ${when || 'As soon as possible'} · ${guests}`)
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="book" className="bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="mb-5 text-center text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">
            Check availability now
          </p>
          <form
            onSubmit={submit}
            className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-200 rounded-2xl bg-white shadow-[0_18px_50px_-20px_rgba(6,6,80,0.25)] ring-1 ring-black/5 md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:divide-x md:divide-y-0"
          >
            <label className="flex items-center gap-3 px-6 py-5">
              <MapPin className="h-5 w-5 shrink-0 text-[#2323d6]" />
              <span className="w-full">
                <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Pickup</span>
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Enter pickup point"
                  className={inputCls}
                />
              </span>
            </label>
            <label className="flex items-center gap-3 px-6 py-5">
              <MapPin className="h-5 w-5 shrink-0 text-neutral-300" />
              <span className="w-full">
                <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Drop-off</span>
                <input
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  placeholder="Where to?"
                  className={inputCls}
                />
              </span>
            </label>
            <label className="flex items-center gap-3 px-6 py-5">
              <CalendarDays className="h-5 w-5 shrink-0 text-neutral-300" />
              <span className="w-full">
                <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-neutral-400">When</span>
                <input
                  type="datetime-local"
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                  className={`${inputCls} text-neutral-900`}
                />
              </span>
            </label>
            <label className="flex items-center gap-3 px-6 py-5">
              <Users className="h-5 w-5 shrink-0 text-neutral-300" />
              <span className="w-full">
                <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Who</span>
                <select value={guests} onChange={(e) => setGuests(e.target.value)} className={inputCls}>
                  <option>1 passenger</option>
                  <option>2 passengers</option>
                  <option>3 passengers</option>
                  <option>4 passengers</option>
                  <option>5+ passengers</option>
                </select>
              </span>
            </label>
            <div className="flex items-stretch p-3">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2323d6] px-7 py-4 text-[15px] font-medium text-white transition-all hover:bg-[#1a1ab8] md:w-auto"
              >
                <Search className="h-4 w-4" />
                Find Your Car
              </button>
            </div>
          </form>
          {confirmed && (
            <p className="mx-auto mt-5 flex max-w-5xl items-center justify-center gap-2 text-center text-[14.5px] text-neutral-600">
              <CheckCircle2 className="h-4 w-4 text-[#00b67a]" />
              <span>
                Cars available for <span className="font-semibold text-neutral-900">{confirmed}</span> — pick your class below.
              </span>
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
