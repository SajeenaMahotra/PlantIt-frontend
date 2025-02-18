import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./blogcard.css";

const BlogCard = ({ id,image, title, date,userId}) => {
  const [isSaved, setIsSaved] = useState(false);  
  console.log("BlogCard Props:", { id, image, title, date, userId });
  
  useEffect(() => {
    if (!userId) {
      console.warn("userId is undefined. Skipping API call.");
      return;
    }
    const checkSavedStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/savedblogs/isSaved/${userId}/${id}`);
            setIsSaved(response.data.isSaved);
        } catch (error) {
            console.error("Error checking saved status:", error);
        }
      };
    checkSavedStatus();
  }, [userId, id]);

  const handleSaveToggle = async () => {
    try {
        if (isSaved) {
            await axios.post("http://localhost:5000/savedBlogs/unsave", { user_id: userId, blog_id: id });
        } else {
            await axios.post("http://localhost:5000/savedBlogs/save", { user_id: userId, blog_id: id });
        }
        setIsSaved(!isSaved);
    } catch (error) {
        console.error("Error saving/unsaving blog:", error);
    }
  };
  
  return (
    <div className="blog-card-container">
      <div className="blog-card">
        <img src={image} alt={title} className="blog-image" />
        <div className="blog-content">
          <p className="blog-meta">By PlantIt. {date}</p>
          <h3 className="blog-title">{title}</h3>
          <Link to={`/blog/${id}`} className="read-more">Read More</Link> 
          <button onClick={handleSaveToggle} className={isSaved ? "saved" : "save"}> {isSaved ? "Saved" : "Save"}</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;