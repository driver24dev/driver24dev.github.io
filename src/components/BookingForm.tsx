import React, { useState } from 'react';
import { X, Calculator, Receipt, Calendar, Plus, Clock, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import BookingMap from './booking/BookingMap';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface BookingFormProps {
  onClose: () => void;
}

type TabType = 'book' | 'quote' | 'receipts' | 'manage';

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('book');
  const [pickup, setPickup] = useState<Location>();
  const [dropoff, setDropoff] = useState<Location>();
  const [quotePickup, setQuotePickup] = useState<Location>();
  const [quoteDropoff, setQuoteDropoff] = useState<Location>();
  const [stops, setStops] = useState<Location[]>([]);
  const [quoteStops, setQuoteStops] = useState<Location[]>([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [quoteDate, setQuoteDate] = useState('');
  const [quoteTime, setQuoteTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [vehicleType, setVehicleType] = useState('sedan');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  // Simulated geocoding function
  const handleLocationInput = async (value: string, type: 'pickup' | 'dropoff' | 'stop', stopIndex?: number, isQuote: boolean = false) => {
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
      
      if (isQuote) {
        if (type === 'pickup') {
          setQuotePickup(newLocation);
        } else if (type === 'dropoff') {
          setQuoteDropoff(newLocation);
        } else if (type === 'stop' && typeof stopIndex === 'number') {
          const newStops = [...quoteStops];
          newStops[stopIndex] = newLocation;
          setQuoteStops(newStops);
        }
      } else {
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      toast.error('Please select pickup and dropoff locations');
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const bookingData = {
        pickup,
        stops,
        dropoff,
        date,
        time,
        passengers,
        vehicleType,
        customerInfo: formData
      };

      console.log('Booking submitted:', bookingData);
      toast.success('Booking submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  const handleGetQuote = () => {
    if (!quotePickup || !quoteDropoff || !quoteDate || !quoteTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    // Simulate quote calculation
    toast.success('Quote calculated successfully');
  };

  const handleResetQuote = () => {
    setQuotePickup(undefined);
    setQuoteDropoff(undefined);
    setQuoteStops([]);
    setQuoteDate('');
    setQuoteTime('');
    toast.success('Quote form reset');
  };

  const addStop = (isQuote: boolean = false) => {
    if (isQuote) {
      setQuoteStops([...quoteStops, { lat: 0, lng: 0, address: '' }]);
    } else {
      setStops([...stops, { lat: 0, lng: 0, address: '' }]);
    }
  };

  const removeStop = (index: number, isQuote: boolean = false) => {
    if (isQuote) {
      setQuoteStops(quoteStops.filter((_, i) => i !== index));
    } else {
      setStops(stops.filter((_, i) => i !== index));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'book':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-1 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter pickup address (try LAX, Beverly Hills, etc.)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => handleLocationInput(e.target.value, 'pickup')}
                      required
                    />
                    {pickup && (
                      <p className="mt-1 text-sm text-gray-500">{pickup.address}</p>
                    )}
                  </div>

                  {stops.map((stop, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stop #{index + 1}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter stop address"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          onChange={(e) => handleLocationInput(e.target.value, 'stop', index)}
                        />
                        <button
                          type="button"
                          onClick={() => removeStop(index)}
                          className="p-2 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      {stop.address && (
                        <p className="mt-1 text-sm text-gray-500">{stop.address}</p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dropoff Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter dropoff address (try Santa Monica, Hollywood, etc.)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => handleLocationInput(e.target.value, 'dropoff')}
                      required
                    />
                    {dropoff && (
                      <p className="mt-1 text-sm text-gray-500">{dropoff.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Type
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      required
                    >
                      <option value="sedan">Mercedes-Benz S-Class</option>
                      <option value="suv">Cadillac Escalade</option>
                      <option value="van">Mercedes-Benz Sprinter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passengers
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value))}
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addStop()}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Stop
                </button>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[300px]">
                <BookingMap pickup={pickup} dropoff={dropoff} stops={stops} />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Book Now'}
              </button>
            </div>
          </form>
        );

      case 'quote':
        return (
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-1 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Get a Price Quote</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Calendar className="inline-block h-4 w-4 mr-1" />
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        placeholder="Select date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={quoteDate}
                        onChange={(e) => setQuoteDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Clock className="inline-block h-4 w-4 mr-1" />
                        Pickup Time
                      </label>
                      <input
                        type="time"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={quoteTime}
                        onChange={(e) => setQuoteTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => handleLocationInput(e.target.value, 'pickup', undefined, true)}
                    />
                    {quotePickup && (
                      <p className="mt-1 text-sm text-gray-500">{quotePickup.address}</p>
                    )}
                  </div>

                  {quoteStops.map((stop, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stop #{index + 1}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter stop location"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          onChange={(e) => handleLocationInput(e.target.value, 'stop', index, true)}
                        />
                        <button
                          type="button"
                          onClick={() => removeStop(index, true)}
                          className="p-2 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      {stop.address && (
                        <p className="mt-1 text-sm text-gray-500">{stop.address}</p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dropoff Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => handleLocationInput(e.target.value, 'dropoff', undefined, true)}
                    />
                    {quoteDropoff && (
                      <p className="mt-1 text-sm text-gray-500">{quoteDropoff.address}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => addStop(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Stop
                  </button>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button 
                    onClick={handleResetQuote}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={handleGetQuote}
                    className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Get Quote
                  </button>
                </div>
              </div>

              <div className="w-[300px]">
                <BookingMap pickup={quotePickup} dropoff={quoteDropoff} stops={quoteStops} />
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Estimated Price Range</h4>
              <p className="text-2xl font-bold text-blue-600">$120 - $150</p>
              <p className="text-sm text-gray-600 mt-2">
                Final price may vary based on traffic, waiting time, and other factors.
              </p>
            </div>
          </div>
        );

      case 'receipts':
        return (
          <div className="space-y-6">
            <div className="bg-white border rounded-lg divide-y">
              <div className="p-4">
                <h3 className="font-semibold mb-2">Recent Receipts</h3>
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

      case 'manage':
        return (
          <div className="space-y-6">
            <div className="bg-white border rounded-lg divide-y">
              <div className="p-4">
                <h3 className="font-semibold mb-2">Manage Reservations</h3>
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
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('book')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeTab === 'book'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
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
                    : 'text-gray-600 hover:bg-gray-100'
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
                    : 'text-gray-600 hover:bg-gray-100'
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
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Manage Reservations
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;