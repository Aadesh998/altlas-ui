export type EstimateVehicle = 'Sedan' | 'SUV'

export interface FareBreakdown {
  distanceKm: number
  perKmRate: number
  baseFare: number
  driverAllowance: number
  nightCharge: number
  isNight: boolean
  tollParkingEstimate: number
  subtotal: number
  gstRate: number
  gst: number
  total: number
}

export const VEHICLE_RATES: Record<
  EstimateVehicle,
  { perKm: number; driverAllowance: number; nightCharge: number; tollParking: number }
> = {
  Sedan: { perKm: 14, driverAllowance: 150, nightCharge: 250, tollParking: 100 },
  SUV: { perKm: 18, driverAllowance: 180, nightCharge: 300, tollParking: 150 },
}

const RATES = VEHICLE_RATES

const GST_RATE = 0.05

/**
 * Deterministic mock distance so the same pickup/drop pair always estimates
 * the same km — stands in until this is wired to a real routing/maps API.
 */
export function estimateDistanceKm(pickup: string, dropoff: string): number {
  const text = `${pickup.trim().toLowerCase()}|${dropoff.trim().toLowerCase()}`
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0
  }
  return 8 + (hash % 35) // 8-42 km
}

function isNightPickup(when: string): boolean {
  if (!when) return false
  const hour = new Date(when).getHours()
  return Number.isFinite(hour) && (hour >= 22 || hour < 6)
}

export function estimateFare(pickup: string, dropoff: string, when: string, vehicle: EstimateVehicle): FareBreakdown {
  const rate = RATES[vehicle]
  const distanceKm = estimateDistanceKm(pickup || 'default-pickup', dropoff || 'default-dropoff')
  const baseFare = distanceKm * rate.perKm
  const isNight = isNightPickup(when)
  const nightCharge = isNight ? rate.nightCharge : 0
  const tollParkingEstimate = rate.tollParking
  const subtotal = baseFare + rate.driverAllowance + nightCharge + tollParkingEstimate
  const gst = Math.round(subtotal * GST_RATE)
  const total = subtotal + gst

  return {
    distanceKm,
    perKmRate: rate.perKm,
    baseFare,
    driverAllowance: rate.driverAllowance,
    nightCharge,
    isNight,
    tollParkingEstimate,
    subtotal,
    gstRate: GST_RATE,
    gst,
    total,
  }
}
