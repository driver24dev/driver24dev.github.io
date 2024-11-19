import { Request, Response, NextFunction } from 'express';
import { BookingService } from '../services/bookingService';
import { ApiError } from '../utils/apiError';

export class BookingController {
  private bookingService: BookingService;

  constructor() {
    this.bookingService = new BookingService();
  }

  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = await this.bookingService.createBooking(req.body);
      res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  };

  getBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = await this.bookingService.getBooking(req.params.id);
      if (!booking) {
        throw new ApiError(404, 'Booking not found');
      }
      res.json(booking);
    } catch (error) {
      next(error);
    }
  };

  getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings = await this.bookingService.getAllBookings();
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  };

  updateBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = await this.bookingService.updateBooking(req.params.id, req.body);
      if (!booking) {
        throw new ApiError(404, 'Booking not found');
      }
      res.json(booking);
    } catch (error) {
      next(error);
    }
  };

  deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.bookingService.deleteBooking(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}