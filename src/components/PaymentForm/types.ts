export type PaymentMethod = 'credit_card' | 'paypal' | 'crypto';

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

export interface PaymentDetails {
  method: PaymentMethod;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  postalCode: string;
}

export interface BookingDetails {
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  travelers: number;
  kids: number;
  bags: number;
  vehicle: {
    name: string;
    price: number;
  };
}

export interface PaymentFormProps {
  onBack: () => void;
  onSubmit: () => void;
  bookingDetails: BookingDetails;
}