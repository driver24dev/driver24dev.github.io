import { ApiError } from '../utils/apiError';
import { DriversService } from './driversService';
import { BookingService } from './bookingService';

interface Ride {
  id: string;
  bookingId: string;
  driverId: string;
  status: 'assigned' | 'completed';
  assignedAt: Date;
  completedAt?: Date;
}

export class RidesService {
  private rides: Map<string, Ride>;
  private driversService: DriversService;
  private bookingService: BookingService;

  constructor() {
    this.rides = new Map();
    this.driversService = new DriversService();
    this.bookingService = new BookingService();
  }

  async assignRide(bookingId: string, driverId: string): Promise<Ride> {
    const driver = await this.driversService.getDriverById(driverId);
    if (!driver) {
      throw new ApiError(404, 'Driver not found');
    }

    if (driver.status === 'busy') {
      throw new ApiError(400, 'Driver is not available');
    }

    const booking = await this.bookingService.getBooking(bookingId);
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    const id = Math.random().toString(36).substr(2, 9);
    const ride: Ride = {
      id,
      bookingId,
      driverId,
      status: 'assigned',
      assignedAt: new Date()
    };

    this.rides.set(id, ride);
    await this.driversService.updateDriverStatus(driverId, 'busy');
    await this.bookingService.updateBooking(bookingId, { status: 'assigned' });

    return ride;
  }

  async completeRide(id: string): Promise<Ride> {
    const ride = this.rides.get(id);
    if (!ride) {
      throw new ApiError(404, 'Ride not found');
    }

    ride.status = 'completed';
    ride.completedAt = new Date();
    this.rides.set(id, ride);

    await this.driversService.updateDriverStatus(ride.driverId, 'available');
    await this.driversService.incrementDriverRides(ride.driverId);
    await this.bookingService.updateBooking(ride.bookingId, { status: 'completed' });

    return ride;
  }
}