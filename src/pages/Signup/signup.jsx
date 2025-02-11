import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import plantitLogo from "/src/assets/plantitlogo.png"; 
import axiosInstance from '../../api/axios'; 

const Signup = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axiosInstance.post("/users/register", {
        name: fullName,
        email,
        password,
        role: "user",
      });
  
      console.log("User registered:", response.data);
      setErrorMessage(""); 
      onClose();
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response ? error.response.data.message : error.message);
      setErrorMessage(error.response?.data?.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <span className="close-icon" onClick={onClose}>&times;</span>

        <div className="logo-container">
          <img src={plantitLogo} alt="PlantIt Logo" className="plantit-logo" onClick={() => navigate("/")} />
        </div>

        <h2 className="signup-title">Signup</h2>

        {errorMessage && <p className="error-message">{errorMessage} * </p>} 

        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <button type="submit" className="signup-btn">Create an Account</button>
        </form>

        <p className="login-prompt">
          Already have an account? <span className="login-link" onClick={() => { onClose(); navigate("/login"); }}>Login.</span>
        </p>
        <p className="terms-text">
          By signing up, you agree to our <span>Terms and Conditions</span> and <span>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
