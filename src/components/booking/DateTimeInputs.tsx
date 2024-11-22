import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DateTimeInputsProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  required?: boolean;
}

const DateTimeInputs: React.FC<DateTimeInputsProps> = ({
  date,
  time,
  onDateChange,
  onTimeChange,
  required = false,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          <Calendar className="inline-block h-4 w-4 mr-1 text-gray-700" />
          Pickup Date
        </label>
        <input
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          required={required}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          <Clock className="inline-block h-4 w-4 mr-1 text-gray-700" />
          Pickup Time
        </label>
        <input
          type="time"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          required={required}
        />
      </div>
    </div>
  );
};

export default DateTimeInputs;