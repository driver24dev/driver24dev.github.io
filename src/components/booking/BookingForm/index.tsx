import React from 'react';
import { toast } from 'sonner';
import WhenAndWhereStep from './steps/WhenAndWhereStep';
import VehicleSelectionStep from './steps/VehicleSelectionStep';
import PaymentStep from './steps/PaymentStep';
import ProgressBar from '../ProgressBar';
import { BookingStep, ServiceType, Location } from '../types';

interface BookingFormProps {
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [bookingStep, setBookingStep] = useState<BookingStep>('details');
  const [serviceType, setServiceType] = useState<ServiceType>('transfer');
  const [isRideNow, setIsRideNow] = useState(false);
  const [pickup, setPickup] = useState<Location>();
  const [dropoff, setDropoff] = useState<Location>();
  const [stops, setStops] = useState<Location[]>([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [travelers, setTravelers] = useState(0);
  const [kids, setKids] = useState(0);
  const [bags, setBags] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<{ name: string; price: number } | null>(null);

  const handleLocationInput = async (value: string, type: 'pickup' | 'dropoff' | 'stop', stopIndex?: number) => {
    // Location handling logic
  };

  const addStop = () => {
    setStops([...stops, { lat: 0, lng: 0, address: '' }]);
  };

  const removeStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handlePaymentSubmit = () => {
    toast.success('Booking confirmed!');
    onClose();
  };

  if (bookingStep === 'details') {
    return (
      <>
        <ProgressBar currentStep={bookingStep} />
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
          onAddStop={addStop}
          onRemoveStop={removeStop}
          onClose={onClose}
          onContinue={() => setBookingStep('vehicle')}
        />
      </>
    );
  }

  if (bookingStep === 'vehicle') {
    return (
      <>
        <ProgressBar currentStep={bookingStep} />
        <VehicleSelectionStep
          pickup={pickup}
          dropoff={dropoff}
          stops={stops}
          date={date}
          time={time}
          travelers={travelers}
          kids={kids}
          bags={bags}
          onBack={() => setBookingStep('details')}
          onContinue={() => setBookingStep('payment')}
          onVehicleSelect={setSelectedVehicle}
        />
      </>
    );
  }

  if (bookingStep === 'payment' && selectedVehicle) {
    return (
      <>
        <ProgressBar currentStep={bookingStep} />
        <PaymentStep
          onBack={() => setBookingStep('vehicle')}
          onSubmit={handlePaymentSubmit}
          bookingDetails={{
            pickupLocation: pickup?.address || '',
            dropoffLocation: dropoff?.address || '',
            date,
            time,
            travelers,
            kids,
            bags,
            vehicle: selectedVehicle
          }}
        />
      </>
    );
  }

  return null;
};

export default BookingForm;