import { useState, type FormEvent } from 'react'
import { AlertCircle, CalendarDays, Gauge, IndianRupee, MapPin, Moon, ParkingSquare, Search, Users } from 'lucide-react'
import Reveal from '@/components/Reveal'
import SmartLink from '@/components/SmartLink'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { estimateFare, type EstimateVehicle } from '@/lib/fareEstimate'

const GUEST_OPTIONS = ['1 passenger', '2 passengers', '3 passengers', '4 passengers', '5+ passengers']
const VEHICLES: EstimateVehicle[] = ['Sedan', 'SUV']

const inputCls =
  'w-full bg-transparent text-[15.5px] font-medium text-neutral-900 placeholder:font-normal placeholder:text-neutral-400 focus:outline-none'

export default function BookingBar() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [when, setWhen] = useState('')
  const [guests, setGuests] = useState('2 passengers')
  const [submittedTrip, setSubmittedTrip] = useState<{ pickup: string; dropoff: string; when: string } | null>(null)
  const [vehicle, setVehicle] = useState<EstimateVehicle>('Sedan')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!pickup.trim() || !dropoff.trim()) {
      setError('Please enter both a pickup and a drop-off location to get a fare estimate.')
      setSubmittedTrip(null)
      return
    }
    setError('')
    setSubmittedTrip({ pickup: pickup.trim(), dropoff: dropoff.trim(), when })
    requestAnimationFrame(() => {
      document.getElementById('fare-estimate')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const fare = submittedTrip
    ? estimateFare(submittedTrip.pickup, submittedTrip.dropoff, submittedTrip.when, vehicle)
    : null

  return (
    <section id="book" className="scroll-mt-24 bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="mb-5 text-center text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">
            Check availability now
          </p>
          <form
            onSubmit={submit}
            className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-200 rounded-2xl bg-white shadow-[0_18px_50px_-20px_rgba(6,6,80,0.25)] ring-1 ring-black/5 md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:divide-x md:divide-y-0"
          >
            <label className={`flex items-center gap-3 px-6 py-5 ${error && !pickup.trim() ? 'bg-red-50/60' : ''}`}>
              <MapPin className={`h-5 w-5 shrink-0 ${error && !pickup.trim() ? 'text-red-400' : 'text-[#2323d6]'}`} />
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
            <label className={`flex items-center gap-3 px-6 py-5 ${error && !dropoff.trim() ? 'bg-red-50/60' : ''}`}>
              <MapPin className={`h-5 w-5 shrink-0 ${error && !dropoff.trim() ? 'text-red-400' : 'text-neutral-300'}`} />
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
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="h-auto w-full border-none p-0 shadow-none focus-visible:ring-0 [&>svg]:hidden">
                    <SelectValue className={inputCls} />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={8}>
                    {GUEST_OPTIONS.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

          {error && (
            <p className="mx-auto mt-5 flex max-w-5xl items-center justify-center gap-2 text-center text-[14.5px] text-red-600">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}

          {submittedTrip && fare && (
            <div id="fare-estimate" className="mx-auto mt-8 max-w-3xl scroll-mt-28 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-neutral-500">
                    Estimated fare
                  </p>
                  <p className="mt-2 text-[15px] text-neutral-700">
                    <span className="font-semibold text-neutral-900">{submittedTrip.pickup}</span>
                    {' → '}
                    <span className="font-semibold text-neutral-900">{submittedTrip.dropoff}</span>
                  </p>
                  <p className="mt-1 text-[13.5px] text-neutral-500">
                    {submittedTrip.when
                      ? new Date(submittedTrip.when).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
                      : 'As soon as possible'}{' '}
                    · {guests}
                  </p>
                </div>
                <div className="flex gap-2">
                  {VEHICLES.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVehicle(v)}
                      className={`rounded-full px-4 py-2 text-[13.5px] font-medium transition-all ${
                        vehicle === v
                          ? 'bg-[#060650] text-white'
                          : 'bg-neutral-50 text-neutral-600 ring-1 ring-neutral-200 hover:ring-neutral-400'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-2.5 border-t border-neutral-100 pt-6 text-[14px]">
                <p className="flex items-center justify-between text-neutral-600">
                  <span className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-[#2323d6]" />
                    Estimated distance
                  </span>
                  <span className="font-medium text-neutral-900">~{fare.distanceKm} km</span>
                </p>
                <p className="flex items-center justify-between text-neutral-600">
                  <span>Base fare ({fare.distanceKm} km × ₹{fare.perKmRate}/km)</span>
                  <span className="font-medium text-neutral-900">₹{fare.baseFare.toLocaleString('en-IN')}</span>
                </p>
                <p className="flex items-center justify-between text-neutral-600">
                  <span className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-[#2323d6]" />
                    Driver allowance
                  </span>
                  <span className="font-medium text-neutral-900">₹{fare.driverAllowance}</span>
                </p>
                <p className="flex items-center justify-between text-neutral-600">
                  <span className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-[#2323d6]" />
                    Night charge {fare.isNight ? '(10 PM – 6 AM pickup)' : ''}
                  </span>
                  <span className="font-medium text-neutral-900">
                    {fare.isNight ? `₹${fare.nightCharge}` : 'Not applicable'}
                  </span>
                </p>
                <p className="flex items-center justify-between text-neutral-600">
                  <span className="flex items-center gap-2">
                    <ParkingSquare className="h-4 w-4 text-[#2323d6]" />
                    Toll & parking (estimated)
                  </span>
                  <span className="font-medium text-neutral-900">₹{fare.tollParkingEstimate}</span>
                </p>

                <div className="my-3 h-px bg-neutral-100" />

                <p className="flex items-center justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">₹{fare.subtotal.toLocaleString('en-IN')}</span>
                </p>
                <p className="flex items-center justify-between text-neutral-600">
                  <span>GST ({fare.gstRate * 100}%)</span>
                  <span className="font-medium text-neutral-900">₹{fare.gst.toLocaleString('en-IN')}</span>
                </p>

                <div className="my-3 h-px bg-neutral-100" />

                <p className="flex items-center justify-between text-[16px]">
                  <span className="font-semibold text-neutral-900">Total estimated fare</span>
                  <span className="font-display text-2xl font-semibold text-[#2323d6]">
                    ₹{fare.total.toLocaleString('en-IN')}
                  </span>
                </p>
              </div>

              <p className="mt-5 text-[12.5px] leading-relaxed text-neutral-400">
                This is an estimate based on approximate distance. Final fare is confirmed on actual km travelled;
                toll and parking are billed at actual cost.
              </p>

              <SmartLink
                href={`/book-package?type=custom&vehicle=${vehicle}&pickup=${encodeURIComponent(submittedTrip.pickup)}&dropoff=${encodeURIComponent(submittedTrip.dropoff)}&when=${encodeURIComponent(submittedTrip.when)}`}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#2323d6] px-6 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
              >
                Book this {vehicle.toLowerCase()} for this trip
              </SmartLink>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
