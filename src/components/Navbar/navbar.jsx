import React from 'react';
import { NavLink,useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink} from 'react-scroll';
import Signup from '../../pages/Signup/signup';
import './navbar.css';



const Navbar = ({ setShowSignup }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  

  const handleNavigation = (path) => {
    if (path === "/learn" || path === "/blog" || path === "/profile" ) {
      setShowSignup(true); // Show Signup modal instead of navigating
    } else if (location.pathname === path) {
      window.location.reload(); // Reload if already on the same page
    } else {
      navigate(path);
    }
  };
  
  return (
    <div className="navbar">
      <div className="top-bar">
      <span className='text-content'>
        To explore more, <span className="login-page" onClick={() => navigate('/login')}>LOGIN.</span>
      </span>
    </div>
      <div className="logo">
        <img src="/src/assets/plantitlogo.png" alt="PlantIt Logo" />
      </div>
      <div className='description'><p>-Sow Dreams, Harvest Beauty</p> </div>
      <div className="nav-links">
        <span className={currentPath === "/home" ? "active" : ""} onClick={() => handleNavigation("/")}>Home</span>
        <span className={currentPath === "/learn" ? "active" : ""} onClick={() => handleNavigation("/learn")} >Learn</span>
        <span className={currentPath === "/blog" ? "active" : ""} onClick={() => handleNavigation("/blog")}>Blog</span>
        {/* Smooth Scroll for About */}
        {location.pathname === "/" ? (
          <ScrollLink to="about-section" smooth={true} duration={800} className="nav-link">
            <span>About</span>
          </ScrollLink>
        ) : (
          <NavLink to="/" className="nav-link" onClick={() => navigate("/")}>
            About
          </NavLink>
        )}
        <span className={currentPath === "/profile" ? "active" : ""} onClick={() => handleNavigation("/profile")}>Profile</span>
      </div>
      <button className="search">
        <img src="/src/assets/search.png" alt="Search" />
      </button>  
    </div>
   
  );
}

export default Navbar;
