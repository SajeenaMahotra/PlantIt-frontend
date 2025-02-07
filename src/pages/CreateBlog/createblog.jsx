import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createblog.css";
import logo from "../../assets/plantitlogo.png";

const CreateBlog = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="create-blog">
      {/* Top Bar with Logo and Menu Icon */}
      <div className="logoimage-bar">
      <div className="menu-img" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <img src={logo} alt="PlantIt Logo" className="imglogo" onClick={() => navigate(-1)}/>
        
      </div>

      {/* Sidebar Menu */}
      {menuOpen && (
        <div className="menu">
          <span>Home</span>
          <span>Your Blog</span>
          <span>Drafts</span>
          <span>Profile</span>
          
        </div>
      )}

      {/* Blog Form */}
      <div className="blog-container">
        {/* Left Side - Image Upload */}
        <div className="image-upload-box">
          {image ? (
            <img src={image} alt="Uploaded" className="uploaded-image" />
          ) : (
            <label className="upload-label">
              +
              <input type="file" accept=".jpeg,.jpg,.png" onChange={handleImageUpload} />
            </label>
          )}
          <p className="image-message">
            We recommend using .jpeg, .jpg, or .png files less than 2MB.
          </p>
        </div>

        {/* Right Side - Blog Details */}
        <div className="blog-details">
          <input type="text" placeholder="Blog Title" className="blog-input" />
          <textarea placeholder="Short Description" className="blog-textarea"></textarea>
          <textarea placeholder="Write your content here..." className="blog-content"></textarea>

          {/* Buttons */}
          <div className="button-group">
            <button className="publish-btn">Publish</button>
            <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
            <button className="draft-btn">Save as Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
