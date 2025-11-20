import React from 'react'

const GlobalSettingsForm = () => {
  
    const [settings, setSettings] = useState({
        commissionRate: 15,
        defaultCurrency: 'USD',
        emailEnabled: true,
        supportEmail: 'support@system.com'
    });
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saving Global Settings:', settings);
        // In a real app, this would be a Firebase call to update a config document
        alert('Settings Saved Successfully!'); 
        // NOTE: Using a simple JS alert for demonstration since custom modals are complex
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-800">Global System Settings</h1>
            <p className="text-gray-600">Configure core system parameters and behaviors.</p>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl space-y-6 max-w-lg border border-gray-100">
                {/* Commission Rate */}
                <div>
                    <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                    <input
                        type="number"
                        id="commissionRate"
                        name="commissionRate"
                        value={settings.commissionRate}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        required
                    />
                </div>

                {/* Default Currency */}
                <div>
                    <label htmlFor="defaultCurrency" className="block text-sm font-medium text-gray-700">Default Currency</label>
                    <select
                        id="defaultCurrency"
                        name="defaultCurrency"
                        value={settings.defaultCurrency}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border bg-white"
                        required
                    >
                        <option value="USD">USD (US Dollar)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="GBP">GBP (British Pound)</option>
                    </select>
                </div>

                {/* Support Email */}
                <div>
                    <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700">Support Email</label>
                    <input
                        type="email"
                        id="supportEmail"
                        name="supportEmail"
                        value={settings.supportEmail}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        required
                    />
                </div>

                {/* Email Notifications Toggle */}
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="emailEnabled"
                            name="emailEnabled"
                            type="checkbox"
                            checked={settings.emailEnabled}
                            onChange={handleChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="emailEnabled" className="font-medium text-gray-700">Enable System Emails</label>
                        <p className="text-gray-500">Automatically send booking confirmations and alerts.</p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-5">
                    <button
                        type="submit"
                        className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );d
  
}

export default GlobalSettingsForm