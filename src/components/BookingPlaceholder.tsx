import React from 'react';
import { Car, Calendar, MapPin, Users } from 'lucide-react';

const BookingPlaceholder: React.FC = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow-lg p-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Location Fields */}
        <div>
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-gray-300 mr-2" />
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-gray-300 mr-2" />
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        </div>

        {/* Date and Time Fields */}
        <div>
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-gray-300 mr-2" />
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-gray-300 mr-2" />
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        </div>

        {/* Vehicle and Passengers */}
        <div>
          <div className="flex items-center mb-2">
            <Car className="h-5 w-5 text-gray-300 mr-2" />
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-gray-300 mr-2" />
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        </div>

        {/* Contact Information */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default BookingPlaceholder;