import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [giftMessage, setGiftMessage] = useState('');

  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    updateQuantity(item.id, newQuantity, item.ringSize, item.color);
  };

  const handleRemove = (item) => {
    removeFromCart(item.id, item.ringSize, item.color);
  };

  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Your cart
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-0" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Your cart
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-white hover:text-gray-300 transition-colors text-sm sm:text-base"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Continue shopping
          </button>
        </div>

        {/* Desktop Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-700 mb-6">
          <div className="col-span-5">
            <p className="text-white font-semibold text-sm uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
              PRODUCT
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-white font-semibold text-sm uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
              QUANTITY
            </p>
          </div>
          <div className="col-span-4 text-right">
            <p className="text-white font-semibold text-sm uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
              TOTAL
            </p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-6 mb-8">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${item.ringSize}-${item.color}-${index}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-gray-700"
            >
              {/* Product Info */}
              <div className="col-span-1 md:col-span-5 flex gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-900 rounded overflow-hidden">
                  <img
                    src={item.image || '/placeholder-image.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2 text-sm sm:text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {item.name}
                  </h3>
                  <p className="text-white text-sm sm:text-base font-semibold mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Rs. {item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  {item.ringSize && (
                    <p className="text-gray-400 text-xs sm:text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Ring size: {item.ringSize}
                    </p>
                  )}
                  {item.color && (
                    <p className="text-gray-400 text-xs sm:text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Color: {item.color}
                    </p>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="col-span-1 md:col-span-3 flex items-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item, -1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-600 text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="text-white text-sm sm:text-base font-medium w-8 sm:w-10 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item, 1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-600 text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemove(item)}
                    className="ml-2 sm:ml-4 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="col-span-1 md:col-span-4 flex items-center justify-between md:justify-end">
                <p className="text-white text-sm sm:text-base font-semibold md:text-right" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Rs. {(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gift Message and Checkout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gift Message */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-base sm:text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Want to gift it? Add your message or special instructions here
            </h3>
            <textarea
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder="Enter your message..."
              className="w-full h-32 bg-gray-900 border border-gray-700 text-white p-4 rounded focus:outline-none focus:border-gray-500 resize-none"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-gray-900 border border-gray-700 p-6 rounded">
              <div className="mb-4">
                <p className="text-white text-lg sm:text-xl font-semibold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Estimated total Rs. {total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Taxes included. Discounts and shipping calculated at checkout.
                </p>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-white text-black py-4 px-6 font-medium hover:bg-gray-100 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

