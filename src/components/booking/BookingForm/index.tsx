import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import BookTab from '../tabs/BookTab';
import QuoteTab from '../tabs/QuoteTab';
import ReceiptsTab from '../tabs/ReceiptsTab';
import ManageTab from '../tabs/ManageTab';
import TabButton from './components/TabButton';
import MobileTabSelect from './components/MobileTabSelect';
import { TabType, BookingStep, Location } from '../types';
import { BookingFormProps, BookingFormData } from './types';
import { findLocationMatch } from './utils';
import { TABS } from './constants';

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
              {TABS.map(tab => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  isActive={activeTab === tab.id}
                  onClick={setActiveTab}
                />
              ))}
            </div>

            <div className="lg:hidden flex items-center space-x-4">
              <MobileTabSelect
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
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