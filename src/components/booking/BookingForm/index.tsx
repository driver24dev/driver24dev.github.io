import React, { useState } from 'react';
import { toast } from 'sonner';
import WhenAndWhereStep from '../steps/WhenAndWhereStep';
import VehicleSelectionStep from '../steps/VehicleSelectionStep';
import PaymentStep from '../steps/PaymentStep';
import ProgressBar from '../ProgressBar';
import { BookingStep, ServiceType, Location } from '../types';
import { FormContainer } from './FormContainer';

interface BookingFormProps {
  onClose: () => void;
}

const initialFormData = {
  serviceType: 'transfer' as ServiceType,
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
  const [formData, setFormData] = useState(initialFormData);
  const [selectedVehicle, setSelectedVehicle] = useState<{ name: string; price: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'details') {
      setCurrentStep('vehicle');
      return;
    }

    if (currentStep === 'vehicle') {
      if (!selectedVehicle) {
        toast.error('Please select a vehicle');
        return;
      }
      setCurrentStep('payment');
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Booking submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev === 'payment' ? 'vehicle' : 'details');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'details':
        return (
          <WhenAndWhereStep
            formData={formData}
            onFormDataChange={setFormData}
          />
        );
      case 'vehicle':
        return (
          <VehicleSelectionStep
            formData={formData}
            selectedVehicle={selectedVehicle}
            onVehicleSelect={setSelectedVehicle}
            onBack={handleBack}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            formData={formData}
            selectedVehicle={selectedVehicle}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <ProgressBar currentStep={currentStep} />
          <div className="mt-8">
            {renderStep()}
          </div>
          
          <div className="flex justify-between pt-8 mt-8 border-t border-gray-100">
            {currentStep !== 'details' && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              {loading ? 'Processing...' : currentStep === 'payment' ? 'Complete Booking' : 'Continue'}
            </button>
          </div>
        </div>
      </form>
    </FormContainer>
  );
};

export default BookingForm;