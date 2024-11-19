import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth';
import { RidesController } from '../controllers/ridesController';

const router = Router();
const ridesController = new RidesController();

// Protect all routes
router.use(protect);

// Admin only routes
router.post('/assign', restrictTo('admin'), ridesController.assignRide);
router.patch('/:id/complete', restrictTo('admin'), ridesController.completeRide);

export { router as ridesRouter };