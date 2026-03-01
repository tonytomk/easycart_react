import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from '../components/MainLayout';
import HomeComponent from '../components/Main/Home/HomeComponent';
import CartsComponent from '../components/Main/Home/Carts/CartsComponent';
import CheckoutComponent from '../components/Main/Home/Checkout/CheckoutComponent';
import DetailsComponent from '../components/Main/Home/Details/DetailsComponent';


const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/carts" element={<CartsComponent />} />
        <Route path="/checkout" element={<CheckoutComponent />} />
        <Route path="/details/:category/:title" element={<DetailsComponent />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
