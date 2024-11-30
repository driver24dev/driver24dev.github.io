import React, { useState } from 'react';
import { Calendar, Calculator, Receipt, Clock, X, Menu } from 'lucide-react';
import BookTab from './booking/tabs/BookTab';
import QuoteTab from './booking/tabs/QuoteTab';
import ReceiptsTab from './booking/tabs/ReceiptsTab';
import ManageTab from './booking/tabs/ManageTab';
import { TabType, BookingStep, ServiceType, Location } from './booking/types';

interface RideBookingModalProps {
  onClose: () => void;
}

const RideBookingModal: React.FC<RideBookingModalProps> = ({ onClose }) => {
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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'book':
        return (
          <BookTab
            bookingStep={bookingStep}
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
            selectedVehicle={selectedVehicle}
            onClose={onClose}
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
            onStepChange={setBookingStep}
            onVehicleSelect={setSelectedVehicle}
          />
        );
      case 'quote':
        return (
          <QuoteTab
            pickup={pickup}
            dropoff={dropoff}
            stops={stops}
            date={date}
            time={time}
            onLocationInput={handleLocationInput}
            onDateChange={setDate}
            onTimeChange={setTime}
            onAddStop={addStop}
            onClose={onClose}
          />
        );
      case 'receipts':
        return <ReceiptsTab />;
      case 'manage':
        return <ManageTab />;
      default:
        return null;
    }
  };

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

            <div className="lg:hidden relative flex items-center">
              <Menu className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as TabType)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-900 font-medium"
              >
                <option value="book" className="text-gray-900 font-medium">Book Now</option>
                <option value="quote" className="text-gray-900 font-medium">Price Quote</option>
                <option value="receipts" className="text-gray-900 font-medium">Quick Receipts</option>
                <option value="manage" className="text-gray-900 font-medium">Manage Reservations</option>
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default RideBookingModal;