import React from 'react';
import { BookingFormProps } from './booking/types';
import BookingFormContent from './booking/BookingForm';

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  return <BookingFormContent onClose={onClose} />;
};

export default BookingForm;