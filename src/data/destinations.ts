import type { IconName } from '@/data/icons'

export interface Destination {
  slug: string
  name: string
  region: string
  category: 'Hill Station' | 'Pilgrimage' | 'Heritage' | 'Spiritual & Adventure'
  icon: IconName
  images: string[]
  tagline: string
  distanceFromDelhi: string
  idealDuration: string
  bestTime: string
  overview: string
  highlights: string[]
}

/**
 * Stock photography sourced from LoremFlickr by tag, with a fixed `lock` value so each
 * destination shows the same 3 photos on every load instead of a random shuffle. Swap
 * these for licensed photography whenever real assets are available.
 */
function photos(tags: string): string[] {
  return [1, 2, 3].map((lock) => `https://loremflickr.com/1200/800/${tags}/all?lock=${lock}`)
}

export const DESTINATIONS: Destination[] = [
  {
    slug: 'manali',
    name: 'Manali',
    region: 'Himachal Pradesh',
    category: 'Hill Station',
    icon: 'Mountain',
    images: photos('manali,himalayas,mountains'),
    tagline: 'Snow-capped peaks, pine forests and the winding road to Rohtang Pass.',
    distanceFromDelhi: '~540 km · 12-13 hrs by road',
    idealDuration: '4-5 days',
    bestTime: 'Mar-Jun & Oct-Feb (snow)',
    overview:
      'A favourite for honeymooners, families and road-trippers alike, Manali sits at the head of the Kullu Valley with the Beas river running through it. Old Manali, Solang Valley and the high-altitude Rohtang Pass are all comfortably covered on a chauffeur-driven itinerary.',
    highlights: ['Solang Valley', 'Rohtang Pass', 'Old Manali & Hadimba Temple', 'Kullu Valley', 'Vashisht hot springs'],
  },
  {
    slug: 'kedarnath',
    name: 'Kedarnath',
    region: 'Uttarakhand',
    category: 'Pilgrimage',
    icon: 'Flower2',
    images: photos('kedarnath,temple,himalayas'),
    tagline: 'One of the twelve Jyotirlingas, cradled deep in the Garhwal Himalayas.',
    distanceFromDelhi: '~460 km to Sonprayag · trek/pony beyond',
    idealDuration: '2-3 days (as part of a Char Dham circuit)',
    bestTime: 'May-Jun & Sep-Oct',
    overview:
      'Part of the revered Char Dham circuit, Kedarnath is reached by road up to Sonprayag or Gaurikund, followed by a trek or pony ride to the temple. We handle the entire road leg — pickup, overnight halts and the drive back — so the journey is one less thing to plan.',
    highlights: ['Kedarnath Temple', 'Sonprayag & Gaurikund', 'Guptkashi', 'Char Dham circuit add-on', 'Mandakini valley views'],
  },
  {
    slug: 'agra',
    name: 'Agra',
    region: 'Uttar Pradesh',
    category: 'Heritage',
    icon: 'Landmark',
    images: photos('tajmahal,agra,india'),
    tagline: 'Home to the Taj Mahal and the finest of Mughal-era architecture.',
    distanceFromDelhi: '~230 km · 3-4 hrs via Yamuna Expressway',
    idealDuration: '1 day (or 2 for a relaxed pace)',
    bestTime: 'Oct-Mar',
    overview:
      'Easily done as a long day trip from Delhi, or paired with Jaipur for the classic Golden Triangle. Sunrise at the Taj Mahal, Agra Fort by mid-morning, and Mehtab Bagh for the sunset view across the river — all comfortably on one itinerary.',
    highlights: ['Taj Mahal', 'Agra Fort', 'Mehtab Bagh', "Itmad-ud-Daulah (Baby Taj)", 'Fatehpur Sikri (en route)'],
  },
  {
    slug: 'shimla',
    name: 'Shimla',
    region: 'Himachal Pradesh',
    category: 'Hill Station',
    icon: 'Mountain',
    images: photos('shimla,himachal,hills'),
    tagline: "The former British summer capital, high in the Shivalik hills.",
    distanceFromDelhi: '~360 km · 8-9 hrs by road',
    idealDuration: '3-4 days',
    bestTime: 'Mar-Jun & Dec-Jan (snow)',
    overview:
      'Colonial-era architecture, The Mall and Ridge, and easy day trips to Kufri make Shimla an easy, comfortable hill station to drive to — often combined with Manali for a longer Himachal circuit.',
    highlights: ['The Mall & The Ridge', 'Kufri', 'Jakhoo Temple', 'Christ Church', 'Toy train viewpoint at Summer Hill'],
  },
  {
    slug: 'rishikesh-haridwar',
    name: 'Rishikesh & Haridwar',
    region: 'Uttarakhand',
    category: 'Spiritual & Adventure',
    icon: 'Waves',
    images: photos('rishikesh,ganges,india'),
    tagline: 'Ganga aarti, the yoga capital of the world, and the gateway to the Himalayas.',
    distanceFromDelhi: '~230 km · 5-6 hrs by road',
    idealDuration: '2-3 days',
    bestTime: 'Sep-Apr',
    overview:
      'Evening Ganga aarti at Har Ki Pauri, the suspension bridges of Laxman Jhula and Ram Jhula, and riverside cafes make this an easy, restorative trip — with river rafting and yoga ashrams for those who want more.',
    highlights: ['Triveni Ghat & Ganga Aarti', 'Laxman Jhula / Ram Jhula', 'Har Ki Pauri, Haridwar', 'River rafting', 'Beatles Ashram'],
  },
  {
    slug: 'jaipur',
    name: 'Jaipur',
    region: 'Rajasthan',
    category: 'Heritage',
    icon: 'Building2',
    images: photos('jaipur,rajasthan,fort'),
    tagline: 'The Pink City — forts, palaces and bazaars steeped in Rajput history.',
    distanceFromDelhi: '~280 km · 5-6 hrs by road',
    idealDuration: '2 days',
    bestTime: 'Oct-Mar',
    overview:
      'Amber Fort at sunrise, the City Palace and Hawa Mahal by day, and the bazaars of Johari and Bapu Bazaar for the evening — Jaipur pairs naturally with Agra as part of the Golden Triangle.',
    highlights: ['Amber Fort', 'City Palace & Hawa Mahal', 'Jantar Mantar', 'Nahargarh Fort viewpoint', 'Local bazaars'],
  },
  {
    slug: 'amritsar',
    name: 'Amritsar',
    region: 'Punjab',
    category: 'Pilgrimage',
    icon: 'Sparkles',
    images: photos('goldentemple,amritsar,india'),
    tagline: 'The Golden Temple, langar seva, and the Wagah border retreat ceremony.',
    distanceFromDelhi: '~450 km · 8-9 hrs by road',
    idealDuration: '2 days',
    bestTime: 'Oct-Mar',
    overview:
      'A visit to the Golden Temple — by day and lit up at night — paired with the evening flag-lowering ceremony at the Wagah border makes for a moving, memorable short trip.',
    highlights: ['Golden Temple (Harmandir Sahib)', 'Wagah Border ceremony', 'Jallianwala Bagh', 'Partition Museum', 'Amritsari food trail'],
  },
  {
    slug: 'vaishno-devi',
    name: 'Vaishno Devi',
    region: 'Jammu & Kashmir',
    category: 'Pilgrimage',
    icon: 'Flower2',
    images: photos('vaishnodevi,katra,himalayas'),
    tagline: "One of India's most visited shrines, in the Trikuta hills near Katra.",
    distanceFromDelhi: '~630 km to Katra · trek/pony/helicopter beyond',
    idealDuration: '2-3 days',
    bestTime: 'Mar-Oct',
    overview:
      'We drive you to Katra, arrange the stay, and have you ready for the trek, pony or helicopter ride to the shrine — with the return journey timed around your darshan.',
    highlights: ['Katra base camp', 'Bhawan trek', 'Helicopter option', 'Ardhkuwari', 'Patnitop add-on'],
  },
  {
    slug: 'chopta-tungnath',
    name: 'Chopta & Tungnath',
    region: 'Uttarakhand',
    category: 'Spiritual & Adventure',
    icon: 'Mountain',
    images: photos('chopta,tungnath,himalayas'),
    tagline: "India's 'Mini Switzerland' — alpine meadows, the world's highest Shiva temple, and the Chandrashila summit trek.",
    distanceFromDelhi: '~460 km to Chopta · 10-11 hrs by road',
    idealDuration: '3-4 days',
    bestTime: 'Mar-Jun & Sep-Nov',
    overview:
      'A quieter, greener alternative to the bigger Uttarakhand hill stations. We drive you to Ukhimath or Chopta, from where the trek to Tungnath — the highest Shiva temple in the world — and on to the Chandrashila summit begins. Deoria Tal makes for an easy add-on the same trip.',
    highlights: ['Chopta meadows', 'Tungnath Temple trek', 'Chandrashila summit', 'Deoria Tal', 'Ukhimath base'],
  },
  {
    slug: 'nainital',
    name: 'Nainital',
    region: 'Uttarakhand',
    category: 'Hill Station',
    icon: 'Mountain',
    images: photos('nainital,lake,himalayas'),
    tagline: 'A lake-set hill station in the Kumaon Himalayas, ringed by forested peaks.',
    distanceFromDelhi: '~310 km · 7-8 hrs by road',
    idealDuration: '3 days',
    bestTime: 'Mar-Jun & Sep-Nov',
    overview:
      'Built around the eye-shaped Naini Lake, Nainital is an easy Kumaon getaway — boating on the lake, the Mall Road promenade, and cable car rides up Snow View, with Bhimtal and Sattal as quiet day trips nearby.',
    highlights: ['Naini Lake boating', 'Mall Road', 'Snow View cable car', 'Bhimtal', 'Sattal'],
  },
]
