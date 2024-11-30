import React from 'react';
import { Menu } from 'lucide-react';
import { TabType } from '../../types';
import { TABS } from '../constants';

interface MobileTabSelectProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const MobileTabSelect: React.FC<MobileTabSelectProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="relative flex items-center">
      <Menu className="absolute left-3 h-5 w-5 text-gray-500 pointer-events-none" />
      <select
        value={activeTab}
        onChange={(e) => onTabChange(e.target.value as TabType)}
        className="bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {TABS.map(tab => (
          <option key={tab.id} value={tab.id}>
            {tab.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MobileTabSelect;