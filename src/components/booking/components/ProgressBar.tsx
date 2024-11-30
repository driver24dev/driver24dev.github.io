import React from 'react';
import { Check, MapPin, Car, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookingStep } from '../types';

interface ProgressBarProps {
  currentStep: BookingStep;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { id: 'details', label: 'Trip Details', icon: MapPin },
    { id: 'vehicle', label: 'Select Vehicle', icon: Car },
    { id: 'payment', label: 'Payment', icon: CreditCard }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  return (
    <div className="w-full mb-8 px-8">
      <div className="flex justify-between relative max-w-2xl mx-auto">
        <div className="absolute top-6 left-[10%] right-[10%] h-[2px] bg-gray-200">
          <div 
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${getCurrentStepIndex() * 50}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = getCurrentStepIndex() > index;
          const isCurrent = step.id === currentStep;
          const Icon = step.icon;
          
          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10 w-24"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                  isCompleted ? 'bg-green-500 text-white shadow-lg shadow-green-200' :
                  isCurrent ? 'bg-black text-white shadow-lg' :
                  'bg-white text-gray-400 border-2 border-gray-200'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <Icon className="h-6 w-6" />
                )}
              </motion.div>
              
              <span className={`text-sm font-medium transition-colors duration-200 text-center ${
                isCompleted ? 'text-green-600' :
                isCurrent ? 'text-black' :
                'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;