import { Location, ServiceType } from '../types';

export interface BookingFormData {
  serviceType: ServiceType;
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
  stops: Location[];
  date: string;
  time: string;
  hours: number;
  minutes: number;
  passengers: number;
  children: number;
  luggage: number;
  selectedVehicle: { name: string; price: number; } | null;
  specialRequests: string;
}

export interface BookingFormProps {
  onClose: () => void;
}

export interface LocationSuggestion {
  name: string;
  lat: number;
  lng: number;
}