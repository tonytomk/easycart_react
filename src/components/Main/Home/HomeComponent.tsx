
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeComponent.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';

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

const ITEMS_PER_PAGE = 9;

const HomeComponent: React.FC = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/src/assets/data/data.json')
      .then((res) => res.json())
      .then((data) => setCartData(data.cartData || []));
  }, []);

  const getPageData = () => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return cartData.slice(start, end);
  };

  const numberOfPages = Math.ceil(cartData.length / ITEMS_PER_PAGE);

  // In Vite/React, images in the public folder are served from the root
  const loadImage = (imagePath: string) => {
    return `/images/${imagePath}`;
  };

  const addToCartHandler = (item: CartItem) => {
    dispatch(addToCart(item));
  };


  const more = (item: CartItem) => {
    // Navigate to the details page with category and title in URL
    const category = encodeURIComponent(item.category.toLowerCase());
    const title = encodeURIComponent(item.bookTitle.toLowerCase());
    navigate(`/details/${category}/${title}`, { state: { item } });
  };

  return (
    <div className="parent">
      <div className="main-cards">
        {getPageData().map((key, index) => (
          <div className="cards" key={index}>
            <div className="card">
              <div className="item-image">
                <img src={loadImage(key.imageLocalPath)} alt={key.bookTitle} />
              </div>
              <div className="item-title">
                <span>{key.bookTitle}</span>
                <span>Price : {key.price} ₹</span>
              </div>
              <div className="item-description">
                <span>{key.category}</span>
                <button className="link-button" onClick={() => more(key)}>
                  more &raquo;
                </button>
              </div>
              <div className="buttons">
                <button className="btn" onClick={() => addToCartHandler(key)}>
                  Add to Cart
                </button>
                <button className="btn" onClick={() => navigate('/carts')}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="indexing">
        {Array.from({ length: numberOfPages }, (_, i) => i + 1).map((item) => (
          <li
            key={item}
            className={item === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </li>
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;
