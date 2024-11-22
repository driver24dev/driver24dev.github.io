import React, { useState } from 'react';
import { toast } from 'sonner';
import { Calendar, Calculator, Receipt, Clock, X, Menu } from 'lucide-react';
import BookingMap from './BookingMap';
import ServiceTypeToggle from './ServiceTypeToggle';
import RideToggle from './RideToggle';
import LocationInput from './LocationInput';
import DateTimeInputs from './DateTimeInputs';
import PassengerDetails from './PassengerDetails';
import ActionButtons from './ActionButtons';
import AddStopButton from './AddStopButton';
import TripDuration from './TripDuration';
import VehicleSelection from './VehicleSelection';
import PaymentForm from './PaymentForm';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface BookingFormProps {
  onClose: () => void;
}

type TabType = 'book' | 'quote' | 'receipts' | 'manage';
type ServiceType = 'transfer' | 'hourly';
type BookingStep = 'details' | 'vehicle' | 'payment';

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
  const [quotePrice, setQuotePrice] = useState<{ min: number; max: number } | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<{ name: string; price: number } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      toast.error('Please select pickup and dropoff locations');
      return;
    }

    setBookingStep('vehicle');
  };

  const handleVehicleSelect = (vehicle: { name: string; price: number }) => {
    setSelectedVehicle(vehicle);
  };

  const handlePaymentSubmit = () => {
    toast.success('Booking confirmed!');
    onClose();
  };

  const handleGetQuote = () => {
    if (!pickup || !dropoff) {
      toast.error('Please select pickup and dropoff locations');
      return;
    }
    setQuotePrice({ min: 120, max: 150 });
    toast.success('Quote calculated successfully');
  };

  const addStop = () => {
    setStops([...stops, { lat: 0, lng: 0, address: '' }]);
  };

  const removeStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const renderBookingForm = () => (
    <form onSubmit={handleDetailsSubmit} className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Where & When</h3>
            <ServiceTypeToggle serviceType={serviceType} onServiceTypeChange={setServiceType} />
          </div>

          {serviceType === 'hourly' && (
            <TripDuration
              hours={hours}
              minutes={minutes}
              onHoursChange={setHours}
              onMinutesChange={setMinutes}
            />
          )}
          
          <RideToggle isRideNow={isRideNow} onToggle={setIsRideNow} />

          {!isRideNow && (
            <DateTimeInputs
              date={date}
              time={time}
              onDateChange={setDate}
              onTimeChange={setTime}
              required={!isRideNow}
            />
          )}

          <div className="space-y-4">
            <LocationInput
              label="Pickup Location"
              onChange={(value) => handleLocationInput(value, 'pickup')}
              value={pickup?.address}
              required
            />

            {stops.map((stop, index) => (
              <LocationInput
                key={index}
                label={`Stop #${index + 1}`}
                onChange={(value) => handleLocationInput(value, 'stop', index)}
                value={stop.address}
                onRemove={() => removeStop(index)}
                showRemoveButton
              />
            ))}

            <LocationInput
              label="Dropoff Location"
              onChange={(value) => handleLocationInput(value, 'dropoff')}
              value={dropoff?.address}
              required
            />

            <AddStopButton onClick={addStop} />
          </div>

          <PassengerDetails
            travelers={travelers}
            kids={kids}
            bags={bags}
            onTravelersChange={setTravelers}
            onKidsChange={setKids}
            onBagsChange={setBags}
          />

          <ActionButtons
            onCancel={onClose}
            submitLabel="Continue"
          />
        </div>

        <div className="hidden lg:block w-[300px]">
          <BookingMap pickup={pickup} dropoff={dropoff} stops={stops} />
        </div>
      </div>
    </form>
  );

  const renderQuoteForm = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Get a Price Quote</h3>
          
          <DateTimeInputs
            date={date}
            time={time}
            onDateChange={setDate}
            onTimeChange={setTime}
          />

          <div className="space-y-4 mt-6">
            <LocationInput
              label="Pickup Location"
              onChange={(value) => handleLocationInput(value, 'pickup')}
              value={pickup?.address}
            />

            <LocationInput
              label="Dropoff Location"
              onChange={(value) => handleLocationInput(value, 'dropoff')}
              value={dropoff?.address}
            />

            <AddStopButton onClick={addStop} />
          </div>

          <ActionButtons
            onCancel={() => {
              setPickup(undefined);
              setDropoff(undefined);
              setStops([]);
              setQuotePrice(null);
            }}
            onSubmit={handleGetQuote}
            submitLabel="Get Quote"
            submitType="button"
          />
        </div>

        <div className="hidden lg:block w-[300px]">
          <BookingMap pickup={pickup} dropoff={dropoff} stops={stops} />
        </div>
      </div>

      {quotePrice && (
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900">Estimated Price Range</h4>
          <p className="text-2xl font-bold text-blue-600">
            ${quotePrice.min} - ${quotePrice.max}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Final price may vary based on traffic, waiting time, and other factors.
          </p>
        </div>
      )}
    </div>
  );

  const renderReceiptsTab = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg divide-y">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Recent Receipts</h3>
          <p className="text-sm text-gray-600">
            Enter your booking ID or email to find your receipt
          </p>
        </div>
        <div className="p-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Booking ID or Email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Search
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-center text-gray-500">
            No recent receipts found
          </p>
        </div>
      </div>
    </div>
  );

  const renderManageTab = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg divide-y">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Manage Reservations</h3>
          <p className="text-sm text-gray-600">
            View, modify, or cancel your upcoming reservations
          </p>
        </div>
        <div className="p-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Confirmation Number"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Find Booking
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-center text-gray-500">
            No active reservations found
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="hidden lg:flex space-x-4">
              <button
                onClick={() => setActiveTab('book')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'book'
                    ? 'bg-black text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Calendar className="h-5 w-5 mr-2" />
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

            <div className="lg:hidden flex items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {activeTab === 'book' && 'Book Now'}
                {activeTab === 'quote' && 'Price Quote'}
                {activeTab === 'receipts' && 'Quick Receipts'}
                {activeTab === 'manage' && 'Manage Reservations'}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              {renderMobileMenu()}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {activeTab === 'book' && bookingStep === 'details' && renderBookingForm()}
          {activeTab === 'book' && bookingStep === 'vehicle' && (
            <VehicleSelection
              onBack={() => setBookingStep('details')}
              onContinue={() => setBookingStep('payment')}
              onVehicleSelect={handleVehicleSelect}
              bookingDetails={{
                pickupLocation: pickup?.address || '',
                dropoffLocation: dropoff?.address || '',
                date,
                time,
                travelers,
                kids,
                bags
              }}
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
          {activeTab === 'quote' && renderQuoteForm()}
          {activeTab === 'receipts' && renderReceiptsTab()}
          {activeTab === 'manage' && renderManageTab()}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;