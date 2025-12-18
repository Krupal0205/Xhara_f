import React from 'react';
import aboutVideo from '../image/832e37d57af248858c09914907f9845b.HD-720p-2.1Mbps-31452296.mp4';
import commitmentImage from '../image/Screenshot 2025-12-09 223517.png';

const AboutSection = () => {
  return (
    <section className="bg-black pt-8 sm:pt-12 md:pt-20 w-full">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Welcome to Silverlab</h2>
          <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 px-2">
            Our Motto <strong>"To bring you happiness and to spread happiness"</strong>, is at the core of everything we do, 
            which is why we offer fast shipping in every corner of india, listen to any feedback we receive, 
            and respond to your questions and requests as quickly as we can. Like the whole team of silver lab Team 
            always goes the extra mile and loves finding the perfect solution to make you happy.
          </p>
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-white border border-white rounded-lg hover:bg-gray-900 transition-colors mb-6 sm:mb-8 text-sm sm:text-base">
            Learn more
          </button>
        </div>
      </div>
      
      {/* Video Section - Full Screen */}
      <div className="w-full mt-6 sm:mt-8">
        {/* Full Screen Video */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-screen min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={aboutVideo} type="video/mp4" />
          </video>
        </div>

        {/* Scrolling XHARA Text - Black Bar Below Video */}
        <div className="bg-black py-3 sm:py-4 overflow-hidden">
          <div className="flex animate-scroll">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="text-lg sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap mx-4 sm:mx-6">
                XHARA
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Our Commitments Section */}
      <div className="bg-black py-8 sm:py-12 md:py-20 w-full">
        <div className="w-full px-3 sm:px-4 md:px-6">
          <div className='text-center'>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 sm:mb-12">Our commitments</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {/* Commitment 1: Shine that never fades */}
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 relative">
                <img src="https://www.silverlab.in/cdn/shop/files/Untitled_design_3.png?v=1748846539&width=150" alt="Shine that never fades" className='w-full h-full rounded-full object-cover' />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Shine that never fades</h3>
              <p className="text-white text-sm sm:text-base px-2">
                Just like your traditions, it stays strong and beautiful through generations.
              </p>
            </div>

            {/* Commitment 2: Exceptional quality */}
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 relative">
                <img src="https://www.silverlab.in/cdn/shop/files/WEF.png?v=1721455581&width=150" alt="Exceptional quality" className='w-full h-full rounded-full object-cover' />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Exceptional quality</h3>
              <p className="text-white text-sm sm:text-base px-2">
                quality that speaks for itself
              </p>
            </div>

            {/* Commitment 3: Certified products */}
            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 relative">
                <img src="https://www.silverlab.in/cdn/shop/files/Untitled-1.png?v=1721455581&width=150" alt="Certified products" className='w-full h-full rounded-full object-cover' />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Certified products</h3>
              <p className="text-white text-sm sm:text-base px-2">
                All articles are certified by trusted entities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section Below Commitments */}
      <div className="bg-black w-full">
        <div className="w-full">
          <div className="w-full">
            <img 
              src={commitmentImage} 
              alt="Commitment showcase" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

