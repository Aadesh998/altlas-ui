import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Home from './pages/Home'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'
import Guides from './pages/Guides'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import Tours from './pages/Tours'
import TourDetail from './pages/TourDetail'
import ServiceCategory from './pages/ServiceCategory'
import PackageBooking from './pages/PackageBooking'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminOverview from './pages/admin/AdminOverview'
import AdminBookings from './pages/admin/AdminBookings'
import AdminRequests from './pages/admin/AdminRequests'
import AdminImages from './pages/admin/AdminImages'
import AdminTourPackages from './pages/admin/AdminTourPackages'
import AdminServicePackages from './pages/admin/AdminServicePackages'
import AdminServiceCategories from './pages/admin/AdminServiceCategories'
import AdminDestinations from './pages/admin/AdminDestinations'
import AdminHero from './pages/admin/AdminHero'
import AdminFaqs from './pages/admin/AdminFaqs'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminHomepage from './pages/admin/AdminHomepage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // give the new page's content a tick to mount before scrolling to the anchor
    const id = requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:slug" element={<TourDetail />} />
        <Route path="/services/:category" element={<ServiceCategory />} />
        <Route path="/book-package" element={<PackageBooking />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="images" element={<AdminImages />} />
          <Route path="tour-packages" element={<AdminTourPackages />} />
          <Route path="service-packages" element={<AdminServicePackages />} />
          <Route path="service-categories" element={<AdminServiceCategories />} />
          <Route path="destinations" element={<AdminDestinations />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="homepage" element={<AdminHomepage />} />
          <Route path="faqs" element={<AdminFaqs />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
        </Route>
      </Routes>
    </>
  )
}
