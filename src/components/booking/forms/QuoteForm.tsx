import React from 'react';
import { toast } from 'sonner';
import LocationInput from '../inputs/LocationInput';
import DateTimeInputs from '../inputs/DateTimeInputs';
import BookingMap from '../BookingMap';
import { Location } from '../types';

interface QuoteFormProps {
  onClose: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onClose }) => {
  const [locations, setLocations] = React.useState<{
    pickup?: Location;
    dropoff?: Location;
  }>({});

  const handleLocationChange = (type: 'pickup' | 'dropoff', value: string) => {
    // Simulate geocoding
    const newLocation: Location = {
      lat: 34.0522,
      lng: -118.2437,
      address: value
    };
    
    setLocations(prev => ({
      ...prev,
      [type]: newLocation
    }));
  };

  const handleGetQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locations.pickup || !locations.dropoff) {
      toast.error('Please enter pickup and dropoff locations');
      return;
    }
    toast.success('Quote calculated successfully');
  };

  return (
    <form onSubmit={handleGetQuote} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <LocationInput
            label="Pickup Location"
            onChange={(value) => handleLocationChange('pickup', value)}
            required
          />
          <LocationInput
            label="Dropoff Location"
            onChange={(value) => handleLocationChange('dropoff', value)}
            required
          />
          <DateTimeInputs
            date=""
            time=""
            onDateChange={() => {}}
            onTimeChange={() => {}}
            required
          />
        </div>
        <BookingMap
          pickup={locations.pickup}
          dropoff={locations.dropoff}
          stops={[]}
        />
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Get Quote
        </button>
      </div>
    </form>
  );
};

export default QuoteForm;