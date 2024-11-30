import React from 'react';
import { MapPin, Search, Edit2, X } from 'lucide-react';

interface LocationInputProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  required?: boolean;
  showRemoveButton?: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  onChange,
  onRemove,
  required = false,
  showRemoveButton = false,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Enter location"
          className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          onChange={(e) => onChange(e.target.value)}
          required={required}
          value={value}
        />
        <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
          {showRemoveButton && onRemove && (
            <button 
              type="button"
              onClick={onRemove}
              className="p-1 hover:bg-gray-100 rounded-full text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button type="button" className="p-1 hover:bg-gray-100 rounded-full">
            <Search className="h-4 w-4 text-gray-400" />
          </button>
          <button type="button" className="p-1 hover:bg-gray-100 rounded-full">
            <Edit2 className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
      {value && (
        <p className="mt-1 text-sm text-gray-600">{value}</p>
      )}
    </div>
  );
};

export default LocationInput;