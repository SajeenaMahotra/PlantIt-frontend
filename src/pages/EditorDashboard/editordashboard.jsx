import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditorDashboard.css";


const EditorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="editor-dashboard">
      
      <div className="editor-floating-plus" onClick={() => navigate("/createblog")}>
        +
      </div>

     
      <div className="add-plant-button" onClick={() => navigate("/addplantofthemonth")}>
        Add Plant of the Month
      </div>

      
      <div className="content">
        <h1>Welcome, Editor!</h1>
        <p>Manage your blogs and profile here.</p>
      </div>
    </div>
  );
};

export default EditorDashboard;
