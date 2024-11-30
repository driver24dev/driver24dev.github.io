import React, { useState } from 'react';
import { toast } from 'sonner';
import WhenAndWhereStep from './steps/WhenAndWhereStep';
import PaymentStep from './steps/PaymentStep';
import ProgressBar from './components/ProgressBar';
import { BookingStep, ServiceType, Location } from './types';

interface BookingFormProps {
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
 const [currentStep, setCurrentStep] = useState<BookingStep>('details');
 const [serviceType, setServiceType] = useState<ServiceType>('transfer');
 const [isRideNow, setIsRideNow] = useState(false);
 const [pickup, setPickup] = useState<Location>();
 const [dropoff, setDropoff] = useState<Location>();
 const [stops, setStops] = useState<Location[]>([]);
 const [date, setDate] = useState('');
 const [time, setTime] = useState('');
 const [hours, setHours] = useState(2);
 const [minutes, setMinutes] = useState(0);
 const [travelers, setTravelers] = useState(1);
 const [kids, setKids] = useState(0);
 const [bags, setBags] = useState(1);
 const [selectedVehicle, _setSelectedVehicle] = useState<{ name: string; price: number } | null>(null);

  const handleLocationInput = async (value: string, type: 'pickup' | 'dropoff' | 'stop', stopIndex?: number) => {
    // Simulate geocoding with dummy data
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

  const handleAddStop = () => {
    setStops([...stops, { lat: 0, lng: 0, address: '' }]);
  };

  const handleRemoveStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    toast.success('Booking confirmed!');
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'details':
        return (
          <WhenAndWhereStep
            serviceType={serviceType}
            isRideNow={isRideNow}
            pickup={pickup}
            dropoff={dropoff}
            stops={stops}
            date={date}
            time={time}
            hours={hours}
            minutes={minutes}
            travelers={travelers}
            kids={kids}
            bags={bags}
            onServiceTypeChange={setServiceType}
            onRideNowToggle={setIsRideNow}
            onLocationInput={handleLocationInput}
            onDateChange={setDate}
            onTimeChange={setTime}
            onHoursChange={setHours}
            onMinutesChange={setMinutes}
            onTravelersChange={setTravelers}
            onKidsChange={setKids}
            onBagsChange={setBags}
            onAddStop={handleAddStop}
            onRemoveStop={handleRemoveStop}
            onClose={onClose}
            onContinue={() => setCurrentStep('payment')}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            bookingDetails={{
              pickupLocation: pickup?.address || '',
              dropoffLocation: dropoff?.address || '',
              date,
              time,
              travelers,
              kids,
              bags,
              vehicle: selectedVehicle || { name: 'Standard Sedan', price: 100 }
            }}
            onBack={() => setCurrentStep('details')}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <ProgressBar currentStep={currentStep} />
      {renderStep()}
    </div>
  );
};

export default BookingForm;