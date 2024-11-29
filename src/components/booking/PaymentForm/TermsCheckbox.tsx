import React from 'react';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  checked,
  onChange
}) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="ml-2 text-sm text-gray-900">
          I agree to the{' '}
          <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
        </span>
      </label>
    </div>
  );
};

export default TermsCheckbox;