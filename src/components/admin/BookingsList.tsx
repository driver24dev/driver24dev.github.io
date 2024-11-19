import React, { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, MapPin, Calendar, Clock, Users, Car, Phone, Mail } from 'lucide-react';

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
  status: 'unassigned' | 'assigned' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

const BookingsList: React.FC = () => {
  const [loading, setLoading] = useState(false);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unassigned':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
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

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus as any } 
          : booking
      ));
      
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update booking status');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">All Bookings</h2>
      
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{booking.customerName}</h3>
                <div className="flex items-center mt-1 text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Booked on {formatDate(booking.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
                >
                  <option value="unassigned">Unassigned</option>
                  <option value="assigned">Assigned</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Pickup Location</div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{booking.pickupLocation}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Dropoff Location</div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{booking.dropoffLocation}</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Date & Time</div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{formatDate(booking.date)} at {formatTime(booking.time)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Vehicle & Passengers</div>
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{booking.vehicleType}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{booking.passengers} passengers</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Contact Information</div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{booking.customerPhone}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{booking.customerEmail}</span>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Special Requests</div>
                    <p className="text-gray-600">{booking.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                Send Confirmation
              </button>
              <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                Assign Driver
              </button>
              <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800">
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      ))}

      {bookings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">No bookings yet</h3>
          <p className="text-gray-500 mt-2">New bookings will appear here</p>
        </div>
      )}
    </div>
  );
};

export default BookingsList;