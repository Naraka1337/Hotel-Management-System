import React from 'react'
import { Mail, Phone } from 'lucide-react';


function ContactPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto ">
        <h1 className="text-4xl font-bold text-blue-700   ">Get in Touch</h1>
        
        <div className="display-flex    gap-8 mb-4 items-center" >
            <div className="space-y-4 mt-6" >
                <h2 className="text-2xl font-semibold text-gray-800">Contact Details</h2>
                <div className="flex items-center space-x-3 text-gray-700">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span>support@luxestay.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span>+1 (800) 555-0199</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">We are available 24/7 to assist with bookings, modifications, and urgent support.</p>
            </div>

            <form className="space-y-4 bg-gray-50 p-6 rounded-lg  mt-4">
                <h3 className="text-xl font-semibold text-gray-800">Send Us a Message</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input type="text" className="w-full p-3 border rounded-lg" placeholder="John Doe" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full p-3 border rounded-lg" placeholder="your.email@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows="4" className="w-full p-3 border rounded-lg" placeholder="How can we help?"></textarea>
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Submit Inquiry
                </button>
            </form>
        </div>
    </div>
  )
}

export default ContactPage