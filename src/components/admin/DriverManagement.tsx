import React, { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle, Plus, Star, Route } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Driver {
  id: string;
  name: string;
  email: string;
  status: 'available' | 'busy';
  totalRides: number;
  rating: number;
  phone: string;
  vehicleType: string;
  licensePlate: string;
  joinedDate: string;
}

interface NewDriver {
  name: string;
  email: string;
  password: string;
  phone: string;
  vehicleType: string;
  licensePlate: string;
}

const DriverManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [newDriver, setNewDriver] = useState<NewDriver>({
    name: '',
    email: '',
    password: '',
    phone: '',
    vehicleType: 'sedan',
    licensePlate: ''
  });
  const { token } = useAuth();

  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@laelitechauffeur.com',
      phone: '(310) 555-0123',
      status: 'available',
      totalRides: 1250,
      rating: 4.9,
      vehicleType: 'Mercedes-Benz S-Class',
      licensePlate: '7ABC123',
      joinedDate: '2022-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@laelitechauffeur.com',
      phone: '(310) 555-0124',
      status: 'busy',
      totalRides: 890,
      rating: 4.8,
      vehicleType: 'Cadillac Escalade',
      licensePlate: '7XYZ789',
      joinedDate: '2022-03-20'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael.c@laelitechauffeur.com',
      phone: '(310) 555-0125',
      status: 'available',
      totalRides: 675,
      rating: 4.95,
      vehicleType: 'Mercedes-Benz Sprinter',
      licensePlate: '7DEF456',
      joinedDate: '2022-06-10'
    }
  ]);

  const toggleDriverStatus = async (driverId: string, newStatus: 'available' | 'busy') => {
    try {
      setLoading(true);
      setDrivers(drivers.map(driver => 
        driver.id === driverId 
          ? { ...driver, status: newStatus }
          : driver
      ));
      toast.success(`Driver status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating driver status:', error);
      toast.error('Failed to update driver status');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Create a new driver object
      const newDriverData: Driver = {
        id: `D${drivers.length + 1}`,
        name: newDriver.name,
        email: newDriver.email,
        phone: newDriver.phone,
        status: 'available',
        totalRides: 0,
        rating: 5.0,
        vehicleType: newDriver.vehicleType === 'sedan' 
          ? 'Mercedes-Benz S-Class' 
          : newDriver.vehicleType === 'suv' 
            ? 'Cadillac Escalade' 
            : 'Mercedes-Benz Sprinter',
        licensePlate: newDriver.licensePlate,
        joinedDate: new Date().toISOString().split('T')[0]
      };

      // Add the new driver to the state
      setDrivers([...drivers, newDriverData]);
      
      toast.success('Driver account created successfully');
      setShowAddDriver(false);
      setNewDriver({
        name: '',
        email: '',
        password: '',
        phone: '',
        vehicleType: 'sedan',
        licensePlate: ''
      });
    } catch (error) {
      console.error('Error creating driver account:', error);
      toast.error('Failed to create driver account');
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Driver Management</h2>
          <p className="text-gray-600 mt-1">Manage your fleet of professional chauffeurs</p>
        </div>
        <button
          onClick={() => setShowAddDriver(!showAddDriver)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Driver
        </button>
      </div>

      {showAddDriver && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Driver</h3>
          <form onSubmit={handleAddDriver} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newDriver.name}
                onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newDriver.email}
                onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newDriver.password}
                onChange={(e) => setNewDriver({ ...newDriver, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newDriver.phone}
                onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type
              </label>
              <select
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newDriver.vehicleType}
                onChange={(e) => setNewDriver({ ...newDriver, vehicleType: e.target.value })}
              >
                <option value="sedan">Mercedes-Benz S-Class</option>
                <option value="suv">Cadillac Escalade</option>
                <option value="van">Mercedes-Benz Sprinter</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Plate
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newDriver.licensePlate}
                onChange={(e) => setNewDriver({ ...newDriver, licensePlate: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={() => setShowAddDriver(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-6">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{driver.name}</h3>
                <div className="flex items-center mt-1 space-x-4">
                  <span className="text-gray-600">{driver.email}</span>
                  <span className="text-gray-600">{driver.phone}</span>
                </div>
              </div>
              <button
                onClick={() => toggleDriverStatus(
                  driver.id,
                  driver.status === 'available' ? 'busy' : 'available'
                )}
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                  driver.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {driver.status === 'available' ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : (
                  <XCircle className="h-4 w-4 mr-1" />
                )}
                {driver.status}
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <div>
                  <div className="text-sm font-medium">{driver.rating.toFixed(1)} Rating</div>
                  <div className="text-xs text-gray-500">Out of 5.0</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Route className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">{driver.totalRides.toLocaleString()} Rides</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">{driver.vehicleType}</div>
                <div className="text-xs text-gray-500">License: {driver.licensePlate}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Joined</div>
                <div className="text-xs text-gray-500">
                  {new Date(driver.joinedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverManagement;