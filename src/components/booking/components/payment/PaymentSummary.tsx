import React from 'react';
import { formatDate, formatTime, calculatePrices } from '../../utils';
import { BookingDetails } from '../../types';

interface PaymentSummaryProps {
  bookingDetails: BookingDetails;
  agreeToTerms: boolean;
  onAgreeToTermsChange: (agreed: boolean) => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  bookingDetails,
  agreeToTerms,
  onAgreeToTermsChange
}) => {
  const { serviceFee, totalPrice } = calculatePrices(bookingDetails.vehicle.price);

  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
      
      <div>
        <p className="text-sm font-medium">Pickup</p>
        <p>{bookingDetails.pickupLocation}</p>
      </div>

      <div>
        <p className="text-sm font-medium">Dropoff</p>
        <p>{bookingDetails.dropoffLocation}</p>
      </div>

      <div>
        <p className="text-sm font-medium">Date & Time</p>
        <p>
          {formatDate(bookingDetails.date)} at {formatTime(bookingDetails.time)}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium">Passengers</p>
        <p>
          {bookingDetails.travelers} Adults, {bookingDetails.kids} Children
        </p>
      </div>

      <div>
        <p className="text-sm font-medium">Vehicle</p>
        <p>{bookingDetails.vehicle.name}</p>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Base Fare</span>
          <span>${bookingDetails.vehicle.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="pt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={agreeToTerms}
            onChange={(e) => onAgreeToTermsChange(e.target.checked)}
          />
          <span className="ml-2 text-sm">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
          </span>
        </label>
      </div>
    </div>
  );
};

export default PaymentSummary;