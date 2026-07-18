export interface ServiceCategoryData {
  slug: string
  title: string
  image: string
  cardText: string
  tagline: string
}

export const SERVICE_CATEGORIES: ServiceCategoryData[] = [
  {
    slug: 'city-rides',
    title: 'City Rides',
    image: '/images/service-city.jpg',
    cardText:
      'On-demand cars across the city, any hour. Your chauffeur arrives in minutes, the route is planned, the price is fixed before you step in.',
    tagline: 'Sightseeing packages covering Delhi and other cities — one car, one driver, a fixed sightseeing plan.',
  },
  {
    slug: 'airport-transfers',
    title: 'Airport Transfers',
    image: '/images/service-airport.jpg',
    cardText:
      'Flight-tracked pickups, meet & greet at arrivals, and an hour of free waiting. Early or delayed — we’re there when you land.',
    tagline: 'Pickup and drop to IGI Airport — Terminal 3 (international) and Terminal 1 (domestic).',
  },
  {
    slug: 'chauffeur-hire',
    title: 'Chauffeur Hire',
    image: '/images/service-chauffeur.jpg',
    cardText: 'A dedicated car and driver by the hour or the day. Meetings, errands, evenings out — your chauffeur waits, you never do.',
    tagline: 'A dedicated car and driver by the hour, the day, or with an overnight halt.',
  },
  {
    slug: 'corporate-travel',
    title: 'Corporate Travel',
    image: '/images/chauffeur.png',
    cardText:
      'Invoiced accounts, priority booking and multi-rider management for teams. One dashboard for every ride your business takes.',
    tagline: 'Multi-meeting itineraries for business travel, billed by time and distance.',
  },
  {
    slug: 'events-weddings',
    title: 'Events & Weddings',
    image: '/images/fleet-sedan.png',
    cardText:
      'Decorated bridal cars, baraat convoys and coordinated guest fleets — booked by the day, with a driver in formal attire.',
    tagline: 'Decorated bridal cars, baraat convoys and guest fleets — booked by the day, with a driver in formal attire.',
  },
]
