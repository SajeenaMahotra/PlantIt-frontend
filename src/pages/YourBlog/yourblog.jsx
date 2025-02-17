import React, { useEffect, useState } from "react";
import axiosInstance from "axios";
import EditorBlogCard from "../../components/EditorBlogCard/editorblogcard";
import "./yourblog.css";  

const YourBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const editorId = sessionStorage.getItem("editorId"); 
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/blogs/published/${editorId}`);
        console.log(response.data);  // Log to see the structure of the response
        setBlogs(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [editorId]);

  const handleUpdate = (blogId) => {
    console.log("Update blog with ID:", blogId);
  };

  const handleDelete = async (blogId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this blog?");
    if (isConfirmed) {
      try {
        const token = sessionStorage.getItem("token");
        
        if (!token) {
          console.error("No token found");
          alert("No token found. Please log in again.");
          return;
        }
        const response =await axiosInstance.delete(`http://localhost:5000/blogs/${blogId}`, {headers: {Authorization: `Bearer ${token}`,},});
        console.log(response.data); // Log the response
        setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== blogId));
        setSuccessMessage("Blog deleted successfully.");
      } catch (error) {
        console.error("Error deleting blog:", error);
        if (error.response) {
          console.error("Error response:", error.response.data); // Log detailed error response
        }
        alert("Error deleting the blog.");
      }
    }
  };

  return (
    <div>
      <div className="your-blogs-title"> <h2>Your Published Blogs</h2></div>
      {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <EditorBlogCard
            key={blog.id}
            blog={blog}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No published blogs found.</p>
      )}
    </div>
  );
};

export default YourBlogs;
