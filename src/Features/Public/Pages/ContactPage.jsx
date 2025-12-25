import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { fadeIn, staggerContainer, staggerItem, scrollFadeIn } from '../../../utils/animations';
import ScrollReveal from '../../../components/ScrollReveal';



function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            content: 'support@luxestay.com',
            subtext: 'We reply within 24 hours'
        },
        {
            icon: Phone,
            title: 'Call Us',
            content: '+1 (800) 555-0199',
            subtext: 'Available 24/7'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            content: '123 Luxury Avenue, New York, NY 10001',
            subtext: 'Monday - Friday, 9AM - 6PM'
        },
        {
            icon: Clock,
            title: 'Business Hours',
            content: 'Mon - Fri: 9AM - 6PM',
            subtext: 'Weekend: 10AM - 4PM'
        }
    ];

    return (
        <motion.div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 py-20 px-4" {...fadeIn}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 dark:text-white">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {contactInfo.map((info, index) => {
                        const Icon = info.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center dark:bg-gray-800"
                                whileHover={{ y: -4 }}
                            >
                                <div className="bg-linear-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 dark:text-white">{info.title}</h3>
                                <p className="text-gray-800 font-medium mb-1 dark:text-gray-300">{info.content}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{info.subtext}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Main Content - Form and Info */}
                <ScrollReveal variants={scrollFadeIn}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl dark:bg-gray-800">
                            <div className="flex items-center mb-6">
                                <MessageCircle className="w-8 h-8 text-blue-600 mr-3" />
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Send Us a Message</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
                                        Message *
                                    </label>
                                    <textarea
                                        rows="5"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-8">
                            {/* Why Contact Us */}
                            <div className="bg-linear-to-br from-blue-50 to-purple-50 p-8 rounded-2xl dark:from-gray-800 dark:to-gray-900">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">Why Contact Us?</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <div className="bg-blue-500 rounded-full w-2 h-2 mt-2 mr-3 shrink-0"></div>
                                        <span className="text-gray-700 dark:text-gray-300">Get personalized hotel recommendations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-blue-500 rounded-full w-2 h-2 mt-2 mr-3 shrink-0"></div>
                                        <span className="text-gray-700 dark:text-gray-300">Assistance with booking modifications</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-blue-500 rounded-full w-2 h-2 mt-2 mr-3 shrink-0"></div>
                                        <span className="text-gray-700 dark:text-gray-300">Special requests and group bookings</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-blue-500 rounded-full w-2 h-2 mt-2 mr-3 shrink-0"></div>
                                        <span className="text-gray-700 dark:text-gray-300">Technical support and account help</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-blue-500 rounded-full w-2 h-2 mt-2 mr-3 shrink-0"></div>
                                        <span className="text-gray-700 dark:text-gray-300">Partnership and collaboration inquiries</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Quick Response */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-100 dark:bg-gray-800 dark:border-gray-700">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">Quick Response Guarantee</h3>
                                <p className="text-gray-700 mb-4 dark:text-gray-300">
                                    We pride ourselves on exceptional customer service. Our dedicated support team is available 24/7 to assist you with any questions or concerns.
                                </p>
                                <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl">
                                    <p className="font-bold text-lg mb-1">Average Response Time</p>
                                    <p className="text-3xl font-bold">Under 2 Hours</p>
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div className="bg-linear-to-r from-red-500 to-orange-500 text-white p-8 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold mb-3">Emergency Support</h3>
                                <p className="mb-4 opacity-95">
                                    For urgent booking issues or emergencies during your stay:
                                </p>
                                <a
                                    href="tel:+18005550199"
                                    className="inline-block bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                                >
                                    Call +1 (800) 555-0199
                                </a>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* FAQ Link */}
                <div className="mt-16 text-center bg-white p-8 rounded-2xl shadow-lg dark:bg-gray-800">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 dark:text-white">
                        Looking for Quick Answers?
                    </h3>
                    <p className="text-gray-600 mb-6 dark:text-gray-300">
                        Check out our FAQ section for instant answers to common questions
                    </p>
                    <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                        Visit FAQ
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default ContactPage;