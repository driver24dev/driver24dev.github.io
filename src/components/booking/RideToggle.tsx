import React from 'react';

interface RideToggleProps {
  isRideNow: boolean;
  onToggle: (isNow: boolean) => void;
}

const RideToggle: React.FC<RideToggleProps> = ({ isRideNow, onToggle }) => {
  return (
    <div className="flex items-center justify-center space-x-4 bg-gray-50 p-4 rounded-lg">
      <span 
        className={`cursor-pointer px-4 py-2 rounded-lg transition ${!isRideNow ? 'bg-black text-white' : 'text-gray-600'}`}
        onClick={() => onToggle(false)}
      >
        Schedule Ride
      </span>
      <span 
        className={`cursor-pointer px-4 py-2 rounded-lg transition ${isRideNow ? 'bg-black text-white' : 'text-gray-600'}`}
        onClick={() => onToggle(true)}
      >
        Ride Now
      </span>
    </div>
  );
};

export default RideToggle;