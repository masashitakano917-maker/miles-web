import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Users, CreditCard, Shield, Check } from 'lucide-react';

interface BookingPageProps {
  experience: any;
  onBack: () => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ experience, onBack }) => {
  const [bookingData, setBookingData] = useState({
    date: '',
    guests: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
+
+  // ページを開いたら最上部へスクロール
+  useEffect(() => {
+    window.scrollTo({ top: 0, behavior: 'smooth' });
+  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendBookingConfirmation();
  };

  const sendBookingConfirmation = async () => {
    try {
      const bookingDetails = {
        customerName: `${bookingData.firstName} ${bookingData.lastName}`,
        customerEmail: bookingData.email,
        experienceTitle: experience.title,
        experienceLocation: experience.location,
        bookingDate: bookingData.date,
        numberOfGuests: bookingData.guests,
        totalPrice: totalPrice,
        specialRequests: bookingData.specialRequests,
        bookingId: `MILES-${Date.now()}`,
        bookingTime: new Date().toISOString()
      };

      console.log('Sending booking confirmation:', bookingDetails);
      
      const response = await fetch('/api/send-booking-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      let result;
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error(`Server returned invalid response: ${responseText}`);
      }
      
      console.log('Response data:', result);

      if (result.success) {
        alert('Booking confirmed! You will receive a confirmation email shortly.');
      } else {
        console.error('Email sending failed:', result);
        alert('Booking confirmed! However, there was an issue sending the confirmation email. Please contact support if you need assistance.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      console.error('Error sending booking confirmation:', error);
      alert('Booking confirmed! However, there was an issue sending the confirmation email. Please contact support if you need assistance.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const totalPrice = parseInt(experience.price.replace('$', '')) * bookingData.guests;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBack}
            className="bg-white hover:bg-gray-50 text-gray-900 p-3 rounded-full shadow-md transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Book Your Experience</h1>
            <p className="text-gray-600">{experience.title} in {experience.location}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <span className={currentStep >= 1 ? 'text-orange-500 font-semibold' : 'text-gray-500'}>
                    Date & Guests
                  </span>
                </div>
                
                <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                  <div className={`h-full transition-all duration-300 ${
                    currentStep >= 2 ? 'bg-orange-500 w-full' : 'bg-gray-200 w-0'
                  }`}></div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <span className={currentStep >= 2 ? 'text-orange-500 font-semibold' : 'text-gray-500'}>
                    Your Details
                  </span>
                </div>
                
                <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                  <div className={`h-full transition-all duration-300 ${
                    currentStep >= 3 ? 'bg-orange-500 w-full' : 'bg-gray-200 w-0'
                  }`}></div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    3
                  </div>
                  <span className={currentStep >= 3 ? 'text-orange-500 font-semibold' : 'text-gray-500'}>
                    Payment
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Date & Guests */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Number of Guests</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Guests
                      </label>
                      <select
                        name="guests"
                        value={bookingData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>

                    <button 
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                    >
                      Continue to Details
                    </button>
                  </div>
                )}

                {/* Step 2: Personal Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={bookingData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={bookingData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests or Dietary Restrictions
                      </label>
                      <textarea
                        name="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        placeholder="Any allergies, dietary restrictions, or special requests..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                      >
                        Back
                      </button>
                      <button 
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                    
                    <div className="bg-green-50 p-4 rounded-lg mb-6">
                      <div className="flex items-center gap-2 text-green-700">
                        <Shield className="w-5 h-5" />
                        <span className="font-semibold">Secure Payment</span>
                      </div>
                      <p className="text-green-600 text-sm mt-1">
                        Your payment information is encrypted and secure
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                      >
                        Complete Booking
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold text-gray-900">{experience.title}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold text-gray-900">{experience.location}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold text-gray-900">
                    {bookingData.date || 'Select date'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-semibold text-gray-900">{bookingData.guests}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per person</span>
                  <span className="font-semibold text-gray-900">{experience.price}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Free cancellation up to 48 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
