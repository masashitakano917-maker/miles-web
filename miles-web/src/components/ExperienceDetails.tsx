import React from 'react';
import { ArrowLeft, MapPin, Clock, Users, Star, Calendar, Shield, Camera, Coffee } from 'lucide-react';

interface ExperienceDetailsProps {
  experience: any;
  onBack: () => void;
  onBook: () => void;
}

const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({ experience, onBack, onBook }) => {
  const highlights = [
    "Meet your local host and small group",
    "Learn traditional cooking techniques",
    "Enjoy a home-cooked meal together",
    "Take home recipes and cultural insights",
    "Professional photos included"
  ];

  const included = [
    "Expert local guide",
    "All cooking ingredients and equipment",
    "Traditional meal and beverages",
    "Recipe cards to take home",
    "Professional group photos",
    "Cultural storytelling session"
  ];

  const whatToBring = [
    "Comfortable walking shoes",
    "Camera or smartphone",
    "Appetite for adventure",
    "Open mind and curiosity"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{experience.title}</h1>
            <div className="flex items-center justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{experience.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{experience.groupSize}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-white bg-opacity-90 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Experience</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Join us for an authentic culinary journey where you'll learn traditional cooking techniques 
                passed down through generations. Our local host will welcome you into their home, share 
                family stories, and teach you the secrets behind their most cherished recipes.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                This isn't just a cooking class - it's a cultural immersion where food becomes the bridge 
                to understanding local traditions, family values, and the heart of the community.
              </p>
            </div>

            {/* What's Included */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Highlights */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Experience Highlights</h3>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Bring */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What to Bring</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {whatToBring.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Information */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Safety & Guidelines</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• All cooking areas are sanitized before each experience</li>
                <li>• Please inform us of any food allergies or dietary restrictions</li>
                <li>• Small group size ensures personalized attention and safety</li>
                <li>• 24/7 support available during your experience</li>
              </ul>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">{experience.price}</div>
                <div className="text-gray-600">per person</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Duration</span>
                  </div>
                  <span className="font-semibold text-gray-900">{experience.duration}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Group Size</span>
                  </div>
                  <span className="font-semibold text-gray-900">{experience.groupSize}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Location</span>
                  </div>
                  <span className="font-semibold text-gray-900">{experience.location}</span>
                </div>
              </div>

              <button 
                onClick={onBook}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mb-4"
              >
                Book This Experience
              </button>
              
              <p className="text-sm text-gray-500 text-center">
                Free cancellation up to 48 hours before the experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;