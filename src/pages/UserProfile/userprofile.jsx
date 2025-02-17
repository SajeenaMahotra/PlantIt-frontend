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
  const [errorMessage, setErrorMessage] = useState("");  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
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
  
  const handlePasswordChange = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setErrorMessage("Please fill all the fields.");
      return false;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return false;
    }
    
    try {
      const response = await axiosInstance.put(`users/changepassword/${userId}`, passwordData, {
        headers: { Authorization: `Bearer ${token}`}
      });

      console.log("Password Change Payload:", passwordData);
      console.log("Sending request to:", `users/changepassword/${userId}`);

      setSuccessMessage("Password changed successfully!");
        setIsModalOpen(false);
        navigate('/userprofile');
    } catch (error) {
        console.error("Error response:", error.response?.data || error.message);

        if (error.response) {
            setErrorMessage(error.response.data.message || "Failed to change password.");
        } else {
            setErrorMessage("An unexpected error occurred.");
        }
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
      <button className="button-update" onClick={() => setIsModalOpen(true)}>Change Password</button>

      {/* Modal for changing password */}
  {isModalOpen && (
  <div className="change-password-modal">
    <div className="change-password-modal-content">
      <button className="change-password-close-modal" onClick={() => setIsModalOpen(false)}>×</button>
      <h3>Change Password</h3>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="change-password-modal-content">
        <input
          type="password"
          placeholder="Current Password"
          value={passwordData.currentPassword}  
          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}  
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwordData.newPassword}  
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}  
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwordData.confirmPassword} 
          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} 
        />
        <button className='change-password-modal-content button' onClick={handlePasswordChange}>Change</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default UserProfile;
