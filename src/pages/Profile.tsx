import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { CalendarDays, CheckCircle2, LogOut, Mail, MapPin, Phone, ShieldCheck, User } from 'lucide-react'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import SmartLink from '@/components/SmartLink'
import { useAuth } from '@/lib/auth'

export default function Profile() {
  const { user, ready, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (ready && !user) navigate('/login?redirect=/profile')
  }, [ready, user, navigate])

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main>
        <section className="bg-[#060650] pb-14 pt-36 text-white md:pb-16 md:pt-44">
          <div className="mx-auto max-w-[1000px] px-5 md:px-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-lg font-semibold">
                  {user.name.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <h1 className="font-display text-[1.8rem] font-medium leading-tight md:text-[2.2rem]">
                    {user.name}
                  </h1>
                  <p className="text-[14px] text-white/60">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-[14px] font-medium transition-colors hover:border-white"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        </section>

        <section className="pb-24 pt-14 md:pb-32 md:pt-16">
          <div className="mx-auto max-w-[1000px] px-5 md:px-10">
            <h2 className="font-display text-[1.5rem] font-medium text-neutral-900">Account details</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                  <Phone className="h-3.5 w-3.5" />
                  Mobile number
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[15.5px] font-medium text-neutral-900">{user.phone}</span>
                  {user.phoneVerified && (
                    <span className="flex items-center gap-1.5 rounded-full bg-[#00b67a]/10 px-3 py-1 text-[12.5px] font-semibold text-[#00b67a]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[15.5px] font-medium text-neutral-900">{user.email}</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[12.5px] font-semibold text-neutral-500">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Used for password reset
                  </span>
                </div>
              </div>
            </div>

            <h2 className="mt-12 font-display text-[1.5rem] font-medium text-neutral-900">My bookings</h2>

            {user.bookings.length === 0 ? (
              <div className="mt-6 flex flex-col items-start rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
                  <User className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[15px] text-neutral-600">You haven't booked a ride yet.</p>
                <SmartLink
                  href="#services"
                  className="mt-5 rounded-lg bg-[#2323d6] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
                >
                  Browse our services
                </SmartLink>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {user.bookings.map((b) => (
                  <div key={b.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-display text-[1.2rem] font-medium text-neutral-900">{b.carName}</h3>
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-600">
                        {b.rideType}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-neutral-600">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#2323d6]" />
                        {b.pickup} → {b.dropoff}
                      </span>
                      <span className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-[#2323d6]" />
                        {b.when}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4 text-[14px]">
                      <span className="text-neutral-500">{b.guests}</span>
                      <span className="font-display text-lg font-semibold text-neutral-900">{b.fare}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
