import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import "./draftupdate.css"; // Reuse styles from CreateBlog

const DraftUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token"); 


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null); 
  const [previewImage, setPreviewImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSaveDraft = async () => {
    if (!title || !content || !category || !tags.trim()) {
      alert("Title, content, category, and tags are required.");
      return;
    }
  
    // Split tags into an array, trim them, and remove empty entries
    const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);
  
    if (tagArray.length === 0) {
      alert("At least one tag is required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", tagArray); // No need to stringify, assuming backend expects an array
    formData.append("status", "draft"); 
  
    if (imageFile) formData.append("image", imageFile);
  
    try {
        const response = await axiosInstance.put(`http://localhost:5000/blogs/${id}`,formData,{
            headers:{
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            }
          });
  
      if (response.status === 200) {
        setSuccessMessage("Draft updated successfully!");
      } else {
        alert(response.data.error || "Failed to update draft.");
      }
    } catch (error) {
      console.error("Error updating draft:", error);
      alert(error.response?.data?.error || "Something went wrong.");
    }
  };

  // Fetch blog details
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/blogs/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await response.data;
        
          setTitle(data.title);
          setDescription(data.description);
          setContent(data.content);
          setCategory(data.category);
          setTags(Array.isArray(data.tags) ? data.tags.join(", ") : "");// Convert array to comma-separated string

          if (data.image_path){
            setPreviewImage (`http://localhost:5000${data.image_path.startsWith("/") ? data.image_path : `/${data.image_path}`}`);
          }else{
            setPreviewImage("");
          }
        } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
  
    fetchBlogDetails();
  }, [id]); 

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImageFile(file); // Set the image file
      };
      reader.readAsDataURL(file); // Read the file as Data URL
    }
};

    const handlePublish = async () => {

        if (!title || !content || !category || !tags.trim()) {
          alert("Title, content, category, and tags are required.");
          return;
      }
    
      // Split tags into an array and trim them
      const tagArray = tags.split(",") // Filter out empty strings
      
      // Check if there is at least one valid tag
      if (tagArray.length === 0) {
        alert("At least one tag is required.");
        return;
      }
    
        const confirmPublish = window.confirm("Do you want to publish this blog?");
        if (!confirmPublish) return; 
    
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

    const handleCancel = () => {
        navigate("/drafts"); // Redirect to blog list
      };
  

    return (
    <div className="create-blog">
      <h2>Update your Draft</h2>
      <div className="blog-container">
      <div className="image-upload-box">
          {previewImage && (
            <img src={previewImage} alt="Preview" className="uploaded-image" />
          )}
          <label className="upload-label">
            +
            <input type="file" accept=".jpeg,.jpg,.png" onChange={handleImageUpload}  style={{ display: "none" }} />
          </label>
          <p className="image-message">We recommend using .jpeg, .jpg, or .png files less than 2MB.</p>
        </div>

        <div className="blog-details">
          <input type="text" placeholder="Blog Title" className="blog-input" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Short Description" className="blog-textarea" value={description || ""} onChange={(e) => setDescription(e.target.value)} />
          <textarea placeholder="Write your content here..." className="blog-content" value={content} onChange={(e) => setContent(e.target.value)} />
          <input type="text" placeholder="Category" className="blog-input" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input type="text" placeholder="Tags (separated by commas)" className="blog-input" value={tags} onChange={(e) => setTags(e.target.value)} />
          {successMessage && (<div className="success-message">{successMessage}</div>)}

          <button className="update-blog-btn" onClick={handlePublish}>Publish </button>
          <button className="cancel-blog-btn" onClick={handleCancel}>Cancel </button>
          <button className="draft-blog-btn" onClick={handleSaveDraft}>Save Draft</button>


        </div>
      </div>
    </div>
  );
};

export default DraftUpdate;
