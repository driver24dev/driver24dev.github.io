import React from 'react';
import { BookingFormData } from '../../../types';

interface BookingSummaryProps {
  formData: BookingFormData;
  selectedVehicle: { name: string; price: number; } | null;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  formData,
  selectedVehicle
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Booking Summary</h3>
      
      <div>
        <p className="text-sm font-medium text-gray-900">Pickup</p>
        <p className="text-gray-900">{formData.pickupLocation}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900">Dropoff</p>
        <p className="text-gray-900">{formData.dropoffLocation}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900">Date & Time</p>
        <p className="text-gray-900">
          {formatDate(formData.date)} at {formatTime(formData.time)}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900">Passengers</p>
        <p className="text-gray-900">
          {formData.travelers} Adults, {formData.kids} Children
        </p>
      </div>

      {selectedVehicle && (
        <>
          <div>
            <p className="text-sm font-medium text-gray-900">Vehicle</p>
            <p className="text-gray-900">{selectedVehicle.name}</p>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900">Base Fare</span>
              <span className="text-gray-900">${selectedVehicle.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900">Service Fee</span>
              <span className="text-gray-900">${(selectedVehicle.price * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">
                ${(selectedVehicle.price * 1.1).toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingSummary;