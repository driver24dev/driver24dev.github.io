import { Vehicle } from './types';

export const calculateEstimatedPrice = (vehicle: Vehicle): number => {
  const estimatedMiles = 20; // Default estimated miles
  return vehicle.basePrice + (vehicle.pricePerMile * estimatedMiles);
};