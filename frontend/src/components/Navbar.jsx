import React, { useState } from 'react';
import '../styles/Navbar.css';
import logo  from "../assets/logo.png";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? 'light-mode' : 'dark-mode';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="navbar-container">
        <img src={logo} alt="Logo" className="navbar-logo" />

        {/* Hamburger Button */}
        <button 
          className="hamburger-menu" 
          onClick={toggleMenu} 
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>

        <div className={`navbar-right ${isMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-links">
          </ul>
          <div className="navbar-buttons">
            <a className="btn btn-primary">It's free</a>
          </div>
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
