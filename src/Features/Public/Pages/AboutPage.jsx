import React from 'react'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-blue-700 border-b pb-4">About Luxe Stay</h1>
        <section className="space-y-4 text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
            <p>Luxe Stay was founded with a singular vision: to simplify luxury travel booking. We believe that securing your perfect accommodation should be as relaxing as the vacation itself. By partnering directly with the world's most exclusive hotels and resorts, we offer unparalleled access and the best available rates.</p>
            <p>Our platform is designed to cater to three distinct user groups—the public traveler, the hotel manager, and the system administrator—ensuring a smooth, efficient experience for everyone involved.</p>
        </section>
        
        <section className="space-y-4 text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>**Curated Selection:** Every hotel on our platform is hand-picked for quality, service, and location.</li>
                <li>**Seamless Experience:** Our intuitive interface makes searching, comparing, and booking a matter of minutes.</li>
                <li>**Dedicated Support:** Our 24/7 customer service team is ready to assist with any request or itinerary change.</li>
            </ul>
        </section>
        
        <div className="pt-6 border-t">
            <p className="text-sm text-gray-500 italic">"Travel is the only thing you buy that makes you richer." - Anonymous</p>
        </div>
    </div>
  )
}

export default AboutPage