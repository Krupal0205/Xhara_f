import React from 'react';

const BlogSection = () => {
  const blogs = [
    {
      title: "Silver Prices Are Rising – Why Now is the Best Time to Invest in 925 Sterling Silver Jewelry",
      date: "SEPTEMBER 25, 2025",
      excerpt: "Silver has always been a timeless metal – cherished for its shine, elegance, and value. But did you know that silver prices are hitting record highs in 2025? This makes silver...",
      image: "https://www.silverlab.in/cdn/shop/articles/ART01555_result_612b3994-eb83-449e-a110-30ad86256809.jpg?v=1760171903&width=1500"
    },
    {
      title: "This Diwali, Gift Silver That Truly Shines – Explore 925 Sterling Silver Jewelry by Silverlab",
      date: "SEPTEMBER 20, 2025",
      excerpt: "Silver Is the New Gold This Diwali In a world of fleeting trends, silver jewelry holds timeless value. This Diwali, skip the generic gifts and choose something meaningful, elegant, and...",
      image: "https://createcustomwishes.com/wp-content/uploads/2025/09/Download-798-Free-Diwali-2025-Editable-Templates.jpg"
    },
    {
      title: "Celebrate Diwali 2025 with the Timeless Shine of 925 Sterling Silver",
      date: "SEPTEMBER 5, 2025",
      excerpt: "This Diwali, when your home lights up with diyas, let your celebrations shine with the purity of sterling silver. At Silverlab, we don't just sell jewelry—we help you create memories that...",
      image: "https://www.newmynamepix.com/upload/post/sample/1754634550_2025_Diwali_Poster_Business_Branding_Template_Editing_Customize_Create.jpg"
    }
  ];

  return (
    <section className="bg-black pt-8 sm:pt-12 md:pt-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center sm:text-left" style={{ fontFamily: "'Poppins', sans-serif" }}>Blogs</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {blogs.map((blog, index) => (
            <article key={index} className="bg-[#f6f5ec] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-gray-700 mb-2 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>{blog.date}</p>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 underline" style={{ fontFamily: "'Poppins', sans-serif" }}>{blog.title}</h3>
                <p className="text-gray-700 line-clamp-3 text-sm sm:text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>{blog.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center">
          <button className="bg-white text-black px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
            View all
          </button>
        </div>
      </div>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
        <div className="text-center">
          <h2 className="text-1xl sm:text-[20px] md:text-[25px] lg:text-[25px] font-bold text-white mb-4 sm:mb-6">
            Silverlab by Sterlingcommune Design
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[16px] mb-4 leading-relaxed">
              Indulge in the finest luxury with our handpicked jewelry collection, crafted to suit everyone's style. our brand is known for delivering superior quality and lasting elegance, setting a new standard in craftsmanship.
            </p>
            <p className="text-white text-sm sm:text-base">
              Customer Care: Support@silverlab.in
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

