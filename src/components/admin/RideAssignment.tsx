import React, { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, MapPin, Calendar, Clock, Users, Car, Phone, Mail, ArrowRight } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  status: 'available' | 'busy';
  vehicleType: string;
  rating: number;
}

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  passengers: number;
  vehicleType: string;
  status: 'unassigned' | 'assigned' | 'completed';
  specialRequests?: string;
  createdAt: string;
}

const RideAssignment: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [availableDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Smith',
      status: 'available',
      vehicleType: 'Mercedes-Benz S-Class',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Michael Chen',
      status: 'available',
      vehicleType: 'Mercedes-Benz Sprinter',
      rating: 4.95
    }
  ]);

  const [bookings] = useState<Booking[]>([
    {
      id: 'B1',
      customerName: 'Alice Brown',
      customerEmail: 'alice.brown@example.com',
      customerPhone: '(310) 555-0101',
      pickupLocation: 'LAX Terminal 4',
      dropoffLocation: 'Beverly Hills Hotel',
      date: '2024-03-25',
      time: '14:30',
      passengers: 2,
      vehicleType: 'Mercedes-Benz S-Class',
      status: 'unassigned',
      specialRequests: 'Extra luggage space needed',
      createdAt: '2024-03-24T10:30:00Z'
    },
    {
      id: 'B2',
      customerName: 'Robert Wilson',
      customerEmail: 'robert.w@example.com',
      customerPhone: '(310) 555-0102',
      pickupLocation: 'Four Seasons Los Angeles',
      dropoffLocation: 'Santa Monica Pier',
      date: '2024-03-25',
      time: '16:00',
      passengers: 4,
      vehicleType: 'Cadillac Escalade',
      status: 'unassigned',
      createdAt: '2024-03-24T11:15:00Z'
    }
  ]);

  const assignRide = async (bookingId: string, driverId: string) => {
    if (!driverId) {
      toast.error('Please select a driver');
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await fetch('http://localhost:3000/api/rides/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookingId, driverId })
      });
      
      const driver = availableDrivers.find(d => d.id === driverId);
      const booking = bookings.find(b => b.id === bookingId);
      
      if (driver && booking) {
        toast.success(`Ride assigned to ${driver.name}`);
      }
    } catch (error) {
      console.error('Error assigning ride:', error);
      toast.error('Failed to assign ride');
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Ride Assignment</h2>
        <p className="text-gray-600 mt-1">Assign drivers to pending bookings</p>
      </div>

      {availableDrivers.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">
            No drivers are currently available. Please wait for drivers to become available or check their status in Driver Management.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold">{booking.customerName}</h3>
                  <div className="flex items-center mt-2 space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {booking.customerEmail}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {booking.customerPhone}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Unassigned
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center text-gray-700 mb-1">
                      <Car className="h-5 w-5 mr-2" />
                      <span className="font-medium">Vehicle Type</span>
                    </div>
                    <p className="text-gray-600 ml-7">{booking.vehicleType}</p>
                  </div>

                  <div>
                    <div className="flex items-center text-gray-700 mb-1">
                      <Users className="h-5 w-5 mr-2" />
                      <span className="font-medium">Passengers</span>
                    </div>
                    <p className="text-gray-600 ml-7">{booking.passengers} passengers</p>
                  </div>

                  {booking.specialRequests && (
                    <div>
                      <div className="text-gray-700 font-medium mb-1">Special Requests</div>
                      <p className="text-gray-600">{booking.specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Booked {formatDate(booking.createdAt)}
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => assignRide(booking.id, e.target.value)}
                      defaultValue=""
                      disabled={availableDrivers.length === 0}
                    >
                      <option value="" disabled>
                        {availableDrivers.length === 0 ? 'No drivers available' : 'Select a driver'}
                      </option>
                      {availableDrivers.map(driver => (
                        <option key={driver.id} value={driver.id}>
                          {`${driver.name} - ${driver.vehicleType} (${driver.rating.toFixed(1)}★)`}
                        </option>
                      ))}
                    </select>
                    <button
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        const select = document.querySelector(`select[data-booking-id="${booking.id}"]`) as HTMLSelectElement;
                        assignRide(booking.id, select?.value || '');
                      }}
                      disabled={availableDrivers.length === 0}
                    >
                      Assign Driver
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">No pending bookings</h3>
            <p className="text-gray-500 mt-2">All rides have been assigned</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideAssignment;