import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import './HeaderComponent.css';

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  // Get cart count from Redux store
  const cartCount = useSelector((state: RootState) => state.cart.items.length);

  const gotoCart = () => {
    navigate('/carts');
  };
  const loginClick = () => {
    setLoginModal(true);
    setRegisterModal(false);
  };
  const registerClick = () => {
    setRegisterModal(true);
    setLoginModal(false);
  };
  const cancel = () => {
    setLoginModal(false);
    setRegisterModal(false);
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div className="user_section" style={{ display: 'flex', alignItems: 'center' }}>
          <span className="icon" onClick={loginClick} title="Login">
            {/* User SVG */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="#6C63FF"/>
              <ellipse cx="24" cy="19" rx="8" ry="8" fill="#fff"/>
              <ellipse cx="24" cy="36" rx="12" ry="7" fill="#fff"/>
            </svg>
          </span>
          <span className="icon" onClick={registerClick} title="Register">
            {/* Register SVG */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="10" width="32" height="28" rx="4" fill="#E0E0E0"/>
              <rect x="14" y="16" width="20" height="2" rx="1" fill="#BDBDBD"/>
              <rect x="14" y="22" width="20" height="2" rx="1" fill="#BDBDBD"/>
              <rect x="14" y="28" width="12" height="2" rx="1" fill="#BDBDBD"/>
              <rect x="30" y="28" width="4" height="4" rx="1" fill="#FF6F61"/>
            </svg>
          </span>
        </div>
        <h1 style={{ flex: 1, textAlign: 'center', margin: 0, fontWeight: 700, fontSize: '3rem', color: '#263238' }}>eCart Home</h1>
        <div style={{ position: 'relative', marginRight: '2rem' }}>
          <span className="icon" onClick={gotoCart} title="Cart">
            {/* Cart SVG */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="14" width="32" height="18" rx="4" fill="#E0E0E0"/>
              <circle cx="16" cy="38" r="3" fill="#6C63FF"/>
              <circle cx="32" cy="38" r="3" fill="#6C63FF"/>
              <rect x="12" y="18" width="24" height="8" rx="2" fill="#fff"/>
              <rect x="20" y="10" width="8" height="8" rx="2" fill="#6C63FF"/>
            </svg>
          </span>
          {cartCount > 0 && <span className="count">{cartCount}</span>}
        </div>
      </div>
      {/* Modal placeholders */}
      {loginModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Login</h2>
            <button onClick={cancel}>Close</button>
          </div>
        </div>
      )}
      {registerModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Register</h2>
            <button onClick={cancel}>Close</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
