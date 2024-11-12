import React from 'react';
import { Check } from 'lucide-react';

interface PricingProps {
  onBookNow: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onBookNow }) => {
  const plans = [
    {
      name: 'Airport Transfer',
      price: '129',
      features: [
        'Luxury sedan service',
        'Professional chauffeur',
        'Flight tracking',
        'Meet & greet service',
        '60 minutes free wait time',
        'Complimentary water',
      ],
    },
    {
      name: 'Hourly Charter',
      price: '99',
      features: [
        'Minimum 3 hours',
        'Choice of vehicle',
        'Professional chauffeur',
        'Unlimited stops',
        'Customizable itinerary',
        'Complimentary amenities',
      ],
    },
    {
      name: 'Special Event',
      price: '499',
      features: [
        '4 hours minimum',
        'Premium vehicle',
        'Red carpet service',
        'Decorated vehicle',
        'Professional photos',
        'Champagne service',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect service package for your transportation needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.name === 'Hourly Charter' && <span className="text-gray-600">/hour</span>}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onBookNow}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;