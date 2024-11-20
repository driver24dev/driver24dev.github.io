import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2, Car, MapPin, User, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import DriverStats from './DriverStats';

interface Ride {
  id: string;
  bookingId: string;
  customer: {
    name: string;
    phone: string;
  };
  pickup: {
    location: string;
    time: string;
  };
  dropoff: {
    location: string;
  };
  status: 'assigned' | 'in_progress' | 'completed';
}

const DriverPortal: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
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
      const response = await fetch(`http://localhost:3000/api/drivers/rides/${rideId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update ride status');

      toast.success('Ride status updated successfully');
      fetchAssignedRides();
    } catch (error) {
      console.error('Error updating ride status:', error);
      toast.error('Failed to update ride status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
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
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <h3 className="font-semibold">{ride.customer.name}</h3>
                      <p className="text-sm text-gray-500">{ride.customer.phone}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
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

                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Pickup</p>
                      <p>{ride.pickup.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Dropoff</p>
                      <p>{ride.dropoff.location}</p>
                    </div>
                  </div>
                </div>

                {ride.status === 'assigned' && (
                  <button
                    onClick={() => updateRideStatus(ride.id, 'in_progress')}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Start Ride
                  </button>
                )}

                {ride.status === 'in_progress' && (
                  <button
                    onClick={() => updateRideStatus(ride.id, 'completed')}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
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