import React, { useState } from 'react';
import { X } from 'lucide-react';
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

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [pickup, setPickup] = useState<Location>();
  const [dropoff, setDropoff] = useState<Location>();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [vehicleType, setVehicleType] = useState('sedan');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  // Simulated geocoding function
  const handleLocationInput = async (value: string, type: 'pickup' | 'dropoff') => {
    // In a real app, you would use a geocoding service here
    // For demo purposes, we'll use dummy coordinates
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
      } else {
        setDropoff(newLocation);
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const bookingData = {
        pickup,
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Book Your Ride</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <BookingMap pickup={pickup} dropoff={dropoff} />

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
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
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
        </div>
      </div>
    </div>
  );
};

export default BookingForm;