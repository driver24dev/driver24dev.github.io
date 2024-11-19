import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { images } from '@/config/images';

const Fleet: React.FC = () => {
  const { t } = useTranslation();

  const vehicles = [
    {
      name: 'sedanTitle',
      image: images.fleet.mercedes,
      description: 'sedanDesc',
      capacity: '3',
    },
    {
      name: 'suvTitle',
      image: images.fleet.escalade,
      description: 'suvDesc',
      capacity: '6',
    },
    {
      name: 'vanTitle',
      image: images.fleet.sprinter,
      description: 'vanDesc',
      capacity: '12',
    },
  ];

  return (
    <section id="fleet" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Luxury Fleet</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our selection of premium vehicles
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={vehicle.image}
                  alt={t(vehicle.name)}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(vehicle.name)}</h3>
              <p className="text-gray-600 mb-2">{t(vehicle.description)}</p>
              <p className="text-sm text-gray-500">Up to {vehicle.capacity} passengers</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;