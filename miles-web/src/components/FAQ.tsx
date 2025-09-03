import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I book an experience?",
      answer: "Simply browse our experiences, select your preferred date and group size, and complete the secure booking process. You'll receive instant confirmation and all the details you need."
    },
    {
      question: "What's included in the experience price?",
      answer: "Each experience includes the local host's guidance, any materials or equipment needed, and often food or drinks. Specific inclusions are listed on each experience page."
    },
    {
      question: "How are the local hosts selected?",
      answer: "All our hosts go through a rigorous vetting process. We verify their local knowledge, communication skills, and passion for sharing their culture. We also check reviews and conduct background checks."
    },
    {
      question: "What if I need to cancel my booking?",
      answer: "We offer flexible cancellation policies. Most experiences can be cancelled up to 24-48 hours before the start time for a full refund. Check the specific cancellation policy for each experience."
    },
    {
      question: "Are the experiences suitable for solo travelers?",
      answer: "Absolutely! Many of our travelers are solo adventurers. Our small group format makes it easy to connect with fellow travelers and locals in a comfortable, welcoming environment."
    },
    {
      question: "What safety measures are in place?",
      answer: "Safety is our top priority. All hosts are verified, we provide 24/7 support during experiences, and we have comprehensive insurance coverage. We also provide safety guidelines for each destination."
    },
    {
      question: "Can I request a private experience?",
      answer: "Yes! Many of our hosts offer private experiences for individuals, couples, or small groups. Contact us or the host directly to arrange a customized experience."
    },
    {
      question: "What languages do the hosts speak?",
      answer: "All our hosts speak English fluently, and many are multilingual. Language capabilities are listed on each host's profile and experience page."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about traveling with Miles
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;