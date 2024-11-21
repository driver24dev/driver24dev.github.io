import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface TripDurationProps {
  hours: number;
  minutes: number;
  onHoursChange: (value: number) => void;
  onMinutesChange: (value: number) => void;
}

const TripDuration: React.FC<TripDurationProps> = ({
  hours,
  minutes,
  onHoursChange,
  onMinutesChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hours
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onHoursChange(Math.max(0, hours - 1))}
            className="p-2 rounded-lg hover:bg-gray-100 border border-gray-300"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            min="0"
            max="24"
            value={hours}
            onChange={(e) => onHoursChange(Math.min(24, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
          />
          <button
            type="button"
            onClick={() => onHoursChange(Math.min(24, hours + 1))}
            className="p-2 rounded-lg hover:bg-gray-100 border border-gray-300"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minutes
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onMinutesChange(Math.max(0, minutes - 10))}
            className="p-2 rounded-lg hover:bg-gray-100 border border-gray-300"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            min="0"
            max="50"
            step="10"
            value={minutes}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              const roundedValue = Math.round(value / 10) * 10;
              onMinutesChange(Math.min(50, Math.max(0, roundedValue)));
            }}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
          />
          <button
            type="button"
            onClick={() => onMinutesChange(Math.min(50, minutes + 10))}
            className="p-2 rounded-lg hover:bg-gray-100 border border-gray-300"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripDuration;