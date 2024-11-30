import React, { useState } from 'react';
import { BookingFormProps } from './booking/types';
import { Calendar, Calculator, Receipt, Clock, Menu, X } from 'lucide-react';

type TabType = 'book' | 'quote' | 'receipts' | 'manage';

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('book');

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
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {/* Rest of the component remains the same */}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;