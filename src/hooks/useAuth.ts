import { useState, useCallback } from 'react';
import { UserRole } from '@/types/user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAdmin?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
  isAdmin?: boolean;
  role?: UserRole;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
      token,
      user: user ? JSON.parse(user) : null
    };
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    // For demo purposes, handle admin and driver login separately
    if (credentials.isAdmin) {
      const adminUser = {
        id: 'admin-1',
        name: 'Admin',
        email: credentials.email,
        role: 'admin' as UserRole,
        isAdmin: true
      };
      const adminToken = 'admin-token';
      
      localStorage.setItem('token', adminToken);
      localStorage.setItem('user', JSON.stringify(adminUser));
      setAuth({ token: adminToken, user: adminUser });
      window.location.reload();
      return;
    }

    // Handle driver login
    if (credentials.role === 'driver') {
      const driverUser = {
        id: 'driver-1',
        name: 'John Smith',
        email: credentials.email,
        role: 'driver' as UserRole
      };
      const driverToken = 'driver-token';
      
      localStorage.setItem('token', driverToken);
      localStorage.setItem('user', JSON.stringify(driverUser));
      setAuth({ token: driverToken, user: driverUser });
      window.location.reload();
      return;
    }

    // Handle client login
    if (credentials.email === 'client@laelitechauffeur.com' && credentials.password === 'client123') {
      const clientUser = {
        id: 'client-1',
        name: 'James Wilson',
        email: credentials.email,
        role: 'client' as UserRole
      };
      const clientToken = 'client-token';
      
      localStorage.setItem('token', clientToken);
      localStorage.setItem('user', JSON.stringify(clientUser));
      setAuth({ token: clientToken, user: clientUser });
      window.location.reload();
      return;
    }

    throw new Error('Invalid credentials');
  }, []);

  const signup = useCallback(async (userData: SignupData) => {
    try {
      const user = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        name: userData.name,
        email: userData.email,
        role: userData.role
      };
      window.location.reload();
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
    window.location.reload();
  }, []);

  const hasRole = useCallback((roles: UserRole | UserRole[]) => {
    if (!auth.user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(auth.user.role);
  }, [auth.user]);

  const isAdmin = useCallback(() => {
    return auth.user?.isAdmin === true;
  }, [auth.user]);

  return {
    user: auth.user,
    token: auth.token,
    login,
    signup,
    logout,
    hasRole,
    isAdmin,
    isAuthenticated: !!auth.token
  };
}