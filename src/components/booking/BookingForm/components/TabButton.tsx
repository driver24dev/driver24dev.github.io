import React from 'react';
import { Tab, TabType } from '../../types';

interface TabButtonProps {
  tab: Tab;
  isActive: boolean;
  onClick: (id: TabType) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, isActive, onClick }) => {
  const Icon = tab.icon;
  
  return (
    <button
      onClick={() => onClick(tab.id)}
      className={`flex items-center px-4 py-2 rounded-lg ${
        isActive
          ? 'bg-black text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-5 w-5 mr-2" />
      {tab.label}
    </button>
  );
};

export default TabButton;