import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import WhyMiles from "./components/WhyMiles";
import HowItWorks from "./components/HowItWorks";
import Reviews from "./components/Reviews";
import AboutMiles from "./components/AboutMiles";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import SafetyGuidelines from "./components/SafetyGuidelines";
import CancellationPolicy from "./components/CancellationPolicy";
import Footer from "./components/Footer";
import ExperienceDetails from "./components/ExperienceDetails";
import BookingPage from "./components/BookingPage";
import ExperienceCarousel, { Experience } from "./components/ExperienceCarousel";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "details" | "booking">(
    "home"
  );
  const [selectedExperience, setSelectedExperience] = useState<any>(null);

  const showExperienceDetails = (experience: any) => {
    setSelectedExperience(experience);
    setCurrentPage("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showBookingPage = (experience: any) => {
    setSelectedExperience(experience);
    setCurrentPage("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setCurrentPage("home");
    setSelectedExperience(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- データ（後でAPI化してOK） ----
  const food: Experience[] = [
    {
      id: "food-1",
      title: "Traditional Cooking with Naomi",
      location: "Tokyo, Japan",
      duration: "3 hours",
      groupSize: "4–6 people",
      price: "JPY 8,000",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "food-2",
      title: "Street Food Walking Tour in Asakusa",
      location: "Tokyo, Japan",
      duration: "2.5 hours",
      groupSize: "6–8 people",
      price: "$45",
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "food-3",
      title: "Ramen Workshop & Tasting",
      location: "Tokyo, Japan",
      duration: "2 hours",
      groupSize: "6–10 people",
      price: "$55",
      image:
        "https://images.unsplash.com/photo-1557872943-16a5ac26437b?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "food-4",
      title: "Sushi Basics with Local Chef",
      location: "Tokyo, Japan",
      duration: "2 hours",
      groupSize: "4–6 people",
      price: "$70",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  const culture: Experience[] = [
    {
      id: "cul-1",
      title: "Calligraphy & Tea Ceremony",
      location: "Kyoto, Japan",
      duration: "2 hours",
      groupSize: "2–6 people",
      price: "$40",
      image:
        "https://images.unsplash.com/photo-1535242208474-9a2793260ca4?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "cul-2",
      title: "Kimono Stroll with Photo Walk",
      location: "Kyoto, Japan",
      duration: "2 hours",
      groupSize: "2–5 people",
      price: "$60",
      image:
        "https://images.unsplash.com/photo-1616803140349-0e2b6f26052e?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "cul-3",
      title: "Zen Garden Morning Meditation",
      location: "Kyoto, Japan",
      duration: "1.5 hours",
      groupSize: "4–8 people",
      price: "$35",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "cul-4",
      title: "Pottery Class with Local Artisan",
      location: "Kyoto, Japan",
      duration: "2.5 hours",
      groupSize: "4–6 people",
      price: "$65",
      image:
        "https://images.unsplash.com/photo-1532170579297-281918c8ae1e?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  // ---- ルーティング ----
  if (currentPage === "details") {
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

  if (currentPage === "booking") {
    return (
      <div className="min-h-screen">
        <Navigation />
        <BookingPage
          experience={selectedExperience}
          onBack={() => setCurrentPage("details")}
        />
        <Footer />
      </div>
    );
  }

  // ---- ホーム ----
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Explore Experiences → #explore */}
      <ExperienceCarousel
        title="Food Adventures"
        sectionId="explore"
        items={food}
        onViewDetails={showExperienceDetails}
        onBookNow={showBookingPage}
      />

      {/* All Tours → #tours */}
      <ExperienceCarousel
        title="Cultural Immersion"
        sectionId="tours"
        items={culture}
        onViewDetails={showExperienceDetails}
        onBookNow={showBookingPage}
      />

      <WhyMiles />
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
