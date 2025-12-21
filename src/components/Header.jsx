import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { FaFacebook, FaPinterest, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '../image/logo.png';
import { API_ENDPOINTS } from '../config/api.js';
import { useCart } from '@/context/CartContext';

const Header = ({ onContactClick }) => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWomenHovered, setIsWomenHovered] = useState(false);
  const [isMenHovered, setIsMenHovered] = useState(false);
  const [isWomenClicked, setIsWomenClicked] = useState(false);
  const [isMenClicked, setIsMenClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login', 'signup', 'forgot'
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const womenDropdownRef = useRef(null);
  const menDropdownRef = useRef(null);
  const loginModalRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (womenDropdownRef.current && !womenDropdownRef.current.contains(event.target)) {
        const womenButton = event.target.closest('button');
        if (!womenButton || !womenButton.textContent?.includes('Women')) {
          setIsWomenClicked(false);
          setIsWomenHovered(false);
        }
      }
      if (menDropdownRef.current && !menDropdownRef.current.contains(event.target)) {
        const menButton = event.target.closest('button');
        if (!menButton || !menButton.textContent?.includes('Men')) {
          setIsMenClicked(false);
          setIsMenHovered(false);
        }
      }
      if (loginModalRef.current && !loginModalRef.current.contains(event.target)) {
        const userButton = event.target.closest('button');
        if (!userButton || !userButton.querySelector('svg[class*="FiUser"]')) {
          setIsLoginOpen(false);
        }
      }
    };

    if (isWomenClicked || isMenClicked || isLoginOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWomenClicked, isMenClicked, isLoginOpen]);

  const menuItems = [
    {
      name: 'Women',
      submenu: [
        "Women's Explore all",
        "Women's Bracelets",
        "Women's Chain",
        "Women's Rings",
        "Women's Earrings"
      ]
    },
    {
      name: 'Men',
      submenu: [
        "Men's Explore all",
        "Men's Chain",
        "Men's Rings",
        "Men's Bracelets"
      ]
    },
    { name: 'Gifting' },
    { name: 'Contact' }
  ];

  return (
    <header className="bg-black sticky top-0 z-50 ">
      {/* Main Header */}
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between relative">
          {/* Left Side - Mobile: Hamburger + Logo, Desktop: Navigation */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Hamburger Menu */}
            <button 
              className="lg:hidden p-1.5 sm:p-2 hover:bg-gray-900 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200" />
              ) : (
                <FiMenu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200" />
              )}
            </button>

            {/* Logo - Left on Mobile, Centered on Desktop */}
            <div className="flex items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <button
                onClick={() => {
                  navigate('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img 
                  src={logo} 
                  alt="Xhara Logo" 
                  className="h-3 sm:h-4 md:h-5 lg:h-6 w-auto object-contain"
                />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {menuItems.map((item, index) => (
                <div 
                  key={index} 
                  className="relative group"
                  onMouseEnter={() => {
                    if (item.name === 'Women') setIsWomenHovered(true);
                    if (item.name === 'Men') setIsMenHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (item.name === 'Women' && !isWomenClicked) setIsWomenHovered(false);
                    if (item.name === 'Men' && !isMenClicked) setIsMenHovered(false);
                  }}
                >
                  <button 
                    className="text-gray-200 hover:text-white font-medium py-2 flex items-center gap-1 text-xs xl:text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.name === 'Contact' && onContactClick) {
                        onContactClick();
                      } else if (item.name === 'Gifting') {
                        navigate('/gifting');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else if (item.name === 'Women') {
                        setIsWomenClicked(!isWomenClicked);
                        setIsWomenHovered(!isWomenClicked);
                      } else if (item.name === 'Men') {
                        setIsMenClicked(!isMenClicked);
                        setIsMenHovered(!isMenClicked);
                      }
                    }}
                  >
                    {item.name}
                    {item.submenu && <FiChevronDown className="w-3 h-3" />}
                  </button>
                  {item.submenu && item.name !== 'Women' && item.name !== 'Men' && (
                    <div className="absolute top-full left-0 mt-0 bg-black border-t border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48">
                      <ul className="py-2">
                        {item.submenu.map((subItem, subIndex) => {
                          const getRoute = (item) => {
                            if (item === "Women's Explore all") return '/products/women';
                            if (item === "Women's Bracelets") return '/products/women/womens-bracelets';
                            if (item === "Women's Chain") return '/products/women/womens-chain';
                            if (item === "Women's Rings") return '/products/women/womens-rings';
                            if (item === "Women's Earrings") return '/products/women/womens-earrings';
                            if (item === "Men's Explore all") return '/products/men';
                            if (item === "Men's Chain") return '/products/men/mens-chain';
                            if (item === "Men's Rings") return '/products/men/mens-rings';
                            if (item === "Men's Bracelets") return '/products/men/mens-bracelets';
                            return '#';
                          };
                          return (
                            <li key={subIndex}>
                              <a 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  const route = getRoute(subItem);
                                  if (route !== '#') {
                                    navigate(route);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }
                                }}
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-900 hover:text-white cursor-pointer" 
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                              >
                                {subItem}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Icons - Search, Shopping Cart, Login */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <button className="p-1.5 sm:p-2 hover:bg-gray-900 rounded-full transition-colors">
              <FiSearch className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200" />
            </button>
            <button 
              className="p-1.5 sm:p-2 hover:bg-gray-900 rounded-full relative transition-colors"
              onClick={() => {
                navigate('/cart');
                setIsCartOpen(false);
              }}
            >
              <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200" />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
            <button 
              className="p-1.5 sm:p-2 hover:bg-gray-900 rounded-full transition-colors"
              onClick={() => setIsLoginOpen(!isLoginOpen)}
            >
              <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Women Dropdown - Full Width */}
      {(isWomenHovered || isWomenClicked) && (
        <div 
          ref={womenDropdownRef}
          className="hidden lg:block absolute top-full left-0 w-full bg-black transition-all duration-200 z-50 h-[600px]"
          onMouseEnter={() => setIsWomenHovered(true)}
          onMouseLeave={() => {
            if (!isWomenClicked) setIsWomenHovered(false);
          }}
        >
          <div className="container mx-auto px-3 sm:px-4 md:px-6">
            <div className="flex">
              {/* Left Side - Menu Items */}
              <div className="w-1/2 py-6 px-6 mt-[50px] ml-[100px]">
                <ul className="space-y-3">
                  {menuItems.find(item => item.name === 'Women')?.submenu.map((subItem, subIndex) => {
                    const getRoute = (item) => {
                      if (item === "Women's Explore all") return '/products/women';
                      if (item === "Women's Bracelets") return '/products/women/womens-bracelets';
                      if (item === "Women's Chain") return '/products/women/womens-chain';
                      if (item === "Women's Rings") return '/products/women/womens-rings';
                      if (item === "Women's Earrings") return '/products/women/womens-earrings';
                      return '#';
                    };
                    return (
                      <li key={subIndex}>
                        <a 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            const route = getRoute(subItem);
                            if (route !== '#') {
                              navigate(route);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                              setIsWomenHovered(false);
                              setIsWomenClicked(false);
                            }
                          }}
                          className="block text-sm text-gray-200 hover:text-white transition-colors cursor-pointer" 
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {subItem}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* Right Side - Product Image */}
              <div className="w-1/2 bg-black relative overflow-hidden min-h-[300px] mt-[50px]">
                <img 
                  src="https://i.pinimg.com/1200x/f5/4e/f0/f54ef0c0dc660f63a786a994a09bb6c8.jpg" 
                  alt="Silver Ring" 
                  className="w-[400px] h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Men Dropdown - Full Width */}
      {(isMenHovered || isMenClicked) && (
        <div 
          ref={menDropdownRef}
          className="hidden lg:block absolute top-full left-0 w-full bg-black transition-all duration-200 z-50 h-[600px]"
          onMouseEnter={() => setIsMenHovered(true)}
          onMouseLeave={() => {
            if (!isMenClicked) setIsMenHovered(false);
          }}
        >
          <div className="container mx-auto px-3 sm:px-4 md:px-6">
            <div className="flex">
              {/* Left Side - Menu Items */}
              <div className="w-1/2 py-6 px-6 mt-[50px] ml-[100px]">
                <ul className="space-y-3">
                  {menuItems.find(item => item.name === 'Men')?.submenu.map((subItem, subIndex) => {
                    const getRoute = (item) => {
                      if (item === "Men's Explore all") return '/products/men';
                      if (item === "Men's Chain") return '/products/men/mens-chain';
                      if (item === "Men's Rings") return '/products/men/mens-rings';
                      if (item === "Men's Bracelets") return '/products/men/mens-bracelets';
                      return '#';
                    };
                    return (
                      <li key={subIndex}>
                        <a 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            const route = getRoute(subItem);
                            if (route !== '#') {
                              navigate(route);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                              setIsMenHovered(false);
                              setIsMenClicked(false);
                            }
                          }}
                          className="block text-sm text-gray-200 hover:text-white transition-colors cursor-pointer" 
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {subItem}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* Right Side - Product Image */}
              <div className="w-1/2 bg-black relative overflow-hidden min-h-[300px] mt-[50px]">
                <img 
                  src="https://i.pinimg.com/1200x/9a/57/56/9a57567cb4fca4ba94c92ed7b4b2a88a.jpg" 
                  alt="Men's Chain" 
                  className="w-[400px] h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-black">
          <nav className="container mx-auto px-3 sm:px-4 py-4">
            {menuItems.map((item, index) => (
              <div key={index} className="py-2">
                <a 
                  href="#" 
                  className="text-gray-200 font-medium py-2 flex items-center gap-2 text-sm sm:text-base"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.name === 'Contact' && onContactClick) {
                      onContactClick();
                      setIsMenuOpen(false);
                    } else if (item.name === 'Gifting') {
                      navigate('/gifting');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }
                  }}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {item.name}
                  {item.submenu && <FiChevronDown className="w-4 h-4" />}
                </a>
                {item.submenu && (
                  <ul className="pl-4 mt-2 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a href="#" className="text-xs sm:text-sm text-gray-400 block py-1 hover:text-gray-200" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          {subItem}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}

      {/* Cart Dropdown */}
      {isCartOpen && (
        <div className="absolute top-full right-2 sm:right-4 mt-2 w-[calc(100vw-1rem)] sm:w-80 max-w-sm bg-black border border-gray-700 shadow-xl rounded-lg p-4 z-50">
          <div className="text-center py-6 sm:py-8">
            <p className="text-gray-200 mb-4 text-sm sm:text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>Item added to your cart</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button 
                onClick={() => {
                  navigate('/cart');
                  setIsCartOpen(false);
                }}
                className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors text-sm sm:text-base" 
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                View cart
              </button>
              <button 
                onClick={() => {
                  navigate('/checkout');
                  setIsCartOpen(false);
                }}
                className="px-4 py-2 border border-gray-600 text-gray-200 rounded hover:bg-gray-900 transition-colors text-sm sm:text-base" 
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Check out
              </button>
            </div>
            <button 
              className="mt-4 text-xs sm:text-sm text-gray-400 hover:text-gray-200 transition-colors"
              onClick={() => setIsCartOpen(false)}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Continue shopping
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-4">
          <div 
            ref={loginModalRef}
            className="bg-gray-900 rounded-lg w-full max-w-md p-8 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setIsLoginOpen(false);
                setShowCodeInput(false);
                setAuthView('login');
                setEmail('');
                setCode('');
                setFullName('');
                setPhoneNumber('');
                setPassword('');
                setConfirmPassword('');
                setError('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src={logo} 
                alt="XHARA Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {authView === 'signup' ? 'Sign up' : authView === 'forgot' ? 'Forgot password' : 'Sign in'}
            </h2>
            <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {authView === 'signup' 
                ? 'Create a new account' 
                : authView === 'forgot'
                ? 'Enter your email to reset password'
                : 'Sign in or create an account'}
            </p>

            {/* Sign in Options */}
            <div className="space-y-4">
              {authView === 'login' && (
                <>
                  

                  

                 

                  {/* Email Input */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>

                  {/* Forgot Password Link */}
                  <div className="flex justify-end">
                    <button 
                      onClick={() => setAuthView('forgot')}
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors" 
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded text-sm">
                      {error}
                    </div>
                  )}

                  {/* Sign In Button */}
                  <button 
                    onClick={async () => {
                      if (!email.trim() || !password.trim()) {
                        setError('Please fill in all fields');
                        return;
                      }

                      // Login via API
                      setLoading(true);
                      setError('');
                      
                      try {
                        console.log('🔐 Attempting login with:', { email: email.trim() });
                        
                        const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            email: email.trim(),
                            password: password.trim(),
                          }),
                        });

                        const data = await response.json();
                        console.log('📥 Login response:', data);

                        if (data.success) {
                          // Store token and user data
                          localStorage.setItem('token', data.data.token);
                          localStorage.setItem('user', JSON.stringify(data.data.user));
                          localStorage.setItem('userLoggedIn', 'true');
                          
                          console.log('✅ Login successful!');
                          console.log('👤 User data:', data.data.user);
                          console.log('🔑 User role:', data.data.user.role);
                          
                          setIsLoginOpen(false);
                          setEmail('');
                          setPassword('');
                          setError('');
                          
                          // Navigate based on user role from database
                          if (data.data.user.role === 'admin') {
                            console.log('🚀 Admin detected! Redirecting to admin panel...');
                            localStorage.setItem('adminLoggedIn', 'true');
                            navigate('/dashboard/admin/home');
                          } else {
                            console.log('👤 Regular user. Redirecting to home...');
                            navigate('/');
                            window.location.reload();
                          }
                        } else {
                          console.error('❌ Login failed:', data.message);
                          setError(data.message || 'Login failed. Please try again.');
                        }
                      } catch (err) {
                        console.error('❌ Login error:', err);
                        setError('Network error. Please check if backend server is running.');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {loading && (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>

                  {/* Sign Up Link */}
                  <div className="text-center pt-4">
                    <span className="text-gray-400 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Don't have an account?{' '}
                      <button 
                        onClick={() => setAuthView('signup')}
                        className="text-blue-400 hover:text-blue-300 underline"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Sign up
                      </button>
                    </span>
                  </div>
                </>
              )}

              {authView === 'signup' && (
                <>

                  {/* Full Name Input */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter your phone number"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-red-400 text-xs mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded text-sm">
                      {error}
                    </div>
                  )}

                  {/* Sign Up Button */}
                  <button 
                    onClick={async () => {
                      if (!fullName.trim() || !phoneNumber.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
                        setError('Please fill in all fields');
                        return;
                      }

                      if (password !== confirmPassword) {
                        setError('Passwords do not match');
                        return;
                      }

                      if (phoneNumber.length !== 10) {
                        setError('Phone number must be 10 digits');
                        return;
                      }

                      if (password.length < 6) {
                        setError('Password must be at least 6 characters');
                        return;
                      }

                      setLoading(true);
                      setError('');

                      try {
                        const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            fullName: fullName.trim(),
                            email: email.trim(),
                            phoneNumber: phoneNumber.trim(),
                            password: password.trim(),
                            confirmPassword: confirmPassword.trim(),
                          }),
                        });

                        const data = await response.json();

                        if (data.success) {
                          // Store token and user data
                          localStorage.setItem('token', data.data.token);
                          localStorage.setItem('user', JSON.stringify(data.data.user));
                          localStorage.setItem('userLoggedIn', 'true');
                          
                          // Show success popup
                          setSuccessMessage('Account created successfully! Welcome to XHARA Silver.');
                          setShowSuccessPopup(true);
                          
                          // Close login modal and reset form
                          setIsLoginOpen(false);
                          setAuthView('login');
                          setFullName('');
                          setPhoneNumber('');
                          setEmail('');
                          setPassword('');
                          setConfirmPassword('');
                          setError('');
                        } else {
                          setError(data.message || (data.errors && data.errors[0]?.msg) || 'Signup failed. Please try again.');
                        }
                      } catch (err) {
                        console.error('Signup error:', err);
                        setError('Network error. Please check if backend server is running.');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {loading && (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {loading ? 'Creating account...' : 'Sign up'}
                  </button>

                  {/* Sign In Link */}
                  <div className="text-center pt-4">
                    <span className="text-gray-400 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Already have an account?{' '}
                      <button 
                        onClick={() => setAuthView('login')}
                        className="text-blue-400 hover:text-blue-300 underline"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Sign in
                      </button>
                    </span>
                  </div>
                </>
              )}

              {authView === 'forgot' && (
                <>
                  {/* Email Input */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-gray-500 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>

                  {/* Reset Password Button */}
                  <button 
                    onClick={async () => {
                      if (!email.trim()) {
                        setError('Please enter your email');
                        return;
                      }

                      setLoading(true);
                      setError('');

                      try {
                        // Simulate API call (replace with actual API endpoint when available)
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        
                        setSuccessMessage('Password reset link has been sent to your email');
                        setShowSuccessPopup(true);
                        setIsLoginOpen(false);
                        setAuthView('login');
                        setEmail('');
                      } catch (err) {
                        setError('Failed to send reset link. Please try again.');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {loading && (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {loading ? 'Sending...' : 'Send reset link'}
                  </button>

                  {/* Back to Sign In Link */}
                  <div className="text-center pt-4">
                    <button 
                      onClick={() => setAuthView('login')}
                      className="text-blue-400 hover:text-blue-300 text-sm underline"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Back to sign in
                    </button>
                  </div>
                </>
              )}
            </div>

            
          </div>
        </div>
      )}

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[101] flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-md p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                setSuccessMessage('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h3 className="text-2xl font-bold text-white text-center mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Success!
            </h3>
            <p className="text-gray-300 text-center mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {successMessage}
            </p>

            {/* OK Button */}
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                setSuccessMessage('');
              }}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

