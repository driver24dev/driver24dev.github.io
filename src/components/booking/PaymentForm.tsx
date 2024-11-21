import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Info } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PaymentFormProps {
  onBack: () => void;
  onSubmit: () => void;
  bookingDetails: {
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
  };
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
  method: 'credit_card' | 'paypal';
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
      alert('Please agree to the terms and conditions');
      return;
    }
    onSubmit();
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substr(0, 5);
  };

  const serviceFee = bookingDetails.vehicle?.price ? bookingDetails.vehicle.price * 0.1 : 0;
  const totalPrice = bookingDetails.vehicle?.price ? bookingDetails.vehicle.price + serviceFee : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Passenger Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">Passenger Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={passengerInfo.firstName}
                  onChange={(e) => setPassengerInfo({ ...passengerInfo, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={passengerInfo.lastName}
                  onChange={(e) => setPassengerInfo({ ...passengerInfo, lastName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Phone
                </label>
                <PhoneInput
                  country={'us'}
                  value={passengerInfo.phone}
                  onChange={(phone) => setPassengerInfo({ ...passengerInfo, phone })}
                  containerClass="w-full"
                  inputClass="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={passengerInfo.email}
                  onChange={(e) => setPassengerInfo({ ...passengerInfo, email: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Emergency Contact</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={passengerInfo.contactName}
                    onChange={(e) => setPassengerInfo({ ...passengerInfo, contactName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone
                  </label>
                  <PhoneInput
                    country={'us'}
                    value={passengerInfo.contactPhone}
                    onChange={(phone) => setPassengerInfo({ ...passengerInfo, contactPhone: phone })}
                    containerClass="w-full"
                    inputClass="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={passengerInfo.contactEmail}
                    onChange={(e) => setPassengerInfo({ ...passengerInfo, contactEmail: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name Sign / Alias
                  </label>
                  <input
                    type="text"
                    placeholder="Name to display on pickup sign"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={passengerInfo.nameSign}
                    onChange={(e) => setPassengerInfo({ ...passengerInfo, nameSign: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={paymentDetails.method}
                  onChange={(e) => setPaymentDetails({ 
                    ...paymentDetails, 
                    method: e.target.value as 'credit_card' | 'paypal'
                  })}
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              {paymentDetails.method === 'credit_card' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({
                        ...paymentDetails,
                        cardNumber: formatCardNumber(e.target.value)
                      })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={paymentDetails.cardHolder}
                      onChange={(e) => setPaymentDetails({
                        ...paymentDetails,
                        cardHolder: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails({
                        ...paymentDetails,
                        expiryDate: formatExpiryDate(e.target.value)
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({
                        ...paymentDetails,
                        cvv: e.target.value.replace(/\D/g, '')
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Billing Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={paymentDetails.postalCode}
                      onChange={(e) => setPaymentDetails({
                        ...paymentDetails,
                        postalCode: e.target.value
                      })}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Special Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Special Instructions
            </h3>
            <textarea
              rows={4}
              placeholder="Any special requests or instructions for your driver..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            />
          </motion.div>
        </div>

        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-1/3" >
        
          <div className="bg-gray-50 p-6 rounded-lg space-y-4 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            
            <div>
              <p className="text-sm font-medium text-gray-600">Pickup</p>
              <p className="text-gray-900">{bookingDetails.pickupLocation}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600">Dropoff</p>
              <p className="text-gray-900">{bookingDetails.dropoffLocation}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600">Date & Time</p>
              <p className="text-gray-900">
                {formatDate(bookingDetails.date)} at {formatTime(bookingDetails.time)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600">Passengers</p>
              <p className="text-gray-900">
                {bookingDetails.travelers} Adults, {bookingDetails.kids} Children
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600">Vehicle</p>
              <p className="text-gray-900">{bookingDetails.vehicle.name}</p>
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

            <div className="mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                </span>
              </label>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 mr-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
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
        </motion.div>
      </div>
    </form>
  );
};

export default PaymentForm;