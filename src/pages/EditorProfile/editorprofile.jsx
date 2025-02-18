import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./editorprofile.css"; 
const EditorProfile = ({ setIsLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState({
    editor_name: "",
    email: "",
    created_at: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const editorId = sessionStorage.getItem("editorId");
  const token = sessionStorage.getItem("token");

  // Fetch editor profile data from the backend
  useEffect(() => {
        if (!editorId && !token) {
          console.error("Editor ID or token is missing or null");
          return;
        }
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/editors/profile/${editorId}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        setEditorData({
          editor_name: response.data.editor_name || "",  
          email: response.data.email || "",              
          created_at: response.data.created_at || "",    
        });

      } catch (error) {
        console.error("Error fetching editor profile:", error);
       
      }
    };

    fetchProfile();
  }, [editorId,token]);

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem("token"); // Ensure this is the correct key
      if (!token) {
        console.error("Token is missing");
        return;
      }
      
      const response = await axios.put(
        `http://localhost:5000/editors/update/${editorId}`,
        {
          editor_name: editorData.editor_name,
          email: editorData.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.message);
      setSuccessMessage("Your profile has been updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        console.error("Response data:", error.response.data); // Log the error response from the backend
        console.error("Status code:", error.response.status); // Log the status code
      }
    }
  };

  const handleLogoutClick = () => {
    // Clear session and local storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("editorId");
    sessionStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Call the handleLogout function from props
    handleLogout();

    // Navigate to the login page
    navigate("/login");
  };

  const handlePasswordChange = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        setErrorMessage("All fields are required.");
        return;
      }
  
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setErrorMessage("New password and confirmation do not match.");
        return;
      }
  
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token is missing");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:5000/editors/changepassword/${editorId}`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setSuccessMessage("Password changed successfully!");
      setErrorMessage("");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
  
  
  return (
    <div className="editor-profile-container">
      <div>
        <label>Editor Name:</label>
        <input type="text" value={editorData.editor_name} onChange={(e) => setEditorData({ ...editorData, editor_name: e.target.value })}/>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={editorData.email} onChange={(e) => setEditorData({ ...editorData, email: e.target.value })}/>
      </div>
      <div>
        <label>Date Joined:</label>
        <input type="text" value={editorData.created_at} disabled/>
        {successMessage && (<div className="success-message"> {successMessage} </div>)}
      </div>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={() => setIsModalOpen(true)}>Change Password</button>
      <button onClick={handleLogoutClick}>Logout</button>

      {isModalOpen && (
  <div className="change-password-modal">
    <div className="change-password-modal-content">
      <button className="change-password-close-modal" onClick={() => setIsModalOpen(false)}>×</button>
      <h3>Change Password</h3>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

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
        <button className="change-password-button" onClick={handlePasswordChange}>Change</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default EditorProfile;
