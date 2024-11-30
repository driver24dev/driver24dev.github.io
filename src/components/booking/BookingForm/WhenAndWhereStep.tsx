import { ServiceType, Location } from '../types';
import LocationInput from '../components/LocationInput';
import DateTimeInputs from '../components/DateTimeInputs';
import PassengerDetails from '../components/PassengerDetails';
import ServiceTypeToggle from '../ServiceTypeToggle';
import RideToggle from '../RideToggle';
import TripDuration from '../TripDuration';
import BookingMap from '../BookingMap';

interface WhenAndWhereStepProps {
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
  onClose: () => void;
  onContinue: () => void;
}

const WhenAndWhereStep: React.FC<WhenAndWhereStepProps> = ({
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
  onClose,
  onContinue,
}) => {
  return (
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
            value={pickup?.address || ''}
            required
          />

          {stops.map((stop, index) => (
            <LocationInput
              key={index}
              label={`Stop #${index + 1}`}
              onChange={(value) => onLocationInput(value, 'stop', index)}
              value={stop.address || ''}
              onRemove={() => onRemoveStop(index)}
              showRemoveButton
            />
          ))}

          <LocationInput
            label="Dropoff Location"
            onChange={(value) => onLocationInput(value, 'dropoff')}
            value={dropoff?.address || ''}
            required
          />

          <button
            type="button"
            onClick={onAddStop}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            + Add Stop
          </button>
        </div>

        <PassengerDetails
          travelers={travelers}
          kids={kids}
          bags={bags}
          onTravelersChange={onTravelersChange}
          onKidsChange={onKidsChange}
          onBagsChange={onBagsChange}
        />

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Continue
          </button>
        </div>
      </div>

      <div className="hidden lg:block w-[300px]">
        <BookingMap pickup={pickup} dropoff={dropoff} stops={stops} />
      </div>
    </div>
  );
};

export default WhenAndWhereStep;