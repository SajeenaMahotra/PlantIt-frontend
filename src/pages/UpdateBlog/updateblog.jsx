import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import "./updateblog.css"; // Reuse styles from CreateBlog

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token"); 


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
          setTags(data.tags.join(", ")); // Convert array to comma-separated string

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
        setImage(file); // Set the image file
      };
      reader.readAsDataURL(file); // Read the file as Data URL
    }
};

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const confirmUpdate = window.confirm("Do you want to update the blog?");
    if (!confirmUpdate) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description || "");
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", tags);
    if (image) {
      formData.append("image", image);
    }
    formData.append("status", "published");

    try {
        const response = await axiosInstance.put(`http://localhost:5000/blogs/${id}`,formData,{
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        });
        if (response.status === 200) {
          setSuccessMessage("Blog updated successfully!");
          console.log("Response from backend:", response.data);

          setTitle("");
          setDescription("");
          setContent("");
          setCategory("");
          setTags("");
          setImage(null);
          setPreviewImage("");
          setTimeout(() => navigate("/your-blog"), 1000); // Redirect after success
        }
      } catch (error) {
        console.error("Update error:", error);
        alert("Error: " + (error.response?.data?.error || "Something went wrong"));
      }
    };

    return (
    <div className="create-blog">
      <h2>Update Blog</h2>
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

          <button className="update-blog-btn" onClick={handleUpdate}>Update Blog</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
