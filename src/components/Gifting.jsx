import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { API_ENDPOINTS } from '@/config/api';

const Gifting = () => {
  const navigate = useNavigate();
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortBy, setSortBy] = useState('best-selling');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const productsPerPage = 12;

  // Fetch products and complete sets with includeInGift = true
  useEffect(() => {
    const fetchGiftItems = async () => {
      try {
        setLoading(true);
        setError('');
        const timestamp = Date.now();
        
        // Fetch products with includeInGift = true
        const productsUrl = `${API_ENDPOINTS.PRODUCTS.GET_ALL}?includeInGift=true&isActive=true&_t=${timestamp}`;
        console.log('Fetching gift products from:', productsUrl);
        
        const productsResponse = await fetch(productsUrl, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        
        if (!productsResponse.ok) {
          throw new Error(`HTTP error! status: ${productsResponse.status}`);
        }
        
        const productsData = await productsResponse.json();
        console.log('Gift products API response:', productsData);
        console.log('Products count:', productsData.data?.products?.length || 0);

        // Fetch complete sets with includeInGift = true
        const setsUrl = `${API_ENDPOINTS.COMPLETE_SETS.GET_ALL}?includeInGift=true&isActive=true&_t=${timestamp}`;
        console.log('Fetching gift complete sets from:', setsUrl);
        
        const setsResponse = await fetch(setsUrl, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        
        if (!setsResponse.ok) {
          throw new Error(`HTTP error! status: ${setsResponse.status}`);
        }
        
        const setsData = await setsResponse.json();
        console.log('Gift complete sets API response:', setsData);
        console.log('Complete sets count:', setsData.data?.sets?.length || 0);

        // Map products to component format
        const mappedProducts = (productsData.data?.products || []).map((product) => ({
            id: product._id,
          _id: product._id,
            name: product.productName,
            price: product.salePrice || product.originalPrice,
            originalPrice: product.originalPrice,
            salePrice: product.salePrice,
            onSale: !!product.salePrice,
            image: product.images && product.images.length > 0 ? product.images[0] : '',
            tagline: product.tagline || null,
          type: 'product'
        }));

        // Map complete sets to component format
        const mappedSets = (setsData.data?.sets || []).map((set) => ({
          id: set._id,
          _id: set._id,
          name: set.setName,
          price: set.salePrice || set.originalPrice,
          originalPrice: set.originalPrice,
          salePrice: set.salePrice,
          onSale: !!set.salePrice,
          image: set.images && set.images.length > 0 ? set.images[0] : '',
          tagline: null,
          type: 'complete-set'
        }));

        // Combine products and complete sets
        const allItems = [...mappedProducts, ...mappedSets];
        console.log('Total gift items (products + sets):', allItems.length);
        setProducts(allItems);
      } catch (err) {
        console.error('Fetch gift items error:', err);
        setError('Network error. Please check if backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchGiftItems();
  }, []);

  // Scroll to top on component mount and page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply availability filter
    if (availabilityFilter === 'in-stock') {
      // All products are in stock for now
      filtered = filtered;
    } else if (availabilityFilter === 'out-of-stock') {
      filtered = [];
    }

    // Apply price filter (use salePrice if available, otherwise originalPrice)
    if (priceFilter) {
      if (priceFilter === '0-1000') {
        filtered = filtered.filter(p => (p.salePrice || p.originalPrice || p.price) < 1000);
      } else if (priceFilter === '1000-2000') {
        filtered = filtered.filter(p => {
          const price = p.salePrice || p.originalPrice || p.price;
          return price >= 1000 && price < 2000;
        });
      } else if (priceFilter === '2000-5000') {
        filtered = filtered.filter(p => {
          const price = p.salePrice || p.originalPrice || p.price;
          return price >= 2000 && price < 5000;
        });
      } else if (priceFilter === '5000+') {
        filtered = filtered.filter(p => (p.salePrice || p.originalPrice || p.price) >= 5000);
      }
    }

    // Apply sorting (use salePrice if available, otherwise originalPrice)
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => {
        const priceA = a.salePrice || a.originalPrice || a.price;
        const priceB = b.salePrice || b.originalPrice || b.price;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => {
        const priceA = a.salePrice || a.originalPrice || a.price;
        const priceB = b.salePrice || b.originalPrice || b.price;
        return priceB - priceA;
      });
    } else if (sortBy === 'best-selling') {
      // Keep original order for best selling
      filtered = filtered;
    } else if (sortBy === 'newest') {
      // Reverse order for newest
      filtered = filtered.reverse();
    }

    return filtered;
  }, [products, availabilityFilter, priceFilter, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [availabilityFilter, priceFilter, sortBy]);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  return (
    <section className="bg-black min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Gifting
        </h1>

        {/* Description */}
        <p className="text-white text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Celebrate every moment with thoughtful gifts from our silver jewelry gifting collection. Make this Diwali unforgettable with SilverLab's exclusive 925 sterling silver gifting collection. From elegant rings and pendants to thoughtful jewelry sets, each piece is crafted to express love, purity, and timeless elegance. Whether for family, friends, or someone special—gift them the sparkle of real 925 silver this festive season.
        </p>

        {/* Filter and Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10 pb-4 sm:pb-6">
          {/* Left Side - Filters */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-white text-sm sm:text-base font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Filter:</span>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="px-3 sm:px-4 py-2 bg-transparent border border-gray-600 text-white text-sm sm:text-base rounded focus:outline-none focus:border-gray-400"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <option value="">Availability</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-3 sm:px-4 py-2 bg-transparent border border-gray-600 text-white text-sm sm:text-base rounded focus:outline-none focus:border-gray-400"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <option value="">Price</option>
              <option value="0-1000">Under Rs. 1,000</option>
              <option value="1000-2000">Rs. 1,000 - Rs. 2,000</option>
              <option value="2000-5000">Rs. 2,000 - Rs. 5,000</option>
              <option value="5000+">Above Rs. 5,000</option>
            </select>
          </div>

          {/* Right Side - Sort and Product Count */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-white text-sm sm:text-base font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 sm:px-4 py-2 bg-transparent border border-gray-600 text-white text-sm sm:text-base rounded focus:outline-none focus:border-gray-400"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <option value="best-selling">Best selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <span className="text-gray-400 text-sm sm:text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>{filteredAndSortedProducts.length} items</span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-white text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Loading products...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {error}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
              No gift products available at the moment.
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredAndSortedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
            {currentProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => {
                if (product.type === 'complete-set') {
                  navigate('/complete-sets');
                } else {
                navigate(`/product/${product._id || product.id}`);
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-black group cursor-pointer relative"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden mb-3 sm:mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Sale Badge */}
                {product.onSale && (
                  <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-red-500 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded">
                    Sale
                  </span>
                )}
                {/* Complete Set Badge */}
                {product.type === 'complete-set' && (
                  <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-green-500 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded z-10">
                    Set
                  </span>
                )}
                {/* Vertical Tagline Text */}
                {product.tagline && (
                  <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10">
                    <p
                      className="text-white text-[10px] sm:text-xs font-medium"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)'
                      }}
                    >
                      {product.tagline}
                    </p>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-white text-sm sm:text-base font-medium mb-2 line-clamp-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {product.name}
                </h3>
                {product.onSale && product.originalPrice ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-white text-sm sm:text-base font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Rs. {product.salePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-gray-400 text-xs sm:text-sm line-through" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Rs. {product.originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                ) : (
                  <p className="text-white text-sm sm:text-base font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Rs. {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                )}
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex flex-col items-center gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12">
            {/* Showing results text */}
            <div className="text-gray-400 text-sm sm:text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 sm:gap-3">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-3 sm:px-4 py-2 rounded border transition-colors ${
                currentPage === 1
                  ? 'border-gray-700 text-gray-600 cursor-not-allowed'
                  : 'border-gray-600 text-white hover:border-gray-500 hover:bg-gray-900'
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 sm:px-4 py-2 rounded border transition-colors text-sm sm:text-base ${
                    currentPage === pageNum
                      ? 'bg-white text-black border-white font-semibold'
                      : 'border-gray-600 text-white hover:border-gray-500 hover:bg-gray-900'
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 sm:px-4 py-2 rounded border transition-colors ${
                currentPage === totalPages
                  ? 'border-gray-700 text-gray-600 cursor-not-allowed'
                  : 'border-gray-600 text-white hover:border-gray-500 hover:bg-gray-900'
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gifting;

