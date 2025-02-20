import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import axios from "../../api/axios"
import "./createblog.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); 
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSaveAsDraft = async () => {
    if (!title || !content || !category || !tags.trim()) {
      alert("Title, content, category, and tags are required.");
      return;
    }

    // Split tags into an array and trim them
    const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);

    // Check if there is at least one valid tag
    if (tagArray.length === 0) {
      alert("At least one tag is required.");
      return;
    }

    const sanitizedContent = DOMPurify.sanitize(content);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", JSON.stringify(tagArray));
    formData.append("status", "draft"); // Save as draft

    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await axios.post('http://localhost:5000/blogs/create', {
        
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Blog saved as draft successfully!");
        // Clear fields after saving as draft
        setTitle("");
        setDescription("");
        setContent("");
        setCategory("");
        setTags("");
        setImage(null);
        setImageFile(null);
      } else {
        alert(data.error || "Failed to save draft");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Something went wrong.");
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Do you want to delete the blog you are working on?");
    if (confirmCancel) {
      // Clear the form and navigate to the editor dashboard
      setTitle("");
      setDescription("");
      setContent("");
      setCategory("");
      setTags("");
      setImage(null);
      setImageFile(null);
      navigate("/editordashboard");
    }
  };

  const handlePublish = async () => {

    if (!title || !content || !category || !tags.trim()) {
      alert("Title, content, category, and tags are required.");
      return;
  }

  // Split tags into an array and trim them
  const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag); // Filter out empty strings
  
  // Check if there is at least one valid tag
  if (tagArray.length === 0) {
    alert("At least one tag is required.");
    return;
  }

    const confirmPublish = window.confirm("Do you want to publish this blog?");
    if (!confirmPublish) return; 

    const sanitizedContent = DOMPurify.sanitize(content);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", JSON.stringify(tagArray)); // Stringify the tags array
    formData.append("status", "published"); 
    if (imageFile) formData.append("image", imageFile); 
    
    console.log(tagArray); // Log the tags array

    try {
      const response = await fetch('http://localhost:5000/blogs/create', {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        
      });
      
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Blog published successfully!");
        // Reset form fields after successful post
        setTitle("");
        setDescription("");
        setContent("");
        setCategory("");
        setTags("");
        setImage(null);
        setImageFile(null);
      } else {
        alert(data.error || "Failed to publish blog");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Something went wrong.");
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
          <input type="text" placeholder="Blog Title" className="blog-input" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Short Description" className="blog-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
          <ReactQuill
            placeholder="Write your content here..." value={content} onChange={setContent} className="quill-editor" />
          <input type="text" placeholder="Category" className="blog-input" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input type="text" placeholder="Tags (separated by commas)" className="blog-input" value={tags} onChange={(e) => setTags(e.target.value)} />
          {successMessage && (<div className="success-message">{successMessage}</div>)}

          <div className="button-group">
            <button className="publish-btn " onClick={handlePublish}>Publish</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            <button className="draft-btn" onClick={handleSaveAsDraft}>Save as Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
