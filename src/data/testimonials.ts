export interface Testimonial {
  slug: string
  title: string
  text: string
  name: string
  detail: string
  rating: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    slug: 'ananya-sharma',
    title: '100% Great Experience',
    text: 'AXLE found us the perfect car for a 4am airport run at a reasonable flat fee... Like many I’m nervous about trusting anything on the internet, they respected this and answered all my questions. Communications awesome and the ride was the best experience we’ve ever had.',
    name: 'Ananya Sharma',
    detail: 'Airport transfer, Gurgaon',
    rating: 5,
  },
  {
    slug: 'rohit-verma',
    title: 'Fantastic service from a great company!',
    text: 'AXLE has looked after us for years — this is the 5th trip we have done with them. Extremely knowledgeable team, who always deliver what we are looking for. They know Delhi inside out and recommend excellent routes. We couldn’t recommend highly enough.',
    name: 'Rohit Verma',
    detail: 'Monthly chauffeur client, Delhi',
    rating: 5,
  },
  {
    slug: 'priya-nair',
    title: 'Super helpful',
    text: 'The team at AXLE were super helpful in planning our wedding day cars. They were really responsive with all the questions we had, the cars were spotless and the drivers impeccable. I’d definitely use them again.',
    name: 'Priya Nair',
    detail: 'Events & weddings, Jaipur',
    rating: 5,
  },
  {
    slug: 'vikram-malhotra',
    title: 'The team at AXLE are first class',
    text: 'The team helped us organise our first corporate account. We were utterly clueless but they helped us find the perfect setup — invoicing, priority booking, the lot. Our leadership team now refuse to travel any other way.',
    name: 'Vikram Malhotra',
    detail: 'Corporate travel, Gurgaon',
    rating: 5,
  },
]
