import { useMemo, useState, type FormEvent } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import { CheckCircle2, Gauge, IndianRupee, Lock, Moon, ParkingSquare } from 'lucide-react'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import SmartLink from '@/components/SmartLink'
import { estimateFare, type EstimateVehicle } from '@/lib/fareEstimate'
import { useAuth } from '@/lib/auth'
import { servicePackagesStore } from '@/lib/servicePackagesStore'
import { tourPackagesStore } from '@/lib/tourPackagesStore'
import { serviceCategoriesStore } from '@/lib/serviceCategoriesStore'
import { useLocalStore } from '@/lib/dataStore'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

const VEHICLES: EstimateVehicle[] = ['Sedan', 'SUV']

function parseInr(value: string): number {
  return Number(value.replace(/[^\d]/g, '')) || 0
}

export default function PackageBooking() {
  const [params] = useSearchParams()
  const location = useLocation()
  const { user, addBooking } = useAuth()

  const type = params.get('type')
  const slug = params.get('slug')
  const presetVehicle = params.get('vehicle')
  const { items: SERVICE_PACKAGES } = useLocalStore(servicePackagesStore)
  const { items: TOUR_PACKAGES } = useLocalStore(tourPackagesStore)
  const { items: SERVICE_CATEGORIES } = useLocalStore(serviceCategoriesStore)

  const servicePackage = type === 'service' ? SERVICE_PACKAGES.find((p) => p.slug === slug) : undefined
  const tourPackage = type === 'tour' ? TOUR_PACKAGES.find((p) => p.slug === slug) : undefined
  const fixedPackage = servicePackage ?? tourPackage
  const categoryLabel = servicePackage
    ? SERVICE_CATEGORIES.find((c) => c.slug === servicePackage.category)?.title
    : tourPackage
      ? tourPackage.destinations.join(' · ')
      : undefined

  const [mode, setMode] = useState<'package' | 'custom'>(fixedPackage ? 'package' : 'custom')

  // Custom estimate fields — pre-filled from the homepage fare estimate, if the user came from there
  const [pickup, setPickup] = useState(params.get('pickup') ?? '')
  const [dropoff, setDropoff] = useState(params.get('dropoff') ?? '')
  const [when, setWhen] = useState(params.get('when') ?? '')
  const [vehicle, setVehicle] = useState<EstimateVehicle>(presetVehicle === 'SUV' ? 'SUV' : 'Sedan')
  const customFare = useMemo(() => estimateFare(pickup, dropoff, when, vehicle), [pickup, dropoff, when, vehicle])
  const customReady = pickup.trim().length > 0 && dropoff.trim().length > 0

  const fixedPrice = servicePackage?.basePrice ?? tourPackage?.indicativeFrom
  const total = mode === 'package' && fixedPrice ? parseInr(fixedPrice) : customFare.total
  const deposit = Math.round(total * 0.1)
  const remaining = total - deposit

  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const redirectHere = `${location.pathname}${location.search}`

  const submit = (e: FormEvent) => {
    e.preventDefault()
    addBooking({
      id: `${Date.now()}`,
      carName: mode === 'package' && fixedPackage ? fixedPackage.title : 'Custom trip estimate',
      rideType: mode === 'package' ? categoryLabel ?? 'Package' : 'Custom estimate',
      fare: `₹${total.toLocaleString('en-IN')} (10% paid: ₹${deposit.toLocaleString('en-IN')})`,
      pickup: mode === 'custom' ? pickup : servicePackage?.route ?? tourPackage?.destinations.join(', ') ?? '-',
      dropoff: mode === 'custom' ? dropoff : '-',
      when: when ? new Date(when).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : 'As soon as possible',
      guests: mode === 'custom' ? vehicle : servicePackage?.vehicle ?? tourPackage?.carType ?? '-',
      createdAt: new Date().toISOString(),
    })
    setConfirmed(true)
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main>
        <section className="bg-[#060650] pb-14 pt-36 text-white md:pb-16 md:pt-44">
          <div className="mx-auto max-w-[1000px] px-5 md:px-10">
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-white/60">Book & pay</p>
            <h1 className="mt-4 font-display text-[2.2rem] font-medium leading-tight md:text-[2.8rem]">
              Confirm your booking
            </h1>
            <p className="mt-4 max-w-xl text-[14.5px] text-white/60">
              A 10% advance confirms your booking. The remaining balance is paid after the ride.
            </p>
          </div>
        </section>

        <section className="pb-24 pt-14 md:pb-32 md:pt-16">
          <div className="mx-auto max-w-[1000px] px-5 md:px-10">
            {confirmed ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
                <CheckCircle2 className="mx-auto h-14 w-14 text-[#00b67a]" />
                <h2 className="mt-6 font-display text-[1.8rem] font-medium text-neutral-900">Booking confirmed</h2>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600">
                  We've received your 10% advance of{' '}
                  <span className="font-semibold text-neutral-900">₹{deposit.toLocaleString('en-IN')}</span>. The
                  remaining <span className="font-semibold text-neutral-900">₹{remaining.toLocaleString('en-IN')}</span>{' '}
                  is due after the ride.
                </p>
                <SmartLink
                  href="/profile"
                  className="mt-8 inline-block rounded-lg bg-[#2323d6] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
                >
                  View my bookings
                </SmartLink>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
                {/* Summary */}
                <div className="h-fit rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
                  {mode === 'package' && fixedPackage ? (
                    <>
                      {categoryLabel && (
                        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#2323d6]">
                          {categoryLabel}
                        </p>
                      )}
                      <h3 className="mt-2 font-display text-[1.3rem] font-medium text-neutral-900">
                        {fixedPackage.title}
                      </h3>
                      <ul className="mt-4 space-y-1.5 text-[13.5px] text-neutral-600">
                        {(servicePackage?.includes ?? []).map((inc) => (
                          <li key={inc} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00b67a]" />
                            {inc}
                          </li>
                        ))}
                        {tourPackage?.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00b67a]" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={() => setMode('custom')}
                        className="mt-5 text-[13.5px] font-semibold text-[#2323d6] hover:text-[#1a1ab8]"
                      >
                        Need something different? Get a custom estimate instead →
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#2323d6]">
                        Custom estimate
                      </p>
                      <h3 className="mt-2 font-display text-[1.3rem] font-medium text-neutral-900">
                        Tell us your trip details
                      </h3>
                      <div className="mt-4 space-y-4">
                        <label className="block">
                          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                            Pickup
                          </span>
                          <input
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            placeholder="Enter pickup point"
                            className={inputCls}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                            Drop-off
                          </span>
                          <input
                            value={dropoff}
                            onChange={(e) => setDropoff(e.target.value)}
                            placeholder="Where to?"
                            className={inputCls}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                            Date & time
                          </span>
                          <input
                            type="datetime-local"
                            value={when}
                            onChange={(e) => setWhen(e.target.value)}
                            className={inputCls}
                          />
                        </label>
                        <div className="flex gap-2">
                          {VEHICLES.map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setVehicle(v)}
                              className={`flex-1 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-all ${
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

                      {fixedPackage && (
                        <button
                          type="button"
                          onClick={() => setMode('package')}
                          className="mt-5 text-[13.5px] font-semibold text-[#2323d6] hover:text-[#1a1ab8]"
                        >
                          ← Back to {fixedPackage.title}
                        </button>
                      )}
                    </>
                  )}

                  <div className="my-5 h-px bg-neutral-100" />

                  {mode === 'custom' && (
                    <div className="space-y-2 text-[13.5px] text-neutral-600">
                      <p className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Gauge className="h-3.5 w-3.5 text-[#2323d6]" />
                          Estimated distance
                        </span>
                        <span className="font-medium text-neutral-900">~{customFare.distanceKm} km</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span>Base fare</span>
                        <span className="font-medium text-neutral-900">₹{customFare.baseFare.toLocaleString('en-IN')}</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <IndianRupee className="h-3.5 w-3.5 text-[#2323d6]" />
                          Driver allowance
                        </span>
                        <span className="font-medium text-neutral-900">₹{customFare.driverAllowance}</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Moon className="h-3.5 w-3.5 text-[#2323d6]" />
                          Night charge
                        </span>
                        <span className="font-medium text-neutral-900">
                          {customFare.isNight ? `₹${customFare.nightCharge}` : 'Not applicable'}
                        </span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <ParkingSquare className="h-3.5 w-3.5 text-[#2323d6]" />
                          Toll & parking (est.)
                        </span>
                        <span className="font-medium text-neutral-900">₹{customFare.tollParkingEstimate}</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span>GST (5%)</span>
                        <span className="font-medium text-neutral-900">₹{customFare.gst}</span>
                      </p>
                    </div>
                  )}

                  <div className="mt-4 space-y-1.5 border-t border-neutral-100 pt-4 text-[14px]">
                    <p className="flex items-baseline justify-between text-neutral-600">
                      <span>Total fare{mode === 'custom' ? ' (estimated)' : ''}</span>
                      <span className="font-semibold text-neutral-900">₹{total.toLocaleString('en-IN')}</span>
                    </p>
                    <p className="flex items-baseline justify-between text-neutral-600">
                      <span>Due now (10% advance)</span>
                      <span className="font-semibold text-neutral-900">₹{deposit.toLocaleString('en-IN')}</span>
                    </p>
                    <p className="flex items-baseline justify-between text-neutral-500">
                      <span>Remaining, paid after ride</span>
                      <span>₹{remaining.toLocaleString('en-IN')}</span>
                    </p>
                  </div>
                </div>

                {/* Payment */}
                {!user ? (
                  <div className="flex h-fit flex-col items-start rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
                      <Lock className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-[1.4rem] font-medium text-neutral-900">
                      Sign in to pay & confirm
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-neutral-600">
                      We'll use your account to send booking confirmations and keep a record of your trips.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <SmartLink
                        href={`/login?redirect=${encodeURIComponent(redirectHere)}`}
                        className="rounded-lg bg-[#2323d6] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
                      >
                        Sign in
                      </SmartLink>
                      <SmartLink
                        href={`/signup?redirect=${encodeURIComponent(redirectHere)}`}
                        className="rounded-lg border border-neutral-200 px-6 py-3 text-[15px] font-medium text-neutral-700 transition-colors hover:border-neutral-400"
                      >
                        Create an account
                      </SmartLink>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submit} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
                    <h3 className="font-display text-[1.4rem] font-medium text-neutral-900">Payment</h3>
                    <p className="mt-1 text-[13px] text-neutral-500">
                      {/* TODO: replace this mock card form with the real Razorpay checkout once backend keys are wired up */}
                      Payments are processed securely via Razorpay. This is a demo checkout — no card is charged yet.
                    </p>
                    <div className="mt-5 grid gap-4">
                      <label className="block">
                        <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                          Card number
                        </span>
                        <input
                          value={card}
                          onChange={(e) => setCard(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          inputMode="numeric"
                          className={inputCls}
                          required
                        />
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                            Expiry
                          </span>
                          <input
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className={inputCls}
                            required
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                            CVV
                          </span>
                          <input
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="123"
                            inputMode="numeric"
                            className={inputCls}
                            required
                          />
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={mode === 'custom' && !customReady}
                      className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2323d6] px-7 py-4 text-[15px] font-medium text-white transition-all hover:bg-[#1a1ab8] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Lock className="h-4 w-4" />
                      Pay ₹{deposit.toLocaleString('en-IN')} (10%) & confirm
                    </button>
                    {mode === 'custom' && !customReady && (
                      <p className="mt-3 text-[13px] text-red-600">
                        Enter a pickup and drop-off location to calculate your estimate.
                      </p>
                    )}
                    <p className="mt-4 text-[12px] leading-relaxed text-neutral-400">
                      Free cancellation within 1 hour of booking. After that, 9% of your total fare is refundable
                      and 1% is retained as a cancellation fee. See our{' '}
                      <SmartLink href="/#faqs" className="underline hover:text-neutral-600">
                        FAQs
                      </SmartLink>{' '}
                      for full details.
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
