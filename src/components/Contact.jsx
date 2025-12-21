import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { AlertModal } from '@/widgets/layout';

const Contact = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const [alertModal, setAlertModal] = useState({ open: false, message: '' });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setAlertModal({ open: true, message: 'Thank you for your message! We will get back to you soon.' });
    setFormData({ name: '', email: '', phone: '', comment: '' });
  };

  return (
    <section className="bg-black min-h-screen py-8 sm:py-12 md:py-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          

          {/* Title */}
          <h1 className="text-2xl sm:text-2xl md:text-2xl font-bold text-white mb-6 sm:mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Contact us
          </h1>

          {/* Introductory Text */}
          <p className="text-white text-sm sm:text-base md:text-[16px] mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Thank you for your interest in connecting with us. Whether you have a question about our products, an order, or just want to say hello, we're here to help.
          </p>

          {/* Email Information */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-[16px] sm:text-[16px] font-semibold text-white mb-3 sm:mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Email:
            </h2>
            <p className="text-white text-sm sm:text-base md:text-[16px] leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Have a question? Drop us an email at <a href="mailto:Support@silverlab.in" className="text-white underline hover:text-gray-300">Support@silverlab.in</a> and we'll get back to you promptly.
            </p>
          </div>

          {/* Closing Remark */}
          <p className="text-white text-sm sm:text-base md:text-[16px] mb-8 sm:mb-12 leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
            We look forward to hearing from you and assisting with any inquiries you may have.
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name Field */}
            <div className="flex  gap-2">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border-[0.5px] border-white/50 rounded text-white text-sm sm:text-base focus:outline-none focus:border-gray-400 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                placeholder="Your name"
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border-[0.5px] border-white/50 rounded text-white text-sm sm:text-base focus:outline-none focus:border-gray-400 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                placeholder="Your email"
              />
            </div>

            {/* Email Field */}
            <div>
              
            </div>

            {/* Phone Number Field */}
            <div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border-[0.5px] border-white/50 rounded text-white text-sm sm:text-base focus:outline-none focus:border-gray-400 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                placeholder="Your phone number"
              />
            </div>

            {/* Comment Field */}
            <div>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 bg-transparent border-[0.5px] border-white/50 rounded text-white text-sm sm:text-base focus:outline-none focus:border-gray-400 transition-colors resize-none"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                placeholder="Your message"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 sm:px-12 py-3 border-[0.5px] border-white/50 rounded sm:py-4 bg-white text-black  font-semibold text-sm sm:text-base hover:bg-gray-200 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <AlertModal
        open={alertModal.open}
        onClose={() => setAlertModal({ open: false, message: '' })}
        title="Thank You"
        message={alertModal.message}
        buttonText="OK"
      />
    </section>
  );
};

export default Contact;

