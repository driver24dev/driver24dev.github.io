import React from 'react';
import { MapPin, Calendar, Clock, Car } from 'lucide-react';

interface Booking {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  vehicleType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  driverName?: string;
}

const ClientBookings: React.FC = () => {
  const bookings: Booking[] = [
    {
      id: 'B1',
      pickupLocation: 'LAX Terminal 4',
      dropoffLocation: 'Beverly Hills Hotel',
      date: '2024-03-25',
      time: '14:30',
      vehicleType: 'Mercedes-Benz S-Class',
      status: 'upcoming',
      driverName: 'John Smith'
    },
    {
      id: 'B2',
      pickupLocation: 'Four Seasons Los Angeles',
      dropoffLocation: 'Santa Monica Pier',
      date: '2024-03-20',
      time: '10:00',
      vehicleType: 'Cadillac Escalade',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
      
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <div className="flex items-center">
                <Car className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium">{booking.vehicleType}</span>
              </div>
              {booking.driverName && (
                <p className="text-gray-600">Driver: {booking.driverName}</p>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center text-gray-700 mb-1">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="font-medium">Pickup Location</span>
              </div>
              <p className="text-gray-600 ml-7">{booking.pickupLocation}</p>
            </div>

            <div>
              <div className="flex items-center text-gray-700 mb-1">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="font-medium">Dropoff Location</span>
              </div>
              <p className="text-gray-600 ml-7">{booking.dropoffLocation}</p>
            </div>

            <div className="flex space-x-6">
              <div>
                <div className="flex items-center text-gray-700 mb-1">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="font-medium">Date</span>
                </div>
                <p className="text-gray-600 ml-7">{formatDate(booking.date)}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-700 mb-1">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">Time</span>
                </div>
                <p className="text-gray-600 ml-7">{formatTime(booking.time)}</p>
              </div>
            </div>
          </div>

          {booking.status === 'upcoming' && (
            <div className="mt-6 flex justify-end space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800">
                Cancel Booking
              </button>
              <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                Modify Booking
              </button>
            </div>
          )}
        </div>
      ))}

      {bookings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">No bookings yet</h3>
          <p className="text-gray-500 mt-2">Book your first luxury ride today</p>
        </div>
      )}
    </div>
  );
};

export default ClientBookings;