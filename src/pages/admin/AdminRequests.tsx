import { Car, MapPin, Phone, Users } from 'lucide-react'
import { getCustomRequests } from '@/lib/customRequests'

export default function AdminRequests() {
  const requests = getCustomRequests()

  return (
    <div>
      <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">Custom itinerary requests</h1>
      <p className="mt-1 text-[14.5px] text-neutral-500">
        Submitted from the "Don't see the itinerary you want?" form on the Tours page.
      </p>

      {requests.length === 0 ? (
        <p className="mt-8 text-[14.5px] text-neutral-500">No custom requests yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {requests.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center justify-between">
                <p className="font-display text-[1.1rem] font-medium text-neutral-900">{r.name}</p>
                <span className="text-[12px] text-neutral-400">
                  {new Date(r.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-[13.5px] text-neutral-500">
                <Phone className="h-3.5 w-3.5" />
                {r.phone}
              </p>
              <div className="mt-4 space-y-1.5 text-[13.5px] text-neutral-600">
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#2323d6]" />
                  {r.pickupCity || '—'} → {r.destination || '—'}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 shrink-0 text-[#2323d6]" />
                  {r.days || '—'} days · {r.travelers || '—'} travelers
                </p>
                <p className="flex items-center gap-2">
                  <Car className="h-3.5 w-3.5 shrink-0 text-[#2323d6]" />
                  {r.carType}
                </p>
              </div>
              {r.message && (
                <p className="mt-3 rounded-lg bg-neutral-50 p-3 text-[13px] text-neutral-600">{r.message}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
