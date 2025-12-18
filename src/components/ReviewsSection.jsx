import React from 'react';

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Mr. Anant",
      text: "Amazing product and must buy one of the finest silver jewelry piece i ever had.",
      image: "https://www.silverlab.in/cdn/shop/files/ART03770_copy_result.jpg?v=1747726211&width=750"
    },
    {
      name: "Ishika",
      text: "just WOW This silver piece really feels elegant and its design is so classy i love it thank you silverlab.",
      image: "https://www.silverlab.in/cdn/shop/files/ART04029copy_result.jpg?v=1747726714&width=500"
    },
    {
      name: "Mehek",
      text: "One of the best ever product i ever bought online, jesa online dikha raha hai waisa same high quality product recieved.",
      image: "https://www.silverlab.in/cdn/shop/files/ART03624_copy_result.jpg?v=1760095032&width=500"
    }
  ];

  return (
    <section className="bg-black py-8 sm:py-12 md:py-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="max-w-[1150px] mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 text-center sm:text-left">Reviews</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div key={index} className="flex flex-col">
              {/* Jewelry Image */}
              <div className="w-full h-48 sm:h-56 md:h-64 bg-black mb-0 overflow-hidden">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Review Text Section - Dark Background */}
              <div className="bg-[#1B1B1B] p-4 sm:p-6">
                <p className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{review.name}</p>
                <p className="text-gray-300 italic text-xs sm:text-sm md:text-base">"{review.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

