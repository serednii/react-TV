import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart';

import './Header.scss';

function Header({ onClickCart, favorites, orders }) {
  const { cartItems, totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="./images/logo.png" alt="Logotype" />
          <div>
            <h3 className="text-uppercase">React TV</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={onClickCart} className="card mr-30 cu-p">
          <img width={18} height={18} src="./images/cart.svg" alt="Корзина" />
          <span>{totalPrice} руб.</span>
          <span className="counter">{cartItems.length} </span>
        </li>
        <li className="favorites mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src="./images/heart.svg" alt="Закладки" />
            <span className="counter">{favorites.length} </span>
          </Link>
        </li>
        <li className="orders mr-20 cu-p">
          <Link to="/orders">
            <img width={18} height={18} src="./images/user.svg" alt="Пользователь" />
            <span className="counter">{orders.length} </span>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
