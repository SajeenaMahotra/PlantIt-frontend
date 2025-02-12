import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios'; 
import './UserProfile.css';


const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    createdAt: ''
  });
  const [successMessage, setSuccessMessage] = useState("");
  
  const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
 

  useEffect(() => {
    if (!userId || !token) {
      console.error("User ID or token is missing or null");
      return;
    }

    const fetchUserProfile = async () => {
        try {
          const response = await axiosInstance.get(`/users/${userId}`, {
            headers: {
              "Authorization": `Bearer ${token}` 
            }
          });
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
  
      fetchUserProfile();
    }, [userId, token]); 

  const handleUpdateProfile = async () => {
    try {
      const response = await axiosInstance.put(`/users/${userData.id}`, userData);
      console.log("Profile updated", response.data);
      setSuccessMessage("Your profile has been updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="userprofile-container">
      <div className="userprofile-info">
        <div className="userprofile-input">
          <label>Full Name</label>
          <input
            type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })}/>
        </div>
        <div className="userprofile-input">
          <label>Email</label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </div>
        <div className="userprofile-input">
          <label>Date Joined</label>
          <input
            type="text"
            value={userData.createdAt}  
            disabled
          />
        </div>
        {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}
      </div>
      <button className="button-update"  onClick={handleUpdateProfile}>Update</button>
      <button className="button-update">Change</button>
    </div>
  );
};

export default UserProfile;
