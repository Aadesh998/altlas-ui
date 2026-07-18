import { useEffect, useState } from 'react'
import type { CarouselApi } from '@/components/ui/carousel'

/** Drives a shadcn/embla Carousel forward on a timer so it advances without any user interaction. */
export function useAutoAdvance(delayMs = 4500) {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return
    const id = setInterval(() => {
      if (api.canScrollNext()) api.scrollNext()
      else api.scrollTo(0)
    }, delayMs)
    return () => clearInterval(id)
  }, [api, delayMs])

  return { api, setApi }
}
