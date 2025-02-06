import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Home from './pages/Home/home'; 
import About from './pages/About/about';
import Login from './pages/Login/login'; 
import Footer from "./components/Footer/footer"; 

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<><Navbar /><Home /><About /></>} /> {/* Home Page */}
      <Route path="/login" element={<><Login /> <Footer /></>} />
      </Routes>
    </Router>  
  );
}

export default App
