import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { API_ENDPOINTS } from '@/config/api';
import { useCart } from '@/context/CartContext';
import { AlertModal } from '@/widgets/layout';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedRingSize, setSelectedRingSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('Silver');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const hasAutoAddedToCart = useRef(false);
  const [alertModal, setAlertModal] = useState({ open: false, message: '' });

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
          
          // Get URL parameters for auto-add to cart
          const addToCartParam = searchParams.get('addToCart');
          const quantityParam = searchParams.get('quantity');
          const ringSizeParam = searchParams.get('ringSize');
          const colorParam = searchParams.get('color');
          
          // Set default ring size if available
          if (data.data.product.ringSizes && data.data.product.ringSizes.length > 0) {
            const defaultRingSize = ringSizeParam || data.data.product.ringSizes[0];
            setSelectedRingSize(defaultRingSize);
          } else if (ringSizeParam) {
            setSelectedRingSize(ringSizeParam);
          }
          
          // Set quantity from URL or default to 1
          if (quantityParam) {
            const qty = parseInt(quantityParam, 10);
            if (qty > 0) {
              setQuantity(qty);
            }
          }
          
          // Set color from URL or default to Silver
          if (colorParam) {
            setSelectedColor(colorParam);
          }
          
          // Auto-add to cart if addToCart=true in URL
          if (addToCartParam === 'true' && !hasAutoAddedToCart.current) {
            hasAutoAddedToCart.current = true;
            const qty = quantityParam ? parseInt(quantityParam, 10) : 1;
            const ringSize = ringSizeParam || (data.data.product.ringSizes && data.data.product.ringSizes.length > 0 ? data.data.product.ringSizes[0] : '');
            const color = colorParam || 'Silver';
            
            addToCart(data.data.product, qty, ringSize, color);
            
            // Remove query parameters and optionally redirect to cart
            const redirectToCart = searchParams.get('redirectToCart');
            if (redirectToCart === 'true') {
              // Remove query parameters
              setSearchParams({});
              // Navigate to cart after a short delay to ensure cart is updated
              setTimeout(() => {
                navigate('/cart');
              }, 100);
            } else {
              // Just remove query parameters without redirecting
              setSearchParams({});
            }
          }
          
          // Fetch related products
          fetchRelatedProducts(data.data.product);
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
  }, [id, searchParams, addToCart, navigate, setSearchParams]);

  const fetchRelatedProducts = async (currentProduct) => {
    try {
      setLoadingRelated(true);
      
      // Build query for related products
      const params = new URLSearchParams();
      params.append('isActive', 'true');
      
      // If subcategory exists (e.g., "womens-rings"), filter by both category and subcategory
      // This ensures we get only products from the same subcategory (e.g., other women's rings)
      if (currentProduct.subCategory) {
        params.append('subCategory', currentProduct.subCategory);
        if (currentProduct.category) {
          params.append('category', currentProduct.category);
        }
      } else if (currentProduct.category) {
        // If no subcategory (from "All" page), filter by category only
        // This shows all products from that category (e.g., all women's products)
        params.append('category', currentProduct.category);
      }
      
      const response = await fetch(`${API_ENDPOINTS.PRODUCTS.GET_ALL}?${params.toString()}`);
      const data = await response.json();
      
      if (data.success && data.data.products) {
        // Filter out current product - show all others
        const filtered = data.data.products
          .filter(p => p._id !== currentProduct._id)
          .map((product) => ({
            id: product._id,
            _id: product._id,
            name: product.productName,
            price: product.salePrice || product.originalPrice,
            originalPrice: product.originalPrice,
            salePrice: product.salePrice,
            onSale: !!product.salePrice,
            image: product.images && product.images.length > 0 ? product.images[0] : '',
            tagline: product.tagline || null,
          }));
        setRelatedProducts(filtered);
      }
    } catch (err) {
      console.error('Fetch related products error:', err);
    } finally {
      setLoadingRelated(false);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(product, quantity, selectedRingSize, selectedColor);
    // Navigate to cart page
    navigate('/cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    // Add product to cart first
    addToCart(product, quantity, selectedRingSize, selectedColor);
    // Navigate directly to checkout
    navigate('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 border-t border-gray-700">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Related Products
          </h2>
          {loadingRelated ? (
            <div className="text-center py-8">
              <p className="text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Loading related products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => {
                    navigate(`/product/${relatedProduct._id || relatedProduct.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-black group cursor-pointer relative"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden mb-3 sm:mb-4">
                    <img
                      src={relatedProduct.image || '/placeholder-image.jpg'}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Sale Badge */}
                    {relatedProduct.onSale && (
                      <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 border border-white text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded">
                        Sale
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className="text-white text-sm sm:text-base font-medium mb-2 line-clamp-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {relatedProduct.name}
                    </h3>
                    {relatedProduct.onSale && relatedProduct.originalPrice ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-white text-sm sm:text-base font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Rs. {relatedProduct.salePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-gray-400 text-xs sm:text-sm line-through" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Rs. {relatedProduct.originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    ) : (
                      <p className="text-white text-sm sm:text-base font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Rs. {relatedProduct.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <AlertModal
        open={alertModal.open}
        onClose={() => setAlertModal({ open: false, message: '' })}
        title="Information"
        message={alertModal.message}
        buttonText="OK"
      />
    </div>
  );
};

export default ProductDetail;

