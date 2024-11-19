import { Router } from 'express';
import { validateSignup, validateLogin } from '../middleware/validators';
import { AuthController } from '../controllers/authController';
import { protect, restrictTo } from '../middleware/auth';

const router = Router();
const authController = new AuthController();

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);

// Protected routes
router.use(protect);

// Admin only routes
router.patch(
  '/users/:id/role',
  restrictTo('admin'),
  authController.updateUserRole
);

router.get(
  '/users',
  restrictTo('admin'),
  authController.getUsers
);

export { router as authRouter };