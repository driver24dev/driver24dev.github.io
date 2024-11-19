import React from 'react';
import { Shield, Clock, Star, Users, MapPin, CreditCard } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Features: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'safetyFirst',
      description: 'safetyDesc',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: '24_7Service',
      description: 'serviceDesc',
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'luxuryFleet',
      description: 'fleetDesc',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'professionalTeam',
      description: 'teamDesc',
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'cityKnowledge',
      description: 'cityDesc',
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: 'easyPayment',
      description: 'paymentDesc',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the difference with our premium chauffeur service
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-block p-3 bg-black text-white rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{t(feature.title)}</h3>
              <p className="text-gray-600">{t(feature.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;