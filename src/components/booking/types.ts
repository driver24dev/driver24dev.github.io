export type ServiceType = 'transfer' | 'hourly';
export type BookingStep = 'details' | 'vehicle' | 'payment';
export type PaymentMethod = 'credit_card' | 'paypal' | 'crypto';
export type TabType = 'book' | 'quote' | 'receipts' | 'manage';

export interface Location {
  lat: number;
  lng: number;
  address: string;
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

export interface WhenAndWhereStepProps {
  formData: BookingFormData;
  onFormDataChange: (data: BookingFormData) => void;
}