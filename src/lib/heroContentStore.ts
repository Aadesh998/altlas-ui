import { createSingletonStore } from '@/lib/dataStore'

export interface HeroContent {
  headingLine1: string
  headingLine2: string
  subtext: string
  ctaText: string
}

const SEED: HeroContent = {
  headingLine1: 'Premium Cab Services,',
  headingLine2: 'Tailored To You.',
  subtext:
    "Glide through the world's busiest cities in immaculate, chauffeur-driven cars. Your personal driver handles every detail, curating journeys you'll actually look forward to.",
  ctaText: 'Book your perfect ride',
}

export const heroContentStore = createSingletonStore<HeroContent>('axle_hero_content', SEED)
