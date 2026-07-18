const STORAGE_KEY = 'axle_custom_requests'

export interface CustomRequest {
  id: string
  name: string
  phone: string
  pickupCity: string
  destination: string
  days: string
  travelers: string
  carType: string
  message: string
  createdAt: string
}

export function getCustomRequests(): CustomRequest[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function addCustomRequest(data: Omit<CustomRequest, 'id' | 'createdAt'>) {
  const requests = getCustomRequests()
  const next: CustomRequest = { ...data, id: `${Date.now()}`, createdAt: new Date().toISOString() }
  requests.unshift(next)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
}
