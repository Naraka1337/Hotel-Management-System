import React, { useState } from 'react';
import { Plus, Edit, Trash2, DollarSign, Calendar, Tag, Receipt, Save, X } from 'lucide-react';

const RevenueSettingsPage = () => {
    const [activeTab, setActiveTab] = useState('pricing');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [modalType, setModalType] = useState('');

    // Pricing Rules State
    const [pricingRules, setPricingRules] = useState([
        { id: '1', roomType: 'Single Room', basePrice: 99, weekendPrice: 119, description: 'Standard single occupancy' },
        { id: '2', roomType: 'Double Room', basePrice: 149, weekendPrice: 179, description: 'Double occupancy with queen bed' },
        { id: '3', roomType: 'Suite', basePrice: 299, weekendPrice: 349, description: 'Luxury suite with amenities' },
    ]);

    // Seasonal Pricing State
    const [seasonalPricing, setSeasonalPricing] = useState([
        { id: '1', name: 'Summer Peak', startDate: '2024-06-01', endDate: '2024-08-31', multiplier: 1.3, description: 'Peak summer season' },
        { id: '2', name: 'Winter Holiday', startDate: '2024-12-15', endDate: '2025-01-05', multiplier: 1.5, description: 'Holiday season premium' },
        { id: '3', name: 'Off Season', startDate: '2024-02-01', endDate: '2024-04-30', multiplier: 0.8, description: 'Off-peak discount' },
    ]);

    // Discounts State
    const [discounts, setDiscounts] = useState([
        { id: '1', name: 'Early Bird', type: 'percentage', value: 15, minDays: 30, description: 'Book 30+ days in advance' },
        { id: '2', name: 'Extended Stay', type: 'percentage', value: 20, minNights: 7, description: '7+ nights discount' },
        { id: '3', name: 'Weekend Special', type: 'fixed', value: 50, applicableDays: 'Fri-Sun', description: 'Weekend flat discount' },
    ]);

    // Tax & Fees State
    const [taxesAndFees, setTaxesAndFees] = useState([
        { id: '1', name: 'Sales Tax', type: 'percentage', value: 8.5, mandatory: true, description: 'State sales tax' },
        { id: '2', name: 'Tourism Fee', type: 'fixed', value: 5, mandatory: true, description: 'Per night tourism fee' },
        { id: '3', name: 'Service Charge', type: 'percentage', value: 10, mandatory: false, description: 'Optional service charge' },
    ]);

    const tabs = [
        { id: 'pricing', name: 'Pricing Rules', icon: DollarSign },
        { id: 'seasonal', name: 'Seasonal Pricing', icon: Calendar },
        { id: 'discounts', name: 'Discounts', icon: Tag },
        { id: 'taxes', name: 'Tax & Fees', icon: Receipt },
    ];

    const handleOpenModal = (type, item = null) => {
        setModalType(type);
        setIsEditMode(!!item);
        setCurrentItem(item || getInitialFormData(type));
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setCurrentItem(null);
        setModalType('');
    };

    const getInitialFormData = (type) => {
        switch (type) {
            case 'pricing':
                return { id: '', roomType: '', basePrice: '', weekendPrice: '', description: '' };
            case 'seasonal':
                return { id: '', name: '', startDate: '', endDate: '', multiplier: '', description: '' };
            case 'discounts':
                return { id: '', name: '', type: 'percentage', value: '', minDays: '', minNights: '', applicableDays: '', description: '' };
            case 'taxes':
                return { id: '', name: '', type: 'percentage', value: '', mandatory: true, description: '' };
            default:
                return {};
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentItem(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            ...currentItem,
            id: isEditMode ? currentItem.id : Date.now().toString()
        };

        switch (modalType) {
            case 'pricing':
                setPricingRules(prev =>
                    isEditMode ? prev.map(item => item.id === newItem.id ? newItem : item) : [...prev, newItem]
                );
                break;
            case 'seasonal':
                setSeasonalPricing(prev =>
                    isEditMode ? prev.map(item => item.id === newItem.id ? newItem : item) : [...prev, newItem]
                );
                break;
            case 'discounts':
                setDiscounts(prev =>
                    isEditMode ? prev.map(item => item.id === newItem.id ? newItem : item) : [...prev, newItem]
                );
                break;
            case 'taxes':
                setTaxesAndFees(prev =>
                    isEditMode ? prev.map(item => item.id === newItem.id ? newItem : item) : [...prev, newItem]
                );
                break;
        }
        handleCloseModal();
    };

    const handleDelete = (type, id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        switch (type) {
            case 'pricing':
                setPricingRules(prev => prev.filter(item => item.id !== id));
                break;
            case 'seasonal':
                setSeasonalPricing(prev => prev.filter(item => item.id !== id));
                break;
            case 'discounts':
                setDiscounts(prev => prev.filter(item => item.id !== id));
                break;
            case 'taxes':
                setTaxesAndFees(prev => prev.filter(item => item.id !== id));
                break;
        }
    };

    const renderPricingRules = () => (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Base Pricing Rules</h2>
                <button
                    onClick={() => handleOpenModal('pricing')}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Pricing Rule
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weekend Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pricingRules.map((rule) => (
                            <tr key={rule.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{rule.roomType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">${rule.basePrice}/night</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">${rule.weekendPrice}/night</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{rule.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleOpenModal('pricing', rule)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete('pricing', rule.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderSeasonalPricing = () => (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Seasonal Pricing</h2>
                <button
                    onClick={() => handleOpenModal('seasonal')}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Seasonal Rate
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Multiplier</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {seasonalPricing.map((season) => (
                            <tr key={season.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{season.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{season.startDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{season.endDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${season.multiplier > 1 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {season.multiplier}x
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{season.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleOpenModal('seasonal', season)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete('seasonal', season.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderDiscounts = () => (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Discounts & Promotions</h2>
                <button
                    onClick={() => handleOpenModal('discounts')}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Discount
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conditions</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {discounts.map((discount) => (
                            <tr key={discount.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{discount.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                                        {discount.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                    {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {discount.minDays && `${discount.minDays}+ days advance`}
                                    {discount.minNights && `${discount.minNights}+ nights`}
                                    {discount.applicableDays && discount.applicableDays}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{discount.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleOpenModal('discounts', discount)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete('discounts', discount.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderTaxesAndFees = () => (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Tax & Fees Configuration</h2>
                <button
                    onClick={() => handleOpenModal('taxes')}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Tax/Fee
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mandatory</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {taxesAndFees.map((tax) => (
                            <tr key={tax.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{tax.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                        {tax.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                    {tax.type === 'percentage' ? `${tax.value}%` : `$${tax.value}`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${tax.mandatory ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {tax.mandatory ? 'Yes' : 'No'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{tax.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleOpenModal('taxes', tax)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete('taxes', tax.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderModalForm = () => {
        if (!currentItem) return null;

        return (
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    {modalType === 'pricing' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Room Type *</label>
                                <input
                                    type="text"
                                    name="roomType"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={currentItem.roomType}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Price ($) *</label>
                                    <input
                                        type="number"
                                        name="basePrice"
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={currentItem.basePrice}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Weekend Price ($) *</label>
                                    <input
                                        type="number"
                                        name="weekendPrice"
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={currentItem.weekendPrice}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={currentItem.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}

                    {modalType === 'seasonal' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Season Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={currentItem.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={currentItem.startDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={currentItem.endDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price Multiplier *</label>
                                <input
                                    type="number"
                                    name="multiplier"
                                    required
                                    min="0.1"
                                    max="5"
                                    step="0.1"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={currentItem.multiplier}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 1.3 for 30% increase, 0.8 for 20% decrease"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={currentItem.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}

                    {modalType === 'discounts' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={currentItem.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                                    <select
                                        name="type"
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={currentItem.type}
                                        onChange={handleInputChange}
                                    >
                                        <option value="percentage">Percentage</option>
                                        <option value="fixed">Fixed Amount</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Value * {currentItem.type === 'percentage' ? '(%)' : '($)'}
                                    </label>
                                    <input
                                        type="number"
                                        name="value"
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={currentItem.value}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Days Advance</label>
                                    <input
                                        type="number"
                                        name="minDays"
                                        min="0"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={currentItem.minDays}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Nights Stay</label>
                                    <input
                                        type="number"
                                        name="minNights"
                                        min="0"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={currentItem.minNights}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Days</label>
                                <input
                                    type="text"
                                    name="applicableDays"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={currentItem.applicableDays}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Mon-Fri, Weekends"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={currentItem.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}

                    {modalType === 'taxes' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tax/Fee Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={currentItem.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                                    <select
                                        name="type"
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={currentItem.type}
                                        onChange={handleInputChange}
                                    >
                                        <option value="percentage">Percentage</option>
                                        <option value="fixed">Fixed Amount</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Value * {currentItem.type === 'percentage' ? '(%)' : '($)'}
                                    </label>
                                    <input
                                        type="number"
                                        name="value"
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={currentItem.value}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="mandatory"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={currentItem.mandatory}
                                        onChange={handleInputChange}
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Mandatory</span>
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={currentItem.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {isEditMode ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Revenue Settings</h1>
                <p className="text-gray-600">Configure pricing rules, seasonal rates, discounts, and taxes for your hotel.</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-2" />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'pricing' && renderPricingRules()}
                {activeTab === 'seasonal' && renderSeasonalPricing()}
                {activeTab === 'discounts' && renderDiscounts()}
                {activeTab === 'taxes' && renderTaxesAndFees()}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {isEditMode ? 'Edit' : 'Add'} {
                                        modalType === 'pricing' ? 'Pricing Rule' :
                                            modalType === 'seasonal' ? 'Seasonal Rate' :
                                                modalType === 'discounts' ? 'Discount' :
                                                    'Tax/Fee'
                                    }
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <span className="text-2xl">&times;</span>
                                </button>
                            </div>
                            {renderModalForm()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RevenueSettingsPage;
