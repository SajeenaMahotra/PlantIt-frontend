import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditorDashboard.css";
import logo from "../../assets/plantitlogo.png"; // Update path to your logo

const EditorDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="editor-dashboard">
      {/* Top Bar with Logo and Menu Icon */}
      <div className="image-bar">
        <img src={logo} alt="PlantIt Logo" className="logo" />
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      {/* Sidebar Menu */}
      {menuOpen && (
        <div className="menu">
          <span>Home</span>
          <span>Your Blog</span>
          <span>Drafts</span>
          <span>Profile</span>
        </div>
      )}

      {/* Floating Plus Button to navigate to Create Blog */}
      <div className="floating-plus" onClick={() => navigate("/createblog")}>
        +
      </div>

      {/* Main Content */}
      <div className="content">
        <h1>Welcome, Editor!</h1>
        <p>Manage your blogs and profile here.</p>
      </div>
    </div>
  );
};

export default EditorDashboard;
