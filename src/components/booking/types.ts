export type ServiceType = 'transfer' | 'hourly';
export type BookingStep = 'details' | 'vehicle' | 'payment';
export type TabType = 'book' | 'quote' | 'receipts' | 'manage';
export type PaymentMethod = 'credit_card' | 'paypal' | 'crypto' | 'cash';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface BookingFormProps {
  onClose: () => void;
}

export interface BookingFormData {
  serviceType: ServiceType;
  pickupLocation: string;
  dropoffLocation: string;
  stops: string[];
  date: string;
  time: string;
  hours: number;
  minutes: number;
  travelers: number;
  kids: number;
  bags: number;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
  paymentMethod?: PaymentMethod;
}

export interface Vehicle {
  id: string;
  name: string;
  image: string;
  description: string;
  capacity: {
    passengers: number;
    luggage: number;
  };
  basePrice: number;
  pricePerMile: number;
}