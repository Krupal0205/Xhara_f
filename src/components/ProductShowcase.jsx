import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import productImage2 from '../image/WhatsApp Image 2025-12-07 at 19.05.14_f1ace842.jpg';
import productImage5 from '../image/image.png';
import diamondVideo from '../image/vecteezy_diamond-with-glass-box-on-black-background-3d-render-animation_9265752.mp4';


const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('rings');
  const featuredProducts = [
    {
      id: 1,
      name: "Azure Bloom Butterfly Pendant",
      originalPrice: 5499,
      salePrice: 4299,
      onSale: true,
      image: productImage5
    },
    {
      id: 2,
      name: "Midnight Bloom Pendant Necklace",
      originalPrice: 5500,
      salePrice: 4500,
      onSale: true,
      image: "https://www.silverlab.in/cdn/shop/files/ART03474_copy_result.jpg?v=1760092449&width=1100"
    },
    {
      id: 3,
      name: "Golden Ginkgo Pearl Pendant",
      originalPrice: 5500,
      salePrice: 4500,
      onSale: true,
      image: productImage5
    },
    {
      id: 4,
      name: "Fox Charm with Aqua Gemstone",
      originalPrice: 5500,
      salePrice: 4500,
      onSale: true,
      image: "https://www.silverlab.in/cdn/shop/files/ART03474_copy_result.jpg?v=1760092449&width=1100"
    },
    {
      id: 5,
      name: "Blush Bloom Pendant Necklace",
      originalPrice: 7500,
      salePrice: 6500,
      onSale: true,
      image: productImage5
    },
    {
      id: 6,
      name: "Mint Petal Drop Pendant",
      originalPrice: 5200,
      salePrice: 4200,
      onSale: true,
      image: "https://www.silverlab.in/cdn/shop/files/ART03474_copy_result.jpg?v=1760092449&width=1100"
    }
  ];

  const categoryProducts = {
    rings: [
      { name: "Aryelle", price: 1199, image: "https://www.silverlab.in/cdn/shop/files/ART01673_result.jpg?v=1745573250&width=600" },
      { name: "Panther Luxe", price: 2500, image: "https://www.silverlab.in/cdn/shop/files/ART01669_result_2065d84c-64e9-461d-b735-4cf60a0da630.jpg?v=1755623416&width=823" },
      { name: "Aurora Band", price: 1999, image: "https://www.silverlab.in/cdn/shop/files/ART04016_copy_result.jpg?v=1755623366&width=600" },
      { name: "Glimmerheart Solitaire Ring", price: 1399, image: "https://www.silverlab.in/cdn/shop/files/ART01671_result.jpg?v=1745573765&width=600" }
    ],
    earrings: [
      { name: "Regalia CZ Stud", price: 999, image: "https://www.silverlab.in/cdn/shop/files/ART01706_result.jpg?v=1745571523&width=823" },
      { name: "Frostlight Solitaire Stud", price: 999, image: "https://www.silverlab.in/cdn/shop/files/ART01702_result.jpg?v=1745571520&width=600" },
      { name: "FrostFlare Snowflake Stud", price: 999, image: "https://www.silverlab.in/cdn/shop/files/ART01704_result_600x600.jpg?v=1749486262" },
      { name: "Starlace Halo Stud", price: 999, image: "https://www.silverlab.in/cdn/shop/files/ART01704_result_600x600.jpg?v=1749486262" }
    ],
    chains: [
      { name: "Azure Bloom Butterfly Pendant", price: 4299, image: "https://www.silverlab.in/cdn/shop/files/ART03474_copy_result.jpg?v=1760092449&width=1100" },
      { name: "Silver Whisper Leaf Pendant", price: 1199, image: "https://www.silverlab.in/cdn/shop/files/ART03647_copy_result.jpg?v=1760092449&width=1100" },
      { name: "Ocean Breeze Floral Pendant", price: 1999, image: "https://www.silverlab.in/cdn/shop/files/ART03662_copy_result.jpg?v=1760095032&width=1100" },
      { name: "Blush Bloom Pendant Necklace", price: 6500, image: "https://www.silverlab.in/cdn/shop/files/11F0CF42-BFDF-46FE-BD2F-CC3A76FCE263.jpg?v=1747721531&width=600" }
    ],
    bracelets: [
      { name: "Silver Clover Harmony Charm Bracelet", price: 999, image: "https://www.silverlab.in/cdn/shop/files/ART04027_copy_result_600x600.jpg?v=1747727338" },
      { name: "Tennis Bracelet", price: 5999, image: "https://www.silverlab.in/cdn/shop/files/ART04023copy_result_600x600.jpg?v=1747727007" },
      { name: "Elegant Blossom Silver Bracelet", price: 1499, image: "https://www.silverlab.in/cdn/shop/files/ART04029copy_result_600x600.jpg?v=1747726714" },
      { name: "Silver Sparkle Trio CZ Bracelet", price: 1499, image: "https://www.silverlab.in/cdn/shop/files/ART04030_copy_result_600x600.jpg?v=1747726410" }
    ],
    mensChains: [
      { name: "Classic - Men's Chain", price: 5999, image: "https://www.silverlab.in/cdn/shop/files/ART03766_copy_result_600x600.jpg?v=1747725498" },
      { name: "Trail Links - Men's Chain", price: 4999, image: "https://www.silverlab.in/cdn/shop/files/ART03769_copy_result_600x600.jpg?v=1747725716" },
      { name: "EdgeCraft - Men's Chain", price: 5999, image: "https://www.silverlab.in/cdn/shop/files/IMG-5039_600x600.png?v=1747229407" },
      { name: "Core Link", price: 5999, image: "https://www.silverlab.in/cdn/shop/files/97CE20E8-2755-4519-80BF-4A903F7CBFC3_600x600.png?v=1747246670" }
    ]
  };

  const CategoryCard = ({ product }) => (
    <div className="bg-black rounded-lg overflow-hidden group cursor-pointer relative flex-shrink-0 min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] hover:scale-105 transition-transform duration-300">
      {/* Product Image Area */}
      <div className="relative h-[250px] sm:h-[280px] md:h-[300px] lg:h-[350px] flex items-center justify-center overflow-hidden">
        {/* Product Image */}
        {product.image && product.image.startsWith('http') ? (
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
            <span className="text-gray-500 text-2xl sm:text-3xl md:text-4xl">{product.image}</span>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-3 sm:p-4 bg-black">
        <h3 className="font-semibold text-white mb-2 text-xs sm:text-sm md:text-base line-clamp-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{product.name}</h3>
        <p className="text-sm sm:text-base md:text-lg font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Rs. {product.price.toLocaleString()}</p>
      </div>
    </div>
  );

  const ProductCard = ({ product, showSale = false }) => (
    <div className="bg-black rounded-lg overflow-hidden group cursor-pointer relative min-w-[280px] sm:min-w-[320px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0">
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
          <div className="flex gap-3 sm:gap-4 md:gap-6 min-w-max pb-4 pl-3 sm:pl-4 md:pl-6 pr-3 sm:pr-4 md:pr-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showSale={true} />
            ))}
            {/* View All Card */}
            <div className="bg-[#1a1a1a] rounded-lg min-w-[280px] sm:min-w-[320px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0 h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
              <p className="text-white text-lg sm:text-xl font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>View all</p>
            </div>
          </div>
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
            <div className="flex gap-3 sm:gap-4 md:gap-6 min-w-max pb-4 pl-3 sm:pl-4 md:pl-6 pr-3 sm:pr-4 md:pr-6">
              {categoryProducts[activeCategory]?.map((product, index) => (
                <CategoryCard key={index} product={product} />
              ))}
              {/* View All Card */}
              <div className="bg-[#1B1B1B] rounded-lg min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] flex-shrink-0 h-[350px] sm:h-[380px] md:h-[420px] lg:h-[350px] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300">
                <FiArrowRight className="text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3" />
                <p className="text-white text-sm sm:text-base md:text-lg font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>View all</p>
              </div>
            </div>
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

