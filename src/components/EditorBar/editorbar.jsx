import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/plantitlogo.png"; 
import "./editorbar.css";

const EditorBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleProfileClick = () => {
    navigate("/editorprofile");};

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given path
  };
    
    return (
    <div className="logoimage-bar">
      <div className="menu-img" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      <img src={logo} alt="PlantIt Logo" className="imglogo" onClick={() => navigate()} />

      {menuOpen && (
        <div className="menu">
          <span onClick={() => handleNavigation("/editordashboard")}>Home</span>
          <span onClick={() => handleNavigation("/your-blog")}>Your Blog</span>
          <span onClick={() => handleNavigation("/drafts")}>Drafts</span>
          <span onClick={() => handleProfileClick("/profile")}>Profile</span>
        </div>
      )}
    </div>
  );
};

export default EditorBar;
