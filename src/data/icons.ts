import { Building2, Flower2, Landmark, MapPin, Mountain, Sparkles, Waves, type LucideIcon } from 'lucide-react'

export const ICON_OPTIONS = ['Mountain', 'Flower2', 'Landmark', 'Waves', 'Building2', 'Sparkles', 'MapPin'] as const

export type IconName = (typeof ICON_OPTIONS)[number]

export const ICON_MAP: Record<IconName, LucideIcon> = {
  Mountain,
  Flower2,
  Landmark,
  Waves,
  Building2,
  Sparkles,
  MapPin,
}

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name as IconName] ?? MapPin
}
