import { Request, Response, NextFunction } from 'express';
import { DriversService } from '../services/driversService';
import { ApiError } from '../utils/apiError';

export class DriversController {
  private driversService: DriversService;

  constructor() {
    this.driversService = new DriversService();
  }

  getAllDrivers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const drivers = await this.driversService.getAllDrivers();
      res.json(drivers);
    } catch (error) {
      next(error);
    }
  };

  updateDriverStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['available', 'busy'].includes(status)) {
        throw new ApiError(400, 'Invalid status');
      }

      const driver = await this.driversService.updateDriverStatus(id, status);
      if (!driver) {
        throw new ApiError(404, 'Driver not found');
      }

      res.json(driver);
    } catch (error) {
      next(error);
    }
  };

  getDriverRides = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      // Ensure the driver can only access their own rides
      if (req.user?.id !== id && req.user?.role !== 'admin') {
        throw new ApiError(403, 'Not authorized to access these rides');
      }

      const rides = await this.driversService.getDriverRides(id);
      res.json(rides);
    } catch (error) {
      next(error);
    }
  };

  updateRideStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const driverId = req.user?.id;

      if (!['in_progress', 'completed'].includes(status)) {
        throw new ApiError(400, 'Invalid status');
      }

      const ride = await this.driversService.updateRideStatus(id, driverId!, status);
      res.json(ride);
    } catch (error) {
      next(error);
    }
  };
}