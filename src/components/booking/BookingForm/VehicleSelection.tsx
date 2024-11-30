import { Car, Users, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookingDetails } from '../types';

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
}

interface VehicleSelectionProps {
  bookingDetails: BookingDetails;
  selectedVehicle: string | null;
  onVehicleSelect: (vehicle: { name: string; price: number }) => void;
  onBack: () => void;
  onContinue: () => void;
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
    basePrice: 129
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
    basePrice: 159
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
    basePrice: 199
  }
];

const VehicleSelection = ({
  bookingDetails,
  selectedVehicle,
  onVehicleSelect,
  onBack,
  onContinue
}: VehicleSelectionProps) => {
  const handleVehicleSelect = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      onVehicleSelect({
        name: vehicle.name,
        price: vehicle.basePrice
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Select Your Vehicle</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => {
          const isSelected = selectedVehicle === vehicle.id;
          
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
                <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{vehicle.description}</p>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{vehicle.capacity.passengers}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{vehicle.capacity.luggage}</span>
                  </div>
                </div>
                
                <div className="text-xl font-bold text-gray-900">
                  ${vehicle.basePrice}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!selectedVehicle}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default VehicleSelection;