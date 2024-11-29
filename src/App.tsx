import { useState } from 'react';
import { Toaster } from 'sonner';
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
import RideBookingModal from './components/RideBookingModal';
import AdminDashboard from './components/admin/AdminDashboard';
import DriverPortal from './components/driver/DriverPortal';
import ClientPortal from './components/client/ClientPortal';
import { useAuth } from './hooks/useAuth';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './components/LanguageProvider';

// Import fonts
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { isAdmin, hasRole } = useAuth();

  const isRestrictedUser = isAdmin() || hasRole('driver');

  const handleBookNow = () => {
    if (!isRestrictedUser) {
      setIsBookingOpen(true);
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen font-inter">
          <Toaster position="top-center" />
          <Header onBookNow={handleBookNow} showBooking={!isRestrictedUser} />
          {isAdmin() ? (
            <AdminDashboard />
          ) : hasRole('driver') ? (
            <DriverPortal />
          ) : hasRole('client') ? (
            <ClientPortal />
          ) : (
            <>
              <Hero onBookNow={handleBookNow} />
              <Features />
              <Services />
              <Fleet />
              <Pricing onBookNow={handleBookNow} />
              <Testimonials />
              <FAQ />
              <Contact />
            </>
          )}
          <Footer />
          {isBookingOpen && <RideBookingModal onClose={() => setIsBookingOpen(false)} />}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;