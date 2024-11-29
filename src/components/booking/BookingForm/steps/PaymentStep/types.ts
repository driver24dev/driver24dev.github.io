export type PaymentMethod = 'credit_card' | 'paypal' | 'crypto';

export interface PaymentDetails {
  method: PaymentMethod;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  postalCode: string;
}

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  nameSign: string;
}