import React from 'react';
import { Shield, Clock, Award, Headphones, CreditCard, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationKey } from '@/translations/types';

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features: Array<{
    icon: JSX.Element;
    title: TranslationKey;
    description: TranslationKey;
  }> = [
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
      icon: <Award className="h-8 w-8" />,
      title: 'premiumFleet',
      description: 'fleetDesc',
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: 'support',
      description: 'supportDesc',
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: 'easyBooking',
      description: 'bookingDesc',
    },
    {
      icon: <MapPin className="h-8 w-8" />,
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
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="inline-block p-3 bg-black text-white rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{t(feature.title)}</h3>
              <p className="text-gray-600">{t(feature.description)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;