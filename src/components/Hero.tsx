import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { images } from '../config/images';

interface HeroProps {
  onBookNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 animate-gradient-x">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_30%)] animate-pulse-slow"></div>
        </div>
      </div>

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ 
            scale: [1.1, 1, 1.05, 1],
            opacity: [0, 1]
          }}
          transition={{ 
            scale: {
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            },
            opacity: { duration: 1 }
          }}
          src={images.heroBg}
          alt="Luxury car"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white"
          >
            Experience Luxury Transportation in Los Angeles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Professional chauffeurs, premium vehicles, and exceptional service for your transportation needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookNow}
              className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition flex items-center justify-center group relative overflow-hidden"
            >
              <span className="relative z-10">Book Your Ride</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="relative z-10 ml-2"
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1 }}
              />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#fleet"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition text-center relative overflow-hidden group"
            >
              <span className="relative z-10">View Our Fleet</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.a
          href="#services"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white flex flex-col items-center"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowRight className="h-5 w-5 transform rotate-90" />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Hero;