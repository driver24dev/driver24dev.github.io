export type ServiceType = 'transfer' | 'hourly';
export type BookingStep = 'details' | 'vehicle' | 'payment';
export type TabType = 'book' | 'quote' | 'receipts' | 'manage';
export type PaymentMethod = 'credit_card' | 'paypal' | 'crypto';

export interface Location {
  lat: number;
  lng: number;
  address: string;
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