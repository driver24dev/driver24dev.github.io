import React from 'react';
import { Star, Route, ThumbsUp } from 'lucide-react';

const DriverStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Rating</p>
            <p className="text-2xl font-semibold mt-1">4.9</p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-full">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-500">Last 30 days</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Rides</p>
            <p className="text-2xl font-semibold mt-1">128</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Route className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-500">All time</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Compliments</p>
            <p className="text-2xl font-semibold mt-1">47</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <ThumbsUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-500">From customers</div>
        </div>
      </div>
    </div>
  );
};

export default DriverStats;