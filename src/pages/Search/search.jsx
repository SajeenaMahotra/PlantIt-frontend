import React from 'react';
import './Search.css';  
import { FaSearch } from 'react-icons/fa';  

const Search = () => {
  return (
    <div className="search-page">
      {/* Search Bar */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search PlantIt..." 
        />
        <button className="search-button">
          <FaSearch size={20} color="white" />
        </button>
      </div>
    </div>
  );
}

export default Search;
