import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Home from './pages/Home/home'; 
import About from './pages/About/about';
import Login from './pages/Login/login'; 
import EditorDashboard from "./pages/EditorDashboard/editordashboard";
import CreateBlog from "./pages/CreateBlog/createblog";
import Footer from "./components/Footer/footer"; 
import Signup from './pages/Signup/signup';
import TopBar from './components/Navbar/topbar';
import Profile from './pages/Profile/profile';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false); 
  const [userRole, setUserRole] = useState(null); // Add role state here


  useEffect(() => {
    // Check if token exists in localStorage or sessionStorage
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);
  
  return (
    <Router>
      {!isLoggedIn && <TopBar />} {/* Show TopBar only if not logged in */}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />} {/* Show Signup if triggered */}
      <Routes>
      <Route path="/" element={<><Navbar setShowSignup={setShowSignup} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Home setShowSignup={setShowSignup} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/><About /></>} /> 
      <Route path="/editordashboard" element={<EditorDashboard />} />
      <Route path="/createblog" element={<CreateBlog />} />
      <Route path="/login" element={<><Login  setIsLoggedIn={setIsLoggedIn}  setUserRole={setUserRole} /> <Footer /></>} />
      <Route path="/signup" element={<><Signup onClose={() => setShowSignup(false)} /><Footer /></>} />
      <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} 
        />

      </Routes>
    </Router>  
  );
}

export default App
