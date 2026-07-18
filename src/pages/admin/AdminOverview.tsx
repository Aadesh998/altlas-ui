import { CalendarCheck2, IndianRupee, MessageSquareText, Users } from 'lucide-react'
import { getAllBookings, getAllUsers } from '@/lib/auth'
import { getCustomRequests } from '@/lib/customRequests'

function parseDeposit(fare: string): number {
  const match = fare.match(/paid:\s*₹([\d,]+)/)
  return match ? Number(match[1].replace(/,/g, '')) : 0
}

export default function AdminOverview() {
  const bookings = getAllBookings()
  const requests = getCustomRequests()
  const users = getAllUsers()
  const totalDeposits = bookings.reduce((sum, b) => sum + parseDeposit(b.fare), 0)

  const cards = [
    { label: 'Registered users', value: users.length, icon: Users },
    { label: 'Total bookings', value: bookings.length, icon: CalendarCheck2 },
    { label: 'Deposits collected', value: `₹${totalDeposits.toLocaleString('en-IN')}`, icon: IndianRupee },
    { label: 'Custom itinerary requests', value: requests.length, icon: MessageSquareText },
  ]

  return (
    <div>
      <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">Overview</h1>
      <p className="mt-1 text-[14.5px] text-neutral-500">A snapshot of bookings, requests and accounts.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#060650]/5 text-[#060650]">
              <c.icon className="h-[18px] w-[18px]" />
            </span>
            <p className="mt-4 font-display text-2xl font-semibold text-neutral-900">{c.value}</p>
            <p className="mt-1 text-[13px] text-neutral-500">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <h2 className="font-display text-[1.2rem] font-medium text-neutral-900">Latest bookings</h2>
        {bookings.length === 0 ? (
          <p className="mt-3 text-[14px] text-neutral-500">No bookings yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {bookings.slice(0, 5).map((b) => (
              <div key={b.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-[14px] font-medium text-neutral-900">{b.carName}</p>
                  <p className="text-[12.5px] text-neutral-500">{b.userName} · {b.userPhone}</p>
                </div>
                <p className="text-[13.5px] font-medium text-neutral-700">{b.fare}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
