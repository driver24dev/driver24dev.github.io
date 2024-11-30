import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { PaymentFormProps, PassengerInfo, PaymentDetails } from './types';
import PassengerInfoSection from './PaymentForm/PassengerInfoSection';
import PaymentInfoSection from './PaymentForm/PaymentInfoSection';
import BookingSummary from './PaymentForm/BookingSummary';
import SpecialInstructions from './PaymentForm/SpecialInstructions';
import TermsCheckbox from './PaymentForm/TermsCheckbox';
import ActionButtons from './PaymentForm/ActionButtons';
import MobileBookingSummary from './PaymentForm/MobileBookingSummary';

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Payment & Confirmation</h2>
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

      {isMobile && showMobileDetails && (
        <MobileBookingSummary
          bookingDetails={bookingDetails}
          agreeToTerms={agreeToTerms}
          onAgreeToTermsChange={setAgreeToTerms}
          onBack={onBack}
        />
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

          <SpecialInstructions
            value={specialInstructions}
            onChange={setSpecialInstructions}
          />

          <TermsCheckbox
            checked={agreeToTerms}
            onChange={setAgreeToTerms}
          />

          <ActionButtons
            onBack={onBack}
            disabled={!agreeToTerms}
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
    </form>
  );
};

export default PaymentForm;