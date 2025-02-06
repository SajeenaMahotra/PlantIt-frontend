import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import plantitLogo from "/src/assets/plantitlogo.png"; // Adjust path if needed

const Signup = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Add signup functionality here
    console.log("Signup attempted with", { fullName, email, password, confirmPassword });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <span className="close-icon" onClick={onClose}>&times;</span>

        {/* Logo - Clicking navigates to Home */}
        <div className="logo-container">
          <img src={plantitLogo} alt="PlantIt Logo" className="plantit-logo" onClick={() => navigate("/")} />
        </div>

        <h2 className="signup-title">Signup</h2>

        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <button type="submit" className="signup-btn">Create an Account</button>
        </form>

        <p className="login-prompt">
          Already have an account? <span className="login-link" onClick={onClose}>Login.</span>
        </p>

        <p className="terms-text">
          By signing up, you agree to our <span>Terms and Conditions</span> and <span>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
