/** Free-form now — category slugs live in the admin-editable serviceCategoriesStore, not a fixed union. */
export type ServiceCategory = string

export interface ServicePackage {
  slug: string
  category: ServiceCategory
  title: string
  vehicle: string
  route?: string
  includes: string[]
  basePrice: string
  extraKmRate: string
  extraHourRate?: string
  nightCharge?: string
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  // City rides / local sightseeing
  {
    slug: 'delhi-sightseeing-5-places-9hr',
    category: 'city-rides',
    title: 'Delhi Sightseeing — 5 Places, 9-Hour Trip',
    vehicle: 'Sedan',
    route: 'Pickup point → 5 sightseeing stops → same pickup point',
    includes: [
      '9-hour trip, same pickup & drop point',
      '5 sightseeing places (e.g. Red Fort, India Gate, Qutub Minar, Lotus Temple, Akshardham)',
      '90 km included',
    ],
    basePrice: '₹2,600',
    extraKmRate: '₹14/km',
    extraHourRate: '₹150/hr',
  },
  {
    slug: 'delhi-sightseeing-3-places-5hr',
    category: 'city-rides',
    title: 'Delhi Sightseeing — 3 Places, Half-Day',
    vehicle: 'Sedan',
    route: 'Pickup point → 3 sightseeing stops → same pickup point',
    includes: ['5-hour trip, same pickup & drop point', '3 sightseeing places', '50 km included'],
    basePrice: '₹1,600',
    extraKmRate: '₹14/km',
    extraHourRate: '₹150/hr',
  },
  {
    slug: 'delhi-sightseeing-6-places-suv',
    category: 'city-rides',
    title: 'Delhi Sightseeing — 6 Places, Full Day (SUV)',
    vehicle: 'SUV',
    route: 'Pickup point → 6 sightseeing stops → same pickup point',
    includes: ['10-hour trip, same pickup & drop point', '6 sightseeing places', '100 km included'],
    basePrice: '₹3,800',
    extraKmRate: '₹18/km',
    extraHourRate: '₹180/hr',
  },

  // Airport transfers
  {
    slug: 'gurgaon-igi-t3',
    category: 'airport-transfers',
    title: 'Gurgaon → IGI Airport (Terminal 3, International)',
    vehicle: 'Sedan',
    route: 'Gurgaon → IGI T3',
    includes: ['One-way drop', '~28 km included', 'Tolls extra, shown before booking'],
    basePrice: '₹1,100',
    extraKmRate: '₹14/km',
  },
  {
    slug: 'gurgaon-igi-t1',
    category: 'airport-transfers',
    title: 'Gurgaon → IGI Airport (Terminal 1, Domestic)',
    vehicle: 'Sedan',
    route: 'Gurgaon → IGI T1',
    includes: ['One-way drop', '~32 km included', 'Tolls extra, shown before booking'],
    basePrice: '₹1,250',
    extraKmRate: '₹14/km',
  },
  {
    slug: 'south-delhi-igi-t3',
    category: 'airport-transfers',
    title: 'South Delhi → IGI Airport (Terminal 3)',
    vehicle: 'Sedan',
    route: 'South Delhi → IGI T3',
    includes: ['One-way drop', '~15 km included'],
    basePrice: '₹750',
    extraKmRate: '₹14/km',
  },
  {
    slug: 'noida-igi-t3',
    category: 'airport-transfers',
    title: 'Noida → IGI Airport (Terminal 3)',
    vehicle: 'Sedan',
    route: 'Noida → IGI T3',
    includes: ['One-way drop', '~35 km included', 'Tolls extra, shown before booking'],
    basePrice: '₹1,450',
    extraKmRate: '₹14/km',
  },
  {
    slug: 'gurgaon-igi-t3-suv',
    category: 'airport-transfers',
    title: 'Gurgaon → IGI Airport (Terminal 3) — SUV',
    vehicle: 'SUV',
    route: 'Gurgaon → IGI T3',
    includes: ['One-way drop', '~28 km included', 'Extra boot space for luggage'],
    basePrice: '₹1,600',
    extraKmRate: '₹18/km',
  },

  // Chauffeur hire
  {
    slug: 'chauffeur-4hr-40km',
    category: 'chauffeur-hire',
    title: 'Chauffeur Hire — 4 Hours / 40 KM',
    vehicle: 'Sedan',
    includes: ['4 hours with driver', '40 km included', 'Errands, meetings or a few stops'],
    basePrice: '₹1,400',
    extraKmRate: '₹14/km',
    extraHourRate: '₹150/hr',
  },
  {
    slug: 'chauffeur-8hr-80km',
    category: 'chauffeur-hire',
    title: 'Chauffeur Hire — 8 Hours / 80 KM',
    vehicle: 'Sedan',
    includes: ['8 hours with driver', '80 km included', 'Full working day coverage'],
    basePrice: '₹2,600',
    extraKmRate: '₹14/km',
    extraHourRate: '₹150/hr',
  },
  {
    slug: 'chauffeur-fullday-night-halt',
    category: 'chauffeur-hire',
    title: 'Chauffeur Hire — Full Day + Night Halt (SUV)',
    vehicle: 'SUV',
    includes: ['12 hours with driver', '120 km included', 'Overnight halt for driver & car'],
    basePrice: '₹5,200',
    extraKmRate: '₹18/km',
    extraHourRate: '₹180/hr',
    nightCharge: '₹500/night',
  },

  // Corporate travel
  {
    slug: 'corporate-gurgaon-delhi-4meetings',
    category: 'corporate-travel',
    title: '4-Seater Sedan — Gurgaon ⇄ Delhi, Multi-Meeting',
    vehicle: 'Sedan',
    route: 'Gurgaon ⇄ Delhi',
    includes: ['Up to 4 meetings / stops', '8 hours with driver', '80 km included'],
    basePrice: '₹2,800',
    extraKmRate: '₹14/km',
    extraHourRate: '₹150/hr',
  },
  {
    slug: 'corporate-suv-fullday-ncr',
    category: 'corporate-travel',
    title: 'SUV — Full-Day Corporate (Delhi NCR)',
    vehicle: 'SUV',
    route: 'Anywhere in Delhi NCR',
    includes: ['Up to 6 meetings / stops', '10 hours with driver', '100 km included'],
    basePrice: '₹4,200',
    extraKmRate: '₹18/km',
    extraHourRate: '₹180/hr',
  },
  {
    slug: 'corporate-sedan-halfday-ncr',
    category: 'corporate-travel',
    title: 'Sedan — Half-Day Corporate (Delhi NCR)',
    vehicle: 'Sedan',
    route: 'Anywhere in Delhi NCR',
    includes: ['Up to 2 meetings / stops', '4 hours with driver', '40 km included'],
    basePrice: '₹1,600',
    extraKmRate: '₹14/km',
    extraHourRate: '₹150/hr',
  },

  // Events & weddings
  {
    slug: 'wedding-bridal-car-sedan',
    category: 'events-weddings',
    title: 'Decorated Bridal Car — Sedan',
    vehicle: 'Sedan',
    includes: [
      'Full-day booking (12 hours)',
      'Flower & ribbon decoration included',
      'Driver in formal attire',
      '80 km included',
    ],
    basePrice: '₹6,500',
    extraKmRate: '₹18/km',
    extraHourRate: '₹200/hr',
  },
  {
    slug: 'wedding-baraat-luxury-sedan',
    category: 'events-weddings',
    title: 'Luxury Sedan for Baraat',
    vehicle: 'Luxury Sedan',
    includes: [
      'Full-day booking (12 hours)',
      'Premium decoration included',
      'Driver in formal attire',
      '80 km included',
    ],
    basePrice: '₹9,500',
    extraKmRate: '₹22/km',
    extraHourRate: '₹250/hr',
  },
  {
    slug: 'wedding-guest-suv',
    category: 'events-weddings',
    title: 'SUV for Family & Guests',
    vehicle: 'SUV',
    includes: ['Full-day booking (12 hours)', 'Seats up to 6 guests', '100 km included'],
    basePrice: '₹5,800',
    extraKmRate: '₹18/km',
    extraHourRate: '₹180/hr',
  },
  {
    slug: 'wedding-fleet-package',
    category: 'events-weddings',
    title: 'Wedding Fleet — 1 Bridal Car + 3 Guest Cars',
    vehicle: 'Sedan + 3 Sedans',
    includes: [
      'Full-day booking (12 hours) for all 4 cars',
      'Decorated bridal car + 3 plain guest sedans',
      '80 km included per car',
      'Coordinated pickup timing across the fleet',
    ],
    basePrice: '₹21,000',
    extraKmRate: '₹18/km per car',
    extraHourRate: '₹200/hr per car',
  },
]
