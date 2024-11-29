import React from 'react';

interface SpecialInstructionsProps {
  value: string;
  onChange: (value: string) => void;
}

const SpecialInstructions: React.FC<SpecialInstructionsProps> = ({
  value,
  onChange
}) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={4}
        placeholder="Any special requests or instructions for your ride?"
      />
    </div>
  );
};

export default SpecialInstructions;