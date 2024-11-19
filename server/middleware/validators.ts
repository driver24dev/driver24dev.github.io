import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ApiError } from '../utils/apiError';

export const validateSignup = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter'),
  validateRequest
];

export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
];

export const validateBooking = [
  body('pickupLocation').notEmpty().trim(),
  body('dropoffLocation').notEmpty().trim(),
  body('date').notEmpty().isISO8601(),
  body('time').notEmpty().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('passengers').isInt({ min: 1, max: 12 }),
  body('vehicleType').isIn(['sedan', 'suv', 'van', 'stretch']),
  body('name').notEmpty().trim(),
  body('email').isEmail(),
  body('phone').notEmpty().trim(),
  validateRequest
];

function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation Error', errors.array());
  }
  next();
}