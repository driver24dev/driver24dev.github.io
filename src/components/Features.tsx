import React from 'react';
import { Shield, Clock, Award, Headphones, CreditCard, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '@/hooks/useTranslation';
import FeatureCard from './ui/FeatureCard';

const Features: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const features = [
    {
      icon: Shield,
      title: 'safetyFirst',
      description: 'safetyDesc',
    },
    {
      icon: Clock,
      title: '24_7Service',
      description: 'serviceDesc',
    },
    {
      icon: Award,
      title: 'premiumFleet',
      description: 'fleetDesc',
    },
    {
      icon: Headphones,
      title: 'support',
      description: 'supportDesc',
    },
    {
      icon: CreditCard,
      title: 'easyBooking',
      description: 'bookingDesc',
    },
    {
      icon: MapPin,
      title: 'localExpertise',
      description: 'expertiseDesc',
    },
  ];

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t('whyChooseUs')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('experienceDifference')}
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={t(feature.title)}
              description={t(feature.description)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;