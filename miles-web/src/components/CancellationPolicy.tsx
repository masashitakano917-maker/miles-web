import React from 'react';
import { Calendar, RefreshCw, CreditCard, Clock } from 'lucide-react';

const CancellationPolicy = () => {
  const policies = [
    {
      icon: Calendar,
      title: "48+ Hours Before",
      description: "Full refund available",
      color: "text-green-500 bg-green-100"
    },
    {
      icon: Clock,
      title: "24-48 Hours Before",
      description: "50% refund available",
      color: "text-yellow-500 bg-yellow-100"
    },
    {
      icon: RefreshCw,
      title: "Less than 24 Hours",
      description: "No refund",
      color: "text-red-500 bg-red-100"
    },
    {
      icon: CreditCard,
      title: "Host Cancellation",
      description: "Full refund + 10% credit",
      color: "text-blue-500 bg-blue-100"
    }
  ];

  return (
    <section id="cancellation" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cancellation <span className="text-orange-500">Policy</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand that travel plans can change. Here's our flexible cancellation policy 
            designed to be fair for both travelers and hosts.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {policies.map((policy, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${policy.color}`}>
                <policy.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {policy.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {policy.description}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Information */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-orange-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Refund Process</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Cancel Your Booking</h4>
                  <p className="text-gray-600 text-sm">Use your booking confirmation email or contact our support team</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Automatic Processing</h4>
                  <p className="text-gray-600 text-sm">Refunds are processed automatically based on our policy</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Receive Refund</h4>
                  <p className="text-gray-600 text-sm">Refunds appear in your original payment method within 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Special Circumstances</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Weather Cancellations</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  If an experience is cancelled due to severe weather, you'll receive a full refund 
                  or can reschedule at no additional cost.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Medical Emergencies</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Medical emergencies are handled case-by-case with maximum flexibility. 
                  We recommend travel insurance for additional protection.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Force Majeure</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  For events beyond our control (natural disasters, political unrest), 
                  full refunds or credits are provided.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need help with a cancellation?</p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default CancellationPolicy;