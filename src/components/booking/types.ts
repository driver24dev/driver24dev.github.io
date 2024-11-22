export type BookingStep = 'details' | 'vehicle' | 'payment';
export type ServiceType = 'transfer' | 'hourly';
export type TabType = 'book' | 'quote' | 'receipts' | 'manage';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}