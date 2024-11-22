import React from 'react';
import { toast } from 'sonner';
import BookingMap from '../BookingMap';
import LocationInput from '../LocationInput';
import DateTimeInputs from '../DateTimeInputs';
import AddStopButton from '../AddStopButton';
import ActionButtons from '../ActionButtons';
import { Location } from '../types';

interface QuoteTabProps {
  pickup?: Location;
  dropoff?: Location;
  stops: Location[];
  date: string;
  time: string;
  onLocationInput: (value: string, type: 'pickup' | 'dropoff' | 'stop', stopIndex?: number) => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onAddStop: () => void;
  onClose: () => void;
}

const QuoteTab: React.FC<QuoteTabProps> = ({
  pickup,
  dropoff,
  stops,
  date,
  time,
  onLocationInput,
  onDateChange,
  onTimeChange,
  onAddStop,
  onClose,
}) => {
  const handleGetQuote = () => {
    if (!pickup || !dropoff) {
      toast.error('Please select pickup and dropoff locations');
      return;
    }
    toast.success('Quote calculated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Get a Price Quote</h3>
          
          <DateTimeInputs
            date={date}
            time={time}
            onDateChange={onDateChange}
            onTimeChange={onTimeChange}
          />

          <div className="space-y-4 mt-6">
            <LocationInput
              label="Pickup Location"
              onChange={(value) => onLocationInput(value, 'pickup')}
              value={pickup?.address}
            />

            <LocationInput
              label="Dropoff Location"
              onChange={(value) => onLocationInput(value, 'dropoff')}
              value={dropoff?.address}
            />

            <AddStopButton onClick={onAddStop} />
          </div>

          <ActionButtons
            onCancel={onClose}
            onSubmit={handleGetQuote}
            submitLabel="Get Quote"
            submitType="button"
          />
        </div>

        <div className="hidden lg:block w-[300px]">
          <BookingMap pickup={pickup} dropoff={dropoff} stops={stops} />
        </div>
      </div>
    </div>
  );
};

export default QuoteTab;