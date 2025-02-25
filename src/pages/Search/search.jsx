import React, { useState,useEffect } from 'react';
import './Search.css';  
import { FaSearch } from 'react-icons/fa';  
import axiosInstance from '../../api/axios';
import BlogCard from '../../components/BlogCard/blogcard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || '');



  useEffect(() => {
    if (userId) {
      fetchRecommendations();
    }
  }, [userId]);
  
  const fetchRecommendations = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:5000/blogrecommendations/recommendations/${userId}`);
      setRecommendedBlogs(response.data);  
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendedBlogs([]); 
    }
  };

  const handleSearch = async () => {
    try {
      if (!query.trim()) return;
      const response = await axiosInstance.get(`http://localhost:5000/blogs/search/blogs?query=${query}`);
      setSearchResults(response.data);  // Set the blogs data
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);  // Reset results in case of an error
    }
  };


  return (
    <div className="search-page">
      <div className="search-container">
        <input type="text"  className="search-input" placeholder="Search PlantIt..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch size={20} color="white" />
        </button>
      </div>

      {/* Show recommendations only if no search query */}
      {query === '' && recommendedBlogs.length > 0 && (
        <div className="recommended-section">
          <h2>Recommended for You</h2>
          <div className="blog-list">
            {recommendedBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                image={`http://localhost:5000${blog.image_path}`}
                title={blog.title}
                date={new Date(blog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                userId={userId}
              />
            ))}
          </div>
        </div>
      )}

      {/* Show search results only if there's a query */}
      {query !== '' && (
        <div className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                image={blog.imageUrl}
                title={blog.title}
                date={new Date(blog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                userId={userId}
              />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
