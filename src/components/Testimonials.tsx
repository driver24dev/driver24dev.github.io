import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Michael R.',
      role: 'Business Executive',
      content: 'Exceptional service! The chauffeur was professional and the vehicle was immaculate. Perfect for business travel.',
      rating: 5,
    },
    {
      name: 'Sarah L.',
      role: 'Event Planner',
      content: 'We use LA Elite Chauffeur for all our high-profile clients. Their reliability and luxury service is unmatched.',
      rating: 5,
    },
    {
      name: 'David M.',
      role: 'Hotel Concierge',
      content: 'Our guests always praise their punctuality and professional service. The best chauffeur service in Los Angeles.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Client Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">{testimonial.content}</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;