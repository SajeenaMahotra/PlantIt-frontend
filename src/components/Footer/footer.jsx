import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/" >Home</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-and-conditions">Terms and Conditions</a>
          <a href="/disclaimer">Disclaimer</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} PlantIt. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
