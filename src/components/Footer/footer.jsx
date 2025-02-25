import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/" >Home</a>
          <a href="/termsandconditions">Terms and Conditions</a>
          <a href="/plantofthemonth">Plant Of the Month</a>
          <a href="/login">Login </a>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} PlantIt. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
