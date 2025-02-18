import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Profile.css';
import BlogCard from "../../components/BlogCard/blogcard"

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const [savedBlogs, setSavedBlogs] = useState([]);

  useEffect(() => {
    if (userId) {
      const fetchSavedBlogs = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/savedblogs/user/${userId}`);
          console.log("Saved Blogs Data:", response.data); // Debugging step
          setSavedBlogs(response.data); // Update state with the list of saved blogs
        } catch (error) {
          console.error("Error fetching saved blogs:", error);
        }
      };
      fetchSavedBlogs();
    }
  }, [userId]);

  const handleLogout = () => {
    // Clear session and local storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    localStorage.removeItem("token"); 
    localStorage.removeItem("role");
    localStorage.removeItem("userId")
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/userprofile");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Welcome to your Profile </h1>

       {/* Display saved blogs */}
       <div className="saved-blogs-section">
        <h2>Saved Blogs</h2>
        <div className="saved-blogs-list">
  {savedBlogs.length > 0 ? (
    savedBlogs.map(blog => (
      blog.Blog ? ( // Check if Blog exists before accessing its properties
        <BlogCard 
          key={blog.id} 
          id={blog.blog_id} 
          image={blog.Blog.image_path || "default_image.jpg"} // Use a fallback image
          title={blog.Blog.title || "Untitled Blog"} 
          date={blog.saved_at} 
        />
      ) : (
        <p key={blog.id}>This blog entry is missing details.</p>
      )
    ))
  ) : (
    <p>No saved blogs yet.</p>
  )}
</div>
      </div>

      {/* Edit Profile and Logout Buttons */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <button className="editprofile-btn" onClick={handleEditProfile}>Edit Profile</button>
      
      
     
    </div>
  );
};

export default Profile;
