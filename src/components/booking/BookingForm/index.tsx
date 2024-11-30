import React, { useState } from 'react';
import { toast } from 'sonner';
import { Calendar, Calculator, Receipt, Clock, X, Menu } from 'lucide-react';
import BookTab from '../tabs/BookTab';
import QuoteTab from '../tabs/QuoteTab';
import ReceiptsTab from '../tabs/ReceiptsTab';
import ManageTab from '../tabs/ManageTab';
import { TabType, BookingStep, ServiceType, Location } from '../types';
import { BookingFormProps, BookingFormData } from './types';
import { findLocationMatch } from './utils';

const initialFormData: BookingFormData = {
  serviceType: 'transfer',
  pickupLocation: null,
  dropoffLocation: null,
  stops: [],
  date: '',
  time: '',
  hours: 0,
  minutes: 0,
  passengers: 0,
  children: 0,
  luggage: 0,
  selectedVehicle: null,
  specialRequests: ''
};

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('book');
  const [bookingStep, setBookingStep] = useState<BookingStep>('details');
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);

  const handleLocationInput = async (value: string, type: 'pickup' | 'dropoff' | 'stop', stopIndex?: number) => {
    const locationMatch = findLocationMatch(value);
    
    if (locationMatch) {
      const newLocation: Location = {
        lat: locationMatch.lat,
        lng: locationMatch.lng,
        address: locationMatch.name
      };
      
      setFormData(prev => {
        if (type === 'pickup') {
          return { ...prev, pickupLocation: newLocation };
        } else if (type === 'dropoff') {
          return { ...prev, dropoffLocation: newLocation };
        } else if (type === 'stop' && typeof stopIndex === 'number') {
          const newStops = [...prev.stops];
          newStops[stopIndex] = newLocation;
          return { ...prev, stops: newStops };
        }
        return prev;
      });
    }
  };

  const handleVehicleSelect = (vehicle: { name: string; price: number }) => {
    setFormData(prev => ({ ...prev, selectedVehicle: vehicle }));
  };

  const addStop = () => {
    setFormData(prev => ({
      ...prev,
      stops: [...prev.stops, { lat: 0, lng: 0, address: '' }]
    }));
  };

  const removeStop = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index)
    }));
  };

  const renderActiveTab = () => {
    const commonProps = {
      formData,
      onLocationInput: handleLocationInput,
      onAddStop: addStop,
      onRemoveStop: removeStop,
      onClose
    };

    switch (activeTab) {
      case 'book':
        return (
          <BookTab
            {...commonProps}
            bookingStep={bookingStep}
            onStepChange={setBookingStep}
            onVehicleSelect={handleVehicleSelect}
            onFormDataChange={(updates: Partial<BookingFormData>) => 
              setFormData(prev => ({ ...prev, ...updates }))
            }
          />
        );
      case 'quote':
        return <QuoteTab {...commonProps} />;
      case 'receipts':
        return <ReceiptsTab />;
      case 'manage':
        return <ManageTab />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="hidden lg:flex space-x-4">
              {[
                { id: 'book', icon: <Calendar className="h-5 w-5 mr-2" />, label: 'Book Now' },
                { id: 'quote', icon: <Calculator className="h-5 w-5 mr-2" />, label: 'Price Quote' },
                { id: 'receipts', icon: <Receipt className="h-5 w-5 mr-2" />, label: 'Quick Receipts' },
                { id: 'manage', icon: <Clock className="h-5 w-5 mr-2" />, label: 'Manage Reservations' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="lg:hidden flex items-center space-x-4">
              <div className="relative flex items-center">
                <Menu className="absolute left-3 h-5 w-5 text-gray-500 pointer-events-none" />
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as TabType)}
                  className="bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="book">Book Now</option>
                  <option value="quote">Price Quote</option>
                  <option value="receipts">Quick Receipts</option>
                  <option value="manage">Manage Reservations</option>
                </select>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;