import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import Signup from '../Signup/signup';
import axiosInstance from '../../api/axios'; // Import axiosInstance

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // NEW: Track login type (User/Editor)
  const [showSignup, setShowSignup] = useState(false); // Manage signup modal state
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Determine login endpoint based on userType
      const endpoint = userType === 'editor' ? '/editors/login' : '/users/login';
      
      const response = await axiosInstance.post(endpoint, {
        email,
        password,
        role:userType
      });

      // Assuming the backend returns a token and a role
      const { token, role } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Redirect based on the role
      if (role === 'editor') {
        navigate('/editordashboard'); // Redirect to editor dashboard
      } else {
        navigate('/'); // Redirect to home page for regular users
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-section">
        {/* PlantIt Logo Above LOGIN Text */}
        <div className="logo-container">
          <img
            src="/src/assets/plantitlogo.png"
            alt="PlantIt Logo"
            className="plantit-logo"
            onClick={() => navigate("/")}
          />
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

          {/* Dropdown for selecting User or Editor Login */}
          <div className="input-container">
            
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="input-box"
            >
              <option value="user">User</option>
              <option value="editor">Editor</option>
            </select>
          </div>

          <div className="forgot-password">
            <span>Forgot Password?</span>
          </div>
          <button type="submit" className="login-btn">LOGIN</button>
          <div className="signup-prompt">
            <span>Don't have an account?</span>
            <span className="create-account" onClick={() => setShowSignup(true)}>
              Create one
            </span>
          </div>
        </form>
      </div>
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </div>
  );
};

export default Login;
