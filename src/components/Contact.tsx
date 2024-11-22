import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Contact Us</h2>
          <p className="text-xl text-gray-900 max-w-2xl mx-auto">
            Get in touch with our team for personalized service and support
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-black p-3 rounded-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Phone</h3>
                <p className="text-gray-900">24/7 Booking: (310) 555-0123</p>
                <p className="text-gray-900">Support: (310) 555-0124</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black p-3 rounded-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Email</h3>
                <p className="text-gray-900">Bookings: bookings@laelitechauffeur.com</p>
                <p className="text-gray-900">Support: support@laelitechauffeur.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Location</h3>
                <p className="text-gray-900">Beverly Hills Office</p>
                <p className="text-gray-900">9876 Wilshire Boulevard</p>
                <p className="text-gray-900">Beverly Hills, CA 90210</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-black p-3 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Hours</h3>
                <p className="text-gray-900">24/7 Service Available</p>
                <p className="text-gray-900">Office: Mon-Fri 9AM-6PM PST</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Send us a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;