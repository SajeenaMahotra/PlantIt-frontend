import React, { useState } from 'react';
import './Search.css';  
import { FaSearch } from 'react-icons/fa';  
import axiosInstance from '../../api/axios';
import BlogCard from '../../components/BlogCard/blogcard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || '');

  const handleSearch = async () => {
    try {
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

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              image={blog.imageUrl}
              title={blog.title}
              date={blog.published_at}
              userId={userId}  // Pass userId to the BlogCard
            />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>


    </div>
  );
}

export default Search;
