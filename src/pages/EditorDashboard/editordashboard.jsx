import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditorDashboard.css";


const EditorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="editor-dashboard">
      {/* Floating Plus Button to navigate to Create Blog */}
      <div className="editor-floating-plus" onClick={() => navigate("/createblog")}>
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
