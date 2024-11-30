export type ServiceType = 'transfer' | 'hourly';
export type BookingStep = 'details' | 'vehicle' | 'payment';
export type TabType = 'book' | 'quote' | 'receipts' | 'manage';
export type PaymentMethod = 'credit_card' | 'paypal' | 'crypto' | 'cash';

export interface Location {
  lat: number;
  lng: number;
  address: string;
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

export interface BookingFormProps {
  onClose: () => void;
}

export interface WhenAndWhereStepProps {
  formData: BookingFormData;
  onFormDataChange: (data: BookingFormData) => void;
}

export interface VehicleSelectionStepProps {
  formData: BookingFormData;
  selectedVehicle: { name: string; price: number; } | null;
  onVehicleSelect: (vehicle: { name: string; price: number; }) => void;
  onBack: () => void;
}

export interface PaymentStepProps {
  formData: BookingFormData;
  selectedVehicle: { name: string; price: number; } | null;
}