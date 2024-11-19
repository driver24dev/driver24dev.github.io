import { Booking } from '../types/booking';

export class BookingService {
  private bookings: Map<string, Booking>;

  constructor() {
    this.bookings = new Map();
  }

  async createBooking(bookingData: Booking): Promise<Booking> {
    const id = Math.random().toString(36).substr(2, 9);
    const booking = { ...bookingData, id };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async updateBooking(id: string, bookingData: Partial<Booking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;

    const updatedBooking = { ...booking, ...bookingData };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async deleteBooking(id: string): Promise<boolean> {
    return this.bookings.delete(id);
  }
}