import React from 'react';

type ServiceType = 'transfer' | 'hourly';

interface ServiceTypeToggleProps {
  serviceType: ServiceType;
  onServiceTypeChange: (type: ServiceType) => void;
}

const ServiceTypeToggle: React.FC<ServiceTypeToggleProps> = ({ serviceType, onServiceTypeChange }) => {
  return (
    <div className="inline-flex bg-gray-100 rounded-lg p-1">
      <button
        type="button"
        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
          serviceType === 'transfer' ? 'bg-white shadow' : 'text-gray-600'
        }`}
        onClick={() => onServiceTypeChange('transfer')}
      >
        Transfer
      </button>
      <button
        type="button"
        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
          serviceType === 'hourly' ? 'bg-white shadow' : 'text-gray-600'
        }`}
        onClick={() => onServiceTypeChange('hourly')}
      >
        Hourly
      </button>
    </div>
  );
};

export default ServiceTypeToggle;