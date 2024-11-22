import React from 'react';
import { toast } from 'sonner';
import BookingMap from '../BookingMap';
import ServiceTypeToggle from '../ServiceTypeToggle';
import RideToggle from '../RideToggle';
import LocationInput from '../LocationInput';
import DateTimeInputs from '../DateTimeInputs';
import PassengerDetails from '../PassengerDetails';
import ActionButtons from '../ActionButtons';
import AddStopButton from '../AddStopButton';
import TripDuration from '../TripDuration';
import VehicleSelection from '../VehicleSelection';
import PaymentForm from '../PaymentForm';
import { Location, BookingStep, ServiceType } from '../types';

interface BookTabProps {
  bookingStep: BookingStep;
  serviceType: ServiceType;
  isRideNow: boolean;
  pickup?: Location;
  dropoff?: Location;
  stops: Location[];
  date: string;
  time: string;
  hours: number;
  minutes: number;
  travelers: number;
  kids: number;
  bags: number;
  selectedVehicle: { name: string; price: number } | null;
  onClose: () => void;
  onServiceTypeChange: (type: ServiceType) => void;
  onRideNowToggle: (isNow: boolean) => void;
  onLocationInput: (value: string, type: 'pickup' | 'dropoff' | 'stop', stopIndex?: number) => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
  onTravelersChange: (travelers: number) => void;
  onKidsChange: (kids: number) => void;
  onBagsChange: (bags: number) => void;
  onAddStop: () => void;
  onRemoveStop: (index: number) => void;
  onStepChange: (step: BookingStep) => void;
  onVehicleSelect: (vehicle: { name: string; price: number }) => void;
}

const BookTab: React.FC<BookTabProps> = ({
  bookingStep,
  serviceType,
  isRideNow,
  pickup,
  dropoff,
  stops,
  date,
  time,
  hours,
  minutes,
  travelers,
  kids,
  bags,
  selectedVehicle,
  onClose,
  onServiceTypeChange,
  onRideNowToggle,
  onLocationInput,
  onDateChange,
  onTimeChange,
  onHoursChange,
  onMinutesChange,
  onTravelersChange,
  onKidsChange,
  onBagsChange,
  onAddStop,
  onRemoveStop,
  onStepChange,
  onVehicleSelect,
}) => {
  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      toast.error('Please select pickup and dropoff locations');
      return;
    }
    onStepChange('vehicle');
  };

  const handlePaymentSubmit = () => {
    toast.success('Booking confirmed!');
    onClose();
  };

  if (bookingStep === 'details') {
    return (
      <form onSubmit={handleDetailsSubmit} className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Where & When</h3>
              <ServiceTypeToggle serviceType={serviceType} onServiceTypeChange={onServiceTypeChange} />
            </div>

            {serviceType === 'hourly' && (
              <TripDuration
                hours={hours}
                minutes={minutes}
                onHoursChange={onHoursChange}
                onMinutesChange={onMinutesChange}
              />
            )}
            
            <RideToggle isRideNow={isRideNow} onToggle={onRideNowToggle} />

            {!isRideNow && (
              <DateTimeInputs
                date={date}
                time={time}
                onDateChange={onDateChange}
                onTimeChange={onTimeChange}
                required={!isRideNow}
              />
            )}

            <div className="space-y-4">
              <LocationInput
                label="Pickup Location"
                onChange={(value) => onLocationInput(value, 'pickup')}
                value={pickup?.address}
                required
              />

              {stops.map((stop, index) => (
                <LocationInput
                  key={index}
                  label={`Stop #${index + 1}`}
                  onChange={(value) => onLocationInput(value, 'stop', index)}
                  value={stop.address}
                  onRemove={() => onRemoveStop(index)}
                  showRemoveButton
                />
              ))}

              <LocationInput
                label="Dropoff Location"
                onChange={(value) => onLocationInput(value, 'dropoff')}
                value={dropoff?.address}
                required
              />

              <AddStopButton onClick={onAddStop} />
            </div>

            <PassengerDetails
              travelers={travelers}
              kids={kids}
              bags={bags}
              onTravelersChange={onTravelersChange}
              onKidsChange={onKidsChange}
              onBagsChange={onBagsChange}
            />

            <ActionButtons
              onCancel={onClose}
              submitLabel="Continue"
            />
          </div>

          <div className="hidden lg:block w-[300px]">
            <BookingMap pickup={pickup} dropoff={dropoff} stops={stops} />
          </div>
        </div>
      </form>
    );
  }

  if (bookingStep === 'vehicle') {
    return (
      <VehicleSelection
        onBack={() => onStepChange('details')}
        onContinue={() => onStepChange('payment')}
        onVehicleSelect={onVehicleSelect}
        bookingDetails={{
          pickupLocation: pickup?.address || '',
          dropoffLocation: dropoff?.address || '',
          date,
          time,
          travelers,
          kids,
          bags
        }}
      />
    );
  }

  if (bookingStep === 'payment' && selectedVehicle) {
    return (
      <PaymentForm
        onBack={() => onStepChange('vehicle')}
        onSubmit={handlePaymentSubmit}
        bookingDetails={{
          pickupLocation: pickup?.address || '',
          dropoffLocation: dropoff?.address || '',
          date,
          time,
          travelers,
          kids,
          bags,
          vehicle: selectedVehicle
        }}
      />
    );
  }

  return null;
};

export default BookTab;