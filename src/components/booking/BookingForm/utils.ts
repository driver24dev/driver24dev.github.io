import { LocationSuggestion } from './types';

export const dummyLocations: Record<string, LocationSuggestion> = {
  'LAX': { name: 'Los Angeles International Airport', lat: 33.9416, lng: -118.4085 },
  'Beverly Hills': { name: 'Beverly Hills', lat: 34.0736, lng: -118.4004 },
  'Santa Monica': { name: 'Santa Monica', lat: 34.0195, lng: -118.4912 },
  'Hollywood': { name: 'Hollywood', lat: 34.0928, lng: -118.3287 },
  'Downtown LA': { name: 'Downtown Los Angeles', lat: 34.0407, lng: -118.2468 }
};

export const findLocationMatch = (input: string): LocationSuggestion | null => {
  const match = Object.entries(dummyLocations).find(([key]) => 
    input.toLowerCase().includes(key.toLowerCase())
  );
  
  return match ? match[1] : null;
};