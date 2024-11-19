import { Request, Response, NextFunction } from 'express';
import { RidesService } from '../services/ridesService';
import { ApiError } from '../utils/apiError';

export class RidesController {
  private ridesService: RidesService;

  constructor() {
    this.ridesService = new RidesService();
  }

  assignRide = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookingId, driverId } = req.body;

      if (!bookingId || !driverId) {
        throw new ApiError(400, 'Booking ID and Driver ID are required');
      }

      const ride = await this.ridesService.assignRide(bookingId, driverId);
      res.json(ride);
    } catch (error) {
      next(error);
    }
  };

  completeRide = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const ride = await this.ridesService.completeRide(id);
      
      if (!ride) {
        throw new ApiError(404, 'Ride not found');
      }

      res.json(ride);
    } catch (error) {
      next(error);
    }
  };
}