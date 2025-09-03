import React from 'react';
import { Users, Heart, MapPin, Star } from 'lucide-react';

const WhyMiles = () => {
  const benefits = [
    {
      icon: Users,
      title: "With Locals, Always",
      description: "Connect with authentic local guides who know the hidden gems"
    },
    {
      icon: Heart,
      title: "Handpicked & Meaningful",
      description: "Every experience is carefully curated for genuine cultural immersion"
    },
    {
      icon: MapPin,
      title: "Stories You Can't Google",
      description: "Discover untold stories and secret spots only locals know"
    },
    {
      icon: Star,
      title: "Small & Personal",
      description: "Intimate group sizes ensure personalized attention and connections"
    }
  ];

  return (
    <section id="why-miles" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img 
              src="https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Small group of travelers exploring together"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Why <span className="text-orange-500">Miles</span>?
            </h2>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                    <benefit.icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMiles;