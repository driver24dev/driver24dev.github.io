import { useState } from 'react';
import { toast } from 'sonner';
import { BookingStep, BookingFormData, ServiceType, Location } from '../types';
import WhenAndWhereStep from './WhenAndWhereStep';
import VehicleSelection from './VehicleSelection';
import PaymentDetails from './PaymentDetails';
import ProgressBar from '../ProgressBar';

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

const BookingForm = ({ onClose }: BookingFormProps) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('details');
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [selectedVehicle, setSelectedVehicle] = useState<{ name: string; price: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [pickup, setPickup] = useState<Location>();
  const [dropoff, setDropoff] = useState<Location>();
  const [stops, setStops] = useState<Location[]>([]);

  const handleLocationInput = async (value: string, type: 'pickup' | 'dropoff' | 'stop', stopIndex?: number) => {
    const newLocation: Location = {
      lat: 34.0522,
      lng: -118.2437,
      address: value
    };
    
    if (type === 'pickup') {
      setPickup(newLocation);
    } else if (type === 'dropoff') {
      setDropoff(newLocation);
    } else if (type === 'stop' && typeof stopIndex === 'number') {
      const newStops = [...stops];
      newStops[stopIndex] = newLocation;
      setStops(newStops);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'details') {
      if (!pickup || !dropoff) {
        toast.error('Please select pickup and dropoff locations');
        return;
      }
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
            serviceType={formData.serviceType}
            isRideNow={false}
            pickup={pickup}
            dropoff={dropoff}
            stops={stops}
            date={formData.date}
            time={formData.time}
            hours={formData.hours}
            minutes={formData.minutes}
            travelers={formData.travelers}
            kids={formData.kids}
            bags={formData.bags}
            onServiceTypeChange={(type) => setFormData({ ...formData, serviceType: type })}
            onRideNowToggle={() => {}}
            onLocationInput={handleLocationInput}
            onDateChange={(date) => setFormData({ ...formData, date })}
            onTimeChange={(time) => setFormData({ ...formData, time })}
            onHoursChange={(hours) => setFormData({ ...formData, hours })}
            onMinutesChange={(minutes) => setFormData({ ...formData, minutes })}
            onTravelersChange={(travelers) => setFormData({ ...formData, travelers })}
            onKidsChange={(kids) => setFormData({ ...formData, kids })}
            onBagsChange={(bags) => setFormData({ ...formData, bags })}
            onAddStop={() => setStops([...stops, { lat: 0, lng: 0, address: '' }])}
            onRemoveStop={(index) => setStops(stops.filter((_, i) => i !== index))}
            onClose={onClose}
            onContinue={() => setCurrentStep('vehicle')}
          />
        );
      case 'vehicle':
        return (
          <VehicleSelection
            bookingDetails={{
              pickupLocation: pickup?.address || '',
              dropoffLocation: dropoff?.address || '',
              date: formData.date,
              time: formData.time,
              travelers: formData.travelers,
              kids: formData.kids,
              bags: formData.bags,
              vehicle: selectedVehicle || { name: '', price: 0 }
            }}
            selectedVehicle={selectedVehicle?.name || null}
            onVehicleSelect={setSelectedVehicle}
            onBack={handleBack}
            onContinue={() => setCurrentStep('payment')}
          />
        );
      case 'payment':
        return (
          <PaymentDetails
            bookingDetails={{
              pickupLocation: pickup?.address || '',
              dropoffLocation: dropoff?.address || '',
              date: formData.date,
              time: formData.time,
              travelers: formData.travelers,
              kids: formData.kids,
              bags: formData.bags,
              vehicle: selectedVehicle!
            }}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <ProgressBar currentStep={currentStep} />
        <div className="mt-8">
          {renderStep()}
        </div>
      </div>
    </form>
  );
};

export default BookingForm;