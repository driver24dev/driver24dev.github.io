import React from 'react';
import { TabType } from './types';
import { Menu } from 'lucide-react';

interface MobileMenuProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="lg:hidden relative flex items-center">
      <Menu className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
      <select
        value={activeTab}
        onChange={(e) => onTabChange(e.target.value as TabType)}
        className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-900 font-medium"
      >
        <option value="book" className="text-gray-900 font-medium">Book Now</option>
        <option value="quote" className="text-gray-900 font-medium">Price Quote</option>
        <option value="receipts" className="text-gray-900 font-medium">Quick Receipts</option>
        <option value="manage" className="text-gray-900 font-medium">Manage Reservations</option>
      </select>
    </div>
  );
};

export default MobileMenu;