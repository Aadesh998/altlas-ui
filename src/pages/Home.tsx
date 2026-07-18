import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import RatingBar from '@/sections/RatingBar'
import Intro from '@/sections/Intro'
import DarkCard from '@/sections/DarkCard'
import BookingBar from '@/sections/BookingBar'
import Difference from '@/sections/Difference'
import WhyDifferent from '@/sections/WhyDifferent'
import Testimonials from '@/sections/Testimonials'
import Services from '@/sections/Services'
import Process from '@/sections/Process'
import Faqs from '@/sections/Faqs'
import CtaBanner from '@/sections/CtaBanner'
import Newsletter from '@/sections/Newsletter'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main>
        <Hero />
        <RatingBar />
        <Intro />
        <DarkCard />
        <BookingBar />
        <Difference />
        <WhyDifferent />
        <Testimonials />
        <Services />
        <Process />
        <Faqs />
        <CtaBanner />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
