import { serviceCategoriesStore } from '@/lib/serviceCategoriesStore'
import { destinationsStore } from '@/lib/destinationsStore'

export interface ImageSlot {
  key: string
  label: string
  group: string
  default: string
}

/** Computed at call time (not a static array) so newly admin-added destinations get image slots too. */
export function getImageSlots(): ImageSlot[] {
  return [
    { key: 'hero.main', label: 'Homepage hero banner', group: 'Hero', default: '/images/hero.png' },
    ...serviceCategoriesStore.getAll().map((s) => ({
      key: `services.${s.slug}`,
      label: s.title,
      group: 'Services',
      default: s.image,
    })),
    ...destinationsStore.getAll().flatMap((d) =>
      d.images.map((img, i) => ({
        key: `destination.${d.slug}.${i}`,
        label: `${d.name} — photo ${i + 1}`,
        group: `Destinations · ${d.name}`,
        default: img,
      })),
    ),
  ]
}
