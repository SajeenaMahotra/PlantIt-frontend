import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Home from './pages/Home/home'; 
import About from './pages/About/about';
import Login from './pages/Login/login'; 
import EditorDashboard from "./pages/EditorDashboard/editordashboard";
import CreateBlog from "./pages/CreateBlog/createblog";
import Footer from "./components/Footer/footer"; 
import Signup from './pages/Signup/signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false); 
  return (
    <Router>
      {showSignup && <Signup onClose={() => setShowSignup(false)} />} {/* Show Signup if triggered */}
      <Routes>
      <Route path="/" element={<><Navbar  setShowSignup={setShowSignup} /><Home setShowSignup={setShowSignup}/><About /></>} /> 
      <Route path="/editordashboard" element={<EditorDashboard />} />
      <Route path="/createblog" element={<CreateBlog />} />

      <Route path="/login" element={<><Login /> <Footer /></>} />
      <Route path="/signup" element={<><Signup onClose={() => setShowSignup(false)} /><Footer /></>} />
      </Routes>
    </Router>  
  );
}

export default App
