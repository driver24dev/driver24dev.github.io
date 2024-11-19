export type UserRole = 'client' | 'driver' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}