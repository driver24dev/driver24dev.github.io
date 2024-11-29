import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import Navigation from './Navigation';
import BookingForm from './forms/BookingForm';
import QuoteForm from './forms/QuoteForm';
import ReceiptsForm from './forms/ReceiptsForm';
import ManageForm from './forms/ManageForm';
import { TabType } from './types';

interface BookingModalProps {
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('book');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'book':
        return <BookingForm onClose={onClose} />;
      case 'quote':
        return <QuoteForm onClose={onClose} />;
      case 'receipts':
        return <ReceiptsForm />;
      case 'manage':
        return <ManageForm />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-6xl w-full bg-white rounded-xl shadow-xl">
          <div className="relative">
            <div className="flex items-center justify-between p-4 border-b">
              <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {renderActiveTab()}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BookingModal;