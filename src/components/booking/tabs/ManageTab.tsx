import React from 'react';

const ManageTab: React.FC = () => {
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
            <input
              type="text"
              placeholder="Confirmation Number"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Find Booking
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

export default ManageTab;