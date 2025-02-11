// Profile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'; // Importing the CSS file

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage or sessionStorage based on Remember Me
    localStorage.removeItem("token"); // Or sessionStorage.removeItem("token");
    
    // Reset login state
    setIsLoggedIn(false);
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile Page</h1>
      {/* Your profile content */}
      
      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
