import React from 'react';
import { Instagram, Linkedin, Twitter, Facebook, Send, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-200">
      {/* Top Section with Logo, Newsletter and Contact */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* Placeholder for Logo */}
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Starliner</span>
            </div>
            <p className="text-slate-400">
              Experience the future of travel with Starliner. Book your journey to the stars today and explore beyond boundaries.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-slate-400">123 Cosmos Avenue, Stellar City</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blue-400" />
                <span className="text-slate-400">+1 (888) STAR-LINE</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-blue-400" />
                <span className="text-slate-400">Mon-Fri: 9AM - 8PM ET</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium text-white mb-2">Download Our App</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs border-slate-700 hover:bg-slate-800 text-slate-300">
                  App Store
                </Button>
                <Button variant="outline" size="sm" className="text-xs border-slate-700 hover:bg-slate-800 text-slate-300">
                  Google Play
                </Button>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Stay Updated</h3>
            <p className="text-slate-400 mb-4">
              Subscribe to our newsletter for exclusive deals and cosmic travel updates.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-blue-500"
              />
              <Button size="icon" className="bg-blue-500 hover:bg-blue-600">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-bold text-white mb-3">Destinations</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Mars Tours</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Lunar Getaways</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Orbital Stays</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Space Stations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Flight Bookings</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Space Hotels</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Training Programs</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Equipment Rental</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">About</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Safety Measures</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Help</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Support Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© {currentYear} Starliner. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;