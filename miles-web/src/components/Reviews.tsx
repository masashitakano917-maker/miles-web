import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0);
  
  const reviews = [
    {
      name: "Sarah Chen",
      location: "San Francisco, USA",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "Maria showed us the real Barcelona - not the touristy spots, but where locals actually go. We cooked paella in her grandmother's kitchen and learned family stories. Absolutely magical!",
      experience: "Barcelona Food & Culture Tour"
    },
    {
      name: "James Wilson",
      location: "London, UK",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "Hiking with Kenji to that hidden temple was the highlight of our Japan trip. His knowledge of local history and photography skills made it unforgettable. Plus, we're still in touch!",
      experience: "Kyoto Hidden Temple Trek"
    },
    {
      name: "Emma Thompson",
      location: "Melbourne, Australia",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "I was traveling solo and nervous about joining a group, but Ahmed made everyone feel like family. We explored Istanbul's art scene and I left with new friends from around the world.",
      experience: "Istanbul Art & Coffee Culture"
    },
    {
      name: "Carlos Rodriguez",
      location: "Mexico City, Mexico",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "The sunrise meditation with Priya was transformative. She taught us about local spiritual practices while we watched the sun rise over the Himalayas. Life-changing experience!",
      experience: "Himalayan Sunrise Meditation"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Traveler <span className="text-orange-500">Stories</span>
          </h2>
          <p className="text-xl text-gray-600">
            Real experiences from real travelers who discovered the world with Miles
          </p>
        </div>
        
        <div className="relative">
          {/* Main Review Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Traveler Photo */}
              <div className="flex-shrink-0">
                <img 
                  src={reviews[currentReview].image}
                  alt={reviews[currentReview].name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg"
                />
              </div>
              
              {/* Review Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Stars */}
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Review Text */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  "{reviews[currentReview].text}"
                </blockquote>
                
                {/* Reviewer Info */}
                <div className="border-t pt-4">
                  <h4 className="font-bold text-gray-900 text-lg">
                    {reviews[currentReview].name}
                  </h4>
                  <p className="text-gray-600 mb-2">
                    {reviews[currentReview].location}
                  </p>
                  <p className="text-orange-500 font-semibold">
                    {reviews[currentReview].experience}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevReview}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button 
            onClick={nextReview}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReview(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentReview ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Read More Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;