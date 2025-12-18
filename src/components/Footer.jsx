import React, { useState } from 'react';
import { FaFacebook, FaPinterest, FaInstagram, FaYoutube, FaChevronDown, FaArrowRight, FaCheck } from 'react-icons/fa';

export default function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const toggleQuickLinks = () => {
    setIsQuickLinksOpen(!isQuickLinksOpen);
  };

  return (
    <footer className="bg-black text-white py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="mb-8 sm:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Left Side - Quick Links */}
            <div>
              <button 
                onClick={toggleQuickLinks}
                className="flex items-center gap-2 mb-4 sm:mb-6 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <h4 className="text-base sm:text-lg font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Quick links</h4>
                <FaChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </button>
              {isQuickLinksOpen && (
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2">
                    <a href="#" className="text-xs sm:text-sm text-white hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>FAQ's</a>
                    <a href="#" className="text-xs sm:text-sm text-white hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Contact us</a>
                    <a href="#" className="text-xs sm:text-sm text-white hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Jewellery Care tips</a>
                    <a href="#" className="text-xs sm:text-sm text-white hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Shipping</a>
                    <a href="#" className="text-xs sm:text-sm text-white hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Terms of Service</a>
                    <a href="#" className="text-xs sm:text-sm text-white hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Exchange and return policy</a>
                  </div>
                  <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2">
                    <a href="#" className="text-xs sm:text-sm text-white hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Corporate and custom order</a>
                    <a href="#" className="text-xs sm:text-sm text-white hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Privacy Policy</a>
                    <a href="#" className="text-xs sm:text-sm text-white hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Our Story</a>
                    <a href="#" className="text-xs sm:text-sm text-white hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Size Guide</a>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Newsletter and Social Media */}
            <div>
              <div className="mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Never miss out the new drops, subscribe now!
                </h4>
                <form onSubmit={handleSubmit} className="mb-3">
                  <div className="flex border-[0.5px] border-white/50 rounded overflow-hidden">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-transparent text-xs sm:text-sm text-white placeholder-white focus:outline-none"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    <button
                      type="submit"
                      className="px-3 sm:px-4 py-2 sm:py-3 border-l border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    >
                      <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white hover:text-black" />
                    </button>
                  </div>
                </form>
                {isSubscribed && (
                  <div className="flex items-center gap-2 text-white text-xs sm:text-sm mb-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <FaCheck className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                    </div>
                    <span style={{ fontFamily: "'Poppins', sans-serif" }}>Thanks for subscribing</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3 sm:gap-4">
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black  flex items-center justify-center text-white hover:bg-gray-900 transition-colors">
                  <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black  flex items-center justify-center text-white hover:bg-gray-900 transition-colors">
                  <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black  flex items-center justify-center text-white hover:bg-gray-900 transition-colors">
                  <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black  flex items-center justify-center text-white hover:bg-gray-900 transition-colors">
                  <FaPinterest className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mb-6 sm:mb-8"></div>

        {/* Copyright and Policy Links */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm text-white">
          <span style={{ fontFamily: "'Poppins', sans-serif" }}>© 2025, Silverlab</span>
          <span className="hidden sm:inline text-gray-500">•</span>
          <a href="#" className="hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Refund policy</a>
          <span className="text-gray-500">•</span>
          <a href="#" className="hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Privacy policy</a>
          <span className="text-gray-500">•</span>
          <a href="#" className="hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Terms of service</a>
          <span className="text-gray-500">•</span>
          <a href="#" className="hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Contact information</a>
          <span className="text-gray-500">•</span>
          <a href="#" className="hover:text-gray-300 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>Shipping policy</a>
        </div>
      </div>
    </footer>
  );
}
