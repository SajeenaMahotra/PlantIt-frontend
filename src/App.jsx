import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import EditorBar from './components/EditorBar/editorbar';
import Home from './pages/Home/home'; 
import About from './pages/About/about';
import Login from './pages/Login/login'; 
import EditorDashboard from "./pages/EditorDashboard/editordashboard";
import CreateBlog from "./pages/CreateBlog/createblog";
import Footer from "./components/Footer/footer"; 
import Signup from './pages/Signup/signup';
import TopBar from './components/Navbar/topbar';
import Profile from './pages/Profile/profile';
import UserProfile from './pages/UserProfile/userprofile';
import EditorProfile from './pages/EditorProfile/editorprofile'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false); 
  const [userRole, setUserRole] = useState(null); 

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login state
    setUserRole(null);    // Reset user role
  };


  useEffect(() => {
    // Check if token exists in localStorage or sessionStorage
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }else{
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);
  
  return (
    <Router>
      {!isLoggedIn && <TopBar />}{/* Show TopBar only if not logged in */}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />} {/* Show Signup if triggered */}
      <Routes>
      <Route path="/" element={<><Navbar setShowSignup={setShowSignup} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Home setShowSignup={setShowSignup} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/><About /></>} /> 
      <Route path="/login" element={<><Login setIsLoggedIn={setIsLoggedIn}  setUserRole={setUserRole} /> <Footer /></>} />
      <Route path="/signup" element={<><Signup onClose={() => setShowSignup(false)} /><Footer /></>} />
      <Route path="/profile" element={<><Navbar setShowSignup={setShowSignup} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/><Profile setIsLoggedIn={setIsLoggedIn} /></>} />
      <Route path="/userprofile" element={<><Navbar/><UserProfile /></>} /> 
      <Route path="/editordashboard" element={<><EditorBar /><EditorDashboard /></>} />
      <Route path="/createblog" element={<><EditorBar /><CreateBlog /></>} />
      <Route path="/editorprofile" element={<><EditorBar /><EditorProfile setIsLoggedIn={setIsLoggedIn}   handleLogout={handleLogout}/></>} />
      
      
      </Routes>
    </Router>  
  );
}

export default App;
