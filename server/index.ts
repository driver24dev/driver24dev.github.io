import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { bookingRouter } from './routes/booking';
import { authRouter } from './routes/auth';
import { driversRouter } from './routes/drivers';
import { ridesRouter } from './routes/rides';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(limiter);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/drivers', driversRouter);
app.use('/api/rides', ridesRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port Continuing the server/index.ts file content:

, () => {
  console.log(`Server running on port ${port}`);
});