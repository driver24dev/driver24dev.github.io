export type TabType = 'book' | 'quote' | 'receipts' | 'manage';
export type BookingStep = 'details' | 'vehicle' | 'payment';
export type ServiceType = 'transfer' | 'hourly';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface BookingFormProps {
  onClose: () => void;
}

export interface TabButtonProps {
  id: TabType;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: (tab: TabType) => void;
}