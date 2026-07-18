import { createLocalStore } from '@/lib/dataStore'
import { TOUR_PACKAGES, type TourPackage } from '@/data/tourPackages'

export const tourPackagesStore = createLocalStore<TourPackage>('axle_tour_packages', TOUR_PACKAGES)
