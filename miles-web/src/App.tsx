import React from 'react';
import { useState } from 'react';
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

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'details' | 'booking'>('home');
  const [selectedExperience, setSelectedExperience] = useState<any>(null);

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

  if (currentPage === 'details') {
    return (
      <div className="min-h-screen">
        <Navigation />
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
        <Navigation />
        <BookingPage 
          experience={selectedExperience} 
          onBack={() => setCurrentPage('details')}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
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

export default App;