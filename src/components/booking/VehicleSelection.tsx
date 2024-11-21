import React, { useState } from 'react';
import { Car, Users, Briefcase, LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';

interface VehicleSelectionProps {
  onBack: () => void;
  onContinue: () => void;
  onVehicleSelect: (vehicle: { name: string; price: number }) => void;
  bookingDetails: {
    pickupLocation: string;
    dropoffLocation: string;
    date: string;
    time: string;
    travelers: number;
    kids: number;
    bags: number;
  };
}

interface Vehicle {
  id: string;
  name: string;
  image: string;
  description: string;
  capacity: {
    passengers: number;
    luggage: number;
  };
  basePrice: number;
  pricePerMile: number;
}

const vehicles: Vehicle[] = [
  {
    id: 'sedan',
    name: 'Mercedes-Benz S-Class',
    image: '/images/fleet-mercedes-s-class.jpg',
    description: 'Luxury sedan for executive travel',
    capacity: {
      passengers: 3,
      luggage: 3
    },
    basePrice: 129,
    pricePerMile: 2.5
  },
  {
    id: 'suv',
    name: 'Cadillac Escalade',
    image: '/images/fleet-escalade.jpg',
    description: 'Premium SUV for group travel',
    capacity: {
      passengers: 6,
      luggage: 6
    },
    basePrice: 159,
    pricePerMile: 3
  },
  {
    id: 'van',
    name: 'Mercedes-Benz Sprinter',
    image: '/images/fleet-sprinter.jpg',
    description: 'Luxury van for larger groups',
    capacity: {
      passengers: 12,
      luggage: 12
    },
    basePrice: 199,
    pricePerMile: 3.5
  },
  {
    id: 'minibus',
    name: 'Mini Bus',
    image: '/images/fleet-sprinter.jpg', // Placeholder image
    description: 'Perfect for medium-sized groups',
    capacity: {
      passengers: 15,
      luggage: 15
    },
    basePrice: 249,
    pricePerMile: 4
  }
];

const VehicleSelection: React.FC<VehicleSelectionProps> = ({
  onBack,
  onContinue,
  onVehicleSelect,
  bookingDetails
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  const calculateEstimatedPrice = (vehicle: Vehicle) => {
    // This is a simplified calculation - you would want to implement actual distance-based pricing
    const estimatedMiles = 20; // Example: 20 miles trip
    return vehicle.basePrice + (vehicle.pricePerMile * estimatedMiles);
  };

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      onVehicleSelect({
        name: vehicle.name,
        price: calculateEstimatedPrice(vehicle)
      });
    }
  };

  const renderTripDetails = () => (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold mb-4">Trip Details</h3>
      
      <div>
        <p className="text-sm font-medium text-gray-600">Pickup</p>
        <p className="text-gray-900">{bookingDetails.pickupLocation}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600">Dropoff</p>
        <p className="text-gray-900">{bookingDetails.dropoffLocation}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600">Date & Time</p>
        <p className="text-gray-900">
          {formatDate(bookingDetails.date)} at {formatTime(bookingDetails.time)}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600">Passengers</p>
        <p className="text-gray-900">
          {bookingDetails.travelers} Adults, {bookingDetails.kids} Children
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600">Luggage</p>
        <p className="text-gray-900">{bookingDetails.bags} Bags</p>
      </div>

      {selectedVehicle && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="mb-2">
            <p className="text-sm font-medium text-gray-600">Selected Vehicle</p>
            <p className="text-gray-900">
              {vehicles.find(v => v.id === selectedVehicle)?.name}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Estimated Price</p>
            <p className="text-2xl font-bold text-gray-900">
              ${calculateEstimatedPrice(vehicles.find(v => v.id === selectedVehicle)!).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderVehicleCard = (vehicle: Vehicle) => {
    const isSelected = selectedVehicle === vehicle.id;
    const estimatedPrice = calculateEstimatedPrice(vehicle);

    return (
      <motion.div
        key={vehicle.id}
        whileHover={{ scale: 1.02 }}
        className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
          isSelected ? 'ring-2 ring-blue-500' : ''
        }`}
        onClick={() => handleVehicleSelect(vehicle.id)}
      >
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{vehicle.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{vehicle.description}</p>
          
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm">{vehicle.capacity.passengers} passengers</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm">{vehicle.capacity.luggage} bags</span>
            </div>
          </div>
          
          <div className="text-xl font-bold">
            ${estimatedPrice.toFixed(2)}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderVehicleList = (vehicle: Vehicle) => {
    const isSelected = selectedVehicle === vehicle.id;
    const estimatedPrice = calculateEstimatedPrice(vehicle);

    return (
      <motion.div
        key={vehicle.id}
        whileHover={{ scale: 1.01 }}
        className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all ${
          isSelected ? 'ring-2 ring-blue-500' : ''
        }`}
        onClick={() => handleVehicleSelect(vehicle.id)}
      >
        <div className="flex">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-48 h-32 object-cover rounded-lg"
          />
          <div className="ml-6 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                <p className="text-gray-600 text-sm">{vehicle.description}</p>
              </div>
              <div className="text-xl font-bold">
                ${estimatedPrice.toFixed(2)}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm">{vehicle.capacity.passengers} passengers</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm">{vehicle.capacity.luggage} bags</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Select Vehicle</h2>
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${
              viewMode === 'grid' ? 'bg-white shadow' : ''
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list' ? 'bg-white shadow' : ''
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className={`${viewMode === 'grid' ? 'flex-1' : 'w-2/3'}`}>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vehicles.map(renderVehicleCard)}
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.map(renderVehicleList)}
            </div>
          )}
        </div>
        <div className="w-1/3">
          {renderTripDetails()}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="flex-1 mr-4 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!selectedVehicle}
          className="flex-1 ml-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default VehicleSelection;