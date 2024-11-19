import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const LoginForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Admin credentials
      if (formData.email === 'admin@laelitechauffeur.com' && formData.password === 'admin123') {
        await login({
          email: formData.email,
          password: formData.password,
          isAdmin: true
        });
        toast.success('Welcome, Admin!');
        onClose();
        const adminSection = document.getElementById('admin');
        if (adminSection) {
          adminSection.scrollIntoView({ behavior: 'smooth' });
        }
      } 
      // Driver credentials
      else if (formData.email === 'john.smith@laelitechauffeur.com' && formData.password === 'driver123') {
        await login({
          email: formData.email,
          password: formData.password,
          role: 'driver'
        });
        toast.success('Welcome, John Smith!');
        onClose();
        const driverSection = document.getElementById('driver-portal');
        if (driverSection) {
          driverSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // Client credentials
      else if (formData.email === 'client@laelitechauffeur.com' && formData.password === 'client123') {
        await login({
          email: formData.email,
          password: formData.password
        });
        toast.success('Welcome, James Wilson!');
        onClose();
      }
      else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
      <div className="text-xs text-gray-500 mt-2 space-y-1">
        <div>Admin demo: admin@laelitechauffeur.com / admin123</div>
        <div>Driver demo: john.smith@laelitechauffeur.com / driver123</div>
        <div>Client demo: client@laelitechauffeur.com / client123</div>
      </div>
    </form>
  );
};

export default LoginForm;