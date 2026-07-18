export type PackageType = 'local-delhi' | 'local-outstation' | 'multi-day'

export interface TourPackage {
  slug: string
  type: PackageType
  title: string
  duration: string
  destinations: string[]
  indicativeFrom: string
  carType: string
  highlights: string[]
}

export const PACKAGE_TYPE_LABELS: Record<PackageType, string> = {
  'local-delhi': 'Local sightseeing · Delhi',
  'local-outstation': 'Local sightseeing · Outside Delhi',
  'multi-day': 'Multi-day tour package',
}

export const TOUR_PACKAGES: TourPackage[] = [
  {
    slug: 'delhi-full-day',
    type: 'local-delhi',
    title: 'Delhi Full-Day City Tour',
    duration: '8-10 hrs, same day',
    destinations: ['Delhi'],
    indicativeFrom: '₹2,500',
    carType: 'Sedan',
    highlights: ['Red Fort', 'Qutub Minar', 'India Gate', 'Lotus Temple', 'Akshardham (exterior)'],
  },
  {
    slug: 'delhi-half-day',
    type: 'local-delhi',
    title: 'Delhi Half-Day Highlights',
    duration: '4-5 hrs, same day',
    destinations: ['Delhi'],
    indicativeFrom: '₹1,500',
    carType: 'Sedan',
    highlights: ['India Gate', 'Humayun\'s Tomb', 'Connaught Place', 'Lotus Temple'],
  },
  {
    slug: 'agra-local',
    type: 'local-outstation',
    title: 'Agra Local Sightseeing',
    duration: 'Full day, same-day return from Delhi optional',
    destinations: ['Agra'],
    indicativeFrom: '₹2,200',
    carType: 'Sedan',
    highlights: ['Taj Mahal', 'Agra Fort', 'Mehtab Bagh'],
  },
  {
    slug: 'jaipur-local',
    type: 'local-outstation',
    title: 'Jaipur Local Sightseeing',
    duration: 'Full day',
    destinations: ['Jaipur'],
    indicativeFrom: '₹2,500',
    carType: 'Sedan',
    highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar'],
  },
  {
    slug: 'golden-triangle-4d',
    type: 'multi-day',
    title: 'Golden Triangle — Delhi, Agra & Jaipur',
    duration: '4 days / 3 nights',
    destinations: ['Delhi', 'Agra', 'Jaipur'],
    indicativeFrom: '₹14,000',
    carType: 'Sedan / SUV',
    highlights: ['Taj Mahal sunrise', 'Amber Fort', 'Agra Fort', 'City Palace & Hawa Mahal'],
  },
  {
    slug: 'shimla-manali-5d',
    type: 'multi-day',
    title: 'Shimla — Manali Circuit',
    duration: '5 days / 4 nights',
    destinations: ['Shimla', 'Manali'],
    indicativeFrom: '₹18,000',
    carType: 'Sedan / SUV',
    highlights: ['Solang Valley', 'Rohtang Pass (seasonal)', 'The Mall, Shimla', 'Kufri'],
  },
  {
    slug: 'rishikesh-mussoorie-5d',
    type: 'multi-day',
    title: 'Rishikesh — Haridwar — Mussoorie',
    duration: '5 days / 4 nights',
    destinations: ['Rishikesh & Haridwar'],
    indicativeFrom: '₹19,000',
    carType: 'Sedan / SUV',
    highlights: ['Ganga Aarti at Har Ki Pauri', 'Laxman Jhula', 'Mall Road, Mussoorie', 'River rafting (optional)'],
  },
  {
    slug: 'char-dham-6d',
    type: 'multi-day',
    title: 'Kedarnath & Badrinath Yatra',
    duration: '6 days / 5 nights',
    destinations: ['Kedarnath'],
    indicativeFrom: '₹32,000',
    carType: 'SUV',
    highlights: ['Kedarnath darshan', 'Badrinath darshan', 'Guptkashi halt', 'Mandakini valley drive'],
  },
  {
    slug: 'chopta-tungnath-4d',
    type: 'multi-day',
    title: 'Chopta & Tungnath Trek Getaway',
    duration: '4 days / 3 nights',
    destinations: ['Chopta & Tungnath'],
    indicativeFrom: '₹16,000',
    carType: 'SUV',
    highlights: ['Chopta meadows', 'Tungnath Temple trek', 'Chandrashila summit', 'Deoria Tal'],
  },
  {
    slug: 'nainital-3d',
    type: 'multi-day',
    title: 'Nainital Lake Getaway',
    duration: '3 days / 2 nights',
    destinations: ['Nainital'],
    indicativeFrom: '₹12,000',
    carType: 'Sedan / SUV',
    highlights: ['Naini Lake boating', 'Mall Road', 'Snow View cable car', 'Bhimtal day trip'],
  },
]
