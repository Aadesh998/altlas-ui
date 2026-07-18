import { createSingletonStore } from '@/lib/dataStore'
import { HOMEPAGE_CONTENT_SEED, type HomepageContent } from '@/data/homepageContent'

export const homepageContentStore = createSingletonStore<HomepageContent>('axle_homepage_content', HOMEPAGE_CONTENT_SEED)
