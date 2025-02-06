import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import Signup from '../Signup/signup';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false); // Manage signup modal state
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login functionality here
    console.log('Login attempted with', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-section">
        {/* PlantIt Logo Above LOGIN Text */}
        <div className="logo-container" >
          <img src="/src/assets/plantitlogo.png" alt="PlantIt Logo" className="plantit-logo" onClick={() => navigate("/")}/>
        </div>
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-box"
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-box"
              required
            />
          </div>
          <div className="forgot-password">
          <span>Forgot Password?</span></div>
          <button type="submit" className="login-btn">LOGIN</button>
          <div className="signup-prompt">
            <span>Don't have an account?</span>
            <span className="create-account" onClick={() => setShowSignup(true)}>Create one</span>
          </div>
        </form>
      </div>
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </div>  
  );
};

export default Login;
