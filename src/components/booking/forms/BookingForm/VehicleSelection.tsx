import React from 'react';
import { Car, Users, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookingFormData } from '../../types';

interface VehicleSelectionProps {
  formData: BookingFormData;
  selectedVehicle: string | null;
  onVehicleSelect: (vehicleId: string) => void;
  onBack: () => void;
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

const VehicleSelection: React.FC<VehicleSelectionProps> = ({
  formData,
  selectedVehicle,
  onVehicleSelect
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Select Your Vehicle</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => {
          const isSelected = selectedVehicle === vehicle.id;
          
          return (
            <motion.div
              key={vehicle.id}
              whileHover={{ scale: 1.02 }}
              className={`bg-white rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${
                isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => onVehicleSelect(vehicle.id)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900">{vehicle.name}</h4>
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
    </div>
  );
};

export default VehicleSelection;