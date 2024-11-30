import { BookingFormData } from '../BookingForm/types';

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

export interface VehicleSelectionProps {
  onBack: () => void;
  onContinue: () => void;
  onVehicleSelect: (vehicle: { name: string; price: number; }) => void;
  bookingDetails: BookingFormData;
}