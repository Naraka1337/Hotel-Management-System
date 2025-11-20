// src/Features/Manager/pages/SettingsPage.jsx
import { Settings, User, Lock, Bell, CreditCard, Info } from 'lucide-react';

const SettingsPage = () => {
  const settingsMenu = [
    {
      id: 'profile',
      title: 'Profile',
      description: 'Update your personal information',
      icon: User,
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Change password and security settings',
      icon: Lock,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage your notification preferences',
      icon: Bell,
    },
    {
      id: 'billing',
      title: 'Billing',
      description: 'Manage subscription and payment methods',
      icon: CreditCard,
    },
    {
      id: 'about',
      title: 'About',
      description: 'Version and legal information',
      icon: Info,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsMenu.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mr-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">System Status</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Database</p>
              <p className="text-sm text-gray-500">Connected to MongoDB Atlas</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              Online
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Storage</p>
              <p className="text-sm text-gray-500">15.2 GB of 100 GB used</p>
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: '15.2%' }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">API Version</p>
              <p className="text-sm text-gray-500">v2.4.1</p>
            </div>
            <span className="text-sm text-gray-500">Latest version</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;