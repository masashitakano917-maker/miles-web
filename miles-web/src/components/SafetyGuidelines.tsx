import React from 'react';
import { Shield, Users, Phone, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const SafetyGuidelines = () => {
  const guidelines = [
    {
      icon: Shield,
      title: "Verified Hosts",
      description: "All hosts undergo background checks and verification processes"
    },
    {
      icon: Users,
      title: "Group Safety",
      description: "Small group sizes ensure better supervision and personalized attention"
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Emergency support available around the clock during your experience"
    },
    {
      icon: FileText,
      title: "Insurance Coverage",
      description: "Comprehensive insurance protection for all participants"
    }
  ];

  const safetyTips = [
    "Always inform someone of your travel plans and expected return time",
    "Keep emergency contact information easily accessible",
    "Follow your host's safety instructions and local guidelines",
    "Stay with the group and don't wander off alone",
    "Bring appropriate clothing and gear as recommended",
    "Keep copies of important documents in a separate location",
    "Trust your instincts - if something feels unsafe, speak up",
    "Stay hydrated and take breaks when needed"
  ];

  return (
    <section id="safety" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Safety <span className="text-orange-500">Guidelines</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your safety and peace of mind are our top priorities. Here's how we ensure 
            every Miles experience is both exciting and secure.
          </p>
        </div>

        {/* Safety Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {guidelines.map((guideline, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <guideline.icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {guideline.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {guideline.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Safety Tips */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h3 className="text-2xl font-bold text-gray-900">Safety Tips for Travelers</h3>
            </div>
            
            <div className="space-y-3">
              {safetyTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Procedures */}
          <div className="bg-orange-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Emergency Procedures</h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">During an Experience</h4>
                <p className="text-gray-600 text-sm">
                  Contact your host immediately. If unavailable, call our 24/7 emergency line: 
                  <span className="font-semibold text-orange-600"> +1 (555) 911-HELP</span>
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Medical Emergency</h4>
                <p className="text-gray-600 text-sm">
                  Call local emergency services first, then notify Miles support. 
                  We'll coordinate with local authorities and your emergency contacts.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Lost or Separated</h4>
                <p className="text-gray-600 text-sm">
                  Stay calm and remain in your last known location. Contact your host 
                  and Miles support immediately for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyGuidelines;