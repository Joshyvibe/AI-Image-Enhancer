import React from 'react';
import '../styles/Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul>
            <li><a href="tel:+234-81-3734-3312">+234-81-3734-3312</a></li>
            <li><a href="mailto:founders@allformslimited.com">founders@allformslimited.com</a></li>
            <li><a href="#support-us">Support Us</a></li>
          </ul>
        </div>
        
        
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Allforms Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
