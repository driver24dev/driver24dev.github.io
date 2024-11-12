import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What areas do you serve?',
      answer: 'We primarily serve the Greater Los Angeles area, including LAX, Beverly Hills, Santa Monica, and surrounding counties. We also accommodate long-distance trips upon request.',
    },
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 24 hours in advance to ensure availability. However, we do accommodate last-minute bookings based on availability.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Cancellations made 24 hours or more before the scheduled service are fully refundable. Cancellations within 24 hours may be subject to a cancellation fee.',
    },
    {
      question: 'Are your drivers background checked?',
      answer: 'Yes, all our chauffeurs undergo comprehensive background checks, drug testing, and professional training. They are licensed, insured, and highly experienced.',
    },
    {
      question: 'Do you provide child car seats?',
      answer: 'Yes, we can provide child car seats upon request. Please specify your requirements when booking.',
    },
    {
      question: 'What forms of payment do you accept?',
      answer: 'We accept all major credit cards, corporate accounts, and digital payments including Apple Pay and Google Pay.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full flex justify-between items-center p-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-left">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white border border-gray-100 rounded-b-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;