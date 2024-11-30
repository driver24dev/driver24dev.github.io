import { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { BookingDetails } from '../types';
import PaymentMethodSelect from '../../PaymentForm/PaymentMethodSelect';
import BookingSummary from '../../PaymentForm/BookingSummary';

interface PaymentDetailsProps {
  bookingDetails: BookingDetails;
  onBack: () => void;
  onSubmit: () => void;
}

const PaymentDetails = ({
  bookingDetails,
  onBack,
  onSubmit
}: PaymentDetailsProps) => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
        {isMobile && (
          <button
            type="button"
            onClick={() => setShowMobileDetails(!showMobileDetails)}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            <Info className="h-5 w-5" />
            {showMobileDetails ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <PaymentMethodSelect
            value="credit_card"
            onChange={() => {}}
          />
        </div>

        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-1/3"
          >
            <div className="sticky top-24">
              <BookingSummary
                bookingDetails={bookingDetails}
                agreeToTerms={agreeToTerms}
                onAgreeToTermsChange={setAgreeToTerms}
                onBack={onBack}
              />
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!agreeToTerms}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Booking
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;