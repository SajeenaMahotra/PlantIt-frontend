import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Home from './pages/Home/home'; 
import About from './pages/About/about';
import Login from './pages/Login/login'; 
import EditorDashboard from "./pages/EditorDashboard/editordashboard";
import CreateBlog from "./pages/CreateBlog/createblog";
import Footer from "./components/Footer/footer"; 

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<EditorDashboard />} />
    //     <Route path="/createblog" element={<CreateBlog />} />
    //   </Routes>
    // </Router>
    <Router>
      <Routes>
      <Route path="/" element={<><Navbar /><Home /><About /></>} /> 
      <Route path="/login" element={<><Login /> <Footer /></>} />
      <Route path="/editordashboard" element={<EditorDashboard />} />
      <Route path="/createblog" element={<CreateBlog />} />
      </Routes>
    </Router>  
  );
}

export default App
