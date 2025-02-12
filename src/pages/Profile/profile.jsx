import React from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'; 

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/userprofile");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile Page</h1>
     <button className="logout-btn" onClick={handleLogout}> Logout </button>
      <button className="editprofile-btn" onClick={handleEditProfile}>Edit Profile</button>
      <div className="floating-plus" >+</div>
    </div>
  );
};

export default Profile;
