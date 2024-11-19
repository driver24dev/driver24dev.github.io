import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Shield, Users, Car, Calendar } from 'lucide-react';
import RideAssignment from './RideAssignment';
import DriverManagement from './DriverManagement';
import BookingsList from './BookingsList';

const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');

  if (!isAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You don't have permission to access this area.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="admin" className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Shield className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'bookings'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'drivers'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="h-5 w-5 mr-2" />
            Drivers
          </button>
          <button
            onClick={() => setActiveTab('rides')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'rides'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Car className="h-5 w-5 mr-2" />
            Ride Assignment
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'bookings' && <BookingsList />}
          {activeTab === 'drivers' && <DriverManagement />}
          {activeTab === 'rides' && <RideAssignment />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;