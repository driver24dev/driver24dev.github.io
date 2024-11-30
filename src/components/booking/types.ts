export type ServiceType = 'transfer' | 'hourly';
export type BookingStep = 'details' | 'vehicle' | 'payment';
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