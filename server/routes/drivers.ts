import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth';
import { DriversController } from '../controllers/driversController';

const router = Router();
const driversController = new DriversController();

// Protect all routes
router.use(protect);

// Driver routes
router.get('/:id/rides', driversController.getDriverRides);
router.patch('/rides/:id/status', driversController.updateRideStatus);

// Admin only routes
router.get('/', restrictTo('admin'), driversController.getAllDrivers);
router.patch('/:id/status', restrictTo('admin'), driversController.updateDriverStatus);

export { router as driversRouter };