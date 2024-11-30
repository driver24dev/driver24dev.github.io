import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface PassengerDetailsProps {
  travelers: number;
  kids: number;
  bags: number;
  onTravelersChange: (value: number) => void;
  onKidsChange: (value: number) => void;
  onBagsChange: (value: number) => void;
}

const PassengerDetails: React.FC<PassengerDetailsProps> = ({
  travelers,
  kids,
  bags,
  onTravelersChange,
  onKidsChange,
  onBagsChange,
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Travelers
        </label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => onTravelersChange(Math.max(0, travelers - 1))}
            className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 shadow-sm"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-xl font-semibold w-8 text-center text-gray-900">{travelers}</span>
          <button
            type="button"
            onClick={() => onTravelersChange(Math.min(8, travelers + 1))}
            className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 shadow-sm"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Kids
        </label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => onKidsChange(Math.max(0, kids - 1))}
            className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 shadow-sm"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-xl font-semibold w-8 text-center text-gray-900">{kids}</span>
          <button
            type="button"
            onClick={() => onKidsChange(Math.min(4, kids + 1))}
            className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 shadow-sm"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Bags
        </label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => onBagsChange(Math.max(0, bags - 1))}
            className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 shadow-sm"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-xl font-semibold w-8 text-center text-gray-900">{bags}</span>
          <button
            type="button"
            onClick={() => onBagsChange(Math.min(6, bags + 1))}
            className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 shadow-sm"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;