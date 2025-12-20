import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { API_ENDPOINTS } from '@/config/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedRingSize, setSelectedRingSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Scroll to top when component mounts or id changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(API_ENDPOINTS.PRODUCTS.GET_BY_ID(id));
        const data = await response.json();

        if (data.success) {
          setProduct(data.data.product);
          // Set default ring size if available
          if (data.data.product.ringSizes && data.data.product.ringSizes.length > 0) {
            setSelectedRingSize(data.data.product.ringSizes[0]);
          }
        } else {
          setError(data.message || 'Product not found');
        }
      } catch (err) {
        console.error('Fetch product error:', err);
        setError('Network error. Please check if backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', { productId: id, quantity, ringSize: selectedRingSize });
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log('Buy now:', { productId: id, quantity, ringSize: selectedRingSize });
    alert('Buy now functionality coming soon!');
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>Loading product...</p>
      </div>
    );
  }



  const currentPrice = product.salePrice || product.originalPrice;
  const isOnSale = !!product.salePrice;

  return (
    <div className="bg-black min-h-screen">

      {/* Product Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative mb-4 aspect-square bg-gray-900 rounded-lg overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <span className="text-gray-400" style={{ fontFamily: "'Poppins', sans-serif" }}>No Image</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-white'
                        : 'border-transparent hover:border-gray-600'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.productName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Details */}
          <div>
            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {product.productName}
            </h1>

            {/* Price */}
            <div className="mb-6">
              {isOnSale ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Rs. {currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-lg text-gray-400 line-through" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Rs. {product.originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              ) : (
                <span className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Rs. {currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-sm font-medium text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 border border-gray-600 text-white rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium w-12 text-center text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 border border-gray-600 text-white rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Features */}
            {product.features && (
              <div className="mb-6 flex flex-col gap-3">
                {product.features.sterlingSilver && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-white">✓</span>
                    <span className="text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      925 sterling silver
                    </span>
                  </div>
                )}
                {product.features.freeShipping && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-white">✈</span>
                    <span className="text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Free shipping PAN India
                    </span>
                  </div>
                )}
                {product.features.hypoallergenic && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-white">❤</span>
                    <span className="text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Hypoallergenic
                    </span>
                  </div>
                )}
                {product.features.antiTarnish && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-white">★</span>
                    <span className="text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Anti tarnish
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Color - Only for ring products */}
            {(product.subCategory === 'womens-rings' || product.subCategory === 'mens-rings') && (
              <div className="mb-6">
                <p className="text-sm font-medium text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  COLOUR - SILVER
                </p>
              </div>
            )}

            {/* Ring Size Selector - Only for ring products, below Color */}
            {(product.subCategory === 'womens-rings' || product.subCategory === 'mens-rings') && product.ringSizes && product.ringSizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Ring Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.ringSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedRingSize(size)}
                      className={`w-12 h-12 rounded-full border-2 transition-colors flex items-center justify-center ${
                        selectedRingSize === size
                          ? 'border-white bg-white text-black'
                          : 'border-gray-600 text-white hover:border-gray-400'
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white border border-white py-4 px-6 font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <FiShoppingCart className="w-5 h-5" />
                Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-white text-black py-4 px-6 font-medium hover:bg-gray-100 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Buy it now
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

