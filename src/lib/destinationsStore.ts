import { createLocalStore } from '@/lib/dataStore'
import { DESTINATIONS, type Destination } from '@/data/destinations'

export const destinationsStore = createLocalStore<Destination>('axle_destinations', DESTINATIONS)
