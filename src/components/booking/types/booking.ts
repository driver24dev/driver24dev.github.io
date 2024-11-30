export type ServiceType = 'transfer' | 'hourly';
export type BookingStep = 'details' | 'vehicle' | 'payment';
export type PaymentMethod = 'credit_card' | 'paypal' | 'crypto';

export interface Location {
  lat: number;
  lng: number;
  address: string;
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

export interface BookingDetails {
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  travelers: number;
  kids: number;
  bags: number;
  vehicle?: {
    name: string;
    price: number;
  };
}

export interface PaymentDetails {
  method: PaymentMethod;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  postalCode: string;
}

export interface VehicleSelectionProps {
  bookingDetails: BookingDetails;
  selectedVehicle: string | null;
  onVehicleSelect: (vehicleId: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export interface PaymentDetailsProps {
  bookingDetails: BookingDetails;
  onBack: () => void;
  onSubmit: () => void;
}