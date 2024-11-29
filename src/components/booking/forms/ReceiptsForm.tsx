import React from 'react';
import { Receipt, Search } from 'lucide-react';

const ReceiptsForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg divide-y">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Recent Receipts</h3>
          <p className="text-sm text-gray-600">
            Enter your booking ID or email to find your receipt
          </p>
        </div>
        <div className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Booking ID or Email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Receipt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-center text-gray-500">
            No recent receipts found
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptsForm;