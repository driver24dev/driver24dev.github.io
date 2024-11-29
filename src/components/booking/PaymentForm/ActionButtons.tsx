import React from 'react';

interface ActionButtonsProps {
  onBack: () => void;
  disabled: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onBack,
  disabled
}) => {
  return (
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
        disabled={disabled}
        className="flex-1 ml-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Book Now
      </button>
    </div>
  );
};

export default ActionButtons;