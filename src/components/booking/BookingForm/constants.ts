import { Calendar, Calculator, Receipt, Clock } from 'lucide-react';
import { Tab } from '../types';

export const TABS: Tab[] = [
  { id: 'book', icon: Calendar, label: 'Book Now' },
  { id: 'quote', icon: Calculator, label: 'Price Quote' },
  { id: 'receipts', icon: Receipt, label: 'Quick Receipts' },
  { id: 'manage', icon: Clock, label: 'Manage Reservations' }
];