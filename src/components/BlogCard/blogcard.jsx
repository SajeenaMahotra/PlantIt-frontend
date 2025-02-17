import React from "react";
import { Link } from "react-router-dom";
import "./blogcard.css";

const BlogCard = ({ id,image, title, date }) => {
  return (
    <div className="blog-card-container">
      <div className="blog-card">
        <img src={image} alt={title} className="blog-image" />
        <div className="blog-content">
          <p className="blog-meta">By PlantIt. {date}</p>
          <h3 className="blog-title">{title}</h3>
          <Link to={`/blog/${id}`} className="read-more">Read More</Link> 
        </div>
      </div>
    </div>
  );
};

export default BlogCard;