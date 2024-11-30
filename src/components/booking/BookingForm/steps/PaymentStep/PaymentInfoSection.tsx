import React from 'react';
import { CreditCard } from 'lucide-react';
import { PaymentDetails } from '../../../types';

interface PaymentInfoSectionProps {
  paymentDetails: PaymentDetails;
  onPaymentDetailsChange: (details: PaymentDetails) => void;
}

const PaymentInfoSection: React.FC<PaymentInfoSectionProps> = ({
  paymentDetails,
  onPaymentDetailsChange
}) => {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <div className="relative">
          <input
            type="text"
            value={paymentDetails.cardNumber}
            onChange={(e) => onPaymentDetailsChange({ ...paymentDetails, cardNumber: e.target.value })}
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
          value={paymentDetails.cardHolder}
          onChange={(e) => onPaymentDetailsChange({ ...paymentDetails, cardHolder: e.target.value })}
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
            value={paymentDetails.expiryDate}
            onChange={(e) => onPaymentDetailsChange({ ...paymentDetails, expiryDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <input
            type="text"
            value={paymentDetails.cvv}
            onChange={(e) => onPaymentDetailsChange({ ...paymentDetails, cvv: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="123"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoSection;