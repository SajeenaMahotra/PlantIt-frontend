import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';
import Signup from '../Signup/signup';
import axiosInstance from '../../api/axios'; 

const Login = ({ setIsLoggedIn, setUserRole ,isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); 
  const [showSignup, setShowSignup] = useState(false); 
  const [rememberMe, setRememberMe] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    
    try {
      const endpoint = userType === 'editor' ? '/editors/login' : '/users/login';
      const response = await axiosInstance.post(endpoint, {
        email,
        password,
        role:userType
      });
      
      const { token, role, userId ,editorId } = response.data;
    
      if (role === 'editor') {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("editorId", editorId);
        sessionStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      } else {
        if (userId) {
          if (rememberMe) {
            localStorage.setItem("token", token);
            localStorage.setItem("role", role); 
            localStorage.setItem("userId", userId);
          }else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("role", role);   
          sessionStorage.setItem("userId", userId); 
          sessionStorage.removeItem("editorId");
        }
      }else{
        console.log("User ID is missing in the response");
      }
    }
      console.log("User ID received:", userId);
      console.log("Editor ID received:", editorId);
      console.log("Role received in Login:", role);
      console.log("setUserRole function:", setUserRole);
      setUserRole(role);

      if (role === 'editor') {
        navigate('/editordashboard'); 
      } else {
        navigate('/'); 
      }
      setIsLoggedIn(true); 
    } catch (error) {
      console.log("Login Error:", error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.message || "Invalid email or password.");
    }
  
    
  };

  return (
    <div className="login-container">
      <div className="login-section">
       
        <div className="logo-container">
          <img src="/src/assets/plantitlogo.png" alt="PlantIt Logo" className="plantit-logo" onClick={() => {if (!isLoggedIn) {navigate("/"); }}}/>
        </div>
        <h2 className="login-title">Login</h2>
       
        {userType === 'editor' && (
            <p className="warning-message">
              * Editors cannot use "Remember Me" due to security and privacy policies.
            </p>
          )}

        {errorMessage && <p className="error-message">{errorMessage} * </p>}

        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-box" required/>
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
          
          <div className="input-container">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="select-box">
              <option value="user">User</option>
              <option value="editor">Editor</option>
            </select>
          </div>

         
          <div className="remember-me-container">
          <label>Remember Me</label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)} 
              disabled={userType === 'editor'} 
            />

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
