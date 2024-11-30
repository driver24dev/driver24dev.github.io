import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { PaymentFormProps, PassengerInfo, PaymentDetails } from './types';
import PassengerInfoSection from './PassengerInfoSection';
import PaymentInfoSection from './PaymentInfoSection';
import BookingSummary from './BookingSummary';

const PaymentForm: React.FC<PaymentFormProps> = ({
  onBack,
  onSubmit,
  bookingDetails
}) => {
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    nameSign: ''
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: 'credit_card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    postalCode: ''
  });

  const [specialInstructions, setSpecialInstructions] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      return;
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isMobile && (
        <div className="flex justify-end items-center mb-4">
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
        </div>
      )}

      {isMobile && showMobileDetails && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden mb-6"
        >
          <BookingSummary
            bookingDetails={bookingDetails}
            agreeToTerms={agreeToTerms}
            onAgreeToTermsChange={setAgreeToTerms}
            onBack={onBack}
          />
        </motion.div>
      )}

      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <PassengerInfoSection
            passengerInfo={passengerInfo}
            onPassengerInfoChange={setPassengerInfo}
          />

          <PaymentInfoSection
            paymentDetails={paymentDetails}
            onPaymentDetailsChange={setPaymentDetails}
          />

          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Any special requests or instructions for your ride?"
            />
          </div>
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

      {isMobile && !showMobileDetails && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 mr-2 px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!agreeToTerms}
              className="flex-1 ml-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default PaymentForm;