import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import PaymentMethodSelector from '../inputs/PaymentMethodSelector';
import { PaymentMethod } from '../types';
import { BookingDetails } from '../../PaymentForm/types';

interface PaymentDetailsProps {
  formData: BookingFormData;
  selectedVehicle: string | null;
  bookingDetails: BookingDetails;
}

const PaymentDetails = ({
  formData,
  selectedVehicle,
  bookingDetails
}: PaymentDetailsProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const renderPaymentFields = () => {
    if (paymentMethod !== 'credit_card') {
      return (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">
            {paymentMethod === 'paypal' && 'You will be redirected to PayPal to complete your payment'}
            {paymentMethod === 'crypto' && 'Cryptocurrency payment details will be provided after booking'}
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
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
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
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
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
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
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
      <PaymentMethodSelector
        value={paymentMethod}
        onChange={setPaymentMethod}
        className="mb-8"
      />

      {renderPaymentFields()}

      <div className="pt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-900">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
          </span>
        </label>
      </div>
    </div>
  );
};

export default PaymentDetails;