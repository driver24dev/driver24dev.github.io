import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import PaymentMethodSelect from '../components/PaymentMethodSelect';
import { PaymentDetailsProps, PaymentMethod, PaymentDetails as PaymentDetailsType } from '../types/booking';

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  bookingDetails: _bookingDetails,
  onBack,
  onSubmit
}) => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsType>({
    method: 'credit_card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    postalCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const renderPaymentFields = () => {
    if (paymentDetails.method !== 'credit_card') {
      return (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">
            {paymentDetails.method === 'paypal' 
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
              value={paymentDetails.cardNumber}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
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
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolder: e.target.value })}
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
              onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
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
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Details</h3>
        <PaymentMethodSelect
          value={paymentDetails.method}
          onChange={(method: PaymentMethod) => setPaymentDetails({ ...paymentDetails, method })}
        />
      </div>

      {renderPaymentFields()}

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
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Complete Booking
        </button>
      </div>
    </form>
  );
};

export default PaymentDetails;