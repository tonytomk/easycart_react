import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

const steps = [
  { label: 'Cart', key: 'cart' },
  { label: 'Information', key: 'info' },
  { label: 'Shipping', key: 'shipping' },
  { label: 'Payment', key: 'payment' },
];

const CheckoutComponent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Info, 2: Shipping, 3: Payment
  const [info, setInfo] = useState({ name: 'John Doe', email: 'john@doe.com', address: '123 Main St', city: 'Metropolis', postal: '12345' });
  const [shipping, setShipping] = useState({ method: 'Standard', address: '123 Main St, Metropolis' });
  const cart = useSelector((state: RootState) => state.cart.items);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const navigate = useNavigate();

  const goToStep = (idx: number) => {
    if (idx === 0) navigate('/carts');
    else setCurrentStep(idx);
  };

  return (
    <div className="checkout-parent" style={{ maxWidth: 1200, margin: '2rem auto', background: '#fff', border: '1px solid #e0e0e0', borderRadius: 16, padding: '2.5rem 2rem', boxShadow: '0 2px 16px #0001' }}>
      <div className="checkout-breadcrumb" style={{ display: 'flex', gap: 32, marginBottom: 40, fontSize: 22, justifyContent: 'center', fontWeight: 600 }}>
        {steps.map((step, idx) => (
          <span
            key={step.key}
            onClick={() => goToStep(idx)}
            style={{
              color: idx === currentStep ? '#d32f2f' : '#333',
              textDecoration: idx === currentStep ? 'underline' : 'none',
              cursor: idx === 0 || idx <= currentStep ? 'pointer' : 'default',
              fontWeight: idx === currentStep ? 700 : 500,
              opacity: idx > currentStep ? 0.5 : 1,
              marginRight: 8,
            }}
          >
            {step.label}
          </span>
        ))}
      </div>
      <div className="checkout-content" style={{ display: currentStep === 3 ? 'flex' : 'block', gap: 40, alignItems: 'flex-start' }}>
        {currentStep === 1 && (
          <div style={{ maxWidth: 500, margin: '0 auto', background: '#fafbfc', border: '1px solid #e0e0e0', borderRadius: 12, padding: '2rem', boxShadow: '0 2px 8px #0001' }}>
            <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 18, color: '#223', textAlign: 'center' }}>Information</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <input type="text" placeholder="Full Name" style={{ padding: 12, fontSize: 18, borderRadius: 8, border: '1px solid #ccc' }} defaultValue={info.name} />
              <input type="email" placeholder="Email Address" style={{ padding: 12, fontSize: 18, borderRadius: 8, border: '1px solid #ccc' }} defaultValue={info.email} />
              <input type="text" placeholder="Address" style={{ padding: 12, fontSize: 18, borderRadius: 8, border: '1px solid #ccc' }} defaultValue={info.address} />
              <input type="text" placeholder="City" style={{ padding: 12, fontSize: 18, borderRadius: 8, border: '1px solid #ccc' }} defaultValue={info.city} />
              <input type="text" placeholder="Postal Code" style={{ padding: 12, fontSize: 18, borderRadius: 8, border: '1px solid #ccc' }} defaultValue={info.postal} />
              <button type="button" className="btn" style={{ width: 180, alignSelf: 'center', marginTop: 16, background: 'linear-gradient(to right, #e0e0e0, #fff)', color: '#d32f2f', border: '1px solid #d32f2f', borderRadius: 8, fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0001' }} onClick={() => setCurrentStep(2)}>Next: Shipping</button>
            </form>
          </div>
        )}
        {currentStep === 2 && (
          <div style={{ maxWidth: 500, margin: '0 auto', background: '#fafbfc', border: '1px solid #e0e0e0', borderRadius: 12, padding: '2rem', boxShadow: '0 2px 8px #0001' }}>
            <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 18, color: '#223', textAlign: 'center' }}>Shipping</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <input type="text" placeholder="Shipping Method" style={{ padding: 12, fontSize: 18, borderRadius: 8, border: '1px solid #ccc' }} defaultValue={shipping.method} />
              <input type="text" placeholder="Address" style={{ padding: 12, fontSize: 18, borderRadius: 8, border: '1px solid #ccc' }} defaultValue={shipping.address} />
              <button type="button" className="btn" style={{ width: 180, alignSelf: 'center', marginTop: 16, background: 'linear-gradient(to right, #e0e0e0, #fff)', color: '#d32f2f', border: '1px solid #d32f2f', borderRadius: 8, fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0001' }} onClick={() => setCurrentStep(3)}>Next: Payment</button>
            </form>
          </div>
        )}
        {currentStep === 3 && (
          <>
            <div style={{ flex: 1, minWidth: 380, background: '#fafbfc', border: '1px solid #e0e0e0', borderRadius: 12, padding: '2rem', marginRight: 24, boxShadow: '0 2px 8px #0001' }}>
              <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 18, color: '#223' }}>Information</h2>
              <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: '1rem 1.5rem', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                <span style={{ color: '#555' }}>Contact</span>
                <span style={{ color: '#222', fontWeight: 500 }}>{info.email}</span>
                <button className="btn" style={{ marginLeft: 16, padding: '4px 18px', background: '#f5f5f5', color: '#1976d2', border: '1px solid #1976d2', borderRadius: 6, fontWeight: 500 }}>Change</button>
              </div>
              <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 18, color: '#223' }}>Shipping</h2>
              <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: '1rem 1.5rem', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                <span style={{ color: '#555' }}>Ship To</span>
                <span style={{ color: '#222', fontWeight: 500 }}>{shipping.address}</span>
                <button className="btn" style={{ marginLeft: 16, padding: '4px 18px', background: '#f5f5f5', color: '#1976d2', border: '1px solid #1976d2', borderRadius: 6, fontWeight: 500 }}>Change</button>
              </div>
              <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 18, color: '#223' }}>Payment</h2>
              <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: '1.5rem', marginBottom: 16, background: '#fff' }}>
                <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <label style={{ fontSize: 18, color: '#222', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> COD
                  </label>
                  <label style={{ fontSize: 18, color: '#222', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} /> Online Payment
                  </label>
                </div>
                {paymentMethod === 'online' && (
                  <button
                    className="btn"
                    style={{ background: 'linear-gradient(to right, #e0e0e0, #fff)', color: '#d32f2f', marginTop: 8, minWidth: 180, minHeight: 44, border: '1px solid #d32f2f', borderRadius: 8, fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0001' }}
                    type="button"
                    onClick={() => {
                      // Razorpay integration
                      const script = document.createElement('script');
                      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                      script.async = true;
                      script.onload = () => {
                        const options = {
                          key: 'your_razorpay_key', // Replace with your Razorpay key
                          amount: cart.reduce((sum, item) => sum + (typeof item.price === 'string' ? parseFloat(item.price) : item.price), 0) * 100,
                          currency: 'INR',
                          name: 'eCart',
                          description: 'Order Payment',
                          handler: function (response: any) {
                            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
                          },
                          prefill: {
                            name: info.name,
                            email: info.email,
                          },
                          theme: { color: '#1976d2' },
                        };
                        // @ts-ignore
                        const rzp = new window.Razorpay(options);
                        rzp.open();
                      };
                      document.body.appendChild(script);
                    }}
                  >
                    Pay with Razorpay
                  </button>
                )}
                {paymentMethod === 'cod' && (
                  <button className="btn" style={{ background: 'linear-gradient(to right, #e0e0e0, #fff)', color: '#d32f2f', marginTop: 8, minWidth: 180, minHeight: 44, border: '1px solid #d32f2f', borderRadius: 8, fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0001' }} type="button">
                    Complete
                  </button>
                )}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 380, background: '#fafbfc', border: '1px solid #e0e0e0', borderRadius: 12, padding: '2rem', boxShadow: '0 2px 8px #0001' }}>
              <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 18, color: '#223', textAlign: 'center' }}>Cart</h2>
              {cart.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 18, color: '#222' }}>
                  <span>{item.bookTitle || item.title}</span>
                  <span>{item.price}₹</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
                <span style={{ color: '#555', fontSize: 16 }}>Apply Coupon</span>
                <input
                  type="text"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  style={{ marginLeft: 8, padding: 6, borderRadius: 6, border: '1px solid #ccc', minWidth: 120, fontSize: 16 }}
                />
                <button className="btn" style={{ marginLeft: 8, padding: '4px 18px', background: '#f5f5f5', color: '#1976d2', border: '1px solid #1976d2', borderRadius: 6, fontWeight: 500 }} onClick={() => setAppliedCoupon(coupon)}>Apply</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 24, color: '#223', borderTop: '1px solid #e0e0e0', paddingTop: 18, marginTop: 18 }}>
                <span>Total</span>
                <span>{cart.reduce((sum, item) => sum + (typeof item.price === 'string' ? parseFloat(item.price) : item.price), 0)}₹</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutComponent;
