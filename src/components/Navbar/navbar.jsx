import React from 'react';
import { NavLink,useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink} from 'react-scroll';
import './navbar.css';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      // Reload the page if already on the same route
      window.location.reload();
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
        <span className={currentPath === "/learn" ? "active" : ""} onClick={() => handleNavigation("/learn")}>Learn</span>
        <span className={currentPath === "/blog" ? "active" : ""} onClick={() => handleNavigation("/blog")}>Blog</span>
        <span className={currentPath === "/profile" ? "active" : ""} onClick={() => handleNavigation("/profile")}>Profile</span>
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
      </div>
      <button className="search">
        <img src="/src/assets/search.png" alt="Search" />
      </button>  
    </div>
  );
}

export default Navbar;
