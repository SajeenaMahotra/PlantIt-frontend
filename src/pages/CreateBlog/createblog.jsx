import React, { useState } from "react";
import "./createblog.css";

const CreateBlog = () => {
  const [image, setImage] = useState(null);
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  return (
    <div className="create-blog">
      <div className="blog-container">
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

        
        <div className="blog-details">
          <input type="text" placeholder="Blog Title" className="blog-input" />
          <textarea placeholder="Short Description" className="blog-textarea"></textarea>
          <textarea placeholder="Write your content here..." className="blog-content"></textarea>

          <input type="text" placeholder="Category" className="blog-input"/>
          <input type="text" placeholder="Tags (separated by commas)" className="blog-input"/>
            
            <div className="button-group">
            <button className="publish-btn">Publish</button>
            <button className="cancel-btn">Cancel</button>
            <button className="draft-btn">Save as Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
