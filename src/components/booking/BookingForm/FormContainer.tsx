import React from 'react';

interface FormContainerProps {
  children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {children}
    </div>
  );
};