import { Router } from 'express';
import { validateBooking } from '../middleware/validators';
import { BookingController } from '../controllers/bookingController';

const router = Router();
const bookingController = new BookingController();

router.post('/', validateBooking, bookingController.createBooking);
router.get('/:id', bookingController.getBooking);
router.get('/', bookingController.getAllBookings);
router.put('/:id', validateBooking, bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

export { router as bookingRouter };