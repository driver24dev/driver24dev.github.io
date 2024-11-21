import React from 'react';

interface ActionButtonsProps {
  onCancel: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  loading?: boolean;
  submitType?: 'submit' | 'button';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  onSubmit,
  submitLabel = 'Continue',
  loading = false,
  submitType = 'submit'
}) => {
  return (
    <div className="flex justify-end space-x-4 pt-4">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
      >
        Cancel
      </button>
      <button
        type={submitType}
        onClick={onSubmit}
        disabled={loading}
        className="flex-1 px-8 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? 'Processing...' : submitLabel}
      </button>
    </div>
  );
};

export default ActionButtons;