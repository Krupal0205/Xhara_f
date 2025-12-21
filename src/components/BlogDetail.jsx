import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { API_ENDPOINTS } from '@/config/api';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(API_ENDPOINTS.BLOGS.GET_BY_ID(id));
      const data = await response.json();

      if (data.success) {
        setBlog(data.data.blog);
      } else {
        setError(data.message || 'Blog not found');
      }
    } catch (err) {
      console.error('Fetch blog error:', err);
      setError('Network error. Please check if backend server is running.');
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

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Loading blog...
        </p>
      </div>
    );
  }



  if (!blog) {
    return null;
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
      

        {/* Blog Content */}
        <article className="max-w-4xl mx-auto">
          {/* Blog Image */}
          {blog.image && (
            <div className="mb-6 sm:mb-8 rounded-lg overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Blog Header */}
          <div className="mb-6 sm:mb-8">
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {formatDate(blog.createdAt)}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {blog.title}
            </h1>
            {blog.author && (
              <p className="text-sm sm:text-base text-gray-400" style={{ fontFamily: "'Poppins', sans-serif" }}>
                By {blog.author}
              </p>
            )}
          </div>

          {/* Blog Content */}
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-white text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {blog.content}
            </div>
          </div>
        </article>
        
      </div>
    </div>
  );
};

export default BlogDetail;

