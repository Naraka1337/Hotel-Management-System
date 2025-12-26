import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Shield, Clock, Users, Heart, Globe, TrendingUp, CheckCircle } from 'lucide-react';
import aboutHero from '../../../assets/about_hero.png';
import missionImage from '../../../assets/mission_vision.png';
import { fadeIn, slideUp, staggerContainer, staggerItem, scrollFadeIn, scrollFadeLeft, scrollFadeRight } from '../../../utils/animations';
import ScrollReveal from '../../../components/ScrollReveal';

const AboutPage = () => {
    const values = [
        {
            icon: Award,
            title: 'Excellence',
            description: 'We strive for perfection in every aspect of our service'
        },
        {
            icon: Heart,
            title: 'Passion',
            description: 'We love what we do and it shows in our dedication'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Building lasting relationships with our guests and partners'
        },
        {
            icon: Shield,
            title: 'Trust',
            description: 'Your security and satisfaction are our top priorities'
        }
    ];

    const features = [
        'Curated Selection of Premium Hotels',
        'Best Price Guarantee',
        'Seamless Booking Experience',
        '24/7 Dedicated Support',
        'Secure Payment Processing',
        'Flexible Cancellation Policies'
    ];

    return (
        <motion.div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300" {...fadeIn}>
            {/* Hero Section */}
            <section className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={aboutHero}
                        alt="About Luxe Stay"
                        className="w-full h-full object-cover brightness-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-blue-900/80 via-purple-900/70 to-blue-900/80"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            About Luxe Stay
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95">
                            Redefining luxury travel experiences, one stay at a time
                        </p>
                    </div>
                </div>

                {/* Decorative Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Mission Section */}
            <ScrollReveal variants={scrollFadeIn}>
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1">
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 dark:text-white">
                                    Our Mission
                                </h2>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed dark:text-gray-300">
                                    Luxe Stay was founded with a singular vision: to simplify luxury travel booking. We believe that securing your perfect accommodation should be as relaxing as the vacation itself.
                                </p>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed dark:text-gray-300">
                                    By partnering directly with the world's most exclusive hotels and resorts, we offer unparalleled access and the best available rates. Our platform is designed to cater to travelers, hotel managers, and administrators—ensuring a smooth, efficient experience for everyone involved.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                                        <TrendingUp className="inline-block w-5 h-5 mr-2" />
                                        10,000+ Happy Guests
                                    </div>
                                    <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                                        <Globe className="inline-block w-5 h-5 mr-2" />
                                        500+ Hotels
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <img
                                    src={missionImage}
                                    alt="Our Mission"
                                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Why Choose Us Section */}
            <ScrollReveal variants={scrollFadeIn}>
                <section className="py-20 bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 dark:text-white">
                                Why Choose Luxe Stay?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
                                Experience the difference with our premium service and commitment to excellence
                            </p>
                        </div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={staggerItem}
                                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 dark:bg-gray-800"
                                    whileHover={{ y: -4 }}
                                >
                                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                                    <span className="text-gray-800 font-medium dark:text-gray-200">{feature}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Our Values Section */}
            <ScrollReveal variants={scrollFadeIn}>
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 dark:text-white">
                                Our Core Values
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                The principles that guide everything we do
                            </p>
                        </div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={staggerItem}
                                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center dark:bg-gray-800"
                                        whileHover={{ y: -8 }}
                                    >
                                        <div className="bg-linear-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 dark:text-white">{value.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Quote Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <p className="text-3xl md:text-4xl font-bold text-white mb-6 italic">
                        "Travel is the only thing you buy that makes you richer."
                    </p>
                    <p className="text-xl text-white/90">- Anonymous</p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 dark:text-white">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 dark:text-gray-300">
                        Join thousands of satisfied travelers who trust Luxe Stay for their perfect accommodations
                    </p>
                    <Link to="/HotelsPage">
                        <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                            Explore Hotels
                        </button>
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};

export default AboutPage;