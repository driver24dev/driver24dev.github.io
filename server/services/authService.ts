import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../types/user';
import { ApiError } from '../utils/apiError';

export class AuthService {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async signup(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const existingUser = Array.from(this.users.values()).find(
      user => user.email === userData.email
    );

    if (existingUser) {
      throw new ApiError(400, 'Email already in use');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const id = Math.random().toString(36).substr(2, 9);
    
    const newUser: User = {
      id,
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      role: userData.role || 'client',
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.set(id, newUser);
    return newUser;
  }

  async login(credentials: { email: string; password: string }) {
    const user = Array.from(this.users.values()).find(
      user => user.email === credentials.email
    );

    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = this.generateToken(user.id);
    return { token, user };
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    const user = this.users.get(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    user.role = role;
    user.updatedAt = new Date();
    this.users.set(userId, user);
    return user;
  }

  private generateToken(userId: string): string {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET || 'your-secret-key',
      {
        expiresIn: '1d'
      }
    );
  }
}