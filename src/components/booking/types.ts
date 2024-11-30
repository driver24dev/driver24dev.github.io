export type ServiceType = 'transfer' | 'hourly';
export type BookingStep = 'details' | 'vehicle' | 'payment';
export type PaymentMethod = 'credit_card' | 'paypal' | 'crypto';
export type TabType = 'book' | 'quote' | 'receipts' | 'manage';

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

export interface BookingFormData {
  serviceType: ServiceType;
  pickupLocation: string;
  dropoffLocation: string;
  stops: Location[];
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
}