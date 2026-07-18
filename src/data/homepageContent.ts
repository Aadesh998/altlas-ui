export interface AccordionEntry {
  title: string
  body: string
}

export interface HomepageContent {
  services: {
    eyebrow: string
    heading: string
  }
  intro: {
    eyebrow: string
    headingLine1: string
    headingLine2: string
    paragraphs: string[]
  }
  darkCard: {
    heading: string
    paragraphs: string[]
    ctaText: string
  }
  difference: {
    heading: string
    paragraphs: string[]
    ctaText: string
    bigStatement: string
    bigStatementSub: string
    ratingValue: string
  }
  whyDifferent: {
    heading: string
    items: AccordionEntry[]
    ctaText: string
  }
  process: {
    eyebrow: string
    heading: string
    subtext: string
    steps: AccordionEntry[]
  }
  ctaBanner: {
    heading: string
    subtext: string
    ctaText: string
  }
  newsletter: {
    heading: string
    subtext: string
  }
  ratingBar: {
    ratingValue: string
    reviewCount: string
  }
}

export const HOMEPAGE_CONTENT_SEED: HomepageContent = {
  services: {
    eyebrow: 'Ride types',
    heading: 'One fleet, five ways to travel',
  },
  intro: {
    eyebrow: 'Introducing AXLE',
    headingLine1: 'Your Impartial',
    headingLine2: 'Travel Experts',
    paragraphs: [
      'AXLE is your personalised cab and chauffeur service.',
      "Since 2015 we've specialized in matching discerning travelers with the city's finest drivers and cars.",
      'Welcome to AXLE: effortless comfort, handpicked and flawlessly curated.',
      'A cab ride is the start of every journey, and with AXLE nothing is left to chance, from first tap to final drop-off.',
    ],
  },
  darkCard: {
    heading: 'Effortless. Reliable. Everywhere.',
    paragraphs: [
      'Glide from meeting to meeting, waking up to a driver already waiting downstairs, in a car prepared entirely for you.',
      'With an exquisite selection of the finest sedans, SUVs and prestige 4×4s to choose from, we have everything you need for the journey of a lifetime.',
      'We complete over 40,000 rides each year, cover every neighbourhood in the city, and pride ourselves on finding the perfect car for you, tailoring each ride to suit your individual needs.',
      'Your personal chauffeur will draw on years of expertise to guide you through every step of the journey, from booking to drop-off and beyond.',
      "We work with the top 5% of drivers. The rest don't make the cut.",
    ],
    ctaText: 'Book a Ride Now',
  },
  difference: {
    heading: 'The AXLE difference',
    paragraphs: [
      'We offer only the finest cars on the road: the ones we know and trust, that undergo the most rigorous maintenance and are driven by the best trained chauffeurs.',
      "Your time is precious, so we'll strive to make every ride everything you want it to be.",
      'Our unique Ride Concierge allows us to understand not just where you want to go, but how you want to travel. We then handpick the car, the driver and the route that transform that vision into reality.',
    ],
    ctaText: 'Why Choose AXLE?',
    bigStatement: 'There are more than 50,000 cabs operating in the city, but we only work with the very best 5%.',
    bigStatementSub:
      "We handpick the finest cars and personalise every detail to perfection. Our friendly experts ensure a seamless journey from start to finish, creating a ride you'll want to repeat. Trust us to deliver the ultimate travel experience customised just for you.",
    ratingValue: '4.9',
  },
  whyDifferent: {
    heading: "Why we're different",
    ctaText: 'Learn more about AXLE',
    items: [
      {
        title: 'Professional chauffeurs',
        body: 'Every AXLE driver is background-checked, licensed and trained in defensive driving and etiquette. They know the city’s shortcuts, the airport’s terminals and the value of your time. This is a partnership built on understanding your schedule, your privacy requirements, and what a truly restorative ride feels like.',
      },
      {
        title: 'Fixed, transparent pricing',
        body: 'The price you see at booking is the price you pay — no surge, no meters ticking in traffic, no surprises. Tolls, waiting time and taxes are itemised upfront, and receipts land in your inbox the moment you step out.',
      },
      {
        title: 'Always on time, 24/7',
        body: 'Our dispatch team watches every ride around the clock. For airport pickups we track your flight and adjust automatically — early or delayed, your chauffeur is there when you land, name board in hand.',
      },
      {
        title: 'An immaculate fleet',
        body: 'Your journeys are treasured time, so every car is detailed daily, inspected weekly and retired early. While thousands of cabs advertise rides, we only work with the top 5% — vehicles that represent the highest standards in maintenance, comfort and cleanliness.',
      },
      {
        title: 'Safety and discretion',
        body: 'Many of our long-term clients came to us through personal referrals, and we understand why. GPS-tracked rides, vetted drivers, full insurance and absolute discretion define everything we do. Your trust is earned through consistent excellence, never assumed.',
      },
    ],
  },
  process: {
    eyebrow: 'What sets us apart',
    heading: 'The AXLE process',
    subtext: 'Four steps between you and the smoothest ride in the city — refined over a decade and 40,000 journeys a year.',
    steps: [
      { title: 'Share Your Journey', body: 'Tell us where and when — app, web or a quick call. Fixed price confirmed in seconds, no surge ever.' },
      { title: 'Your Personal Chauffeur', body: 'We handpick a vetted, top-rated chauffeur for your trip and send their name, photo and plate in advance.' },
      { title: 'Track & Relax', body: 'Watch your car approach in real time. Bottled water, chargers and your preferred temperature await inside.' },
      { title: 'Arrive in Style', body: 'Door-to-door, luggage carried, receipt in your inbox. Rate your ride — we read every single one.' },
    ],
  },
  ctaBanner: {
    heading: 'Unforgettable journeys, tailored to you.',
    subtext: 'From the morning commute to the red-eye run, one tap puts a chauffeur at your door.',
    ctaText: 'Create Yours',
  },
  newsletter: {
    heading: 'Best rides only.',
    subtext: "First look at new cars, seasonal deals, and routes our chauffeurs love — straight to your inbox.",
  },
  ratingBar: {
    ratingValue: '4.9',
    reviewCount: '2,300',
  },
}
