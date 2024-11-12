import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Fleet from './components/Fleet';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onBookNow={() => setIsBookingOpen(true)} />
      <Hero onBookNow={() => setIsBookingOpen(true)} />
      <Features />
      <Services />
      <Fleet />
      <Pricing onBookNow={() => setIsBookingOpen(true)} />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      {isBookingOpen && <BookingForm onClose={() => setIsBookingOpen(false)} />}
    </div>
  );
}

export default App;