import { PaymentOption } from './types';

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'credit_card',
    label: 'Credit Card',
    description: 'Pay securely with your credit card'
  },
  {
    id: 'paypal',
    label: 'PayPal',
    description: 'Pay using your PayPal account'
  },
  {
    id: 'crypto',
    label: 'Cryptocurrency',
    description: 'Pay with Bitcoin or other cryptocurrencies'
  }
];