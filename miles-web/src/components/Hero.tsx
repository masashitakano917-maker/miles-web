// src/components/Hero.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const NAV_HEIGHT = 72; // 固定ナビの高さぶんオフセット（必要なら調整）

const Hero: React.FC = () => {
  const scrollToExplore = () => {
    const target = document.getElementById('explore'); // 統一アンカー
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
          Discover the world together
          <span className="block text-orange-400">with locals</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed animate-fade-in-delay">
          Unforgettable journeys, authentic experiences curated by Miles
        </p>

        <button
          onClick={scrollToExplore}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto animate-fade-in-delay-2"
          aria-label="Explore Experiences"
        >
          Explore Experiences
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
