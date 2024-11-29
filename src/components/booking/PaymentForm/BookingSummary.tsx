import React from 'react';
import { BookingDetails } from '../types';
import { formatDate, formatTime, calculatePrices } from './utils';

interface BookingSummaryProps {
  bookingDetails: BookingDetails;
  agreeToTerms: boolean;
  onAgreeToTermsChange: (agreed: boolean) => void;
  onBack: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  bookingDetails,
  agreeToTerms,
  onAgreeToTermsChange,
  onBack
}) => {
  const { serviceFee, totalPrice } = calculatePrices(bookingDetails.vehicle.price);

  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Booking Summary</h3>
      
      <div>
        <p className="text-sm font-medium text-gray-900">Pickup</p>
        <p className="text-gray-900">{bookingDetails.pickupLocation}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900">Dropoff</p>
        <p className="text-gray-900">{bookingDetails.dropoffLocation}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900">Date & Time</p>
        <p className="text-gray-900">
          {formatDate(bookingDetails.date)} at {formatTime(bookingDetails.time)}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900">Passengers</p>
        <p className="text-gray-900">
          {bookingDetails.travelers} Adults, {bookingDetails.kids} Children
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900">Vehicle</p>
        <p className="text-gray-900">{bookingDetails.vehicle.name}</p>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-900">Base Fare</span>
          <span className="text-gray-900">${bookingDetails.vehicle.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-900">Service Fee</span>
          <span className="text-gray-900">${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;