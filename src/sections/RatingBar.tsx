import { Star } from 'lucide-react'

export default function RatingBar() {
  return (
    <div className="border-b border-neutral-100 bg-white">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-3 gap-y-2 px-5 py-5 text-[14px] text-neutral-600 md:px-10">
        <span className="font-semibold text-neutral-900">Excellent 4.9</span>
        <span className="flex items-center gap-0.5" aria-label="4.9 out of 5 stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-4 w-4 fill-[#00b67a] text-[#00b67a]" />
          ))}
        </span>
        <span>
          See our <span className="font-semibold underline underline-offset-2">2,300 reviews</span> on Google
        </span>
      </div>
    </div>
  )
}
