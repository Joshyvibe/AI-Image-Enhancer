import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">The Best Way to Stay Secure</h1>
        <p className="header-subtitle">
          Protect your passwords, secure your accounts, and streamline your digital life with 1Password.
        </p>
        <div className="header-buttons">
          <a href="/signup" className="btn btn-primary">Get Started Free</a>
          <a href="#learn-more" className="btn btn-outline">Learn More</a>
        </div>
      </div>
      <div className="header-image">
        <img src="/path/to/hero-image.png" alt="Secure your accounts" />
      </div>
    </header>
  );
};

export default Header;
