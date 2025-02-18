import React from "react";
import "./draftcard.css";
import { useNavigate } from "react-router-dom";

const DraftCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();
  
  return (
    <div className="draft-card">
      <img src={`http://localhost:5000${blog.image_path}`} alt={blog.title} className="draft-image"/>{console.log(`Image URL: http://localhost:5000${blog.image_path}`)}  {/* Log the image URL */}
      <div className="draft-content">
        <h3>{blog.title}</h3>
        <div className="draftblog-actions">
          <button className="draft-view-btn" onClick={() => navigate(`/draftupdate/${blog.id}`)}>View</button>
          <button className="draft-delete-btn" onClick={() => onDelete(blog.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DraftCard;
