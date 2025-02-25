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
      <h1 className="profile-title">Your PlantIt Profile </h1>

     
       <div className="saved-blogs-section">
        <h2>Saved Blogs</h2>
        <div className="saved-blogs-list">
          {savedBlogs.length > 0 ? (
            savedBlogs.map(blog => (
              blog.Blog ? ( 
              <BlogCard 
              key={blog.id} 
              id={blog.blog_id} 
              image={`http://localhost:5000${blog.Blog.image_path}`} 
              title={blog.Blog.title } 
              date={new Date(blog.saved_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} 
              userId={userId}
              isSaved={true}/>
            ) : (
            <p key={blog.id}>This blog entry is missing details.</p>
          )))
        ) : (
        <p>No saved blogs yet.</p>
        )}
        </div>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <button className="editprofile-btn" onClick={handleEditProfile}>Edit Profile</button>
      
      </div>
  );
};

export default Profile;
