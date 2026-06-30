import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shadow-[0_2px_8px_rgba(37,99,235,0.3)]">H</div>
              <span className="font-bold text-xl tracking-tight text-gray-900">Home<span className="text-primary">Fix</span></span>
            </Link>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              India's trusted home services booking platform. We connect homeowners with verified local professionals.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-200">
                <span className="font-semibold text-xs">fb</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-200">
                <span className="font-semibold text-xs">tw</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-200">
                <span className="font-semibold text-xs">ig</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-200">
                <span className="font-semibold text-xs">yt</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-3.5 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/join-as-pro" className="hover:text-primary transition-colors">Join as a Professional</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Services</h4>
            <ul className="space-y-3.5 text-sm text-gray-500">
              <li><Link to="/services" className="hover:text-primary transition-colors">Electrician</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Plumber</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">AC Repair</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">View All Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={16} className="text-primary" />
                </div>
                <span>NPT 42 Patti Near Shiv Mandir, Bansgaon, Gorakhpur - 273403</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-primary" />
                </div>
                <span>7084702208</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                <span>ramanhomefix@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} HomeFix. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
