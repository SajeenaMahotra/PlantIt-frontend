import React from 'react';
import { NavLink,useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink} from 'react-scroll';
import './navbar.css';

const Navbar = ({ setShowSignup, isLoggedIn }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  

  const handleNavigation = (path) => {
    if ( !isLoggedIn && (path === "/learn" || path === "/blog" || path === "/profile" || path ==="/search" )) {
      setShowSignup(true); 
    } else if (location.pathname === path) {
      window.location.reload(); 
    } else {
      navigate(path);
    }
  };

  const handleAboutClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    }
  };
  
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/src/assets/plantitlogo.png" alt="PlantIt Logo" />
      </div>
      <div className='description'><p>-Sow Dreams, Harvest Beauty</p> </div>
      <div className="nav-links">
        <span className={currentPath === "/home" ? "active" : ""} onClick={() => handleNavigation("/")}>Home</span>
        <span className={currentPath === "/blog" ? "active" : ""} onClick={() => handleNavigation("/blog")}>Blog</span>
        {location.pathname === "/" ? (
          <ScrollLink to="about-section" smooth={true} duration={800} className="nav-link">
            <span>About</span>
          </ScrollLink>
        ) : (
          <span className="nav-link" onClick={handleAboutClick}>
            About
          </span>
        )}
        <span className={currentPath === "/profile" ? "active" : ""} onClick={() => handleNavigation("/profile")}>Profile</span>
      </div>
      <button className="search">
        <img src="/src/assets/search.png" alt="Search" onClick={() => handleNavigation("/search")}/>
      </button>  
    </div>
   
  );
}

export default Navbar;
