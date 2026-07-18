import { createLocalStore } from '@/lib/dataStore'
import { SERVICE_PACKAGES, type ServicePackage } from '@/data/servicePackages'

export const servicePackagesStore = createLocalStore<ServicePackage>('axle_service_packages', SERVICE_PACKAGES)
