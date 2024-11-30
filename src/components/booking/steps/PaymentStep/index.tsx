import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import PaymentMethodSelect from '../../components/payment/PaymentMethodSelect';
import PaymentSummary from '../../components/payment/PaymentSummary';
import { BookingDetails, PaymentMethod } from '../../types';

interface PaymentStepProps {
  bookingDetails: BookingDetails;
  onBack: () => void;
  onSubmit: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  bookingDetails,
  onBack,
  onSubmit
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) return;
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

      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <PaymentMethodSelect
            value={paymentMethod}
            onChange={setPaymentMethod}
          />

          {paymentMethod === 'credit_card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!agreeToTerms}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              Complete Booking
            </button>
          </div>
        </div>

        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-1/3"
          >
            <div className="sticky top-24">
              <PaymentSummary
                bookingDetails={bookingDetails}
                agreeToTerms={agreeToTerms}
                onAgreeToTermsChange={setAgreeToTerms}
              />
            </div>
          </motion.div>
        )}
      </div>
    </form>
  );
};

export default PaymentStep;