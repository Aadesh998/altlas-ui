import LegalLayout from '@/components/LegalLayout'

export default function Privacy() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="17 July 2026"
      intro="This policy explains what personal data AXLE collects, why we collect it, and the choices you have over how it's used."
      sections={[
        {
          heading: '1. Information We Collect',
          body: (
            <p>
              We collect the information you provide when booking a ride — name, phone number, email, pickup
              and drop-off locations — along with payment details processed securely by our payment provider,
              and trip data such as ride times, routes and driver ratings.
            </p>
          ),
        },
        {
          heading: '2. How We Use Your Data',
          body: (
            <p>
              Your data is used to arrange and dispatch your ride, process payment, provide customer support,
              track flights for airport transfers, and send booking confirmations and receipts. With your
              consent, we may also send offers and updates such as our newsletter.
            </p>
          ),
        },
        {
          heading: '3. Sharing With Third Parties',
          body: (
            <p>
              We share only what's necessary to complete your ride: your pickup details and contact number with
              the assigned chauffeur, and payment information with our payment processor. We do not sell your
              personal data to third parties.
            </p>
          ),
        },
        {
          heading: '4. Cookies',
          body: (
            <p>
              Our website uses cookies to keep the site working correctly and to understand how it's used. See
              our{' '}
              <a href="/cookies" className="font-semibold text-[#2323d6] hover:text-[#1a1ab8]">
                Cookie Policy
              </a>{' '}
              for details on the cookies we use and how to manage them.
            </p>
          ),
        },
        {
          heading: '5. Data Retention',
          body: (
            <p>
              We retain booking and trip records for as long as needed to meet accounting, tax and legal
              obligations, typically no longer than 7 years, after which the data is securely deleted.
            </p>
          ),
        },
        {
          heading: '6. Your Rights',
          body: (
            <p>
              You can request a copy of the personal data we hold about you, ask us to correct inaccurate data,
              or request deletion where we're not required to keep it for legal reasons. To exercise any of
              these rights, contact us using the details below.
            </p>
          ),
        },
        {
          heading: '7. Contact',
          body: (
            <p>
              For any privacy-related request, email{' '}
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
