import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Check } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface BookingPageProps {
  experience: any;
  onBack: () => void;
}

type Step = 1 | 2 | 3;

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
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);

  // ページを開いたら最上部へスクロール
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 通貨/金額ユーティリティ
  const detectCurrency = (raw: string): 'JPY' | 'USD' => {
    if (/JPY|¥|円/i.test(raw)) return 'JPY';
    if (/\$\s*/.test(raw)) return 'USD';
    // 表記がない場合は JPY 前提
    return 'JPY';
  };
  const parseUnitPrice = (raw: string): number => {
    // 例: "$45" / "JPY 8,000" / "¥8,000" / "8,000円" を 45 / 8000 に
    const digits = String(raw).replace(/[^\d]/g, '');
    const n = Number(digits || 0);
    return Number.isFinite(n) ? n : 0;
  };

  const unitPrice = parseUnitPrice(experience?.price ?? '');
  const currency = detectCurrency(experience?.price ?? '');
  const totalPrice = unitPrice * Number(bookingData.guests || 1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendBookingConfirmation();
  };

  const sendBookingConfirmation = async () => {
    try {
      setSubmitting(true);

      const bookingId = `MILES-${Date.now()}`;
      const when = bookingData.date; // "YYYY-MM-DD"
      const fullName = `${bookingData.firstName} ${bookingData.lastName}`.trim();

      const bookingPayload = {
        customerName: fullName,
        customerEmail: bookingData.email,
        experienceTitle: experience.title,
        experienceLocation: experience.location,
        bookingDate: when,
        numberOfGuests: bookingData.guests,
        totalPrice, // 数値
        currency,   // 追加で送りたいとき用
        specialRequests: bookingData.specialRequests,
        bookingId,
        bookingTime: new Date().toISOString(),
      };

      // 1) 確認メール送信
      const res = await fetch('/api/send-booking-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      const text = await res.text();
      let json: any = {};
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error(`Unexpected server response: ${text}`);
      }

      if (!json?.success) {
        console.error('Email sending failed:', json);
        alert('Booking confirmed, but sending the confirmation email failed. Please contact support if you need assistance.');
      } else {
        alert('Booking confirmed! You will receive a confirmation email shortly.');
      }

      // 2) Supabase に記録（開発用：失敗しても UI は成功のまま）
      try {
        // 将来 Auth 導入後は実ユーザーIDに置き換え
        const { data: authData } = await supabase.auth.getUser();
        const userId = authData?.user?.id ?? null;

        const { error } = await supabase.from('bookings').insert({
          user_id: userId, // ← テーブル制約により null を許可していないとエラーになります
          experience_id: experience?.id ?? null,
          experience_title: experience?.title ?? 'Untitled',
          date: when, // "YYYY-MM-DD"
          guests: Number(bookingData.guests || 1),
          amount: totalPrice,     // JPY/整数
          currency,
          status: 'confirmed',
        });

        if (error) {
          console.warn('[bookings insert] failed:', error.message);
        }
      } catch (dbErr) {
        console.warn('[bookings insert] exception:', dbErr);
      }
    } catch (err) {
      console.error('Booking flow failed:', err);
      alert('Sorry, something went wrong while processing your booking.');
    } finally {
      setSubmitting(false);
    }
  };

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
            <p className="text-gray-600">
              {experience.title} in {experience.location}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    1
                  </div>
                  <span className={currentStep >= 1 ? 'text-orange-500 font-semibold' : 'text-gray-500'}>
                    Date & Guests
                  </span>
                </div>

                <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                  <div
                    className={`h-full transition-all duration-300 ${
                      currentStep >= 2 ? 'bg-orange-500 w-full' : 'bg-gray-200 w-0'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    2
                  </div>
                  <span className={currentStep >= 2 ? 'text-orange-500 font-semibold' : 'text-gray-500'}>
                    Your Details
                  </span>
                </div>

                <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                  <div
                    className={`h-full transition-all duration-300 ${
                      currentStep >= 3 ? 'bg-orange-500 w-full' : 'bg-gray-200 w-0'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                      <select
                        name="guests"
                        value={bookingData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
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
                      <p className="text-green-600 text-sm mt-1">Your payment information is encrypted and secure</p>
                    </div>

                    {/* ダミー入力（決済未連携） */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
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
                        disabled={submitting}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className={`flex-1 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-white ${
                          submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                        }`}
                        disabled={submitting}
                      >
                        {submitting ? 'Processing…' : 'Complete Booking'}
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
                  <span className="font-semibold text-gray-900">{bookingData.date || 'Select date'}</span>
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
                  <span>
                    {currency === 'USD' ? '$' : '¥'}
                    {totalPrice.toLocaleString()}
                  </span>
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
