import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { BookingFormData } from '../../types';
import PaymentMethodSelector from './PaymentMethodSelector';

interface PaymentDetailsProps {
  formData: BookingFormData;
  selectedVehicle: string | null;
}

interface PaymentInfo {
  method: 'credit_card' | 'paypal' | 'crypto';
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  formData,
  selectedVehicle
}) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'credit_card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const renderPaymentFields = () => {
    if (paymentInfo.method !== 'credit_card') {
      return (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">
            {paymentInfo.method === 'paypal' 
              ? 'You will be redirected to PayPal to complete your payment'
              : 'Cryptocurrency payment details will be provided after booking'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <div className="relative">
            <input
              type="text"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1234 5678 9012 3456"
              required
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder</label>
          <input
            type="text"
            value={paymentInfo.cardHolder}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardHolder: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="text"
              value={paymentInfo.expiryDate}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
              type="text"
              value={paymentInfo.cvv}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123"
              required
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Details</h3>
        <PaymentMethodSelector
          value={paymentInfo.method}
          onChange={(method) => setPaymentInfo({ ...paymentInfo, method })}
        />
      </div>

      {renderPaymentFields()}
    </div>
  );
};

export default PaymentDetails;