import { createLocalStore } from '@/lib/dataStore'
import { FAQS, type Faq } from '@/data/faqs'

export const faqsStore = createLocalStore<Faq>('axle_faqs', FAQS)
