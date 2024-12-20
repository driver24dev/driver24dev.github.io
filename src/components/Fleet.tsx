import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { images } from '../config/images';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationKey } from '@/translations/types';

const Fleet: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const vehicles: Array<{
    name: TranslationKey;
    image: string;
    description: TranslationKey;
    capacity: string;
  }> = [
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="fleet" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-gray-900"
        >
          {t('ourLuxuryFleet')}
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg overflow-hidden shadow-lg group"
              whileHover={{ y: -10 }}
            >
              <div className="h-64 overflow-hidden">
                <motion.img 
                  src={vehicle.image} 
                  alt={t(vehicle.name)}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <motion.div 
                className="p-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{t(vehicle.name)}</h3>
                <p className="text-gray-600 mb-4">{t(vehicle.description)}</p>
                <p className="text-sm text-gray-500">
                  {t('fleetCapacity')}: {vehicle.capacity} {t('passengers')}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Fleet;