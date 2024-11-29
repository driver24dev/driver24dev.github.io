import React from 'react';
import { motion } from 'framer-motion';
import BookingSummary from './BookingSummary';
import { BookingDetails } from '../types';

interface MobileBookingSummaryProps {
  bookingDetails: BookingDetails;
  agreeToTerms: boolean;
  onAgreeToTermsChange: (agreed: boolean) => void;
  onBack: () => void;
}

const MobileBookingSummary: React.FC<MobileBookingSummaryProps> = (props) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden mb-6"
    >
      <BookingSummary {...props} />
    </motion.div>
  );
};

export default MobileBookingSummary;