import React from "react";
import "./editorblogcard.css";
import { useNavigate } from "react-router-dom";

const EditorBlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();
  
  return (
    <div className="editor-blog-card">
      <img src={`http://localhost:5000${blog.image_path}`} alt={blog.title} className="editor-blog-image"/>{console.log(`Image URL: http://localhost:5000${blog.image_path}`)}  {/* Log the image URL */}
      <div className="editor-blog-content">
        <h3>{blog.title}</h3>
        <div className="blog-actions">
          <button className="editor-update-btn" onClick={() => navigate(`/update-blog/${blog.id}`)}>Update</button>
          <button className="editor-delete-btn" onClick={() => onDelete(blog.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default EditorBlogCard;
