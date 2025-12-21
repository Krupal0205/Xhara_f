import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import heroVideo from '../image/WhatsApp Video 2025-12-07 at 18.54.28_4625a532.mp4';

const Hero = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cards = [
    { id: 'her', name: 'HER' },
    { id: 'him', name: 'HIM' },
    { id: 'spring', name: 'SPRING SPARKLE' },
    { id: 'gifting', name: 'GIFTING' }
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      
      setScrollProgress(progress);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < maxScroll - 1);
    };

    container.addEventListener('scroll', updateScrollState);
    updateScrollState();

    return () => container.removeEventListener('scroll', updateScrollState);
  }, []);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.clientWidth * 0.8; // Approximate card width
      container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.clientWidth * 0.8; // Approximate card width
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };
  const categories = [
    {
      name: 'Rings',
      icon: <img src="https://www.silverlab.in/cdn/shop/files/diamond-ring.png?v=1749487024&width=150" alt="Ring" className='w-20 h-20 color-white' />,
      route: '/products/rings'
    },
    {
      name: 'pendant chain',
      icon: <img src="https://www.silverlab.in/cdn/shop/files/jewelry.png?v=1749487024&width=150" alt="Pendant Chain" className='w-20 h-20 color-white' />,
      route: '/products/chain'
    },
    {
      name: 'Studs',
      icon: <img src="https://www.silverlab.in/cdn/shop/files/earring.png?v=1749487025&width=150" alt="Studs" className='w-20 h-20 color-white' />,
      route: '/products/earrings'
    },
    {
      name: 'Bracelets',
      icon: <img src="https://www.silverlab.in/cdn/shop/files/bracelet.png?v=1749488485&width=150" alt="Bracelets" className='w-20 h-20 color-white' />,
      route: '/products/bracelets'
    }
  ];

  return (
    <>
      {/* Video Hero Section */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-screen min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 "></div>
      </section>

      {/* Pick Your Sparkle Style Section */}
      <section className="bg-black py-8 sm:py-12 md:py-16">
  <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
    
    {/* Title */}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-6 sm:mb-8 md:mb-12 text-center sm:text-left">
      Pick Your Sparkle Style
    </h2>

    {/* Cards */}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">

      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => {
            if (category.route) {
              navigate(category.route);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="
            bg-[#1B1B1B]
            transition-all
            rounded-md
            flex flex-col
            items-center
            justify-between
            py-6 sm:py-8 md:py-14
            px-2 sm:px-4
            cursor-pointer
            shadow-sm
            hover:scale-105
            transform
          "
        >
          {/* Icon */}
          <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
              {category.icon}
            </div>
          </div>

          {/* Text + Arrow */}
          <div className="flex items-center gap-1 sm:gap-2 mt-6">
            <span className="text-white text-xs sm:text-sm md:text-base tracking-wide text-center">
              {category.name}
            </span>
            <FiArrowRight className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
          </div>
        </div>
      ))}

     </div>
   </div>
 </section>

      {/* HER, HIM, SPRING SPARKLE, GIFTING Section */}
      <section className="bg-black">
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide" 
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex gap-3 sm:gap-4 md:gap-6 min-w-max px-3 sm:px-4 md:px-6">
            {/* HER Section */}
            <div 
              onClick={() => {
                navigate('/products/women');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative h-[250px] sm:h-[300px] md:h-[400px] w-[250px] sm:w-[300px] md:w-[400px] flex-shrink-0 overflow-hidden group cursor-pointer transition-all duration-500"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url(https://www.silverlab.in/cdn/shop/files/MBH3516_large.jpg?v=1751286944)`
                }}
              >
                {/* Dark Overlay for better text visibility */}
                <div className="absolute inset-0   transition-colors duration-500"></div>
              </div>
              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 ">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-500">HER</h3>
              </div>
            </div>

            {/* HIM Section */}
            <div 
              onClick={() => {
                navigate('/products/men');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative h-[250px] sm:h-[300px] md:h-[400px] w-[250px] sm:w-[300px] md:w-[400px] flex-shrink-0 overflow-hidden group cursor-pointer transition-all duration-500"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url(https://www.silverlab.in/cdn/shop/files/good-faces-3shofT2lVBk-unsplash_large.jpg?v=1719818059)`
                }}
              >
                {/* Dark Overlay for better text visibility */}
                <div className="absolute inset-0  transition-colors duration-500"></div>
              </div>
              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-500">HIM</h3>
              </div>
            </div>

            {/* SPRING SPARKLE Section */}
            <div 
              onClick={() => {
                navigate('/complete-sets');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative h-[250px] sm:h-[300px] md:h-[400px] w-[250px] sm:w-[300px] md:w-[400px] flex-shrink-0 overflow-hidden group cursor-pointer transition-all duration-500"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url(https://www.silverlab.in/cdn/shop/files/B6C4122F-AB13-4DD8-9565-F11E36F73950_large.png?v=1747740876)`
                }}
              >
                {/* Dark Overlay for better text visibility */}
                <div className="absolute inset-0  transition-colors duration-500"></div>
              </div>
              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center px-2 sm:px-4 group-hover:scale-110 transition-transform duration-500">SPRING SPARKLE</h3>
              </div>
            </div>

            {/* GIFTING Section */}
            <div 
              onClick={() => {
                navigate('/gifting');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative h-[250px] sm:h-[300px] md:h-[400px] w-[250px] sm:w-[300px] md:w-[400px] flex-shrink-0 overflow-hidden group cursor-pointer transition-all duration-500"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url(https://www.silverlab.in/cdn/shop/files/cat-han-BJ3grTerqY4-unsplash_large.jpg?v=1724148564)`
                }}
              >
                {/* Dark Overlay for better text visibility */}
                <div className="absolute inset-0  transition-colors duration-500"></div>
              </div>
              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-500">GIFTING</h3>
              </div>
            </div>
          </div>
        </div>

        
        {/* XHARA Logo Row - Scrolling animation (Right to Left) */}
        <div className="bg-black py-4 sm:py-6 w-full overflow-hidden relative">
          <div className="flex animate-scroll-right-to-left whitespace-nowrap">
            {/* First set of Xhara text */}
            {Array.from({ length: 15 }).map((_, i) => (
              <h4 
                key={`first-${i}`}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-wider whitespace-nowrap mx-3 sm:mx-4 md:mx-8 inline-block"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
              >
                Xhara
              </h4>
            ))}
            
          </div>
        </div>
      </section>
 
      </>
    );
  };
  
  export default Hero;

