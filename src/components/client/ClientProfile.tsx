import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { User, Mail, Phone, Save, Car } from 'lucide-react';

const ClientProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(310) 555-0123',
    preferences: {
      vehicleType: 'Mercedes-Benz S-Class',
      notifications: true
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            {isEditing ? (
              <input
                type="text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            ) : (
              <span className="text-gray-600">{formData.name}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-2" />
            {isEditing ? (
              <input
                type="email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            ) : (
              <span className="text-gray-600">{formData.email}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-2" />
            {isEditing ? (
              <input
                type="tel"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            ) : (
              <span className="text-gray-600">{formData.phone}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Vehicle
          </label>
          <div className="flex items-center">
            <Car className="h-5 w-5 text-gray-400 mr-2" />
            {isEditing ? (
              <select
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.preferences.vehicleType}
                onChange={(e) => setFormData({
                  ...formData,
                  preferences: {
                    ...formData.preferences,
                    vehicleType: e.target.value
                  }
                })}
              >
                <option value="Mercedes-Benz S-Class">Mercedes-Benz S-Class</option>
                <option value="Cadillac Escalade">Cadillac Escalade</option>
                <option value="Mercedes-Benz Sprinter">Mercedes-Benz Sprinter</option>
              </select>
            ) : (
              <span className="text-gray-600">{formData.preferences.vehicleType}</span>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="notifications"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.preferences.notifications}
              onChange={(e) => setFormData({
                ...formData,
                preferences: {
                  ...formData.preferences,
                  notifications: e.target.checked
                }
              })}
            />
            <label htmlFor="notifications" className="ml-2 text-sm text-gray-600">
              Receive email notifications for bookings
            </label>
          </div>
        )}

        {isEditing && (
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default ClientProfile;