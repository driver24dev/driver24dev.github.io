import React from 'react';
import { CreditCard, Wallet, Bitcoin, DollarSign } from 'lucide-react';
import { PaymentMethod } from '../../types';

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  className?: string;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  value,
  onChange,
  className = ''
}) => {
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
    },
    {
      id: 'cash' as const,
      label: 'Cash',
      icon: DollarSign,
      description: 'Pay in cash to the driver'
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        Payment Method
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {methods.map(({ id, label, icon: Icon, description }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex items-start space-x-4 p-4 rounded-lg border-2 transition-all ${
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
            <div className="flex-1 text-left">
              <p className={`font-medium ${
                value === id ? 'text-blue-700' : 'text-gray-900'
              }`}>
                {label}
              </p>
              <p className={`text-sm ${
                value === id ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;