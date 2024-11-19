import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2, Car, MapPin, Clock, User, CheckCircle, Phone, Mail, Calendar, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import DriverStats from './DriverStats';

interface Ride {
  id: string;
  bookingId: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  pickup: {
    location: string;
    time: string;
    date: string;
  };
  dropoff: {
    location: string;
  };
  status: 'assigned' | 'in_progress' | 'completed';
  passengers: number;
  specialRequests?: string;
}

const DriverPortal: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([
    {
      id: 'R1',
      bookingId: 'B1',
      customer: {
        name: 'Alice Brown',
        phone: '(310) 555-0101',
        email: 'alice.brown@example.com'
      },
      pickup: {
        location: 'LAX Terminal 4',
        time: '14:30',
        date: '2024-03-25'
      },
      dropoff: {
        location: 'Beverly Hills Hotel'
      },
      status: 'assigned',
      passengers: 2,
      specialRequests: 'Extra luggage space needed'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();

  useEffect(() => {
    fetchAssignedRides();
  }, []);

  const fetchAssignedRides = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/drivers/${user?.id}/rides`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setRides(data);
    } catch (error) {
      console.error('Error fetching rides:', error);
      toast.error('Failed to fetch rides');
    } finally {
      setLoading(false);
    }
  };

  const updateRideStatus = async (rideId: string, status: 'in_progress' | 'completed') => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/drivers/rides/${rideId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update ride status');

      setRides(rides.map(ride => 
        ride.id === rideId ? { ...ride, status } : ride
      ));

      toast.success(`Ride ${status === 'in_progress' ? 'started' : 'completed'} successfully`);
    } catch (error) {
      console.error('Error updating ride status:', error);
      toast.error('Failed to update ride status');
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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div id="driver-portal" className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Car className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold">Driver Portal</h1>
        </div>

        <DriverStats />

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Your Rides</h2>
          <div className="grid gap-6">
            {rides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-500 mr-2" />
                      <h3 className="text-xl font-semibold">{ride.customer.name}</h3>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{ride.customer.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{ride.customer.email}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ride.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : ride.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {ride.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center text-gray-700 mb-1">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span className="font-medium">Pickup Location</span>
                      </div>
                      <p className="text-gray-600 ml-7">{ride.pickup.location}</p>
                    </div>

                    <div>
                      <div className="flex items-center text-gray-700 mb-1">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span className="font-medium">Dropoff Location</span>
                      </div>
                      <p className="text-gray-600 ml-7">{ride.dropoff.location}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center text-gray-700 mb-1">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span className="font-medium">Date & Time</span>
                      </div>
                      <p className="text-gray-600 ml-7">
                        {formatDate(ride.pickup.date)} at {formatTime(ride.pickup.time)}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center text-gray-700 mb-1">
                        <Users className="h-5 w-5 mr-2" />
                        <span className="font-medium">Passengers</span>
                      </div>
                      <p className="text-gray-600 ml-7">{ride.passengers} passengers</p>
                    </div>

                    {ride.specialRequests && (
                      <div>
                        <div className="text-gray-700 font-medium mb-1">Special Requests</div>
                        <p className="text-gray-600">{ride.specialRequests}</p>
                      </div>
                    )}
                  </div>
                </div>

                {ride.status === 'assigned' && (
                  <button
                    onClick={() => updateRideStatus(ride.id, 'in_progress')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                  >
                    <Car className="h-5 w-5 mr-2" />
                    Start Ride
                  </button>
                )}

                {ride.status === 'in_progress' && (
                  <button
                    onClick={() => updateRideStatus(ride.id, 'completed')}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Complete Ride
                  </button>
                )}

                {ride.status === 'completed' && (
                  <div className="flex items-center justify-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Ride Completed</span>
                  </div>
                )}
              </div>
            ))}

            {rides.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">No rides assigned</h3>
                <p className="text-gray-500 mt-2">Check back later for new assignments</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPortal;