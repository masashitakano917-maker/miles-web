import React from 'react';
import { Search, Calendar, Users, Camera } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Explore Experiences",
      description: "Browse unique experiences curated by local hosts in destinations worldwide"
    },
    {
      icon: Calendar,
      title: "Book with Ease",
      description: "Simple booking process with instant confirmation and flexible cancellation"
    },
    {
      icon: Users,
      title: "Connect with Locals",
      description: "Meet your local host and fellow travelers for an authentic cultural exchange"
    },
    {
      icon: Camera,
      title: "Share & Remember",
      description: "Create lasting memories and share your stories with the Miles community"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It <span className="text-orange-500">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to your next unforgettable adventure
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              {/* Step Number */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-orange-500 transition-colors duration-300">
                  <step.icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
              
              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-orange-200 transform translate-x-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;