import React from 'react';
import { ArrowRight, MapPin, Clock, Users } from 'lucide-react';

interface ExperiencesProps {
  onViewDetails: (experience: any) => void;
  onBookNow: (experience: any) => void;
}

const Experiences: React.FC<ExperiencesProps> = ({ onViewDetails, onBookNow }) => {
  const categories = [
    {
      title: "Food Adventures",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
      experiences: [
        {
          title: "Traditional Cooking with Nonna",
          location: "Rome, Italy",
          price: "$89",
          duration: "3 hours",
          groupSize: "4-6 people",
          image: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          title: "Street Food Walking Tour",
          location: "Bangkok, Thailand",
          price: "$45",
          duration: "2.5 hours",
          groupSize: "6-8 people",
          image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ]
    },
    {
      title: "Cultural Immersion",
      image: "https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=600",
      experiences: [
        {
          title: "Tea Ceremony & Philosophy",
          location: "Kyoto, Japan",
          price: "$75",
          duration: "2 hours",
          groupSize: "3-5 people",
          image: "https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          title: "Flamenco & Stories",
          location: "Seville, Spain",
          price: "$65",
          duration: "3 hours",
          groupSize: "4-8 people",
          image: "https://images.pexels.com/photos/7516366/pexels-photo-7516366.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ]
    },
    {
      title: "Nature Escapes",
      image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600",
      experiences: [
        {
          title: "Hidden Waterfall Hike",
          location: "Costa Rica",
          price: "$95",
          duration: "5 hours",
          groupSize: "4-6 people",
          image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          title: "Sunrise Mountain Meditation",
          location: "Nepal",
          price: "$55",
          duration: "4 hours",
          groupSize: "3-5 people",
          image: "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ]
    },
    {
      title: "City Walks",
      image: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=600",
      experiences: [
        {
          title: "Artists' Quarter Discovery",
          location: "Paris, France",
          price: "$35",
          duration: "2 hours",
          groupSize: "6-8 people",
          image: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
          title: "Underground Music Scene",
          location: "Berlin, Germany",
          price: "$40",
          duration: "3 hours",
          groupSize: "5-7 people",
          image: "https://images.pexels.com/photos/2422913/pexels-photo-2422913.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ]
    }
  ];

  return (
    <section id="experiences" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Curated <span className="text-orange-500">Experiences</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From hidden culinary gems to secret hiking trails, discover experiences that create lasting memories
          </p>
        </div>

        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              {category.title}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {category.experiences.map((experience, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-900">{experience.price}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                      {experience.title}
                    </h4>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{experience.groupSize}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => onViewDetails(experience)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => onBookNow(experience)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;