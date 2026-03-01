
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface CartItem {
  bookTitle: string;
  bookDesc: string;
  category: string;
  imageUrl: string;
  imageLocalPath: string;
  addedToCart: boolean | string;
  author: string;
  price: string | number;
}

const DetailsComponent: React.FC = () => {
  const { category, title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState<CartItem | null>(null);

  useEffect(() => {
    // Try to get item from navigation state first
    if (location.state?.item) {
      setItem(location.state.item);
      return;
    }
    // Otherwise, fetch from data.json by matching category and title
    fetch('/src/assets/data/data.json')
      .then(res => res.json())
      .then(data => {
        const found = (data.cartData || []).find((x: CartItem) =>
          x.category.toLowerCase() === decodeURIComponent(category || '').toLowerCase() &&
          x.bookTitle.toLowerCase() === decodeURIComponent(title || '').toLowerCase()
        );
        setItem(found || null);
      });
  }, [category, title, location.state]);

  if (!item) {
    return (
      <div style={{ padding: '2rem' }}>
        <h3>No item details found.</h3>
        <button className="btn" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: '2rem', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #ccc', padding: 24 }}>
      <div style={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 32 }}>
        <img src={item.imageLocalPath ? `/images/${item.imageLocalPath}` : ''} alt={item.bookTitle} style={{ width: 350, height: 350, objectFit: 'cover', borderRadius: 8, marginBottom: 24 }} />
        <div style={{ marginTop: 16, fontSize: 20 }}>
          Ratings
          <span style={{ color: 'orange', marginLeft: 8 }}>
            {Array.from({ length: 4 }).map((_, i) => <span key={i}>★</span>)}
            <span style={{ color: '#bbb' }}>★</span>
          </span>
          <span style={{ marginLeft: 8 }}>4/5</span>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>{item.bookTitle} {item.bookDesc ? <span style={{ fontWeight: 400, fontSize: 22 }}>&ndash; {item.bookDesc}</span> : null}</h2>
        <div style={{ marginBottom: 8 }}><b>Author:</b> {item.author}</div>
        <div style={{ marginBottom: 8 }}><b>Category:</b> {item.category}</div>
        <div style={{ marginBottom: 8 }}><b>Price</b> {item.price} $</div>
        <button className="btn" style={{ background: 'linear-gradient(to right, gray, white)', color: 'red', marginBottom: 16, minWidth: 100, minHeight: 40, border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Buy</button>
        <div style={{ marginBottom: 16, marginTop: 16, lineHeight: 1.5, textAlign: 'justify' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt itaque perferendis nam voluptates. Quasi eum ab autem est nostrum. Magni sequi et deserunt vitae deleniti eligendi? Totam neque accusantium odit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos quidem expedita veritatis ea error maiores maxime mollitia dolore similique aspernatur, est modi quisquam? Consectetur aperiam natus eum voluptates suscipit maxime? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nihil animi a laudantium veritatis molestias! Nobis sint, qui distinctio quod ipsum neque ab accusamus eveniet, maxime earum totam repellendus necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, odit! Reprehenderit, quaerat! Et debitis qui voluptates. Autem ea perspiciatis soluta inventore accusantium dolor harum aperiam, adipisci fuga necessitatibus officiis impedit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam recusandae nesciunt commodi velit aut delectus alias minima cupiditate dolorum fuga quidem corporis, consequuntur tempore nulla! Qui iste laboriosam quae facilis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam magnam facilis ipsum blanditiis illo error consectetur eligendi obcaecati quas nemo! Quia, eius. Perferendis, ad est dolores aliquid adipisci error nisi? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad explicabo, quas qui ipsum sed accusamus perspiciatis a commodi nam minima veniam nisi, enim quibusdam officia repellat recusandae quam rem maiores.
        </div>
        <div style={{ borderTop: '2px solid #888', margin: '16px 0' }}></div>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>Write a review</div>
        <div style={{ marginBottom: 8 }}>
          Name : <input style={{ marginLeft: 8, padding: 4, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          {Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ fontSize: 24, color: '#222', marginRight: 2 }}>★</span>)}
          <span style={{ marginLeft: 8 }}>0/5</span>
        </div>
        <textarea rows={5} cols={60} style={{ width: '100%', borderRadius: 4, border: '1px solid #ccc', padding: 8 }} placeholder="Write your review here..." />
        <div style={{ marginTop: 8 }}>
          <button className="btn" style={{ marginRight: 8 }}>Submit</button>
          <button className="btn" onClick={() => navigate('/')}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsComponent;
