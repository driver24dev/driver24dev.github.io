import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { PassengerInfo } from './types';
import 'react-phone-input-2/lib/style.css';

interface PassengerInfoSectionProps {
  passengerInfo: PassengerInfo;
  onPassengerInfoChange: (info: PassengerInfo) => void;
}

const PassengerInfoSection: React.FC<PassengerInfoSectionProps> = ({
  passengerInfo,
  onPassengerInfoChange
}) => {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Passenger Information</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={passengerInfo.firstName}
            onChange={(e) => onPassengerInfoChange({ ...passengerInfo, firstName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={passengerInfo.lastName}
            onChange={(e) => onPassengerInfoChange({ ...passengerInfo, lastName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <PhoneInput
            country={'us'}
            value={passengerInfo.phone}
            onChange={(phone) => onPassengerInfoChange({ ...passengerInfo, phone })}
            containerClass="w-full"
            inputClass="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={passengerInfo.email}
            onChange={(e) => onPassengerInfoChange({ ...passengerInfo, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PassengerInfoSection;