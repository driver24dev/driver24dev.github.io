import React from 'react';
import { BookingFormData } from '../../types';
import LocationInput from '../../inputs/LocationInput';
import DateTimeInputs from '../../inputs/DateTimeInputs';
import PassengerDetails from '../../PassengerDetails';
import ServiceTypeToggle from '../../ServiceTypeToggle';
import RideToggle from '../../RideToggle';

interface BookingDetailsProps {
  formData: BookingFormData;
  onFormDataChange: (data: BookingFormData) => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  formData,
  onFormDataChange
}) => {
  const handleChange = (field: keyof BookingFormData, value: any) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
        <ServiceTypeToggle
          serviceType={formData.serviceType}
          onServiceTypeChange={(type) => handleChange('serviceType', type)}
        />
      </div>

      <RideToggle
        isRideNow={false}
        onToggle={() => {}}
      />

      <DateTimeInputs
        date={formData.date}
        time={formData.time}
        onDateChange={(date) => handleChange('date', date)}
        onTimeChange={(time) => handleChange('time', time)}
        required
      />

      <div className="space-y-4">
        <LocationInput
          label="Pickup Location"
          value={formData.pickupLocation}
          onChange={(value) => handleChange('pickupLocation', value)}
          required
        />
        <LocationInput
          label="Dropoff Location"
          value={formData.dropoffLocation}
          onChange={(value) => handleChange('dropoffLocation', value)}
          required
        />
      </div>

      <PassengerDetails
        travelers={formData.travelers}
        kids={formData.kids}
        bags={formData.bags}
        onTravelersChange={(value) => handleChange('travelers', value)}
        onKidsChange={(value) => handleChange('kids', value)}
        onBagsChange={(value) => handleChange('bags', value)}
      />
    </div>
  );
};

export default BookingDetails;