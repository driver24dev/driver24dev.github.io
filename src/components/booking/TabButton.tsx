import React from 'react';
import { TabButtonProps } from './types';

const TabButton: React.FC<TabButtonProps> = ({ id, icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center px-4 py-2 rounded-lg ${
        isActive
          ? 'bg-black text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default TabButton;