import LegalLayout from '@/components/LegalLayout'

export default function Cookies() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Cookie Policy"
      updated="17 July 2026"
      intro="Cookies help us run the AXLE website reliably and understand how it's used. Here's what we set and why."
      sections={[
        {
          heading: '1. What Are Cookies',
          body: (
            <p>
              Cookies are small text files stored on your device when you visit a website. They let the site
              remember information about your visit, which can make it easier to use and more useful to you.
            </p>
          ),
        },
        {
          heading: '2. Essential Cookies',
          body: (
            <p>
              These are required for the site to function — for example, keeping your booking details in place
              while you move between steps of the checkout. The site cannot function properly without these,
              and they cannot be switched off.
            </p>
          ),
        },
        {
          heading: '3. Analytics Cookies',
          body: (
            <p>
              We use analytics cookies to understand how visitors use our site — which pages are visited, how
              long for, and whether journeys through the booking flow succeed or drop off — so we can improve
              the experience over time.
            </p>
          ),
        },
        {
          heading: '4. Third-Party Cookies',
          body: (
            <p>
              Some cookies are set by services we embed, such as payment providers and map tools used to show
              pickup locations. These third parties have their own cookie policies governing their use of data.
            </p>
          ),
        },
        {
          heading: '5. Managing Cookies',
          body: (
            <p>
              Most browsers let you view, manage and delete cookies through their settings. Blocking essential
              cookies may prevent parts of the booking flow from working correctly.
            </p>
          ),
        },
        {
          heading: '6. Contact',
          body: (
            <p>
              Questions about our use of cookies can be sent to{' '}
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
