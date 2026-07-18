export interface Faq {
  slug: string
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    slug: 'pay-in-advance',
    q: 'Do I need to pay in advance?',
    a: 'Yes. A 10% advance payment is required to confirm any booking — packages or a custom trip. The remaining balance is paid after the ride is complete.',
  },
  {
    slug: 'cancellation-refund-policy',
    q: 'What is your cancellation and refund policy?',
    a: 'Cancel within 1 hour of booking and you’ll get a full refund of your advance, no charge at all. After that 1-hour window, 9% of your total fare is refunded and 1% is retained as a non-refundable cancellation fee.',
  },
  {
    slug: 'reschedule-booking',
    q: 'Can I reschedule my booking?',
    a: 'Airport transfers and city rides can be rescheduled once, free of charge, as long as it’s done at least 1 day before your scheduled pickup. Rescheduling closer to pickup time, or for other service types, may be chargeable.',
  },
  {
    slug: 'fixed-or-dynamic-prices',
    q: 'Are your prices fixed, or can they change?',
    a: 'Our listed packages (local sightseeing, airport transfers, multi-day tours and more) are fixed price. If you need something that doesn’t match a package, our custom trip option gives you a dynamic quote based on distance, driver allowance, night charges and GST — shown in full before you pay.',
  },
  {
    slug: 'flight-delayed',
    q: 'What happens if my flight is delayed?',
    a: 'We track your flight automatically for airport transfers, so your chauffeur adjusts pickup time in real time at no extra cost. You also get a full hour of free waiting time after landing.',
  },
  {
    slug: 'payment-methods',
    q: 'What payment methods do you accept?',
    a: 'All payments are processed securely through Razorpay — UPI, credit and debit cards, net banking and popular wallets are all supported.',
  },
  {
    slug: 'advance-booking-window',
    q: 'How far in advance can I book?',
    a: 'Advance bookings open up to 1 month before your travel date. Local city rides and airport transfers can also be booked at shorter notice, subject to availability.',
  },
]
