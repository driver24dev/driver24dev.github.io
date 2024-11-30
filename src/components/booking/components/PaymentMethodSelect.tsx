import React from 'react';
import { CreditCard, Wallet, Bitcoin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentMethod } from '../types/booking';

interface PaymentMethodSelectProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

const PaymentMethodSelect: React.FC<PaymentMethodSelectProps> = ({ value, onChange }) => {
  const methods = [
    { id: 'credit_card', label: 'Credit Card', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'paypal', label: 'PayPal', icon: <Wallet className="h-4 w-4" /> },
    { id: 'crypto', label: 'Cryptocurrency', icon: <Bitcoin className="h-4 w-4" /> }
  ];

  const selectedMethod = methods.find(method => method.id === value);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Payment Method</label>
      <Select value={value} onValueChange={(value) => onChange(value as PaymentMethod)}>
        <SelectTrigger className="w-full bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500">
          <div className="flex items-center space-x-2">
            {selectedMethod?.icon}
            <SelectValue placeholder="Select payment method">
              {selectedMethod?.label || "Select payment method"}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent>
          {methods.map((method) => (
            <SelectItem 
              key={method.id} 
              value={method.id}
              className="cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center space-x-2 py-1">
                {method.icon}
                <span>{method.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentMethodSelect;