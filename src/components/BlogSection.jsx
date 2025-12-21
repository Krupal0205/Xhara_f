import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '@/config/api';

const BlogSection = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // Fetch only published blogs for public page
      const response = await fetch(`${API_ENDPOINTS.BLOGS.GET_ALL}?published=true`);
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data.blogs || []);
      }
    } catch (err) {
      console.error('Fetch blogs error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format date to "MONTH DAY, YEAR" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`.toUpperCase();
  };

  // Get excerpt from content (first 150 characters)
  const getExcerpt = (content) => {
    if (!content) return '';
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  };

  // Display first 3 blogs initially
  const displayedBlogs = blogs.slice(0, 3);
  const hasMoreBlogs = blogs.length > 3;

  return (
    <section className="bg-black pt-8 sm:pt-12 md:pt-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center sm:text-left" style={{ fontFamily: "'Poppins', sans-serif" }}>Blogs</h2>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-white text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Loading blogs...
            </p>
          </div>
        ) : displayedBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
              No blogs available at the moment.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              {displayedBlogs.map((blog) => (
                <article 
                  key={blog._id} 
                  onClick={() => {
                    navigate(`/blog/${blog._id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#f6f5ec] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="text-xs sm:text-sm text-gray-700 mb-2 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {formatDate(blog.createdAt)}
                    </p>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 underline" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {blog.title}
                    </h3>
                    <p className="text-gray-700 line-clamp-3 text-sm sm:text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {getExcerpt(blog.content)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            {hasMoreBlogs && (
              <div className="text-center">
                <button 
                  onClick={() => {
                    navigate('/blogs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white text-black px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base" 
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  View all
                </button>
              </div>
            )}
          </>
        )}
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

