import React, { useState } from 'react';
import { toast } from 'sonner';
import { BookingStep, BookingFormData, BookingDetails } from '../types/booking';
import WhenAndWhereStep from './WhenAndWhereStep';
import VehicleSelectionStep from './steps/VehicleSelectionStep';
import PaymentStep from './steps/PaymentStep';
import ProgressBar from '../components/ProgressBar';

interface BookingFormProps {
  onClose: () => void;
}

const initialFormData: BookingFormData = {
  serviceType: 'transfer',
  pickupLocation: '',
  dropoffLocation: '',
  stops: [],
  date: '',
  time: '',
  hours: 2,
  minutes: 0,
  travelers: 1,
  kids: 0,
  bags: 1,
  name: '',
  email: '',
  phone: '',
  specialRequests: ''
};

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('details');
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [selectedVehicle, setSelectedVehicle] = useState<{ name: string; price: number } | null>(null);

  const handleSubmit = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Booking submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to submit booking');
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev === 'payment' ? 'vehicle' : 'details');
  };

  const getBookingDetails = (): BookingDetails => ({
    pickupLocation: formData.pickupLocation,
    dropoffLocation: formData.dropoffLocation,
    date: formData.date,
    time: formData.time,
    travelers: formData.travelers,
    kids: formData.kids,
    bags: formData.bags,
    vehicle: selectedVehicle
  });

  const renderStep = () => {
    const bookingDetails = getBookingDetails();

    switch (currentStep) {
      case 'details':
        return (
          <WhenAndWhereStep
            formData={formData}
            onFormDataChange={setFormData}
            onClose={onClose}
            onContinue={() => setCurrentStep('vehicle')}
          />
        );
      case 'vehicle':
        return (
          <VehicleSelectionStep
            bookingDetails={bookingDetails}
            selectedVehicle={selectedVehicle?.name || null}
            onVehicleSelect={(vehicle) => setSelectedVehicle(vehicle)}
            onBack={handleBack}
            onContinue={() => setCurrentStep('payment')}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            bookingDetails={bookingDetails}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <ProgressBar currentStep={currentStep} />
        <div className="mt-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;