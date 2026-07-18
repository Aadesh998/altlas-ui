import LegalLayout from '@/components/LegalLayout'

export default function Terms() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="17 July 2026"
      intro="These terms govern every booking made with AXLE, whether through our app, website or by phone. By booking a ride, you agree to the terms below."
      sections={[
        {
          heading: '1. Bookings & Fares',
          body: (
            <>
              <p>
                All fares are fixed at the time of booking and confirmed before you complete your reservation.
                Fares include the base fare for the selected vehicle class; tolls, congestion charges, parking and
                waiting time beyond any free allowance are itemised separately and shown before payment.
              </p>
              <p>
                Airport transfers include flight tracking and one hour of complimentary waiting time from the
                scheduled landing time. Additional waiting time is charged per the rate shown at booking.
              </p>
            </>
          ),
        },
        {
          heading: '2. Cancellations & No-Shows',
          body: (
            <p>
              Rides may be cancelled or amended free of charge up to 1 hour before the scheduled pickup time.
              Cancellations made within that window, or failure to be present at the pickup point within 15
              minutes of arrival (10 minutes for city rides), may incur a cancellation or no-show fee.
            </p>
          ),
        },
        {
          heading: '3. Payment',
          body: (
            <p>
              City rides are charged on completion of the trip. Airport transfers and hourly chauffeur hire
              require a deposit at the time of booking, with the remaining balance charged automatically once
              the ride is complete. We accept major credit and debit cards, Apple Pay, Google Pay, and invoiced
              corporate accounts.
            </p>
          ),
        },
        {
          heading: '4. Passenger Conduct',
          body: (
            <p>
              Passengers are expected to treat chauffeurs and vehicles with respect. AXLE reserves the right to
              end a journey early, without refund, in cases of abusive behaviour, damage to the vehicle, or
              actions that put the chauffeur or other road users at risk.
            </p>
          ),
        },
        {
          heading: '5. Luggage & Liability',
          body: (
            <p>
              Vehicles are allocated based on the luggage and passenger capacity stated at booking. AXLE is not
              liable for items left in a vehicle after a journey ends; please contact support as soon as possible
              and we will make reasonable efforts to arrange the return of lost property.
            </p>
          ),
        },
        {
          heading: '6. Chauffeur Standards',
          body: (
            <p>
              Every chauffeur working with AXLE is background-checked, licensed, insured, and trained in
              defensive driving. Vehicles are inspected regularly and maintained to the standard described in
              our fleet listings.
            </p>
          ),
        },
        {
          heading: '7. Force Majeure',
          body: (
            <p>
              AXLE is not liable for delays or cancellations caused by circumstances beyond our reasonable
              control, including severe weather, road closures, strikes, or other events that prevent safe or
              timely completion of a journey.
            </p>
          ),
        },
        {
          heading: '8. Governing Law',
          body: (
            <p>
              These terms are governed by the laws of the jurisdiction in which your local AXLE entity operates.
              Any disputes will be resolved in the courts of that jurisdiction.
            </p>
          ),
        },
        {
          heading: '9. Contact',
          body: (
            <p>
              Questions about these terms can be sent to{' '}
              <a href="mailto:hello@axle.cab" className="font-semibold text-[#2323d6] hover:text-[#1a1ab8]">
                hello@axle.cab
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  )
}
