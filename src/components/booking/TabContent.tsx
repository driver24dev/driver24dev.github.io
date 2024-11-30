import React from 'react';
import { TabType } from './types';
import BookTab from './tabs/BookTab';
import QuoteTab from './tabs/QuoteTab';
import ReceiptsTab from './tabs/ReceiptsTab';
import ManageTab from './tabs/ManageTab';

interface TabContentProps {
  activeTab: TabType;
  onClose: () => void;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, onClose }) => {
  switch (activeTab) {
    case 'book':
      return <BookTab onClose={onClose} />;
    case 'quote':
      return <QuoteTab onClose={onClose} />;
    case 'receipts':
      return <ReceiptsTab />;
    case 'manage':
      return <ManageTab />;
    default:
      return null;
  }
};

export default TabContent;