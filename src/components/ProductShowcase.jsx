import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import productImage2 from '../image/WhatsApp Image 2025-12-07 at 19.05.14_f1ace842.jpg';
import productImage5 from '../image/image.png';
import diamondVideo from '../image/vecteezy_diamond-with-glass-box-on-black-background-3d-render-animation_9265752.mp4';
import { API_ENDPOINTS } from '@/config/api';

const ProductShowcase = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('rings');
  const [completeSets, setCompleteSets] = useState([]);
  const [loadingSets, setLoadingSets] = useState(true);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  
  // Map category IDs to API subcategories
  const categoryToSubCategory = {
    'rings': 'womens-rings',
    'earrings': 'womens-earrings',
    'chains': 'womens-chain',
    'bracelets': 'womens-bracelets',
    'mensChains': 'mens-chain'
  };

  // Map category IDs to navigation paths
  const categoryToPath = {
    'rings': '/products/rings',
    'earrings': '/products/earrings',
    'chains': '/products/chain',
    'bracelets': '/products/bracelets',
    'mensChains': '/products/men/chain'
  };
  
  // Fetch complete sets from API
  useEffect(() => {
    const fetchCompleteSets = async () => {
      try {
        setLoadingSets(true);
        const response = await fetch(`${API_ENDPOINTS.COMPLETE_SETS.GET_ALL}?isActive=true`);
        const data = await response.json();

        if (data.success) {
          // Map API complete sets to component format
          const mappedSets = (data.data.sets || []).map((set) => ({
            id: set._id,
            _id: set._id,
            name: set.setName,
            price: set.salePrice || set.originalPrice,
            originalPrice: set.originalPrice,
            salePrice: set.salePrice,
            onSale: !!set.salePrice,
            image: set.images && set.images.length > 0 ? set.images[0] : '',
            tagline: null,
          }));
          setCompleteSets(mappedSets);
        }
      } catch (err) {
        console.error('Fetch complete sets error:', err);
      } finally {
        setLoadingSets(false);
      }
    };

    fetchCompleteSets();
  }, []);

  // Fetch products for active category
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoadingCategory(true);
        const subCategory = categoryToSubCategory[activeCategory];
        
        if (!subCategory) {
          setCategoryProducts([]);
          setLoadingCategory(false);
          return;
        }

        const response = await fetch(`${API_ENDPOINTS.PRODUCTS.GET_ALL}?subCategory=${subCategory}&isActive=true`);
        const data = await response.json();

        if (data.success) {
          // Map API products to component format
          const mappedProducts = (data.data.products || []).map((product) => ({
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
          setCategoryProducts(mappedProducts);
        } else {
          setCategoryProducts([]);
        }
      } catch (err) {
        console.error('Fetch category products error:', err);
        setCategoryProducts([]);
      } finally {
        setLoadingCategory(false);
      }
    };

    fetchCategoryProducts();
  }, [activeCategory]);

  // Get first 6 sets for display
  const displayedSets = completeSets.slice(0, 6);
  const hasMoreSets = completeSets.length > 6;

  // Get first 6 products for display
  const displayedCategoryProducts = categoryProducts.slice(0, 6);
  const hasMoreProducts = categoryProducts.length > 6;

  const CategoryCard = ({ product }) => (
    <div 
      onClick={() => {
        navigate(`/product/${product._id || product.id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="bg-black rounded-lg overflow-hidden group cursor-pointer relative flex-shrink-0 min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] hover:scale-105 transition-transform duration-300"
    >
      {/* Product Image Area */}
      <div className="relative h-[250px] sm:h-[280px] md:h-[300px] lg:h-[350px] flex items-center justify-center overflow-hidden">
        {/* Product Image */}
        {product.image ? (
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat relative group-hover:scale-110 transition-transform duration-500"
            style={{
              backgroundImage: `url(${product.image})`
            }}
          >
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}
        {/* Sale Badge */}
        {product.onSale && (
          <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-red-500 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded z-10">
            Sale
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-3 sm:p-4 bg-black">
        <h3 className="font-semibold text-white mb-2 text-xs sm:text-sm md:text-base line-clamp-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{product.name}</h3>
        {product.onSale ? (
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <span className="text-sm sm:text-base md:text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Rs. {product.salePrice.toLocaleString()}</span>
            <span className="text-xs sm:text-sm text-gray-400 line-through" style={{ fontFamily: "'Poppins', sans-serif" }}>Rs. {product.originalPrice.toLocaleString()}</span>
          </div>
        ) : (
          <p className="text-sm sm:text-base md:text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Rs. {product.price?.toLocaleString()}</p>
        )}
      </div>
    </div>
  );

  const ProductCard = ({ product, showSale = false }) => (
    <div 
      onClick={() => {
        navigate('/complete-sets');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="bg-black rounded-lg overflow-hidden group cursor-pointer relative min-w-[280px] sm:min-w-[320px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0"
    >
      {/* Product Image Area */}
      <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] flex items-center justify-center">
        {/* Main Product Image */}
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: product.image ? `url(${product.image})` : 'none',
            backgroundColor: product.image ? 'transparent' : '#000'
          }}
        >
          {!product.image && (
            <span className="text-gray-500 text-xs sm:text-sm absolute inset-0 flex items-center justify-center">Product Image</span>
          )}
          {/* Optional overlay if needed */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Vertical Tagline Text */}
        {product.tagline && (
          <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10">
            <p 
              className="text-white text-[10px] sm:text-xs md:text-sm font-medium"
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
        
        {/* Sale Tag */}
        {showSale && product.onSale && (
          <span className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/80 text-gray-200 text-[10px] sm:text-xs font-medium px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border border-gray-300/50 shadow-[0_0_8px_rgba(255,255,255,0.3)] z-10">
            Sale
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-3 sm:p-4 bg-black">
        <h3 className="font-semibold text-white mb-2 sm:mb-3 text-xs sm:text-sm md:text-base line-clamp-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{product.name}</h3>
        {showSale && product.onSale ? (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Rs. {product.salePrice.toLocaleString()}</span>
            <span className="text-xs sm:text-sm text-gray-400 line-through" style={{ fontFamily: "'Poppins', sans-serif" }}>Rs. {product.originalPrice.toLocaleString()}</span>
          </div>
        ) : (
          <p className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Rs. {product.price?.toLocaleString()}</p>
        )}
      </div>
    </div>
  );

  const categories = [
    { id: 'rings', name: "Women's Rings" },
    { id: 'earrings', name: "Women's Earrings" },
    { id: 'chains', name: "Women's Chain" },
    { id: 'bracelets', name: "Women's Bracelets" },
    { id: 'mensChains', name: "Men' Chains" }
  ];

  return (
    <div className="bg-black">
      

      {/* Featured Section */}
      <section className="w-full pt-8 sm:pt-12 md:pt-20">
        <div className="w-full px-3 sm:px-4 md:px-6 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 text-center sm:text-left" style={{ fontFamily: "'Poppins', sans-serif" }}>Glow with Grace</h2>
          <p className="text-gray-300 font-medium text-sm sm:text-base text-center sm:text-left" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Premium 925 silver designs made to dazzle this festive season — elegant, timeless, and gift-ready.
          </p>
        </div>
        
        {/* Scrollable Product Cards */}
        <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
          {loadingSets ? (
            <div className="flex gap-3 sm:gap-4 md:gap-6 min-w-max pb-4 pl-3 sm:pl-4 md:pl-6 pr-3 sm:pr-4 md:pr-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#1a1a1a] rounded-lg min-w-[280px] sm:min-w-[320px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0 h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Loading...</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-3 sm:gap-4 md:gap-6 min-w-max pb-4 pl-3 sm:pl-4 md:pl-6 pr-3 sm:pr-4 md:pr-6">
              {displayedSets.map((set) => (
                <ProductCard key={set.id} product={set} showSale={true} />
              ))}
              {/* View All Card - Only show if there are more than 6 sets */}
              {hasMoreSets && (
                <div 
                  onClick={() => {
                    navigate('/complete-sets');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#1a1a1a] rounded-lg min-w-[280px] sm:min-w-[320px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0 h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  <p className="text-white text-lg sm:text-xl font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>View all</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Video Section - Top */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-screen min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={diamondVideo} type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Category Navigation Section */}
      <section className="bg-black w-full">
        <div className="w-full px-3 sm:px-4 md:px-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-black text-white border border-gray-700'
                    : 'bg-[#36454f] text-white hover:bg-gray-700'
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
            {loadingCategory ? (
              <div className="flex gap-3 sm:gap-4 md:gap-6 min-w-max pb-4 pl-3 sm:pl-4 md:pl-6 pr-3 sm:pr-4 md:pr-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-[#1B1B1B] rounded-lg min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] flex-shrink-0 h-[350px] sm:h-[380px] md:h-[420px] lg:h-[350px] flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Loading...</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-3 sm:gap-4 md:gap-6 min-w-max pb-4 pl-3 sm:pl-4 md:pl-6 pr-3 sm:pr-4 md:pr-6">
                {displayedCategoryProducts.length > 0 ? (
                  <>
                    {displayedCategoryProducts.map((product) => (
                      <CategoryCard key={product.id} product={product} />
                    ))}
                    {/* View All Card - Only show if there are more than 6 products */}
                    {hasMoreProducts && (
                      <div 
                        onClick={() => {
                          const path = categoryToPath[activeCategory];
                          if (path) {
                            navigate(path);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="bg-[#1B1B1B] rounded-lg min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] flex-shrink-0 h-[350px] sm:h-[380px] md:h-[420px] lg:h-[350px] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300"
                      >
                        <FiArrowRight className="text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3" />
                        <p className="text-white text-sm sm:text-base md:text-lg font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>View all</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full py-8 text-center">
                    <p className="text-gray-400 text-sm sm:text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      No products available in this category.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="bg-black pt-8 sm:pt-12 md:pt-20 w-full">
        <div className="w-full px-3 sm:px-4 md:px-6">
          <div className="w-full">
            <img 
              src="https://accessorizelondon.in/cdn/shop/products/MA-69461591003_1_652a5ee7-ba78-456e-9aba-00e0786eb5ea.jpg?v=1697114883" 
              alt="Product showcase" 
              className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default ProductShowcase;

