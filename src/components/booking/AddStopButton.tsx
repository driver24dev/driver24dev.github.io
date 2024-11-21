import React from 'react';
import { Plus } from 'lucide-react';

interface AddStopButtonProps {
  onClick: () => void;
}

const AddStopButton: React.FC<AddStopButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onClick}
        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Stop
      </button>
    </div>
  );
};

export default AddStopButton;