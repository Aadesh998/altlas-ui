import { MapPin, Phone } from 'lucide-react'
import { getAllBookings } from '@/lib/auth'

export default function AdminBookings() {
  const bookings = getAllBookings()

  return (
    <div>
      <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">Bookings</h1>
      <p className="mt-1 text-[14.5px] text-neutral-500">Every advance-payment booking across all accounts, newest first.</p>

      {bookings.length === 0 ? (
        <p className="mt-8 text-[14.5px] text-neutral-500">No bookings yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          <table className="w-full min-w-[720px] text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-neutral-100 text-[11.5px] uppercase tracking-[0.08em] text-neutral-400">
                <th className="px-5 py-3 font-semibold">Trip / Package</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Route</th>
                <th className="px-5 py-3 font-semibold">When</th>
                <th className="px-5 py-3 font-semibold">Fare</th>
                <th className="px-5 py-3 font-semibold">Booked</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/60">
                  <td className="px-5 py-4">
                    <p className="font-medium text-neutral-900">{b.carName}</p>
                    <p className="text-[12px] text-neutral-500">{b.rideType}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-neutral-800">{b.userName}</p>
                    <p className="flex items-center gap-1.5 text-[12px] text-neutral-500">
                      <Phone className="h-3 w-3" />
                      {b.userPhone}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-neutral-600">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 shrink-0 text-[#2323d6]" />
                      {b.pickup} → {b.dropoff}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-neutral-600">{b.when}</td>
                  <td className="px-5 py-4 font-medium text-neutral-900">{b.fare}</td>
                  <td className="px-5 py-4 text-neutral-500">
                    {new Date(b.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
