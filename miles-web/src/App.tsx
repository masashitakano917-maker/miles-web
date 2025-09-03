// src/App.tsx
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WhyMiles from './components/WhyMiles';
// import Experiences from './components/Experiences'; // ← 既存セクションは使わないので外してOK
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import AboutMiles from './components/AboutMiles';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import SafetyGuidelines from './components/SafetyGuidelines';
import CancellationPolicy from './components/CancellationPolicy';
import Footer from './components/Footer';
import ExperienceDetails from './components/ExperienceDetails';
import ExperienceCarousel from './components/ExperienceCarousel';
import BookingPage from './components/BookingPage';

// カルーセル用に使う型（必要に応じて増やしてOK）
export type ExperienceItem = {
  id: string;
  title: string;
  location: string;
  duration: string;
  group: string;
  price: string;      // BookingPageの計算と整合させるため "$45" のようにドル記号つきで保持
  image: string;      // 画像URL（/public 配下のパス or 外部URL）
  // ↓ ExperienceDetails で参照されても落ちないように最低限の項目を補っておく（任意）
  description?: string;
  highlights?: string[];
};

// =====================
// ダミーデータ（あとで好きなだけ追加OK）
// 画像は Unsplash 等の外部URLでも OK。/public/images/... なら public に置く
// =====================
const foodExperiences: ExperienceItem[] = [
  {
    id: 'naomi-cook',
    title: 'Traditional Cooking with Naomi',
    location: 'Tokyo, Japan',
    duration: '3 hours',
    group: '4–6 people',
    price: '$80',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop',
    description: 'Learn home-style Japanese cooking with a local host in Tokyo.',
    highlights: ['Local kitchen', 'Seasonal ingredients', 'Small group'],
  },
  {
    id: 'asakusa-street-food',
    title: 'Street Food Walking Tour in Asakusa',
    location: 'Tokyo, Japan',
    duration: '2.5 hours',
    group: '6–8 people',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1514511547119-68a79e57c0e8?q=80&w=1600&auto=format&fit=crop',
    description: 'Taste iconic snacks while strolling historic Asakusa.',
    highlights: ['Hidden stalls', 'Sweet & savory bites', 'Local guide'],
  },
  // …ここに追加していくと「すべて表示」で増えます
];

const culturalExperiences: ExperienceItem[] = [
  {
    id: 'tea-ceremony',
    title: 'Japanese Tea Ceremony',
    location: 'Kyoto, Japan',
    duration: '2 hours',
    group: '2–5 people',
    price: '$60',
    image: 'https://images.unsplash.com/photo-1563897539633-7374c276c212?q=80&w=1600&auto=format&fit=crop',
    description: 'Experience a traditional tea ceremony with a tea master.',
    highlights: ['Wabi-sabi', 'Matcha', 'Kimono option'],
  },
  {
    id: 'calligraphy',
    title: 'Shodo Calligraphy Class',
    location: 'Tokyo, Japan',
    duration: '1.5 hours',
    group: '3–8 people',
    price: '$40',
    image: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=1600&auto=format&fit=crop',
    description: 'Learn the basics of Japanese calligraphy (Shodo).',
    highlights: ['Brush techniques', 'Kanji & Kana', 'Take-home work'],
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'details' | 'booking'>('home');
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

  const showExperienceDetails = (experience: ExperienceItem) => {
    setSelectedExperience(experience);
    setCurrentPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showBookingPage = (experience: ExperienceItem) => {
    setSelectedExperience(experience);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setCurrentPage('home');
    setSelectedExperience(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===== 詳細ページ =====
  if (currentPage === 'details' && selectedExperience) {
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

  // ===== 予約ページ =====
  if (currentPage === 'booking' && selectedExperience) {
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

  // ===== トップページ（カルーセルで置き換え） =====
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <WhyMiles />

      {/* ここが新しいカルーセル群。必要なセクションぶん増やしてください */}
      <div className="max-w-7xl mx-auto px-4">
        <ExperienceCarousel
          title="Food Adventures"
          items={foodExperiences}
          onView={showExperienceDetails}
          onBook={showBookingPage}
        />

        <div className="h-8" />

        <ExperienceCarousel
          title="Cultural Immersion"
          items={culturalExperiences}
          onView={showExperienceDetails}
          onBook={showBookingPage}
        />
      </div>

      {/* 既存の一覧は不要なら削除。残したいなら下の一行を有効化 */}
      {/*
      <Experiences
        onViewDetails={showExperienceDetails}
        onBookNow={showBookingPage}
      />
      */}

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
