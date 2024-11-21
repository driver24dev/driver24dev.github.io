import React from 'react';
import { Car, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Car className="h-6 w-6" />
              <span className="text-xl font-bold">LA Elite</span>
            </div>
            <p className="text-gray-400 mb-6">
              Providing luxury transportation services in Los Angeles and surrounding areas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Services</a></li>
              <li><a href="#fleet" className="text-gray-400 hover:text-white transition">Fleet</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition">Testimonials</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Airport Transfers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Corporate Travel</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Special Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">City Tours</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Hourly Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">(310) 555-0123</li>
              <li className="text-gray-400">bookings@laelite.com</li>
              <li className="text-gray-400">9876 Wilshire Boulevard</li>
              <li className="text-gray-400">Beverly Hills, CA 90210</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} LA Elite. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;