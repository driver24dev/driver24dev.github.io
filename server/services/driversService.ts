import { ApiError } from '../utils/apiError';

interface Driver {
  id: string;
  name: string;
  email: string;
  status: 'available' | 'busy';
  totalRides: number;
  rating: number;
}

interface Ride {
  id: string;
  bookingId: string;
  driverId: string;
  customer: {
    name: string;
    phone: string;
  };
  pickup: {
    location: string;
    time: string;
  };
  dropoff: {
    location: string;
  };
  status: 'assigned' | 'in_progress' | 'completed';
}

export class DriversService {
  private drivers: Map<string, Driver>;
  private rides: Map<string, Ride>;

  constructor() {
    this.drivers = new Map();
    this.rides = new Map();
    this.addMockData();
  }

  private addMockData() {
    // Mock drivers
    const mockDrivers: Driver[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        status: 'available',
        totalRides: 150,
        rating: 4.8
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        status: 'busy',
        totalRides: 220,
        rating: 4.9
      }
    ];

    mockDrivers.forEach(driver => {
      this.drivers.set(driver.id, driver);
    });

    // Mock rides
    const mockRides: Ride[] = [
      {
        id: '1',
        bookingId: 'b1',
        driverId: '1',
        customer: {
          name: 'Alice Brown',
          phone: '(555) 123-4567'
        },
        pickup: {
          location: '123 Main St, Los Angeles',
          time: '2024-03-20 14:30'
        },
        dropoff: {
          location: 'LAX Airport'
        },
        status: 'assigned'
      }
    ];

    mockRides.forEach(ride => {
      this.rides.set(ride.id, ride);
    });
  }

  async getAllDrivers(): Promise<Driver[]> {
    return Array.from(this.drivers.values());
  }

  async getDriverById(id: string): Promise<Driver | undefined> {
    return this.drivers.get(id);
  }

  async updateDriverStatus(id: string, status: 'available' | 'busy'): Promise<Driver> {
    const driver = this.drivers.get(id);
    if (!driver) {
      throw new ApiError(404, 'Driver not found');
    }

    driver.status = status;
    this.drivers.set(id, driver);
    return driver;
  }

  async getDriverRides(driverId: string): Promise<Ride[]> {
    return Array.from(this.rides.values()).filter(
      ride => ride.driverId === driverId
    );
  }

  async updateRideStatus(
    rideId: string,
    driverId: string,
    status: 'in_progress' | 'completed'
  ): Promise<Ride> {
    const ride = this.rides.get(rideId);
    
    if (!ride) {
      throw new ApiError(404, 'Ride not found');
    }

    if (ride.driverId !== driverId) {
      throw new ApiError(403, 'Not authorized to update this ride');
    }

    ride.status = status;
    this.rides.set(rideId, ride);

    if (status === 'completed') {
      const driver = this.drivers.get(driverId);
      if (driver) {
        driver.totalRides += 1;
        driver.status = 'available';
        this.drivers.set(driverId, driver);
      }
    }

    return ride;
  }

  async incrementDriverRides(id: string): Promise<void> {
    const driver = this.drivers.get(id);
    if (driver) {
      driver.totalRides += 1;
      this.drivers.set(id, driver);
    }
  }
}