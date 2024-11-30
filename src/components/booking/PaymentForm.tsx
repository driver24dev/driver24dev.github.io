import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Info, ChevronDown, ChevronUp } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface BookingDetails {
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  travelers: number;
  kids: number;
  bags: number;
  vehicle: {
    name: string;
    price: number;
  };
}

interface PaymentFormProps {
  onBack: () => void;
  onSubmit: () => void;
  bookingDetails: BookingDetails;
}

interface PassengerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  nameSign: string;
}

interface PaymentDetails {
  method: 'credit_card';
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  postalCode: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  onBack,
  onSubmit,
  bookingDetails
}) => {
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    nameSign: ''
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: 'credit_card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    postalCode: ''
  });

  const [specialInstructions, setSpecialInstructions] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      return;
    }
    onSubmit();
  };

  const serviceFee = bookingDetails.vehicle?.price ? bookingDetails.vehicle.price * 0.1 : 0;
  const totalPrice = bookingDetails.vehicle?.price ? bookingDetails.vehicle.price + serviceFee : 0;

  const renderBookingSummary = () => (
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

      <div className="mt-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-900">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
          </span>
        </label>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 mr-2 px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!agreeToTerms}
          className="flex-1 ml-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Book Now
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setShowMobileDetails(!showMobileDetails)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              <Info className="h-5 w-5" />
              {showMobileDetails ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="text-lg font-bold text-gray-900">
            ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}

      {isMobile && showMobileDetails && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden mb-6"
        >
          {renderBookingSummary()}
        </motion.div>
      )}

      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Passenger Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={passengerInfo.firstName}
                  onChange={(e) => setPassengerInfo({ ...passengerInfo, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={passengerInfo.lastName}
                  onChange={(e) => setPassengerInfo({ ...passengerInfo, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <PhoneInput
                  country={'us'}
                  value={passengerInfo.phone}
                  onChange={(phone) => setPassengerInfo({ ...passengerInfo, phone })}
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
                  onChange={(e) => setPassengerInfo({ ...passengerInfo, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder</label>
                <input
                  type="text"
                  value={paymentDetails.cardHolder}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolder: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  value={paymentDetails.postalCode}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, postalCode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Any special requests or instructions for your ride?"
            />
          </div>
        </div>

        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-1/3"
          >
            <div className="sticky top-24">
              {renderBookingSummary()}
            </div>
          </motion.div>
        )}
      </div>

      {isMobile && !showMobileDetails && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 mr-2 px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!agreeToTerms}
              className="flex-1 ml-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default PaymentForm;