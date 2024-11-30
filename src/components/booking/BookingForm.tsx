import React, { useState } from 'react';
import { Calendar, Calculator, Receipt, Clock, X } from 'lucide-react';
import { BookingFormProps, TabType } from './types';
import TabButton from './TabButton';
import TabContent from './TabContent';
import MobileMenu from './MobileMenu';

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('book');

  const tabs = [
    { id: 'book' as TabType, icon: <Calendar className="h-5 w-5 mr-2" />, label: 'Book Now' },
    { id: 'quote' as TabType, icon: <Calculator className="h-5 w-5 mr-2" />, label: 'Price Quote' },
    { id: 'receipts' as TabType, icon: <Receipt className="h-5 w-5 mr-2" />, label: 'Quick Receipts' },
    { id: 'manage' as TabType, icon: <Clock className="h-5 w-5 mr-2" />, label: 'Manage Reservations' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="hidden lg:flex space-x-4">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  id={tab.id}
                  icon={tab.icon}
                  label={tab.label}
                  isActive={activeTab === tab.id}
                  onClick={setActiveTab}
                />
              ))}
            </div>

            <MobileMenu
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <TabContent
            activeTab={activeTab}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingForm;