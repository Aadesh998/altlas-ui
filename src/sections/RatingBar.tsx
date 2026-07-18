import { Star } from 'lucide-react'
import { homepageContentStore } from '@/lib/homepageContentStore'
import { useSingletonStore } from '@/lib/dataStore'

export default function RatingBar() {
  const { value: content } = useSingletonStore(homepageContentStore)
  const { ratingBar } = content

  return (
    <div className="border-b border-neutral-100 bg-white">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-3 gap-y-2 px-5 py-5 text-[14px] text-neutral-600 md:px-10">
        <span className="font-semibold text-neutral-900">Excellent {ratingBar.ratingValue}</span>
        <span className="flex items-center gap-0.5" aria-label={`${ratingBar.ratingValue} out of 5 stars`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-4 w-4 fill-[#00b67a] text-[#00b67a]" />
          ))}
        </span>
        <span>
          See our <span className="font-semibold underline underline-offset-2">{ratingBar.reviewCount} reviews</span> on Google
        </span>
      </div>
    </div>
  )
}
