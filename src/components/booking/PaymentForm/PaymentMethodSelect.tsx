import React from 'react';
import { CreditCard, Paypal, Bitcoin } from 'lucide-react';

type PaymentMethod = 'credit_card' | 'paypal' | 'crypto';

interface PaymentMethodSelectProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const PaymentMethodSelect: React.FC<PaymentMethodSelectProps> = ({ value, onChange }) => {
  const methods = [
    { id: 'credit_card', label: 'Credit Card', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'paypal', label: 'PayPal', icon: <Paypal className="h-5 w-5" /> },
    { id: 'crypto', label: 'Cryptocurrency', icon: <Bitcoin className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Payment Option</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as PaymentMethod)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        {methods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaymentMethodSelect;