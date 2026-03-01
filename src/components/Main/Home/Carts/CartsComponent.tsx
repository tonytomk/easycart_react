

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import './CartsComponent.css';


const CartsComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  // If cart is empty, show a message or redirect
  if (!cart || cart.length === 0) {
    return (
      <div style={{ maxWidth: 600, margin: '4rem auto', textAlign: 'center', fontSize: 24, color: '#888' }}>
        <p>Your cart is empty.</p>
        <button className="btn" onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const handleQuantityChange = (idx: number, value: number) => {
    // Optionally implement quantity update in Redux
    // For now, do nothing or show a message
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + (typeof item.price === 'string' ? parseFloat(item.price) : item.price), 0);

  const checkout = () => {
    navigate('/checkout');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', background: '#fff', border: '1px solid #ccc', padding: '2rem' }}>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => (
            <tr key={idx}>
              <td className="image-td">
                <img src={item.imageLocalPath ? `/images/${item.imageLocalPath}` : item.imageUrl || '/images/bg.jpg'} className="image" alt={item.bookTitle || item.title} />
                <span className="title">{item.bookTitle || item.title}</span>
              </td>
              <td>{item.price} ₹</td>
              <td>
                <input
                  className="input"
                  type="number"
                  min={1}
                  value={1}
                  onChange={e => handleQuantityChange(idx, parseInt(e.target.value))}
                  disabled
                />
              </td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <span>Total</span>
        <span>{getTotal()}</span>
      </div>
      <div className="cart-checkout">
        <button className="btn" onClick={checkout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartsComponent;
