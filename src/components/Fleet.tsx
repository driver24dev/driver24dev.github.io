import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Fleet: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const vehicles = [
    {
      name: 'Mercedes-Benz S-Class',
      image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&q=80',
      description: 'Ultimate luxury sedan for executive travel',
      capacity: '3 passengers',
    },
    {
      name: 'Cadillac Escalade',
      image: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?auto=format&fit=crop&q=80',
      description: 'Spacious SUV perfect for groups or luggage',
      capacity: '6 passengers',
    },
    {
      name: 'Mercedes-Benz Sprinter',
      image: 'https://images.unsplash.com/photo-1609520505218-7421df70c8a1?auto=format&fit=crop&q=80',
      description: 'Luxury van for group transportation',
      capacity: '12 passengers',
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
    <section id="fleet" className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Luxury Fleet
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
                  alt={vehicle.name}
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
                <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
                <p className="text-gray-600 mb-4">{vehicle.description}</p>
                <p className="text-sm text-gray-500">Capacity: {vehicle.capacity}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Fleet;