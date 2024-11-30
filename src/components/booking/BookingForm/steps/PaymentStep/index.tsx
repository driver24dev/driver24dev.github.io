import React from 'react';
import { PaymentDetailsProps } from '../../../types/booking';
import PaymentDetails from '../../PaymentDetails';

const PaymentStep: React.FC<PaymentDetailsProps> = ({ bookingDetails, onBack, onSubmit }) => {
  return (
    <PaymentDetails
      bookingDetails={bookingDetails}
      onBack={onBack}
      onSubmit={onSubmit}
    />
  );
};

export default PaymentStep;