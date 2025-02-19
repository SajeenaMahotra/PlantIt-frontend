import React, { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/plantitlogo.png"; 
import "./editorbar.css";

const EditorBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  
  const handleNavigation = (path) => {
    navigate(path)
    setMenuOpen(false); // Navigate to the given path
  };

   // Close menu when clicking outside
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
  
  return (
    <div className="logoimage-bar">
      <div className="menu-img" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      <img src={logo} alt="PlantIt Logo" className="imglogo" onClick={() => navigate()} />

      {menuOpen && (
        <div className="menu" ref={menuRef}>
          <span onClick={() => handleNavigation("/editordashboard")}>Home</span>
          <span onClick={() => handleNavigation("/your-blog")}>Your Blogs</span>
          <span onClick={() => handleNavigation("/drafts")}>Drafts</span>
          <span onClick={() => handleNavigation("/editorprofile")}>Profile</span>
        </div>
      )}
    </div>
  );
};

export default EditorBar;
