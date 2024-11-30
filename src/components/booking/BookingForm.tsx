import React, { useState } from 'react';
import { X, Car, Calculator, Receipt, Clock } from 'lucide-react';
import WhenAndWhereStep from './steps/WhenAndWhereStep';
import VehicleSelectionStep from './steps/VehicleSelectionStep';
import PaymentForm from './PaymentForm';
import ProgressBar from './ProgressBar';
import { BookingStep, ServiceType, TabType, Location } from './booking/types';

interface BookingFormProps {
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('book');
  const [bookingStep, setBookingStep] = useState<BookingStep>('details');
  const [isRideNow, setIsRideNow] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceType>('transfer');
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
    const dummyLocations: Record<string, { name: string; lat: number; lng: number }> = {
      'LAX': { name: 'Los Angeles International Airport', lat: 33.9416, lng: -118.4085 },
      'Beverly Hills': { name: 'Beverly Hills', lat: 34.0736, lng: -118.4004 },
      'Santa Monica': { name: 'Santa Monica', lat: 34.0195, lng: -118.4912 },
      'Hollywood': { name: 'Hollywood', lat: 34.0928, lng: -118.3287 },
      'Downtown LA': { name: 'Downtown Los Angeles', lat: 34.0407, lng: -118.2468 }
    };

    const location = Object.entries(dummyLocations).find(([key]) => 
      value.toLowerCase().includes(key.toLowerCase())
    );

    if (location) {
      const [_, locationData] = location;
      const newLocation: Location = {
        lat: locationData.lat,
        lng: locationData.lng,
        address: locationData.name
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
    }
  };

  const addStop = () => {
    setStops([...stops, { lat: 0, lng: 0, address: '' }]);
  };

  const removeStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handlePaymentSubmit = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('book')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  activeTab === 'book' ? 'bg-black text-white' : 'text-gray-600'
                }`}
              >
                Book
              </button>
              <button
                onClick={() => setActiveTab('quote')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  activeTab === 'quote' ? 'bg-black text-white' : 'text-gray-600'
                }`}
              >
                Quote
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-4">
              <button
                onClick={() => setActiveTab('book')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'book'
                    ? 'bg-black text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Car className="h-5 w-5 mr-2" />
                Book Now
              </button>
              <button
                onClick={() => setActiveTab('quote')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'quote'
                    ? 'bg-black text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Calculator className="h-5 w-5 mr-2" />
                Price Quote
              </button>
              <button
                onClick={() => setActiveTab('receipts')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'receipts'
                    ? 'bg-black text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Receipt className="h-5 w-5 mr-2" />
                Quick Receipts
              </button>
              <button
                onClick={() => setActiveTab('manage')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'manage'
                    ? 'bg-black text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Clock className="h-5 w-5 mr-2" />
                Manage Reservations
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Bar */}
          {activeTab === 'book' && (
            <ProgressBar currentStep={bookingStep} />
          )}

          {/* Content */}
          {activeTab === 'book' && bookingStep === 'details' && (
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
          )}

          {activeTab === 'book' && bookingStep === 'vehicle' && (
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
          )}

          {activeTab === 'book' && bookingStep === 'payment' && selectedVehicle && (
            <PaymentForm
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
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;