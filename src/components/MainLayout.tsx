import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from './Header/HeaderComponent';
import FooterComponent from './Footer/FooterComponent';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <HeaderComponent />
      <div style={{ minHeight: '70vh', padding: '1rem' }}>
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
