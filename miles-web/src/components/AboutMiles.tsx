import React from 'react';
import { Globe, Heart, Users, Award } from 'lucide-react';

const AboutMiles = () => {
  const stats = [
    { number: '50+', label: 'Countries' },
    { number: '10,000+', label: 'Happy Travelers' },
    { number: '500+', label: 'Local Hosts' },
    { number: '4.9', label: 'Average Rating' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-r from-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-orange-500">Miles</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded on the belief that the best travel experiences come from genuine human connections, 
            Miles curates authentic adventures led by passionate locals who love sharing their culture.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We believe travel should be more than just visiting places—it should be about connecting 
              with people, understanding cultures, and creating meaningful memories that last a lifetime.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-orange-500" />
                <span className="text-gray-700">Authentic cultural immersion</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-orange-500" />
                <span className="text-gray-700">Meaningful local connections</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-orange-500" />
                <span className="text-gray-700">Small group experiences</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-orange-500" />
                <span className="text-gray-700">Curated quality experiences</span>
              </div>
            </div>
          </div>
          
          <div>
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Miles team and local hosts"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMiles;
