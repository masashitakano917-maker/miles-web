// /src/App.tsx
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './state/AuthProvider';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WhyMiles from './components/WhyMiles';
import Experiences from './components/Experiences';
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import AboutMiles from './components/AboutMiles';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import SafetyGuidelines from './components/SafetyGuidelines';
import CancellationPolicy from './components/CancellationPolicy';
import Footer from './components/Footer';
import ExperienceDetails from './components/ExperienceDetails';
import BookingPage from './components/BookingPage';

import AuthForm from './components/AuthForm';
import Account from './components/Account';

function AppInner() {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'details' | 'booking' | 'auth' | 'account'
  >('home');
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const { user } = useAuth();

  const showExperienceDetails = (experience: any) => {
    setSelectedExperience(experience);
    setCurrentPage('details');
  };

  const showBookingPage = (experience: any) => {
    setSelectedExperience(experience);
    setCurrentPage('booking');
  };

  const goHome = () => {
    setCurrentPage('home');
    setSelectedExperience(null);
  };

  // --- Auth pages ---
  if (currentPage === 'auth') {
    return (
      <div className="min-h-screen">
        <Navigation
          onOpenAuth={() => setCurrentPage('auth')}
          onOpenAccount={() => setCurrentPage('account')}
        />
        <div className="pt-20">
          <AuthForm onSuccess={() => setCurrentPage('account')} />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPage === 'account') {
    return (
      <div className="min-h-screen">
        <Navigation
          onOpenAuth={() => setCurrentPage('auth')}
          onOpenAccount={() => setCurrentPage('account')}
        />
        <div className="pt-20"><Account /></div>
        <Footer />
      </div>
    );
  }

  // --- Existing pages ---
  if (currentPage === 'details') {
    return (
      <div className="min-h-screen">
        <Navigation
          onOpenAuth={() => setCurrentPage('auth')}
          onOpenAccount={() => setCurrentPage('account')}
        />
        <ExperienceDetails
          experience={selectedExperience}
          onBack={goHome}
          onBook={() => showBookingPage(selectedExperience)}
        />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'booking') {
    return (
      <div className="min-h-screen">
        <Navigation
          onOpenAuth={() => setCurrentPage('auth')}
          onOpenAccount={() => setCurrentPage('account')}
        />
        <BookingPage
          experience={selectedExperience}
          onBack={() => setCurrentPage('details')}
        />
        <Footer />
      </div>
    );
  }

  // home
  return (
    <div className="min-h-screen">
      <Navigation
        onOpenAuth={() => setCurrentPage('auth')}
        onOpenAccount={() => setCurrentPage('account')}
      />
      <Hero />
      <WhyMiles />
      <Experiences
        onViewDetails={showExperienceDetails}
        onBookNow={showBookingPage}
      />
      <HowItWorks />
      <Reviews />
      <AboutMiles />
      <FAQ />
      <Contact />
      <SafetyGuidelines />
      <CancellationPolicy />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
