// src/pages/EditorProfile/EditorProfile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function EditorProfile({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage and sessionStorage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    
    // Set the logged-in state to false
    setIsLoggedIn(false);
    
    // Redirect to Home page after logout
    navigate('/');
  };

  return (
    <div>
      <h2>Editor Profile</h2>
      {/* You can display editor information here (for example, name, email, etc.) */}
      <div>
        <p>Welcome, Editor!</p>
        {/* Add more profile details here */}
      </div>
      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default EditorProfile;
