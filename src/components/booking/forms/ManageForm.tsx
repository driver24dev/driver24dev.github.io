import React from 'react';
import { Search, Calendar } from 'lucide-react';

const ManageForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg divide-y">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Manage Reservations</h3>
          <p className="text-sm text-gray-600">
            View, modify, or cancel your upcoming reservations
          </p>
        </div>
        <div className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Confirmation Number"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Find Booking</span>
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-center text-gray-500">
            No active reservations found
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageForm;