import { createLocalStore } from '@/lib/dataStore'
import { SERVICE_CATEGORIES, type ServiceCategoryData } from '@/data/serviceCategories'

export const serviceCategoriesStore = createLocalStore<ServiceCategoryData>('axle_service_categories', SERVICE_CATEGORIES)
