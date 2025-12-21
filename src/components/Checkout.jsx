import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCreditCard, FiLock } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    paymentMethod: 'online'
  });

  const [errors, setErrors] = useState({});

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Integrate with payment gateway (Razorpay, Stripe, etc.)
      // For now, simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart after successful order
      clearCart();
      
      // Navigate to success page or show success message
      navigate('/order-success', { 
        state: { 
          orderDetails: {
            ...formData,
            items: cartItems,
            total
          }
        }
      });
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Checkout
          </h1>
          <div className="text-center py-16">
            <p className="text-gray-300 text-lg mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Your cart is empty
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Customer Information
              </h2>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-800 border ${errors.firstName ? 'border-red-500' : 'border-gray-700'} text-white rounded focus:outline-none focus:border-gray-500`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-800 border ${errors.lastName ? 'border-red-500' : 'border-gray-700'} text-white rounded focus:outline-none focus:border-gray-500`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white rounded focus:outline-none focus:border-gray-500`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={`w-full px-4 py-3 bg-gray-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} text-white rounded focus:outline-none focus:border-gray-500`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Shipping Address
              </h2>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-3 bg-gray-800 border ${errors.address ? 'border-red-500' : 'border-gray-700'} text-white rounded focus:outline-none focus:border-gray-500 resize-none`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-800 border ${errors.city ? 'border-red-500' : 'border-gray-700'} text-white rounded focus:outline-none focus:border-gray-500`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-800 border ${errors.state ? 'border-red-500' : 'border-gray-700'} text-white rounded focus:outline-none focus:border-gray-500`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      maxLength="6"
                      className={`w-full px-4 py-3 bg-gray-800 border ${errors.pincode ? 'border-red-500' : 'border-gray-700'} text-white rounded focus:outline-none focus:border-gray-500`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      disabled
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-500 rounded cursor-not-allowed"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Payment Method
              </h2>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 space-y-4">
                <label className="flex items-center gap-3 p-4 border border-gray-700 rounded cursor-pointer hover:border-gray-600 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleChange}
                    className="w-4 h-4 text-black"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FiCreditCard className="w-5 h-5 text-white" />
                      <span className="text-white font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Online Payment (Credit/Debit Card, UPI, Net Banking)
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Secure payment gateway
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-gray-700 rounded cursor-pointer hover:border-gray-600 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="w-4 h-4 text-black"
                  />
                  <div className="flex-1">
                    <span className="text-white font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Cash on Delivery (COD)
                    </span>
                    <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Pay when you receive
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Order Summary
              </h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || '/placeholder-image.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {item.name}
                      </p>
                      <p className="text-gray-400 text-xs" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Qty: {item.quantity}
                      </p>
                      <p className="text-white text-sm font-semibold mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Rs. {(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span style={{ fontFamily: "'Poppins', sans-serif" }}>Subtotal</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif" }}>Rs. {subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span style={{ fontFamily: "'Poppins', sans-serif" }}>Shipping</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif" }}>Free</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span style={{ fontFamily: "'Poppins', sans-serif" }}>Tax (GST)</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif" }}>Rs. {tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between text-white text-lg font-semibold">
                  <span style={{ fontFamily: "'Poppins', sans-serif" }}>Total</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif" }}>Rs. {total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-4 px-6 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiLock className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>
              
              <p className="text-gray-400 text-xs text-center mt-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

