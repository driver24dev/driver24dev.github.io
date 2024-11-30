import React from 'react';
import { CreditCard, Wallet, Bitcoin } from 'lucide-react';
import { PaymentMethod } from './types';

interface PaymentMethodSelectProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const PaymentMethodSelect = ({
  value,
  onChange
}: PaymentMethodSelectProps) => {
  const methods = [
    {
      id: 'credit_card' as const,
      label: 'Credit Card',
      icon: CreditCard,
      description: 'Pay securely with your credit card'
    },
    {
      id: 'paypal' as const,
      label: 'PayPal',
      icon: Wallet,
      description: 'Pay using your PayPal account'
    },
    {
      id: 'crypto' as const,
      label: 'Cryptocurrency',
      icon: Bitcoin,
      description: 'Pay with Bitcoin or other cryptocurrencies'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {methods.map(({ id, label, icon: Icon, description }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`flex flex-col items-start p-4 rounded-lg border-2 transition-all ${
            value === id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className={`p-2 rounded-full ${
            value === id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="mt-3">
            <p className={`font-medium ${
              value === id ? 'text-blue-700' : 'text-gray-900'
            }`}>
              {label}
            </p>
            <p className={`text-sm mt-1 ${
              value === id ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default PaymentMethodSelect;