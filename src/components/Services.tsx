import React from 'react';
import { Plane, Building2, GlassWater, Users, Car, Calendar } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Plane className="h-8 w-8" />,
      title: 'Airport Transfers',
      description: 'Reliable and punctual airport pickup and drop-off services at LAX and other regional airports.',
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: 'Corporate Transportation',
      description: 'Professional transportation solutions for business executives and corporate events.',
    },
    {
      icon: <GlassWater className="h-8 w-8" />,
      title: 'Special Events',
      description: 'Luxury transportation for weddings, proms, anniversaries, and other special occasions.',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Group Transportation',
      description: 'Comfortable and coordinated transportation for large groups and events.',
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: 'City Tours',
      description: 'Customized tours of Los Angeles and surrounding areas with knowledgeable chauffeurs.',
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Hourly Service',
      description: 'Flexible hourly booking options for meetings, events, or personal errands.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
          <p className="text-xl text-gray-900 max-w-2xl mx-auto">
            Experience the finest in luxury transportation with our comprehensive range of services
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-block p-3 bg-black text-white rounded-lg mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
              <p className="text-gray-900">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;