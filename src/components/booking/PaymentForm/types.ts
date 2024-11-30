import { BookingFormData } from '../BookingForm/types';

export interface PaymentFormProps {
  onBack: () => void;
  onSubmit: () => void;
  bookingDetails: BookingFormData;
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

export type PaymentMethod = 'credit_card' | 'paypal' | 'crypto';

export interface PaymentDetails {
  method: PaymentMethod;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  postalCode: string;
}

export interface PaymentOption {
  id: PaymentMethod;
  label: string;
  description: string;
}