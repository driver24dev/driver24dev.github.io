export type TabType = 'book' | 'quote' | 'receipts' | 'manage';
export type BookingStep = 'details' | 'vehicle' | 'payment';
export type ServiceType = 'transfer' | 'hourly';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Tab {
  id: TabType;
  icon: JSX.Element;
  label: string;
}