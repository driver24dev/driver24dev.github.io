import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User, Car, Clock } from 'lucide-react';
import ClientBookings from './ClientBookings';
import ClientProfile from './ClientProfile';

const ClientPortal: React.FC = () => {
  const { user } = useAuth();

  return (
    <div id="client-portal" className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <User className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-gray-600 mt-1">Manage your bookings and profile</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Rides</p>
                <p className="text-2xl font-semibold mt-1">2</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rides</p>
                <p className="text-2xl font-semibold mt-1">12</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ClientBookings />
          </div>
          <div>
            <ClientProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;