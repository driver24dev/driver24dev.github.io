import React from 'react';
import { motion } from 'framer-motion';
import { Info, ChevronDown, ChevronUp, LayoutGrid, List } from 'lucide-react';
import BookingMap from '../BookingMap';
import { Location } from '../types';

interface VehicleSelectionStepProps {
  pickup?: Location;
  dropoff?: Location;
  stops: Location[];
  date: string;
  time: string;
  travelers: number;
  kids: number;
  bags: number;
  onBack: () => void;
  onContinue: () => void;
  onVehicleSelect: (vehicle: { name: string; price: number }) => void;
}

const VehicleSelectionStep: React.FC<VehicleSelectionStepProps> = ({
  pickup,
  dropoff,
  stops,
  date,
  time,
  travelers,
  kids,
  bags,
  onBack,
  onContinue,
  onVehicleSelect
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Vehicle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Vehicle cards will go here */}
          </div>
        </div>

        <div className="hidden lg:block w-[300px]">
          <BookingMap pickup={pickup} dropoff={dropoff} stops={stops} />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default VehicleSelectionStep;