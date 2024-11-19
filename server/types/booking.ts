export interface Booking {
  id?: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  passengers: number;
  vehicleType: 'sedan' | 'suv' | 'van' | 'stretch';
  name: string;
  email: string;
  phone: string;
}