import React from 'react';
import { Calendar, Calculator, Receipt, Clock } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TabType } from './types';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'book' as const, label: 'Book Now', icon: Calendar },
    { id: 'quote' as const, label: 'Price Quote', icon: Calculator },
    { id: 'receipts' as const, label: 'Quick Receipts', icon: Receipt },
    { id: 'manage' as const, label: 'Manage Reservations', icon: Clock },
  ];

  const renderDesktopNav = () => (
    <div className="hidden lg:flex space-x-4">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center px-4 py-2 rounded-lg transition ${
            activeTab === id ? 'bg-black text-white' : 'text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Icon className="h-5 w-5 mr-2" />
          {label}
        </button>
      ))}
    </div>
  );

  const renderMobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
          <Calendar className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-white">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === id ? 'bg-black text-white' : 'hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      {renderDesktopNav()}
      {renderMobileNav()}
    </>
  );
};

export default Navigation;