import { createLocalStore } from '@/lib/dataStore'
import { TESTIMONIALS, type Testimonial } from '@/data/testimonials'

export const testimonialsStore = createLocalStore<Testimonial>('axle_testimonials', TESTIMONIALS)
