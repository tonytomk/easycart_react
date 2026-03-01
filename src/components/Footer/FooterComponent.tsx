import React from 'react';
import './FooterComponent.css';

const FooterComponent: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="footer">
      <div className="footer-left">© 2020 TTK</div>
      <div className="footer-center">eCart Home</div>
      <div className="footer-right">
        <a href="#contact">Contact Us</a>
      </div>
      <div className="footer-up" onClick={scrollToTop} title="Back to top">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15" stroke="#000" strokeWidth="2" fill="none" />
          <path d="M16 22V10" stroke="red" strokeWidth="3" strokeLinecap="round" />
          <path d="M10 16L16 10L22 16" stroke="red" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    </footer>
  );
};

export default FooterComponent;
